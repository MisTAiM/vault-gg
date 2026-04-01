// VAULT.GG — SteamSpy Proxy (owner estimates + avg playtime only)
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, s-maxage=7200, stale-while-revalidate=86400');

  const { appid } = req.query;
  if (!appid || !/^\d+$/.test(appid)) {
    return res.status(400).json({ error: 'Invalid appid' });
  }

  try {
    const r = await fetch(`https://steamspy.com/api.php?request=appdetails&appid=${appid}`, {
      headers: { 'User-Agent': 'VAULT.GG/1.0' }
    });
    const d = await r.json();
    
    // average_forever is MEAN playtime in minutes for all owners
    // average_2weeks is playtime for past 2 weeks (more useful = active players)
    res.json({
      appid: Number(appid),
      owners: d.owners ?? 'Unknown',
      avgForever: d.average_forever ?? 0,    // minutes, all-time mean
      avg2Weeks: d.average_2weeks ?? 0,      // minutes, recent
      median: d.median_forever ?? 0,          // minutes, median (better metric)
      tags: Object.keys(d.tags || {}).slice(0, 10)
    });
  } catch (e) {
    res.status(502).json({ error: 'SteamSpy unavailable' });
  }
};
