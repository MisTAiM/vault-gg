// ============================================================
// VAULT.GG — live.js
// Live data from Steam, CheapShark, Speedrun.com APIs
// Loads asynchronously — never blocks page render
// ============================================================

'use strict';

// ── Base URL (auto-detects local vs deployed) ───────────────
const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost:3000'
  : '';

// ── Cache Layer (sessionStorage, 5min TTL) ──────────────────
const LV_CACHE = {
  get(key) {
    try {
      const raw = sessionStorage.getItem('vg_' + key);
      if (!raw) return null;
      const { v, t } = JSON.parse(raw);
      if (Date.now() - t > 300000) { sessionStorage.removeItem('vg_' + key); return null; }
      return v;
    } catch { return null; }
  },
  set(key, val) {
    try { sessionStorage.setItem('vg_' + key, JSON.stringify({ v: val, t: Date.now() })); } catch {}
  }
};

// ── Generic fetcher with cache ───────────────────────────────
async function apiFetch(url, cacheKey, ttl = 300000) {
  if (cacheKey) {
    const cached = LV_CACHE.get(cacheKey);
    if (cached !== null) return cached;
  }
  try {
    const r = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const data = await r.json();
    if (cacheKey) LV_CACHE.set(cacheKey, data);
    return data;
  } catch (e) {
    console.warn('[live.js]', url, e.message);
    return null;
  }
}

// ── Format player count for display ─────────────────────────
function fmtPlayers(n) {
  if (!n || n === 0) return null;
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + 'K';
  return n.toLocaleString();
}

// ── Steam: Live Player Count ─────────────────────────────────
async function fetchPlayers(appid) {
  if (!appid) return null;
  const data = await apiFetch(`${API_BASE}/api/players?appid=${appid}`, `players_${appid}`);
  return data?.players ?? null;
}

// ── Steam: Game News ─────────────────────────────────────────
async function fetchNews(appid, count = 5) {
  if (!appid) return [];
  const data = await apiFetch(`${API_BASE}/api/news?appid=${appid}&count=${count}`, `news_${appid}`);
  return data?.items ?? [];
}

// ── SteamSpy: Ownership & Review Data ───────────────────────
async function fetchSpy(appid) {
  if (!appid) return null;
  return await apiFetch(`${API_BASE}/api/spy?appid=${appid}`, `spy_${appid}`, 3600000);
}

// ── CheapShark: Live Deals (CORS=*) ─────────────────────────
async function fetchDeals(csId) {
  if (!csId) return [];
  const STORE_NAMES = {
    '1':'Steam','13':'Steam','25':'Fanatical','8':'GOG','11':'Humble Bundle',
    '23':'Humble Bundle','27':'Epic','15':'Fanatical','21':'Humble Bundle',
    '2':'GamersGate','3':'GreenManGaming','5':'GOG','6':'DLGamer','9':'DLGamer',
    '17':'GameBillet','24':'Voidu','26':'WinGameStore','28':'itch.io',
    '29':'Humble Bundle','30':'SilaGames','31':'Wingamestore'
  };
  const data = await apiFetch(
    `https://www.cheapshark.com/api/1.0/deals?gameID=${csId}&upperPrice=100`,
    `cs_${csId}`
  );
  if (!Array.isArray(data)) return [];
  return data.slice(0, 6).map(d => ({
    store: STORE_NAMES[d.storeID] || `Store ${d.storeID}`,
    storeId: d.storeID,
    price: parseFloat(d.salePrice),
    retail: parseFloat(d.normalPrice),
    savings: Math.round(parseFloat(d.savings)),
    url: `https://www.cheapshark.com/redirect?dealID=${d.dealID}`
  })).sort((a, b) => a.price - b.price);
}

