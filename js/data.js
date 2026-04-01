// ============================================================
// VAULT.GG — Game Database v2
// Steam CDN: cdn.cloudflare.steamstatic.com/steam/apps/{id}/header.jpg
// ============================================================

const STEAM_IMG   = id => `https://cdn.cloudflare.steamstatic.com/steam/apps/${id}/header.jpg`;
const STEAM_STORE = id => `https://store.steampowered.com/app/${id}/`;
const YT_EMBED    = id => `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
const YT_SEARCH   = q  => `https://www.youtube.com/results?search_query=${encodeURIComponent(q+' official gameplay trailer')}`;

const ICONS = {
  'Open World RPG':'fa-earth-americas','Soulslike':'fa-skull','Turn-Based RPG':'fa-chess',
  'JRPG':'fa-wand-magic-sparkles','Action RPG':'fa-bolt','FPS':'fa-crosshairs',
  'Tactical FPS':'fa-crosshairs','Fighting':'fa-hand-fist','Roguelike':'fa-dice-d20',
  'Deckbuilder':'fa-layer-group','Survival':'fa-fire','Co-op':'fa-people-group',
  'RTS':'fa-flag','Strategy':'fa-chess-knight','Battle Royale':'fa-circle-dot',
  'Indie':'fa-gem','MMO':'fa-globe','Builder':'fa-cubes','Horror':'fa-ghost',
  'Racing':'fa-car-side','Sim Racing':'fa-gauge-high','Sports':'fa-futbol',
  'Puzzle':'fa-puzzle-piece','Platformer':'fa-person-running','Stealth':'fa-user-secret',
  'Space':'fa-rocket','Narrative RPG':'fa-book-open','VR':'fa-vr-cardboard',
  'Anime Fighter':'fa-burst','Anime RPG':'fa-star','Looter Shooter':'fa-gun',
  'Sandbox':'fa-cubes-stacked','Life Sim':'fa-seedling','MOBA':'fa-map',
  'Action Horror':'fa-skull-crossbones','Action Adventure':'fa-compass',
  'Open World':'fa-earth-americas','Simulation':'fa-sliders','Default':'fa-gamepad'
};

const icon = g => ICONS[g] || ICONS.Default;

// ---- Achievement difficulty labels ----
const DIFF = ['','Trivial','Easy','Medium','Hard','Legendary'];
const DIFF_COLOR = ['','#4ade80','#86efac','#f5c842','#f97316','#ff5c35'];

