// ============================================================
// VAULT.GG — App v4
// NO module-level DOM queries. All DOM access inside functions.
// openModal / closeModal / openVideo / closeVideo on window.
// ============================================================

const $  = id  => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);
const gm = id  => GAMES.find(g => g.id === id);
const TIER_CLS = {S:'tier-s',A:'tier-a',B:'tier-b',C:'tier-c'};
const STATUS_I = {confirmed:'fa-circle-check',likely:'fa-clock',tba:'fa-question-circle'};

let heroIdx = 0, heroTimer = null, modalGame = null;

// ── Safe image ──────────────────────────────────────────────
function gameImg(g, format) {
  if (!g) return '';
  if (g.imgUrl && g.imgUrl !== 'null') return g.imgUrl;
  if (g.steam) {
    // Use capsule (wider, better quality) for cards; header for compact views
    const fmt = format || 'header';
    if (fmt === 'portrait') return `https://cdn.cloudflare.steamstatic.com/steam/apps/${g.steam}/library_600x900.jpg`;
    if (fmt === 'capsule')  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${g.steam}/capsule_616x353.jpg`;
    if (fmt === 'hero')     return `https://cdn.cloudflare.steamstatic.com/steam/apps/${g.steam}/hero_capsule.jpg`;
    return `https://cdn.cloudflare.steamstatic.com/steam/apps/${g.steam}/capsule_616x353.jpg`;
  }
  const colors = {'League of Legends':'3d93d6','Valorant':'ff4655','Hearthstone':'c9a227',
    'Fortnite':'6fcee4','StarCraft II':'2d87c3','Minecraft':'7fb23a',
    'Diablo II: Resurrected':'c7362a','Honkai: Star Rail':'a78bfa',
    'Escape from Tarkov':'8b6914','Genshin Impact':'6bbbde'};
  const hex = colors[g.title] || '00ff88';
  const t = encodeURIComponent(g.title), s = encodeURIComponent(g.genre||'');
  return `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 460 215'><rect fill='%230d0e14' width='460' height='215'/><rect fill='%23${hex}' opacity='0.1' width='460' height='215'/><text fill='%23${hex}' font-family='Arial Black,Arial' font-weight='900' font-size='20' x='230' y='95' text-anchor='middle' dominant-baseline='middle'>${t}</text><text fill='%23666878' font-family='Arial' font-size='12' x='230' y='132' text-anchor='middle' dominant-baseline='middle'>${s}</text></svg>`;
}

