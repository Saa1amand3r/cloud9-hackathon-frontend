/**
 * Domain types for the Team Analysis Dashboard
 *
 * These types define the contract between frontend and backend.
 * See types.md for detailed documentation for backend developers.
 */

// ============================================================================
// CORE VALUE OBJECTS
// ============================================================================

/** Champion identifier (e.g., "Sejuani", "Gnar") */
export type ChampionId = string;

/** Player identifier */
export type PlayerId = string;

/** Team identifier */
export type TeamId = string;

/** Percentage value between 0 and 100 */
export type Percentage = number;

/** Normalized value between 0 and 1 */
export type NormalizedValue = number;

/** Game role/position */
export type Role = 'top' | 'jungle' | 'mid' | 'adc' | 'support';

// ============================================================================
// REPORT METADATA
// ============================================================================

export interface ReportInfo {
  teamId: TeamId;
  teamName: string;
  gamesAnalyzed: number;
  opponentWinrate: Percentage;
  averageKills: number;
  averageDeaths: number;
  players: PlayerSummary[];
  timeframe: TimeframeInfo;
  generatedAt: string; // ISO 8601 timestamp
}

export interface PlayerSummary {
  playerId: PlayerId;
  nickname: string;
  role: Role;
}

export interface TimeframeInfo {
  startDate: string; // ISO 8601 date
  endDate: string;   // ISO 8601 date
  patchVersion?: string;
}

// ============================================================================
// OVERVIEW & ANALYSIS
// ============================================================================

export type RandomnessLevel = 'predictable' | 'moderate' | 'chaotic';

export interface OverviewAnalysis {
  randomness: RandomnessLevel;
  randomnessScore: NormalizedValue; // 0-1, higher = more chaotic
  strategicInsights: string[];
}

// ============================================================================
// DRAFT ANALYSIS
// ============================================================================

export interface DraftPlan {
  banPlan: ChampionId[];
  draftPriority: DraftPriority;
  counterPicks: CounterPickStrategy[];
  strategicNotes: string[];
}

export type DraftPriority = 'flexibility' | 'comfort' | 'counter' | 'early_power';

export interface CounterPickStrategy {
  targetChampion: ChampionId;
  suggestedCounters: ChampionId[];
}

export interface DraftTendencies {
  priorityPicks: ChampionPriority[];
}

export interface ChampionPriority {
  championId: ChampionId;
  pickRate: Percentage;
  banRate: Percentage;
  priority: number; // 1 = highest priority
}

// ============================================================================
// STABLE PICKS
// ============================================================================

export interface StablePick {
  championId: ChampionId;
  role: Role;
  gamesPlayed: number;
  winrate: Percentage;
  kda: number;
  isSignaturePick: boolean;
}

export interface StablePicksByRole {
  role: Role;
  picks: StablePick[];
}

// ============================================================================
// SCENARIO ANALYSIS
// ============================================================================

export interface ScenarioCard {
  scenarioId: string;
  name: string;
  description?: string;
  likelihood: Percentage;
  winrate: Percentage;
  stats: ScenarioStats;
  punishStrategy: PunishStrategy;
}

export interface ScenarioStats {
  teamfightiness: NormalizedValue;
  earlyAggression: NormalizedValue;
  draftVolatility: NormalizedValue;
  macro: NormalizedValue;
  [key: string]: NormalizedValue; // Extensible for future stats
}

export interface PunishStrategy {
  action: 'ban' | 'pick' | 'counter' | 'playstyle';
  targets: ChampionId[];
  description: string;
}

// ============================================================================
// PLAYER ANALYSIS
// ============================================================================

export interface PlayerAnalysis {
  playerId: PlayerId;
  nickname: string;
  role: Role;
  entropy: NormalizedValue; // 0-1, higher = wider pool / less predictable
  championPool: ChampionPoolEntry[];
  tendencies: PlayerTendencies;
}

export interface ChampionPoolEntry {
  championId: ChampionId;
  gamesPlayed: number;
  winrate: Percentage;
  isComfort: boolean;
}

export interface PlayerTendencies {
  earlyGameAggression: NormalizedValue;
  teamfightParticipation: NormalizedValue;
  soloKillRate: NormalizedValue;
  visionScore: NormalizedValue;
}

// ============================================================================
// API RESPONSE AGGREGATES
// ============================================================================

export interface TeamAnalysisReport {
  reportInfo: ReportInfo;
  overview: OverviewAnalysis;
  draftPlan: DraftPlan;
  draftTendencies: DraftTendencies;
  stablePicks: StablePicksByRole[];
  scenarios: ScenarioCard[];
  playerAnalysis: PlayerAnalysis[];
}

// ============================================================================
// API REQUEST TYPES
// ============================================================================

export interface TeamAnalysisRequest {
  teamId: TeamId;
  timeframe?: {
    startDate?: string;
    endDate?: string;
    patchVersion?: string;
    lastNGames?: number;
  };
  includePlayerAnalysis?: boolean;
}
