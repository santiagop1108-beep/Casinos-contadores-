export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { to, subject, html } = req.body || {};
  const key = process.env.RESEND_API_KEY;

  if (!key) return res.status(503).json({ error: 'RESEND_API_KEY no configurado en Vercel. Ve a Settings → Environment Variables.' });

  // Validación básica
  if (!to || typeof to !== 'string') return res.status(400).json({ error: 'Campo "to" requerido' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) return res.status(400).json({ error: 'Email destinatario inválido' });
  if (!html || typeof html !== 'string') return res.status(400).json({ error: 'Campo "html" requerido' });
  if (html.length > 500000) return res.status(400).json({ error: 'Contenido demasiado largo' });

  const subjectSafe = (typeof subject === 'string' ? subject : 'Reporte Casino').slice(0, 200);

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Casinos Contadores <onboarding@resend.dev>',
        to: [to],
        subject: subjectSafe,
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
