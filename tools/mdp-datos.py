#!/usr/bin/env python3
# Mar del Plata 3D: arma public/mdp/ciudad.bin con la ciudad real (octubre de 2026, Juani: "juego realista para recorrer
# Mar del Plata"). Fuentes abiertas:
# - Overture Maps (S3 público, licencia ODbL porque sale de OpenStreetMap): edificios, calles, la costa, playas, plazas,
#   escolleras y árboles.
# - AWS Terrain Tiles (terrarium, z14): el relieve.
# Los edificios casi no traen altura (la mayoría son contornos detectados desde satélite): se estima por zona (torres en el
# centro y la costa, casas bajas en los barrios) con un azar fijo por edificio, así cada corrida da lo mismo.
#
# Uso: python3 tools/mdp-datos.py      (necesita: pip install pyarrow shapely numpy scipy pillow requests)
# Baja las fuentes una vez a out/mdp-fuentes/ y después las reusa. Escribe public/mdp/ciudad.bin (gzip) y
# out/mdp-mapa.png (un mapa para mirar que salió bien). El formato está en docs/mardelplata.md.
import gzip, io, math, os, re, struct, sys, zlib
import numpy as np, requests, shapely, shapely.ops, pyarrow as pa, pyarrow.parquet as pq, pyarrow.compute as pc
from PIL import Image, ImageDraw
from scipy import ndimage

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'out', 'mdp-fuentes')
OUT = os.path.join(ROOT, 'public', 'mdp', 'ciudad.bin')
os.makedirs(SRC, exist_ok=True); os.makedirs(os.path.dirname(OUT), exist_ok=True)

# El recuadro: de La Perla al puerto, del mar a unas 25 cuadras adentro. El origen es la Rambla, frente al Casino.
W, S, E, N = -57.572, -38.058, -57.512, -37.978
LON0, LAT0 = -57.5420, -38.0045
PHI = math.radians(LAT0)
MLON = 111412.84 * math.cos(PHI) - 93.5 * math.cos(3 * PHI)
MLAT = 111132.954 - 559.822 * math.cos(2 * PHI) + 1.175 * math.cos(4 * PHI)
def tx(lon, lat): return (np.asarray(lon) - LON0) * MLON, -(np.asarray(lat) - LAT0) * MLAT
X0, Z0 = [float(v) for v in tx(W, N)]; X1, Z1 = [float(v) for v in tx(E, S)]
G = 5.0                      # paso de la grilla de relieve y suelo (m)
GW, GH = int(math.ceil((X1 - X0) / G)) + 1, int(math.ceil((Z1 - Z0) / G)) + 1
C = 200.0                    # lado de cada pedazo de ciudad que se arma junto (m)
CW, CH = int(math.ceil((X1 - X0) / C)), int(math.ceil((Z1 - Z0) / C))
Q = 4.0                      # coordenadas en cuartos de metro
rng_seed = 1873              # el año de la fundación, para el azar fijo

ses = requests.Session()
if os.path.exists('/root/.ccr/ca-bundle.crt'): ses.verify = '/root/.ccr/ca-bundle.crt'

# ---------------------------------------------------------------- fuentes
OV = 'https://overturemaps-us-west-2.s3.amazonaws.com'
REL = 'release/2026-10-21.0'

class HttpFile:
    # Un archivo remoto que pyarrow lee de a pedazos (Range), así solo baja los row groups que tocan el recuadro.
    BLK = 1 << 18
    def __init__(self, url, size): self.url, self.size, self.pos, self.cache = url, size, 0, {}
    def seek(self, o, w=0):
        self.pos = o if w == 0 else self.pos + o if w == 1 else self.size + o
        return self.pos
    def tell(self): return self.pos
    def seekable(self): return True
    def readable(self): return True
    @property
    def closed(self): return False
    def close(self): pass
    def _get(self, a, b):
        for t in range(5):
            try:
                r = ses.get(self.url, headers={'Range': f'bytes={a}-{b}'}, timeout=300); r.raise_for_status(); return r.content
            except Exception:
                if t == 4: raise
    def read(self, n=-1):
        if n is None or n < 0: n = self.size - self.pos
        n = max(0, min(n, self.size - self.pos)); p = self.pos; end = p + n
        if n >= 4 * self.BLK:
            self.pos = end; return self._get(p, end - 1)
        out = []
        while p < end:
            i = p // self.BLK
            if i not in self.cache: self.cache[i] = self._get(i * self.BLK, min(self.size, (i + 1) * self.BLK) - 1)
            d = self.cache[i]; o = p - i * self.BLK; c = d[o:o + (end - p)]; out.append(c); p += len(c)
        self.pos = end
        return b''.join(out)