// ── Hero ─────────────────────────────────────────────────────
function buildHero() {
  const wrap = $('heroSlides'), dots = $('heroDots');
  if (!wrap || !dots) return;
  HERO_IDS.forEach((id, i) => {
    const g = gm(id); if (!g) return;
    const slide = document.createElement('div');
    slide.className = 'hero-slide' + (i===0?' active':'');
    slide.innerHTML = `
      <img class="hero-img" src="${gameImg(g)}" alt="${g.title}" onerror="this.style.opacity='0'">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div class="hero-tag"><i class="fa-solid ${icon(g.genre)}"></i>${g.genre}</div>
        <h1 class="hero-title">${g.title}</h1>
        <p class="hero-desc">${g.desc.slice(0,150)}…</p>
        <div class="hero-meta">
          ${g.score?`<span class="hero-score"><i class="fa-solid fa-star"></i>${g.score}</span>`:''}
          ${g.hltb?.main?`<span class="hero-hltb"><i class="fa-solid fa-hourglass-half"></i>${g.hltb.main}h</span>`:''}
          <span class="hero-year mono">${g.dev} · ${g.year}</span>
        </div>
        <div class="hero-btns">
          <a class="btn btn-primary" href="game.html?id=${g.id}">
            <i class="fa-solid fa-circle-info"></i>Full Page
          </a>
          <button class="btn btn-ghost" onclick="openModal('${g.id}')">
            <i class="fa-solid fa-expand"></i>Quick View
          </button>
          ${g.yt?`<button class="btn btn-ghost" onclick="openVideo('${g.yt}','${g.title.replace(/'/g,"\\'")}')"><i class="fa-solid fa-play"></i>Watch</button>`:''}
          ${g.steam?`<a class="btn btn-ghost" href="https://store.steampowered.com/app/${g.steam}/" target="_blank" rel="noopener"><i class="fa-brands fa-steam"></i>Steam</a>`:''}
        </div>
      </div>`;
    wrap.appendChild(slide);
    const dot = document.createElement('button');
    dot.className = 'hero-dot'+(i===0?' active':'');
    dot.onclick = ()=>{toSlide(i);resetTimer();};
    dots.appendChild(dot);
  });
  heroTimer = setInterval(()=>toSlide(heroIdx+1), 5500);
}
function toSlide(n){
  const slides=$$('.hero-slide'), dots=$$('.hero-dot');
  if(!slides.length)return;
  slides[heroIdx].classList.remove('active'); dots[heroIdx]?.classList.remove('active');
  heroIdx = ((n%slides.length)+slides.length)%slides.length;
  slides[heroIdx].classList.add('active'); dots[heroIdx]?.classList.add('active');
}
function resetTimer(){ clearInterval(heroTimer); heroTimer=setInterval(()=>toSlide(heroIdx+1),5500); }

// ── Counters ─────────────────────────────────────────────────
function animateCounters() {
  $$('[data-count]').forEach(el=>{
    const target=+el.dataset.count, suffix=el.dataset.suffix||'+';
    let cur=0;
    const t=setInterval(()=>{ cur=Math.min(cur+target/80,target);
      el.textContent=Math.floor(cur)+(cur>=target?suffix:'');
      if(cur>=target)clearInterval(t);},16);
  });
}

// ── Top 10 ───────────────────────────────────────────────────
function buildTop10() {
  const grid=$('top10Grid'); if(!grid)return;
  TOP10.forEach((id,i)=>{
    const g=gm(id); if(!g)return;
    const rc=['rank-gold','rank-silver','rank-bronze'][i]||'rank-other';
    const el=document.createElement('div');
    el.className='top10-card';
    el.onclick=()=>openModal(g.id);
    el.innerHTML=`
      <div class="top10-rank ${rc}">${i+1}</div>
      <img class="top10-img" src="${gameImg(g)}" alt="${g.title}" loading="lazy" onerror="this.style.opacity='.3'">
      <div class="top10-body">
        <div class="top10-genre"><i class="fa-solid ${icon(g.genre)}"></i> ${g.genre}</div>
        <div class="top10-title">${g.title}</div>
        <div class="top10-meta">
          ${g.hltb?.main?`<span><i class="fa-solid fa-hourglass-half"></i>${g.hltb.main}h</span>`:''}
          ${g.score?`<span><i class="fa-solid fa-star"></i>${g.score}</span>`:''}
          ${g.players?`<span><i class="fa-solid fa-signal"></i>${g.players}</span>`:''}
        </div>
        <div class="top10-note">${g.desc.slice(0,88)}…</div>
      </div>`;
    grid.appendChild(el);
  });
}

// ── Game card ─────────────────────────────────────────────────
function makeCard(g) {
  const el=document.createElement('div');
  el.className='game-card';
  el.onclick=e=>{ if(e.target.closest('.card-play-btn'))return; openModal(g.id); };
  el.innerHTML=`
    <div class="card-img-wrap">
      <img class="card-img" src="${gameImg(g)}" alt="${g.title}" loading="lazy" onerror="this.style.opacity='.3'">
      <span class="card-tier ${TIER_CLS[g.tier]||'tier-c'}">${g.tier||'?'}</span>
      ${g.yt?`<button class="card-play-btn" onclick="event.stopPropagation();openVideo('${g.yt}','${g.title.replace(/'/g,"\\'")}')"><i class="fa-solid fa-play"></i></button>`:''}
    </div>
    <div class="card-body">
      <div class="card-genre"><i class="fa-solid ${icon(g.genre)}"></i> ${g.genre}</div>
      <div class="card-title">${g.title}</div>
      <div class="card-foot">
        <span class="card-dev">${g.dev}</span>
        <div class="card-foot-right">
          ${g.players?`<span class="card-players"><i class="fa-solid fa-signal"></i>${g.players}</span>`:''}
          ${g.score?`<span class="card-score"><i class="fa-solid fa-star"></i>${g.score}</span>`:''}
        </div>
      </div>
      ${g.hltb?.main?`<div class="card-hltb"><i class="fa-regular fa-clock"></i>${g.hltb.main}h · ${g.hltb.comp}h 100%</div>`:''}
    </div>`;
  return el;
}

// ── Also a link-card for game pages ──────────────────────────
function makeLinkCard(g) {
  const el = makeCard(g);
  el.onclick = null;
  el.style.cursor = 'pointer';
  el.addEventListener('click', e => {
    if (e.target.closest('.card-play-btn')) return;
    window.location.href = `game.html?id=${g.id}`;
  });
  return el;
}

// ── Browse / filters ─────────────────────────────────────────
let curFilter='all', curSearch='';
function buildFilters() {
  const bar=$('filterBar'); if(!bar)return;
  FILTERS.forEach(f=>{
    const btn=document.createElement('button');
    btn.className='chip'+(f.id==='all'?' active':'');
    btn.dataset.filter=f.id;
    btn.innerHTML=`<i class="fa-solid ${f.icon}"></i>${f.label}`;
    btn.onclick=()=>setFilter(f.id);
    bar.appendChild(btn);
  });
}
function setFilter(id){
  curFilter=id;
  $$('.chip').forEach(b=>b.classList.toggle('active',b.dataset.filter===id));
  renderGrid();
}
function getFiltered(){
  const q=curSearch, cat=curFilter, seen=new Set();
  return GAMES.filter(g=>{
    if(!g.cat||seen.has(g.id))return false;
    const ok=(cat==='all'||g.cat.includes(cat))&&
             (!q||[g.title,g.genre,g.dev||''].some(s=>s.toLowerCase().includes(q)));
    if(ok){seen.add(g.id);return true;}return false;
  });
}
function renderGrid(){
  const grid=$('gameGrid'); if(!grid)return;
  const games=getFiltered();
  grid.innerHTML='';
  if(!games.length){
    grid.innerHTML=`<div class="empty-state"><i class="fa-solid fa-magnifying-glass-minus"></i><p>No games found</p><button class="btn btn-ghost" onclick="clearSearch()">Clear</button></div>`;
    return;
  }
  games.forEach(g=>grid.appendChild(makeCard(g)));
}
window.clearSearch=function(){
  const si=$('searchInput'); if(si)si.value='';
  curSearch=''; setFilter('all');
};

// ── Esports ──────────────────────────────────────────────────
function buildEsports(){
  const grid=$('esportGrid'); if(!grid)return;
  const seen=new Set();
  GAMES.filter(g=>g.cat?.includes('esports')&&!seen.has(g.id)&&seen.add(g.id)).forEach(g=>{
    const s=g.esportStats||{};
    const el=document.createElement('div');
    el.className='esport-card';
    el.onclick=()=>openModal(g.id);
    el.innerHTML=`
      <div class="esport-img-wrap">
        <img class="esport-img" src="${gameImg(g)}" alt="${g.title}" loading="lazy" onerror="this.style.opacity='.3'">
        ${g.yt?`<button class="card-play-btn" onclick="event.stopPropagation();openVideo('${g.yt}','${g.title.replace(/'/g,"\\'")}')"><i class="fa-solid fa-play"></i></button>`:''}
      </div>
      <div class="esport-body">
        <div class="esport-title">${g.title}</div>
        <div class="esport-genre"><i class="fa-solid ${icon(g.genre)}"></i> ${g.genre}</div>
        ${Object.keys(s).length?`<div class="esport-stats">
          ${s.prize?`<div class="stat-pill"><span>${s.prize}</span><label>Prize Pool</label></div>`:''}
          ${s.viewers?`<div class="stat-pill"><span>${s.viewers}</span><label>Peak Viewers</label></div>`:''}
          ${s.fact?`<div class="stat-pill"><span>${s.fact}</span><label>Key Stat</label></div>`:''}
        </div>`:''}
      </div>`;
    grid.appendChild(el);
  });
}

// ── Section builder (anime / nostalgia / mods / gems) ────────
function buildSection(gridId, category){
  const grid=$(gridId); if(!grid)return;
  const seen=new Set();
  GAMES.filter(g=>g.cat?.includes(category)&&!seen.has(g.id)&&seen.add(g.id)).forEach(g=>grid.appendChild(makeCard(g)));
}

// ── Upcoming ─────────────────────────────────────────────────
function buildUpcoming(){
  const grid=$('upcomingGrid'); if(!grid)return;
  UPCOMING.forEach(u=>{
    const el=document.createElement('div');
    el.className=`upcoming-card status-${u.status}`;
    el.innerHTML=`
      <div class="upcoming-head">
        <div class="upcoming-status-icon"><i class="fa-solid ${STATUS_I[u.status]}"></i></div>
        <span class="upcoming-date mono">${u.date}</span>
      </div>
      <div class="upcoming-title">${u.title}</div>
      <div class="upcoming-genre"><i class="fa-solid ${icon(u.genre)}"></i> ${u.genre} · <em>${u.dev}</em></div>
      <p class="upcoming-note">${u.note}</p>
      <div class="upcoming-platform"><i class="fa-solid fa-desktop"></i> ${u.platform}</div>`;
    grid.appendChild(el);
  });
}

// ── Borderlands ──────────────────────────────────────────────
function buildBorderlands(){
  const tl=$('blTimeline'); if(!tl)return;
  BORDERLANDS.forEach((g,i)=>{
    const isMain=g.type==='main';
    const el=document.createElement('div');
    el.className='bl-row';
    el.innerHTML=`
      <div class="bl-spine">
        <div class="bl-dot ${isMain?'dot-main':'dot-spin'}"></div>
        ${i<BORDERLANDS.length-1?'<div class="bl-line"></div>':''}
      </div>
      <div class="bl-card ${isMain?'card-main':'card-spin'}">
        <div class="bl-card-head">
          <div>
            <span class="bl-type-badge ${isMain?'badge-main':'badge-spin'}">
              <i class="fa-solid ${isMain?'fa-bookmark':'fa-bookmark-slash'}"></i>${isMain?'MAINLINE':'SPINOFF'}
            </span>
            <div class="bl-card-title">${g.title}</div>
          </div>
          <div class="bl-card-right">
            <div class="mono bl-year">${g.year}</div>
            ${g.score?`<div class="bl-score"><i class="fa-solid fa-star"></i>${g.score}</div>`:''}
          </div>
        </div>
        <p class="bl-card-note">${g.note}</p>
        <div class="bl-badges">
          ${g.best?`<span class="bl-badge badge-best"><i class="fa-solid fa-crown"></i>Best in franchise</span>`:''}
          ${(g.badges||[]).slice(1).map(b=>`<span class="bl-badge">${b}</span>`).join('')}
          ${g.steam?`<a class="bl-badge badge-steam" href="https://store.steampowered.com/app/${g.steam}/" target="_blank" rel="noopener" onclick="event.stopPropagation()"><i class="fa-brands fa-steam"></i>Steam</a>`:''}
        </div>
      </div>`;
    tl.appendChild(el);
  });
}

// ── Achievements section ──────────────────────────────────────
function buildAchievements(){
  const grid=$('achievementsGrid'); if(!grid)return;
  GAMES.filter(g=>g.achievements?.length>0).slice(0,12).forEach(g=>{
    const card=document.createElement('div');
    card.className='ach-game-card';
    card.innerHTML=`
      <div class="ach-game-head" onclick="this.closest('.ach-game-card').classList.toggle('open')">
        <img class="ach-game-img" src="${gameImg(g)}" alt="${g.title}" loading="lazy" onerror="this.style.opacity='.3'">
        <div class="ach-game-info">
          <div class="ach-game-title">${g.title}</div>
          <div class="ach-game-sub"><i class="fa-solid fa-trophy"></i>${g.achievements.length} achievements
            ${g.yt?`&nbsp;·&nbsp;<span onclick="event.stopPropagation();openVideo('${g.yt}','${g.title.replace(/'/g,"\\'")}');" style="cursor:pointer;color:var(--neon)"><i class="fa-solid fa-play"></i>Watch</span>`:''}
            &nbsp;·&nbsp;<a href="game.html?id=${g.id}" onclick="event.stopPropagation()" style="color:var(--neon)"><i class="fa-solid fa-arrow-up-right-from-square"></i>Full page</a>
          </div>
        </div>
        <i class="fa-solid fa-chevron-down ach-chevron"></i>
      </div>
      <div class="ach-list">
        ${g.achievements.map(a=>`
          <div class="ach-item">
            <div class="ach-top">
              <div class="ach-name">${a.name}</div>
              <div class="ach-diff" style="color:${(DIFF_COLOR||[])[a.diff]||'#fff'}">
                <i class="fa-solid fa-shield-halved"></i>${(DIFF||[])[a.diff]||''}
              </div>
            </div>
            <div class="ach-desc">${a.desc}</div>
            <details class="ach-guide">
              <summary><i class="fa-solid fa-scroll"></i>How to Unlock</summary>
              <div class="ach-guide-body">
                <div class="ach-how">${a.how}</div>
                ${a.tip?`<div class="ach-tip"><i class="fa-solid fa-lightbulb"></i><strong>Pro Tip:</strong> ${a.tip}</div>`:''}
              </div>
            </details>
          </div>`).join('')}
      </div>`;
    grid.appendChild(card);
  });
}

// ── Guides section ────────────────────────────────────────────
function buildGuides(){
  const grid=$('guidesGrid'); if(!grid)return;
  const GUIDE_DATA=[
    {game:'Elden Ring',color:'#ff5c35',icon:'fa-skull',title:'Beginner Complete Guide',
     sections:[
      {h:'Best Starting Class',b:'Vagabond (tanky) or Astrologer (mage easy mode). Avoid Wretch unless you\'ve played before.'},
      {h:'First Priority',b:'Do NOT rush Stormveil. Explore Limgrave: get Torrent from Melina, find the Flask of Wondrous Physick at Third Church of Marika, farm runes on the dragon at Agheel Lake.'},
      {h:'Early Weapons',b:'Uchigatana (Deathtouched Catacombs, free), Meteorite Staff (Caelid swamp — grabs you a +6 staff instantly for mages), Reduvia (reward from Bloody Finger Hunter Yura questline).'},
      {h:'Boss Tips',b:'Margit: buy Margit\'s Shackle from Patches. Godrick: summon Nepheli Loux at the fog gate. Radahn: use every NPC summon in the arena.'},
     ]},
    {game:"Baldur's Gate 3",color:'#a78bfa',icon:'fa-hat-wizard',title:'Build & Playthrough Guide',
     sections:[
      {h:'Strongest Build',b:'Paladin 2 / Sorcerer 10 (Sorlock). Storm Sorcery + Oath of Devotion. Smites powered by Charisma. Destroys everything in the game.'},
      {h:'Don\'t Miss These',b:'Karlach is north of the Emerald Grove — Wyll\'s quest wants you to kill her. Find her first. Rescue Volo from the Goblin Camp for a free eye implant. Side with Halsin to unlock major camp content.'},
      {h:'Act 1 Priority Items',b:'Sword of Justice from Anders, Spellmight Gloves from the Underdark, Hellrider Longbow from Inquisitor W\'wargaz in Goblin Camp. These carry you to Act 2.'},
      {h:'Honour Mode Tips',b:'Camp constantly. Raphael fight in Act 3 is optional — skip unless you\'re fully prepared. The Cazador fight requires stopping the ritual — attack immediately. Rescue Mizora for Wyll\'s real ending.'},
     ]},
    {game:'Cyberpunk 2077',color:'#00f5ff',icon:'fa-bolt',title:'Builds, Endings & Tips',
     sections:[
      {h:'Strongest Build (2.0)',b:'Sandevistan + Katana (Sandy Build): Max Reflexes + Technical Ability. Bullet time on demand. Most fun and cinematic build in the game.'},
      {h:'All 5 Endings',b:'The Sun: max Johnny affinity 60%, call Rogue. The Star: complete all Panam Aldecaldos quests, call Panam. The Devil: call Hanako. The Tower (Phantom Liberty): side fully with Songbird vs Reed. Temperance: give body to Alt at end.'},
      {h:'Missable Icons',b:'Skippy: in Heywood off main road (talking pistol, missable). Comrade\'s Hammer: drops from Smasher (1-shot build weapon). Overwatch: Panam quest reward. Legendary Mantis Blades: corpo start reward or purchase.'},
      {h:'Performance',b:'DLSS 3 Frame Gen + Path Tracing = best visuals in any game. Target 4K/60fps native. Watson district at night with rain and neon signs is the best screenshot location.'},
     ]},
    {game:'Deep Rock Galactic',color:'#00ff88',icon:'fa-gem',title:'Class Guide & Rock and Stone',
     sections:[
      {h:'Best Class to Start',b:'Gunner: easiest — minigun deletes everything. Scout: most mobile, for solo players. Driller: essential for tunneling shortcuts. Engineer: best crowd control with turrets.'},
      {h:'First Overclocks to Get',b:'After your first promotion: Gunner Hurricane → Carpet Bomber. Scout Cryo Bolt. Driller Persistent Plasma. Engineer Turret Arc. These completely change how each class plays.'},
      {h:'Haz 5 Rules',b:'Never solo unless Scout. Always ping minerals. Call out swarm spawns early. Dreadnoughts require all four dwarves focused and coordinated. Bug Trifecta weekly is your fastest XP.'},
      {h:'Culture (Not Optional)',b:'Rock and Stone is mandatory greeting. Barrel rolls in the drop pod. Salute the Miner\'s Statue in the Space Rig. These are not optional. You are a dwarf.'},
     ]},
    {game:'Hades / Hades 2',color:'#f43f5e',icon:'fa-dice-d20',title:'Boon Combos & Run Guide',
     sections:[
      {h:'Best Boon Synergies (H1)',b:'Zeus + Artemis: Pressure Points + lightning crit combos. Dionysus Call + Zeus Lightning: screen-clearing AoE. Poseidon + Aphrodite: knockback into Heartbreak Strike. Any Artemis + Artemis: infinite crits.'},
      {h:'Weapon Tier (H1)',b:'S Tier: Spear (Aspect of Achilles), Shield (Aspect of Chaos). A Tier: Sword, Rail. B Tier: Fists, Bow. Unlock Hidden Aspects with dialogue + gems — Guan Yu Spear is the strongest.'},
      {h:'Hades 2 Early Tips',b:"Witch's Staff + Aphrodite omega attacks clear Hecate easily. Prioritize Death Defiance purchases. Moon Mead at the Cauldron (3 Wheat) restores health between rooms — craft this every run."},
      {h:'High Heat Strategy',b:'Start Heat with Time Limit + Hard Labor. Never add Forced Overtime early. Court Musician Pact is near-free heat padding. At 20+ Heat: Tight Deadline + both damage modifiers becomes unavoidable.'},
     ]},
    {game:'Stardew Valley',color:'#7fb23a',icon:'fa-seedling',title:'Perfection Roadmap',
     sections:[
      {h:'Year 1 Farm Priority',b:'Spring: Strawberries from Egg Festival (1200g each). Summer: Blueberries + Hops for Kegs. Fall: Cranberries. Winter: mine to floor 120 for Skull Cavern preparation. Build Kegs immediately.'},
      {h:'Best Money Route',b:'Ancient Fruit Wine in Kegs = 1650g each (iridium quality = 3300g). Pale Ale is fastest turnaround in Summer. Goat Cheese aged to iridium in Casks is 1375g each with no growing cycle.'},
      {h:'Ginger Island',b:'Unlock after Willy\'s boat (100 hardwood, 5 iridium, 5 battery packs). Priority: banana sapling (Leo), Qi Gems for the shop, 100 Golden Walnuts for Walnut Room + Perfection tracker.'},
      {h:'Perfection Checklist',b:'Ship every crop/fish/item, cook every recipe, craft everything, max all skills, max all friendships (14 hearts if married), donate all museum artifacts, build Golden Clock (10M gold), plant Giant Crops in every farm type.'},
     ]},
  ];
  GUIDE_DATA.forEach(g=>{
    const card=document.createElement('div');
    card.className='guide-card';
    card.innerHTML=`
      <div class="guide-card-head" onclick="this.closest('.guide-card').classList.toggle('open')">
        <div class="guide-game-icon" style="color:${g.color}"><i class="fa-solid ${g.icon}"></i></div>
        <div class="guide-card-info">
          <div class="guide-game-name">${g.game}</div>
          <div class="guide-card-title">${g.title}</div>
        </div>
        <i class="fa-solid fa-chevron-down guide-chevron"></i>
      </div>
      <div class="guide-card-body">
        ${g.sections.map(s=>`
          <div class="guide-section">
            <div class="guide-section-title" style="color:${g.color}">
              <i class="fa-solid fa-caret-right"></i>${s.h}
            </div>
            <div class="guide-section-body">${s.b}</div>
          </div>`).join('')}
      </div>`;
    grid.appendChild(card);
  });
}

// ── PC Guide ─────────────────────────────────────────────────
function buildPCGuide(){
  const grid=$('pcGrid'); if(!grid)return;
  (PC_BUILDS||[]).forEach(b=>{
    const el=document.createElement('div');
    el.className='pc-card'; el.style.setProperty('--tier-color',b.color);
    el.innerHTML=`
      <div class="pc-card-head">
        <div class="pc-icon" style="color:${b.color}"><i class="fa-solid ${b.icon}"></i></div>
        <div><div class="pc-tier" style="color:${b.color}">${b.tier}</div><div class="pc-price">${b.price}</div></div>
      </div>
      <div class="pc-specs">
        <div class="pc-spec"><i class="fa-solid fa-microchip"></i><span>${b.cpu}</span></div>
        <div class="pc-spec"><i class="fa-solid fa-display"></i><span>${b.gpu}</span></div>
        <div class="pc-spec"><i class="fa-solid fa-memory"></i><span>${b.ram} RAM</span></div>
      </div>
      <div class="pc-can">${b.can}</div>
      <div class="pc-games-label">Runs great:</div>
      <div class="pc-games">${b.games.map(n=>`<span class="pc-game-tag">${n}</span>`).join('')}</div>`;
    grid.appendChild(el);
  });
}

// ── Video modal ───────────────────────────────────────────────
window.openVideo = function(ytId, title) {
  const modal=$('videoModal'), frame=$('videoFrame'), ttl=$('videoTitle');
  if(!modal||!frame) return;
  if(ttl) ttl.textContent=title||'';
  frame.src=`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`;
  modal.classList.add('open');
  document.body.style.overflow='hidden';
};
window.closeVideo = function() {
  const f=$('videoFrame'), m=$('videoModal');
  if(f) f.src='';
  if(m) m.classList.remove('open');
  document.body.style.overflow='';
};

// ── Game modal ────────────────────────────────────────────────
window.openModal = function(gameId) {
  const g=gm(gameId);
  if(!g){console.warn('openModal: not found',gameId);return;}
  modalGame=g;
  const modalEl=$('modal'); if(!modalEl){console.warn('#modal not in DOM');return;}
  const imgEl=$('modalImg'); if(imgEl){imgEl.src=gameImg(g);imgEl.alt=g.title;}
  const titleEl=$('modalTitle'); if(titleEl) titleEl.textContent=g.title;
  const genreEl=$('modalGenre'); if(genreEl) genreEl.innerHTML=`<i class="fa-solid ${icon(g.genre)}"></i>&nbsp;${g.genre}`;
  const achTab=$('tabAchievements'), vidTab=$('tabVideo');
  if(achTab) achTab.style.display=(g.achievements?.length)?'':'none';
  if(vidTab) vidTab.style.display=g.yt?'':'none';
  $$('.modal-tab').forEach(t=>t.classList.remove('active'));
  const ot=document.querySelector('.modal-tab[data-tab="overview"]');
  if(ot) ot.classList.add('active');
  const prTab=$('tabPrices');
  const hasPrices=(typeof PRICES!=='undefined')&&!!PRICES[g.id];
  if(prTab) prTab.style.display=hasPrices?'':'none';
  const modsTab=$('tabMods');
  const hasMods=(typeof MODS!=='undefined')&&!!MODS[g.id];
  if(modsTab) modsTab.style.display=hasMods?'':'none';
  renderTab('overview');
  modalEl.classList.add('open');
  document.body.style.overflow='hidden';
};
window.closeModal = function() {
  const m=$('modal'); if(!m)return;
  m.classList.remove('open');
  document.body.style.overflow='';
  modalGame=null;
};
window.setModalTab = function(tab) {
  $$('.modal-tab').forEach(t=>t.classList.toggle('active',t.dataset.tab===tab));
  renderTab(tab);
};

function buildModCard(m, typeColor, typeIcon) {
  const c=typeColor[m.type]||'var(--t3)', ic=typeIcon[m.type]||'fa-cube';
  return `<a href="${m.url}" target="_blank" rel="noopener" style="display:flex;align-items:flex-start;gap:12px;background:var(--float);border:1px solid var(--b1);border-radius:var(--r2);padding:12px 14px;margin-bottom:8px;text-decoration:none;transition:border-color .15s${m.essential?';border-left:2px solid '+c:''}"
    onmouseover="this.style.borderColor='${c}'" onmouseout="this.style.borderColor='${m.essential?c:''}'">
    <i class="fa-solid ${ic}" style="color:${c};font-size:14px;flex-shrink:0;margin-top:2px"></i>
    <div style="flex:1;min-width:0">
      <div style="display:flex;align-items:center;gap:7px;margin-bottom:3px;flex-wrap:wrap">
        <span style="font-weight:600;font-size:13.5px;color:var(--t1)">${m.name}</span>
        <span style="font-size:9px;font-weight:700;letter-spacing:.08em;padding:2px 6px;border-radius:3px;background:${c}20;color:${c};text-transform:uppercase">${m.type}</span>
        ${m.essential?`<span style="font-size:9px;font-weight:700;letter-spacing:.08em;padding:2px 6px;border-radius:3px;background:var(--neon-bg);color:var(--neon);text-transform:uppercase">ESSENTIAL</span>`:''}
      </div>
      <div style="font-size:11.5px;color:var(--t2);line-height:1.55">${m.desc}</div>
      <div style="font-size:10.5px;color:var(--t3);margin-top:4px"><i class="fa-solid fa-arrow-up-right-from-square" style="font-size:9px"></i> ${m.source}</div>
    </div>
  </a>`;
}

function renderTab(tab) {
  const body=$('modalTabBody'); if(!body||!modalGame)return;
  const g=modalGame;
  if(tab==='overview'){
    body.innerHTML=`
      <p class="modal-desc">${g.desc}</p>
      <div class="modal-meta">
        <div class="meta-item"><div class="meta-label">Developer</div><div class="meta-value">${g.dev}</div></div>
        <div class="meta-item"><div class="meta-label">Year</div><div class="meta-value">${g.year}</div></div>
        ${g.score?`<div class="meta-item"><div class="meta-label">Metacritic</div><div class="meta-value" style="color:var(--amber)">${g.score}</div></div>`:''}
        <div class="meta-item"><div class="meta-label">Tier</div><div class="meta-value" style="color:var(--neon)">${g.tier}</div></div>
        ${g.hltb?.main?`<div class="meta-item"><div class="meta-label">Main Story</div><div class="meta-value">${g.hltb.main}h</div></div>`:''}
        ${g.hltb?.comp?`<div class="meta-item"><div class="meta-label">Completionist</div><div class="meta-value">${g.hltb.comp}h</div></div>`:''}
        ${g.players?`<div class="meta-item"><div class="meta-label">Active Players</div><div class="meta-value" style="color:var(--neon)">${g.players}</div></div>`:''}
      </div>
      <div class="modal-actions">
        <a class="btn btn-ghost" href="game.html?id=${g.id}"><i class="fa-solid fa-arrow-up-right-from-square"></i>Full Page</a>
        ${g.steam?`<a class="btn btn-ghost" href="https://store.steampowered.com/app/${g.steam}/" target="_blank"><i class="fa-brands fa-steam"></i>Steam</a>`:''}
        ${g.yt?`<button class="btn btn-primary" onclick="openVideo('${g.yt}','${g.title.replace(/'/g,"\\'")}')"><i class="fa-solid fa-play"></i>Watch</button>`:''}
      </div>`;
  } else if(tab==='achievements'){
    if(!g.achievements?.length){body.innerHTML='<p style="color:var(--t3);text-align:center;padding:32px">No achievement data for this title yet.</p>';return;}
    body.innerHTML=g.achievements.map(a=>`
      <div class="modal-ach-item">
        <div class="modal-ach-top">
          <div class="modal-ach-name">${a.name}</div>
          <div class="modal-ach-diff" style="color:${(DIFF_COLOR||[])[a.diff]||'#fff'}">
            <i class="fa-solid fa-shield-halved"></i>${(DIFF||[])[a.diff]||''}
          </div>
        </div>
        <div class="modal-ach-desc">${a.desc}</div>
        <div class="modal-ach-how"><strong>How:</strong> ${a.how}</div>
        ${a.tip?`<div class="modal-ach-tip"><i class="fa-solid fa-lightbulb" style="color:var(--neon)"></i>${a.tip}</div>`:''}
      </div>`).join('');
  } else if(tab==='mods'){
    const md=(typeof MODS!=='undefined')&&MODS[g.id];
    if(!md){body.innerHTML='<p style="color:var(--t3);text-align:center;padding:32px">No mod data for this game yet.</p>';return;}
    const essentials=md.mods.filter(m=>m.essential);
    const extras=md.mods.filter(m=>!m.essential);
    const typeColor={framework:'var(--neon)',bugfix:'var(--amber)',ui:'var(--ice)',graphics:'#a78bfa',gameplay:'var(--amber)',content:'var(--rose)',qol:'var(--neon-dim)',tool:'var(--t2)',overhaul:'var(--rose)',world:'#4ade80',companion:'#f97316',modpack:'var(--rose)',campaign:'var(--amber)',gamemode:'var(--ice)',track:'#f5c842',car:'var(--t2)',audio:'#a78bfa',platform:'var(--ice)',guide:'var(--neon)',framework:'var(--neon)'};
    const typeIcon={framework:'fa-code',bugfix:'fa-bug',ui:'fa-sliders',graphics:'fa-image',gameplay:'fa-gamepad',content:'fa-box-open',qol:'fa-star',tool:'fa-wrench',overhaul:'fa-bolt',world:'fa-map',companion:'fa-user',modpack:'fa-cubes',campaign:'fa-map-location-dot',gamemode:'fa-dice',track:'fa-road',car:'fa-car',audio:'fa-music',platform:'fa-server',guide:'fa-book'};
    let html=`<div style="background:var(--neon-bg);border:1px solid var(--neon-border);border-radius:var(--r2);padding:12px 16px;margin-bottom:16px;font-size:12.5px;color:var(--t2)">
      <strong style="color:var(--neon)"><i class="fa-solid fa-puzzle-piece"></i> Hub:</strong> 
      <a href="${md.hubUrl}" target="_blank" rel="noopener" style="color:var(--neon)">${md.hub}</a> &nbsp;·&nbsp;
      <strong style="color:var(--neon)"><i class="fa-solid fa-wrench"></i> Manager:</strong> 
      <a href="${md.managerUrl}" target="_blank" rel="noopener" style="color:var(--neon)">${md.manager}</a>
      ${md.howto?`<div style="margin-top:8px;color:var(--t3)"><i class="fa-solid fa-circle-info"></i> ${md.howto}</div>`:''}
    </div>`;
    if(essentials.length){
      html+=`<div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--neon);margin-bottom:8px">⚡ Install First (Essential)</div>`;
      html+=essentials.map(m=>buildModCard(m,typeColor,typeIcon)).join('');
    }
    if(extras.length){
      html+=`<div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--t3);margin:12px 0 8px">Recommended Mods</div>`;
      html+=extras.map(m=>buildModCard(m,typeColor,typeIcon)).join('');
    }
    body.innerHTML=html;
  } else if(tab==='prices'){
    const p=(typeof PRICES!=='undefined')&&PRICES[g.id];
    const tiers=(typeof STORE_TIERS!=='undefined')&&STORE_TIERS;
    if(!p){body.innerHTML='<p style="color:var(--t3);text-align:center;padding:32px">No pricing data for this title.</p>';return;}
    let html='';
    // Free to play
    if(p.free){
      html+=`<div style="background:var(--neon-bg);border:1px solid var(--neon-border);border-radius:var(--r2);padding:16px 20px;margin-bottom:16px;display:flex;align-items:center;gap:12px">
        <i class="fa-solid fa-circle-check" style="color:var(--neon);font-size:22px;flex-shrink:0"></i>
        <div><div style="font-weight:700;font-size:15px;color:var(--neon)">FREE TO PLAY</div>
        <div style="font-size:12px;color:var(--t2);margin-top:3px">Platform: ${p.platform||'See link below'}</div>
        ${p.note?`<div style="font-size:11.5px;color:var(--t3);margin-top:5px">${p.note}</div>`:''}
        </div></div>
        <a class="btn btn-primary" href="${p.freeUrl||'#'}" target="_blank" rel="noopener" style="width:100%;justify-content:center">
          <i class="fa-solid fa-download"></i>Download Free — ${p.platform||'Official Site'}
        </a>`;
      body.innerHTML=html;return;
    }
    // Not on Steam note
    if(p.specialNote){html+=`<div style="background:rgba(245,200,66,.08);border:1px solid rgba(245,200,66,.25);border-radius:var(--r2);padding:12px 16px;margin-bottom:14px;font-size:12.5px;color:var(--amber)"><i class="fa-solid fa-triangle-exclamation"></i> ${p.specialNote}</div>`;}
    // Store rows
    const stores=[];
    if(p.steam) stores.push({name:'Steam',icon:'fa-brands fa-steam',color:'#1b9de2',trust:'official',price:p.steam,url:p.steamUrl,badge:'OFFICIAL',badgeColor:'#1b9de2'});
    if(p.gog) stores.push({name:'GOG',icon:'fa-globe',color:'#8b1a1a',trust:'official',price:p.gog,url:p.gogUrl,badge:'DRM-FREE',badgeColor:'#8b1a1a'});
    if(p.freeUrl&&!p.free) stores.push({name:'Official Site',icon:'fa-globe',color:'#00cc6a',trust:'official',price:p.steam||'See site',url:p.freeUrl,badge:'OFFICIAL',badgeColor:'#00cc6a'});
    if(p.cdkeys) stores.push({name:'CDKeys',icon:'fa-key',color:'#e84040',trust:'reseller',price:p.cdkeys,url:p.cdkeysUrl,badge:'TRUSTED RESELLER',badgeColor:'#e84040'});
    if(p.fanaticalUrl) stores.push({name:'Fanatical',icon:'fa-bolt',color:'#ff6b35',trust:'reseller',price:'Check site',url:p.fanaticalUrl,badge:'OFFICIAL PARTNER',badgeColor:'#ff6b35'});
    if(p.humbUrl) stores.push({name:'Humble Bundle',icon:'fa-heart',color:'#cc2929',trust:'reseller',price:'Check site',url:p.humbUrl,badge:'CHARITY PORTION',badgeColor:'#cc2929'});
    if(p.gg) stores.push({name:'GG.deals (compare all)',icon:'fa-chart-line',color:'#00ff88',trust:'compare',price:'All stores',url:p.gg,badge:'PRICE TRACKER',badgeColor:'#00ff88'});
    // Marketplace links (higher risk but often cheaper)
    if(p.g2aUrl) stores.push({name:'G2A',icon:'fa-store',color:'#f0b429',trust:'marketplace',price:'Check site',url:p.g2aUrl,badge:'⚠ MARKETPLACE',badgeColor:'#f0b429'});
    if(p.kinguinUrl) stores.push({name:'Kinguin',icon:'fa-store',color:'#e66c1e',trust:'marketplace',price:'Check site',url:p.kinguinUrl,badge:'⚠ MARKETPLACE',badgeColor:'#e66c1e'});

    html+=`<div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px">`;
    stores.forEach(s=>{
      const trustColor=s.trust==='official'?'var(--neon)':s.trust==='reseller'?'var(--amber)':s.trust==='compare'?'var(--ice)':'var(--rose)';
      html+=`<a href="${s.url}" target="_blank" rel="noopener" style="display:flex;align-items:center;gap:12px;background:var(--float);border:1px solid var(--b1);border-radius:var(--r2);padding:12px 14px;text-decoration:none;transition:all .15s;cursor:pointer"
        onmouseover="this.style.borderColor='${s.color}40'" onmouseout="this.style.borderColor=''"
      >
        <i class="fa-solid ${s.icon}" style="color:${s.color};font-size:18px;width:24px;text-align:center;flex-shrink:0"></i>
        <div style="flex:1">
          <div style="display:flex;align-items:center;gap:7px">
            <span style="font-weight:600;font-size:14px;color:var(--t1)">${s.name}</span>
            <span style="font-size:9px;font-weight:700;letter-spacing:.08em;padding:2px 6px;border-radius:3px;background:${s.badgeColor}20;color:${s.badgeColor};border:1px solid ${s.badgeColor}40">${s.badge}</span>
          </div>
        </div>
        <div style="font-family:var(--mono);font-size:14px;font-weight:700;color:${s.trust==='official'?'var(--t2)':'var(--neon)'};flex-shrink:0">${s.price}</div>
        <i class="fa-solid fa-arrow-up-right-from-square" style="color:var(--t3);font-size:12px;flex-shrink:0"></i>
      </a>`;
    });
    html+='</div>';
    // Note
    if(p.note) html+=`<div style="font-size:12px;color:var(--t2);background:var(--deep);border:1px solid var(--b1);border-left:3px solid var(--amber);border-radius:0 var(--r1) var(--r1) 0;padding:10px 14px;margin-bottom:14px">
      <i class="fa-solid fa-lightbulb" style="color:var(--amber)"></i> ${p.note}</div>`;
    // Risk disclaimer
    html+=`<div style="background:rgba(255,92,53,.08);border:1px solid rgba(255,92,53,.25);border-radius:var(--r2);padding:12px 16px;font-size:11.5px;color:var(--t2);line-height:1.7">
      <strong style="color:var(--rose)"><i class="fa-solid fa-triangle-exclamation"></i> Key Store Disclaimer</strong><br>
      <strong>VAULT.GG does not sell keys or receive commission from these links.</strong> Third-party resellers carry risk:<br>
      <strong style="color:var(--neon)">Official stores</strong> (Steam/GOG/Epic) — full refund support, guaranteed valid.<br>
      <strong style="color:var(--amber)">Trusted resellers</strong> (CDKeys/Fanatical/Humble) — keys are valid but <em>no refunds after activation</em>. Trustworthy.<br>
      <strong style="color:var(--rose)">Marketplaces</strong> (Kinguin/G2A) — user-sold keys, elevated fraud risk. Avoid for important purchases.<br>
      Always verify <em>region compatibility</em> (EU/US keys may differ). Prices shown are approximate and change frequently.
    </div>`;
    body.innerHTML=html;
  } else if(tab==='screenshots'){
    if(!g.steam){body.innerHTML='<p style="color:var(--t3);text-align:center;padding:32px">No screenshots available.</p>';return;}
    body.innerHTML='<div style="text-align:center;padding:24px;color:var(--t3)"><i class="fa-solid fa-spinner fa-spin fa-2x" style="color:var(--neon);margin-bottom:12px;display:block"></i>Loading screenshots...</div>';
    const _steamId=g.steam;
    const _body=body;
    (async function(){
      try{
        const r=await fetch('/api/steaminfo?appid='+_steamId);
        const info=await r.json();
        const shots=(info&&info.images&&info.images.screenshots)||[];
        if(!shots.length){_body.innerHTML='<p style="color:var(--t3);text-align:center;padding:32px">No screenshots found.</p>';return;}
        let html='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
        shots.slice(0,8).forEach(function(s){
          html+='<div style="aspect-ratio:16/9;overflow:hidden;border-radius:var(--r2);cursor:pointer;background:var(--float)" onclick="window.open(\'' + s.full + '\')">'
            +'<img src="'+s.thumb+'" loading="lazy" style="width:100%;height:100%;object-fit:cover;transition:transform .25s" '
            +'onmouseover="this.style.transform=\'scale(1.06)\'" onmouseout="this.style.transform=\'\'" '
            +'onerror="this.parentElement.style.display=\'none\'"></div>';
        });
        html+='</div><div style="margin-top:12px;text-align:center;font-size:11px;color:var(--t3)">Click any screenshot to open full size</div>';
        const trailers=info&&info.trailers||[];
        const trailer=trailers.find(function(t){return t.highlight&&t.mp4_480;})||trailers.find(function(t){return !!t.mp4_480;});
        if(trailer&&trailer.mp4_480){
          html+='<div style="margin-top:16px"><div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--t3);margin-bottom:8px"><i class="fa-solid fa-film"></i> Official Trailer</div>'
            +'<video controls preload="none" poster="'+trailer.thumbnail+'" style="width:100%;border-radius:var(--r2);background:#000">'
            +'<source src="'+trailer.mp4_480+'" type="video/mp4"></video></div>';
        }
        _body.innerHTML=html;
      }catch(e){
        _body.innerHTML='<p style="color:var(--t3);text-align:center;padding:32px">Could not load screenshots.</p>';
      }
    })();
  } else if(tab==='video'){
    if(!g.yt){body.innerHTML='<p style="color:var(--t3);text-align:center;padding:32px">No video available.</p>';return;}
    body.innerHTML=`
      <div class="modal-video-wrap">
        <iframe src="https://www.youtube.com/embed/${g.yt}?rel=0&modestbranding=1"
                frameborder="0" allowfullscreen allow="autoplay;encrypted-media" loading="lazy"></iframe>
      </div>
      <div style="margin-top:12px;text-align:center">
        <a class="btn btn-ghost btn-sm" href="https://www.youtube.com/results?search_query=${encodeURIComponent(g.title+' official gameplay')}" target="_blank" rel="noopener">
          <i class="fa-brands fa-youtube"></i>More on YouTube
        </a>
      </div>`;
  }
}

