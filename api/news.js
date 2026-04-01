// VAULT.GG — Steam News Proxy
// Returns latest 5 news items for a game
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=3600');

  const { appid, count = 5 } = req.query;
  if (!appid || !/^\d+$/.test(appid)) {
    return res.status(400).json({ error: 'Invalid appid' });
  }

  try {
    const r = await fetch(
      `https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=${appid}&count=${count}&maxlength=500&format=json`,
      { headers: { 'User-Agent': 'VAULT.GG/1.0' } }
    );
    const d = await r.json();
    const items = (d?.appnews?.newsitems ?? []).map(n => ({
      title: n.title,
      url: n.url,
      date: new Date(n.date * 1000).toLocaleDateString('en-US', {month:'short',day:'numeric',year:'numeric'}),
      author: n.author,
      feedname: n.feedname
    }));
    res.json({ appid: Number(appid), items });
  } catch (e) {
    res.status(502).json({ error: 'Steam News unavailable', items: [] });
  }
};