// ── Speedrun.com: World Record (CORS=*) ─────────────────────
async function fetchWR(srData) {
  if (!srData?.id) return null;
  try {
    // Get Any% category first if we don't have cat ID
    let catId = srData.cat;
    if (!catId) {
      const cats = await apiFetch(
        `https://www.speedrun.com/api/v1/games/${srData.id}/categories`,
        `sr_cats_${srData.id}`,
        86400000
      );
      const anypct = (cats?.data || []).find(c =>
        c.name.toLowerCase().includes('any') && c.type === 'per-game'
      ) || cats?.data?.[0];
      catId = anypct?.id;
      if (!catId) return null;
    }
    const lb = await apiFetch(
      `https://www.speedrun.com/api/v1/leaderboards/${srData.id}/category/${catId}?top=1`,
      `sr_wr_${srData.id}_${catId}`,
      3600000
    );
    const run = lb?.data?.runs?.[0]?.run;
    if (!run) return null;
    return {
      time: run.times.primary,
      timeFormatted: parseSrTime(run.times.primary),
      cat: srData.label || 'Any%',
      url: srData.url,
      videoUrl: run.videos?.links?.[0]?.uri || null
    };
  } catch (e) {
    console.warn('[live.js] WR fetch failed:', e.message);
    return null;
  }
}

// ── Render: Live player badge on game cards ──────────────────
window.loadLivePlayers = async function(appid, el) {
  if (!appid || !el) return;
  const count = await fetchPlayers(appid);
  if (!count) return;
  const fmt = fmtPlayers(count);
  el.innerHTML = `<span style="display:inline-flex;align-items:center;gap:4px;font-size:10px;font-weight:700;font-family:var(--mono);color:var(--neon);background:var(--neon-bg);border:1px solid var(--neon-border);padding:2px 7px;border-radius:99px" title="${count.toLocaleString()} players online now">
    <span style="width:5px;height:5px;border-radius:50%;background:var(--neon);display:inline-block;animation:pulse 2s infinite"></span>
    ${fmt}
  </span>`;
};

// ── Render: Live prices on game page ────────────────────────
window.loadLivePrices = async function(csId, containerEl) {
  if (!csId || !containerEl) return;
  containerEl.innerHTML = '<div style="color:var(--t3);font-size:12px;padding:8px 0"><i class="fa-solid fa-spinner fa-spin"></i> Fetching live prices…</div>';
  const deals = await fetchDeals(csId);
  if (!deals.length) {
    containerEl.innerHTML = '<div style="color:var(--t3);font-size:12px">No live deals found right now.</div>';
    return;
  }
  const STORE_COLORS = { 'Steam':'#1b9de2', 'GOG':'#8b1a1a', 'Fanatical':'#ff6b35', 'Humble Bundle':'#cc2929', 'Epic':'#2d78cf' };
  const rows = deals.map((d, i) => {
    const c = STORE_COLORS[d.store] || '#666878';
    const isCheapest = i === 0;
    return `<a href="${d.url}" target="_blank" rel="noopener"
      style="display:flex;align-items:center;gap:12px;padding:11px 14px;background:var(--float);border:1px solid ${isCheapest ? 'var(--neon-border)' : 'var(--b1)'};border-radius:var(--r2);margin-bottom:6px;text-decoration:none;transition:border-color .15s"
      onmouseover="this.style.borderColor='${c}'" onmouseout="this.style.borderColor='${isCheapest ? 'var(--neon-border)' : 'var(--b1)'}'">
      <span style="width:8px;height:8px;border-radius:50%;background:${c};flex-shrink:0"></span>
      <span style="flex:1;font-weight:600;font-size:13px;color:var(--t1)">${d.store}</span>
      ${d.savings > 0 ? `<span style="font-size:10px;font-weight:700;background:var(--neon-bg);color:var(--neon);border:1px solid var(--neon-border);padding:2px 6px;border-radius:4px">-${d.savings}%</span>` : ''}
      <span style="font-family:var(--mono);font-size:14px;font-weight:700;color:${isCheapest ? 'var(--neon)' : 'var(--t1)'}">$${d.price.toFixed(2)}</span>
      ${d.savings > 0 ? `<span style="font-size:11px;color:var(--t3);text-decoration:line-through">$${d.retail.toFixed(2)}</span>` : ''}
      <i class="fa-solid fa-arrow-up-right-from-square" style="color:var(--t3);font-size:11px;flex-shrink:0"></i>
    </a>`;
  }).join('');
  containerEl.innerHTML = `
    <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--neon);margin-bottom:8px">
      <i class="fa-solid fa-bolt"></i> LIVE PRICES — Updated ${new Date().toLocaleTimeString()}
    </div>
    ${rows}
    <div style="font-size:11px;color:var(--t3);margin-top:8px;line-height:1.6">
      <i class="fa-solid fa-circle-info"></i> Prices from CheapShark. Click any row to buy — you get a KEY (not an account). Verify region compatibility before purchase.
    </div>`;
};

