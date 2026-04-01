// VAULT.GG — Steam Reviews API
// Uses Steam's official appreviews endpoint for accurate review data
// Also fetches Metacritic score from store API
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');

  const { appid } = req.query;
  if (!appid || !/^\d+$/.test(appid)) {
    return res.status(400).json({ error: 'Invalid appid' });
  }

  try {
    // Fetch Steam appreviews summary (real review score)
    const [reviewRes, storeRes] = await Promise.allSettled([
      fetch(`https://store.steampowered.com/appreviews/${appid}?json=1&language=all&review_type=all&purchase_type=all&filter=summary`, {
        headers: { 'User-Agent': 'VAULT.GG/1.0' }
      }),
      fetch(`https://store.steampowered.com/api/appdetails?appids=${appid}&filters=metacritic,price_overview`, {
        headers: { 'User-Agent': 'VAULT.GG/1.0' }
      })
    ]);

    let reviews = {};
    let metacritic = null;
    let price = null;

    if (reviewRes.status === 'fulfilled') {
      const d = await reviewRes.value.json();
      const s = d?.query_summary || {};
      reviews = {
        scoreDesc: s.review_score_desc || 'No Reviews',
        score: s.review_score || 0,      // 0-9 (9 = Overwhelmingly Positive)
        positive: s.total_positive || 0,
        negative: s.total_negative || 0,
        total: s.total_reviews || 0
      };
    }

    if (storeRes.status === 'fulfilled') {
      const d = await storeRes.value.json();
      const gameData = d?.[String(appid)]?.data || {};
      metacritic = gameData.metacritic?.score || null;
      price = gameData.price_overview?.final_formatted || null;
    }

    res.json({ appid: Number(appid), ...reviews, metacritic, price });
  } catch (e) {
    res.status(502).json({ error: 'Steam API unavailable', scoreDesc: 'Unknown', total: 0 });
  }
};
