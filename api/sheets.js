// Proxy para Google Sheets API — la GAPI_KEY nunca sale al frontend
const SHEET_IDS = {
  vikingos:  '1M5Gf83ajZHI1a6a6qUVVn2bNi7at-5ExB7iWCb22d-s',
  playarica: '1jWPrRZPo5W_CPOC284QUOUeE5dc21HQ4VNa1HB3734w',
  obrero:    '16RPnUniy-zHcXy1s2A9gdq_vXjbrpxFXNQ91-yupT1U',
  hugo:      '1YW1y-xmiGBV51Ta5fqzlX06Hjwefs31GCq40zK01Hvc',
  faraon:    '1uW97FYebdr3-sjSHRebiYKCWaE1m5ZEeBzsrCGLTM6U',
  simulacion:'1nQ4WH4ezM-u9U9ZY9A9Xj8m2uZMobw2iRdb1_idpSRo',
};

// Solo letras, números, espacios, guiones y puntos — previene inyección en rangos
const SAFE_NAME = /^[\w\s\-\.]{1,80}$/;

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const key = process.env.GAPI_KEY;
  if (!key) return res.status(503).json({ error: 'GAPI_KEY no configurado en Vercel Environment Variables' });

  const { type, cid, sheet, ranges } = req.query;
  const sheetId = SHEET_IDS[cid];
  if (!sheetId) return res.status(400).json({ error: 'Casino inválido' });

  const BASE = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}`;
  let url;

  try {
    if (type === 'balance') {
      // /api/sheets?type=balance&cid=vikingos&sheet=Balance
      if (!sheet || !SAFE_NAME.test(sheet)) return res.status(400).json({ error: 'Nombre de hoja inválido' });
      url = `${BASE}/values/${encodeURIComponent(sheet + '!A:C')}?key=${key}`;

    } else if (type === 'batchGet') {
      // /api/sheets?type=batchGet&cid=vikingos&ranges=["Multi 1!A:H","Poker 2!A:H"]
      let rangesArr;
      try { rangesArr = JSON.parse(ranges); } catch { return res.status(400).json({ error: 'ranges inválido' }); }
      if (!Array.isArray(rangesArr) || rangesArr.length === 0 || rangesArr.length > 50) return res.status(400).json({ error: 'ranges fuera de límites' });
      for (const r of rangesArr) {
        const name = String(r).split('!')[0];
        if (!SAFE_NAME.test(name)) return res.status(400).json({ error: `Rango inválido: ${name}` });
      }
      const rangesQuery = rangesArr.map(r => `ranges=${encodeURIComponent(r)}`).join('&');
      url = `${BASE}/values:batchGet?${rangesQuery}&key=${key}`;

    } else if (type === 'range') {
      // /api/sheets?type=range&cid=vikingos&sheet=Multi%201
      if (!sheet || !SAFE_NAME.test(sheet)) return res.status(400).json({ error: 'Nombre de hoja inválido' });
      url = `${BASE}/values/${encodeURIComponent(sheet + '!A:H')}?key=${key}`;

    } else {
      return res.status(400).json({ error: 'type inválido. Usa: balance | batchGet | range' });
    }

    const r = await fetch(url);
    const data = await r.json();
    // Cache en Vercel Edge: 30s fresco, 60s stale-while-revalidate
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
    return res.status(r.status).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