// ── Search ───────────────────────────────────────────────────
function initSearch(){
  const input=$('searchInput'); if(!input)return;
  
  // Create autocomplete dropdown
  const wrap = input.closest('.nav-search') || input.parentElement;
  const dropdown = document.createElement('div');
  dropdown.id = 'searchDropdown';
  dropdown.style.cssText = 'position:absolute;top:100%;left:0;right:0;background:var(--raised);border:1px solid var(--neon-border);border-top:none;border-radius:0 0 var(--r2) var(--r2);z-index:1000;max-height:340px;overflow-y:auto;box-shadow:var(--neon-box);display:none';
  if(wrap.style.position !== 'relative') wrap.style.position = 'relative';
  wrap.appendChild(dropdown);

  input.addEventListener('input', function() {
    curSearch = this.value.toLowerCase().trim();
    
    // Show autocomplete suggestions
    if (curSearch.length >= 1) {
      const matches = GAMES.filter(g =>
        g.title && (g.title.toLowerCase().includes(curSearch) ||
        (g.genre||'').toLowerCase().includes(curSearch) ||
        (g.dev||'').toLowerCase().includes(curSearch))
      ).slice(0, 8);
      
      if (matches.length) {
        dropdown.innerHTML = matches.map(g => `
          <div style="display:flex;align-items:center;gap:10px;padding:9px 14px;cursor:pointer;border-bottom:1px solid var(--b1);transition:background .12s"
            onmouseover="this.style.background='var(--hover)'" 
            onmouseout="this.style.background=''"
            onclick="openModal('${g.id}');document.getElementById('searchDropdown').style.display='none'">
            <div style="width:44px;height:21px;border-radius:3px;overflow:hidden;flex-shrink:0;background:var(--float)">
              <img src="${g.steam?'https://cdn.cloudflare.steamstatic.com/steam/apps/'+g.steam+'/header.jpg':''}" 
                style="width:100%;height:100%;object-fit:cover" onerror="this.style.display='none'">
            </div>
            <div style="flex:1;min-width:0">
              <div style="font-size:13px;font-weight:600;color:var(--t1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${g.title}</div>
              <div style="font-size:10px;color:var(--t3)">${g.genre} · ${g.year}${g.score?' · ⭐'+g.score:''}</div>
            </div>
            <span style="font-size:9px;font-weight:700;padding:2px 6px;border-radius:3px;background:${g.tier==='S'?'var(--neon)':g.tier==='A'?'var(--amber)':'var(--raised)'};color:${g.tier==='S'||g.tier==='A'?'#000':'var(--t3)'}">${g.tier}</span>
          </div>`).join('');
        dropdown.style.display = 'block';
      } else {
        dropdown.style.display = 'none';
      }
    } else {
      dropdown.style.display = 'none';
      renderGrid();
    }
    
    if(curSearch){
      const b=$('browse'); if(b) b.scrollIntoView({behavior:'smooth'});
      setFilter('all');
    }
  });
  
  // Close dropdown on outside click
  document.addEventListener('click', e => {
    if (!wrap.contains(e.target)) {
      dropdown.style.display = 'none';
    }
  });
  
  // Keyboard nav
  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') { dropdown.style.display = 'none'; input.blur(); }
    if (e.key === 'Enter' && curSearch) {
      dropdown.style.display = 'none';
      const b=$('browse'); if(b) b.scrollIntoView({behavior:'smooth'});
    }
  });
}