// ============================================================
// GAMES
// ============================================================
const GAMES = [
  // ── TOP 10 ─────────────────────────────────────────────
  {
    id:'elden-ring', title:'Elden Ring', steam:1245620,
    genre:'Open World RPG', dev:'FromSoftware', year:2022, score:96, tier:'S',
    yt:'E3Huy2cdih0',
    hltb:{ main:55, comp:133 }, players:'45K',
    tags:['open-world','soulslike','action-rpg','co-op'],
    cat:['top10','genre-bis','graphics','soulslike'],
    desc:"FromSoftware's masterpiece — an open world soulslike co-written with G.R.R. Martin. Every corner of the Lands Between hides something extraordinary, or something that wants to kill you beautifully. Arguably the greatest PC game ever made.",
    achievements:[
      { name:'Elden Lord', desc:'Become Elden Lord — the standard ending', how:'Complete the game: defeat all shardbearers, reach the Elden Throne, defeat Maliketh, then Radagon and the Elden Beast. Accept Melina\'s accord early.', diff:3, type:'story', tip:'Recommended Level: 130+. Keep Melina alive — if you use the Flame of Frenzy route mid-game you lose her summon for the final bosses.' },
      { name:'Lord of Frenzied Flame', desc:'Become the Lord of Frenzied Flame — secret ending', how:'Complete Hyetta\'s questline in full, then find the Frenzied Flame Proscription beneath Leyndell before defeating Maliketh. Interact with the Three Fingers.', diff:4, type:'secret', tip:'You CAN reverse this if you get Miquella\'s Needle from the Mohg questline. Do Millicent\'s questline completely to get it.' },
      { name:'Age of Stars', desc:"Ranni's hidden ending — most missable in the game", how:"Complete Ranni's entire questline: meet her in Ranni's Rise, get the Fingerslayer Blade from Nokron, Miniature Ranni, kill Nokstella boss, find the Discarded Palace Key, complete the Lake of Rot, defeat Astel, reach Ranni. Give her the Dark Moon Ring.", diff:4, type:'secret', tip:'Starts at Ranni\'s Rise in Liurnia. Easily the most involved questline in any FromSoftware game. Do NOT kill Blaidd early.' },
      { name:'Legendary Sorceries and Incantations', desc:'Learn all 7 legendary spells', how:'Comet Azur, Stars of Ruin, Elden Stars, Flame of the Fell God, Scarlet Aeonia, Founding Rain of Stars, Ranni\'s Dark Moon — located across all major regions', diff:4, type:'collectible', tip:'Most are guarded by hidden bosses or locked behind questlines. Comet Azur is in Hermit Village, Mt. Gelmir.' },
      { name:'Elden Ring (Platinum)', desc:'Collect all other trophies', how:'Requires all 6 endings, all legendary armaments, all legendary talismans, all legendary spells, all remembrances. Requires 6 full playthroughs or careful use of New Game+', diff:5, type:'challenge', tip:'Use a checklist. Many items are permanently missable if you kill NPCs at wrong times. Malenia is the hardest optional boss at Haligtree.' },
    ]
  },
  {
    id:'baldurs-gate-3', title:"Baldur's Gate 3", steam:1086940,
    genre:'Turn-Based RPG', dev:'Larian Studios', year:2023, score:96, tier:'S',
    yt:'iuqXvKGv5GE',
    hltb:{ main:100, comp:200 }, players:'80K',
    tags:['turn-based','rpg','co-op','dnd'],
    cat:['top10','genre-bis'],
    desc:'Raised the bar for every RPG in existence. 100+ hours, thousands of different outcomes, zero filler. Every decision reshapes the world. The most ambitious RPG ever shipped.',
    achievements:[
      { name:'Descent Into Avernus', desc:'Complete the game', how:'Survive Act 1 (Grove/Underdark), Act 2 (Shadow-Cursed Lands/Moonrise), and Act 3 (Baldur\'s Gate city). Defeat the Netherbrain.', diff:2, type:'story', tip:'The game autosaves frequently but keep manual saves. Some endings lock out based on choices 30 hours earlier.' },
      { name:'Gather Your Party', desc:'Recruit all origin companions', how:'Recruit: Shadowheart (beach, Act 1), Astarion (same beach), Gale (Roadside Cliffs), Lae\'zel (cage near grove), Wyll (at the Grove), Karlach (find her before Wyll kills her, north of Emerald Grove)', diff:2, type:'collectible', tip:'Karlach is almost always missed on first playthroughs. She\'s north of the grove — Wyll\'s quest will have you kill her unless you find her first.' },
      { name:'Shar\'s Chosen', desc:"Complete Shadowheart's full Dark Urge arc", how:"Follow Shadowheart's questline through all three acts. In Act 2 reach the Gauntlet of Shar and complete all four trials. Kill Nightsong or spare her — each leads to different paths.", diff:3, type:'secret', tip:'Choosing to spare Nightsong leads to a better ending for Shadowheart long-term and unlocks a unique companion arc in Act 3.' },
      { name:'Kill It With Fire', desc:'Defeat Cazador in a specific way', how:'During Astarion\'s Act 3 quest, stop the ritual mid-ceremony by killing Cazador before he completes it. Attack immediately when the ritual begins — do not let it finish.', diff:3, type:'secret', tip:'If you let the ritual complete, Astarion ascends and becomes less empathetic. Both are valid storylines but this achievement requires stopping it.' },
      { name:'Honour Mode', desc:'Complete the game on Honour difficulty', how:'Single life, no reloads allowed. Any companion death is permanent. Builds must be optimized — recommend: 2 Paladin/10 Sorcerer (Sorlock), Monk of the Open Hand, Warlock Hexblade', diff:5, type:'challenge', tip:'Camp frequently. Use the Aid spell to max HP. Omeluum vendor in Underdark sells powerful items early. Hardest section: Orin the Red in Act 3.' },
    ]
  },
  {
    id:'rdr2', title:'Red Dead Redemption 2', steam:1174180,
    genre:'Open World', dev:'Rockstar Games', year:2019, score:97, tier:'S',
    yt:'eaW0tYpxyp0',
    hltb:{ main:50, comp:175 }, players:'25K',
    tags:['open-world','western','cinematic','story-rich'],
    cat:['top10','genre-bis','graphics'],
    desc:'The most cinematic open world ever made. Arthur Morgan is one of the greatest protagonists in the history of fiction. Still the visual benchmark in 2026.',
    achievements:[
      { name:'Lending a Hand', desc:'Complete all optional honor missions across the entire game', how:'Track all stranger missions marked with ? on the map. Honor affects which missions appear — keep it high. Includes: The Noblest of Men, A Fine Night of Debauchery, The Course of True Love', diff:4, type:'collectible', tip:'Some stranger missions only appear at specific times. "The Veteran" stranger chain requires multiple days to complete. Missable after Chapter 6.' },
      { name:'Legend of the East', desc:'Complete all 90 challenges across 9 challenge sets', how:'Challenges: Bandit, Explorer, Gambler, Herbalist, Horseman, Hunter, Master Hunter, Sharpshooter, Survivalist. Each has 10 tasks. Herbalist 9 requires a legendary herb.', diff:5, type:'challenge', tip:'Gambler challenges are the worst. Gambler 8 (win 3 hands at blackjack in a row) is pure luck. Do challenges throughout — not at endgame rush.' },
      { name:'Notorious', desc:'Complete all optional bandit/outlaw tasks in the game', how:'Rob stagecoaches, loot homesteads, complete outlaw missions. Many are scattered across all chapters. Track progress in Stats menu.', diff:3, type:'challenge', tip:'High wanted level areas like Blackwater are accessible in epilogue. Some bandit tasks require low honor to unlock.' },
      { name:'Gold Rush', desc:'Complete any mission with a Gold Medal', how:'Each mission has 3 gold objectives. Complete all of them in a single playthrough to earn Gold. Replay missions from the menu if you miss Gold.', diff:4, type:'challenge', tip:'Use Dead Eye constantly for headshot requirements. Most time limits require minimal exploration during the mission.' },
    ]
  },
  {
    id:'cyberpunk-2077', title:'Cyberpunk 2077 + Phantom Liberty', steam:1091500,
    genre:'Action RPG', dev:'CD Projekt Red', year:2023, score:93, tier:'S',
    yt:'qIcTM8WXFjk',
    hltb:{ main:25, comp:110 }, players:'30K',
    tags:['open-world','action-rpg','fps','path-tracing'],
    cat:['top10','genre-bis','graphics'],
    desc:'The greatest redemption arc in gaming. Post-2.0 update and Phantom Liberty DLC transformed a broken launch into a masterpiece. Night City with Path Tracing is the best-looking game world ever constructed.',
    achievements:[
      { name:'The Tower (New Ending)', desc:'Phantom Liberty secret ending — most satisfying conclusion', how:'Complete Phantom Liberty DLC entirely. Choose to call Songbird at the final decision. Speak to Reed. Then choose to side with Songbird fully over Reed in the final confrontation at the black site.', diff:3, type:'secret', tip:'This ending significantly changes the main game\'s final act — unlocks a unique ending for V that no other route provides. Most players miss it.' },
      { name:'The Star', desc:'Leave Night City with Panam and the Aldecaldos', how:'Complete Panam\'s full questline (all Aldecaldos missions). At the end of the main game, choose to call Panam. Agree to her plan for the assault on Arasaka.', diff:2, type:'story', tip:'This is considered the most hopeful ending. Panam\'s questline starts with "With a Little Help from My Friends" — do not skip any of her side content.' },
      { name:'The Sun', desc:'Become the legend of Night City', how:'Complete Rogue\'s questline. At the final decision, call Johnny. Johnny takes control of V\'s body, goes on the Arasaka assault alone, and dies as a legend.', diff:2, type:'story', tip:'Johnny\'s ending. Requires you to side with Johnny throughout — his friendship level must be maxed (60%+). Check relationship status in journal.' },
      { name:'Breathtaking', desc:'Collect all Iconic weapons', how:'80+ Iconic weapons scattered across Night City. Many are tied to quests. Key ones: Mantis Blades (corpo start), Skippy (Heywood Vista Del Rey), Overwatch (Panam quest), Lizzie (Judy quest)', diff:4, type:'collectible', tip:'Skippy is completely missable — it\'s a talking gun in an alley in Heywood. It changes modes based on early choices. Most wanted: Comrade\'s Hammer for the 1-shot damage build.' },
    ]
  },
  {
    id:'persona-5-royal', title:'Persona 5 Royal', steam:1687950,
    genre:'JRPG', dev:'Atlus', year:2022, score:95, tier:'S',
    yt:'Iy3FDTmDuVM',
    hltb:{ main:100, comp:140 }, players:'8K',
    tags:['jrpg','turn-based','social-sim','anime'],
    cat:['top10','genre-bis','anime'],
    desc:'Best art direction in any game ever made. The UI design is studied by actual graphic designers. Story, music, combat, and style form a complete and irreproachable artistic statement.',
    achievements:[
      { name:'A Phantom Thief\'s Journey', desc:'Complete the game — any ending', how:'Complete all 8 palaces and the final confrontation. Manage time between dungeons and social links. November 20 is the final deadline before the bad ending locks in.', diff:2, type:'story', tip:'If Ryuji\'s Showtime attack unlocks early for you, push harder — it means you have good bond levels. The true ending requires maxing specific Confidants.' },
      { name:'The Treasure of the Thief', desc:'Collect all Personas in the Compendium', how:'Fuse or acquire all 188 Personas in the Compendium. High-level Personas require maxing their Arcana Confidants first. Requires multiple New Game+ cycles.', diff:5, type:'collectible', tip:'Yoshitsune (Judgement Arcana) is the most powerful built Persona. Requires Sun Confidant rank 10. Many Personas only appear in Mementos depths.' },
      { name:'Phantom Thieves of Hearts', desc:'Max all Confidant links in a single playthrough', how:'All 22 Confidants must reach rank 10. Requires near-perfect time management. Watch every rain (library/diner time) and use weekdays for Confidants with jobs.', diff:4, type:'challenge', tip:'Prioritize: Ryuji (Chariot) for combat bonus early, Makoto (Priestess) for Technical upgrade, Futaba (Hermit) because it time-locks. Buy a guidebook for this run.' },
    ]
  },
  {
    id:'hades-2', title:'Hades 2', steam:1145350,
    genre:'Roguelike', dev:'Supergiant Games', year:2024, score:92, tier:'S',
    yt:'H-5oTap_qw0',
    hltb:{ main:35, comp:150 }, players:'22K',
    tags:['roguelike','action','mythology','early-access'],
    cat:['top10','genre-bis'],
    desc:'Supergiant outdid a near-perfect game. Deeper narrative, tighter combat, new weapons. Still technically Early Access but already the best roguelike ever made.',
    achievements:[
      { name:'Cleared the Way', desc:'Complete your first full run to the surface', how:'Defeat all four bosses in sequence: Hecate → Scylla → Cerberus → Chronos. Each requires reading attack patterns. Start with Witch\'s Staff for easiest learning curve.', diff:3, type:'story', tip:'Hecate is a tutorial boss — she teaches mechanics. Scylla\'s band phase is the most punishing for new players. Zeus Call Boons are the strongest for beginners.' },
      { name:'Extreme Heat', desc:'Clear a run with 10+ Heat on any weapon', how:'Add Heat via the Crossroads between runs. Each Heat level adds a modifier: faster enemies, more hazards, limited Boons. Combine with your strongest weapon synergies.', diff:4, type:'challenge', tip:'Staff + Zeus/Demeter combination handles high Heat best. Avoid Sprint Modifier heat until you\'re comfortable — it removes your dodge from certain moves.' },
      { name:'All Grasp', desc:'Unlock all Arcana Cards', how:'Earn Ashes through runs, spend at the Crossroads. Unlock the full Arcana spread — each grants passive bonuses to Melinoe\'s abilities and can be memorized for bonuses.', diff:3, type:'collectible', tip:'The Moon Arcana is most impactful for survivability. Prioritize: #10 (Death Defiance restore), #12 (Boon rarity boost), #18 (starting cast charge).' },
    ]
  },
  {
    id:'disco-elysium', title:'Disco Elysium: The Final Cut', steam:632470,
    genre:'Narrative RPG', dev:'ZA/UM', year:2019, score:97, tier:'S',
    yt:'4uTr0jyZzao',
    hltb:{ main:24, comp:50 }, players:'3K',
    tags:['narrative','detective','rpg','no-combat'],
    cat:['top10','genre-bis'],
    desc:'No combat. Just the most brilliant writing in any video game ever made. You are a disaster of a detective in a city drowning in ideology and failure. Nothing in gaming comes close.',
    achievements:[
      { name:'Superstar Cop', desc:'Resolve the case as a high-morale, by-the-book detective', how:'Keep morale high throughout, avoid the more chaotic choices, solve the murder correctly (Klaasje and Jean Vicquemare\'s involvement), arrest the actual killer in the final confrontation.', diff:3, type:'story', tip:'Your Empathy, Authority, and Logic skills need to be developed. The political compass of the game doesn\'t affect this — ideology is separate from competence.' },
      { name:'The Apocalypse Cop', desc:'Discover all four ideological visions for Revachol', how:'Max out all four political skill dialogues: Communist (Rhetoric), Fascist (Physical Instrument), Moralist (Volition), Ultraliberal (Conceptualization). Talk to every major NPC about politics.', diff:4, type:'secret', tip:'The Pale vision requires maxing Inland Empire. The apocalypse cop vision is the most secret — requires interacting with the pale while alone late at night in-game.' },
      { name:'Da Capo', desc:'Die and be resurrected', how:'Fail enough Morale checks to die during the game. Most commonly from the drug withdrawal sequence or certain critical failures. When you die, the game resets from last checkpoint with Harry\'s memory of failing.', diff:2, type:'secret', tip:'Intentional death is actually required for some story branches. Failing the necktie dream sequence is one of the funniest death states in the game.' },
    ]
  },
  {
    id:'monster-hunter-wilds', title:'Monster Hunter Wilds', steam:2246340,
    genre:'Action RPG', dev:'Capcom', year:2025, score:90, tier:'S',
    yt:'Lne04fT1sYk',
    hltb:{ main:40, comp:200 }, players:'90K',
    tags:['action-rpg','co-op','monster-hunting'],
    cat:['top10','genre-bis'],
    desc:'Peak action RPG design. Open biomes, reactive ecosystems, and the most refined combat loop in franchise history. Endgame that never stops rewarding.',
    achievements:[
      { name:'The Hunter Becomes The Hunted', desc:'Defeat a Tempered Elder Dragon', how:'Reach HR 50+, unlock tempered investigations. Tempered Arkveld or Tempered Jin Dahaad recommended for first clear. Requires Artian-tier armor and weapons.', diff:4, type:'challenge', tip:'Bring a full healing setup with max Potions, Mega Potions, and Lifepowder. Elemental weaknesses matter — Wilds Tempered monsters have specific weak points that change mid-battle.' },
      { name:'Fashion Hunter', desc:'Complete a full armor set from all 5 monster families', how:'Craft a complete 5-piece set from: Doshaguma, Chatacabra, Balahara, Rey Dau, and Quematrice lineages. Check armor crafting menu for each.', diff:2, type:'collectible', tip:'Each set has a hidden set bonus that activates at 2 or 4 pieces. The Doshaguma set early gives Offensive Guard which is top-tier for hammer/lance users.' },
    ]
  },
  {
    id:'deep-rock-galactic', title:'Deep Rock Galactic', steam:548430,
    genre:'Co-op', dev:'Ghost Ship Games', year:2020, score:90, tier:'S',
    yt:'3FCoSBpCWNE',
    hltb:{ main:30, comp:500 }, players:'18K',
    tags:['co-op','fps','dwarves','pve'],
    cat:['top10','genre-bis'],
    desc:'The gold standard of co-op gaming. No toxicity, no FOMO, just four dwarves mining caves full of bugs. Rock and Stone.',
    achievements:[
      { name:'Rock and Stone', desc:'Salute with Rock and Stone in a full team', how:'Press X (PC) to do the Rock and Stone salute. All four players must Rock and Stone simultaneously. Usually happens organically during missions.', diff:1, type:'story', tip:'The community basically requires this greeting. Typing "Rock and Stone" in chat or using the voice line also counts. Essential DRG etiquette.' },
      { name:'A Small Step...', desc:'Land on Hoxxes IV for the first time', how:'Complete your very first mission of any type. The landing sequence triggers the achievement automatically upon first successful deployment.', diff:1, type:'story', tip:'Start on Haz 1 or 2 to learn the systems. The four classes play very differently — Scout is most mobile, Driller has most movement tools.' },
      { name:'The Leaf Lover\'s Special', desc:'Let a teammate complete the Ominous Humming ritual while you do nothing', how:'When the Ominous Humming easter egg triggers during a mission (rare random event), let ONE teammate hold the button while ALL others stand and watch without helping.', diff:3, type:'secret', tip:'Pure luck — this event isn\'t guaranteed. When you hear the humming sound, check the anomaly. Most players never see this in hundreds of hours.' },
      { name:'Promotion', desc:'Reach Player Level 25 with any class then promote them', how:'Play missions with your chosen class until level 25. Return to the Space Rig, go to the Promotion Terminal, and promote the dwarf. Resets level to 1 but unlocks Prestige cosmetics and overclocks.', diff:3, type:'challenge', tip:'First promotion gives you an assignment to unlock your first Overclocks. Overclocks are the core build system — prioritize getting your first set.' },
    ]
  },
  {
    id:'clair-obscur', title:'Clair Obscur: Expedition 33', steam:1903340,
    genre:'Turn-Based RPG', dev:'Sandfall Interactive', year:2025, score:95, tier:'S',
    yt:'8pG_8I0CNRI',
    hltb:{ main:35, comp:80 }, players:'55K',
    tags:['jrpg','turn-based','ue5','french'],
    cat:['top10','genre-bis'],
    desc:"2025's greatest surprise. A small French studio made one of the best RPGs of the decade on their debut. Belle Epoque France as a fantasy setting, stunning UE5 visuals.",
    achievements:[
      { name:'The Last Expedition', desc:'Complete the main story', how:'Follow the Expedition 33 storyline through all three acts. Survive encounters with the Paintress. Final boss requires mastering both the parry system and the Lumina ability grid.', diff:3, type:'story', tip:'The game\'s parry timing is the most skill-expressive system. Practice on Forgotten enemies first. The final sequence has multiple phases — bring SP restoratives.' },
      { name:'Picto Collector', desc:'Collect all Pictos (equippable abilities)', how:'Pictos are found in chests, dropped by rare enemies, and purchased from merchants across all three acts. Many are hidden in optional areas off the main path.', diff:4, type:'collectible', tip:'The rarest Pictos drop from Errant enemies (rare spawns in each region). Gustave\'s unique Pictos from his backstory questline are the most powerful.' },
    ]
  },

  // ── GENRE BIS ───────────────────────────────────────────
  {
    id:'hades', title:'Hades', steam:1145360,
    genre:'Roguelike', dev:'Supergiant Games', year:2020, score:93, tier:'S',
    yt:'91t0ha9x0AE',
    hltb:{ main:22, comp:90 }, players:'12K',
    tags:['roguelike','action','mythology'],
    cat:['genre-bis'],
    desc:'The roguelike that proved the genre could have a real narrative. Zagreus escaping the Underworld.',
    achievements:[
      { name:'The Unseen One', desc:'Escape the Underworld for the first time', how:'Defeat Megaera (Tartarus), Lernaean Bone Hydra (Asphodel), Theseus & Asterius (Elysium), Hades (Temple of Styx). The first escape typically takes 15-30 attempts.', diff:3, type:'story', tip:'Spear + Poseidon/Zeus boons is the easiest first clear combo. Shield is the most defensive weapon for beginners. Unlock Skelly\'s training early.' },
      { name:'Extreme Heat', desc:'Clear a run with 32 Heat (max)', how:'Add Heat modifiers via the Pact of Punishment. Each modifier increases difficulty. Full clear at max heat is true endgame.', diff:5, type:'challenge', tip:'Sword + Aspect of Arthur is peak 32 Heat weapon. Requires deep knowledge of all boss patterns. Runs take 2+ hours at max heat.' },
    ]
  },
  {
    id:'balatro', title:'Balatro', steam:2379780,
    genre:'Deckbuilder', dev:'LocalThunk', year:2024, score:94, tier:'S',
    yt:'m0cQ2BKg8tY',
    hltb:{ main:12, comp:200 }, players:'28K',
    tags:['deckbuilder','roguelike','poker'],
    cat:['genre-bis'],
    desc:'One developer. $20. Stole GOTY. Poker meets roguelike synergy in a package that is, functionally, crack cocaine for the brain.',
    achievements:[
      { name:'Gold Sticker', desc:'Win a run on any stake', how:'Reach the final boss (Ante 8) and defeat it. Build a deck with at least one reliable hand that can consistently score 300+ chips per play.', diff:2, type:'story', tip:'Flush builds are the easiest first win. Find a Joker that multiplies flush scoring. The "Smeared Joker" + flush cards combo is a guaranteed win condition on low stakes.' },
      { name:'The Omega', desc:'Win on Gold Stake (hardest difficulty)', how:'Gold Stake adds: negative Joker slots start at -1, card removal costs 5$, Joker shop slots reduced. Requires building an engine that overcomes severe resource restrictions.', diff:5, type:'challenge', tip:'The "Campfire" + endless multiplier strategies break Gold Stake. Find "Blueprint" Joker to copy your strongest multiplier twice.' },
    ]
  },
  {
    id:'valheim', title:'Valheim', steam:892970,
    genre:'Survival', dev:'Iron Gate Studio', year:2021, score:88, tier:'A',
    yt:'TzKSlc07n8s',
    hltb:{ main:50, comp:200 }, players:'14K',
    tags:['survival','co-op','viking'],
    cat:['genre-bis'],
    desc:'Viking survival with genuine soul. Procedural worlds, Norse mythology, satisfying boss progression.',
    achievements:[
      { name:'Valheim', desc:'Defeat Yagluth, the fifth boss', how:'Progress through all biomes: Meadows → Black Forest → Swamp → Mountain → Plains. Defeat each biome boss to unlock the next tier of equipment and resources.', diff:3, type:'story', tip:'The Mountain biome kills most players — craft Frost Resistance Mead before entering. Wolf Armor is your priority before Moder (Mountain boss).' },
      { name:'The Sacrifice', desc:'Defeat the Queen in the Mistlands', how:'Post-launch biome. Craft a Wisp Torch to clear Mist, build Feather Cape for fall immunity, craft Mistlands armor tier, then find and defeat the Queen boss in Infested Mines.', diff:4, type:'challenge', tip:'The Queen is the hardest Valheim boss. Bring maximum food, Carapace Armor, and crossbow. Mistlands is dangerous enough that flying mounts (from Ashlands) change the experience.' },
    ]
  },
  {
    id:'stardew-valley', title:'Stardew Valley', steam:413150,
    genre:'Life Sim', dev:'ConcernedApe', year:2016, score:90, tier:'S',
    yt:'ot7uXNQskhs',
    hltb:{ main:52, comp:180 }, players:'22K',
    tags:['life-sim','farming','indie'],
    cat:['genre-bis','mods','nostalgia'],
    desc:'Built by one person. 40M+ copies sold. SMAPI mod framework makes it infinite. The definition of the indie G.O.A.T.',
    achievements:[
      { name:'Perfection', desc:'Achieve 100% Perfection rating', how:'Complete: all shipping, all crafting, all cooking, all friendships (10 hearts), all museum donations, all skills at 10, Grandpa\'s Shrine score 4, Golden Clock built, all Stardrops found, Walnut Room on Ginger Island.', diff:5, type:'challenge', tip:'The Golden Clock costs 10 million gold and is the final barrier for most players. Speed-run Ginger Island immediately in Year 2. Junimo Hut helps automate late farming.' },
      { name:'The Singular', desc:'Become best friends (14 hearts) with someone', how:'Give gifts twice per week to any villager. Marriage candidates max at 14 hearts if married. Special cutscenes unlock at 4, 6, 8, 10, 12, 14 hearts.', diff:2, type:'story', tip:'Penny, Leah, and Haley are easiest to gift since they love universally loved items. Sebastian and Elliott love specific items that are harder to craft early.' },
    ]
  },
  {
    id:'portal-2', title:'Portal 2', steam:620,
    genre:'Puzzle', dev:'Valve', year:2011, score:95, tier:'S',
    yt:'tax4e4hBBZc',
    hltb:{ main:9, comp:20 }, players:'5K',
    tags:['puzzle','co-op','sci-fi'],
    cat:['genre-bis'],
    desc:'Best puzzle design in gaming history. The co-op doubles the entire experience. GLaDOS is one of fiction\'s greatest characters.',
    achievements:[
      { name:'Smash TV', desc:'Break 11 monitors in the game', how:'In Chapter 2, GLaDOS taunts you with monitors showing her eye. Shoot portals to reach and smash 11 of the monitors spread across the chapter.', diff:2, type:'secret', tip:'The monitors are easily missed on first playthrough — you\'re usually focused on the puzzle. Chapter 2, look for the panels with GLaDOS\'s face on them along the walls.' },
      { name:'Professor Portal', desc:'Complete all co-op chambers with a friend who hasn\'t played', how:'Play the full co-op campaign with someone new to Portal 2. Complete all 5 courses of chambers together from start to finish.', diff:2, type:'co-op', tip:'The best gaming experience possible. Atlas and P-Body\'s entire dynamic is designed for two-player discovery. The high-five mechanic is used constantly.' },
    ]
  },
  {
    id:'hollow-knight', title:'Hollow Knight', steam:367520,
    genre:'Metroidvania', dev:'Team Cherry', year:2017, score:90, tier:'S',
    yt:'UA4hW9K22aM',
    hltb:{ main:40, comp:75 }, players:'8K',
    tags:['metroidvania','indie','challenging'],
    cat:['genre-bis'],
    desc:'The defining Metroidvania of the decade. Hallownest is one of gaming\'s most beautifully realized worlds.',
    achievements:[
      { name:'Radiance', desc:'Defeat the secret true final boss', how:'Collect all 45 Essence, awaken the Dream Nail, complete Grimm Troupe DLC, complete the Pantheon of Hallownest. The Radiance is a multi-phase aerial boss that appears after Hollow Knight\'s true form.', diff:5, type:'secret', tip:'The Radiance is harder than any boss from the main game. Quick Slash + Shaman Stone + Shade Soul is the highest DPS build for this fight.' },
      { name:'Sealed Siblings', desc:'Complete the Hollow Knight ending by sealing yourself', how:'After completing the Dream Nail and returning to the Black Egg Temple, fight the Hollow Knight. Let him hit you and accept the ending where you seal yourself as the new Hollow Knight.', diff:3, type:'story', tip:'This is the "bad" ending that seals the cycle. The true ending (Radiance) requires completing all Dreamers and finding all Void items. Three endings total.' },
    ]
  },
  {
    id:'hitman-woa', title:'Hitman: World of Assassination', steam:1659040,
    genre:'Stealth', dev:'IO Interactive', year:2023, score:90, tier:'S',
    yt:'DVTCZ4LCPek',
    hltb:{ main:30, comp:250 }, players:'7K',
    tags:['stealth','sandbox','assassination'],
    cat:['genre-bis'],
    desc:'The entire Hitman trilogy in one package. Sandbox assassination at its absolute peak.',
    achievements:[
      { name:'The Classics', desc:'Complete a level using the classic rules: no kills except target, no disguise changes, no discoveries, no pacifications', how:'Play any mission on Master difficulty with the following self-imposed rules enforced by the Classic modifier: starting location, no non-target kills, suit only, no KOs.', diff:5, type:'challenge', tip:'Dartmoor (Apex Predator suit-only) is considered easiest for Classic runs. Use the Sieker 1 for non-lethal distraction. Bangkok\'s Jordan Cross requires very specific routing.' },
      { name:'Silent Assassin', desc:'Earn Silent Assassin on any mission', how:'Complete a mission: kill only targets, no bodies found, never spotted, no disguises compromised. Accessible via mission score screen rating.', diff:4, type:'challenge', tip:'Always fiber wire strangling is the safest kill method (no blood pool). Dispose of bodies in containers. Study guard patrol patterns before acting.' },
    ]
  },
  {
    id:'satisfactory', title:'Satisfactory', steam:526870,
    genre:'Builder', dev:'Coffee Stain Studios', year:2024, score:90, tier:'S',
    yt:'tLFjA1SWMKc',
    hltb:{ main:80, comp:500 }, players:'20K',
    tags:['factory','builder','first-person'],
    cat:['genre-bis'],
    desc:'First-person factory building. You will lose entire weeks. The best factory automation game on PC.',
    achievements:[
      { name:'Space Elevator Tier 5', desc:'Launch phase 5 of the Space Elevator', how:'Build and automate production chains for all Tier 5 Space Elevator components. Requires: Supercomputers, Assembly Director Systems, Magnetic Field Generators, Nuclear Pasta, Biochemical Sculptors.', diff:5, type:'challenge', tip:'Phase 5 components require Nuclear power. Set up a nuclear plant early — uranium processing is the most complex chain in the game. Use manifolds for power-level throughput.' },
      { name:'FICSIT Cup', desc:'Build a golf course and complete a full round', how:'The Golf Cup easter egg requires finding the golf balls hidden in the world, building a course using foundations and ramps, then scoring under par on a self-made 9-hole layout.', diff:3, type:'secret', tip:'One of the best easter eggs in any factory game. Foundations of varying heights create natural fairways and greens. The ball physics are better than dedicated golf games.' },
    ]
  },
  {
    id:'celeste', title:'Celeste', steam:504230,
    genre:'Platformer', dev:'Maddy Makes Games', year:2018, score:94, tier:'S',
    yt:'70d9irlxiB4',
    hltb:{ main:8, comp:35 }, players:'3K',
    tags:['platformer','indie','precision','mental-health'],
    cat:['genre-bis'],
    desc:'The hardest platformer you will actually finish. Mental health as narrative framing for a precision platformer.',
    achievements:[
      { name:'Farewell', desc:'Complete the Chapter 9 DLC — one of the hardest levels in gaming', how:'Find and reach the hidden Farewell chapter. Complete 7 brutal sub-chapters across a level that is longer and harder than the entire main game.', diff:5, type:'challenge', tip:'Chapter 9 has no checkpoints within sub-chapters. Expected death count: 1000-5000. Recommend completing all B-Sides and C-Sides first. The Feather mechanics in late Farewell require muscle memory.' },
      { name:'Full Clear', desc:'Collect all Strawberries and Crystal Hearts', how:'175 Strawberries (includes golden strawberries), 8 Crystal Hearts (requires B-Side tapes from hidden cassettes). Golden Strawberries require completing a chapter without dying.', diff:5, type:'collectible', tip:'Golden Strawberries are the hardest individual challenges in the game. A Chapter 1 Golden requires a perfect run of the first chapter with zero deaths — takes most players weeks of attempts.' },
    ]
  },
  {
    id:'re4-remake', title:'Resident Evil 4 Remake', steam:2050650,
    genre:'Action Horror', dev:'Capcom', year:2023, score:93, tier:'S',
    yt:'1LWphxLvMDE',
    hltb:{ main:15, comp:60 }, players:'12K',
    tags:['horror','action','third-person'],
    cat:['horror','genre-bis'],
    desc:'Capcom remade a perfect game and somehow made it better. The pinnacle of action-horror design.',
    achievements:[
      { name:'The Mercenaries', desc:'Earn an S rank in every Mercenaries stage', how:'Complete all 5 Mercenaries maps on every character with S rank. Combo kills with TMP knife parries and maximized combo chains. Clock tower map is most challenging.', diff:5, type:'challenge', tip:'Hunk in Clock Tower is the hardest combination. Use Illuminados for easy kills. Knife parrying every Ganado attack maintains combo. Practice the route repeatedly until memorized.' },
      { name:'A Heart of Steel', desc:'Complete the game on Professional without using a continue', how:'Professional difficulty, single life. All enemies have more HP and deal triple damage. Most deaths are instant. Use the Primal Knife (unbreakable) and don\'t bother repairing others.', diff:5, type:'challenge', tip:'Leon\'s starting pistol headshots are your core economy. Flash grenades disable everything. The village and castle sections are harder than the island on Pro. Krauser knife fight requires perfect parry timing.' },
    ]
  },
  {
    id:'forza-h5', title:'Forza Horizon 5', steam:1551360,
    genre:'Racing', dev:'Playground Games', year:2021, score:92, tier:'S',
    yt:'FYH9n37B7Yw',
    hltb:{ main:25, comp:200 }, players:'20K',
    tags:['racing','open-world','arcade'],
    cat:['racing','genre-bis'],
    desc:'Best open-world arcade racer ever made. Gorgeous Mexico setting with dynamic seasons.',
    achievements:[
      { name:'The Goliath', desc:'Win the Goliath circuit race', how:'Complete the 10+ mile Goliath circuit that loops across the entire Mexico map. Takes 20-40 minutes per race. Highest XP event in the game.', diff:2, type:'challenge', tip:'The Goliath is also used for skill points grinding. Drive a fast S2 class car. The race passes through every biome — weather changes mid-race in festival events.' },
    ]
  },

  // ── ESPORTS ────────────────────────────────────────────
  {
    id:'cs2', title:'Counter-Strike 2', steam:730,
    genre:'Tactical FPS', dev:'Valve', year:2023, score:88, tier:'S',
    yt:'cD3TofBuiHs',
    hltb:{ main:null, comp:null }, players:'850K',
    tags:['fps','tactical','competitive'],
    cat:['esports','genre-bis','nostalgia'],
    esportStats:{ prize:'$12.1M (2023)', viewers:'539K peak Majors', fact:'16,441 pro players' },
    desc:'16,441 pro players. 8,297 all-time tournaments. The FPS competitive benchmark for two decades.',
    achievements:[
      { name:'Supreme Master First Class', desc:'Reach Supreme rank in Premier', how:'Grind Premier mode, the competitive ranking system. Ranks go: Silver → Gold Nova → Master Guardian → Distinguished Master → Legendary Eagle → Supreme. Win matches consistently at each tier.', diff:4, type:'challenge', tip:'Crosshair placement and spray control are 80% of winning. Learn the AK spray pattern. Cache and Mirage are most important maps to study for Premier.' },
    ]
  },
  {
    id:'league-of-legends', title:'League of Legends', steam:null,
    imgUrl:'https://cdn.cloudflare.steamstatic.com/steam/apps/1276800/header.jpg',
    genre:'MOBA', dev:'Riot Games', year:2009, score:null, tier:'S',
    yt:'BGtROJeMzN0',
    hltb:{ main:null, comp:null }, players:'150K',
    tags:['moba','esports','free-to-play'],
    cat:['esports'],
    esportStats:{ prize:'$50M+ total', viewers:'1.9M peak Q1 2025', fact:'230M hrs watched Q1 2025' },
    desc:'Undisputed king of esports globally. 230M hours watched in Q1 2025 alone. Worlds draws millions.',
    achievements:[]
  },
  {
    id:'dota-2', title:'Dota 2', steam:570,
    genre:'MOBA', dev:'Valve', year:2013, score:null, tier:'S',
    yt:'Fj4rCFN6jOY',
    hltb:{ main:null, comp:null }, players:'500K',
    tags:['moba','esports','free-to-play'],
    cat:['esports'],
    esportStats:{ prize:'$348M all-time', viewers:'Millions at TI', fact:'Highest prize pool esport ever' },
    desc:'$348M in total prize money — the richest esport in history. The International remains the most prestigious tournament.',
    achievements:[]
  },
  {
    id:'valorant', title:'Valorant', steam:null, imgUrl:null,
    genre:'Tactical FPS', dev:'Riot Games', year:2020, score:null, tier:'A',
    yt:'e_E9W2vsRbQ',
    hltb:{ main:null, comp:null }, players:'200K',
    tags:['fps','tactical','esports'],
    cat:['esports'],
    esportStats:{ prize:'$2M+ at Champions', viewers:'1.3M peak 2025', fact:'VCT Champions Bangkok 2025' },
    desc:'VCT Champions Tour. 1.3M+ peak viewers at Bangkok 2025. Tactical FPS with evolving agent meta.',
    achievements:[]
  },
  {
    id:'rocket-league', title:'Rocket League', steam:252950,
    genre:'Sports', dev:'Psyonix', year:2015, score:86, tier:'A',
    yt:'_tbody0c1tZ8',
    hltb:{ main:null, comp:null }, players:'60K',
    tags:['sports','vehicles','esports'],
    cat:['esports'],
    esportStats:{ prize:'$5M+ RLCS', viewers:'Millions World Championship', fact:'RLCS global league' },
    desc:'Soccer with rocket-powered cars. RLCS global leagues. One of the highest skill ceilings in competitive gaming.',
    achievements:[]
  },
  {
    id:'street-fighter-6', title:'Street Fighter 6', steam:1364780,
    genre:'Fighting', dev:'Capcom', year:2023, score:92, tier:'S',
    yt:'4J9gN5kDaqk',
    hltb:{ main:15, comp:200 }, players:'12K',
    tags:['fighting','esports','competitive'],
    cat:['esports','genre-bis'],
    esportStats:{ prize:'EVO prize pool', viewers:'Millions at EVO', fact:'Drive System revolutionized genre' },
    desc:'Drive System changed fighting games forever. Best netcode and roster depth in genre history. EVO world championship.',
    achievements:[
      { name:'Absolute Legend', desc:'Win 100 ranked matches', how:'Queue Ranked matches online. Practice Drive System (6-bar resource), Drive Rush for offense pressure, Drive Parry for defense. Master 2-3 characters deeply rather than all.', diff:3, type:'challenge', tip:'Luke, Ryu, and Kimberly have the strongest fundamentals for ranked. Modern controls are viable to Platinum — Classic controls are needed above Diamond.' },
    ]
  },

  // ── ANIME ───────────────────────────────────────────────
  {
    id:'db-sparking-zero', title:'Dragon Ball: Sparking! Zero', steam:2340430,
    genre:'Anime Fighter', dev:'Bandai Namco', year:2024, score:82, tier:'A',
    yt:'Qu59n_PNDQ4',
    hltb:{ main:15, comp:100 }, players:'15K',
    tags:['anime','fighting','dragon-ball'],
    cat:['anime'],
    desc:'UE5 visuals, 164 characters, revamped beam clashes. Best-looking Dragon Ball game ever.',
    achievements:[]
  },
  {
    id:'db-fighterz', title:'Dragon Ball FighterZ', steam:678950,
    genre:'Anime Fighter', dev:'Arc System Works', year:2018, score:87, tier:'S',
    yt:'4wkEaKAvxh0',
    hltb:{ main:10, comp:300 }, players:'5K',
    tags:['anime','fighting','cel-shaded'],
    cat:['anime','esports'],
    desc:'Arc System Works cracked the code on making a 3D game look hand-drawn. One of the best-looking fighters ever.',
    achievements:[]
  },
  {
    id:'genshin-impact', title:'Genshin Impact', steam:null,
    genre:'Anime RPG', dev:'HoYoverse', year:2020, score:null, tier:'A',
    yt:'r9bIyAlSuRo',
    hltb:{ main:60, comp:2000 }, players:'45K',
    imgUrl:null,
    tags:['anime','open-world','gacha'],
    cat:['anime'],
    desc:'Free. Enormous world. Seven nations, constant new content. Best free-to-play anime RPG on PC.',
    achievements:[]
  },
  {
    id:'metaphor-refantazio', title:'Metaphor: ReFantazio', steam:2679460,
    genre:'JRPG', dev:'Atlus', year:2024, score:94, tier:'S',
    yt:'Ov8CPy2mfJE',
    hltb:{ main:70, comp:120 }, players:'12K',
    tags:['anime','jrpg','dark-fantasy'],
    cat:['anime','genre-bis'],
    desc:'Atlus at peak power. Dark fantasy JRPG with real political depth. Combines Persona social systems with classic turn-based depth.',
    achievements:[]
  },
  {
    id:'tales-of-arise', title:'Tales of Arise', steam:740130,
    genre:'Action JRPG', dev:'Bandai Namco', year:2021, score:87, tier:'A',
    yt:'3a4GGmfj0C4',
    hltb:{ main:45, comp:85 }, players:'3K',
    tags:['anime','action-rpg','jrpg'],
    cat:['anime'],
    desc:'Custom "Atmospheric Shader" makes every scene look hand-painted. The best Tales entry.',
    achievements:[]
  },

  // ── NOSTALGIA ───────────────────────────────────────────
  {
    id:'minecraft', title:'Minecraft', steam:null,
    imgUrl:'https://cdn.cloudflare.steamstatic.com/steam/apps/1672970/header.jpg',
    genre:'Builder', dev:'Mojang', year:2011, score:null, tier:'S',
    yt:'MmB9b5njVbA',
    hltb:{ main:null, comp:null }, players:'300K',
    tags:['sandbox','builder','survival'],
    cat:['nostalgia','mods'],
    desc:'300M+ copies sold. Best-selling game in history. The Forge/Fabric modding ecosystem is infinite.',
    achievements:[]
  },
  {
    id:'tf2', title:'Team Fortress 2', steam:440,
    genre:'FPS', dev:'Valve', year:2007, score:92, tier:'S',
    yt:'36lSzUMBJnc',
    hltb:{ main:null, comp:null }, players:'70K',
    tags:['fps','class-based','free-to-play'],
    cat:['nostalgia'],
    desc:'2007. Still running. The character design, humor, and feel remain exceptional nearly twenty years on.',
    achievements:[]
  },
  {
    id:'gmod', title:"Garry's Mod", steam:4000,
    genre:'Sandbox', dev:'Facepunch Studios', year:2006, score:null, tier:'S',
    yt:'bJKNNFjZ70Y',
    hltb:{ main:null, comp:null }, players:'55K',
    tags:['sandbox','modding','multiplayer'],
    cat:['nostalgia','mods'],
    desc:'2006. 1.76M workshop add-ons. Prop Hunt, DarkRP, TTT — entire game genres born inside GMod.',
    achievements:[]
  },
  {
    id:'terraria', title:'Terraria', steam:105600,
    genre:'Survival', dev:'Re-Logic', year:2011, score:93, tier:'S',
    yt:'oCpTMq4T4Ow',
    hltb:{ main:25, comp:500 }, players:'30K',
    tags:['survival','2d','sandbox'],
    cat:['genre-bis','mods','nostalgia'],
    desc:'2D but deeper than 90% of 3D games. Still receiving free updates. The Calamity mod adds 40 more hours.',
    achievements:[]
  },
  {
    id:'aoe2-de', title:'Age of Empires II: DE', steam:813780,
    genre:'RTS', dev:'Forgotten Empires', year:2019, score:84, tier:'A',
    yt:'RNMTBXHqzIA',
    hltb:{ main:40, comp:500 }, players:'35K',
    tags:['rts','historical','strategy'],
    cat:['nostalgia','esports'],
    desc:'1999 RTS remastered perfectly. Competitive scene never stopped. New civs still dropping in 2025.',
    achievements:[]
  },
  {
    id:'fnv', title:'Fallout: New Vegas', steam:22380,
    genre:'Action RPG', dev:'Obsidian Entertainment', year:2010, score:84, tier:'S',
    yt:'GDJqMonPvkk',
    hltb:{ main:28, comp:130 }, players:'8K',
    tags:['rpg','open-world','post-apocalyptic'],
    cat:['nostalgia','mods'],
    desc:'The best Fallout game. Obsidian\'s writing makes every other entry look thin. Tale of Two Wastelands merges FO3 into it.',
    achievements:[]
  },

  // ── MODS ────────────────────────────────────────────────
  {
    id:'skyrim', title:'The Elder Scrolls V: Skyrim SE', steam:489830,
    genre:'Open World RPG', dev:'Bethesda', year:2011, score:94, tier:'S',
    yt:'JSRtSgEJpEg',
    hltb:{ main:35, comp:250 }, players:'35K',
    tags:['open-world','rpg','modding'],
    cat:['mods','nostalgia'],
    desc:'The undisputed mod king. 70,000+ mods on Nexus Mods. With mods it is a completely different game.',
    achievements:[]
  },
  {
    id:'gta-v', title:'Grand Theft Auto V / FiveM', steam:271590,
    genre:'Open World', dev:'Rockstar Games', year:2015, score:97, tier:'S',
    yt:'QkkoHAzjnUs',
    hltb:{ main:31, comp:100 }, players:'95K',
    tags:['open-world','action','modding'],
    cat:['mods'],
    desc:'FiveM roleplay servers turned GTA V into a persistent online RPG. The most extensive single-game mod ecosystem.',
    achievements:[]
  },
  {
    id:'bannerlord', title:'Mount & Blade II: Bannerlord', steam:261550,
    genre:'Action RPG', dev:'TaleWorlds', year:2022, score:78, tier:'B',
    yt:'YqgMoQ9wr-o',
    hltb:{ main:40, comp:500 }, players:'18K',
    tags:['action-rpg','strategy','medieval','modding'],
    cat:['mods'],
    desc:'Warhammer, Westeros, historical settings — any universe imaginable. The mod community IS the real game.',
    achievements:[]
  },
  {
    id:'rimworld', title:'RimWorld', steam:294100,
    genre:'Strategy', dev:'Ludeon Studios', year:2018, score:85, tier:'A',
    yt:'XM5aD2YbzKk',
    hltb:{ main:null, comp:null }, players:'28K',
    tags:['strategy','colony-sim','modding'],
    cat:['genre-bis','mods'],
    desc:'Colony sim that generates emergent stories no writer could plan. AI Storyteller is genius.',
    achievements:[]
  },

  // ── HIDDEN GEMS ─────────────────────────────────────────
  {
    id:'disco-elysium-gem', title:'Disco Elysium: The Final Cut', steam:632470,
    genre:'Narrative RPG', dev:'ZA/UM', year:2019, score:97, tier:'S',
    yt:'4uTr0jyZzao',
    hltb:{ main:24, comp:50 }, players:'3K',
    tags:['narrative','detective','unique'],
    cat:['gems'],
    desc:'Still criminally underplayed. The most original game design in a decade. If you have not played this, stop what you are doing.'
  },
  {
    id:'outer-wilds', title:'Outer Wilds', steam:753640,
    genre:'Exploration', dev:'Mobius Digital', year:2019, score:85, tier:'S',
    yt:'d6egmEHgN8s',
    hltb:{ main:15, comp:25 }, players:'2K',
    tags:['exploration','mystery','space','unique'],
    cat:['gems'],
    desc:'The best mystery in gaming. Do NOT look up a guide. The entire experience is about discovery. 22-minute time loop, hand-crafted solar system, zero filler.',
    achievements:[
      { name:'Just You Wait', desc:'Wait for 22 minutes of real time in one spot', how:'Find a safe location, sit down, and let the sun supernova. The game rewards patience with a unique cutscene.', diff:1, type:'secret', tip:'The sun supernova ends every loop. If you just... watch it happen... something special occurs. Worth doing exactly once.' },
    ]
  },
  {
    id:'return-of-obra-dinn', title:'Return of Obra Dinn', steam:653530,
    genre:'Puzzle', dev:'Lucas Pope', year:2018, score:87, tier:'S',
    yt:'ILolesm8kFY',
    hltb:{ main:9, comp:14 }, players:'1K',
    tags:['puzzle','mystery','unique','monochrome'],
    cat:['gems'],
    desc:'One person made this. An insurance investigator determines the fate of 60 shipwreck victims using a death-rewinding pocket watch. Nothing else like it.',
    achievements:[]
  },
  {
    id:'noita', title:'Noita', steam:881100,
    genre:'Roguelike', dev:'Nolla Games', year:2020, score:88, tier:'S',
    yt:'0cDkmQ0F0Jw',
    hltb:{ main:30, comp:2000 }, players:'8K',
    tags:['roguelike','physics','sandbox','magic'],
    cat:['gems'],
    desc:'Every pixel is simulated. Wand crafting creates builds that break physics. The deepest roguelike on PC. Community has found secrets after 10,000 hours that most players never see.',
    achievements:[
      { name:'Alchemy', desc:'Transform any material using the Great Orb', how:'Find the recipe for the Great Work (random each seed): mix specific materials in specific ratios discovered by exploration. Creates Lively Concoction and Alchemic Precursor.', diff:4, type:'secret', tip:'The Great Work recipe is unique to your seed. Noita has the deepest secret chain in any roguelike — the "True\" ending requires community-discovered knowledge.' },
    ]
  },
  {
    id:'control', title:'Control', steam:870780,
    genre:'Action', dev:'Remedy Entertainment', year:2019, score:82, tier:'A',
    yt:'4V2sYp2N4vI',
    hltb:{ main:12, comp:25 }, players:'4K',
    tags:['action','supernatural','immersive-sim'],
    cat:['gems'],
    desc:'Brutalist architecture, paranormal government facility, telekinetic combat. Remedy\'s most creative game before Alan Wake 2. Massively underplayed.',
    achievements:[]
  },
  {
    id:'dusk', title:'DUSK', steam:519860,
    genre:'FPS', dev:'David Szymanski', year:2018, score:90, tier:'S',
    yt:'52gD4nEmpME',
    hltb:{ main:5, comp:12 }, players:'1K',
    tags:['fps','retro','brutal','indie'],
    cat:['gems'],
    desc:'Best retro FPS since Quake. Three episodes of increasingly deranged Lovecraftian horror. Under $20. One developer. Nothing else on PC hits this hard or fast.',
    achievements:[]
  },
];

