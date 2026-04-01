// ============================================================
// VAULT.GG — API Configuration
// Drop your keys here to enable personalized Steam features
// ============================================================

// STEAM API KEY
// Get yours at: https://steamcommunity.com/dev/apikey
// Used for: user library sync, playtime stats, friends activity
const STEAM_API_KEY = 'YOUR_STEAM_API_KEY_HERE';

// STEAM USER ID (64-bit SteamID)
// Find yours at: https://steamid.io
const STEAM_USER_ID = 'YOUR_STEAM_ID_64_HERE';

// ============================================================
// VERCEL DEPLOY
// Run: vercel --prod   (uses vercel.json config)
// Or:  VERCEL_TOKEN=your_token npx vercel --prod --yes
// ============================================================

// Feature flags — set true once keys are in place
const FEATURES = {
  steamLibrarySync:  false,   // Sync your Steam library into the browse grid
  playedBadges:      false,   // Show "Played" badges on games in your library
  recentlyPlayed:    false,   // Hero section shows your recently played games
  friendActivity:    false,   // Show what your Steam friends are playing
};
