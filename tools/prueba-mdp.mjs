// Prueba de Mar del Plata 3D en un celular simulado (400×850, táctil): carga, arranca, camina, va a varios lugares
// y horas, y saca capturas en out/mdp/. Sale con código 1 si hay errores de página.
// Uso: npm run build && node tools/prueba-mdp.mjs
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright';
import { serve } from './harness.mjs';

const OUT = 'out/mdp'; mkdirSync(OUT, { recursive: true });
const srv = await serve();
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'], ...(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {}) });
const ctx = await browser.newContext({ viewport: { width: 400, height: 850 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
const page = await ctx.newPage();
const errs = [];
page.on('pageerror', e => errs.push('pageerror: ' + e.message));
page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push('console: ' + m.text()); });
page.on('response', r => { if (r.status() >= 400 && !/favicon/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
const t0 = Date.now();
await page.goto(srv.url + '/mardelplata.html?debug');
await page.waitForSelector('#go:not([hidden])', { timeout: 240000 });
console.log('cargó en', ((Date.now() - t0) / 1000).toFixed(1), 's');
await page.screenshot({ path: OUT + '/00-carga.png' });
await page.evaluate(() => window.__mdp.go());
await page.waitForTimeout(2500);
const shot = async (name, wait = 2500) => { await page.waitForTimeout(wait); await page.screenshot({ path: OUT + '/' + name + '.png' }); console.log(name, JSON.stringify(await page.evaluate(() => window.__mdp.stats()))); };
await shot('01-inicio');
// caminar con el teclado 3 s
const p0 = await page.evaluate(() => [window.__mdp.cam.x, window.__mdp.cam.z]);
await page.keyboard.down('KeyW');   // camina hasta los lobos de piedra (con WebGL por software el tiempo del juego va más lento)
for (let i = 0; i < 40 && !(await page.evaluate(() => !!window.__mdp.save.sellos.lobos)); i++) await page.waitForTimeout(500);
await page.keyboard.up('KeyW');
const p1 = await page.evaluate(() => [window.__mdp.cam.x, window.__mdp.cam.z, Object.keys(window.__mdp.save.sellos)]);
console.log('caminó', Math.hypot(p1[0] - p0[0], p1[1] - p0[1]).toFixed(1), 'm · sellos', p1[2].join(','));
if (!p1[2].includes('lobos')) errs.push('caminando hacia los lobos de la Rambla no se selló el primer lugar');
await shot('02-caminando', 500);
const go = async (lon, lat, yaw, pitch = 0, hora = 17, modo = 'pie') => page.evaluate(([lon, lat, yaw, pitch, hora, modo]) => {
  const m = window.__mdp; if (m.cam.mode !== modo) m.setMode(modo); m.setHora(hora); const [x, z] = m.toXZ(lon, lat); m.teleport(x, z, yaw); m.cam.pitch = pitch;
}, [lon, lat, yaw, pitch, hora, modo]);
const DEG = Math.PI / 180;
await go(-57.5404, -38.0042, 270 * DEG, 0.12); await shot('03-rambla-casino', 6000);
await go(-57.5486, -37.9983, 190 * DEG, 0.3); await shot('04-catedral', 6000);
await go(-57.5347, -38.0090, 35 * DEG, 0.12); await shot('05-torreon', 6000);
await go(-57.5392, -38.0497, 180 * DEG, -0.12); await shot('06-banquina', 6000);
await go(-57.5285, -38.0444, 100 * DEG, -0.15); await shot('07-lobos-marinos', 6000);
await go(-57.5300, -38.0250, 200 * DEG, 0.0, 19); await shot('08-playa-grande-atardecer', 6000);
await go(-57.5440, -38.0060, 30 * DEG, -0.3, 10, 'vuelo'); await shot('09-gaviota', 7000);
await go(-57.5480, -37.9978, 90 * DEG, 0.1, 22, 'pie'); await shot('10-noche', 6000);
await go(-57.5350, -38.0140, 350 * DEG, 0.35, 13, 'pie'); await shot('11-torre-tanque', 6000);
await go(-57.5375, -38.0520, 20 * DEG, -0.45, 11, 'vuelo'); await shot('12-puerto-desde-arriba', 7000);
// toque táctil simulado: el joystick de la izquierda
await page.evaluate(() => window.__mdp.setHora(17));
const box = { x: 100, y: 650 };
const c0 = await page.evaluate(() => [window.__mdp.cam.x, window.__mdp.cam.z]);
await page.evaluate(({ x, y }) => { const cv = document.getElementById('gl'); const ev = (t, X, Y) => cv.dispatchEvent(new PointerEvent(t, { pointerId: 7, pointerType: 'touch', clientX: X, clientY: Y, bubbles: true }));
  ev('pointerdown', x, y); ev('pointermove', x, y - 60); window.__ev = ev; }, box);
await page.waitForTimeout(2000);
await page.evaluate(({ x, y }) => window.__ev('pointerup', x, y - 60), box);
const c1 = await page.evaluate(() => [window.__mdp.cam.x, window.__mdp.cam.z]);
console.log('con el joystick', Math.hypot(c1[0] - c0[0], c1[1] - c0[1]).toFixed(1), 'm');
// hojas
await page.click('#bPass'); await page.waitForTimeout(600); await page.screenshot({ path: OUT + '/20-pasaporte.png' });
await page.click('#shPass .close'); await page.waitForTimeout(400);
await page.click('#bMap'); await page.waitForTimeout(900); await page.screenshot({ path: OUT + '/21-mapa.png' });
await page.goBack(); await page.waitForTimeout(400);
const open = await page.evaluate(() => !!document.querySelector('.sheet.open'));
console.log('atrás cierra la hoja:', !open, '· sigue en la página:', page.url().includes('mardelplata'));
await page.click('#bMenu'); await page.waitForTimeout(600); await page.screenshot({ path: OUT + '/22-opciones.png' });
await page.click('#shMenu .close');
await page.goto(srv.url + '/index.html'); await page.waitForTimeout(800);
const link = await page.evaluate(() => { const a = document.getElementById('mdpGo'); return a && [a.getAttribute('href'), a.textContent, document.getElementById('mdpState').textContent]; });
console.log('inicio:', JSON.stringify(link));
if (!link || link[0] !== 'mardelplata.html') errs.push('el inicio no tiene el link a Mar del Plata');
console.log(errs.length + ' errores de página'); for (const e of errs.slice(0, 20)) console.log('  ' + e);
await browser.close(); srv.close();
if (errs.length) process.exitCode = 1;