// ============================================================
// TOP 10, HERO, UPCOMING, BORDERLANDS, FILTERS — unchanged
// ============================================================

const TOP10 = [
  'elden-ring','baldurs-gate-3','rdr2','cyberpunk-2077','persona-5-royal',
  'clair-obscur','hades-2','disco-elysium','monster-hunter-wilds','deep-rock-galactic'
];

const HERO_IDS = ['elden-ring','cyberpunk-2077','rdr2','persona-5-royal','clair-obscur'];

const UPCOMING = [
  { title:'Grand Theft Auto VI', date:'Nov 19, 2026', status:'confirmed', genre:'Open World Action', dev:'Rockstar Games', note:"Console confirmed. Dual protagonists Jason + Lucia in Vice City / Leonida (Florida). PC expected late 2027 based on Rockstar history. The biggest entertainment launch in history.", platform:'PS5 / Xbox Series — PC expected 2027' },
  { title:'Phantom Blade Zero', date:'Sep 9, 2026', status:'confirmed', genre:'Action RPG / Wuxia', dev:'S-GAME', note:"Dark historical-fantasy wuxia with a 'Kungfupunk' aesthetic. Black Myth Wukong fans — this is your next obsession. Stunning combat choreography.", platform:'PC / PS5' },
  { title:'007: First Light', date:'May 27, 2026', status:'confirmed', genre:'Action / Stealth', dev:'IO Interactive', note:"IO Interactive (Hitman trilogy) builds a James Bond origin story. Nobody is more qualified to nail Bond in game form.", platform:'PC / PS5 / Xbox Series' },
  { title:'Crimson Desert', date:'Mar 19, 2026', status:'confirmed', genre:'Open World Action RPG', dev:'Pearl Abyss', note:"Described as 'moonshine mix of Breath of the Wild and Dragon's Dogma 2.' Already released — strong early impressions.", platform:'PC / PS5 / Xbox Series' },
  { title:'Slay the Spire 2', date:'Mar 6, 2026 (EA)', status:'confirmed', genre:'Roguelike Deckbuilder', dev:'Mega Crit', note:"4-player co-op on day one of Early Access. Most anticipated deckbuilder sequel in genre history.", platform:'PC' },
  { title:'Pragmata', date:'Apr 2026', status:'confirmed', genre:'Hack-and-Slash', dev:'Capcom', note:"Capcom's new IP. Spacefarer Hugh + android Diana escape a lunar station seized by hostile AI.", platform:'PC / PS5 / Xbox Series' },
  { title:'Diablo IV: Lord of Hatred', date:'Apr 2026', status:'confirmed', genre:'ARPG Expansion', dev:'Blizzard', note:"Next major Diablo IV expansion. Season 8 momentum is strong — this could push D4 back to the top of the ARPG genre.", platform:'PC / Console' },
  { title:'Forza Horizon 6', date:'2026', status:'confirmed', genre:'Open World Racing', dev:'Playground Games', note:"Japan confirmed. Tokyo as a landmark location. Biggest Forza Horizon map ever. Game Pass day one.", platform:'PC / Xbox Series / Game Pass' },
  { title:'Monster Hunter Stories 3', date:'Mar 13, 2026', status:'confirmed', genre:'JRPG', dev:'Capcom', note:"Turn-based Monster Hunter spinoff. Post-Wilds hype. Dark narrative twist in Twisted Reflection subtitle.", platform:'PC / PS5 / Switch 2' },
  { title:'Fatal Frame II: Crimson Butterfly Remake', date:'2026', status:'confirmed', genre:'Survival Horror', dev:'Koei Tecmo', note:"Remake of one of the all-time greatest horror games. Original Crimson Butterfly is considered the scariest game many have ever played.", platform:'PC / Console' },
  { title:'Ninja Gaiden 4: The Two Masters', date:'2026', status:'confirmed', genre:'Action', dev:'Team Ninja', note:"Team Ninja returns to the franchise. Dual protagonist structure. Koei Tecmo action pedigree on full display.", platform:'PC / Console' },
  { title:'Fable (Reboot)', date:'Fall 2026', status:'likely', genre:'Open World RPG', dev:'Playground Games', note:"Playground Games reimagines the beloved franchise. Pre-alpha footage looked promising. Xbox's major Fall 2026 exclusive.", platform:'PC / Xbox Series / Game Pass' },
  { title:'Squadron 42', date:'2026', status:'likely', genre:'Space Sim', dev:'Cloud Imperium', note:"Star Citizen's singleplayer campaign. 70+ missions, star-studded cast, $1B+ in funding. The footage looks genuinely spectacular.", platform:'PC' },
  { title:'The Blood of Dawnwalker', date:'2026', status:'likely', genre:'Dark Fantasy RPG', dev:'Rebel Wolves', note:"Former Witcher 3 developers. Dark fantasy with vampire mythology. Team pedigree makes this the dark horse of 2026.", platform:'PC / PS5 / Xbox Series' },
  { title:'Subnautica 2', date:'2026 (EA)', status:'likely', genre:'Survival / Exploration', dev:'Unknown Worlds', note:"Underwater survival sequel. Leadership changes delayed from 2025. Early Access launch planned.", platform:'PC' },
  { title:'Gears E-Day', date:'2026 TBC', status:'likely', genre:'Third-Person Shooter', dev:'The Coalition', note:"'100x more detail than Gears 5.' Ray-traced everything. Prequel depicting E-Day itself with current-gen budget.", platform:'PC / Xbox Series / Game Pass' },
  { title:'Dune: Awakening', date:'2026', status:'likely', genre:'Survival MMO', dev:'Funcom', note:"Open world survival MMO on Arrakis. Harvest spice, navigate faction politics. Beta impressions strong.", platform:'PC / PS5 / Xbox Series' },
  { title:'Metal Gear Solid Delta: Snake Eater', date:'TBA 2026', status:'tba', genre:'Stealth Action', dev:'Konami', note:"Full UE5 remake of the beloved MGS3. Konami's most ambitious project in years. No confirmed date but it looks incredible.", platform:'PC / PS5 / Xbox Series' },
  { title:'The Witcher 4', date:'TBA (~2027+)', status:'tba', genre:'Open World RPG', dev:'CD Projekt Red', note:"New protagonist Ciri. Built on Unreal Engine 5. 'Very different from all previous CDPR games.' Likely 2027 at earliest.", platform:'PC / PS5 / Xbox Series' },
  { title:'The Elder Scrolls VI', date:'TBA (~2028–2030)', status:'tba', genre:'Open World RPG', dev:'Bethesda', note:"Announced at E3 2018 with a 30-second teaser. Realistically 2028–2030 at earliest. The most awaited RPG in gaming history.", platform:'PC / Xbox Series' },
];

const BORDERLANDS = [
  { title:'Borderlands', year:'2009', type:'main', score:80, steam:729040, note:'The original. Invented the cel-shaded looter-shooter genre. Four Vault Hunters hunt for the alien Vault on Pandora. Rough edges but the formula was unmistakably original.', badges:['80 Metacritic','Genre Founder','GOTY Edition 2019'] },
  { title:'Borderlands 2', year:'2012', type:'main', score:89, steam:49520, best:true, note:'The crown jewel. Handsome Jack is one of the greatest video game villains ever written. Vault Hunters: Maya, Axton, Salvador, Zer0. Five DLC campaigns including Tiny Tina\'s Assault on Dragon Keep. 26M copies sold.', badges:['89 Metacritic','Best in franchise','26M copies sold'] },
  { title:'Borderlands: The Pre-Sequel', year:'2014', type:'spinoff', score:73, steam:261640, note:'Set between BL1 and BL2. Handsome Jack\'s origin story. Low-gravity on Pandora\'s moon Elpis. Essential for fans of Jack.', badges:['73 Metacritic','Prequel story','2K Australia'] },
  { title:'Tales from the Borderlands', year:'2014–2015', type:'spinoff', score:86, steam:348900, note:'Episodic Telltale adventure. Dual protagonists Rhys and Fiona. The best-written Borderlands story. If you only play one spinoff, make it this.', badges:['86 Metacritic','Best narrative','Telltale Games'] },
  { title:'Borderlands 3', year:'2019', type:'main', score:84, steam:397540, note:'Best gunplay and movement in the series — crouch-slide, mantling. Vault Hunters: Amara, Moze, Zane, FL4K. Story weakened by Calypso Twins. Massive loot variety. Best pure gameplay in franchise.', badges:['84 Metacritic','Best gameplay','Planet hopping'] },
  { title:"Tiny Tina's Wonderlands", year:'2022', type:'spinoff', score:76, steam:1286680, note:'High-fantasy spinoff where Tiny Tina runs a tabletop RPG campaign. Magic + guns. Cast: Andy Samberg, Wanda Sykes, Will Arnett. Melee builds are a fresh addition.', badges:['76 Metacritic','Andy Samberg','Fantasy setting'] },
  { title:'New Tales from the Borderlands', year:'2022', type:'spinoff', score:57, steam:1454970, note:'In-house Gearbox follow-up to the beloved Telltale Tales. New protagonists Anu, Octavio, Fran. Critically disappointing. Optional — completionists only.', badges:['57 Metacritic','Weakest entry','Optional only'] },
  { title:'Borderlands 4', year:'Sep 12, 2025', type:'main', score:78, steam:1285190, note:'New planet Kairos — high-tech but lo-fi aesthetic with seamless open world and zero loading screens. 2.5M players in 10 days, 1.3M Steam copies. Refined loot praised; weaker narrative criticized. DLC Bounty Packs rolling out.', badges:['78 Metacritic','2.5M players 10 days','Seamless open world','Switch 2 delayed'] },
];

const FILTERS = [
  { id:'all',        icon:'fa-border-all',         label:'All Games'      },
  { id:'genre-bis',  icon:'fa-trophy',             label:'Best in Genre'  },
  { id:'top10',      icon:'fa-crown',              label:'Top 10'         },
  { id:'fps',        icon:'fa-crosshairs',         label:'FPS & Shooters' },
  { id:'horror',     icon:'fa-ghost',              label:'Horror'         },
  { id:'strategy',   icon:'fa-chess',              label:'Strategy'       },
  { id:'roguelike',  icon:'fa-dice-d20',           label:'Roguelike'      },
  { id:'simulation', icon:'fa-city',               label:'Simulation'     },
  { id:'survival',   icon:'fa-campground',         label:'Survival'       },
  { id:'soulslike',  icon:'fa-skull',              label:'Soulslike'      },
  { id:'platformer', icon:'fa-person-running',     label:'Platformer'     },
  { id:'fighting',   icon:'fa-hand-fist',          label:'Fighting'       },
  { id:'esports',    icon:'fa-fire',               label:'Esports'        },
  { id:'competitive',icon:'fa-ranking-star',       label:'Competitive'    },
  { id:'anime',      icon:'fa-star',               label:'Anime / JRPG'  },
  { id:'nostalgia',  icon:'fa-clock-rotate-left',  label:'Classics'       },
  { id:'mods',       icon:'fa-wrench',             label:'Mod Legends'    },
  { id:'gems',       icon:'fa-gem',                label:'Hidden Gems'    },
  { id:'racing',     icon:'fa-flag-checkered',     label:'Racing'         },
  { id:'graphics',   icon:'fa-tv',                 label:'Eye Candy'      },
];

