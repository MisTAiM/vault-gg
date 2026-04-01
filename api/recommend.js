// VAULT.GG — Claude AI Game Recommender Proxy
// Calls Anthropic API server-side (CORS + key management)
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const { system, userMessage } = req.body || {};
  if (!system || !userMessage) {
    return res.status(400).json({ error: 'Missing system or userMessage' });
  }

  // API key from Vercel environment variable
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system,
        messages: [{ role: 'user', content: userMessage }]
      })
    });

    if (!r.ok) {
      const err = await r.text();
      return res.status(r.status).json({ error: `Anthropic API error ${r.status}`, detail: err.slice(0, 200) });
    }

    const data = await r.json();
    const text = data?.content?.[0]?.text || '';
    
    // Parse + validate the JSON response from Claude
    let result;
    try {
      const clean = text.replace(/```json|```/g, '').trim();
      result = JSON.parse(clean);
    } catch {
      // Claude sometimes wraps in text — extract JSON block
      const match = text.match(/\{[\s\S]*\}/);
      if (match) result = JSON.parse(match[0]);
      else return res.status(500).json({ error: 'Could not parse AI response', raw: text.slice(0, 300) });
    }

    if (!result?.picks?.length) {
      return res.status(500).json({ error: 'No picks returned', raw: text.slice(0, 300) });
    }

    res.json(result);
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
};