// ── Render: World Record on game page ───────────────────────
window.loadSpeedrunWR = async function(srData, containerEl) {
  if (!srData || !containerEl) return;
  // Use cached WR if available in SPEEDRUN_IDS
  if (srData.wr) {
    renderWR({
      timeFormatted: parseSrTime(srData.wr),
      cat: srData.label,
      url: srData.url
    }, containerEl);
    return;
  }
  const wr = await fetchWR(srData);
  if (wr) renderWR(wr, containerEl);
  else containerEl.innerHTML = `<a href="${srData.url}" target="_blank" rel="noopener" style="color:var(--neon);font-size:12.5px"><i class="fa-solid fa-stopwatch"></i> View speedruns →</a>`;
};

function renderWR(wr, el) {
  el.innerHTML = `<a href="${wr.url}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:10px;background:var(--neon-bg);border:1px solid var(--neon-border);border-radius:var(--r2);padding:10px 14px;text-decoration:none;transition:box-shadow .15s" onmouseover="this.style.boxShadow='var(--neon-box)'" onmouseout="this.style.boxShadow=''">
    <i class="fa-solid fa-stopwatch" style="color:var(--neon);font-size:18px"></i>
    <div>
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--t3)">World Record · ${wr.cat}</div>
      <div style="font-family:var(--mono);font-size:20px;font-weight:700;color:var(--neon);line-height:1">${wr.timeFormatted}</div>
    </div>
    <i class="fa-solid fa-arrow-up-right-from-square" style="color:var(--t3);font-size:12px;margin-left:4px"></i>
  </a>`;
}

// ── Render: Steam news feed ──────────────────────────────────
window.renderNewsSection = async function(appid, containerEl) {
  if (!appid || !containerEl) return;
  containerEl.innerHTML = '<div style="color:var(--t3);font-size:12px;padding:16px"><i class="fa-solid fa-spinner fa-spin"></i> Loading updates…</div>';
  const items = await fetchNews(appid, 5);
  if (!items.length) {
    containerEl.innerHTML = '<div style="color:var(--t3);font-size:12.5px">No recent news found.</div>';
    return;
  }
  containerEl.innerHTML = items.map(n => `
    <a href="${n.url}" target="_blank" rel="noopener"
      style="display:block;padding:11px 14px;background:var(--float);border:1px solid var(--b1);border-radius:var(--r2);margin-bottom:7px;text-decoration:none;transition:border-color .15s"
      onmouseover="this.style.borderColor='var(--b2)'" onmouseout="this.style.borderColor='var(--b1)'">
      <div style="font-weight:600;font-size:13px;color:var(--t1);margin-bottom:3px;line-height:1.4">${n.title}</div>
      <div style="font-size:10.5px;color:var(--t3)">${n.date}${n.author ? ' · ' + n.author : ''}</div>
    </a>`).join('');
};