// PC BUILD RECOMMENDATIONS
const PC_BUILDS = [
  { tier:'Entry', icon:'fa-computer', color:'#4ade80', ram:'16GB', cpu:'Ryzen 5 5600 / i5-12400', gpu:'RX 6600 / RTX 3060', price:'$550–750', games:['Stardew Valley','Terraria','Disco Elysium','Celeste','Balatro','Portal 2','Deep Rock Galactic','CS2','Hades 2'], can:'1080p Medium–High at 60fps on all indie/AA titles. CS2 at 200fps. DRG at max.' },
  { tier:'Mid', icon:'fa-tower-cell', color:'#f5c842', ram:'32GB', cpu:'Ryzen 7 7800X3D / i7-13700K', gpu:'RX 7900 GRE / RTX 4070', price:'$1,100–1,600', games:['Elden Ring','Baldur\'s Gate 3','RDR2','Monster Hunter Wilds','Cyberpunk 2077','Street Fighter 6','Forza Horizon 5'], can:'1440p Ultra at 60-90fps. Cyberpunk 2077 at 1440p Ultra RT. BG3 at max. Most AAA games at 100fps+.' },
  { tier:'High', icon:'fa-server', color:'#00ff88', ram:'64GB', cpu:'Ryzen 9 9950X / i9-14900K', gpu:'RTX 5080 / RX 9900 XTX', price:'$2,800–4,000', games:['Cyberpunk 2077 PT','Alan Wake 2','Kingdom Come 2','Clair Obscur','Monster Hunter Wilds'], can:'4K Ultra with full Ray Tracing. Cyberpunk 2077 Path Tracing at 60fps native. Everything maxed at 4K 144fps.' },
  // ── FPS & SHOOTERS ──────────────────────────────────────────────────────────
  {
    id:'doom-eternal', title:'DOOM Eternal', steam:782330,
    genre:'First-Person Shooter', dev:'id Software', year:2020, score:88, tier:'S',
    yt:'_zDZBHFHMk4',
    hltb:{main:13,comp:35},
    players:'15K',
    tags:['FPS','Action','Demons','Fast-Paced','Gore'],
    cat:['fps','genre-bis'],
    desc:"The DOOM Slayer returns in the most intense, mechanically demanding FPS ever made. Constant ammo management, glory kill health loops, and enemy weak points create a chess match at 100mph. Master the resource economy or die. Pure adrenaline with a shockingly good soundtrack.",
    achievements:[
      {name:"The Only Thing They Fear Is You",desc:"Kill 100 demons in the Slayer's Club challenge mode",how:"Join Slayer's Club via the main menu, grind the weekly challenges",tip:"Focus the Marauder first in any encounter — he hard-counters everything else",diff:3,type:"challenge"},
      {name:"Rip and Tear",desc:"Achieve Slayer's Gate 100% completion without death",how:"S-rank all Slayer Gates. Practice each gate separately before attempting clean runs",tip:"Learn the spawn order — demons always enter in the same sequence",diff:4,type:"challenge"},
    ]
  },
  {
    id:'titanfall-2', title:'Titanfall 2', steam:1237970,
    genre:'First-Person Shooter', dev:'Respawn Entertainment', year:2016, score:89, tier:'S',
    yt:'3qaf-KkUEXU',
    hltb:{main:6,comp:15},
    players:'3K',
    tags:['FPS','Mechs','Fast-Paced','Sci-fi','Parkour'],
    cat:['fps','gems'],
    desc:"The best FPS campaign ever made, controversially. Wall-running, grappling, time manipulation across brilliant level design. The Effect and Cause time-travel mission alone justifies the whole game. Multiplayer blended titans and pilots in ways nobody has matched since.",
    achievements:[
      {name:"The Pilot's Gauntlet",desc:"Complete the gauntlet in under 33.5 seconds",how:"Cut corners by wall-running through the final jump. Watch speedrun routes on YouTube first",tip:"Start the kill time record with BT immediately — the bonus knocks 7 seconds off",diff:3,type:"challenge"},
    ]
  },
  {
    id:'apex-legends', title:'Apex Legends', steam:1172470,
    genre:'Battle Royale FPS', dev:'Respawn Entertainment', year:2019, score:88, tier:'A',
    yt:'3NuCFo8LKPA',
    players:'200K',
    tags:['Battle Royale','FPS','Free to Play','Hero Shooter','Team-Based'],
    cat:['fps','esports','competitive'],
    desc:"The best battle royale mechanics bar none — movement, gunplay, ping system, and character abilities all executed to near perfection. Respawn's DNA is everywhere. The Legends system adds genuine team composition depth. Regular seasons keep the meta fresh.",
    esportStats:{prize:'$2M+',viewers:'470K',fact:'Top FPS BR'}
  },
  {
    id:'r6-siege', title:"Tom Clancy's Rainbow Six Siege", steam:359550,
    genre:'Tactical Shooter', dev:'Ubisoft Montreal', year:2015, score:79, tier:'A',
    yt:'sHx5pKY0-gU',
    players:'60K',
    tags:['Tactical','FPS','Competitive','PvP','Team-Based'],
    cat:['fps','esports','competitive'],
    desc:"The definitive tactical FPS. Destructible environments, operator abilities, and 5v5 asymmetric warfare that rewards communication over twitch reflexes. Steep learning curve — every wall can be breached, every floor and ceiling is fair game. Enormous operator roster after a decade of content.",
    esportStats:{prize:'$7.5M+',viewers:'400K',fact:'12M monthly players'}
  },
  {
    id:'l4d2', title:'Left 4 Dead 2', steam:550,
    genre:'Co-op Shooter', dev:'Valve', year:2009, score:89, tier:'S',
    yt:'PpY_Nbs1TIg',
    hltb:{main:8,comp:35},
    players:'25K',
    tags:['Co-op','FPS','Zombies','Survival','Horror'],
    cat:['fps','nostalgia','mods'],
    desc:"Still the gold standard of co-op FPS after 15+ years. The Director AI dynamically adjusts enemy spawns based on player health and performance, making every run feel organic. Four survivors, special infected, and campaigns that demand actual teamwork. The modding scene on Steam Workshop is absurd.",
    achievements:[
      {name:"Midnight Rider",desc:"Survive the Dark Carnival campaign on Expert",how:"Stick tight as a group, use the autocar for kiting, and save your adrenaline shots for the finale",tip:"Never split up on Expert. Use bile jars on Tanks to buy time",diff:4,type:"challenge"},
    ]
  },
  // ── HORROR ──────────────────────────────────────────────────────────────────
  {
    id:'re-village', title:'Resident Evil Village', steam:1196590,
    genre:'Survival Horror', dev:'Capcom', year:2021, score:84, tier:'A',
    yt:'tr9gCYzQ5hM',
    hltb:{main:9,comp:22},
    players:'8K',
    tags:['Horror','Survival Horror','First-Person','Action','Gothic'],
    cat:['horror','genre-bis'],
    desc:"A love letter to RE4 with a lavish gothic village setting. Lady Dimitrescu became a cultural phenomenon for good reason. Transitions from castle horror to factory action to fishing village mystery seamlessly. Rose's story hits harder than expected. Best viewed on a dark screen.",
    achievements:[
      {name:"Knives Out",desc:"Kill 30 enemies with your knife",how:"Save knife durability for downed Lycans. Craft knives from the Duke frequently in early game",tip:"The starting knife is permanent — buy the Assault Rifle ASAP and use knives only for finishers",diff:2,type:"combat"},
      {name:"Veteran Gunsmith",desc:"Upgrade a weapon to its maximum level",how:"Focus the LEMI or W870 shotgun — both have low max upgrade costs",tip:"Sell all treasure immediately to maximize Lei for the Duke's weapon upgrades",diff:2,type:"challenge"},
    ]
  },
  {
    id:'alien-isolation', title:'Alien: Isolation', steam:214490,
    genre:'Survival Horror', dev:'Creative Assembly', year:2014, score:79, tier:'S',
    yt:'nJnEuTKjMXI',
    hltb:{main:15,comp:28},
    players:'2K',
    tags:['Horror','Survival Horror','Sci-fi','Stealth','Atmospheric'],
    cat:['horror','gems'],
    desc:"The definitive Alien game. The Xenomorph AI is genuine terror — it learns your hiding spots, investigates sounds, and cannot be killed. Every corridor on Sevastopol is designed to force confrontation. The motion tracker becomes your heartbeat. Underrated and genuinely scary even a decade later.",
    achievements:[
      {name:"Mercy or Prudence",desc:"Complete the game on Nightmare difficulty",how:"Memorize Xenomorph patrol patterns floor by floor — they're consistent once learned",tip:"Flares are your best friend. Always throw them away from your actual destination",diff:5,type:"challenge"},
    ]
  },
  {
    id:'dead-space', title:'Dead Space', steam:1693980,
    genre:'Survival Horror', dev:'Motive Studio', year:2023, score:89, tier:'S',
    yt:'H8bGbGheJY8',
    hltb:{main:11,comp:22},
    players:'3K',
    tags:['Horror','Survival Horror','Sci-fi','Third Person','Gore'],
    cat:['horror','genre-bis'],
    desc:"The 2023 remake of the genre classic, rebuilt from the ground up. Isaac now speaks, the Ishimura is one connected environment with no loading screens, and strategic dismemberment is as satisfying as ever. The Intensity Director creates a paranoid, claustrophobic horror experience that the original only hinted at.",
    achievements:[
      {name:"Untouchable",desc:"Complete the game without taking damage on New Game+",how:"NG+ with max weapons and suit. Kinesis every crate before walking in, stasis everything on contact",tip:"The Force Gun is your panic button — max it out first in NG+",diff:5,type:"challenge"},
    ]
  },
  {
    id:'soma', title:'SOMA', steam:282140,
    genre:'Psychological Horror', dev:'Frictional Games', year:2015, score:85, tier:'S',
    yt:'dMv7WGPF1Q0',
    hltb:{main:8,comp:12},
    tags:['Psychological Horror','Sci-fi','Story Rich','Atmospheric','Walking Simulator'],
    cat:['horror','gems'],
    desc:"The most philosophically unsettling horror game ever made. You are not trying to survive — you are trying to understand what you are. Underwater research station PATHOS-II raises questions about consciousness, identity, and what constitutes life that you will not stop thinking about. The horror comes from the answers.",
  },
  {
    id:'phasmophobia', title:'Phasmophobia', steam:739630,
    genre:'Co-op Horror', dev:'Kinetic Games', year:2020, score:80, tier:'A',
    yt:'gSX7sdFIslI',
    hltb:{main:null,comp:null},
    players:'22K',
    tags:['Horror','Co-op','Multiplayer','Investigation','Psychological Horror'],
    cat:['horror'],
    desc:"You are a ghost hunter. A real ghost is in this house. You have EMF readers, spirit boxes, and a sanity meter that goes down when you look at ghosts. Wildly popular because the fear is real — not scripted jumpscares, but the terror of hearing breathing when you think you're alone.",
  },
  // ── STRATEGY ────────────────────────────────────────────────────────────────
  {
    id:'civ6', title:"Sid Meier's Civilization VI", steam:289070,
    genre:'Turn-Based Strategy', dev:'Firaxis Games', year:2016, score:88, tier:'S',
    yt:'5KdE0p2joJw',
    hltb:{main:50,comp:200},
    players:'20K',
    tags:['Strategy','Turn-Based','4X','Historical','Multiplayer'],
    cat:['strategy','genre-bis'],
    desc:"One more turn simulator since 1991. The district system fundamentally changed how cities are built — every tile placement matters. Six DLCs worth of civilizations and mechanics layered on a rock-solid foundation. The best 4X on PC for new and veteran players.",
    achievements:[
      {name:"Warlord",desc:"Win a regular game on Warlord difficulty",how:"Choose a militaristic civ (Rome, Macedon) and snowball early — rush neighboring civs before they tech up",tip:"Build a ring of Encampments around your capital cluster. Nothing harder than defending a Civ you didn't plan for",diff:2,type:"challenge"},
    ]
  },
  {
    id:'total-war-wh3', title:'Total War: WARHAMMER III', steam:1142710,
    genre:'Real-Time Strategy', dev:'Creative Assembly', year:2022, score:82, tier:'A',
    yt:'xFIqQqnfFGk',
    hltb:{main:60,comp:250},
    players:'25K',
    tags:['Strategy','RTS','Fantasy','Turn-Based','Warhammer 40K'],
    cat:['strategy','genre-bis'],
    desc:"The culmination of a fantasy strategy trilogy. Chaos forces, daemons, cathay dragons, and classic Warhammer factions across a massive campaign map. The Realm of Chaos campaign structure adds a strategic race element. Immortal Empires combines all three games into the largest sandbox in strategy gaming.",
  },
  {
    id:'ck3', title:'Crusader Kings III', steam:1158310,
    genre:'Grand Strategy', dev:'Paradox Development', year:2020, score:91, tier:'S',
    yt:'3E3IxAyMPUM',
    hltb:{main:50,comp:200},
    players:'18K',
    tags:['Grand Strategy','Medieval','RPG','Historical','Simulation'],
    cat:['strategy','genre-bis'],
    desc:"Medieval dynasty management with soap opera intrigue. You play a character with stats, traits, and ambitions — not a nation. Murder your siblings, seduce your rivals' wives, forge claims to distant thrones. Every campaign is a unique story. The RPG elements make it more accessible than Paradox's other titles.",
    achievements:[
      {name:"Crusader",desc:"Successfully complete a Holy War",how:"As a Catholic ruler, gain Pope favor via donations and sending troops to previous crusades, then call one yourself",tip:"Have 100+ Piety before calling a Crusade and assign your best commander to lead",diff:2,type:"challenge"},
    ]
  },
  {
    id:'xcom2', title:'XCOM 2', steam:268500,
    genre:'Turn-Based Tactics', dev:'Firaxis Games', year:2016, score:88, tier:'S',
    yt:'FKEfJXn7dTI',
    hltb:{main:37,comp:120},
    players:'8K',
    tags:['Tactical','Turn-Based','Strategy','Sci-fi','Perma Death'],
    cat:['strategy','genre-bis'],
    desc:"XCOM 2 turns the formula on its head — you are the insurgency, not the government. Time pressure missions, concealment mechanics, and War of the Chosen expansion that adds faction heroes make this the definitive entry. Permadeath on ironman transforms it into an emotional investment.",
    achievements:[
      {name:"Exquisite Timing",desc:"Complete a mission with at least 10 turns remaining on the clock",how:"Pick Ranger or Specialist builds with high mobility. Aim for 2-turn kill sequences per pod",tip:"Flashbang the lead enemy to delay the clock trigger when it's active",diff:3,type:"challenge"},
    ]
  },
  {
    id:'into-the-breach', title:'Into the Breach', steam:590380,
    genre:'Turn-Based Strategy', dev:'Subset Games', year:2018, score:90, tier:'S',
    yt:'UdXjSVhrL4Y',
    hltb:{main:8,comp:40},
    players:'4K',
    tags:['Strategy','Turn-Based','Sci-fi','Roguelike','Minimalist'],
    cat:['strategy','gems','roguelike'],
    desc:"Perfect information turn-based strategy in a 8x8 grid. You can see every enemy action before it happens — the puzzle is figuring out how to prevent civilian deaths while eliminating threats. From the Faster Than Light devs. Every run is different, every squad has unique mechanics. Possibly the tightest design in the genre.",
  },
  // ── ROGUELIKE / ROGUELITE ────────────────────────────────────────────────────
  {
    id:'dead-cells', title:'Dead Cells', steam:588650,
    genre:'Action Roguelite', dev:'Motion Twin', year:2018, score:91, tier:'S',
    yt:'bkC5D-msCRU',
    hltb:{main:20,comp:100},
    players:'8K',
    tags:['Roguelite','Metroidvania','Action','2D','Difficult'],
    cat:['roguelike','genre-bis'],
    desc:"Metroidvania structure meets roguelite replayability. The movement and combat feel better than most AAA titles — fluid, responsive, deeply satisfying. The interconnected world rewarded on replays with new paths unlocking. Boss Cell (difficulty) system provides genuine long-term challenge.",
    achievements:[
      {name:"Speed Demon",desc:"Complete the game in under 10 minutes",how:"Take only movement upgrades and the fastest weapons. Skip every room that doesn't lead forward",tip:"Gloom Sword + Instinct of the Master unlock the fastest kill combos. Practice the Malaise skip",diff:5,type:"challenge"},
    ]
  },
  {
    id:'slay-the-spire', title:'Slay the Spire', steam:646570,
    genre:'Roguelike Deckbuilder', dev:'MegaCrit', year:2019, score:95, tier:'S',
    yt:'3C7V4EZDGNE',
    hltb:{main:20,comp:200},
    players:'30K',
    tags:['Roguelike','Card Game','Deckbuilding','Strategy','Turn-Based'],
    cat:['roguelike','genre-bis','competitive'],
    desc:"The game that invented the roguelike deckbuilder genre and still hasn't been topped. Each of the four characters plays completely differently. Ascension levels extend the endgame infinitely. The synergy system rewards building tight, focused decks over anything. 95 on Metacritic is correct.",
    achievements:[
      {name:"Ascension 20",desc:"Beat the game on Ascension 20 with any character",how:"Remove bad cards aggressively. Focus one synergy per run. The Ironclad's Barricade + Entrench combo can clear A20",tip:"Pick up every relic that fits your deck archetype. Relics often matter more than cards",diff:5,type:"challenge"},
    ]
  },
  {
    id:'risk-of-rain-2', title:'Risk of Rain 2', steam:632360,
    genre:'Action Roguelite', dev:'Hopoo Games', year:2020, score:85, tier:'A',
    yt:'N5FYxgAQBsc',
    hltb:{main:12,comp:120},
    players:'12K',
    tags:['Roguelite','Third Person','Action','Co-op','Loot'],
    cat:['roguelike','genre-bis'],
    desc:"The 2D sequel became a 3D masterpiece. Items stack exponentially — by the end of a run you're a walking disaster that deletes entire screens. Satisfying loop, huge character roster, and great co-op. The transition to 3D was a shock when announced, a triumph when played.",
  },
  {
    id:'vampire-survivors', title:'Vampire Survivors', steam:1794680,
    genre:'Roguelite', dev:'poncle', year:2022, score:93, tier:'S',
    yt:'X39j9OEIC1o',
    hltb:{main:8,comp:60},
    players:'15K',
    tags:['Roguelite','Bullet Hell','Auto Battler','2D','Indie'],
    cat:['roguelike','gems'],
    desc:"£1.99 at launch. Became one of the most played games on Steam. You move. Weapons fire automatically. You survive escalating enemy hordes. The simplicity is a lie — weapon evolution trees, unlock chains, and secret stages build enormous depth under the pixel art surface. The anti-game that became a genre.",
  },
  // ── SIMULATION ──────────────────────────────────────────────────────────────
  {
    id:'cities-skylines', title:'Cities: Skylines', steam:255710,
    genre:'City Builder', dev:'Colossal Order', year:2015, score:85, tier:'A',
    yt:'liobBXzZXSY',
    hltb:{main:50,comp:200},
    players:'30K',
    tags:['City Builder','Simulation','Building','Management','Moddable'],
    cat:['simulation','genre-bis'],
    desc:"SimCity killed, Cities: Skylines rose from the ashes. District-based zoning, traffic simulation that actually makes sense, and Steam Workshop mods that transform it into a professional urban planning tool. The base game is excellent — the modded experience is unmatched in the genre.",
  },
  {
    id:'ksp', title:'Kerbal Space Program', steam:220200,
    genre:'Space Simulation', dev:'Squad', year:2015, score:88, tier:'S',
    yt:'HBbyWgtPOkU',
    hltb:{main:60,comp:300},
    players:'5K',
    tags:['Simulation','Space','Physics','Building','Sandbox'],
    cat:['simulation','gems'],
    desc:"You build rockets and try to reach orbit. The physics simulation is accurate enough to teach real orbital mechanics. The Kerbal Space Center is staffed by tiny green men who die horribly when your math is wrong. One of the most educational games ever made by accident. Mods extend it essentially forever.",
  },
  {
    id:'planet-zoo', title:'Planet Zoo', steam:703080,
    genre:'Management Simulation', dev:'Frontier Developments', year:2019, score:80, tier:'A',
    yt:'9dXBCzFtZLo',
    hltb:{main:25,comp:150},
    players:'7K',
    tags:['Simulation','Management','Animals','Building','Sandbox'],
    cat:['simulation'],
    desc:"The Planet Coaster engine applied to zoos. Each animal species has genetic traits, welfare needs, and behavioral simulation that's shockingly detailed. Habitat design, visitor pathing, conservation programs — a full theme park builder wrapped around genuine animal care systems. Beautiful and deeply satisfying.",
  },
  {
    id:'papers-please', title:'Papers, Please', steam:239030,
    genre:'Puzzle Simulation', dev:'Lucas Pope', year:2013, score:85, tier:'S',
    yt:'_QP5X6fcukM',
    hltb:{main:5,comp:12},
    tags:['Simulation','Indie','Puzzle','Story Rich','Historical'],
    cat:['gems','simulation'],
    desc:"You are a border inspector in a Soviet-era fictional country. Documents must be checked, rules must be followed, and your family is starving unless you process enough people per day. The moral weight of stamping DENIED on a refugee builds unbearable pressure. Brilliant systems design masquerading as tedium.",
  },
  // ── SURVIVAL ─────────────────────────────────────────────────────────────────
  {
    id:'subnautica', title:'Subnautica', steam:264710,
    genre:'Survival Adventure', dev:'Unknown Worlds', year:2018, score:87, tier:'S',
    yt:'KlG2pS3BKDQ',
    hltb:{main:29,comp:45},
    players:'12K',
    tags:['Survival','Exploration','Open World','Crafting','Sci-fi'],
    cat:['survival','gems'],
    desc:"Survive on an alien ocean world with no land. Dive deeper to find the answers — and the things living in the dark. The horror elements are optional but impossible to escape. You will build a base on the ocean floor. You will descend to the deepest trench. You will hear something enormous below you.",
    achievements:[
      {name:"There's Something Out There",desc:"Detect a Reaper Leviathan with the Scanner Room",how:"Build Scanner Room above 500m depth near the Crash Zone. Place 4 cameras to expand range",tip:"Never go to the Crash Zone without at least 3 Seamoth depth upgrades",diff:2,type:"story"},
    ]
  },
  {
    id:'the-forest', title:'The Forest', steam:242760,
    genre:'Survival Horror', dev:'Endnight Games', year:2018, score:79, tier:'A',
    yt:'R5J1KmhDXNo',
    hltb:{main:15,comp:35},
    players:'10K',
    tags:['Survival','Horror','Open World','Crafting','Building'],
    cat:['survival','horror'],
    desc:"Your plane crashed. Your son was taken. You are on a cannibal island. The Forest blends survival mechanics with psychological horror — the mutants adapt to your playstyle, become more aggressive if you kill too many, retreat if you're passive. Base building is robust enough to hold off the entire tribe.",
  },
  {
    id:'dont-starve-together', title:"Don't Starve Together", steam:322330,
    genre:'Survival', dev:'Klei Entertainment', year:2016, score:86, tier:'A',
    yt:'RFILqBgblzM',
    hltb:{main:30,comp:200},
    players:'18K',
    tags:['Survival','Co-op','Crafting','Dark Fantasy','Roguelike'],
    cat:['survival','nostalgia'],
    desc:"The multiplayer expansion of the beloved solo game. Survive the wilderness as Wilson and friends — manage hunger, sanity, and health while the world conspires to kill you in increasingly creative ways. Tim Burton aesthetic, Klei-quality animation, deep progression system. The community has kept it alive for a decade.",
  },
  {
    id:'rust', title:'Rust', steam:252490,
    genre:'Open World Survival', dev:'Facepunch Studios', year:2018, score:79, tier:'A',
    yt:'LGcagionlsw',
    hltb:{main:null,comp:null},
    players:'65K',
    tags:['Survival','Open World','Crafting','PvP','Multiplayer'],
    cat:['survival','competitive'],
    desc:"The most brutal survival game ever made. You wake up naked on a beach. Within 10 minutes someone has killed you and taken your rock. Rust is a 24-hour social experiment — alliances form and collapse, raid cultures emerge, and the moment you go offline your base is someone else's loot.",
  },
  // ── SOULSLIKE ────────────────────────────────────────────────────────────────
  {
    id:'sekiro', title:'Sekiro: Shadows Die Twice', steam:814380,
    genre:'Action Soulslike', dev:'FromSoftware', year:2019, score:91, tier:'S',
    yt:'rXMX4YJ7Lks',
    hltb:{main:28,comp:68},
    players:'12K',
    tags:['Soulslike','Action','Stealth','Japanese','Difficult'],
    cat:['soulslike','genre-bis'],
    desc:"FromSoftware's purest combat design — no builds, no leveling to outscale enemies, only perfect execution. The posture/deflect system demands mastery of rhythmic parrying. Genichiro Ashina is the infamous wall that either breaks you or molds you. Beating him feels like a religious experience.",
    achievements:[
      {name:"Height of Technique",desc:"Acquire all Shinobi Esoteric Arts",how:"Max both Shinobi and Prosthetic trees. The Sculptor gives tools as you progress — return to him after major boss kills",tip:"Dodge-counter certain bosses until you understand their rhythm, then switch to deflect-only runs",diff:4,type:"challenge"},
    ]
  },
  {
    id:'lies-of-p', title:'Lies of P', steam:1627720,
    genre:'Action Soulslike', dev:'NEOWIZ / Round8', year:2023, score:80, tier:'A',
    yt:'vOeFSMWgJmQ',
    hltb:{main:30,comp:55},
    players:'5K',
    tags:['Soulslike','Action RPG','Dark Fantasy','Difficult','Story Rich'],
    cat:['soulslike','genre-bis'],
    desc:"Pinocchio in a dark Belle Époque city. Lies of P succeeded where dozens of FromSoft-imitators failed — the parry system is rewarding, the weapon combination system is genuinely deep, and the lies mechanic creates real narrative weight. The best soulslike not made by FromSoftware.",
  },
  {
    id:'black-myth-wukong', title:'Black Myth: Wukong', steam:2358720,
    genre:'Action RPG', dev:'Game Science', year:2024, score:82, tier:'A',
    yt:'SLlpLpE6DGw',
    hltb:{main:28,comp:50},
    players:'35K',
    tags:['Action RPG','Soulslike','Mythology','Difficult','Cinematic'],
    cat:['soulslike','genre-bis','graphics'],
    desc:"Chinese mythology rendered in Unreal Engine 5 at a level nothing has matched visually. The Sun Wukong action gameplay blends transformation abilities with staff combat across six chapters of dense boss encounters. Whatever the narrative context, the technical achievement is staggering.",
  },
  // ── PLATFORMER & METROIDVANIA ─────────────────────────────────────────────────
  {
    id:'ori-wisps', title:'Ori and the Will of the Wisps', steam:1057090,
    genre:'Metroidvania', dev:'Moon Studios', year:2020, score:93, tier:'S',
    yt:'3NSuKlFGxpE',
    hltb:{main:11,comp:20},
    tags:['Metroidvania','Platformer','Story Rich','Beautiful','Atmospheric'],
    cat:['platformer','gems'],
    desc:"The most visually stunning platformer ever made. Ori moves like water, the combat feels surprisingly meaty for a game this beautiful, and the emotional story arc hits harder than most 40-hour RPGs. Blind Forest established the formula — Will of the Wisps perfected every single element.",
  },
  {
    id:'blasphemous', title:'Blasphemous', steam:774361,
    genre:'Soulslike Platformer', dev:'The Game Kitchen', year:2019, score:80, tier:'A',
    yt:'pYYqn_OjZpc',
    hltb:{main:18,comp:38},
    tags:['Metroidvania','Soulslike','Dark Fantasy','2D','Difficult'],
    cat:['platformer','soulslike'],
    desc:"Spanish Catholic guilt as a video game. Brutal soulslike difficulty married to Metroidvania exploration in a grotesque religious aesthetic. The lore is delivered through item descriptions, NPC dialogue, and environmental storytelling at a level that rivals FromSoft. The penitence system adds difficulty modifiers.",
  },
  {
    id:'super-meat-boy', title:'Super Meat Boy', steam:40800,
    genre:'Precision Platformer', dev:'Team Meat', year:2010, score:90, tier:'S',
    yt:'AY7N0_QA5OA',
    hltb:{main:7,comp:35},
    tags:['Platformer','Difficult','2D','Indie','Precision Platformer'],
    cat:['platformer','nostalgia'],
    desc:"The game that defines precision platforming. No checkpoints, hundreds of levels, controls so tight that every death is your fault. The dark world versions of every level are the true challenge. Edmund McMillen and Tommy Refenes built this in Flash and it still holds up as the benchmark for the genre.",
  },
  // ── FIGHTING ────────────────────────────────────────────────────────────────
  {
    id:'tekken-8', title:'TEKKEN 8', steam:1778820,
    genre:'3D Fighter', dev:'Bandai Namco', year:2024, score:90, tier:'S',
    yt:'0PbWvBaSJaE',
    hltb:{main:6,comp:100},
    players:'20K',
    tags:['Fighting','3D Fighter','Competitive','Arcade','Story Rich'],
    cat:['fighting','esports','competitive'],
    desc:"The best Tekken ever made. Heat System adds offensive momentum without removing defensive options. The Story Mode is actually worth playing — 40 years of Mishima family drama delivered in cinematic cutscenes. Balanced roster, great netcode, phenomenal tutorial system. The benchmark for 3D fighters in 2024.",
    esportStats:{prize:'$1.5M',viewers:'250K',fact:'Best Tekken ever'},
    achievements:[
      {name:"King of Iron Fist",desc:"Win 100 online matches",how:"Learn one character's core punishers and combo starters. Focus footsies not flashy stuff early",tip:"Jin's df+2 is the safest launcher in the game — master it before anything else",diff:3,type:"challenge"},
    ]
  },
  // ── RACING ───────────────────────────────────────────────────────────────────
  {
    id:'assetto-corsa', title:'Assetto Corsa', steam:244210,
    genre:'Racing Simulation', dev:'Kunos Simulazioni', year:2014, score:88, tier:'S',
    yt:'Ku5LJVXDVIs',
    hltb:{main:null,comp:null},
    players:'18K',
    tags:['Racing','Simulation','Controller','Realistic','Automobile Sim'],
    cat:['racing','mods'],
    desc:"The physics benchmark for sim racing. The tyre model and force feedback implementation are still referenced as best-in-class over a decade later. The base game is a solid foundation — the real game is the mod community, which has recreated every track and car in motorsport history.",
  },
  // ── OPEN WORLD / ACTION ──────────────────────────────────────────────────────
  {
    id:'dying-light-2', title:'Dying Light 2 Stay Human', steam:534380,
    genre:'Open World Action', dev:'Techland', year:2022, score:74, tier:'B',
    yt:'H9AJXLyy4Io',
    hltb:{main:22,comp:80},
    players:'15K',
    tags:['Open World','Parkour','Zombies','Action','Survival'],
    cat:['genre-bis'],
    desc:"Night vs Day design — Techland's signature structure returns with a massive city to parkour through. Daytime is exploration and quests; night transforms the city into a gauntlet as infected become aggressive and virals hunt you. The parkour feels better than the original. The story is weaker.",
  },
  {
    id:'starfield', title:'Starfield', steam:1716740,
    genre:'Space RPG', dev:'Bethesda', year:2023, score:83, tier:'B',
    yt:'kXHh9CPnfZk',
    hltb:{main:17,comp:150},
    players:'25K',
    tags:['RPG','Space','Exploration','Sci-fi','Open World'],
    cat:['genre-bis'],
    desc:"Bethesda's space RPG — a mile wide and not always as deep as hoped, but the ship building and exploration loop is compelling. Over 1000 hand-crafted locations, solid gunplay, and a main story that's better than Fallout 4's. The character skill system rewards long-term investment.",
  },

];