// ── Scroll nav ───────────────────────────────────────────────
function initScrollNav(){
  const IDS=['top10','browse','esports','anime','achievements','guides','upcoming','borderlands','nostalgia','mods','gems','pc-guide'];
  window.addEventListener('scroll',()=>{
    const y=window.scrollY+80;
    IDS.forEach(id=>{
      const el=$(id); if(!el)return;
      if(el.offsetTop<=y&&el.offsetTop+el.offsetHeight>y){
        $$('.nav-link').forEach(a=>a.classList.remove('active'));
        const a=document.querySelector(`.nav-link[href="#${id}"]`);
        if(a)a.classList.add('active');
      }
    });
  },{passive:true});
}

// ── Counter observer ─────────────────────────────────────────
function initCounters(){
  const bar=document.querySelector('.stats-bar'); if(!bar)return;
  new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting)animateCounters();});
  },{threshold:0.3}).observe(bar);
}

// ── Keyboard ─────────────────────────────────────────────────
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){window.closeModal&&closeModal();window.closeVideo&&closeVideo();}
});

// ── Utility ──────────────────────────────────────────────────
window.scrollToTop=function(){window.scrollTo({top:0,behavior:'smooth'});};

// ── Game detail page (game.html) ─────────────────────────────
function buildGamePage(){
  const params=new URLSearchParams(window.location.search);
  const id=params.get('id');
  if(!id){window.location.href='index.html';return;}
  const g=gm(id);
  if(!g){document.title='Not Found — VAULT.GG';document.body.innerHTML='<div style="padding:80px;text-align:center;color:#666">Game not found. <a href="index.html" style="color:#00ff88">← Back</a></div>';return;}

  document.title=`${g.title} — VAULT.GG`;
  const hero=$('gameHero');
  if(hero) hero.style.background=`url('${gameImg(g)}') center/cover`;

  const img=$('gameHeroImg');
  if(img){img.src=gameImg(g);img.alt=g.title;}

  const titleEl=$('gameTitle');
  if(titleEl) titleEl.textContent=g.title;

  const tagEl=$('gameTag');
  if(tagEl) tagEl.innerHTML=`<i class="fa-solid ${icon(g.genre)}"></i>${g.genre}`;

  const metaEl=$('gameMeta');
  if(metaEl) metaEl.innerHTML=`
    ${g.score?`<span class="game-hero-score"><i class="fa-solid fa-star"></i>${g.score} Metacritic</span>`:''}
    ${g.hltb?.main?`<span class="game-hero-score" style="color:var(--neon)"><i class="fa-solid fa-hourglass-half"></i>${g.hltb.main}h</span>`:''}
    <span class="game-hero-dev">${g.dev} · ${g.year}</span>`;

  const btnsEl=$('gameBtns');
  if(btnsEl) btnsEl.innerHTML=`
    ${g.yt?`<button class="btn btn-primary" onclick="openVideo('${g.yt}','${g.title.replace(/'/g,"\\'")}')"><i class="fa-solid fa-play"></i>Watch Gameplay</button>`:''}
    ${g.steam?`<a class="btn btn-ghost" href="https://store.steampowered.com/app/${g.steam}/" target="_blank" rel="noopener"><i class="fa-brands fa-steam"></i>View on Steam</a>`:''}
    <a class="btn btn-ghost" href="index.html"><i class="fa-solid fa-arrow-left"></i>Back</a>`;

  const descEl=$('gameDesc');
  if(descEl) descEl.textContent=g.desc;

  // Meta sidebar
  const sideEl=$('gameSidebar');
  if(sideEl){
    const tier=`<div class="game-meta-row"><div class="game-meta-label">Tier</div><div class="game-meta-val green">${g.tier} — ${{S:'Essential',A:'Great',B:'Good',C:'Decent'}[g.tier]||''}</div></div>`;
    const score=g.score?`<div class="game-meta-row"><div class="game-meta-label">Metacritic</div><div class="game-meta-val gold">${g.score}/100</div></div>`:'';
    const dev=`<div class="game-meta-row"><div class="game-meta-label">Developer</div><div class="game-meta-val">${g.dev}</div></div>`;
    const yr=`<div class="game-meta-row"><div class="game-meta-label">Year</div><div class="game-meta-val">${g.year}</div></div>`;
    const main=g.hltb?.main?`<div class="game-meta-row"><div class="game-meta-label">Main Story</div><div class="game-meta-val">${g.hltb.main} hours</div></div>`:'';
    const comp=g.hltb?.comp?`<div class="game-meta-row"><div class="game-meta-label">Completionist</div><div class="game-meta-val">${g.hltb.comp} hours</div></div>`:'';
    const players=g.players?`<div class="game-meta-row"><div class="game-meta-label">Active Players</div><div class="game-meta-val green">${g.players}</div></div>`:'';
    const tags=(g.tags||[]).length?`<div class="game-meta-divider"></div><div class="game-meta-row"><div class="game-meta-label">Tags</div><div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:5px">${g.tags.map(t=>`<span style="font-size:10.5px;padding:3px 8px;border-radius:4px;background:var(--float);color:var(--t3);border:1px solid var(--b1)">${t}</span>`).join('')}</div></div>`:'';
    sideEl.innerHTML=tier+score+dev+yr+main+comp+players+tags;
  }

  // Achievements on game page
  const achEl=$('gameAchievements');
  if(achEl && g.achievements?.length){
    achEl.innerHTML=g.achievements.map(a=>`
      <div class="ach-item" style="border:1px solid var(--b1);border-radius:var(--r2);margin-bottom:10px;padding:14px 16px">
        <div class="ach-top">
          <div class="ach-name">${a.name}</div>
          <div class="ach-diff" style="color:${(DIFF_COLOR||[])[a.diff]||'#fff'}">
            <i class="fa-solid fa-shield-halved"></i>${(DIFF||[])[a.diff]||''}
          </div>
        </div>
        <div class="ach-desc">${a.desc}</div>
        <details class="ach-guide">
          <summary><i class="fa-solid fa-scroll"></i>How to Unlock</summary>
          <div class="ach-guide-body">
            <div class="ach-how">${a.how}</div>
            ${a.tip?`<div class="ach-tip"><i class="fa-solid fa-lightbulb"></i><strong>Pro Tip:</strong> ${a.tip}</div>`:''}
          </div>
        </details>
      </div>`).join('');
  } else if(achEl){
    achEl.innerHTML='<p style="color:var(--t3);padding:16px 0">No achievement guides for this game yet.</p>';
  }

  // Prices section on full game page
  const priceEl=$('gamePrices');
  if(priceEl){
    const p=(typeof PRICES!=='undefined')&&PRICES[g.id];
    if(p){
      let ph='';
      if(p.free){
        ph=`<div style="background:var(--neon-bg);border:1px solid var(--neon-border);border-radius:var(--r2);padding:16px 20px;display:flex;align-items:center;gap:14px">
          <i class="fa-solid fa-circle-check" style="color:var(--neon);font-size:26px;flex-shrink:0"></i>
          <div><div style="font-weight:700;font-size:18px;color:var(--neon)">FREE TO PLAY</div>
          <div style="font-size:13px;color:var(--t2);margin-top:4px">Platform: ${p.platform}</div>
          ${p.note?`<div style="font-size:12px;color:var(--t3);margin-top:6px">${p.note}</div>`:''}
          <a class="btn btn-primary" href="${p.freeUrl}" target="_blank" rel="noopener" style="margin-top:12px">
            <i class="fa-solid fa-download"></i>Download Free — ${p.platform}
          </a></div></div>`;
      } else {
        const rows=[];
        if(p.steam) rows.push({n:'Steam',ic:'fa-brands fa-steam',c:'#1b9de2',price:p.steam,url:p.steamUrl,b:'OFFICIAL'});
        if(p.gog) rows.push({n:'GOG (DRM-Free)',ic:'fa-globe',c:'#8b1a1a',price:p.gog,url:p.gogUrl,b:'DRM-FREE'});
        if(p.freeUrl&&p.freeLabel) rows.push({n:p.freeLabel,ic:'fa-globe',c:'#00cc6a',price:p.steam||'See site',url:p.freeUrl,b:'OFFICIAL'});
        if(p.cdkeys) rows.push({n:'CDKeys',ic:'fa-key',c:'#e84040',price:p.cdkeys,url:p.cdkeysUrl,b:'TRUSTED RESELLER'});
        if(p.fanaticalUrl) rows.push({n:'Fanatical',ic:'fa-bolt',c:'#ff6b35',price:'Check deals',url:p.fanaticalUrl,b:'OFFICIAL PARTNER'});
        if(p.humbUrl) rows.push({n:'Humble Bundle',ic:'fa-heart',c:'#cc2929',price:'Check bundles',url:p.humbUrl,b:'CHARITY %'});
        if(p.gg) rows.push({n:'GG.deals — compare all stores',ic:'fa-chart-line',c:'#00ff88',price:'All stores',url:p.gg,b:'PRICE TRACKER'});
        ph=`<div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px">`;
        rows.forEach(function(s){
          ph+=`<a href="${s.url}" target="_blank" rel="noopener" style="display:flex;align-items:center;gap:14px;background:var(--card);border:1px solid var(--b1);border-radius:var(--r2);padding:14px 18px;text-decoration:none;transition:border-color .15s"
            onmouseover="this.style.borderColor='${s.c}'" onmouseout="this.style.borderColor=''">
            <i class="fa-solid ${s.ic}" style="color:${s.c};font-size:20px;width:28px;text-align:center;flex-shrink:0"></i>
            <div style="flex:1">
              <span style="font-weight:600;font-size:15px;color:var(--t1)">${s.n}</span>
              <span style="font-size:9.5px;font-weight:700;letter-spacing:.08em;padding:2px 7px;border-radius:3px;margin-left:8px;background:${s.c}20;color:${s.c};border:1px solid ${s.c}40">${s.b}</span>
            </div>
            <div style="font-family:var(--mono);font-size:15px;font-weight:700;color:${s.b==='OFFICIAL'?'var(--t2)':'var(--neon)'};flex-shrink:0">${s.price}</div>
            <i class="fa-solid fa-arrow-up-right-from-square" style="color:var(--t3);font-size:13px;flex-shrink:0"></i>
          </a>`;
        });
        ph+='</div>';
        if(p.note) ph+=`<div style="font-size:12.5px;color:var(--t2);background:var(--deep);border:1px solid var(--b1);border-left:3px solid var(--amber);border-radius:0 var(--r1) var(--r1) 0;padding:12px 16px;margin-bottom:14px"><i class="fa-solid fa-lightbulb" style="color:var(--amber)"></i> ${p.note}</div>`;
        ph+=`<div style="background:rgba(255,92,53,.07);border:1px solid rgba(255,92,53,.2);border-radius:var(--r2);padding:14px 18px;font-size:12px;color:var(--t2);line-height:1.75">
          <strong style="color:var(--rose)"><i class="fa-solid fa-triangle-exclamation"></i> Key Store Disclaimer</strong> — VAULT.GG does not sell keys or earn commission. <strong>Official stores</strong> (Steam/GOG) give full refunds. <strong>Trusted resellers</strong> (CDKeys, Fanatical, Humble) are legitimate but <em>no refunds after key activation</em>. Keys are NOT accounts — you get a code to redeem yourself. Always verify region compatibility before purchase. Prices shown are approximate and change frequently — always check the store directly.
        </div>`;
      }
      if(p.specialNote) ph=`<div style="background:rgba(245,200,66,.07);border:1px solid rgba(245,200,66,.25);border-radius:var(--r2);padding:12px 16px;margin-bottom:12px;font-size:12.5px;color:var(--amber)"><i class="fa-solid fa-triangle-exclamation"></i> ${p.specialNote}</div>`+ph;
      priceEl.innerHTML=ph;
    } else {
      priceEl.innerHTML='<p style="color:var(--t3);font-size:13px">No pricing data available yet for this title.</p>';
    }
  }

  // Initialize ALL live API data (async, non-blocking)
  if(typeof initLiveData === 'function') {
    setTimeout(() => initLiveData(g.id, g.steam), 150);
  }
  // Enhance hero with Steam background art + screenshot
  if(g.steam && typeof enhanceGameHero === 'function') {
    const bgEl = $('gameHeroBg');
    const heroImg = $('gameHeroImg');
    setTimeout(() => enhanceGameHero(g.steam, bgEl, heroImg), 100);
  }
  // Load screenshots
  if(g.steam && typeof loadScreenshots === 'function') {
    const gallery = $('screenshotGallery');
    const galleryWrap = $('screenshotGalleryWrapper');
    setTimeout(() => loadScreenshots(g.steam, gallery, galleryWrap), 400);
  }
  // Load Steam trailer
  if(g.steam && typeof loadTrailer === 'function') {
    const tWrap = $('trailerWrapper');
    const tVid = $('gameTrailer');
    const tSrc = $('gameTrailerSrc');
    setTimeout(() => loadTrailer(g.steam, tWrap, tVid, tSrc, tVid), 600);
  }
  // Load Steam metadata (genres, categories, platforms, DLC)
  if(g.steam && typeof renderSteamData === 'function') {
    const sdEl = $('steamDataWrapper');
    setTimeout(() => renderSteamData(g.steam, sdEl), 800);
  }

  // Related games (same genre/category)
  const relEl=$('gameRelated');
  if(relEl){
    const related=GAMES.filter(r=>r.id!==g.id&&(r.genre===g.genre||(r.cat&&g.cat&&r.cat.some(c=>g.cat.includes(c))))).slice(0,4);
    if(related.length){
      related.forEach(r=>{
        const card=document.createElement('a');
        card.className='game-card';
        card.href=`game.html?id=${r.id}`;
        card.innerHTML=`
          <div class="card-img-wrap">
            <img class="card-img" src="${gameImg(r)}" alt="${r.title}" loading="lazy" onerror="this.style.opacity='.3'">
            <span class="card-tier ${TIER_CLS[r.tier]||'tier-c'}">${r.tier}</span>
          </div>
          <div class="card-body">
            <div class="card-genre"><i class="fa-solid ${icon(r.genre)}"></i> ${r.genre}</div>
            <div class="card-title">${r.title}</div>
            <div class="card-foot"><span class="card-dev">${r.dev}</span>${r.score?`<span class="card-score"><i class="fa-solid fa-star"></i>${r.score}</span>`:''}</div>
          </div>`;
        relEl.appendChild(card);
      });
    } else {
      relEl.innerHTML='<p style="color:var(--t3)">No related games found.</p>';
    }
  }
}


