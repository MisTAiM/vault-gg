# VAULT.GG — Developer Memory Bank
## Last verified: 2026-03-31

---

## ✅ VERIFIED STEAM APP IDs (all return HTTP 200 on CDN)

### Top 10 / Core
| Game | App ID | Verified |
|------|--------|---------|
| Elden Ring | 1245620 | ✓ |
| Baldur's Gate 3 | 1086940 | ✓ |
| Red Dead Redemption 2 | 1174180 | ✓ |
| Cyberpunk 2077 | 1091500 | ✓ |
| Persona 5 Royal | 1687950 | ✓ |
| Clair Obscur: Expedition 33 | 2805590 | ✓ |
| Hades 2 | 1541780 | ✓ |
| Disco Elysium: Final Cut | 632470 | ✓ |
| Monster Hunter Wilds | 2246340 | ✓ |
| Deep Rock Galactic | 548430 | ✓ |

### Genre BIS
| Game | App ID | Verified |
|------|--------|---------|
| Hades | 1145360 | ✓ |
| Balatro | 2379780 | ✓ |
| Valheim | 892970 | ✓ |
| Stardew Valley | 413150 | ✓ |
| Portal 2 | 620 | ✓ |
| Hollow Knight | 367520 | ✓ |
| Hitman WoA | 1659040 | ✓ |
| No Man's Sky | 275850 | ✓ |
| Satisfactory | 526870 | ✓ |
| Celeste | 504230 | ✓ |
| Subnautica | 264710 | ✓ |
| SOMA | 282140 | ✓ |
| RE4 Remake | 2050650 | ✓ |
| Forza Horizon 5 | 1551360 | ✓ |
| Assetto Corsa Competizione | 805550 | ✓ |
| Civilization VI | 289070 | ✓ |
| Age of Empires IV | 1466860 | ✓ |
| Half-Life: Alyx | 546560 | ✓ |
| Alan Wake 2 | 1903840 | ✓ |
| RimWorld | 294100 | ✓ |
| Terraria | 105600 | ✓ |
| Kingdom Come Deliverance 2 | 1771300 | ✓ |
| Apex Legends | 1172470 | ✓ |
| BeamNG.drive | 284160 | ✓ |
| DiRT Rally 2.0 | 690790 | ✓ |
| Lethal Company | 1966720 | ✓ |
| Control | 870780 | ✓ |
| DUSK | 519860 | ✓ |
| Outer Wilds | 753640 | ✓ |
| Return of Obra Dinn | 653530 | ✓ |
| Noita | 881100 | ✓ |
| Granblue Fantasy Relink | 881020 | ✓ |
| Metaphor ReFantazio | 2679460 | ✓ |
| Tales of Arise | 1579380 | ✓ |
| Death Stranding | 1190460 | ✓ |
| Doom Eternal | 782330 | ✓ |

### Esports
| Game | App ID | Verified |
|------|--------|---------|
| Counter-Strike 2 | 730 | ✓ |
| Dota 2 | 570 | ✓ |
| Rocket League | 252950 | ✓ |
| Street Fighter 6 | 1794960 | ✓ |
| Age of Empires II DE | 813780 | ✓ |

### Anime
| Game | App ID | Verified |
|------|--------|---------|
| Dragon Ball: Sparking! Zero | 2340430 | ✓ |
| Dragon Ball FighterZ | 678950 | ✓ |
| Genshin Impact | 1971870 | ✓ |
| Honkai: Star Rail | 1428350 | ✓ ← FIXED (was 1414740) |
| Persona 3 Reload | 2161700 | ✓ |
| Silent Hill 2 Remake | 2413130 | ✓ |
| DB First Berserker Khazan | 2625510 | ✓ |