def overture(theme, typ, cols):
    fn = os.path.join(SRC, f'{theme}-{typ}.parquet')
    if os.path.exists(fn): return pq.read_table(fn)
    keys, tok = [], None
    while True:
        p = {'list-type': '2', 'prefix': f'{REL}/theme={theme}/type={typ}/'}
        if tok: p['continuation-token'] = tok
        x = ses.get(OV + '/', params=p, timeout=60).text
        keys += [(k, int(s)) for k, s in re.findall(r'<Key>([^<]+)</Key>.*?<Size>(\d+)</Size>', x) if k.endswith('.parquet')]
        m = re.search(r'<NextContinuationToken>([^<]+)</NextContinuationToken>', x)
        if not m: break
        tok = m.group(1)
    tables = []
    for k, size in keys:
        pf = pq.ParquetFile(HttpFile(OV + '/' + k, size)); md = pf.metadata
        for rg in range(md.num_row_groups):
            st = {}
            r = md.row_group(rg)
            for c in range(r.num_columns):
                col = r.column(c)
                if col.path_in_schema.startswith('bbox.') and col.statistics is not None and col.statistics.has_min_max:
                    st[col.path_in_schema] = (col.statistics.min, col.statistics.max)
            if len(st) == 4 and (st['bbox.xmin'][0] > E or st['bbox.xmax'][1] < W or st['bbox.ymin'][0] > N or st['bbox.ymax'][1] < S): continue
            t = pf.read_row_group(rg, columns=[c for c in cols if c in pf.schema_arrow.names])
            bb = t.column('bbox')
            m = pc.and_(pc.and_(pc.less_equal(pc.struct_field(bb, 'xmin'), E), pc.greater_equal(pc.struct_field(bb, 'xmax'), W)),
                        pc.and_(pc.less_equal(pc.struct_field(bb, 'ymin'), N), pc.greater_equal(pc.struct_field(bb, 'ymax'), S)))
            t = t.filter(m)
            if t.num_rows: tables.append(t)
        print(' ', theme, typ, k.split('/')[-1][:12], sum(t.num_rows for t in tables), file=sys.stderr)
    t = pa.concat_tables(tables, promote_options='default'); pq.write_table(t, fn)
    return t

def dem():
    z = 14
    def tile(lon, lat):
        n = 2 ** z; return (lon + 180) / 360 * n, (1 - np.arcsinh(np.tan(np.radians(lat))) / np.pi) / 2 * n
    tx0, ty0 = [int(v) for v in tile(W - 0.01, N + 0.01)]; tx1, ty1 = [int(v) for v in tile(E + 0.01, S - 0.01)]
    H = np.zeros(((ty1 - ty0 + 1) * 256, (tx1 - tx0 + 1) * 256))
    for x in range(tx0, tx1 + 1):
        for y in range(ty0, ty1 + 1):
            fn = os.path.join(SRC, f'dem-{z}-{x}-{y}.png')
            if not os.path.exists(fn):
                r = ses.get(f'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png', timeout=60); r.raise_for_status()
                open(fn, 'wb').write(r.content)
            a = np.asarray(Image.open(fn).convert('RGB')).astype(float)
            H[(y - ty0) * 256:(y - ty0 + 1) * 256, (x - tx0) * 256:(x - tx0 + 1) * 256] = a[..., 0] * 256 + a[..., 1] + a[..., 2] / 256 - 32768
    def sample(lon, lat):
        fx, fy = tile(lon, lat); px = (fx - tx0) * 256 - 0.5; py = (fy - ty0) * 256 - 0.5
        return ndimage.map_coordinates(H, [py, px], order=1, mode='nearest')
    return sample

print('fuentes…', file=sys.stderr)
T_BLD = overture('buildings', 'building', ['geometry', 'bbox', 'height', 'num_floors', 'class', 'names', 'is_underground', 'roof_shape'])
T_SEG = overture('transportation', 'segment', ['geometry', 'bbox', 'subtype', 'class', 'subclass', 'names', 'road_flags', 'width_rules'])
T_LAND = overture('base', 'land', ['geometry', 'bbox', 'class', 'names'])
T_USE = overture('base', 'land_use', ['geometry', 'bbox', 'class', 'names'])
T_INF = overture('base', 'infrastructure', ['geometry', 'bbox', 'class', 'names'])
DEM = dem()

# ---------------------------------------------------------------- utilidades de geometría
def geoms(t):
    return shapely.from_wkb(t.column('geometry').to_numpy(zero_copy_only=False))
def tolocal(g):
    return shapely.transform(g, lambda c: np.stack(tx(c[:, 0], c[:, 1]), 1))
def names(t):
    return [(n or {}).get('primary') if n else None for n in t.column('names').to_pylist()]
def parts(g):
    return [p for p in getattr(g, 'geoms', [g]) if not p.is_empty]
BOX = shapely.box(X0, Z0, X1, Z1)

class Raster:
    # Una imagen alineada con el mundo: el píxel (i,j) es el casillero de x0+i*s, z0+j*s.
    def __init__(self, s, mode='L', fill=0):
        self.s = s; self.w = int(math.ceil((X1 - X0) / s)) + 1; self.h = int(math.ceil((Z1 - Z0) / s)) + 1
        self.img = Image.new(mode, (self.w, self.h), fill); self.d = ImageDraw.Draw(self.img)
    def pts(self, coords):
        c = np.asarray(coords)[:, :2]; return [((x - X0) / self.s + 0.5, (z - Z0) / self.s + 0.5) for x, z in c]
    def poly(self, g, v):
        for p in parts(g):
            if p.geom_type == 'Polygon':
                if len(p.exterior.coords) >= 3: self.d.polygon(self.pts(p.exterior.coords), fill=v)
                for h in p.interiors:
                    if len(h.coords) >= 3: self.d.polygon(self.pts(h.coords), fill=0)
            elif p.geom_type in ('MultiPolygon', 'GeometryCollection'): self.poly(p, v)
    def line(self, g, v, width_m):
        for p in parts(g):
            if p.geom_type == 'LineString': self.d.line(self.pts(p.coords), fill=v, width=max(1, int(round(width_m / self.s))), joint='curve')
            elif p.geom_type in ('MultiLineString', 'GeometryCollection'): self.line(p, v, width_m)
    def arr(self): return np.asarray(self.img)

