<div align="center">

<!-- ANIMATED BANNER -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:00ff88,50:00cc66,100:007744&height=200&section=header&text=VAULT.GG&fontSize=80&fontFamily=Bebas+Neue&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=PC+Gaming+Encyclopedia&descAlignY=60&descSize=22&descColor=00ff88" width="100%"/>

<!-- LIVE STATUS BADGES -->
<a href="https://vault-gg-one.vercel.app">
  <img src="https://img.shields.io/badge/🌐_LIVE-vault--gg--one.vercel.app-00ff88?style=for-the-badge&labelColor=0d0f0f" alt="Live Site"/>
</a>
<a href="https://github.com/MisTAiM/vault-gg">
  <img src="https://img.shields.io/github/last-commit/MisTAiM/vault-gg?style=for-the-badge&color=00ff88&labelColor=0d0f0f&label=Last+Commit" alt="Last Commit"/>
</a>
<img src="https://img.shields.io/badge/Games-85%2B-00ff88?style=for-the-badge&labelColor=0d0f0f" alt="Games"/>
<img src="https://img.shields.io/badge/APIs-8_Live-00ff88?style=for-the-badge&labelColor=0d0f0f" alt="APIs"/>
<img src="https://img.shields.io/badge/License-MIT-00ff88?style=for-the-badge&labelColor=0d0f0f" alt="License"/>

<br/><br/>