// ── Render: Steam Review Score (real data from appreviews API) ──
window.renderReviews = async function(appid, containerEl) {
  if (!appid || !containerEl) return;
  try {
    // Use our reviews proxy which reads Steam's official appreviews endpoint
    const data = await apiFetch(`${API_BASE}/api/reviews?appid=${appid}`, `rev_${appid}`, 3600000);
    if (!data || !data.total) {
      containerEl.innerHTML = '<div style="color:var(--t3);font-size:11.5px">No review data yet.</div>';
      return;
    }

    const pct = data.total > 0 ? Math.round((data.positive / data.total) * 100) : 0;
    
    // Map Steam's score (0-9) or pct to color + label
    const scoreDesc = data.scoreDesc || '';
    const color = scoreDesc.includes('Overwhelmingly') ? 'var(--neon)'
                : scoreDesc.includes('Very Positive')  ? '#4ade80'
                : scoreDesc.includes('Mostly Positive')? 'var(--amber)'
                : scoreDesc.includes('Mixed')           ? '#f97316'
                : scoreDesc.includes('Negative')        ? 'var(--rose)'
                : pct >= 95 ? 'var(--neon)' : pct >= 80 ? '#4ade80' : pct >= 65 ? 'var(--amber)' : 'var(--rose)';
    
    const icon = pct >= 95 ? 'fa-face-laugh-beam' : pct >= 80 ? 'fa-thumbs-up' : pct >= 65 ? 'fa-face-meh' : 'fa-thumbs-down';
    
    const fmt = n => n >= 1000000 ? (n/1000000).toFixed(1)+'M' : n >= 1000 ? (n/1000).toFixed(0)+'K' : n;
    
    containerEl.innerHTML = `
      <div>
        <div style="display:flex;align-items:center;gap:7px;margin-bottom:7px">
          <i class="fa-solid ${icon}" style="color:${color};font-size:16px"></i>
          <span style="font-size:13px;font-weight:700;color:${color}">${scoreDesc}</span>
          <span style="font-size:11px;font-family:var(--mono);color:var(--t3);margin-left:auto">${pct}%</span>
        </div>
        <div style="height:5px;background:var(--b1);border-radius:3px;overflow:hidden;margin-bottom:7px">
          <div style="height:100%;width:${pct}%;background:${color};border-radius:3px;transition:width .8s cubic-bezier(.4,0,.2,1)"></div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;font-size:10.5px;color:var(--t3)">
          <span><i class="fa-solid fa-thumbs-up" style="color:#4ade80;font-size:9px"></i> ${fmt(data.positive)}</span>
          <span style="color:var(--b3)">·</span>
          <span>${fmt(data.total)} total reviews</span>
          <span style="color:var(--b3)">·</span>
          <span><i class="fa-solid fa-thumbs-down" style="color:var(--rose);font-size:9px"></i> ${fmt(data.negative)}</span>
        </div>
        ${data.metacritic ? `<div style="margin-top:8px;display:flex;align-items:center;gap:7px">
          <span style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--t3)">Metacritic</span>
          <span style="font-family:var(--mono);font-size:15px;font-weight:700;color:${data.metacritic>=90?'var(--neon)':data.metacritic>=75?'var(--amber)':'#f97316'}">${data.metacritic}</span>
        </div>` : ''}
      </div>`;
  } catch(e) {
    containerEl.innerHTML = '<div style="color:var(--t3);font-size:11.5px">Reviews unavailable.</div>';
  }
};

// ── Init: Load live data for current game page ───────────────
window.initLiveData = function(gameId, steamAppId) {
  if (!gameId) return;

  // Live player count in sidebar
  const playerEl = document.getElementById('livePlayerCount');
  if (playerEl && steamAppId) loadLivePlayers(steamAppId, playerEl);

  // Live prices via CheapShark
  const priceEl = document.getElementById('livePricesContainer');
  const csId = (typeof CHEAPSHARK_IDS !== 'undefined') && CHEAPSHARK_IDS[gameId];
  if (priceEl && csId) loadLivePrices(csId, priceEl);

  // Speedrun WR
  const srEl = document.getElementById('speedrunWR');
  const srData = (typeof SPEEDRUN_IDS !== 'undefined') && SPEEDRUN_IDS[gameId];
  if (srEl && srData) loadSpeedrunWR(srData, srEl);

  // Steam reviews via SteamSpy
  const revEl = document.getElementById('steamReviews');
  if (revEl && steamAppId) renderReviews(steamAppId, revEl);

  // Steam news
  const newsEl = document.getElementById('gameNewsContainer');
  if (newsEl && steamAppId) renderNewsSection(steamAppId, newsEl);

  // Price history via CheapShark
  const histEl = document.getElementById('priceHistory');
  const csId2 = (typeof CHEAPSHARK_IDS !== 'undefined') && CHEAPSHARK_IDS[gameId];
  if (histEl && csId2) loadPriceHistory(csId2, histEl);
  
  // Non-Steam game images
  if (!steamAppId && typeof applyNonSteamImage === 'function') {
    const heroImg = document.getElementById('gameHeroImg');
    if (heroImg) applyNonSteamImage(gameId, heroImg);
  }
  
  // ProtonDB Linux compatibility
  const protonEl = document.getElementById('protondbBadge');
  if (protonEl && steamAppId && typeof loadProtonDB === 'function') {
    loadProtonDB(steamAppId, protonEl);
  }
};

// CSS: pulsing green dot for live player count
if (!document.getElementById('live-css')) {
  const style = document.createElement('style');
  style.id = 'live-css';
  style.textContent = `
    @keyframes pulse {
      0%,100%{opacity:1;transform:scale(1)}
      50%{opacity:.5;transform:scale(1.3)}
    }`;
  document.head.appendChild(style);
}