# ---------------------------------------------------------------- tierra y mar
print('costa…', file=sys.stderr)
land_g = tolocal(geoms(T_LAND)); land_cls = T_LAND.column('class').to_pylist(); land_nm = names(T_LAND)
inf_g = tolocal(geoms(T_INF)); inf_cls = T_INF.column('class').to_pylist(); inf_nm = names(T_INF)
use_g = tolocal(geoms(T_USE)); use_cls = T_USE.column('class').to_pylist(); use_nm = names(T_USE)
FS = 2.5
mask = Raster(FS)
for g, c in zip(land_g, land_cls):
    if c == 'land': mask.poly(g.intersection(BOX.buffer(200)), 255)
for g, c in zip(inf_g, inf_cls):        # escolleras y muelles: aunque la costa no los traiga, salen del agua
    if c in ('breakwater', 'pier', 'groyne'):
        if g.geom_type in ('Polygon', 'MultiPolygon'): mask.poly(g, 255)
        else: mask.line(g, 255, 7 if c == 'breakwater' else 5)
M = mask.arr() > 127
sdf_f = ndimage.distance_transform_edt(M) * FS - ndimage.distance_transform_edt(~M) * FS
st = int(G / FS)
SDF = sdf_f[::st, ::st][:GH, :GW]
assert SDF.shape == (GH, GW), (SDF.shape, GH, GW)
GX = X0 + np.arange(GW) * G; GZ = Z0 + np.arange(GH) * G
GXX, GZZ = np.meshgrid(GX, GZ)

# ---------------------------------------------------------------- suelo (clases)
# 0 ciudad, 1 pasto, 2 arena, 3 roca, 4 baldosa (plazas secas, peatonales), 5 bosque, 6 golf, 7 cemento (puerto, playones),
# 8 fondo del mar, 9 tierra
cls = Raster(G)
USE_CLS = {'park': 1, 'garden': 1, 'grass': 1, 'pitch': 1, 'meadow': 1, 'village_green': 1, 'recreation_ground': 1, 'playground': 1,
           'cemetery': 1, 'nature_reserve': 9, 'golf_course': 6, 'fairway': 6, 'green': 6, 'pedestrian': 4, 'industrial': 7,
           'construction': 4, 'quarry': 9, 'track': 9, 'railway': 7, 'bunker': 2, 'works': 7, 'stadium': 1}
LAND_CLS = {'forest': 5, 'wood': 5, 'scrub': 1, 'heath': 1, 'grass': 1, 'grassland': 1, 'wetland': 1, 'beach': 2, 'sand': 2,
            'bare_rock': 3, 'rock': 3, 'cliff': 3, 'shingle': 3, 'stone': 3, 'scree': 3}
order = []
for g, c in zip(use_g, use_cls):
    if c in USE_CLS: order.append((0 if c in ('industrial', 'railway', 'works', 'nature_reserve') else 1, g, USE_CLS[c]))
for g, c in zip(land_g, land_cls):
    if c in LAND_CLS and g.geom_type in ('Polygon', 'MultiPolygon'): order.append((2, g, LAND_CLS[c]))
for g, c in zip(inf_g, inf_cls):
    if c == 'parking' and g.geom_type in ('Polygon', 'MultiPolygon'): order.append((1, g, 7))
for _, g, v in sorted(order, key=lambda o: o[0]):
    if g.intersects(BOX): cls.poly(g, v)
for g, c in zip(inf_g, inf_cls):
    if c in ('breakwater', 'pier', 'quay'):
        if g.geom_type in ('Polygon', 'MultiPolygon'): cls.poly(g, 3 if c == 'breakwater' else 7)
        else: cls.line(g, 3 if c == 'breakwater' else 7, 8)
CLS = cls.arr()[:GH, :GW].copy()
CLS[SDF < 0] = 8
SAND = CLS == 2