<!-- QUICK NAV -->
[**🎮 Live Site**](https://vault-gg-one.vercel.app) · [**📚 Guides**](https://vault-gg-one.vercel.app/guides.html) · [**🧠 AI Picks**](https://vault-gg-one.vercel.app/recommender.html) · [**🎮 Browse Genres**](https://vault-gg-one.vercel.app/genres/) · [**⚙️ Admin**](https://vault-gg-one.vercel.app/admin)

</div>

---

## What is VAULT.GG?

**VAULT.GG** is a living, breathing PC gaming encyclopedia. Not a wiki. Not a review site. Something different — a curated, hand-built platform that combines real-time Steam data, live pricing, AI-powered recommendations, and deep game guides into one dark-themed encyclopedia for serious PC gamers.

Every data point is pulled from verified, live APIs. Every price is current. Every YouTube trailer has been tested and confirmed working. Every boss image is sourced from official community APIs with proper attribution.

This started as a personal project to replace the 40-tab browser mess of checking Steam, PCGamingWiki, CheapShark, Metacritic, and ProtonDB separately for every game decision. Now it does all of it in one place, in real time.

<br/>

---

## ⚡ Core Features

<table>
<tr>
<td width="50%">

### 🎮 Game Catalog
- **85+ curated PC games** — handpicked, no shovelware
- Tier rankings (S/A/B/C) with Metacritic integration
- Genre filtering across 20 categories
- Live search with **instant autocomplete dropdown**
- Game cards with real Steam capsule art (616×353)
- HLTB data (main story / completionist hours)

</td>
<td width="50%">

### 📊 Live Data (8 APIs)
- **Steam Player Counts** — live, updates every 2 min
- **Steam Reviews** — real `review_score_desc` (not guessed)
- **SteamSpy** — owner estimates + median playtime
- **Steam Info** — screenshots, trailers, DLC count, platforms
- **CheapShark** — live deals across 35 stores + all-time low
- **ProtonDB** — Linux/Steam Deck compatibility tier
- **Speedrun.com** — World Record times + category
- **Steam News** — latest patch notes and announcements

</td>
</tr>
<tr>
<td width="50%">

### 📖 Game Guides (Real API Data)
Six full game guides with live data, real images, and proper attribution:

| Game | Sources | Content |
|---|---|---|
| **Elden Ring** | eldenring.fanapis.com | 106 bosses · 307 weapons · 14 classes · 71 sorceries · 98 incantations · Meta builds |
| **Baldur's Gate 3** | bg3.wiki + dnd5eapi.co | 20 bosses w/ images · D&D 5e classes · Spell DB · 4 builds |
| **Hades** | hades.fandom.com | 11 gods + boons · Boss guide · All 6 weapons + aspects |
| **Stardew Valley** | stardewvalleywiki.com | Crops by season · All villager gifts · Mine guide · Community Center |
| **Cyberpunk 2077** | cyberpunk.fandom.com | 4 meta builds · Cyberware DB · All 5 endings |
| **Hollow Knight** | hollowknight.fandom.com | 12 bosses · Charm guide · 9 areas · All 4 endings |

</td>
<td width="50%">

### 🧠 AI Game Recommender
A fully local recommendation engine (`recommend-engine.js`) that scores every game in the catalog against 5 preference axes — no API key required, instant results:

- **Mood** → maps to genre/tag/category weights
- **Session length** → cross-references HLTB data
- **Social preference** → solo vs co-op vs competitive
- **Difficulty** → soulslike tags vs accessibility
- **Budget** → filters against real price data

Returns top 3 picks with diverse genres and personalized reasoning. No rate limits. No API costs. Works offline.

</td>
</tr>
<tr>
<td width="50%">

### 💰 Pricing Engine
- **CheapShark integration** — 60+ games with live deals
- **All-time low** vs **best current price** side-by-side
- Store trust tiers: Official → Reseller → Marketplace
- **G2A, Kinguin, Eneba** marketplace links with ⚠️ badges
- GG.deals tracker link per game
- CheapShark game IDs mapped for 52 titles

</td>
<td width="50%">

### 🎯 Mod Guides
13 moddable games with curated mod lists:
- Skyrim, Stardew Valley, Minecraft, Terraria
- GTA V, RimWorld, Cities Skylines, Valheim
- Fallout New Vegas, KSP, Satisfactory, L4D2, Assetto Corsa

Each has: mod hub, mod manager, install guide, 5–12 curated mods with direct download links, type badges (essential/recommended), and full descriptions.

</td>
</tr>
</table>

<br/>

---

## 🛠️ Tech Stack

<div align="center">

<!-- Frontend -->
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

<!-- APIs & Data -->
![Steam](https://img.shields.io/badge/Steam_API-000000?style=for-the-badge&logo=steam&logoColor=white)
![Claude](https://img.shields.io/badge/Claude_AI-D97757?style=for-the-badge&logo=claude&logoColor=white)
![Linux](https://img.shields.io/badge/ProtonDB-B45309?style=for-the-badge&logo=linux&logoColor=white)

</div>

**Zero frameworks. Zero build tools. Zero npm.** Pure HTML + CSS + Vanilla JS deployed to Vercel serverless. The entire frontend is ~220KB of handwritten code across 3 JS files.

### File Structure

```
vault-gg/
├── index.html              # Main hub — hero, top10, trending, browse, tools
├── game.html               # Individual game pages (?id=slug)
├── recommender.html        # AI Game Recommender
├── guides.html             # Guides hub
├── genres/                 # 9 genre pages (fps, horror, roguelike, etc.)
│   └── *.html
├── guides/                 # Full game guides with live data
│   ├── elden-ring.html     # 106 bosses, 307 weapons, 14 classes, meta builds
│   ├── baldurs-gate-3.html # D&D 5e classes, boss gallery, spell DB
│   ├── hades.html          # Gods + boons, boss guide, weapon aspects
│   ├── stardew-valley.html # Crops, villager gifts, mine guide, bundles
│   ├── cyberpunk-2077.html # Builds, cyberware, perk trees, all endings
│   └── hollow-knight.html  # Bosses, charms, areas, endings
├── css/style.css           # 28KB — full design system, dark theme
├── js/
│   ├── data.js             # 165KB — 85+ games, prices, mods, API ID maps
│   ├── app.js              # 56KB — UI logic, modals, search, autocomplete
│   ├── live.js             # 14KB — async API fetching, rendering
│   └── recommend-engine.js # 14KB — local AI scoring engine
├── api/                    # Vercel serverless functions (Node.js)
│   ├── players.js          # Steam live player counts (CORS proxy)
│   ├── reviews.js          # Steam appreviews — real score_desc + Metacritic
│   ├── spy.js              # SteamSpy owners + median playtime
│   ├── news.js             # Steam ISteamNews feed
│   ├── prices.js           # CheapShark deals proxy + caching
│   ├── steaminfo.js        # Full Steam data: screenshots, trailers, DLC
│   ├── protondb.js         # ProtonDB Linux/Deck compat tier
│   ├── guide.js            # Wiki proxy (bg3.wiki, Fandom, SDV, D&D 5e)
│   └── recommend.js        # Claude API proxy (server-side key management)
├── logo.svg                # Vault door SVG logo with neon glow
└── vercel.json
```

<br/>

---

## 🔌 APIs & Data Sources

| Endpoint | Source | CORS | Cache | Notes |
|---|---|---|---|---|
| `/api/players` | Steam ISteamUserStats | ✅ via proxy | 2 min | Live concurrent players |
| `/api/reviews` | Steam appreviews + appdetails | ✅ via proxy | 1 hr | Real `review_score_desc`, Metacritic |
| `/api/spy` | SteamSpy | ✅ via proxy | 2 hr | Owner estimates, median playtime |
| `/api/news` | Steam ISteamNews | ✅ via proxy | 30 min | Latest game news/patch notes |
| `/api/prices` | CheapShark | ✅ native + proxy | 15 min | Deals across 35 stores |
| `/api/steaminfo` | Steam appdetails | ✅ via proxy | 24 hr | Screenshots, MP4 trailers, DLC, genres |
| `/api/protondb` | ProtonDB | ✅ via proxy | 24 hr | Platinum/Gold/Silver/Bronze/Borked |
| `/api/guide` | ER FanAPI + wiki proxy | ✅ via proxy | 1 hr | Game data for guide pages |
| CheapShark direct | cheapshark.com | ✅ CORS native | — | Price history, all-time low |
| Speedrun.com direct | speedrun.com | ✅ CORS native | — | WR times, categories |
| Elden Ring Fan API | eldenring.fanapis.com | ✅ CORS native | — | 106 bosses, 307 weapons, 14 classes |
| D&D 5e API | dnd5eapi.co | ✅ CORS native | — | Classes, spells for BG3 guide |

**Guide Data Sources (with license attribution):**

| Wiki | License | Used For |
|---|---|---|
| eldenring.fanapis.com | Community-maintained API | Boss images, weapon stats, class data |
| bg3.wiki | CC BY-SA 4.0 | BG3 boss images |
| dnd5eapi.co | Open Game License | D&D 5e class and spell data |
| hades.fandom.com | CC BY-SA 3.0 | God and boss images |
| stardewvalleywiki.com | CC BY-NC-SA 3.0 | Crop images, villager data |
| cyberpunk.fandom.com | CC BY-SA 3.0 | Cyberware reference |
| hollowknight.fandom.com | CC BY-SA 3.0 | Boss and charm data |

<br/>

---

## 🗺️ Pages

| Page | URL | Description |
|---|---|---|
| **Home** | `/` | Hero, Top 10, Trending (live), Browse grid (85+ games), AI Recommender teaser |
| **Game Page** | `/game.html?id=elden-ring` | Individual game — screenshots, trailer, Steam data, prices, reviews, ProtonDB, WR |
| **AI Recommender** | `/recommender.html` | 5-question quiz → instant top 3 personalized game picks |
| **Guides Hub** | `/guides.html` | Links to all game guides + quick achievement guides |
| **Elden Ring Guide** | `/guides/elden-ring.html` | 106 bosses · weapons · classes · sorceries · walkthrough · builds |
| **BG3 Guide** | `/guides/baldurs-gate-3.html` | Bosses · D&D classes · spells · builds · act tips |
| **Hades Guide** | `/guides/hades.html` | Gods · bosses · weapons · strategy |
| **Stardew Guide** | `/guides/stardew-valley.html` | Crops · villagers · mine · bundles · year 1 plan |
| **Cyberpunk Guide** | `/guides/cyberpunk-2077.html` | Builds · cyberware · perks · all endings |
| **Hollow Knight Guide** | `/guides/hollow-knight.html` | Bosses · charms · areas · endings |
| **Genres** | `/genres/[name].html` | 9 genre pages — fps, horror, roguelike, soulslike, strategy, survival, simulation, platformer, fighting |
| **Esports** | `/esports.html` | Competitive titles with live player counts |
| **Admin** | `/admin` | Internal CMS panel |

<br/>

---

## 🚀 Roadmap

### Active Development

- [ ] **Hollow Knight: Silksong** — ready to add when release date confirmed
- [ ] **Real Anthropic API key** — AI Recommender fully functional with Claude when key set via Vercel env vars (`ANTHROPIC_API_KEY`)
- [ ] **More game guides** — Risk of Rain 2, Valheim, Terraria, Deep Rock Galactic
- [ ] **Price drop tracker** — persist CheapShark low prices in browser storage, alert when games drop
- [ ] **User lists** — "Want to Play" / "Owned" / "Completed" using localStorage + export

### Platform Ideas

- [ ] **Compare Mode** — side-by-side stats for up to 4 games (Metacritic, HLTB, price, players)
- [ ] **Steam Deck Compatibility Page** — curated list sorted by ProtonDB tier with screenshots
- [ ] **Achievement Tracker** — link your Steam profile to track progress across games in catalog
- [ ] **Esports Calendar** — live tournament brackets via GRID API
- [ ] **News Aggregator** — Steam news feeds across all 85+ games in one timeline view
- [ ] **Build Planner** — interactive skill tree planner for Elden Ring, BG3, CP2077
- [ ] **Seasonal Sale Tracker** — Steam Summer/Winter sale history + predictions
- [ ] **Mod Pack Installer** — one-click Wabbajack/SMAPI mod list references
- [ ] **Community Ratings** — allow registered users to rate games and leave short reviews
- [ ] **Speedrun Leaderboard Page** — dedicated speedrun.com integration per game

### Technical Improvements

- [ ] Edge caching strategy — move from Vercel s-maxage to CDN-level caching
- [ ] Service Worker for offline browsing of cached game data
- [ ] Image optimization pipeline — convert Steam CDN JPGs to WebP at build time
- [ ] Lighthouse score optimization (currently ~72 Performance due to image payloads)
- [ ] Dark/light mode toggle

<br/>

---

## 🏗️ Self-Hosting

No dependencies. No npm. No build step.

```bash
# Clone
git clone https://github.com/MisTAiM/vault-gg.git
cd vault-gg

# Run locally (any static server works)
npx serve .
# or
python3 -m http.server 3000
```

For the API functions (player counts, reviews, etc.), you need Vercel:

```bash
npm install -g vercel
vercel dev   # Starts local dev server with serverless functions on port 3000
```

To enable the AI Recommender (Claude API), set the environment variable:

```bash
vercel env add ANTHROPIC_API_KEY production
# Or in your .env.local file:
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
```

<br/>

---

## 📸 Screenshots

<div align="center">

| Home — Browse Grid | Game Page — Live Data | AI Recommender | Elden Ring Guide |
|---|---|---|---|
| Live player counts on all cards | Real Steam reviews + ProtonDB + price history | 5-question quiz, instant results | 106 bosses with images, filter by region |

*Dark theme only. No light mode (skill issue if you need it).*

</div>

<br/>

---

## 🙌 Credits & Attribution

**Built by:** Morpheus ([@MisTAiM](https://github.com/MisTAiM)) — owner of The Black Bulls Den

**Data Sources:**
- [Steam API](https://partner.steamgames.com/doc/webapi) — player counts, reviews, screenshots, trailers, news
- [SteamSpy](https://steamspy.com/api.php) — ownership and playtime estimates
- [CheapShark](https://www.cheapshark.com) — price comparison data (CORS=*)
- [ProtonDB](https://www.protondb.com) — Linux/Steam Deck compatibility reports
- [Speedrun.com API](https://github.com/nickel110/jsrpapi) — world record times
- [Elden Ring Fan API](https://eldenring.fanapis.com) — game data, free community API
- [D&D 5e API](https://www.dnd5eapi.co) — class and spell data (OGL)
- [bg3.wiki](https://bg3.wiki) — boss images (CC BY-SA 4.0)
- [Hades Wiki](https://hades.fandom.com) — god/boss images (CC BY-SA 3.0)
- [Stardew Valley Wiki](https://stardewvalleywiki.com) — crop images (CC BY-NC-SA 3.0)
- [Cyberpunk Wiki](https://cyberpunk.fandom.com) — cyberware data (CC BY-SA 3.0)
- [Hollow Knight Wiki](https://hollowknight.fandom.com) — boss data (CC BY-SA 3.0)

**Fonts:** Bebas Neue · DM Sans · JetBrains Mono  
**Icons:** Font Awesome 6  
**Hosting:** Vercel  
**AI:** Claude (Anthropic) via `/api/recommend`

<br/>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:007744,50:00cc66,100:00ff88&height=100&section=footer" width="100%"/>

**VAULT.GG** — The PC gaming encyclopedia that actually works.

[![Live](https://img.shields.io/badge/🎮_Open_VAULT.GG-00ff88?style=for-the-badge&labelColor=0d0f0f)](https://vault-gg-one.vercel.app)

*Built with obsession. Deployed with Vercel. Powered by real data.*

</div>