// ── CheapShark: Price History for a game ────────────────────
window.loadPriceHistory = async function(csId, containerEl) {
  if (!csId || !containerEl) return;
  
  try {
    // Get game info with cheapest ever
    const info = await apiFetch(
      `https://www.cheapshark.com/api/1.0/games?id=${csId}`,
      `cs_info_${csId}`,
      3600000
    );
    
    if (!info || !info.cheapestPriceEver) return;
    
    const cheapestEver = parseFloat(info.cheapestPriceEver.price || 0);
    const cheapestDate = info.cheapestPriceEver.date;
    const currentSteam = parseFloat((info.deals || []).find(d => d.storeID === '1')?.salePrice || 0);
    const retail = parseFloat((info.deals || []).find(d => d.storeID === '1')?.normalPrice || cheapestEver * 4);
    const bestNow = Math.min(...(info.deals || []).map(d => parseFloat(d.salePrice || 999)));

    const savingsFromHistoricalLow = retail > 0 ? Math.round((1 - cheapestEver/retail) * 100) : 0;
    const savingsNow = retail > 0 && bestNow < retail ? Math.round((1 - bestNow/retail) * 100) : 0;
    
    const dateStr = cheapestDate ? new Date(cheapestDate * 1000).toLocaleDateString('en-US', {month:'short', year:'numeric'}) : '';
    
    containerEl.innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px">
        <div style="background:var(--deep);border:1px solid var(--b1);border-radius:var(--r2);padding:12px 14px;text-align:center">
          <div style="font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--t3);margin-bottom:4px">All-Time Low</div>
          <div style="font-family:var(--mono);font-size:22px;font-weight:700;color:var(--neon)">$${cheapestEver.toFixed(2)}</div>
          ${dateStr?`<div style="font-size:10px;color:var(--t3);margin-top:2px">${dateStr}</div>`:''}
          ${savingsFromHistoricalLow > 0 ? `<div style="font-size:10px;font-weight:600;color:var(--neon);margin-top:4px">${savingsFromHistoricalLow}% off retail</div>` : ''}
        </div>
        <div style="background:var(--deep);border:1px solid ${bestNow <= cheapestEver * 1.1 ? 'var(--neon-border)' : 'var(--b1)'};border-radius:var(--r2);padding:12px 14px;text-align:center">
          <div style="font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--t3);margin-bottom:4px">Best Price Now</div>
          <div style="font-family:var(--mono);font-size:22px;font-weight:700;color:${bestNow <= cheapestEver * 1.1 ? 'var(--neon)' : 'var(--amber)'}">$${bestNow.toFixed(2)}</div>
          ${savingsNow > 0 ? `<div style="font-size:10px;font-weight:600;color:var(--amber);margin-top:4px">−${savingsNow}% off retail</div>` : `<div style="font-size:10px;color:var(--t3);margin-top:4px">No active sale</div>`}
          ${bestNow <= cheapestEver * 1.1 ? `<div style="font-size:9.5px;color:var(--neon);margin-top:3px;font-weight:700">📉 Near historical low!</div>` : ''}
        </div>
      </div>`;
  } catch (e) {
    console.warn('[live.js] price history failed:', e.message);
  }
};

// ── Load Trending Games (by live Steam player count) ─────────
window.loadTrendingGames = async function(containerEl) {
  if (!containerEl) return;
  
  const gamesToCheck = GAMES.filter(g => g.steam && g.cat).slice(0, 30);
  const results = [];
  
  // Batch fetch player counts (fire all simultaneously)
  const promises = gamesToCheck.map(async g => {
    const data = await apiFetch(`${API_BASE}/api/players?appid=${g.steam}`, `players_${g.steam}`);
    return { g, players: data?.players || 0 };
  });
  
  const settled = await Promise.allSettled(promises);
  settled.forEach(r => {
    if (r.status === 'fulfilled' && r.value.players > 0) {
      results.push(r.value);
    }
  });
  
  results.sort((a, b) => b.players - a.players);
  const top8 = results.slice(0, 8);
  
  if (!top8.length) return;
  
  const maxPlayers = top8[0].players;
  containerEl.innerHTML = top8.map(({ g, players }, i) => {
    const pct = Math.round((players / maxPlayers) * 100);
    const fmt = n => n >= 1000000 ? (n/1000000).toFixed(1)+'M' : n >= 1000 ? (n/1000).toFixed(1)+'K' : n;
    const img = g.steam ? `https://cdn.cloudflare.steamstatic.com/steam/apps/${g.steam}/header.jpg` : '';
    return `<div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--b1);cursor:pointer"
      onclick="typeof openModal !== 'undefined' && openModal('${g.id}')" 
      onmouseover="this.style.background='var(--float)'" onmouseout="this.style.background=''">
      <div style="font-family:var(--mono);font-size:13px;color:${i<3?'var(--neon)':'var(--t3)'};width:20px;text-align:center;flex-shrink:0;font-weight:700">${i+1}</div>
      <img src="${img}" style="width:50px;height:23px;object-fit:cover;border-radius:3px;flex-shrink:0" onerror="this.style.display='none'">
      <div style="flex:1;min-width:0">
        <div style="font-size:13px;font-weight:600;color:var(--t1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${g.title}</div>
        <div style="display:flex;align-items:center;gap:6px;margin-top:3px">
          <div style="height:3px;width:${Math.max(pct,4)}%;background:${i===0?'var(--neon)':i<3?'var(--amber)':'var(--b2)'};border-radius:2px;transition:width .6s"></div>
        </div>
      </div>
      <div style="font-family:var(--mono);font-size:12px;font-weight:700;color:${i<3?'var(--neon)':'var(--t3)'};flex-shrink:0">
        <span style="display:inline-flex;align-items:center;gap:3px">
          <span style="width:5px;height:5px;border-radius:50%;background:var(--neon);display:inline-block;animation:pulse 2s infinite"></span>
          ${fmt(players)}
        </span>
      </div>
    </div>`;
  }).join('');
};