# ---------------------------------------------------------------- relieve
print('relieve…', file=sys.stderr)
lon_g = LON0 + GXX / MLON; lat_g = LAT0 - GZZ / MLAT
D = DEM(lon_g.ravel(), lat_g.ravel()).reshape(GH, GW)
land = SDF > 0
wsum = ndimage.gaussian_filter(land.astype(float), 6)
DS = ndimage.gaussian_filter(np.where(land, D, 0.0), 6) / np.maximum(wsum, 1e-3)
DS = np.where(wsum > 1e-3, DS, 0.0)
hl = np.maximum(DS, 2.0)
near = np.clip(SDF / 1.5, 0, 1)   # fuera de las playas la costa es un muro: muelles, escolleras, rocas y barrancas
h_land = 0.8 + (np.maximum(hl, 2.4) - 0.8) * near
beachy = ndimage.gaussian_filter(ndimage.binary_dilation(SAND, iterations=8).astype(float), 4)
h_beach = np.minimum(hl, 0.35 + SDF * 0.045)
h = np.where(land, np.where(SAND, h_beach, h_land), 0.0)
slope = 0.12 + (0.022 - 0.12) * np.clip(beachy * 1.5, 0, 1)
h_sea = np.maximum(-0.25 + SDF * slope, -16.0)
h = np.where(land, h, h_sea)
HGT = np.round(h * 10).astype(np.int32)
print('  alturas', h.min().round(1), h.max().round(1), file=sys.stderr)

def at(grid, x, z):  # valor de la grilla en el punto (vecino más cercano)
    i = np.clip(np.round((np.asarray(x) - X0) / G).astype(int), 0, GW - 1); j = np.clip(np.round((np.asarray(z) - Z0) / G).astype(int), 0, GH - 1)
    return grid[j, i]

# ---------------------------------------------------------------- zonas (para estimar alturas)
ZONAS = [  # lon, lat, sigma (m), peso: donde se juntan las torres
    (-57.5485, -37.9977, 800, 1.00),   # microcentro, Plaza San Martín
    (-57.5455, -37.9890, 450, 0.95),   # La Perla, frente al mar
    (-57.5430, -38.0010, 380, 1.00),   # Bristol, la Rambla
    (-57.5505, -38.0050, 520, 0.75),   # Plaza Mitre, Güemes
    (-57.5360, -38.0110, 420, 0.85),   # Stella Maris, Varese
    (-57.5345, -38.0215, 380, 0.65),   # Playa Grande
]
def zona(x, z):
    keep = np.ones_like(np.asarray(x, dtype=float))
    for lo, la, s, w in ZONAS:
        cx, cz = tx(lo, la); d2 = (x - cx) ** 2 + (z - cz) ** 2
        keep *= 1 - w * np.exp(-d2 / (2 * s * s))
    return 1 - keep

def hrand(i, k):  # azar fijo por edificio (0..1)
    v = (np.asarray(i, dtype=np.uint64) * np.uint64(2654435761) + np.uint64(k * 40503 + rng_seed)) & np.uint64(0xffffffff)
    v ^= v >> np.uint64(15); v = (v * np.uint64(2246822519)) & np.uint64(0xffffffff); v ^= v >> np.uint64(13)
    return (v & np.uint64(0xffffff)).astype(float) / 0x1000000

# ---------------------------------------------------------------- edificios
print('edificios…', file=sys.stderr)
bg = tolocal(geoms(T_BLD)); bcls = T_BLD.column('class').to_pylist(); bnm = names(T_BLD)
bfl = T_BLD.column('num_floors').to_pylist(); bht = T_BLD.column('height').to_pylist(); bund = T_BLD.column('is_underground').to_pylist()
LANDMARKS = {  # nombre en los datos → número de hito (el juego los dibuja a su manera)
    'Catedral de los Santos Pedro y Cecilia': 1, 'Hotel Casino': 2, 'NH Gran Hotel Provincial': 3, 'Torreón del Monje': 4,
}
cent = shapely.centroid(bg); cx_, cz_ = shapely.get_x(cent), shapely.get_y(cent)
inside = (cx_ > X0 + 2) & (cx_ < X1 - 2) & (cz_ > Z0 + 2) & (cz_ < Z1 - 2)
inside &= at(SDF, cx_, cz_) > -3
idx = np.nonzero(inside)[0]
print('  en el recuadro', len(idx), file=sys.stderr)
blds = []
bmask = Raster(FS)
for k in idx:
    g = bg[k]
    if bund[k]: continue
    if g.geom_type == 'MultiPolygon': g = max(g.geoms, key=lambda p: p.area)
    if g.geom_type != 'Polygon' or g.area < 8: continue
    g = shapely.Polygon(g.exterior).simplify(0.35, preserve_topology=True)
    if g.is_empty or g.geom_type != 'Polygon' or g.area < 8: continue
    tol = 0.35
    while len(g.exterior.coords) > 120: tol *= 2; g = g.simplify(tol, preserve_topology=True)
    c = np.round(np.asarray(g.exterior.coords)[:-1] * Q).astype(np.int64)
    keep = np.ones(len(c), bool); keep[1:] = np.any(c[1:] != c[:-1], 1)
    c = c[keep]
    if len(c) > 1 and np.all(c[0] == c[-1]): c = c[:-1]
    if len(c) < 3: continue
    a = 0.5 * np.sum(c[:, 0] * np.roll(c[:, 1], -1) - np.roll(c[:, 0], -1) * c[:, 1])
    if abs(a) / Q / Q < 6: continue
    if a < 0: c = c[::-1]
    bmask.poly(g, 255)
    blds.append(dict(k=k, c=c, area=abs(a) / Q / Q, cx=float(g.centroid.x), cz=float(g.centroid.y), cls=bcls[k], name=bnm[k],
                     fl=bfl[k], ht=bht[k]))
