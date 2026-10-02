// Lo que comparten los bots: servir dist/ en un puerto libre, abrir Chromium y resumir la corrida.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, normalize, extname } from 'node:path';
import { chromium } from 'playwright';

const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml' };

// Sirve dist/ (lo arma `npm run build`) en 127.0.0.1 y un puerto libre, así no choca con `npm run serve`.
export function serve(dir = 'dist') {
  const srv = createServer(async (req, res) => {
    try {
      let path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname));
      if (path.endsWith('/') || path.endsWith('\\')) path += 'index.html';
      const body = await readFile(join(dir, path));
      res.writeHead(200, { 'content-type': TYPES[extname(path)] || 'application/octet-stream' });
      res.end(body);
    } catch { res.writeHead(404); res.end(); }
  });
  return new Promise(ok => srv.listen(0, '127.0.0.1', () => ok({
    url: 'http://127.0.0.1:' + srv.address().port,
    close: () => { srv.closeAllConnections(); srv.close(); },
  })));
}

// Chromium de Playwright. Con PW_CHROMIUM se usa uno ya instalado (cuando no se puede correr `npx playwright install`).
export const launch = () => chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});

// Veredicto de una corrida de misiones. Sale con código 1 si una misión no se gana o hay errores de página.
// Pasarse del oro solo se avisa: el tiempo del bot varía entre corridas (pedidos y animales al azar).
export function verdict(res, errs) {
  const won = res.filter(r => r.won).length, gold = res.filter(r => r.won && r.stars === 3).length;
  console.log(won + '/' + res.length + ' ganadas · ' + gold + '/' + res.length + ' bajo el oro · ' + errs.length + ' errores de página');
  for (const r of res) if (!r.won || r.stars < 3) console.log('  misión ' + r.mi + ': ' + (r.won ? r.t + ' s, oro ' + r.gold : 'no ganada a los ' + r.t + ' s'));
  if (won < res.length || errs.length) process.exitCode = 1;
}
