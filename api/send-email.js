import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { to, subject, html } = req.body || {};
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) return res.status(503).json({ error: 'GMAIL_USER o GMAIL_APP_PASSWORD no configurados en Vercel.' });

  if (!to || typeof to !== 'string') return res.status(400).json({ error: 'Campo "to" requerido' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) return res.status(400).json({ error: 'Email destinatario inválido' });
  if (!html || typeof html !== 'string') return res.status(400).json({ error: 'Campo "html" requerido' });
  if (html.length > 500000) return res.status(400).json({ error: 'Contenido demasiado largo' });

  const subjectSafe = (typeof subject === 'string' ? subject : 'Reporte Casino').slice(0, 200);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `Casinos Contadores <${user}>`,
      to,
      subject: subjectSafe,
      html,
    });
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
