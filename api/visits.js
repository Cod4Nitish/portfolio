/*
  Visitor counter (Vercel serverless function, no dependencies).
  GET  /api/visits -> { count }
  POST /api/visits -> counts this visitor once per 24h, then returns { count }

  Storage: Upstash Redis (free tier) via its REST API. Connect it once in
  Vercel → Storage / Marketplace → Upstash Redis; that sets KV_REST_API_URL and
  KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_URL / _TOKEN) automatically.
  Without them the endpoint returns 503 and the site simply hides the counter.

  Privacy: only a salted SHA-256 hash of IP + user agent is stored, and it expires after 24h.
*/
const crypto = require('node:crypto');

const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const COUNT_KEY = 'portfolio:visitors';

const redis = async (commands) => {
  const response = await fetch(`${REDIS_URL}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands),
  });
  if (!response.ok) throw new Error(`Redis responded ${response.status}`);
  return (await response.json()).map((entry) => entry.result);
};

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (!REDIS_URL || !REDIS_TOKEN) return res.status(503).json({ error: 'Counter storage is not connected yet.' });
  if (req.method !== 'GET' && req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    if (req.method === 'POST') {
      const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
      const fingerprint = crypto.createHash('sha256').update(`${REDIS_TOKEN.slice(0, 12)}|${ip}|${req.headers['user-agent'] || ''}`).digest('hex').slice(0, 32);
      const [isNew] = await redis([['SET', `portfolio:seen:${fingerprint}`, '1', 'NX', 'EX', '86400']]);
      if (isNew === 'OK') {
        const [count] = await redis([['INCR', COUNT_KEY]]);
        return res.status(200).json({ count });
      }
    }
    const [count] = await redis([['GET', COUNT_KEY]]);
    return res.status(200).json({ count: Number(count) || 0 });
  } catch (error) {
    return res.status(502).json({ error: 'Counter is temporarily unavailable.' });
  }
};
