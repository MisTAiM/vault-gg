// VAULT.GG — Guide Data Proxy API
// Proxies wiki APIs (Fandom, bg3.wiki, SDV wiki) that lack CORS headers
// Also serves cached Elden Ring Fan API data

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { game, type, name, limit = 20, page = 0 } = req.query;

  const SOURCES = {
    // Elden Ring Fan API — free, CORS=*, comprehensive
    'elden-ring': {
      base: 'https://eldenring.fanapis.com/api',
      types: ['bosses','weapons','classes','sorceries','incantations','spirits','creatures','armors','locations','items','npcs','shields']
    }
  };

  try {
    // Elden Ring Fan API
    if (game === 'elden-ring' && type) {
      const src = SOURCES['elden-ring'];
      if (!src.types.includes(type)) return res.status(400).json({ error: 'Unknown type' });
      
      let url = `${src.base}/${type}?limit=${limit}&page=${page}`;
      if (name) url += `&name=${encodeURIComponent(name)}`;
      
      res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
      const r = await fetch(url, { headers: { 'User-Agent': 'VAULT.GG/1.0' } });
      const data = await r.json();
      return res.json(data);
    }

    // Wiki proxy (for Fandom, bg3.wiki, SDV — no CORS)
    if (game === 'wiki') {
      const WIKIS = {
        'bg3': 'https://bg3.wiki/w/api.php',
        'hades': 'https://hades.fandom.com/api.php',
        'stardew': 'https://stardewvalleywiki.com/mediawiki/api.php',
        'cyberpunk': 'https://cyberpunk.fandom.com/api.php',
        'hollowknight': 'https://hollowknight.fandom.com/api.php',
        'valheim': 'https://valheim.fandom.com/api.php',
        'riskofrain2': 'https://riskofrain2.fandom.com/api.php',
      };
      
      const wiki = req.query.wiki;
      const wikiBase = WIKIS[wiki];
      if (!wikiBase) return res.status(400).json({ error: 'Unknown wiki' });

      const action = req.query.action || 'query';
      const params = new URLSearchParams(req.query);
      params.delete('game'); params.delete('wiki'); params.delete('type');
      params.set('format', 'json');
      
      res.setHeader('Cache-Control', 'public, s-maxage=7200, stale-while-revalidate=86400');
      const r = await fetch(`${wikiBase}?${params}`, {
        headers: { 'User-Agent': 'VAULT.GG/1.0 (gaming encyclopedia)' }
      });
      const data = await r.json();
      return res.json(data);
    }

    // D&D 5e API proxy (for BG3 class/spell data) - already CORS=* but proxy for consistency
    if (game === 'dnd5e') {
      const endpoint = req.query.endpoint || 'classes';
      res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
      const r = await fetch(`https://www.dnd5eapi.co/api/2014/${endpoint}`, {
        headers: { 'User-Agent': 'VAULT.GG/1.0' }
      });
      return res.json(await r.json());
    }

    res.status(400).json({ error: 'Provide game parameter' });
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
};