// ── Random Game Picker ─────────────────────────────────────
let _randomFilter = 'all';
window._lastRandomId = null;
window.setRandomFilter = function(cat) {
  _randomFilter = cat;
  document.querySelectorAll('[id^="rfilter-"]').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById('rfilter-' + cat);
  if (btn) btn.classList.add('active');
};
window.pickRandom = function() {
  const pool = GAMES.filter(g => {
    if (!g.cat) return false;
    return _randomFilter === 'all' ? true : g.cat.includes(_randomFilter);
  });
  if (!pool.length) return;
  const g = pool[Math.floor(Math.random() * pool.length)];
  window._lastRandomId = g.id;
  const res = $('randomResult');
  const nameEl = $('randomGameName');
  const metaEl = $('randomGameMeta');
  if (res) res.style.display = 'block';
  if (nameEl) nameEl.textContent = g.title;
  if (metaEl) metaEl.textContent = [g.genre, g.dev, g.year, g.score ? g.score + '/100' : null].filter(Boolean).join(' · ');
  // Animate the result
  if (res) { res.style.transform = 'scale(.97)'; setTimeout(() => { res.style.transform = ''; }, 150); }
};

// ── Live Players for Top 10 ──────────────────────────────────
function loadTop10LivePlayers() {
  const cards = document.querySelectorAll('.top10-card');
  TOP10.forEach((id, i) => {
    const g = gm(id); if (!g || !g.steam) return;
    const card = cards[i]; if (!card) return;
    const meta = card.querySelector('.top10-meta');
    if (!meta) return;
    // Inject a span that live.js will populate
    const span = document.createElement('span');
    span.className = 'live-player-badge';
    meta.appendChild(span);
    loadLivePlayers(g.steam, span);
  });
}