BM = bmask.arr() > 127
print('  edificios útiles', len(blds), file=sys.stderr)

# densidad construida alrededor (fracción del suelo con edificios en ~60 m)
dens = ndimage.gaussian_filter(BM.astype(float), 60 / FS / 2)
coast_d = ndimage.distance_transform_edt(M) * FS
def fine_at(a, x, z):
    i = np.clip(((np.asarray(x) - X0) / FS).astype(int), 0, a.shape[1] - 1); j = np.clip(((np.asarray(z) - Z0) / FS).astype(int), 0, a.shape[0] - 1)
    return a[j, i]
bx = np.array([b['cx'] for b in blds]); bz = np.array([b['cz'] for b in blds])
bzone = zona(bx, bz); bden = fine_at(dens, bx, bz); bcoast = fine_at(coast_d, bx, bz)
KIND = {'house': 1, 'detached': 1, 'semidetached_house': 1, 'bungalow': 1, 'terrace': 1, 'residential': 2, 'apartments': 2,
        'hotel': 2, 'commercial': 3, 'retail': 3, 'office': 3, 'supermarket': 3, 'industrial': 4, 'warehouse': 4, 'service': 4,
        'roof': 4, 'church': 5, 'cathedral': 5, 'chapel': 5, 'beach_hut': 6, 'shelter': 6, 'school': 3, 'hospital': 3,
        'university': 3, 'college': 3, 'public': 3, 'civic': 3, 'stadium': 4, 'grandstand': 4, 'garage': 4, 'garages': 4}
for n, b in enumerate(blds):
    i = b['k']; A = b['area']; z = float(bzone[n]); dn = float(bden[n]); cd = float(bcoast[n])
    z = min(1.0, z * (0.55 + 0.65 * min(1.0, dn / 0.55)))
    r1, r2, r3, r4 = hrand(i, 1), hrand(i, 2), hrand(i, 3), hrand(i, 4)
    kind = KIND.get(b['cls'], 0); lm = LANDMARKS.get(b['name'] or '', 0); roof = 0; fh = 3.0
    if kind == 6:                      # carpas y paradores de playa
        H = 2.6
    elif b['ht'] and b['ht'] == b['ht']:
        H = float(b['ht'])
    elif b['fl'] and b['fl'] == b['fl']:
        H = float(b['fl']) * 3.0 + 0.6
    else:
        if A < 25: F = 1
        elif z < 0.12 or kind == 1:
            F = 1 if r1 < 0.55 else 2 if r1 < 0.94 else 3
            if A > 700: F = 1; fh = 5.0
        else:
            pt = z * min(1.0, max(0.12, (A - 60) / 380))
            if cd < 160 and z > 0.35: pt += 0.35
            if kind in (4, 5): pt = 0
            if r2 < pt: F = int(round(6 + z * 17 * r3 ** 0.8))
            else: F = 1 + int(round(r3 * (1 + 3.2 * z)))
            if kind == 4: F = min(F, 2); fh = 5.0
        H = F * fh + 0.6
    nv = len(b['c'])
    if kind != 6 and lm == 0 and H < 8 and A < 260 and nv == 4 and (kind == 1 or z < 0.3) and r4 < 0.78: roof = 1
    if lm in (2, 3): roof = 3; H = 24.0
    if lm == 1: H = 20.0
    if lm == 4: H = 11.0
    if kind == 0: kind = 1 if H < 8 and A < 300 else 2 if H >= 12 else 0
    b.update(H=min(H, 150.0), kind=kind, roof=roof, lm=lm)
hs = np.array([b['H'] for b in blds])
print('  alturas: más de 30 m', int((hs > 30).sum()), ' 12-30', int(((hs >= 12) & (hs <= 30)).sum()), ' techos de tejas', sum(b['roof'] == 1 for b in blds), file=sys.stderr)

# ---------------------------------------------------------------- calles
print('calles…', file=sys.stderr)
sg = tolocal(geoms(T_SEG)); s_sub = T_SEG.column('subtype').to_pylist(); s_cls = T_SEG.column('class').to_pylist()
s_subc = T_SEG.column('subclass').to_pylist(); s_nm = names(T_SEG); s_fl = T_SEG.column('road_flags').to_pylist(); s_w = T_SEG.column('width_rules').to_pylist()
RC = {  # clase → (código, ancho en m)
    'motorway': (1, 18), 'trunk': (1, 16), 'primary': (2, 14), 'secondary': (3, 12), 'tertiary': (4, 10), 'residential': (5, 8.5),
    'unclassified': (5, 7.5), 'living_street': (6, 6.5), 'service': (7, 4.5), 'unknown': (7, 4.5), 'pedestrian': (8, 7.0),
    'footway': (9, 2.6), 'cycleway': (10, 2.4), 'path': (11, 2.0), 'track': (11, 3.0), 'steps': (12, 2.6), 'bridleway': (11, 2.0),
}
name_ix = {}; NAMES = []
def nid(n):
    if not n: return 0xffff
    if n not in name_ix: name_ix[n] = len(NAMES); NAMES.append(n)
    return name_ix[n]