// ============================================================
// PRICES — key store pricing & direct links for all games
// Updated March 31, 2026. Prices fluctuate — always verify.
// Store tiers: OFFICIAL > TRUSTED_RESELLER > MARKETPLACE
// ============================================================
const STORE_TIERS = {
  steam:     { name:'Steam',           trust:'official',   icon:'fa-brands fa-steam',         color:'#1b9de2', refund:'2hr/14day refund policy', riskNote:null },
  epic:      { name:'Epic Games',      trust:'official',   icon:'fa-gamepad',                  color:'#2d78cf', refund:'Self-service refunds',     riskNote:null },
  gog:       { name:'GOG',             trust:'official',   icon:'fa-globe',                    color:'#8b1a1a', refund:'30-day refund guarantee',  riskNote:null },
  riot:      { name:'Riot Games',      trust:'official',   icon:'fa-gamepad',                  color:'#d4292a', refund:'N/A — free to play',       riskNote:null },
  battle:    { name:'Battle.net',      trust:'official',   icon:'fa-gamepad',                  color:'#1591c7', refund:'Limited refunds',          riskNote:null },
  cdkeys:    { name:'CDKeys',          trust:'reseller',   icon:'fa-key',                      color:'#e84040', refund:'No refund after key reveal',riskNote:'Authorized reseller. Trustpilot 4.7/5 (80K+ reviews). Keys sourced from publishers. Very reliable.' },
  fanatical: { name:'Fanatical',       trust:'reseller',   icon:'fa-bolt',                     color:'#ff6b35', refund:'No refund after activation', riskNote:'Official publisher partner. Frequent sales and bundles. Fully legitimate.' },
  humble:    { name:'Humble Bundle',   trust:'reseller',   icon:'fa-heart',                    color:'#cc2929', refund:'No refund after key reveal', riskNote:'Official store. Portion of sales goes to charity. Bundles offer massive value.' },
  gmg:       { name:'Green Man Gaming',trust:'reseller',   icon:'fa-leaf',                     color:'#5cb85c', refund:'No refund after activation', riskNote:'Official authorized reseller. Regular discount codes. Fully legitimate.' },
  kinguin:   { name:'Kinguin',         trust:'marketplace',icon:'fa-store',                    color:'#f0b429', refund:'Dispute process available',  riskNote:'⚠️ Marketplace — keys sold by third-party sellers. Most are fine but key quality varies. Check seller rating before buying.' },
  g2a:       { name:'G2A',             trust:'marketplace',icon:'fa-store',                    color:'#f57c00', refund:'G2A Shield needed for protection', riskNote:'⚠️ Marketplace — highest risk. Keys may originate from fraudulent purchases. Developers strongly oppose G2A. Use only as last resort.' },
};