// ── Live Players for Browse Grid ─────────────────────────────
function loadGridLivePlayers() {
  document.querySelectorAll('.game-card').forEach(card => {
    const titleEl = card.querySelector('.card-title');
    if (!titleEl) return;
    const title = titleEl.textContent;
    const g = GAMES.find(gm => gm.title === title);
    if (!g || !g.steam) return;
    // Only show for games with significant player bases
    if (!g.players) return;
    const foot = card.querySelector('.card-foot-right');
    if (!foot) return;
    const span = document.createElement('span');
    span.style.cssText = 'margin-left:4px';
    foot.prepend(span);
    loadLivePlayers(g.steam, span);
  });
}

// ── Live Players for Esports ──────────────────────────────────
function loadEsportsLivePlayers() {
  document.querySelectorAll('.esport-card').forEach(card => {
    const titleEl = card.querySelector('.esport-title');
    if (!titleEl) return;
    const g = GAMES.find(gm => gm.title === titleEl.textContent);
    if (!g || !g.steam) return;
    const bodyEl = card.querySelector('.esport-body');
    if (!bodyEl) return;
    const span = document.createElement('div');
    span.style.cssText = 'margin-top:6px';
    bodyEl.appendChild(span);
    loadLivePlayers(g.steam, span);
  });
}