// ============================================================
// STEAM DATA ENRICHMENT — Real images, screenshots, trailers
// ============================================================

// ── Fetch full Steam game info ────────────────────────────────
async function fetchSteamInfo(appid) {
  if (!appid) return null;
  return await apiFetch(`${API_BASE}/api/steaminfo?appid=${appid}`, `info_${appid}`, 86400000);
}

// ── Load screenshot gallery ───────────────────────────────────
window.loadScreenshots = async function(appid, galleryEl, wrapperEl) {
  if (!appid || !galleryEl) return;
  
  const info = await fetchSteamInfo(appid);
  if (!info?.images?.screenshots?.length) return;
  
  if (wrapperEl) wrapperEl.style.display = 'block';
  
  galleryEl.innerHTML = info.images.screenshots.map((s, i) => `
    <div style="aspect-ratio:16/9;overflow:hidden;border-radius:var(--r2);cursor:pointer;position:relative;background:var(--float)"
      onclick="openLightbox('${s.full}')">
      <img src="${s.thumb}" loading="lazy" alt="Screenshot ${i+1}"
        style="width:100%;height:100%;object-fit:cover;transition:transform .3s var(--ease)"
        onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform=''"
        onerror="this.parentElement.style.display='none'">
      <div style="position:absolute;inset:0;background:rgba(0,0,0,0);transition:background .2s"
        onmouseover="this.style.background='rgba(0,255,136,.08)'" onmouseout="this.style.background='rgba(0,0,0,0)'">
        <i class="fa-solid fa-expand" style="position:absolute;bottom:8px;right:8px;color:rgba(255,255,255,.6);font-size:14px;opacity:0;transition:opacity .2s" class="expand-icon"></i>
      </div>
    </div>`).join('');
  
  // Preload first 3
  info.images.screenshots.slice(0, 3).forEach(s => {
    const img = new Image(); img.src = s.thumb;
  });
};

window.openLightbox = function(src) {
  const lb = document.getElementById('screenshotLightbox');
  const img = document.getElementById('lightboxImg');
  if (!lb || !img) return;
  img.src = src;
  lb.style.display = 'flex';
};

// ── Load game trailer (Steam CDN MP4) ─────────────────────────
window.loadTrailer = async function(appid, wrapperEl, videoEl, srcEl, posterEl) {
  if (!appid || !videoEl || !srcEl) return;
  
  const info = await fetchSteamInfo(appid);
  const trailers = info?.trailers || [];
  
  // Find main highlight trailer, or first available
  const trailer = trailers.find(t => t.highlight && t.mp4_480) || trailers.find(t => t.mp4_480);
  if (!trailer) return;
  
  if (wrapperEl) wrapperEl.style.display = 'block';
  if (posterEl && trailer.thumbnail) posterEl.poster = trailer.thumbnail;
  if (srcEl) srcEl.src = trailer.mp4_480;
  if (videoEl) {
    videoEl.poster = trailer.thumbnail || '';
    videoEl.load();
  }
};