const PRICES = {
  // ── TOP 10 ──────────────────────────────────────────────────────────────────
  'elden-ring': {
    steam:'$59.99', steamUrl:'https://store.steampowered.com/app/1245620/',
    cdkeys:'~$33', cdkeysUrl:'https://www.cdkeys.com/elden-ring-pc',
    fanaticalUrl:'https://www.fanatical.com/en/game/elden-ring',
    humbUrl:'https://www.humblebundle.com/store/elden-ring',
    gg:'https://gg.deals/game/elden-ring/',
  },
  'baldurs-gate-3': {
    steam:'$59.99', steamUrl:'https://store.steampowered.com/app/1086940/',
    cdkeys:'~$47', cdkeysUrl:'https://www.cdkeys.com/baldurs-gate-3-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/baldurs-gate-3',
    gg:'https://gg.deals/game/baldurs-gate-3/',
    gog:'$59.99', gogUrl:'https://www.gog.com/game/baldurs_gate_3',
  },
  'rdr2': {
    steam:'$59.99', steamUrl:'https://store.steampowered.com/app/1174180/',
    cdkeys:'~$12', cdkeysUrl:'https://www.cdkeys.com/red-dead-redemption-2-pc',
    fanaticalUrl:'https://www.fanatical.com/en/game/red-dead-redemption-2',
    gg:'https://gg.deals/game/red-dead-redemption-2/',
    note:'Often under $15 — one of best value games ever',
  },
  'cyberpunk-2077': {
    steam:'$39.99', steamUrl:'https://store.steampowered.com/app/1091500/',
    cdkeys:'~$19', cdkeysUrl:'https://www.cdkeys.com/cyberpunk-2077-pc',
    fanaticalUrl:'https://www.fanatical.com/en/game/cyberpunk-2077',
    humbUrl:'https://www.humblebundle.com/store/cyberpunk-2077',
    gg:'https://gg.deals/game/cyberpunk-2077/',
    gog:'$39.99', gogUrl:'https://www.gog.com/game/cyberpunk_2077',
    note:'Frequently on deep discount. Watch for sub-$10 sales.',
  },
  'persona-5-royal': {
    steam:'$59.99', steamUrl:'https://store.steampowered.com/app/1687950/',
    cdkeys:'~$28', cdkeysUrl:'https://www.cdkeys.com/persona-5-royal-pc-steam',
    gg:'https://gg.deals/game/persona-5-royal/',
  },
  'clair-obscur': {
    steam:'$49.99', steamUrl:'https://store.steampowered.com/app/1903340/',
    cdkeys:'~$23', cdkeysUrl:'https://www.cdkeys.com/clair-obscur-expedition-33-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/clair-obscur-expedition-33',
    gg:'https://gg.deals/game/clair-obscur-expedition-33/',
    note:'Newer title — prices dropping fast. Current best ~$23.',
  },
  'hades-2': {
    steam:'$24.99', steamUrl:'https://store.steampowered.com/app/1145350/',
    cdkeys:'~$18', cdkeysUrl:'https://www.cdkeys.com/hades-2-pc-steam',
    gg:'https://gg.deals/game/hades-2/',
    note:'Still in Early Access — full release may affect price.',
  },
  'disco-elysium': {
    steam:'$39.99', steamUrl:'https://store.steampowered.com/app/632470/',
    cdkeys:'~$11', cdkeysUrl:'https://www.cdkeys.com/disco-elysium-the-final-cut-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/disco-elysium-the-final-cut',
    gg:'https://gg.deals/game/disco-elysium-the-final-cut/',
    gog:'$39.99', gogUrl:'https://www.gog.com/game/disco_elysium_the_final_cut',
    note:'Frequently hits historical lows under $5 on sale.',
  },
  'monster-hunter-wilds': {
    steam:'$59.99', steamUrl:'https://store.steampowered.com/app/2246340/',
    cdkeys:'~$45', cdkeysUrl:'https://www.cdkeys.com/monster-hunter-wilds-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/monster-hunter-wilds',
    gg:'https://gg.deals/game/monster-hunter-wilds/',
  },
  'deep-rock-galactic': {
    steam:'$29.99', steamUrl:'https://store.steampowered.com/app/548430/',
    cdkeys:'~$14', cdkeysUrl:'https://www.cdkeys.com/deep-rock-galactic-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/deep-rock-galactic',
    gg:'https://gg.deals/game/deep-rock-galactic/',
  },
  // ── FREE TO PLAY ─────────────────────────────────────────────────────────────
  'cs2': {
    free:true, platform:'Steam', freeUrl:'https://store.steampowered.com/app/730/',
    note:'100% free on Steam. No purchase needed. Skins/cases are cosmetic only.',
  },
  'dota-2': {
    free:true, platform:'Steam', freeUrl:'https://store.steampowered.com/app/570/',
    note:'Completely free on Steam. Battle Pass and cosmetics are optional.',
  },
  'tf2': {
    free:true, platform:'Steam', freeUrl:'https://store.steampowered.com/app/440/',
    note:'Free to play. Upgraded to "Premium" with any item purchase ($1+ in Mann Co. Store).',
  },
  'apex-legends': {
    free:true, platform:'Steam / EA App', freeUrl:'https://store.steampowered.com/app/1172470/',
    note:'Free to play on Steam and EA App. Legends/cosmetics purchasable with Apex Coins.',
  },
  'league-of-legends': {
    free:true, platform:'Riot Games (not on Steam)', freeUrl:'https://www.leagueoflegends.com/en-us/download/',
    note:'Download directly from Riot. Champions earnable free via in-game currency.',
  },
  'valorant': {
    free:true, platform:'Riot Games (not on Steam)', freeUrl:'https://playvalorant.com/en-us/download/',
    note:'Download from Riot directly. No Steam key exists. All agents earnable for free.',
  },
  'genshin-impact': {
    free:true, platform:'HoYoverse (not on Steam)', freeUrl:'https://genshin.hoyoverse.com/en/download',
    note:'Free to download from HoYoverse. Has gacha monetization — no purchase required to enjoy.',
  },
  'rocket-league': {
    free:true, platform:'Epic Games', freeUrl:'https://store.epicgames.com/en-US/p/rocket-league',
    note:'Free on Epic Games Store since 2020. No Steam key available.',
  },
  'gmod': {
    steam:'$9.99', steamUrl:'https://store.steampowered.com/app/4000/',
    cdkeys:'~$4', cdkeysUrl:'https://www.cdkeys.com/garry-s-mod-pc-steam',
    gg:'https://gg.deals/game/garrys-mod/',
    note:'Almost always on sale. One of Steam\'s all-time best sellers.',
  },
  // ── GENRE GAMES ─────────────────────────────────────────────────────────────
  'doom-eternal': {
    steam:'$39.99', steamUrl:'https://store.steampowered.com/app/782330/',
    cdkeys:'~$14', cdkeysUrl:'https://www.cdkeys.com/doom-eternal-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/doom-eternal',
    gg:'https://gg.deals/game/doom-eternal/',
    note:'Often under $10 on sale. The Annual Pass DLC adds significant content.',
  },
  'titanfall-2': {
    steam:'$29.99', steamUrl:'https://store.steampowered.com/app/1237970/',
    cdkeys:'~$8', cdkeysUrl:'https://www.cdkeys.com/titanfall-2-pc-steam',
    gg:'https://gg.deals/game/titanfall-2/',
    note:'One of the best value games in existence. Check for sub-$5 EA sales.',
  },
  'apex-legends': {
    free:true, platform:'Steam / EA App', freeUrl:'https://store.steampowered.com/app/1172470/',
    note:'Free to play on Steam and EA App.',
  },
  'r6-siege': {
    steam:'$19.99', steamUrl:'https://store.steampowered.com/app/359550/',
    cdkeys:'~$8', cdkeysUrl:'https://www.cdkeys.com/tom-clancy-s-rainbow-six-siege-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/tom-clancys-rainbow-six-siege',
    gg:'https://gg.deals/game/tom-clancys-rainbow-six-siege/',
    note:'Base game is cheap. Year passes for operators are separate.',
  },
  'l4d2': {
    steam:'$9.99', steamUrl:'https://store.steampowered.com/app/550/',
    cdkeys:'~$3', cdkeysUrl:'https://www.cdkeys.com/left-4-dead-2-pc-steam',
    gg:'https://gg.deals/game/left-4-dead-2/',
    note:'Hits $1.24 on deep Valve sales. One of the best buys in gaming history.',
  },
  're-village': {
    steam:'$39.99', steamUrl:'https://store.steampowered.com/app/1196590/',
    cdkeys:'~$8', cdkeysUrl:'https://www.cdkeys.com/resident-evil-village-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/resident-evil-village',
    gg:'https://gg.deals/game/resident-evil-village/',
    note:'Incredible value under $10 — among the best Resident Evil deals.',
  },
  'alien-isolation': {
    steam:'$39.99', steamUrl:'https://store.steampowered.com/app/214490/',
    cdkeys:'~$7', cdkeysUrl:'https://www.cdkeys.com/alien-isolation-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/alien-isolation',
    gg:'https://gg.deals/game/alien-isolation/',
    note:'Regularly under $5 in Sega sales. Essential horror at any price.',
  },
  'dead-space': {
    steam:'$39.99', steamUrl:'https://store.steampowered.com/app/1693980/',
    cdkeys:'~$18', cdkeysUrl:'https://www.cdkeys.com/dead-space-pc-steam',
    gg:'https://gg.deals/game/dead-space-2023/',
  },
  'soma': {
    steam:'$29.99', steamUrl:'https://store.steampowered.com/app/282140/',
    cdkeys:'~$7', cdkeysUrl:'https://www.cdkeys.com/soma-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/soma',
    gg:'https://gg.deals/game/soma/',
    note:'Hits sub-$2 on Humble Bundle sales. One of the best underrated games at any price.',
  },
  'phasmophobia': {
    steam:'$13.99', steamUrl:'https://store.steampowered.com/app/739630/',
    cdkeys:'~$7', cdkeysUrl:'https://www.cdkeys.com/phasmophobia-pc-steam',
    gg:'https://gg.deals/game/phasmophobia/',
  },
  'civ6': {
    steam:'$59.99', steamUrl:'https://store.steampowered.com/app/289070/',
    cdkeys:'~$12', cdkeysUrl:'https://www.cdkeys.com/sid-meier-s-civilization-vi-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/sid-meiers-civilization-vi',
    humbUrl:'https://www.humblebundle.com/store/sid-meiers-civilization-vi',
    gg:'https://gg.deals/game/civilization-vi/',
    note:'Often under $4 on deep sale. Get the Anthology Edition for all DLC.',
  },
  'total-war-wh3': {
    steam:'$59.99', steamUrl:'https://store.steampowered.com/app/1142710/',
    cdkeys:'~$22', cdkeysUrl:'https://www.cdkeys.com/total-war-warhammer-iii-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/total-war-warhammer-iii',
    gg:'https://gg.deals/game/total-war-warhammer-iii/',
    note:'Also available on Game Pass. Watch for Humble Bundle strategy sales.',
  },
  'ck3': {
    steam:'$49.99', steamUrl:'https://store.steampowered.com/app/1158310/',
    cdkeys:'~$20', cdkeysUrl:'https://www.cdkeys.com/crusader-kings-iii-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/crusader-kings-iii',
    gg:'https://gg.deals/game/crusader-kings-iii/',
    note:'Game Pass included. Paradox DLC adds up fast — base game is worth it alone.',
  },
  'xcom2': {
    steam:'$59.99', steamUrl:'https://store.steampowered.com/app/268500/',
    cdkeys:'~$8', cdkeysUrl:'https://www.cdkeys.com/xcom-2-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/xcom-2',
    gg:'https://gg.deals/game/xcom-2/',
    note:'Get War of the Chosen DLC — it\'s essentially a different game.',
  },
  'into-the-breach': {
    steam:'$14.99', steamUrl:'https://store.steampowered.com/app/590380/',
    cdkeys:'~$7', cdkeysUrl:'https://www.cdkeys.com/into-the-breach-pc-steam',
    gg:'https://gg.deals/game/into-the-breach/',
    gog:'$14.99', gogUrl:'https://www.gog.com/game/into_the_breach',
    note:'Also free on Epic Games Store historically. Watch for giveaways.',
  },
  'dead-cells': {
    steam:'$24.99', steamUrl:'https://store.steampowered.com/app/588650/',
    cdkeys:'~$10', cdkeysUrl:'https://www.cdkeys.com/dead-cells-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/dead-cells',
    gg:'https://gg.deals/game/dead-cells/',
  },
  'slay-the-spire': {
    steam:'$24.99', steamUrl:'https://store.steampowered.com/app/646570/',
    cdkeys:'~$10', cdkeysUrl:'https://www.cdkeys.com/slay-the-spire-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/slay-the-spire',
    gg:'https://gg.deals/game/slay-the-spire/',
    gog:'$24.99', gogUrl:'https://www.gog.com/game/slay_the_spire',
  },
  'risk-of-rain-2': {
    steam:'$24.99', steamUrl:'https://store.steampowered.com/app/632360/',
    cdkeys:'~$9', cdkeysUrl:'https://www.cdkeys.com/risk-of-rain-2-pc-steam',
    gg:'https://gg.deals/game/risk-of-rain-2/',
  },
  'vampire-survivors': {
    steam:'$4.99', steamUrl:'https://store.steampowered.com/app/1794680/',
    cdkeys:'~$3', cdkeysUrl:'https://www.cdkeys.com/vampire-survivors-pc-steam',
    gg:'https://gg.deals/game/vampire-survivors/',
    note:'One of the cheapest S-tier games ever made. Just buy it on Steam.',
  },
  'cities-skylines': {
    steam:'$29.99', steamUrl:'https://store.steampowered.com/app/255710/',
    cdkeys:'~$8', cdkeysUrl:'https://www.cdkeys.com/cities-skylines-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/cities-skylines',
    humbUrl:'https://www.humblebundle.com/store/cities-skylines',
    gg:'https://gg.deals/game/cities-skylines/',
    note:'Base game often under $4 on sale. DLC packs are expensive — buy on sale.',
  },
  'ksp': {
    steam:'$39.99', steamUrl:'https://store.steampowered.com/app/220200/',
    cdkeys:'~$12', cdkeysUrl:'https://www.cdkeys.com/kerbal-space-program-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/kerbal-space-program',
    gg:'https://gg.deals/game/kerbal-space-program/',
  },
  'planet-zoo': {
    steam:'$44.99', steamUrl:'https://store.steampowered.com/app/703080/',
    cdkeys:'~$18', cdkeysUrl:'https://www.cdkeys.com/planet-zoo-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/planet-zoo',
    gg:'https://gg.deals/game/planet-zoo/',
  },
  'papers-please': {
    steam:'$9.99', steamUrl:'https://store.steampowered.com/app/239030/',
    cdkeys:'~$5', cdkeysUrl:'https://www.cdkeys.com/papers-please-pc-steam',
    gg:'https://gg.deals/game/papers-please/',
    gog:'$9.99', gogUrl:'https://www.gog.com/game/papers_please',
    note:'Tiny game with enormous impact. Under $3 on sale.',
  },
  'subnautica': {
    steam:'$29.99', steamUrl:'https://store.steampowered.com/app/264710/',
    cdkeys:'~$11', cdkeysUrl:'https://www.cdkeys.com/subnautica-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/subnautica',
    humbUrl:'https://www.humblebundle.com/store/subnautica',
    gg:'https://gg.deals/game/subnautica/',
    note:'Was a free Epic Games Store game — watch for repeat giveaways.',
  },
  'the-forest': {
    steam:'$14.99', steamUrl:'https://store.steampowered.com/app/242760/',
    cdkeys:'~$5', cdkeysUrl:'https://www.cdkeys.com/the-forest-pc-steam',
    gg:'https://gg.deals/game/the-forest/',
    note:'Sequel Sons of the Forest also available at similar price.',
  },
  'dont-starve-together': {
    steam:'$14.99', steamUrl:'https://store.steampowered.com/app/322330/',
    cdkeys:'~$5', cdkeysUrl:'https://www.cdkeys.com/don-t-starve-together-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/dont-starve-together',
    gg:'https://gg.deals/game/dont-starve-together/',
    note:'Frequently bundled. One of the best co-op value plays under $5.',
  },
  'rust': {
    steam:'$39.99', steamUrl:'https://store.steampowered.com/app/252490/',
    cdkeys:'~$15', cdkeysUrl:'https://www.cdkeys.com/rust-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/rust',
    gg:'https://gg.deals/game/rust/',
    note:'Hits $20 during Steam Summer/Winter sales. Watch for 50% off periods.',
  },
  'sekiro': {
    steam:'$59.99', steamUrl:'https://store.steampowered.com/app/814380/',
    cdkeys:'~$28', cdkeysUrl:'https://www.cdkeys.com/sekiro-shadows-die-twice-goty-edition-pc-steam',
    gg:'https://gg.deals/game/sekiro-shadows-die-twice/',
    note:'GOTY Edition includes all DLC. Worth every penny.',
  },
  'lies-of-p': {
    steam:'$49.99', steamUrl:'https://store.steampowered.com/app/1627720/',
    cdkeys:'~$22', cdkeysUrl:'https://www.cdkeys.com/lies-of-p-pc-steam',
    gg:'https://gg.deals/game/lies-of-p/',
    note:'Also on Game Pass. Great value if you have the subscription.',
  },
  'black-myth-wukong': {
    steam:'$59.99', steamUrl:'https://store.steampowered.com/app/2358720/',
    cdkeys:'~$38', cdkeysUrl:'https://www.cdkeys.com/black-myth-wukong-pc-steam',
    gg:'https://gg.deals/game/black-myth-wukong/',
    note:'New release — limited discounts so far. Watch GG.deals for first sale.',
  },
  'ori-wisps': {
    steam:'$29.99', steamUrl:'https://store.steampowered.com/app/1057090/',
    cdkeys:'~$10', cdkeysUrl:'https://www.cdkeys.com/ori-and-the-will-of-the-wisps-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/ori-and-the-will-of-the-wisps',
    gg:'https://gg.deals/game/ori-and-the-will-of-the-wisps/',
    note:'Also on Game Pass. Often deeply discounted — under $5 on sale.',
  },
  'blasphemous': {
    steam:'$24.99', steamUrl:'https://store.steampowered.com/app/774361/',
    cdkeys:'~$8', cdkeysUrl:'https://www.cdkeys.com/blasphemous-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/blasphemous',
    gg:'https://gg.deals/game/blasphemous/',
  },
  'super-meat-boy': {
    steam:'$14.99', steamUrl:'https://store.steampowered.com/app/40800/',
    cdkeys:'~$5', cdkeysUrl:'https://www.cdkeys.com/super-meat-boy-pc-steam',
    gg:'https://gg.deals/game/super-meat-boy/',
    note:'Was free on Epic. Frequently on deep sale.',
  },
  'tekken-8': {
    steam:'$59.99', steamUrl:'https://store.steampowered.com/app/1778820/',
    cdkeys:'~$32', cdkeysUrl:'https://www.cdkeys.com/tekken-8-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/tekken-8',
    gg:'https://gg.deals/game/tekken-8/',
  },
  'street-fighter-6': {
    steam:'$59.99', steamUrl:'https://store.steampowered.com/app/1364780/',
    cdkeys:'~$28', cdkeysUrl:'https://www.cdkeys.com/street-fighter-6-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/street-fighter-6',
    gg:'https://gg.deals/game/street-fighter-6/',
  },
  'assetto-corsa': {
    steam:'$19.99', steamUrl:'https://store.steampowered.com/app/244210/',
    cdkeys:'~$6', cdkeysUrl:'https://www.cdkeys.com/assetto-corsa-pc-steam',
    gg:'https://gg.deals/game/assetto-corsa/',
    note:'Hits under $2 on deep sale. The mod community is the real game.',
  },
  'dying-light-2': {
    steam:'$39.99', steamUrl:'https://store.steampowered.com/app/534380/',
    cdkeys:'~$13', cdkeysUrl:'https://www.cdkeys.com/dying-light-2-stay-human-pc-steam',
    gg:'https://gg.deals/game/dying-light-2-stay-human/',
  },
  'starfield': {
    steam:'$69.99', steamUrl:'https://store.steampowered.com/app/1716740/',
    cdkeys:'~$25', cdkeysUrl:'https://www.cdkeys.com/starfield-pc-steam',
    gg:'https://gg.deals/game/starfield/',
    note:'Included in Xbox Game Pass. Best value via subscription.',
  },
  'hades': {
    steam:'$24.99', steamUrl:'https://store.steampowered.com/app/1145360/',
    cdkeys:'~$10', cdkeysUrl:'https://www.cdkeys.com/hades-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/hades',
    gg:'https://gg.deals/game/hades/',
    gog:'$24.99', gogUrl:'https://www.gog.com/game/hades',
  },
  'balatro': {
    steam:'$14.99', steamUrl:'https://store.steampowered.com/app/2379780/',
    cdkeys:'~$10', cdkeysUrl:'https://www.cdkeys.com/balatro-pc-steam',
    gg:'https://gg.deals/game/balatro/',
    note:'Newest game at this price — limited key discounts. Check Fanatical for bundles.',
  },
  'valheim': {
    steam:'$19.99', steamUrl:'https://store.steampowered.com/app/892970/',
    cdkeys:'~$12', cdkeysUrl:'https://www.cdkeys.com/valheim-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/valheim',
    gg:'https://gg.deals/game/valheim/',
  },
  'stardew-valley': {
    steam:'$14.99', steamUrl:'https://store.steampowered.com/app/413150/',
    cdkeys:'~$9', cdkeysUrl:'https://www.cdkeys.com/stardew-valley-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/stardew-valley',
    gg:'https://gg.deals/game/stardew-valley/',
    gog:'$14.99', gogUrl:'https://www.gog.com/game/stardew_valley',
    note:'One of the best games per dollar on the market. Often under $8 on sale.',
  },
  'portal-2': {
    steam:'$9.99', steamUrl:'https://store.steampowered.com/app/620/',
    cdkeys:'~$4', cdkeysUrl:'https://www.cdkeys.com/portal-2-pc-steam',
    gg:'https://gg.deals/game/portal-2/',
    note:'Hits $1.24 in Valve sales. Essential gaming at any price.',
  },
  'hollow-knight': {
    steam:'$14.99', steamUrl:'https://store.steampowered.com/app/367520/',
    cdkeys:'~$7', cdkeysUrl:'https://www.cdkeys.com/hollow-knight-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/hollow-knight',
    gg:'https://gg.deals/game/hollow-knight/',
    note:'Under $4 regularly. One of greatest value gaming purchases possible.',
  },
  'hitman-woa': {
    steam:'$69.99', steamUrl:'https://store.steampowered.com/app/1659040/',
    cdkeys:'~$22', cdkeysUrl:'https://www.cdkeys.com/hitman-world-of-assassination-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/hitman-world-of-assassination',
    gg:'https://gg.deals/game/hitman-world-of-assassination/',
    note:'Includes all 3 games. Hits under $15 on sale — an absolute steal.',
  },
  'satisfactory': {
    steam:'$34.99', steamUrl:'https://store.steampowered.com/app/526870/',
    cdkeys:'~$18', cdkeysUrl:'https://www.cdkeys.com/satisfactory-pc-steam',
    gg:'https://gg.deals/game/satisfactory/',
  },
  'celeste': {
    steam:'$19.99', steamUrl:'https://store.steampowered.com/app/504230/',
    cdkeys:'~$8', cdkeysUrl:'https://www.cdkeys.com/celeste-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/celeste',
    gg:'https://gg.deals/game/celeste/',
    gog:'$19.99', gogUrl:'https://www.gog.com/game/celeste',
    note:'Often under $4. Was a free Epic game. One of the most important games of the decade.',
  },
  're4-remake': {
    steam:'$59.99', steamUrl:'https://store.steampowered.com/app/2050650/',
    cdkeys:'~$13', cdkeysUrl:'https://www.cdkeys.com/resident-evil-4-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/resident-evil-4',
    gg:'https://gg.deals/game/resident-evil-4-remake/',
  },
  'forza-h5': {
    steam:'$59.99', steamUrl:'https://store.steampowered.com/app/1551360/',
    cdkeys:'~$22', cdkeysUrl:'https://www.cdkeys.com/forza-horizon-5-pc-steam',
    gg:'https://gg.deals/game/forza-horizon-5/',
    note:'Also on Xbox Game Pass — best value via subscription.',
  },
  'outer-wilds': {
    steam:'$24.99', steamUrl:'https://store.steampowered.com/app/753640/',
    cdkeys:'~$11', cdkeysUrl:'https://www.cdkeys.com/outer-wilds-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/outer-wilds',
    gg:'https://gg.deals/game/outer-wilds/',
    gog:'$24.99', gogUrl:'https://www.gog.com/game/outer_wilds',
    note:'Play with ZERO spoilers. Absolutely worth full price.',
  },
  'noita': {
    steam:'$19.99', steamUrl:'https://store.steampowered.com/app/881100/',
    cdkeys:'~$12', cdkeysUrl:'https://www.cdkeys.com/noita-pc-steam',
    gg:'https://gg.deals/game/noita/',
    note:'500+ hours possible. One of the deepest games ever created per dollar.',
  },
  'rimworld': {
    steam:'$39.99', steamUrl:'https://store.steampowered.com/app/294100/',
    cdkeys:'~$28', cdkeysUrl:'https://www.cdkeys.com/rimworld-pc-steam',
    gg:'https://gg.deals/game/rimworld/',
    note:'Rarely discounted deeply — publisher controls pricing tightly.',
  },
  'terraria': {
    steam:'$9.99', steamUrl:'https://store.steampowered.com/app/105600/',
    cdkeys:'~$4', cdkeysUrl:'https://www.cdkeys.com/terraria-pc-steam',
    gg:'https://gg.deals/game/terraria/',
    note:'Hits under $2 in sales. 2000+ hours of content for effectively nothing.',
  },
  'gta-v': {
    steam:'$29.99', steamUrl:'https://store.steampowered.com/app/271590/',
    cdkeys:'~$11', cdkeysUrl:'https://www.cdkeys.com/grand-theft-auto-v-pc-steam',
    gg:'https://gg.deals/game/grand-theft-auto-v/',
    note:'Was free on Epic for an extended period. GTA Online is included free.',
  },
  'metaphor-refantazio': {
    steam:'$69.99', steamUrl:'https://store.steampowered.com/app/2679460/',
    cdkeys:'~$32', cdkeysUrl:'https://www.cdkeys.com/metaphor-refantazio-pc-steam',
    gg:'https://gg.deals/game/metaphor-refantazio/',
  },
  'tales-of-arise': {
    steam:'$59.99', steamUrl:'https://store.steampowered.com/app/740130/',
    cdkeys:'~$15', cdkeysUrl:'https://www.cdkeys.com/tales-of-arise-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/tales-of-arise',
    gg:'https://gg.deals/game/tales-of-arise/',
  },
  'db-fighterz': {
    steam:'$59.99', steamUrl:'https://store.steampowered.com/app/678950/',
    cdkeys:'~$10', cdkeysUrl:'https://www.cdkeys.com/dragon-ball-fighterz-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/dragon-ball-fighterz',
    gg:'https://gg.deals/game/dragon-ball-fighterz/',
  },
  'db-sparking-zero': {
    steam:'$59.99', steamUrl:'https://store.steampowered.com/app/1695420/',
    cdkeys:'~$36', cdkeysUrl:'https://www.cdkeys.com/dragon-ball-sparking-zero-pc-steam',
    gg:'https://gg.deals/game/dragon-ball-sparking-zero/',
  },
  'control': {
    steam:'$39.99', steamUrl:'https://store.steampowered.com/app/870780/',
    cdkeys:'~$8', cdkeysUrl:'https://www.cdkeys.com/control-ultimate-edition-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/control-ultimate-edition',
    gg:'https://gg.deals/game/control/',
    note:'Was a free Epic Games Store game. Was on Game Pass. Under $5 on deep sale.',
  },
  'minecraft': {
    steam:null, // Not on Steam
    note:'Minecraft Java+Bedrock Bundle: $29.99 direct from minecraft.net',
    freeUrl:'https://www.minecraft.net/en-us/store/minecraft-java-bedrock-edition-pc',
    freeLabel:'Buy on minecraft.net',
    cdkeys:'~$18', cdkeysUrl:'https://www.cdkeys.com/minecraft-java-edition-bedrock-edition-pc',
    gg:'https://gg.deals/game/minecraft/',
    specialNote:'Not available on Steam. Purchase directly from microsoft.com/minecraft or cdkeys.com.',
  },
  'fnv': {
    steam:'$9.99', steamUrl:'https://store.steampowered.com/app/22380/',
    cdkeys:'~$3', cdkeysUrl:'https://www.cdkeys.com/fallout-new-vegas-ultimate-edition-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/fallout-new-vegas-ultimate-edition',
    gg:'https://gg.deals/game/fallout-new-vegas/',
    note:'Ultimate Edition includes all DLC. Often under $2 in Bethesda sales.',
  },
  'skyrim': {
    steam:'$39.99', steamUrl:'https://store.steampowered.com/app/1716740/',
    cdkeys:'~$12', cdkeysUrl:'https://www.cdkeys.com/the-elder-scrolls-v-skyrim-anniversary-edition-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/the-elder-scrolls-v-skyrim-anniversary-edition',
    gg:'https://gg.deals/game/the-elder-scrolls-v-skyrim-anniversary-edition/',
    note:'Anniversary Edition includes all DLC. The game with 1000+ ports has never been cheaper.',
  },
  'bannerlord': {
    steam:'$49.99', steamUrl:'https://store.steampowered.com/app/261550/',
    cdkeys:'~$18', cdkeysUrl:'https://www.cdkeys.com/mount-blade-ii-bannerlord-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/mount-blade-ii-bannerlord',
    gg:'https://gg.deals/game/mount-blade-ii-bannerlord/',
  },
  'return-of-obra-dinn': {
    steam:'$19.99', steamUrl:'https://store.steampowered.com/app/653530/',
    cdkeys:'~$9', cdkeysUrl:'https://www.cdkeys.com/return-of-the-obra-dinn-pc-steam',
    gg:'https://gg.deals/game/return-of-the-obra-dinn/',
    gog:'$19.99', gogUrl:'https://www.gog.com/game/return_of_the_obra_dinn',
  },
  'aoe2-de': {
    steam:'$19.99', steamUrl:'https://store.steampowered.com/app/813780/',
    cdkeys:'~$7', cdkeysUrl:'https://www.cdkeys.com/age-of-empires-ii-definitive-edition-pc-steam',
    gg:'https://gg.deals/game/age-of-empires-ii-definitive-edition/',
    note:'Also on Xbox Game Pass.',
  },
  'dusk': {
    steam:'$19.99', steamUrl:'https://store.steampowered.com/app/519860/',
    cdkeys:'~$8', cdkeysUrl:'https://www.cdkeys.com/dusk-pc-steam',
    gg:'https://gg.deals/game/dusk/',
  },
  'doom-eternal': {
    steam:'$39.99', steamUrl:'https://store.steampowered.com/app/782330/',
    cdkeys:'~$14', cdkeysUrl:'https://www.cdkeys.com/doom-eternal-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/doom-eternal',
    gg:'https://gg.deals/game/doom-eternal/',
  },
  'titanfall-2': {
    steam:'$29.99', steamUrl:'https://store.steampowered.com/app/1237970/',
    cdkeys:'~$8', cdkeysUrl:'https://www.cdkeys.com/titanfall-2-pc-steam',
    gg:'https://gg.deals/game/titanfall-2/',
  },
  'civ6': {
    steam:'$59.99', steamUrl:'https://store.steampowered.com/app/289070/',
    cdkeys:'~$12', cdkeysUrl:'https://www.cdkeys.com/sid-meier-s-civilization-vi-pc-steam',
    fanaticalUrl:'https://www.fanatical.com/en/game/sid-meiers-civilization-vi',
    gg:'https://gg.deals/game/civilization-vi/',
    note:'Was free on Epic. Hits under $4 on deep sale.',
  },
};

