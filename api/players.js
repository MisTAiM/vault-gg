// VAULT.GG — Live Steam Player Count Proxy
// Bypasses Steam API CORS restriction server-side
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, s-maxage=120, stale-while-revalidate=300');

  const { appid } = req.query;
  if (!appid || !/^\d+$/.test(appid)) {
    return res.status(400).json({ error: 'Invalid appid' });
  }

  try {
    const r = await fetch(
      `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${appid}`,
      { headers: { 'User-Agent': 'VAULT.GG/1.0' } }
    );
    const data = await r.json();
    const count = data?.response?.player_count ?? 0;
    res.json({ appid: Number(appid), players: count, ok: data?.response?.result === 1 });
  } catch (e) {
    res.status(502).json({ error: 'Steam API unavailable', players: 0 });
  }
};
