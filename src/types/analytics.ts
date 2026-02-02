// Types for scouting analytics data

export interface AnalyticsMeta {
  generated_at: string;
  total_records: number;
  unique_champions: number;
}

export interface ChampionStat {
  champion_id: number;
  games: number;
  wins: number;
  winrate: number;
  pickrate: number;
}

export interface ChampionDNAProfile {
  champion_id: number;
  Aggression: number;
  Risk: number;
  Support: number;
  Economy: number;
  Damage: number;
  Vision: number;
}

export interface SynergyEdge {
  source: number;
  target: number;
  synergy: number;
  winrate: number;
}

export interface SynergyNode {
  id: number;
  connections: number;
}

export interface TopSynergy {
  champ1: number;
  champ2: number;
  games: number;
  winrate: number;
  synergy: number;
}

export interface CounterPick {
  my_champion: number;
  vs_champion: number;
  games: number;
  wins: number;
  winrate: number;
  counter_score: number;
}

export interface Archetype {
  cluster: number;
  archetype: string;
  games: number;
  winrate: number;
  signature_champions: string[];
  share: number;
}

export interface ArchetypeVisualization {
  x: number;
  y: number;
  cluster: number;
}

export interface ScoutingAnalytics {
  meta: AnalyticsMeta;
  champions: {
    stats: ChampionStat[];
    topByWinrate: ChampionStat[];
    topByPickrate: ChampionStat[];
  };
  championDNA: {
    dimensions: string[];
    profiles: ChampionDNAProfile[];
  };
  synergyNetwork: {
    topSynergies: TopSynergy[];
    nodes: SynergyNode[];
    edges: SynergyEdge[];
  };
  counterPicks: {
    bestCounters: CounterPick[];
    worstMatchups: CounterPick[];
  };
  archetypes: {
    clusters: Archetype[];
    visualization: ArchetypeVisualization[];
  };
  vizConfigs: {
    radarDimensions: string[];
    clusterColors: string[];
  };
}