roads = []; rmask = Raster(FS)
for g, sub, c, subc, nm, fl, wr in zip(sg, s_sub, s_cls, s_subc, s_nm, s_fl, s_w):
    if sub != 'road' or c not in RC or subc in ('sidewalk', 'crosswalk'): continue
    if fl and any('is_tunnel' in (f.get('values') or []) for f in fl): continue
    code, w = RC[c]
    if subc == 'parking_aisle': w = 4.0
    if wr:
        try:
            v = float(wr[0]['value'])
            if 3 <= v <= 30 and wr[0].get('between') is None: w = v
        except Exception: pass
    g = g.intersection(BOX)
    for p in parts(g):
        if p.geom_type != 'LineString' or p.length < 1: continue
        mid = p.interpolate(0.5, normalized=True)
        if at(SDF, mid.x, mid.y) < -4: continue
        rmask.line(p, 255, w + 1)
        # en pedazos de hasta 40 m, cada uno en el pedazo de ciudad de su medio
        L = p.length; nseg = max(1, int(math.ceil(L / 40)))
        for s in range(nseg):
            q = shapely.ops.substring(p, L * s / nseg, L * (s + 1) / nseg) if nseg > 1 else p
            if q.geom_type != 'LineString': continue
            cc = np.round(np.asarray(q.coords)[:, :2] * Q).astype(np.int64)
            keep = np.ones(len(cc), bool); keep[1:] = np.any(cc[1:] != cc[:-1], 1); cc = cc[keep]
            if len(cc) < 2: continue
            m = q.interpolate(0.5, normalized=True)
            ends = (1 if s == 0 else 0) | (2 if s == nseg - 1 else 0)   # qué puntas son esquinas (ahí no van las líneas pintadas)
            roads.append(dict(c=cc, code=code, w=w, name=nid(nm), mx=m.x, mz=m.y, nm=nm, ends=ends))
RM = rmask.arr() > 127
print('  pedazos de calle', len(roads), ' nombres', len(NAMES), file=sys.stderr)

# ---------------------------------------------------------------- árboles y cosas
print('árboles…', file=sys.stderr)
rs = np.random.default_rng(rng_seed)
trees = []  # (x, z, tipo) tipo: 0 plátano de calle, 1 pino, 2 árbol de plaza, 3 tamarisco de costa
def free(x, z):
    return (fine_at(BM, x, z) == 0) & (fine_at(RM, x, z) == 0) & (at(SDF, x, z) > 3) & (at(CLS, x, z) != 2)
for g, c in zip(land_g, land_cls):
    if c == 'tree':
        for p in parts(g):
            if p.geom_type == 'Point' and BOX.contains(p): trees.append((p.x, p.y, 2))
    elif c == 'tree_row':
        for p in parts(g):
            if p.geom_type == 'LineString':
                for d in np.arange(3, p.length, 7): q = p.interpolate(d); trees.append((q.x, q.y, 0))
def scatter(g, per_m2, kind):
    g = g.intersection(BOX)
    if g.is_empty: return
    n = int(g.area / per_m2)
    if n <= 0: return
    x0, z0, x1, z1 = g.bounds
    xs = rs.uniform(x0, x1, n * 3); zs = rs.uniform(z0, z1, n * 3)
    ok = shapely.contains_xy(g, xs, zs) & free(xs, zs)
    xs, zs = xs[ok][:n], zs[ok][:n]
    for x, z in zip(xs, zs): trees.append((x, z, kind if kind >= 0 else (1 if rs.random() < 0.35 else 2)))
for g, c in zip(land_g, land_cls):
    if c in ('forest', 'wood') and g.geom_type in ('Polygon', 'MultiPolygon'): scatter(g, 30, -1)
for g, c in zip(use_g, use_cls):
    if c in ('park', 'garden', 'village_green', 'recreation_ground', 'cemetery') and g.geom_type in ('Polygon', 'MultiPolygon'): scatter(g, 130, -1)
    if c == 'golf_course' and g.geom_type in ('Polygon', 'MultiPolygon'): scatter(g, 900, 1)
# árboles de vereda: a los dos lados de las calles, menos en el centro
for r in roads:
    if r['code'] not in (3, 4, 5, 6): continue
    c = r['c'] / Q
    for a, b in zip(c[:-1], c[1:]):
        d = b - a; L = float(np.hypot(*d))
        if L < 4: continue
        u = d / L; nrm = np.array([-u[1], u[0]]); off = r['w'] / 2 + 1.3
        for t in np.arange(rs.uniform(2, 8), L, 9.5):
            for side in (-1, 1):
                p = a + u * (t + rs.uniform(-1.5, 1.5)) + nrm * off * side
                zz = float(zona(p[0], p[1]))
                if rs.random() > 0.78 - 0.45 * zz: continue
                if free(p[0], p[1]): trees.append((float(p[0]), float(p[1]), 0 if rs.random() < 0.85 else 2))
# tamariscos en la costa
for g, c in zip(use_g, use_cls):
    if c in ('grass',) and g.geom_type in ('Polygon', 'MultiPolygon') and g.intersects(BOX):
        cxy = g.centroid
        if at(SDF, cxy.x, cxy.y) < 120: scatter(g, 160, 3)