// ── Enhance game page hero with Steam background art ──────────
window.enhanceGameHero = async function(appid, bgEl, heroImgEl) {
  if (!appid) return;
  
  // Use Steam CDN portrait as the visible image  
  const portrait = `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/capsule_616x353.jpg`;
  const background = `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/page_bg_generated_v6b.jpg`;
  const header = `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/header.jpg`;
  
  // Set background art (blurred behind) 
  if (bgEl) {
    bgEl.style.backgroundImage = `url('${background}')`;
    // Fallback to header if background fails
    const testImg = new Image();
    testImg.onerror = () => { bgEl.style.backgroundImage = `url('${header}')`; };
    testImg.src = background;
  }
  
  // Fetch full info to get best screenshot as hero
  const info = await fetchSteamInfo(appid);
  if (!info) return;
  
  // Use the first full-res screenshot as a secondary enrichment
  const firstShot = info.images?.screenshots?.[0]?.full;
  if (firstShot && heroImgEl) {
    // Only swap if the screenshot loaded (it's usually better quality)
    const img = new Image();
    img.onload = () => {
      if (heroImgEl && firstShot) {
        heroImgEl.src = firstShot;
        heroImgEl.style.opacity = '1';
      }
    };
    img.onerror = () => {
      if (heroImgEl) heroImgEl.style.opacity = '1';
    };
    img.src = firstShot;
  } else if (heroImgEl) {
    heroImgEl.style.opacity = '1';
  }
};

// ── Render Steam metadata block (genres, categories, platforms) ─
window.renderSteamData = async function(appid, containerEl) {
  if (!appid || !containerEl) return;
  
  const info = await fetchSteamInfo(appid);
  if (!info) return;
  
  const badge = (text, color='var(--t3)', bg='var(--float)') =>
    `<span style="font-size:10.5px;font-weight:600;padding:3px 9px;border-radius:4px;background:${bg};color:${color};border:1px solid ${color === 'var(--t3)' ? 'var(--b1)' : color+'40'}">${text}</span>`;
  
  const platformBadges = [
    info.platforms.windows ? badge('<i class="fab fa-windows"></i> Windows', 'var(--ice)', 'rgba(56,217,245,.1)') : '',
    info.platforms.mac ? badge('<i class="fab fa-apple"></i> Mac', 'var(--t2)', 'var(--float)') : '',
    info.platforms.linux ? badge('<i class="fab fa-linux"></i> Linux', 'var(--amber)', 'rgba(245,200,66,.1)') : '',
  ].filter(Boolean);
  
  const genreBadges = (info.genres || []).map(g => badge(g, 'var(--neon)', 'var(--neon-bg)')).join(' ');
  const catBadges = (info.categories || []).slice(0, 8).map(c => badge(c)).join(' ');
  
  let rows = [];
  if (info.developers?.length) rows.push(['Developer', info.developers.join(', ')]);
  if (info.publishers?.length && info.publishers.join('') !== info.developers?.join('')) 
    rows.push(['Publisher', info.publishers.join(', ')]);
  if (info.releaseDate) rows.push(['Released', info.releaseDate]);
  if (info.price) rows.push(['Base Price', info.price]);
  if (info.dlcCount > 0) rows.push(['DLC', `${info.dlcCount} piece${info.dlcCount>1?'s':''} available`]);
  if (info.recommendations) rows.push(['Total Reviews', info.recommendations.toLocaleString()]);
  if (info.metacritic) rows.push(['Metacritic', `${info.metacritic}/100`]);
  
  containerEl.innerHTML = `
    <div style="background:var(--card);border:1px solid var(--b1);border-radius:var(--r3);padding:20px 24px">
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:var(--t3);margin-bottom:14px">
        <i class="fa-brands fa-steam" style="color:var(--neon)"></i> Steam Data
      </div>
      
      ${rows.length ? `<div style="display:grid;grid-template-columns:auto 1fr;gap:8px 20px;margin-bottom:14px">
        ${rows.map(([label, val]) => `
          <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--t3);white-space:nowrap;align-self:center">${label}</div>
          <div style="font-size:13px;font-weight:600;color:var(--t1)">${val}</div>
        `).join('')}
      </div>` : ''}
      
      ${platformBadges.length ? `<div style="margin-bottom:10px">
        <div style="font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--t3);margin-bottom:6px">Platforms</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">${platformBadges.join('')}</div>
      </div>` : ''}
      
      ${info.genres?.length ? `<div style="margin-bottom:10px">
        <div style="font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--t3);margin-bottom:6px">Genres</div>
        <div style="display:flex;gap:5px;flex-wrap:wrap">${genreBadges}</div>
      </div>` : ''}
      
      ${info.categories?.length ? `<div>
        <div style="font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--t3);margin-bottom:6px">Features</div>
        <div style="display:flex;gap:5px;flex-wrap:wrap">${catBadges}</div>
      </div>` : ''}
      
      ${info.website ? `<div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--b1)">
        <a href="${info.website}" target="_blank" rel="noopener" style="color:var(--neon);font-size:12.5px;display:flex;align-items:center;gap:6px">
          <i class="fa-solid fa-globe"></i>Official Website
        </a>
      </div>` : ''}
    </div>`;
};