// ── Live Players for ALL sections ────────────────────────────
window.loadAllLivePlayers = function() {
  if(typeof loadLivePlayers !== 'function') return;
  loadTop10LivePlayers();
  setTimeout(loadEsportsLivePlayers, 1200);
};

// ── Live Players init for index page ─────────────────────────
// ── INIT ─────────────────────────────────────────────────────
(function init(){
  const page=document.body.dataset.page||'';

  if(page==='game'){
    buildGamePage();
  } else {
    buildHero();
    buildTop10();
    buildFilters();
    renderGrid();
    buildEsports();
    buildSection('animeGrid','anime');
    buildSection('nostalgiaGrid','nostalgia');
    buildSection('modsGrid','mods');
    buildSection('gemsGrid','gems');
    buildUpcoming();
    buildBorderlands();
    buildAchievements();
    buildGuides();
    buildPCGuide();
    initSearch();
    initScrollNav();
    initCounters();
  }

  // Subpages
  if(page==='esports') buildEsports();
  if(page==='upcoming') buildUpcoming();
  if(page==='borderlands') buildBorderlands();
  if(page==='guides'){ buildAchievements(); buildGuides(); buildPCGuide(); }
  if(page==='nostalgia'){ buildSection('nostalgiaGrid','nostalgia'); buildSection('modsGrid','mods'); }
})();
