import type { TeamAnalysisReport } from '../types';

export const mockTeamAnalysis: TeamAnalysisReport = {
  reportInfo: {
    teamId: 'karmine-corp',
    teamName: 'Karmine Corp',
    gamesAnalyzed: 20,
    opponentWinrate: 40,
    averageKills: 11.9,
    averageDeaths: 12.3,
    players: [
      { playerId: 'p1', nickname: 'Cabochard', role: 'top' },
      { playerId: 'p2', nickname: 'Closer', role: 'jungle' },
      { playerId: 'p3', nickname: 'SAKEN', role: 'mid' },
      { playerId: 'p4', nickname: 'Upset', role: 'adc' },
      { playerId: 'p5', nickname: 'Targamas', role: 'support' },
    ],
    timeframe: {
      startDate: '2024-01-01',
      endDate: '2024-03-15',
      patchVersion: '14.5',
    },
    generatedAt: new Date().toISOString(),
  },

  overview: {
    randomness: 'chaotic',
    randomnessScore: 0.78,
    strategicInsights: [
      'Prepare principles and flexible answers.',
      'Prioritize comfort denial.',
      'Expect multiple styles; prioritize adaptable comps over single hard reads.',
      'Keep answers ready for Sejuani, Gnar, Rakan, Azir, Rumble',
      'Focus on denying engage supports and stable jungle picks if available',
      'Expect multiple styles; prioritize adaptable comps over single hard reads',
    ],
  },

  draftPlan: {
    banPlan: ['Sejuani', 'Gnar', 'Rakan', 'LeeSin', 'Orianna'],
    draftPriority: 'flexibility',
    counterPicks: [
      { targetChampion: 'Sejuani', suggestedCounters: ['Lillia', 'Kindred'] },
      { targetChampion: 'Gnar', suggestedCounters: ['Camille', 'Irelia'] },
      { targetChampion: 'Rakan', suggestedCounters: ['Alistar', 'Nautilus'] },
    ],
    strategicNotes: [

    ],
  },

  draftTendencies: {
    priorityPicks: [
      { championId: 'Sejuani', pickRate: 65, banRate: 45, priority: 1 },
      { championId: 'Gnar', pickRate: 55, banRate: 40, priority: 2 },
      { championId: 'Rakan', pickRate: 50, banRate: 35, priority: 3 },
      { championId: 'Azir', pickRate: 45, banRate: 30, priority: 4 },
      { championId: 'Rumble', pickRate: 40, banRate: 25, priority: 5 },
      { championId: 'Jayce', pickRate: 38, banRate: 20, priority: 6 },
      { championId: 'Maokai', pickRate: 35, banRate: 28, priority: 7 },
      { championId: 'Skarner', pickRate: 32, banRate: 22, priority: 8 },
      { championId: 'Jhin', pickRate: 30, banRate: 15, priority: 9 },
      { championId: 'Zeri', pickRate: 28, banRate: 32, priority: 10 },
    ],
  },

  stablePicks: [
    {
      role: 'top',
      picks: [
        { championId: 'Gnar', role: 'top', gamesPlayed: 8, winrate: 62.5, kda: 3.2, isSignaturePick: true },
        { championId: 'Jayce', role: 'top', gamesPlayed: 5, winrate: 60.0, kda: 2.8, isSignaturePick: true },
        { championId: 'Rumble', role: 'top', gamesPlayed: 4, winrate: 50.0, kda: 2.5, isSignaturePick: false },
      ],
    },
    {
      role: 'jungle',
      picks: [
        { championId: 'Sejuani', role: 'jungle', gamesPlayed: 10, winrate: 70.0, kda: 4.1, isSignaturePick: true },
        { championId: 'Maokai', role: 'jungle', gamesPlayed: 6, winrate: 50.0, kda: 3.5, isSignaturePick: false },
        { championId: 'Skarner', role: 'jungle', gamesPlayed: 4, winrate: 75.0, kda: 3.8, isSignaturePick: false },
      ],
    },
    {
      role: 'mid',
      picks: [
        { championId: 'Azir', role: 'mid', gamesPlayed: 7, winrate: 57.1, kda: 3.4, isSignaturePick: true },
        { championId: 'Orianna', role: 'mid', gamesPlayed: 5, winrate: 40.0, kda: 2.9, isSignaturePick: false },
        { championId: 'Syndra', role: 'mid', gamesPlayed: 4, winrate: 50.0, kda: 3.1, isSignaturePick: false },
      ],
    },
    {
      role: 'adc',
      picks: [
        { championId: 'Jhin', role: 'adc', gamesPlayed: 8, winrate: 62.5, kda: 4.2, isSignaturePick: true },
        { championId: 'Zeri', role: 'adc', gamesPlayed: 6, winrate: 33.3, kda: 2.8, isSignaturePick: false },
        { championId: 'Varus', role: 'adc', gamesPlayed: 4, winrate: 50.0, kda: 3.5, isSignaturePick: false },
      ],
    },
    {
      role: 'support',
      picks: [
        { championId: 'Rakan', role: 'support', gamesPlayed: 9, winrate: 55.6, kda: 3.8, isSignaturePick: true },
        { championId: 'Nautilus', role: 'support', gamesPlayed: 5, winrate: 60.0, kda: 3.2, isSignaturePick: false },
        { championId: 'Thresh', role: 'support', gamesPlayed: 4, winrate: 50.0, kda: 3.0, isSignaturePick: false },
      ],
    },
  ],

  scenarios: [
    {
      scenarioId: 'teamfight-heavy',
      name: 'Teamfight Heavy',
      description: 'Strong 5v5 with AOE engage',
      likelihood: 45,
      winrate: 52,
      stats: {
        teamfightiness: 0.85,
        earlyAggression: 0.30,
        draftVolatility: 0.40,
        macro: 0.55,
      },
      punishStrategy: {
        action: 'ban',
        targets: ['Gnar', 'Maokai'],
        description: 'Ban Gnar, Maokai to deny engage frontline',
      },
    },
    {
      scenarioId: 'early-skirmish',
      name: 'Early Skirmish',
      description: 'Aggressive early with jungle priority',
      likelihood: 30,
      winrate: 48,
      stats: {
        teamfightiness: 0.50,
        earlyAggression: 0.85,
        draftVolatility: 0.55,
        macro: 0.40,
      },
      punishStrategy: {
        action: 'pick',
        targets: ['Skarner', 'Maokai'],
        description: 'Pick scaling jungle, concede early',
      },
    },
    {
      scenarioId: 'split-macro',
      name: 'Split & Macro',
      description: 'Side lane pressure with global threat',
      likelihood: 15,
      winrate: 58,
      stats: {
        teamfightiness: 0.25,
        earlyAggression: 0.45,
        draftVolatility: 0.70,
        macro: 0.90,
      },
      punishStrategy: {
        action: 'counter',
        targets: ['Jayce', 'Fiora'],
        description: 'Prepare Camille/Jax answers for split',
      },
    },
    {
      scenarioId: 'protect-carry',
      name: 'Protect the Carry',
      description: 'Hyper-carry focused with peel',
      likelihood: 7,
      winrate: 45,
      stats: {
        teamfightiness: 0.75,
        earlyAggression: 0.20,
        draftVolatility: 0.30,
        macro: 0.60,
      },
      punishStrategy: {
        action: 'pick',
        targets: ['Zed', 'Nocturne'],
        description: 'Draft assassin threat for backline',
      },
    },
    {
      scenarioId: 'chaos-flex',
      name: 'Chaos Flex',
      description: 'Unpredictable multi-flex draft',
      likelihood: 3,
      winrate: 35,
      stats: {
        teamfightiness: 0.50,
        earlyAggression: 0.60,
        draftVolatility: 0.95,
        macro: 0.45,
      },
      punishStrategy: {
        action: 'playstyle',
        targets: [],
        description: 'Stay calm, execute fundamentals',
      },
    },
  ],

  playerAnalysis: [
    {
      playerId: 'p2',
      nickname: 'Closer',
      role: 'jungle',
      entropy: 0.82,
      championPool: [
        { championId: 'Sejuani', gamesPlayed: 6, winrate: 66.7, isComfort: true },
        { championId: 'Maokai', gamesPlayed: 4, winrate: 50.0, isComfort: false },
        { championId: 'LeeSin', gamesPlayed: 3, winrate: 66.7, isComfort: true },
      ],
      tendencies: {
        earlyGameAggression: 0.75,
        teamfightParticipation: 0.82,
        soloKillRate: 0.45,
        visionScore: 0.68,
      },
    },
    {
      playerId: 'p1',
      nickname: 'Cabochard',
      role: 'top',
      entropy: 0.75,
      championPool: [
        { championId: 'Gnar', gamesPlayed: 8, winrate: 62.5, isComfort: true },
        { championId: 'Jayce', gamesPlayed: 5, winrate: 60.0, isComfort: true },
        { championId: 'Rumble', gamesPlayed: 4, winrate: 50.0, isComfort: false },
      ],
      tendencies: {
        earlyGameAggression: 0.65,
        teamfightParticipation: 0.78,
        soloKillRate: 0.52,
        visionScore: 0.45,
      },
    },
    {
      playerId: 'p5',
      nickname: 'Bo',
      role: 'jungle',
      entropy: 0.71,
      championPool: [
        { championId: 'Skarner', gamesPlayed: 4, winrate: 75.0, isComfort: true },
        { championId: 'Viego', gamesPlayed: 3, winrate: 66.7, isComfort: true },
      ],
      tendencies: {
        earlyGameAggression: 0.80,
        teamfightParticipation: 0.70,
        soloKillRate: 0.55,
        visionScore: 0.50,
      },
    },
    {
      playerId: 'p3',
      nickname: 'SAKEN',
      role: 'mid',
      entropy: 0.68,
      championPool: [
        { championId: 'Azir', gamesPlayed: 7, winrate: 57.1, isComfort: true },
        { championId: 'Orianna', gamesPlayed: 5, winrate: 40.0, isComfort: false },
        { championId: 'Syndra', gamesPlayed: 4, winrate: 50.0, isComfort: false },
      ],
      tendencies: {
        earlyGameAggression: 0.50,
        teamfightParticipation: 0.85,
        soloKillRate: 0.38,
        visionScore: 0.62,
      },
    },
    {
      playerId: 'p6',
      nickname: 'Yike',
      role: 'jungle',
      entropy: 0.65,
      championPool: [
        { championId: 'Maokai', gamesPlayed: 6, winrate: 50.0, isComfort: true },
        { championId: 'Sejuani', gamesPlayed: 4, winrate: 75.0, isComfort: true },
      ],
      tendencies: {
        earlyGameAggression: 0.55,
        teamfightParticipation: 0.88,
        soloKillRate: 0.30,
        visionScore: 0.72,
      },
    },
    {
      playerId: 'p7',
      nickname: 'Caliste',
      role: 'adc',
      entropy: 0.62,
      championPool: [
        { championId: 'Jhin', gamesPlayed: 5, winrate: 60.0, isComfort: true },
        { championId: 'Varus', gamesPlayed: 4, winrate: 50.0, isComfort: false },
      ],
      tendencies: {
        earlyGameAggression: 0.45,
        teamfightParticipation: 0.90,
        soloKillRate: 0.25,
        visionScore: 0.55,
      },
    },
    {
      playerId: 'p8',
      nickname: 'Vladi',
      role: 'support',
      entropy: 0.58,
      championPool: [
        { championId: 'Rakan', gamesPlayed: 6, winrate: 55.6, isComfort: true },
        { championId: 'Nautilus', gamesPlayed: 4, winrate: 60.0, isComfort: false },
      ],
      tendencies: {
        earlyGameAggression: 0.60,
        teamfightParticipation: 0.92,
        soloKillRate: 0.15,
        visionScore: 0.85,
      },
    },
    {
      playerId: 'p9',
      nickname: 'Canna',
      role: 'top',
      entropy: 0.55,
      championPool: [
        { championId: 'Gnar', gamesPlayed: 5, winrate: 60.0, isComfort: true },
        { championId: 'Renekton', gamesPlayed: 4, winrate: 50.0, isComfort: true },
      ],
      tendencies: {
        earlyGameAggression: 0.70,
        teamfightParticipation: 0.75,
        soloKillRate: 0.48,
        visionScore: 0.40,
      },
    },
    {
      playerId: 'p10',
      nickname: 'Targamas',
      role: 'support',
      entropy: 0.52,
      championPool: [
        { championId: 'Thresh', gamesPlayed: 6, winrate: 50.0, isComfort: true },
        { championId: 'Nautilus', gamesPlayed: 5, winrate: 60.0, isComfort: true },
      ],
      tendencies: {
        earlyGameAggression: 0.55,
        teamfightParticipation: 0.88,
        soloKillRate: 0.10,
        visionScore: 0.90,
      },
    },
    {
      playerId: 'p4',
      nickname: 'Upset',
      role: 'adc',
      entropy: 0.48,
      championPool: [
        { championId: 'Jhin', gamesPlayed: 8, winrate: 62.5, isComfort: true },
        { championId: 'Zeri', gamesPlayed: 6, winrate: 33.3, isComfort: false },
        { championId: 'Varus', gamesPlayed: 4, winrate: 50.0, isComfort: false },
      ],
      tendencies: {
        earlyGameAggression: 0.40,
        teamfightParticipation: 0.92,
        soloKillRate: 0.28,
        visionScore: 0.58,
      },
    },
  ],
};
