// VAULT.GG — CheapShark Live Price Proxy
// CheapShark has CORS but proxy adds caching and rate limiting
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=3600');

  const { gameId, title } = req.query;

  try {
    let url;
    if (gameId) {
      url = `https://www.cheapshark.com/api/1.0/deals?gameID=${encodeURIComponent(gameId)}&upperPrice=100`;
    } else if (title) {
      url = `https://www.cheapshark.com/api/1.0/games?title=${encodeURIComponent(title)}&limit=3`;
    } else {
      return res.status(400).json({ error: 'Provide gameId or title' });
    }

    const r = await fetch(url, { headers: { 'User-Agent': 'VAULT.GG/1.0' } });
    const data = await r.json();

    // Store name map
    const STORE_NAMES = {'1':'Steam','25':'Fanatical','8':'GOG','13':'Humble','11':'Humble','18':'Humble'};
    
    if (gameId && Array.isArray(data)) {
      const deals = data.slice(0, 8).map(d => ({
        store: STORE_NAMES[d.storeID] || `Store ${d.storeID}`,
        storeId: d.storeID,
        price: d.salePrice,
        retail: d.normalPrice,
        savings: Math.round(d.savings),
        dealId: d.dealID,
        url: `https://www.cheapshark.com/redirect?dealID=${d.dealID}`
      }));
      return res.json({ gameId, deals });
    }
    res.json(data);
  } catch (e) {
    res.status(502).json({ error: 'CheapShark unavailable' });
  }
};