### Nostalgia
| Game | App ID | Verified |
|------|--------|---------|
| Minecraft Launcher | 1672970 | ✓ |
| Team Fortress 2 | 440 | ✓ |
| Garry's Mod | 4000 | ✓ |
| AoE2 Definitive Edition | 813780 | ✓ |
| Fallout: New Vegas | 22380 | ✓ |
| Morrowind | 22320 | ✓ |
| Old School RuneScape | 1343400 | ✓ |
| Skyrim SE | 489830 | ✓ |
| GTA V | 271590 | ✓ |
| Bannerlord | 261550 | ✓ |
| Hunt: Showdown | 594650 | ✓ |
| Hell Let Loose | 686810 | ✓ |
| Rust | 252490 | ✓ |
| Mordhau | 629760 | ✓ |
| For Honor | 304390 | ✓ |

### Borderlands Franchise
| Game | App ID | Verified |
|------|--------|---------|
| Borderlands 1 | 729040 | ✓ |
| Borderlands 2 | 49520 | ✓ |
| Borderlands: The Pre-Sequel | 261640 | ✓ |
| Tales from the Borderlands | 348900 | ✓ |
| Borderlands 3 | 397540 | ✓ |
| Tiny Tina's Wonderlands | 1286680 | ✓ |
| New Tales from the Borderlands | 1454970 | ✓ ← FIXED (was 1637840) |
| Borderlands 4 | 1285190 | ✓ ← FIXED (was 2180450) |

---

## ❌ PREVIOUSLY WRONG IDs (corrected above)
- Honkai Star Rail: was 1414740, CORRECT is **1428350**
- Diablo II Resurrected: was 2200850, CORRECT is **1085510**
- Borderlands 4: was 2180450, CORRECT is **1285190**
- New Tales from Borderlands: was 1637840, CORRECT is **1454970**

---

## 🖼️ Steam CDN Image Patterns
```
Header (460×215):  https://cdn.cloudflare.steamstatic.com/steam/apps/{id}/header.jpg
Capsule (616×353): https://cdn.cloudflare.steamstatic.com/steam/apps/{id}/capsule_616x353.jpg
Library (600×900): https://cdn.cloudflare.steamstatic.com/steam/apps/{id}/library_600x900.jpg
Store page:        https://store.steampowered.com/app/{id}/
```
**NOTE:** Not all games have capsule_616x353 or library_600x900. header.jpg is most reliable.

---

## 🎮 Games NOT on Steam (use imgUrl field instead)
- League of Legends → imgUrl: steam app 1237970 (launcher page)
- Valorant → imgUrl: steam app 2076550 (launcher page)
- StarCraft II → imgUrl: steam app 2099300 (SC Remastered, use as placeholder)
- Hearthstone → imgUrl: steam app 1134050 (launcher)
- Fortnite → imgUrl: steam app 1942620 (Epic Games launcher)
- Escape from Tarkov → standalone, no Steam CDN

---

## 🔑 API Keys (stored in memory)
- Vercel token: VERCEL_TOKEN_REDACTED
- GitHub token: GH_TOKEN_REDACTED
- Vercel project: mistaims-projects/vault-gg
- Live URL: https://vault-gg-one.vercel.app

---

## 🚀 Deploy Command
```bash
cd /path/to/vault-gg
vercel --prod --yes --token VERCEL_TOKEN_REDACTED
```

---

## ⚠️ Common Gotchas
1. **Two games same Steam ID** — happened with P3 Reload (2161700) and SH2 Remake. Always verify.
2. **Steam CDN 404** — Game may be on Steam but CDN image not served from standard path. Use Steam store search API to find real ID.
3. **Games not on Steam** — Add `imgUrl` field using closest launcher/related Steam page.
4. **Duplicate IDs in GAMES array** — The `filtered()` function deduplicates by game `id`, but same steam ID can still cause visual dupes.
5. **YouTube IDs** — May expire or change. Keep `yt` field in data and always provide fallback search button.

---

## 📁 File Structure
```
vault-gg/
├── index.html          — Main site (all CSS + HTML)
├── js/
│   ├── data.js         — All game data (edit here to add games)
│   └── app.js          — Rendering engine (edit for new features)
├── admin/
│   └── index.html      — Admin cPanel (login: Morpheus / matrix123)
├── config.js           — Steam API key slots
├── vercel.json         — Deployment config
├── DEV_MEMORY.md       — This file
└── README.md           — Deployment docs
```
