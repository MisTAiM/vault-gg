// ============================================================
// VAULT.GG — Local Recommendation Engine
// Smart scoring system using real game data — no API needed
// Instant results, works offline, zero rate limits
// ============================================================

'use strict';

const REC_ENGINE = {

  // Score weights for each answer dimension
  MOOD_TAGS: {
    'challenged': {
      cats: ['soulslike','roguelike'], 
      tags: ['Difficult','Souls-like','Roguelike','Perma Death','Precision Platformer'],
      genres: ['Action Soulslike','Action Roguelite','Roguelike Deckbuilder','Precision Platformer'],
      tiers: ['S','A'], anti: ['Relaxed','Casual','Free to Play']
    },
    'absorbed': {
      cats: ['top10','genre-bis','anime'],
      tags: ['Story Rich','Choices Matter','Multiple Endings','RPG','Narrative'],
      genres: ['RPG','Action RPG','CRPG','Grand Strategy','Walking Simulator'],
      tiers: ['S','A'], anti: ['Arena Shooter','Battle Royale']
    },
    'pumped': {
      cats: ['fps','esports','competitive'],
      tags: ['Action','Fast-Paced','Shooter','FPS','Violent'],
      genres: ['First-Person Shooter','Battle Royale FPS','Tactical Shooter','Co-op Shooter'],
      tiers: ['S','A'], anti: ['Simulation','City Builder']
    },
    'relaxed': {
      cats: ['simulation','gems'],
      tags: ['Relaxing','Cozy','Farming Sim','Building','Sandbox','Casual'],
      genres: ['Management Simulation','City Builder','Space Simulation','Puzzle Simulation'],
      tiers: ['S','A','B'], anti: ['Difficult','Perma Death','Souls-like']
    },
    'scared': {
      cats: ['horror'],
      tags: ['Horror','Psychological Horror','Survival Horror','Atmospheric','Dark'],
      genres: ['Survival Horror','Co-op Horror','Psychological Horror'],
      tiers: ['S','A'], anti: ['Casual','Colorful']
    },
    'strategic': {
      cats: ['strategy'],
      tags: ['Strategy','Turn-Based','RTS','Grand Strategy','4X','Tactical'],
      genres: ['Turn-Based Strategy','Grand Strategy','Turn-Based Tactics','Real-Time Strategy'],
      tiers: ['S','A'], anti: ['Action','Fast-Paced']
    }
  },

  SESSION_FILTER: {
    'quick': { maxMain: 20, preferRoguelike: true, preferArcade: true },
    'evening': { maxMain: 60, preferred: true },
    'weekend': { minMain: 15, preferEpic: true }
  },

  SOCIAL_FILTER: {
    'solo': { cats: ['top10','genre-bis','soulslike','horror'], anti: ['esports','competitive'] },
    'coop': { cats: ['esports','competitive'], tags: ['Co-op','Online Co-Op','Multiplayer'] },
    'pvp': { cats: ['esports','competitive'], tags: ['PvP','Competitive','Online PvP'] },
    'either': {}
  },

  DIFFICULTY_FILTER: {
    'punishing': { cats: ['soulslike'], tags: ['Difficult','Perma Death','Souls-like','Unforgiving'], minTier: 'S' },
    'moderate': {},
    'chill': { anti: ['Difficult','Perma Death','Souls-like','Unforgiving'] }
  },

  BUDGET_FILTER: {
    'free': { freeOnly: true },
    'under15': { maxPrice: 15 },
    'mid': { maxPrice: 40 },
    'full': { maxPrice: 65 },
    'any': {}
  },

  // Extract keyword from answer text
  extractMood(answer) {
    if (answer.includes('earned satisfaction') || answer.includes('challenged')) return 'challenged';
    if (answer.includes('story') || answer.includes('absorbed') || answer.includes('immersed')) return 'absorbed';
    if (answer.includes('adrenaline') || answer.includes('action') || answer.includes('pumped')) return 'pumped';
    if (answer.includes('relaxed') || answer.includes('cozy') || answer.includes('building')) return 'relaxed';
    if (answer.includes('creeped') || answer.includes('scared') || answer.includes('tense')) return 'scared';
    if (answer.includes('strategic') || answer.includes('planning') || answer.includes('thinking')) return 'strategic';
    return 'absorbed';
  },

  extractSession(answer) {
    if (answer.includes('1-2') || answer.includes('pick up')) return 'quick';
    if (answer.includes('3-5') || answer.includes('evening')) return 'evening';
    if (answer.includes('all day') || answer.includes('weekend')) return 'weekend';
    return 'evening';
  },

  extractSocial(answer) {
    if (answer.includes('solo') || answer.includes('single')) return 'solo';
    if (answer.includes('co-op') || answer.includes('friends')) return 'coop';
    if (answer.includes('pvp') || answer.includes('competitive')) return 'pvp';
    return 'either';
  },

  extractDifficulty(answer) {
    if (answer.includes('punishing') || answer.includes('git') || answer.includes('extremely')) return 'punishing';
    if (answer.includes('moderate') || answer.includes('satisfying')) return 'moderate';
    if (answer.includes('accessible') || answer.includes('chill') || answer.includes('easy')) return 'chill';
    return 'moderate';
  },

  extractBudget(answer) {
    if (answer.includes('nothing') || answer.includes('free to play')) return 'free';
    if (answer.includes('under $15') || answer.includes('Under $15')) return 'under15';
    if (answer.includes('$15') || answer.includes('mid')) return 'mid';
    if (answer.includes('$60') || answer.includes('full price')) return 'full';
    return 'any';
  },

  // Get approx price for a game
  getPrice(game) {
    if (typeof PRICES === 'undefined') return null;
    const p = PRICES[game.id];
    if (!p) return null;
    if (p.free) return 0;
    if (p.cdkeys) return parseFloat(p.cdkeys.replace(/[^0-9.]/g,'')) || null;
    if (p.steam) return parseFloat(p.steam.replace(/[^0-9.]/g,'')) || null;
    return null;
  },

  // Score a single game against all answer criteria
  scoreGame(game, mood, session, social, difficulty, budget) {
    if (!game || !game.id || !game.title) return 0;
    
    let score = 0;
    const moodCfg = this.MOOD_TAGS[mood] || {};
    const socialCfg = this.SOCIAL_FILTER[social] || {};
    const diffCfg = this.DIFFICULTY_FILTER[difficulty] || {};
    const budgetCfg = this.BUDGET_FILTER[budget] || {};
    
    const gameCats = game.cat || [];
    const gameTags = game.tags || [];
    const gameGenre = game.genre || '';
    const gameDesc = (game.desc || '').toLowerCase();

    // ── BUDGET filter (hard exclude) ─────────────────────
    if (budgetCfg.freeOnly) {
      const isF2P = game.cat?.includes('esports') && !game.steam &&
        ['League of Legends','Valorant','CS2','Dota 2','TF2','Apex Legends','Fortnite'].includes(game.title);
      const p = this.getPrice(game);
      if (!isF2P && p !== 0 && p !== null) return 0;
      if (p === null && game.steam && !isF2P) return 0;
    }
    if (budgetCfg.maxPrice !== undefined) {
      const p = this.getPrice(game);
      if (p !== null && p !== 0 && p > budgetCfg.maxPrice) return -100;
    }

    // ── Tier bonus ───────────────────────────────────────
    const tierScore = { S: 30, A: 20, B: 10, C: 0 };
    score += tierScore[game.tier] || 0;

    // ── Metacritic score ─────────────────────────────────
    if (game.score) score += Math.min((game.score - 70) * 0.5, 15);

    // ── MOOD matching ────────────────────────────────────
    (moodCfg.cats || []).forEach(c => { if (gameCats.includes(c)) score += 25; });
    (moodCfg.tags || []).forEach(t => { if (gameTags.includes(t) || gameDesc.includes(t.toLowerCase())) score += 8; });
    (moodCfg.genres || []).forEach(g => { if (gameGenre.toLowerCase().includes(g.toLowerCase())) score += 15; });
    (moodCfg.anti || []).forEach(a => { if (gameTags.includes(a) || gameGenre.includes(a)) score -= 20; });

    // ── SESSION length ───────────────────────────────────
    const hltb = game.hltb?.main;
    if (hltb && session === 'quick' && hltb <= 15) score += 20;
    if (hltb && session === 'quick' && hltb > 40) score -= 15;
    if (hltb && session === 'weekend' && hltb >= 20) score += 15;
    if (!hltb && gameCats.includes('roguelike')) score += 10; // roguelikes are naturally sessioned

    // ── SOCIAL preference ────────────────────────────────
    (socialCfg.cats || []).forEach(c => { if (gameCats.includes(c)) score += 20; });
    (socialCfg.tags || []).forEach(t => { if (gameTags.includes(t)) score += 12; });
    (socialCfg.anti || []).forEach(a => { if (gameCats.includes(a)) score -= 25; });

    // ── DIFFICULTY matching ──────────────────────────────
    (diffCfg.cats || []).forEach(c => { if (gameCats.includes(c)) score += 20; });
    (diffCfg.tags || []).forEach(t => { if (gameTags.includes(t)) score += 12; });
    (diffCfg.anti || []).forEach(a => { if (gameTags.includes(a)) score -= 30; });

    // ── Active players bonus (shows it's worth playing now) ──
    if (game.players) {
      const n = parseFloat(game.players.replace(/[^0-9.]/g,''));
      const isM = game.players.includes('M');
      const isK = game.players.includes('K');
      const count = isM ? n * 1000000 : isK ? n * 1000 : n;
      if (count > 50000) score += 15;
      else if (count > 10000) score += 8;
      else if (count > 1000) score += 3;
    }

    return Math.max(0, score);
  },

  // Main recommendation function
  recommend(answers) {
    const mood = this.extractMood(answers[1] || '');
    const session = this.extractSession(answers[2] || '');
    const social = this.extractSocial(answers[3] || '');
    const difficulty = this.extractDifficulty(answers[4] || '');
    const budget = this.extractBudget(answers[5] || '');

    // Score every game
    const scored = GAMES
      .filter(g => g.id && g.title && g.genre && g.cat)
      .map(g => ({
        game: g,
        score: this.scoreGame(g, mood, session, social, difficulty, budget)
      }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score);

    // Build top 3 with diverse genres (avoid 3x soulslike etc.)
    const picks = [];
    const usedGenres = new Set();
    
    for (const { game, score } of scored) {
      if (picks.length >= 3) break;
      // Allow duplicates if not enough variety
      const genreKey = game.genre?.split(' ')[0];
      if (usedGenres.has(genreKey) && picks.length < 2) continue;
      usedGenres.add(genreKey);
      picks.push({ game, score });
    }

    // Fill to 3 if needed
    if (picks.length < 3) {
      for (const { game, score } of scored) {
        if (picks.find(p => p.game.id === game.id)) continue;
        picks.push({ game, score });
        if (picks.length >= 3) break;
      }
    }

    return {
      mood, session, social, difficulty, budget,
      picks: picks.map(({ game, score }) => this.buildPick(game, score, mood, session, social, difficulty, budget)),
      summary: this.buildSummary(mood, session, social, difficulty, budget, picks.map(p => p.game))
    };
  },

  buildPick(game, score, mood, session, social, difficulty, budget) {
    const price = this.getPrice(game);
    const priceStr = price === 0 ? 'Free to Play' : price ? `~$${price} key` : game.steam ? 'Check Steam' : 'Free';
    
    const reasons = [];
    
    // Mood-specific reason
    const moodReasons = {
      challenged: `Demands real skill — every death teaches you something. ${game.tier === 'S' ? 'An all-time great in its category.' : 'Highly rated by the community.'}`,
      absorbed: `Deep lore and meaningful choices that pull you in for hours. ${game.hltb?.comp ? `${game.hltb.comp}h to see everything.` : 'Extensive content to explore.'}`,
      pumped: `Fast, fluid, and immediately satisfying. ${game.players ? `${game.players} people playing right now.` : 'Active multiplayer community.'}`,
      relaxed: `Zero pressure, your own pace. ${game.hltb?.main ? `Main content runs ${game.hltb.main}h but you can go much deeper.` : 'Endless things to discover.'}`,
      scared: `Masterfully builds dread without relying on cheap jumpscares. ${game.score ? `${game.score} on Metacritic — critics agree.` : ''}`,
      strategic: `Rewards patience and long-term thinking. ${game.hltb?.main ? `${game.hltb.main}h for a full playthrough.` : 'Deep systems to master.'}`
    };
    
    reasons.push(moodReasons[mood] || `${game.score ? game.score + '/100 Metacritic. ' : ''}Highly regarded in its genre.`);
    
    // Session reason
    if (session === 'quick' && game.cat?.includes('roguelike')) {
      reasons.push('Perfect for short runs — each attempt is self-contained.');
    } else if (session === 'weekend' && game.hltb?.comp > 30) {
      reasons.push(`Full completionist run is ${game.hltb.comp}h — a proper weekend commitment.`);
    } else if (game.hltb?.main) {
      reasons.push(`Main story: ${game.hltb.main}h. 100%: ${game.hltb.comp || '?'}h.`);
    }

    // Price/value callout
    if (price === 0) reasons.push('Completely free — no cost to try it right now.');
    else if (price && price < 15) reasons.push(`Currently ~$${price} — incredible value for this quality.`);
    
    const keyFact = game.score ? `${game.score}/100 Metacritic · ${priceStr}` : 
      game.players ? `${game.players} playing now · ${priceStr}` : priceStr;

    return {
      gameId: game.id,
      title: game.title,
      reason: reasons.filter(Boolean).join(' '),
      keyFact,
      matchScore: Math.min(99, Math.round(50 + score / 2)),
      genre: game.genre,
      tier: game.tier
    };
  },

  buildSummary(mood, session, social, difficulty, budget, games) {
    const moodWord = { challenged:'challenge', absorbed:'story', pumped:'action', relaxed:'chill sessions', scared:'horror', strategic:'strategy' }[mood] || 'gaming';
    const socialWord = { solo:'solo', coop:'co-op', pvp:'competitive', either:'any kind of' }[social] || 'great';
    return `Based on your taste for ${moodWord} and ${socialWord} play — here are your best next ${session === 'quick' ? 'pick-up-and-play' : session === 'weekend' ? 'epic weekend' : 'evening'} games right now.`;
  }
};
