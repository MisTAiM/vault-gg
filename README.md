# VAULT.GG — PC Gaming Encyclopedia

A fully static, single-page gaming reference site.
Real Steam CDN images. Font Awesome 6 icons. Zero dependencies, no build step.

## Files

```
vault-gg/
├── index.html      — Full site (structure + styles)
├── js/
│   ├── data.js     — All game data, Steam IDs, upcoming releases, Borderlands timeline
│   └── app.js      — Rendering engine (hero, grids, filters, modal, Borderlands timeline)
├── config.js       — Steam API key slots (optional — needed for personalized features only)
└── vercel.json     — Vercel static deployment config
```

## Deploy to Vercel

```bash
# Install Vercel CLI if needed
npm i -g vercel

# Deploy (will prompt for login first time)
cd vault-gg
vercel --prod
```

Or drag-drop the vault-gg folder into vercel.com/new for zero-CLI deploy.

## Steam Images

Game images load directly from Steam's public CDN — no API key required:
`https://cdn.cloudflare.steamstatic.com/steam/apps/{appId}/header.jpg`

## Steam API (Optional)

Add your Steam API key to `config.js` to unlock:
- Personal library sync
- "Played" badges on owned games
- Recently played hero rotation
- Friends activity feed

## Add a Game

Open `js/data.js` and add an entry to the `GAMES` array:

```js
{
  id: 'my-game',
  title: 'My Game',
  steam: 123456,          // Steam App ID (for image + store link)
  genre: 'Action RPG',
  dev: 'Developer Name',
  year: 2025,
  score: 88,              // Metacritic score (null if N/A)
  tier: 'A',              // S / A / B / C
  tags: ['action', 'rpg'],
  cat: ['genre-bis'],     // Browse filter categories
  desc: 'Description here...'
}
```

Then add the `id` to `TOP10`, `HERO_IDS`, or any section array as needed.

## Current as of March 31, 2026