trees = [t for t in trees if X0 < t[0] < X1 and Z0 < t[1] < Z1]
# sin dos árboles en el mismo lugar
tk = {}
for t in trees: tk.setdefault((int(t[0] // 2.5), int(t[1] // 2.5)), t)
trees = list(tk.values())
print('  árboles', len(trees), file=sys.stderr)

props = []  # (tipo, x, z, ángulo 0..255) 1 sombrilla, 2 lancha amarilla, 3 barco pesquero, 4 lobo marino, 5 farola
def ang(a): return int(round((a % (2 * math.pi)) / (2 * math.pi) * 256)) & 255
gy, gx = np.gradient(SDF)
def shore_dir(x, z):  # hacia dónde queda la tierra
    return math.atan2(float(at(gy, x, z)), float(at(gx, x, z)))
# sombrillas en la arena
sand_pts = np.argwhere(SAND & (SDF > 18) & (SDF < 75))
pick = rs.choice(len(sand_pts), size=min(len(sand_pts), len(sand_pts) // 14), replace=False) if len(sand_pts) else []
for j, i in sand_pts[pick]:
    x = X0 + i * G + rs.uniform(-2, 2); z = Z0 + j * G + rs.uniform(-2, 2)
    if fine_at(BM, x, z) == 0: props.append((1, x, z, int(rs.integers(0, 256))))
# lanchas amarillas en la banquina de pescadores, barcos en las dársenas del puerto
def boats(lon, lat, radius, kind, gap, n):
    cx, cz = tx(lon, lat); got = []
    cand = np.argwhere((SDF < -3) & (SDF > (-22 if kind == 2 else -45)) & ((GXX - cx) ** 2 + (GZZ - cz) ** 2 < radius ** 2))
    rs.shuffle(cand)
    for j, i in cand:
        x = X0 + i * G; z = Z0 + j * G
        if all((x - a) ** 2 + (z - b) ** 2 > gap * gap for a, b in got):
            got.append((x, z)); props.append((kind, x, z, ang(shore_dir(x, z) + rs.uniform(-0.25, 0.25))))
        if len(got) >= n: break
boats(-57.5391, -38.0505, 110, 2, 8, 26)
boats(-57.5372, -38.0468, 260, 3, 34, 14)
# la colonia de lobos marinos de la escollera
for g, c, nm in zip(use_g, use_cls, use_nm):
    if c == 'nature_reserve' and nm and 'Lobos' in nm:
        x0, z0, x1, z1 = g.bounds; got = 0
        for _ in range(4000):
            x, z = rs.uniform(x0, x1), rs.uniform(z0, z1)
            if g.contains(shapely.Point(x, z)) and 0.5 < at(SDF, x, z) < 9 and fine_at(BM, x, z) == 0:
                props.append((4, x, z, int(rs.integers(0, 256)))); got += 1
            if got >= 34: break
# farolas en el Bulevar Marítimo y las avenidas
for r in roads:
    if r['code'] > 3: continue
    c = r['c'] / Q
    for a, b in zip(c[:-1], c[1:]):
        d = b - a; L = float(np.hypot(*d))
        if L < 5: continue
        u = d / L; nrm = np.array([-u[1], u[0]]); off = r['w'] / 2 + 0.8
        for t in np.arange(10, L, 32):
            for side in (-1, 1):
                p = a + u * t + nrm * off * side
                if fine_at(BM, p[0], p[1]) == 0 and at(SDF, p[0], p[1]) > 1: props.append((5, float(p[0]), float(p[1]), ang(math.atan2(-nrm[1] * side, -nrm[0] * side))))
print('  cosas', len(props), file=sys.stderr)

# ---------------------------------------------------------------- binario
def chunk_of(x, z):
    i = min(CW - 1, max(0, int((x - X0) // C))); j = min(CH - 1, max(0, int((z - Z0) // C))); return j * CW + i
def by_chunk(items, key):
    items = sorted(items, key=key); counts = np.zeros(CW * CH + 1, np.uint32)
    for it in items: counts[key(it) + 1] += 1
    return items, np.cumsum(counts).astype(np.uint32)
out = io.BytesIO()
def w(b): out.write(b)
def section(tag, payload):
    w(tag.encode()); w(struct.pack('<I', len(payload))); w(payload); pad = (-len(payload)) % 4; w(b'\0' * pad)
w(b'MDP1'); w(struct.pack('<I', 1))
w(struct.pack('<4d', LON0, LAT0, MLON, MLAT))
w(struct.pack('<3f2I', X0, Z0, G, GW, GH))
w(struct.pack('<f2I', C, CW, CH))
# relieve: decímetros con predicción plana (izq + arriba - diagonal), así casi todo es 0
Hh = HGT.astype(np.int32); P = np.zeros_like(Hh)
P[1:, 1:] = Hh[1:, :-1] + Hh[:-1, 1:] - Hh[:-1, :-1]; P[0, 1:] = Hh[0, :-1]; P[1:, 0] = Hh[:-1, 0]
section('HGT ', (Hh - P).astype('<i2').tobytes())
section('CLS ', CLS.astype(np.uint8).tobytes())
# edificios por pedazo
blds, bstart = by_chunk(blds, lambda b: chunk_of(b['cx'], b['cz']))
co = []
for b in blds:
    c = b['c']; d = np.vstack([c[:1], np.diff(c, axis=0)]); co.append(d.ravel())
coords = np.concatenate(co)
assert np.abs(coords).max() < 32767
bp = io.BytesIO()
bp.write(struct.pack('<I', len(blds))); bp.write(bstart.astype('<u4').tobytes())
bp.write(np.array([len(b['c']) for b in blds], np.uint8).tobytes())
bp.write(np.array([b['kind'] for b in blds], np.uint8).tobytes())
bp.write(np.array([b['roof'] for b in blds], np.uint8).tobytes())
bp.write(np.array([b['lm'] for b in blds], np.uint8).tobytes())
pad = (-bp.tell()) % 2; bp.write(b'\0' * pad)
bp.write(np.array([round(b['H'] * 10) for b in blds], '<u2').tobytes())
bp.write(coords.astype('<i2').tobytes())
section('BLD ', bp.getvalue())
roads, rstart = by_chunk(roads, lambda r: chunk_of(r['mx'], r['mz']))
co = []
for r in roads:
    c = r['c']; d = np.vstack([c[:1], np.diff(c, axis=0)]); co.append(d.ravel())
coords = np.concatenate(co); assert np.abs(coords).max() < 32767
assert max(len(r['c']) for r in roads) < 256
rp = io.BytesIO()
rp.write(struct.pack('<I', len(roads))); rp.write(rstart.astype('<u4').tobytes())
rp.write(np.array([r['code'] for r in roads], np.uint8).tobytes())
rp.write(np.array([len(r['c']) for r in roads], np.uint8).tobytes())
rp.write(np.array([min(255, round(r['w'] * 4)) for r in roads], np.uint8).tobytes())
rp.write(np.array([r['ends'] for r in roads], np.uint8).tobytes())
pad = (-rp.tell()) % 2; rp.write(b'\0' * pad)
rp.write(np.array([r['name'] for r in roads], '<u2').tobytes())
rp.write(coords.astype('<i2').tobytes())
section('ROAD', rp.getvalue())
trees, tstart = by_chunk(trees, lambda t: chunk_of(t[0], t[1]))
tp = io.BytesIO()
tp.write(struct.pack('<I', len(trees))); tp.write(tstart.astype('<u4').tobytes())
tp.write(np.array([t[2] for t in trees], np.uint8).tobytes()); pad = (-tp.tell()) % 2; tp.write(b'\0' * pad)
tp.write(np.round(np.array([(t[0], t[1]) for t in trees]) * Q).astype('<i2').tobytes())
section('TREE', tp.getvalue())
props, pstart = by_chunk(props, lambda p: chunk_of(p[1], p[2]))
pp = io.BytesIO()
pp.write(struct.pack('<I', len(props))); pp.write(pstart.astype('<u4').tobytes())
pp.write(np.array([p[0] for p in props], np.uint8).tobytes()); pp.write(np.array([p[3] for p in props], np.uint8).tobytes())
pad = (-pp.tell()) % 2; pp.write(b'\0' * pad)
pp.write(np.round(np.array([(p[1], p[2]) for p in props]) * Q).astype('<i2').tobytes())
section('PROP', pp.getvalue())
section('NAME', '\n'.join(NAMES).encode('utf-8'))
raw = out.getvalue()
gz = gzip.compress(raw, 9, mtime=0)
open(OUT, 'wb').write(gz)
print(f'{OUT}: {len(raw)//1024} KB → {len(gz)//1024} KB comprimido', file=sys.stderr)

# ---------------------------------------------------------------- mapa para mirar
sc = 0.25
img = Image.new('RGB', (int((X1 - X0) * sc), int((Z1 - Z0) * sc))); px = img.load()
pal = {0: (205, 200, 190), 1: (120, 175, 95), 2: (232, 214, 160), 3: (140, 135, 125), 4: (225, 222, 215), 5: (70, 120, 60),
       6: (130, 200, 100), 7: (175, 175, 170), 8: (40, 80, 130), 9: (170, 150, 110)}
small = Image.fromarray(np.array([[pal[v] for v in row] for row in CLS[::1, ::1]], np.uint8)).resize(img.size)
img.paste(small); d = ImageDraw.Draw(img)
P2 = lambda c: [((x / Q - X0) * sc, (z / Q - Z0) * sc) for x, z in c]
for r in roads: d.line(P2(r['c']), fill=(60, 60, 60) if r['code'] <= 7 else (250, 250, 250), width=max(1, int(r['w'] * sc)))
for b in blds:
    v = int(min(255, 60 + b['H'] * 3)); d.polygon(P2(b['c']), fill=(v, 90, 120) if b['roof'] != 1 else (190, 90, 60))
for t in trees: d.point(((t[0] - X0) * sc, (t[1] - Z0) * sc), fill=(20, 90, 20))
for p in props: d.point(((p[1] - X0) * sc, (p[2] - Z0) * sc), fill=(255, 255, 0))
img.save(os.path.join(ROOT, 'out', 'mdp-mapa.png'))