// ============================================================
// MODS — Best mods for every moddable game in the catalog
// Sources: Nexus Mods, Steam Workshop, official mod sites
// Updated March 31, 2026
// ============================================================
const MODS = {
  'skyrim': {
    hub: 'Nexus Mods', hubUrl: 'https://www.nexusmods.com/skyrimspecialedition',
    manager: 'MO2 (Mod Organizer 2)', managerUrl: 'https://www.nexusmods.com/skyrimspecialedition/mods/6194',
    howto: 'Install SKSE64 first → install SkyUI → use Mod Organizer 2 to manage load order → run LOOT to sort.',
    mods: [
      { name:'SKSE64', type:'framework', essential:true, desc:'Script Extender — required by 90% of all mods. Install this before anything else.', url:'https://skse.silverlock.org/', source:'Official Site' },
      { name:'Unofficial Skyrim Special Edition Patch', type:'bugfix', essential:true, desc:'Fixes thousands of bugs Bethesda never patched. Install immediately after SKSE.', url:'https://www.nexusmods.com/skyrimspecialedition/mods/266', source:'Nexus' },
      { name:'SkyUI', type:'ui', essential:true, desc:'Completely rebuilds the awful console UI. Sorts gear by weight/value, adds a mod config menu (MCM). Non-negotiable on PC.', url:'https://www.nexusmods.com/skyrimspecialedition/mods/12604', source:'Nexus' },
      { name:'Community Shaders', type:'graphics', essential:false, desc:'Modern graphics overhaul for 2026 — grass, water, lighting all improved. Better performance than ENB on most rigs.', url:'https://www.nexusmods.com/skyrimspecialedition/mods/86492', source:'Nexus' },
      { name:'Skyrim 202X by Pfuscher', type:'graphics', essential:false, desc:'Massive 4K-8K texture overhaul covering landscapes, architecture, and objects. The definitive texture pack.', url:'https://www.nexusmods.com/skyrimspecialedition/mods/2347', source:'Nexus' },
      { name:'Ordinator — Perks of Skyrim', type:'gameplay', essential:false, desc:'Replaces the entire perk system with 469 new perks. Makes every build feel meaningfully different.', url:'https://www.nexusmods.com/skyrimspecialedition/mods/1137', source:'Nexus' },
      { name:'Alternate Start — Live Another Life', type:'gameplay', essential:false, desc:"Skip the Helgen cart ride. Start as a bandit, vampire, mage, shipwreck survivor — your choice. Replays become fresh again.", url:'https://www.nexusmods.com/skyrimspecialedition/mods/9557', source:'Nexus' },
      { name:'Inigo', type:'companion', essential:false, desc:"Best companion mod ever made. Fully voiced Khajiit follower with 7,000+ lines of custom dialogue, his own questline, and a personality that reacts to everything you do.", url:'https://www.nexusmods.com/skyrimspecialedition/mods/1461', source:'Nexus' },
      { name:'Legacy of the Dragonborn', type:'content', essential:false, desc:'Adds a fully-featured museum to Solitude where you display and collect every weapon, artifact, and relic in the game. 200+ hour content mod.', url:'https://www.nexusmods.com/skyrimspecialedition/mods/11802', source:'Nexus' },
      { name:'Apocalypse — Magic of Skyrim', type:'gameplay', essential:false, desc:'Adds 155 new lore-friendly spells across all skill trees. Makes mage builds viable and wildly creative.', url:'https://www.nexusmods.com/skyrimspecialedition/mods/1090', source:'Nexus' },
      { name:'JK\'s Skyrim', type:'world', essential:false, desc:'Overhauls every major city — Whiterun, Solitude, Riften, Markarth — with new details, NPCs, and interiors. Dramatically improves immersion.', url:'https://www.nexusmods.com/skyrimspecialedition/mods/6289', source:'Nexus' },
      { name:'LOOT (Load Order Tool)', type:'tool', essential:true, desc:'Automatically sorts your mod load order. Run this after every install. Prevents 80% of mod conflicts.', url:'https://loot.github.io/', source:'Official Site' },
    ]
  },
  'stardew-valley': {
    hub: 'Nexus Mods', hubUrl: 'https://www.nexusmods.com/stardewvalley',
    manager: 'SMAPI', managerUrl: 'https://smapi.io/',
    howto: 'Install SMAPI from smapi.io first. Download mods as .zip files from Nexus → extract into your Stardew Valley/Mods folder → launch via SMAPI.exe.',
    mods: [
      { name:'SMAPI', type:'framework', essential:true, desc:'The mod loader — required for essentially every SDV mod. Install this before anything. Launch the game through SMAPI.exe from now on.', url:'https://smapi.io/', source:'smapi.io' },
      { name:'Content Patcher', type:'framework', essential:true, desc:'Enables texture and content mods to load without modifying game files. Required by SVE, Ridgeside, and hundreds of other mods.', url:'https://www.nexusmods.com/stardewvalley/mods/1915', source:'Nexus' },
      { name:'Stardew Valley Expanded (SVE)', type:'content', essential:false, desc:'The definitive SDV expansion. Adds 28 new characters, 50+ new locations, 200+ events, new crops, fish, and festivals. Feels like official DLC. Play vanilla first — then install this.', url:'https://www.nexusmods.com/stardewvalley/mods/3753', source:'Nexus' },
      { name:'Ridgeside Village', type:'content', essential:false, desc:'A separate mountain village accessible by cable car — 50+ new NPCs with their own schedules, quests, shops, and storylines. Fully compatible with SVE.', url:'https://www.nexusmods.com/stardewvalley/mods/7286', source:'Nexus' },
      { name:'UI Info Suite 2', type:'ui', essential:true, desc:'Shows crop days remaining, animal friendship, bundles needed, tool upgrade times, and dozens of other critical stats directly on your HUD. Should be built into the game.', url:'https://www.nexusmods.com/stardewvalley/mods/47400', source:'Nexus' },
      { name:'Automate', type:'qol', essential:false, desc:'Place a chest next to any machine and it automatically grabs input/output. Turns your farm into an automated factory. Essential for late-game efficiency.', url:'https://www.nexusmods.com/stardewvalley/mods/1063', source:'Nexus' },
      { name:'CJB Cheats Menu', type:'qol', essential:false, desc:'In-game cheat menu — time freeze, inventory editor, money, teleport. Great for casual playthroughs or testing builds.', url:'https://www.nexusmods.com/stardewvalley/mods/4', source:'Nexus' },
      { name:'NPC Map Locations', type:'ui', essential:true, desc:'Shows all NPC locations on the minimap with their names. Completely eliminates the "where is Willy" problem.', url:'https://www.nexusmods.com/stardewvalley/mods/239', source:'Nexus' },
      { name:'Lookup Anything', type:'ui', essential:true, desc:"Press F1 on any item, crop, character, or machine to see every data point — friendship levels, gift preferences, growth stages. Beats the wiki.", url:'https://www.nexusmods.com/stardewvalley/mods/541', source:'Nexus' },
    ]
  },
  'minecraft': {
    hub: 'Modrinth / CurseForge', hubUrl: 'https://modrinth.com/',
    manager: 'Prism Launcher', managerUrl: 'https://prismlauncher.org/',
    howto: 'Install Prism Launcher as your Minecraft launcher. It handles Fabric/Forge installation automatically and makes mod management easy. Download mods from Modrinth or CurseForge.',
    mods: [
      { name:'Fabric (Mod Loader)', type:'framework', essential:true, desc:'Lightweight mod loader — required for modern performance mods. Use with Sodium, Iris, and most QoL mods.', url:'https://fabricmc.net/', source:'fabricmc.net' },
      { name:'Sodium', type:'performance', essential:true, desc:'Replaces Minecraft\'s rendering engine. Typically gives 2-5x FPS improvement. Essential if you run mods — there is no reason not to use it.', url:'https://modrinth.com/mod/sodium', source:'Modrinth' },
      { name:'Iris Shaders', type:'graphics', essential:false, desc:'Shader support for Fabric/Sodium. Works with BSL, Complementary, MakeUp-UltraFast, and hundreds of shader packs.', url:'https://modrinth.com/mod/iris', source:'Modrinth' },
      { name:'Create Mod', type:'content', essential:false, desc:'Adds rotational mechanical engineering — gears, belts, trains, factories, contraptions. The most popular standalone content mod. Has its own sub-ecosystem of add-ons.', url:'https://www.curseforge.com/minecraft/mc-mods/create', source:'CurseForge' },
      { name:'JEI (Just Enough Items)', type:'ui', essential:true, desc:'View crafting recipes for every item by hovering over it. Look up what uses any ingredient. Essential for playing with any content mods.', url:'https://www.curseforge.com/minecraft/mc-mods/jei', source:'CurseForge' },
      { name:"Alex's Mobs", type:'content', essential:false, desc:'Adds 80+ new animals and creatures with detailed behaviors — raccoons, cockroaches, anacondas, sharks, and creatures from folklore and mythology.', url:'https://www.curseforge.com/minecraft/mc-mods/alexs-mobs', source:'CurseForge' },
      { name:'Biomes O\' Plenty', type:'world', essential:false, desc:'Adds 80+ new biomes with unique terrain, trees, plants, and colors. Completely transforms world generation.', url:'https://www.curseforge.com/minecraft/mc-mods/biomes-o-plenty', source:'CurseForge' },
      { name:'Waystones', type:'qol', essential:false, desc:'Craftable fast-travel waypoints that remove the terrible grind of walking everywhere. Configurable so they can be free or have a cost.', url:'https://www.curseforge.com/minecraft/mc-mods/waystones', source:'CurseForge' },
      { name:'RLCraft (Modpack)', type:'modpack', essential:false, desc:'Hardcore survival overhaul modpack — temperature, thirst, disease, realistic damage. The hardest mainstream Minecraft experience. Do not underestimate it.', url:'https://www.curseforge.com/minecraft/modpacks/rlcraft', source:'CurseForge' },
      { name:'Complementary Shaders', type:'graphics', essential:false, desc:'The most popular and best-balanced shader pack. Looks stunning and runs well on mid-range hardware. Use with Iris.', url:'https://modrinth.com/shader/complementary-shaders-reimagined', source:'Modrinth' },
    ]
  },
  'terraria': {
    hub: 'Steam Workshop (tModLoader)', hubUrl: 'https://store.steampowered.com/app/1281930/',
    manager: 'tModLoader', managerUrl: 'https://store.steampowered.com/app/1281930/',
    howto: 'Install tModLoader from Steam (free separate app). Open it, go to Workshop/Mods and install directly — no manual file management needed.',
    mods: [
      { name:'tModLoader', type:'framework', essential:true, desc:'The official mod loader — available free on Steam as a separate app. Required for all major Terraria mods.', url:'https://store.steampowered.com/app/1281930/', source:'Steam' },
      { name:'Calamity Mod', type:'content', essential:false, desc:'The biggest Terraria mod — 24+ new bosses, 5 new biomes, 2 new classes, and a massive postgame that goes beyond vanilla Moon Lord. 1000+ hours of content.', url:'https://store.steampowered.com/workshop/filedetails/?id=2824688072', source:'Steam Workshop' },
      { name:'Thorium Mod', type:'content', essential:false, desc:'Adds 2,000+ new items, 11 new bosses, 3 new classes (Healer, Bard, Thrower), and dozens of new biomes. Best content mod for first-time modders.', url:'https://store.steampowered.com/workshop/filedetails/?id=1281744400', source:'Steam Workshop' },
      { name:'Terraria Overhaul', type:'gameplay', essential:false, desc:'Complete mechanics overhaul — new movement, roll dodge, seasonal system, gore, fire propagation. Makes the base game feel fresh again.', url:'https://store.steampowered.com/workshop/filedetails/?id=1251816685', source:'Steam Workshop' },
      { name:"Fargo's Mutant Mod", type:'qol', essential:true, desc:'Adds NPCs that sell summoning items for every boss. Saves enormous time hunting down boss spawning materials. Essential QoL for any playthrough.', url:'https://store.steampowered.com/workshop/filedetails/?id=2609435987', source:'Steam Workshop' },
      { name:'Boss Checklist', type:'ui', essential:true, desc:'Adds an in-game progression checklist showing all bosses in recommended order with their drops. Essential for new players and returning veterans.', url:'https://store.steampowered.com/workshop/filedetails/?id=635621726', source:'Steam Workshop' },
      { name:'Recipe Browser', type:'ui', essential:true, desc:'Full crafting recipe browser — search any item to see how to make it or what it crafts into. Should be in vanilla.', url:'https://store.steampowered.com/workshop/filedetails/?id=833505870', source:'Steam Workshop' },
      { name:'Calamity Mod Music', type:'audio', essential:false, desc:'Adds 200+ original tracks to replace vanilla music in Calamity areas. The OST is genuinely one of the best in gaming.', url:'https://store.steampowered.com/workshop/filedetails/?id=2824692847', source:'Steam Workshop' },
    ]
  },
  'gta-v': {
    hub: 'GTA5-Mods.com', hubUrl: 'https://www.gta5-mods.com/',
    manager: 'OpenIV', managerUrl: 'https://openiv.com/',
    howto: 'Install Script Hook V first (required). Install OpenIV to manage game files. Use a separate game profile or backup files before modding. Do NOT use mods in GTA Online — VAC bans are permanent.',
    mods: [
      { name:'Script Hook V', type:'framework', essential:true, desc:'Required framework for all script-based GTA V mods. Updated on every game patch — check Alexander Blade\'s site after any Rockstar update.', url:'http://www.dev-c.com/gtav/scripthookv/', source:'dev-c.com' },
      { name:'OpenIV', type:'tool', essential:true, desc:'File manager and editor for GTA V files. Required for texture mods, vehicle replacers, and map edits. Install in "edit mode" only when modding.', url:'https://openiv.com/', source:'openiv.com' },
      { name:'NaturalVision Evolved', type:'graphics', essential:false, desc:'The most acclaimed GTA V visual overhaul. Completely transforms lighting, weather, and textures to cinematic quality. Requires capable hardware.', url:'https://www.patreon.com/razedmods', source:'Patreon (free tier)' },
      { name:'Redux', type:'graphics', essential:false, desc:'Complete weather, lighting, and graphics overhaul with improved ENB settings. Better performance than NVE on mid-range PCs.', url:'https://www.gta5-mods.com/misc/redux', source:'GTA5-Mods' },
      { name:'LSPDFR (Police Roleplay)', type:'gameplay', essential:false, desc:'Lets you play as a police officer in Los Santos — traffic stops, pursuits, arrests, callouts. Has its own massive ecosystem of add-ons and callout packs.', url:'https://www.lcpdfr.com/downloads/gta5mods/g17media/7792-lspd-first-response/', source:'lcpdfr.com' },
      { name:'Menyoo Trainer', type:'tool', essential:false, desc:'Feature-rich in-game trainer — spawn vehicles/peds, manipulate weather, teleport, set wanted level. The most powerful free trainer available.', url:'https://www.gta5-mods.com/scripts/menyoo-pc-sp', source:'GTA5-Mods' },
      { name:'FiveM (Multiplayer)', type:'platform', essential:false, desc:'Custom multiplayer platform — roleplay servers, racing leagues, deathmatch, mini-games. Completely separate from GTA Online. Rockstar officially endorsed in 2023.', url:'https://fivem.net/', source:'fivem.net' },
      { name:'QuantV', type:'graphics', essential:false, desc:'ReShade + ENB combination that gives GTA V a dramatically different photorealistic look. Lighter than Redux while still impressive.', url:'https://www.gta5-mods.com/misc/quantv', source:'GTA5-Mods' },
    ]
  },
  'rimworld': {
    hub: 'Steam Workshop', hubUrl: 'https://steamcommunity.com/app/294100/workshop/',
    manager: 'Steam Workshop', managerUrl: 'https://steamcommunity.com/app/294100/workshop/',
    howto: 'Subscribe to mods via Steam Workshop → launch RimWorld → enable mods in the Mod Manager → sort with Mod Manager or RimSort. Always check compatibility with your game version.',
    mods: [
      { name:'HugsLib', type:'framework', essential:true, desc:'Framework required by many popular mods. Install first to avoid errors.', url:'https://steamcommunity.com/sharedfiles/filedetails/?id=818773962', source:'Steam Workshop' },
      { name:'Combat Extended', type:'overhaul', essential:false, desc:'Complete combat system overhaul — real ammunition, armor penetration, shield system, ballistic physics. Dramatically increases difficulty and realism. Major commitment.', url:'https://steamcommunity.com/sharedfiles/filedetails/?id=723478314', source:'Steam Workshop' },
      { name:'Vanilla Expanded Series', type:'content', essential:false, desc:"Tynan (the developer) endorsed series of mods — Weapons Expanded, Factions Expanded, Ideology Expanded, Animals Expanded. Each adds seamlessly integrated content.", url:'https://steamcommunity.com/sharedfiles/filedetails/?id=2329011599', source:'Steam Workshop' },
      { name:'Hospitality', type:'gameplay', essential:false, desc:'Allows visitors to your colony to stay at inns, buy food, and become recruitable. Adds a whole new economy layer to the game.', url:'https://steamcommunity.com/sharedfiles/filedetails/?id=753498552', source:'Steam Workshop' },
      { name:'Pick Up and Haul', type:'qol', essential:true, desc:'Colonists haul multiple items per trip instead of one at a time. One of the most impactful QoL mods — eliminates the most tedious vanilla behavior.', url:'https://steamcommunity.com/sharedfiles/filedetails/?id=1279012058', source:'Steam Workshop' },
      { name:'Allow Tool', type:'qol', essential:true, desc:'Adds mass allow/forbid tools, expanded designator options, and better zone management. Makes large colony management bearable.', url:'https://steamcommunity.com/sharedfiles/filedetails/?id=761421485', source:'Steam Workshop' },
      { name:'Character Editor', type:'tool', essential:false, desc:'Full in-game character editor — customize pawn traits, backstories, skills, and appearance. Great for creating curated colony starts.', url:'https://steamcommunity.com/sharedfiles/filedetails/?id=1874644845', source:'Steam Workshop' },
      { name:'RimSort', type:'tool', essential:true, desc:'External mod manager and load order sorter. Far better than vanilla mod manager for large mod lists.', url:'https://github.com/RimSort/RimSort', source:'GitHub' },
    ]
  },
  'cities-skylines': {
    hub: 'Steam Workshop', hubUrl: 'https://steamcommunity.com/app/255710/workshop/',
    manager: 'Steam Workshop', managerUrl: 'https://steamcommunity.com/app/255710/workshop/',
    howto: 'Subscribe via Steam Workshop. Mods activate in-game from the Content Manager. Traffic Manager and Move It are essential — install before starting any city.',
    mods: [
      { name:'Traffic Manager: President Edition', type:'gameplay', essential:true, desc:'Control lane use, speed limits, junction rules, and vehicle routing. Without this, traffic AI breaks every large city. Install before you build anything.', url:'https://steamcommunity.com/sharedfiles/filedetails/?id=1806963141', source:'Steam Workshop' },
      { name:'Move It!', type:'tool', essential:true, desc:'Move any placed object anywhere — buildings, roads, trees, props. Essential for precise city building. Removes grid restrictions entirely.', url:'https://steamcommunity.com/sharedfiles/filedetails/?id=1619685021', source:'Steam Workshop' },
      { name:'Fine Road Anarchy 2', type:'tool', essential:true, desc:'Build roads anywhere, at any angle, ignoring terrain and zoning restrictions. Required for realistic organic road layouts.', url:'https://steamcommunity.com/sharedfiles/filedetails/?id=2862881785', source:'Steam Workshop' },
      { name:'81 Tiles 2', type:'gameplay', essential:false, desc:'Unlocks the full 81-tile map grid instead of the default 9. Required for city-spanning metropolises.', url:'https://steamcommunity.com/sharedfiles/filedetails/?id=2862121934', source:'Steam Workshop' },
      { name:'Network Multitool', type:'tool', essential:false, desc:'Fixes road connections, adds slope-leveling tools, and provides precision editing for road networks. Advanced but invaluable.', url:'https://steamcommunity.com/sharedfiles/filedetails/?id=2560782729', source:'Steam Workshop' },
      { name:'Find It! 2', type:'ui', essential:true, desc:'Search for any asset in the game by name, category, or property. Saves hours of scrolling through asset lists.', url:'https://steamcommunity.com/sharedfiles/filedetails/?id=2133885971', source:'Steam Workshop' },
      { name:'Plop the Growables', type:'gameplay', essential:false, desc:'Place specific buildings directly rather than zoning and waiting. Gives full control over city aesthetics.', url:'https://steamcommunity.com/sharedfiles/filedetails/?id=924884948', source:'Steam Workshop' },
    ]
  },
  'ksp': {
    hub: 'CKAN / SpaceDock', hubUrl: 'https://spacedock.info/',
    manager: 'CKAN', managerUrl: 'https://github.com/KSP-CKAN/CKAN',
    howto: 'Install CKAN (the mod manager). It automatically handles dependencies and mod compatibility. Much better than manual installation.',
    mods: [
      { name:'CKAN (Mod Manager)', type:'tool', essential:true, desc:'The only mod manager for KSP. Automatically resolves dependencies, checks compatibility, and keeps mods updated. Use this for everything.', url:'https://github.com/KSP-CKAN/CKAN', source:'GitHub' },
      { name:'MechJeb 2', type:'gameplay', essential:false, desc:'Autopilot system — maneuver planning, orbital mechanics assistant, landing assist, ascent guidance. Essential for complex missions or beginners.', url:'https://github.com/MuMech/MechJeb2', source:'GitHub' },
      { name:'Near Future Technologies', type:'content', essential:false, desc:'Complete set of realistic near-future spacecraft parts — ion engines, fission reactors, nuclear thermal engines, large tanks. Adds hundreds of hours of endgame content.', url:'https://spacedock.info/search?q=near+future', source:'SpaceDock' },
      { name:'Realism Overhaul', type:'overhaul', essential:false, desc:'Makes KSP simulations match real-world physics. Real rocket engines, realistic re-entry heating, life support. Extreme difficulty — not for beginners.', url:'https://github.com/KSP-RO/RealismOverhaul', source:'GitHub' },
      { name:'Kerbalism', type:'gameplay', essential:false, desc:'Adds science-based life support, radiation, part failures, and realistic biology. Makes long missions genuinely tense.', url:'https://github.com/Kerbalism/Kerbalism', source:'GitHub' },
      { name:'Kerbal Engineer Redux', type:'ui', essential:true, desc:"Real-time delta-V readouts, TWR calculation, and orbital information during design and flight. You can't build efficient rockets without it.", url:'https://spacedock.info/mod/6/Kerbal%20Engineer%20Redux', source:'SpaceDock' },
      { name:'Environmental Visual Enhancements', type:'graphics', essential:false, desc:'Adds volumetric clouds, atmospheric effects, and city lights visible from orbit. Dramatically improves how Kerbin and other bodies look.', url:'https://spacedock.info/mod/638', source:'SpaceDock' },
    ]
  },
  'fnv': {
    hub: 'Nexus Mods', hubUrl: 'https://www.nexusmods.com/newvegas',
    manager: 'Mod Organizer 2', managerUrl: 'https://www.nexusmods.com/newvegas/mods/42572',
    howto: 'New Vegas is notoriously crash-prone without the right setup. Follow the Viva New Vegas guide (vivanewvegas.moddinglinked.com) for a stable baseline before adding content mods.',
    mods: [
      { name:'Viva New Vegas Guide', type:'guide', essential:true, desc:'The definitive modding guide — follow this before installing anything. Sets up a stable baseline with all essential bug fixes and performance mods.', url:'https://vivanewvegas.moddinglinked.com/', source:'moddinglinked.com' },
      { name:'JSawyer Ultimate Edition', type:'overhaul', essential:false, desc:'Joshua Sawyer\'s own balance mod (the game\'s lead designer) — fixes XP bloat, adds carry weight limits, rebalances economy. His intended vision for NV.', url:'https://www.nexusmods.com/newvegas/mods/61', source:'Nexus' },
      { name:'Vanilla UI Plus', type:'ui', essential:true, desc:'Completely overhauls the HUD and menus for PC use. Widescreen support, better fonts, resizable elements. Non-negotiable on PC.', url:'https://www.moddb.com/mods/vanilla-ui-plus', source:'ModDB' },
      { name:"lStewieAl's Tweaks", type:'qol', essential:true, desc:"600+ configurable tweaks to fix annoying vanilla behaviors — sprint while in VATS, restore cut content, fix NPC pathfinding. Transforms the experience.", url:'https://www.nexusmods.com/newvegas/mods/66347', source:'Nexus' },
      { name:'Tale of Two Wastelands', type:'overhaul', essential:false, desc:'Merges Fallout 3 into New Vegas — both games, both maps, all DLC, in one engine. Requires owning both games. The ultimate Bethesda-era Fallout experience.', url:'https://taleoftwowastelands.com/', source:'Official Site' },
      { name:'New Vegas Bounties Trilogy', type:'content', essential:false, desc:"Three-part quest mod with full voice acting, custom areas, and morally complex storylines. Considered the gold standard of fan-made quest mods.", url:'https://www.nexusmods.com/newvegas/mods/255', source:'Nexus' },
      { name:'Autumn Leaves', type:'content', essential:false, desc:'6-hour mystery quest mod set in a pre-war library. Fully voiced, multiple endings, exceptional writing. Better than most official DLC.', url:'https://www.nexusmods.com/newvegas/mods/50834', source:'Nexus' },
    ]
  },
  'assetto-corsa': {
    hub: 'RaceDepartment', hubUrl: 'https://www.racedepartment.com/downloads/categories/ac-mods.4/',
    manager: 'Content Manager', managerUrl: 'https://assettocorsa.club/content-manager.html',
    howto: 'Install Content Manager (replaces the stock launcher). Install Custom Shaders Patch (CSP) through CM — required for most modern mods. Install Sol for weather.',
    mods: [
      { name:'Content Manager', type:'tool', essential:true, desc:'The essential replacement for AC\'s stock launcher. Handles mod installation, configurations, track/car management, and servers. The real game starts here.', url:'https://assettocorsa.club/content-manager.html', source:'assettocorsa.club' },
      { name:'Custom Shaders Patch (CSP)', type:'graphics', essential:true, desc:'Extends AC\'s rendering engine with dynamic shadows, rain, motion blur, proper track surfaces, and VR improvements. Required by most serious mods.', url:'https://acstuff.ru/patch/', source:'acstuff.ru' },
      { name:'Sol Weather System', type:'graphics', essential:false, desc:'Fully dynamic weather — real-time rain, puddles, humidity, clouds, star maps, and day/night transitions. The reference for sim racing atmospherics.', url:'https://www.racedepartment.com/downloads/sol.24914/', source:'RaceDepartment' },
      { name:'Nürburgring Nordschleife', type:'track', essential:false, desc:"The definitive sim racing track — 20.8km, 300 corners, the world's most famous motorsport venue. Multiple layout versions available from the community.", url:'https://www.racedepartment.com/downloads/nordschleife-tourist.4977/', source:'RaceDepartment' },
      { name:'Pure (Lighting System)', type:'graphics', essential:false, desc:'Real-world-calibrated lighting and weather system. Works alongside Sol or standalone. Best-in-class photorealistic results.', url:'https://www.racedepartment.com/downloads/pure.55798/', source:'RaceDepartment' },
      { name:'RSS Formula Hybrid 2024', type:'car', essential:false, desc:'The closest recreation of a modern F1 car available in AC. Used by many sim racers as their primary F1 sim. Free to download.', url:'https://www.racedepartment.com/downloads/', source:'RaceDepartment' },
      { name:'Shutoko Revival Project', type:'track', essential:false, desc:'The famous Tokyo highway system — 80km of Japanese expressways recreated in stunning detail. Perfect for touge and drift sessions.', url:'https://shutokorevivalproject.com/', source:'Official Site' },
    ]
  },
  'l4d2': {
    hub: 'Steam Workshop', hubUrl: 'https://steamcommunity.com/app/550/workshop/',
    manager: 'Steam Workshop', managerUrl: 'https://steamcommunity.com/app/550/workshop/',
    howto: 'Subscribe to any mod via Steam Workshop — they auto-install. Conflicts between mods (both changing the same file) are handled by whichever was added last.',
    mods: [
      { name:'Death Aboard 2', type:'campaign', essential:false, desc:'Premier custom campaign — cruise ship settings, exceptional design, and length comparable to official maps. The most polished community campaign.', url:'https://steamcommunity.com/sharedfiles/filedetails/?id=125383191', source:'Steam Workshop' },
      { name:'City 17 Campaign', type:'campaign', essential:false, desc:'Half-Life 2 themed L4D2 campaign set in City 17. Multiple maps, quality design, and strong community reception.', url:'https://steamcommunity.com/sharedfiles/filedetails/?id=128072579', source:'Steam Workshop' },
      { name:'HD Improved Graphics Pack', type:'graphics', essential:false, desc:'High-resolution texture improvements for weapons, survivors, and environments. Significant visual upgrade without touching gameplay.', url:'https://steamcommunity.com/sharedfiles/filedetails/?id=121069671', source:'Steam Workshop' },
      { name:'Improved Bots (Advanced)', type:'gameplay', essential:true, desc:'Makes AI survivors dramatically smarter — they revive you, maintain formation, use medkits when needed. Essential for solo play.', url:'https://steamcommunity.com/sharedfiles/filedetails/?id=1678163644', source:'Steam Workshop' },
      { name:'Last Stand Community Update', type:'content', essential:true, desc:'Massive official-quality content update from the community — new campaign, new finales, hundreds of bug fixes. Already in the base game on PC now.', url:'https://steamcommunity.com/games/550/announcements/', source:'Steam Workshop' },
      { name:'Rayman1103\'s Mutation Collection', type:'gameplay', essential:false, desc:'Brings back all game mutations (Realism Versus, Bleed Out, etc.) as custom mutations with extra options.', url:'https://steamcommunity.com/sharedfiles/filedetails/?id=204504807', source:'Steam Workshop' },
    ]
  },
  'dont-starve-together': {
    hub: 'Steam Workshop', hubUrl: 'https://steamcommunity.com/app/322330/workshop/',
    manager: 'Steam Workshop', managerUrl: 'https://steamcommunity.com/app/322330/workshop/',
    howto: 'Subscribe via Steam Workshop. Server mods apply to hosted sessions — make sure your friends subscribe to the same mods before joining your game.',
    mods: [
      { name:'Epic Healthbar', type:'ui', essential:true, desc:"Shows boss health as an actual health bar instead of forcing you to guess. Non-negotiable for any serious DST session.", url:'https://steamcommunity.com/sharedfiles/filedetails/?id=836370274', source:'Steam Workshop' },
      { name:'Geometric Placement', type:'qol', essential:true, desc:'Snaps object placement to a grid, shows ranges for structures, and prevents misaligned farms/buildings. Saves enormous frustration.', url:'https://steamcommunity.com/sharedfiles/filedetails/?id=351325790', source:'Steam Workshop' },
      { name:'Combined Status', type:'ui', essential:true, desc:'Adds hunger, sanity, and health numbers to your HUD so you can track exact values instead of guessing from bar levels.', url:'https://steamcommunity.com/sharedfiles/filedetails/?id=376333686', source:'Steam Workshop' },
      { name:'Wormhole Marks', type:'ui', essential:false, desc:'Labels each wormhole with a matching color pair so you know where you\'ll end up before stepping in.', url:'https://steamcommunity.com/sharedfiles/filedetails/?id=362175979', source:'Steam Workshop' },
      { name:'Global Positions', type:'ui', essential:false, desc:'Adds a full shared minimap showing all players\' positions in real-time. Essential for multiplayer coordination.', url:'https://steamcommunity.com/sharedfiles/filedetails/?id=378160973', source:'Steam Workshop' },
      { name:'Increased Stack Size', type:'qol', essential:false, desc:'Increases item stack limits so inventory management becomes far less tedious on long runs.', url:'https://steamcommunity.com/sharedfiles/filedetails/?id=356043883', source:'Steam Workshop' },
    ]
  },
  'valheim': {
    hub: 'Nexus Mods / Thunderstore', hubUrl: 'https://www.nexusmods.com/valheim',
    manager: 'r2modman', managerUrl: 'https://thunderstore.io/package/ebkr/r2modman/',
    howto: 'Use r2modman from Thunderstore — it handles BepInEx (the required framework) automatically. Install mods from Thunderstore or Nexus Mods.',
    mods: [
      { name:'BepInEx', type:'framework', essential:true, desc:'Required framework for all Valheim mods. r2modman installs this automatically — use that instead of manual installation.', url:'https://thunderstore.io/c/valheim/p/denikson/BepInExPack_Valheim/', source:'Thunderstore' },
      { name:'Valheim Plus', type:'overhaul', essential:false, desc:'The essential QoL overhaul — configures almost every game value: carry weight, smelting speed, map sharing, crafting, farming. Massive time saver.', url:'https://www.nexusmods.com/valheim/mods/4', source:'Nexus' },
      { name:'Epic Loot', type:'gameplay', essential:false, desc:'Adds Diablo-style loot drops with magical effects — fire damage, poison resistance, speed boosts. Transforms the endgame loop.', url:'https://www.nexusmods.com/valheim/mods/387', source:'Nexus' },
      { name:'Plant Everything', type:'qol', essential:false, desc:'Allows planting all harvestable resources, trees, and crops anywhere. Removes arbitrary restrictions and enables proper farming setups.', url:'https://www.nexusmods.com/valheim/mods/1042', source:'Nexus' },
      { name:'Jotunn (Framework)', type:'framework', essential:true, desc:'Required by many major content mods — handles item registration, localization, and asset loading. Install before large content mods.', url:'https://thunderstore.io/c/valheim/p/ValheimModding/Jotunn/', source:'Thunderstore' },
      { name:'Infinity Hammer', type:'tool', essential:false, desc:'Ultimate building tool — place anything anywhere, bypass restrictions, scale objects. The key to true architectural ambition in Valheim.', url:'https://www.nexusmods.com/valheim/mods/2196', source:'Nexus' },
    ]
  },
  'bannerlord': {
    hub: 'Nexus Mods', hubUrl: 'https://www.nexusmods.com/mountandblade2bannerlord',
    manager: 'Vortex / Steam Workshop', managerUrl: 'https://www.nexusmods.com/site/mods/1',
    howto: 'Use Nexus Vortex for complex mod setups. Steam Workshop is easier for simple mod installs. Always check mod compatibility with your game version — Bannerlord patches frequently break mods.',
    mods: [
      { name:'Realistic Battle Mod (RBM)', type:'overhaul', essential:false, desc:'Completely overhauls combat physics, armor penetration, formation AI, and injury system. Makes battles feel dramatically more tactical and brutal.', url:'https://www.nexusmods.com/mountandblade2bannerlord/mods/791', source:'Nexus' },
      { name:'Diplomacy', type:'gameplay', essential:false, desc:'Adds alliance systems, trade agreements, peace terms, and complex inter-faction diplomacy. The political layer vanilla desperately needed.', url:'https://www.nexusmods.com/mountandblade2bannerlord/mods/2457', source:'Nexus' },
      { name:'Bannerlord Tweaks', type:'qol', essential:true, desc:'Configurable tweaks for XP rates, wealth scaling, party size, and dozens of other values. Fixes the worst balance issues in the base game.', url:'https://www.nexusmods.com/mountandblade2bannerlord/mods/253', source:'Nexus' },
      { name:'Detailed Character Creation', type:'ui', essential:false, desc:'Expands character creation with more cultural backgrounds, skills, and cosmetic options.', url:'https://www.nexusmods.com/mountandblade2bannerlord/mods/988', source:'Nexus' },
      { name:'Calradia Expanded Kingdoms', type:'content', essential:false, desc:'Adds new factions, lords, units, and territories to the map. Increases the political complexity significantly.', url:'https://www.nexusmods.com/mountandblade2bannerlord/mods/1592', source:'Nexus' },
    ]
  },
  'gmod': {
    hub: 'Steam Workshop', hubUrl: 'https://steamcommunity.com/app/4000/workshop/',
    manager: 'Steam Workshop', managerUrl: 'https://steamcommunity.com/app/4000/workshop/',
    howto: 'GMod IS modding — most content is server-side. Join a DarkRP or TTT server and content downloads automatically. For singleplayer, subscribe to addons via Workshop.',
    mods: [
      { name:'DarkRP', type:'gamemode', essential:false, desc:'The most-played GMod gamemode — economy-based roleplay. Buy properties, get a job, earn money, rob banks. Has its own massive ecosystem of plugins.', url:'https://steamcommunity.com/sharedfiles/filedetails/?id=529002408', source:'Steam Workshop' },
      { name:'Trouble in Terrorist Town (TTT)', type:'gamemode', essential:false, desc:'Social deduction murder mystery — traitors secretly kill innocents while everyone tries to figure out who\'s who. Originated countless derivative games.', url:'https://www.troubleinterroristtown.com/', source:'Official Site' },
      { name:'Prop Hunt', type:'gamemode', essential:false, desc:'Hunters vs. props — one team disguises as objects in the environment while the other team searches and shoots them. Wildly fun.', url:'https://steamcommunity.com/sharedfiles/filedetails/?id=135509255', source:'Steam Workshop' },
      { name:'Wiremod', type:'tool', essential:false, desc:'Advanced logic system with gates, sensors, expressions, and programmable components. The deepest technical tool in GMod — build computers, AI, machines.', url:'https://steamcommunity.com/sharedfiles/filedetails/?id=160250458', source:'Steam Workshop' },
      { name:'PAC3 (Player Appearance Customizer)', type:'cosmetic', essential:false, desc:'Build custom player model outfits, accessories, and effects. The creative tool for GMod character expression.', url:'https://steamcommunity.com/sharedfiles/filedetails/?id=104691717', source:'Steam Workshop' },
    ]
  },
  'satisfactory': {
    hub: 'ficsit.app', hubUrl: 'https://ficsit.app/',
    manager: 'Satisfactory Mod Manager (SMM)', managerUrl: 'https://ficsit.app/',
    howto: 'Download Satisfactory Mod Manager from ficsit.app — it handles everything automatically including the SML framework. Browse and install mods directly from the manager.',
    mods: [
      { name:'SML (Satisfactory Mod Loader)', type:'framework', essential:true, desc:'Required framework. Satisfactory Mod Manager installs this automatically — just use SMM from ficsit.app.', url:'https://ficsit.app/', source:'ficsit.app' },
      { name:'Ficsit-Cam', type:'tool', essential:false, desc:'Cinematic camera system for recording and photography. Essential for sharing your factory screenshots.', url:'https://ficsit.app/mod/CameraPlugin', source:'ficsit.app' },
      { name:'Area Actions', type:'tool', essential:true, desc:'Select, copy, move, delete, and repaint factory sections in bulk. Essential for reorganizing builds without demolishing everything.', url:'https://ficsit.app/mod/AreaActions', source:'ficsit.app' },
      { name:'Refined Power', type:'content', essential:false, desc:'Complete power generation overhaul — solar, wind, nuclear, tidal, and advanced generators. Makes the power layer as deep as the production layer.', url:'https://ficsit.app/mod/RefinedPower', source:'ficsit.app' },
      { name:'FISCIT Networks', type:'content', essential:false, desc:'Programmable factory networking — code your production lines in a Lua-based language. The endgame for factory automation nerds.', url:'https://ficsit.app/mod/FicsIt-Networks', source:'ficsit.app' },
    ]
  },
};

