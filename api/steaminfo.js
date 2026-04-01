// VAULT.GG — Full Steam Game Info
// Returns: screenshots, trailers, background art, genres, platforms, DLC, publisher
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');

  const { appid } = req.query;
  if (!appid || !/^\d+$/.test(appid)) {
    return res.status(400).json({ error: 'Invalid appid' });
  }

  try {
    const r = await fetch(
      `https://store.steampowered.com/api/appdetails?appids=${appid}&cc=us&l=en`,
      { headers: { 'User-Agent': 'VAULT.GG/1.0' } }
    );
    const raw = await r.json();
    const d = raw?.[String(appid)];
    
    if (!d?.success || !d?.data) {
      return res.status(404).json({ error: 'Game not found on Steam' });
    }
    
    const g = d.data;
    const cdn = `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}`;
    
    // Build clean response with all useful fields
    res.json({
      appid: Number(appid),
      name: g.name,
      
      // Images — multiple formats
      images: {
        header:   `${cdn}/header.jpg`,
        capsule:  `${cdn}/capsule_616x353.jpg`,
        portrait: `${cdn}/library_600x900.jpg`,
        hero:     `${cdn}/hero_capsule.jpg`,
        background: `${cdn}/page_bg_generated_v6b.jpg`,
        // Actual screenshot URLs from Steam
        screenshots: (g.screenshots || []).slice(0, 8).map(s => ({
          thumb: s.path_thumbnail,
          full:  s.path_full
        }))
      },
      
      // Trailers — actual MP4 from Steam CDN
      trailers: (g.movies || []).slice(0, 3).map(m => ({
        name: m.name,
        thumbnail: m.thumbnail,
        mp4_480: m.mp4?.['480'] || null,
        mp4_max: m.mp4?.max || null,
        webm_480: m.webm?.['480'] || null,
        highlight: m.highlight || false
      })),
      
      // Game info
      shortDesc: g.short_description,
      developers: g.developers || [],
      publishers: g.publishers || [],
      website: g.website || null,
      
      // Classification
      genres: (g.genres || []).map(x => x.description),
      categories: (g.categories || []).map(x => x.description),
      tags: [],  // appdetails doesn't return tags; SteamSpy does
      
      // Platforms
      platforms: {
        windows: g.platforms?.windows || false,
        mac:     g.platforms?.mac || false,
        linux:   g.platforms?.linux || false,
      },
      
      // Release
      releaseDate: g.release_date?.date || null,
      comingSoon:  g.release_date?.coming_soon || false,
      
      // Store
      price:     g.price_overview?.final_formatted || null,
      dlcCount:  (g.dlc || []).length,
      metacritic: g.metacritic?.score || null,
      metacriticUrl: g.metacritic?.url || null,
      
      // Support
      supportedLanguages: g.supported_languages ? 
        g.supported_languages.replace(/<[^>]*>/g, '').split(', ').slice(0, 10) : [],
      
      // Review count from Steam
      recommendations: g.recommendations?.total || null,
    });
    
  } catch (e) {
    res.status(502).json({ error: 'Steam API unavailable', message: e.message });
  }
};
