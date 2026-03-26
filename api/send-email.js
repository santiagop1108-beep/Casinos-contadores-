export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { to, subject, html } = req.body || {};
  const key = process.env.RESEND_API_KEY;
  if (!key) return res.status(503).json({ error: 'RESEND_API_KEY no configurado en Vercel. Ve a Settings → Environment Variables y agrega RESEND_API_KEY.' });
  if (!to || !html) return res.status(400).json({ error: 'Faltan campos: to, html' });
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Casinos Contadores <onboarding@resend.dev>',
        to: [to],
        subject: subject || 'Reporte Casino',
        html,
      }),
    });
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: data.message || 'Error Resend' });
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