// ============================================================
// API_IDS — CheapShark game IDs + Speedrun.com IDs
// Used by js/live.js for live price and WR data fetching
// Verified March 31, 2026
// ============================================================
const CHEAPSHARK_IDS = {
  'elden-ring':          '236717',
  'baldurs-gate-3':      '202278',
  'cyberpunk-2077':      '202350',
  'rdr2':                '206516',
  'persona-5-royal':     '252306',
  'monster-hunter-wilds':'287215',
  'hades-2':             '285827',
  'disco-elysium':       '227942',
  'deep-rock-galactic':  '178632',
  'clair-obscur':        '297214',
  'hollow-knight':       '165363',
  'celeste':             '177485',
  'stardew-valley':      '150036',
  'valheim':             '225747',
  'slay-the-spire':      '175271',
  'dead-cells':          '168685',
  'vampire-survivors':   '238605',
  'sekiro':              '222286',
  'lies-of-p':           '264212',
  'black-myth-wukong':   '287845',
  'tekken-8':            '270879',
  'doom-eternal':        '202356',
  'subnautica':          '140643',
  'rust':                '104006',
  'terraria':            '39',
  'outer-wilds':         '202038',
  'cs2':                 '89',
  'balatro':             '281345',
  'into-the-breach':     '172155',
  'hades':               '165270',
  'portal-2':            '2880',
  'hollow-knight':       '165363',
  'noita':               '221550',
  'satisfactory':        '211685',
  'dont-starve-together':'62552',
  'the-forest':          '104524',
  're-village':          '248500',
  'dead-space':          '258650',
  'civ6':                '131540',
  'ck3':                 '222870',
  'xcom2':               '131930',
  'total-war-wh3':       '260680',
  'risk-of-rain-2':      '178240',
  'cities-skylines':     '5920',
  'ksp':                 '15570',
  'assetto-corsa':       '9040',
  'l4d2':                '11100',
  'gta-v':               '67',
  'forza-h5':            '246500',
  'blasphemous':         '213220',
  'ori-wisps':           '222450',
  'alien-isolation':     '11410',
  'soma':                '11605',
};

const SPEEDRUN_IDS = {
  'elden-ring':     { id:'nd28z0ed', cat:'02qr00pk', label:'Any%',   url:'https://www.speedrun.com/eldenring',        wr:'PT3M42S' },
  'hades':          { id:'o1y9okr6', cat:null,       label:'Any Heat',url:'https://www.speedrun.com/hades',            wr:'PT2M13S' },
  'hollow-knight':  { id:'76rqmld8', cat:null,       label:'Any%',   url:'https://www.speedrun.com/hollowknight',     wr:'PT4M29S' },
  'celeste':        { id:'o1y9j9v6', cat:null,       label:'Any%',   url:'https://www.speedrun.com/celeste',          wr:'PT24M51S' },
  'cyberpunk-2077': { id:'4d79wl31', cat:null,       label:'Any%',   url:'https://www.speedrun.com/cyberpunk_2077',   wr:null },
  'sekiro':         { id:'o1y9zk26', cat:null,       label:'Any%',   url:'https://www.speedrun.com/sekiro',           wr:null },
  'portal-2':       { id:'om1mw4d2', cat:null,       label:'Any%',   url:'https://www.speedrun.com/portal_2',         wr:null },
  'super-meat-boy': { id:'v1pxxz68', cat:null,       label:'Any%',   url:'https://www.speedrun.com/smb',             wr:null },
  'dead-cells':     { id:'nd2ee5ed', cat:null,       label:'Any%',   url:'https://www.speedrun.com/deadcells',       wr:null },
  'slay-the-spire': { id:'j1llqye1', cat:null,       label:'Any%',   url:'https://www.speedrun.com/slay_the_spire',  wr:null },
  'terraria':       { id:'kdk4e21m', cat:null,       label:'Any%',   url:'https://www.speedrun.com/terraria',        wr:null },
  'doom-eternal':   { id:'9d3r97ed', cat:null,       label:'Any%',   url:'https://www.speedrun.com/doom_eternal',    wr:null },
  'into-the-breach':{ id:'y654r24d', cat:null,       label:'Any%',   url:'https://www.speedrun.com/itb',             wr:null },
  'stardew-valley': { id:'9d3q7e1l', cat:null,       label:'Any%',   url:'https://www.speedrun.com/stardew_valley',  wr:null },
  'vampire-survivors':{ id:'j1n8y7w1', cat:null,     label:'Any%',   url:'https://www.speedrun.com/vampiresurvivors',wr:null },
};

// Format ISO 8601 duration (PT3M42S) → "3m 42s"
function parseSrTime(iso) {
  if (!iso) return null;
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:([\d.]+)S)?/);
  if (!m) return null;
  const h = parseInt(m[1]||0), min = parseInt(m[2]||0), s = parseFloat(m[3]||0);
  const parts = [];
  if (h) parts.push(`${h}h`);
  if (min) parts.push(`${min}m`);
  parts.push(`${Math.floor(s)}s`);
  return parts.join(' ');
}