// ── Non-Steam game images (hardcoded from official CDNs) ───────
const NON_STEAM_IMAGES = {
  'league-of-legends': 'https://www.riotgames.com/darkroom/1440/d0807e131a84b5b1b63bd0e07fbe92d7:e3eed6b50d49e4ed4abb7a9a175c3eef/valorant-768x432.jpg',
  'valorant': 'https://www.riotgames.com/darkroom/1440/786fad5be6cfb0af6a71fe1a58db0cf0:c7bd7e9aec9b36c42399ef0f5b1faa58/about-header-valorant-mobile.jpg',
  'genshin-impact': 'https://upload-os-bbs.hoyolab.com/upload/2021/11/03/74651170/1b1264e58c4d1d91a8fce9b70f0d44b4_1867521490869088041.jpg',
  'fortnite': 'https://cdn2.unrealengine.com/Fortnite%2FFNBR_EducationHeroBanner_1920x1080-1920x1080-3734fbc9ecd37c4cbfc2dfd9fc11e9f42d98e5a3.jpg',
  'hearthstone': 'https://bnetcmsus-a.akamaihd.net/cms/gallery/A3RBL9YKXW8E1604618519353.jpg',
  'minecraft': 'https://www.minecraft.net/content/dam/games/minecraft/key-art/games-commerce-page_Minecraft-Java-and-Bedrock_810x500.jpg',
};

// Apply non-Steam images where needed
window.applyNonSteamImage = function(gameId, imgEl) {
  const url = NON_STEAM_IMAGES[gameId];
  if (url && imgEl) {
    imgEl.src = url;
    imgEl.onerror = () => { imgEl.style.opacity = '0.4'; };
  }
};


// ── ProtonDB Linux Compatibility ─────────────────────────────
window.loadProtonDB = async function(appid, containerEl) {
  if (!appid || !containerEl) return;
  try {
    const d = await apiFetch(`${API_BASE}/api/protondb?appid=${appid}`, `pdb_${appid}`, 86400000);
    if (!d || d.tier === 'unknown') return;
    const COLORS = { platinum:'#e5e4e2', gold:'#ffd700', silver:'#c0c0c8', bronze:'#cd8040', borked:'#ff4444' };
    const color = COLORS[d.tier] || '#666';
    containerEl.innerHTML = `<a href="https://www.protondb.com/app/${appid}" target="_blank" rel="noopener"
      style="display:inline-flex;align-items:center;gap:8px;background:rgba(${d.tier==='platinum'?'229,228,226':d.tier==='gold'?'255,215,0':'180,180,200'},.08);border:1px solid ${color}40;border-radius:var(--r2);padding:8px 12px;text-decoration:none;transition:box-shadow .15s"
      onmouseover="this.style.boxShadow='0 0 12px ${color}40'" onmouseout="this.style.boxShadow=''">
      <span style="font-family:var(--mono);font-size:16px">${d.icon||'🎮'}</span>
      <div>
        <div style="font-size:11px;font-weight:700;color:${color};text-transform:uppercase;letter-spacing:.06em">Linux: ${d.label}</div>
        <div style="font-size:10.5px;color:var(--t3)">${d.desc} · ${d.total||0} reports</div>
      </div>
    </a>`;
  } catch(e) {}
};

console.log('[live.js] VAULT.GG Live Data API ready');
