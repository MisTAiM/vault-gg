// VAULT.GG — ProtonDB Linux Compatibility Proxy
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
  const { appid } = req.query;
  if (!appid || !/^\d+$/.test(appid)) return res.status(400).json({ error: 'Invalid appid' });
  try {
    const r = await fetch(`https://www.protondb.com/api/v1/reports/summaries/${appid}.json`,
      { headers: { 'User-Agent': 'VAULT.GG/1.0' } });
    if (!r.ok) return res.json({ tier: 'unknown', score: null, total: 0 });
    const d = await r.json();
    const TIER_LABELS = {
      platinum: { label: 'Platinum', color: '#e5e4e2', icon: '🏆', desc: 'Runs perfectly out of the box' },
      gold: { label: 'Gold', color: '#ffd700', icon: '🥇', desc: 'Runs great with minor tweaks' },
      silver: { label: 'Silver', color: '#c0c0c8', icon: '🥈', desc: 'Runs with some workarounds' },
      bronze: { label: 'Bronze', color: '#cd8040', icon: '🥉', desc: 'Runs but has issues' },
      borked: { label: 'Borked', color: '#ff4444', icon: '💀', desc: 'Currently unplayable' },
    };
    const meta = TIER_LABELS[d.tier] || { label: 'Unknown', color: '#666', icon: '❓', desc: 'Not enough data' };
    res.json({ appid: Number(appid), tier: d.tier, score: d.score, total: d.total, 
               bestTier: d.bestReportedTier, ...meta });
  } catch (e) {
    res.json({ tier: 'unknown', total: 0 });
  }
};
