# Team Analysis API Types

This document describes the data structures expected by the frontend dashboard.
All types are defined in `domain.ts` for TypeScript implementation.

---

## API Endpoint

```
GET /api/teams/{teamId}/analysis
```

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startDate` | ISO 8601 date | No | Filter games from this date |
| `endDate` | ISO 8601 date | No | Filter games until this date |
| `patchVersion` | string | No | Filter by game patch (e.g., "14.10") |
| `lastNGames` | integer | No | Analyze only the last N games |
| `includePlayerAnalysis` | boolean | No | Include detailed player analysis (default: true) |

### Response

Returns `TeamAnalysisReport` object.

---

## Domain Model

### Core Value Types

| Type | Format | Description |
|------|--------|-------------|
| `ChampionId` | string | Champion name identifier (e.g., "Sejuani", "LeeSin") |
| `PlayerId` | string | Unique player identifier |
| `TeamId` | string | Unique team identifier |
| `Percentage` | number | Value between 0-100 |
| `NormalizedValue` | number | Value between 0-1 |
| `Role` | enum | One of: `top`, `jungle`, `mid`, `adc`, `support` |

---

## Response Structure

### TeamAnalysisReport (Root)

```json
{
  "reportInfo": ReportInfo,
  "overview": OverviewAnalysis,
  "draftPlan": DraftPlan,
  "draftTendencies": DraftTendencies,
  "stablePicks": StablePicksByRole[],
  "scenarios": ScenarioCard[],
  "playerAnalysis": PlayerAnalysis[]
}
```

---

### ReportInfo

Basic metadata about the analysis report.

```json
{
  "teamId": "karmine-corp",
  "teamName": "Karmine Corp",
  "gamesAnalyzed": 20,
  "opponentWinrate": 40.0,
  "averageKills": 11.9,
  "averageDeaths": 12.3,
  "players": [
    {
      "playerId": "player-1",
      "nickname": "Cabochard",
      "role": "top"
    }
  ],
  "timeframe": {
    "startDate": "2024-01-01",
    "endDate": "2024-03-15",
    "patchVersion": "14.5"
  },
  "generatedAt": "2024-03-15T10:30:00Z"
}
```

---

### OverviewAnalysis

High-level team behavior analysis.

```json
{
  "randomness": "chaotic",
  "randomnessScore": 0.78,
  "strategicInsights": [
    "Prepare principles and flexible answers",
    "Prioritize comfort denial",
    "Expect multiple styles"
  ]
}
```

| Field | Description |
|-------|-------------|
| `randomness` | Categorical: `predictable`, `moderate`, `chaotic` |
| `randomnessScore` | 0-1 numeric score backing the category |
| `strategicInsights` | Actionable recommendations (max 5) |

---

### DraftPlan

Recommended draft strategy against the opponent.

```json
{
  "banPlan": ["Sejuani", "Gnar", "Rakan", "LeeSin", "Orianna"],
  "draftPriority": "flexibility",
  "counterPicks": [
    {
      "targetChampion": "Sejuani",
      "suggestedCounters": ["Lillia", "Kindred"]
    }
  ],
  "strategicNotes": [
    "Keep answers ready for Sejuani, Gnar, Rakan, Azir, Rumble",
    "Focus on denying engage supports",
    "Prioritize adaptable comps over single hard reads"
  ]
}
```

| Field | Description |
|-------|-------------|
| `banPlan` | Ordered list of recommended bans (first = highest priority) |
| `draftPriority` | Primary draft strategy: `flexibility`, `comfort`, `counter`, `early_power` |
| `counterPicks` | Specific counter-pick recommendations |
| `strategicNotes` | Free-form strategic guidance |

---

### DraftTendencies

Opponent's historical pick patterns.

```json
{
  "priorityPicks": [
    {
      "championId": "Sejuani",
      "pickRate": 65.0,
      "banRate": 45.0,
      "priority": 1
    }
  ]
}
```

**Note:** `priorityPicks` should be sorted by `priority` (1 = highest).

---

### StablePicksByRole

Champion picks grouped by role with performance data.

```json
{
  "role": "jungle",
  "picks": [
    {
      "championId": "Sejuani",
      "role": "jungle",
      "gamesPlayed": 8,
      "winrate": 62.5,
      "kda": 3.2,
      "isSignaturePick": true
    }
  ]
}
```

| Field | Description |
|-------|-------------|
| `isSignaturePick` | true if this is a comfort/signature champion |
| `kda` | (Kills + Assists) / Deaths ratio |

---

### ScenarioCard

Predicted game scenarios with strategy recommendations.

**Important:** Sort by `likelihood` descending when sending to frontend.

```json
{
  "scenarioId": "teamfight-comp",
  "name": "Teamfight Composition",
  "description": "Heavy engage with AOE damage",
  "likelihood": 45.0,
  "winrate": 52.0,
  "stats": {
    "teamfightiness": 0.85,
    "earlyAggression": 0.30,
    "draftVolatility": 0.45,
    "macro": 0.60
  },
  "punishStrategy": {
    "action": "ban",
    "targets": ["Gnar", "Maokai"],
    "description": "Ban Gnar, Maokai to deny engage frontline"
  }
}
```

#### ScenarioStats Dimensions

| Dimension | Description | Low (0) | High (1) |
|-----------|-------------|---------|----------|
| `teamfightiness` | Tendency for 5v5 fights | Split/pick focused | Group and fight |
| `earlyAggression` | Early game pressure | Scaling/passive | Invades/dives |
| `draftVolatility` | Draft predictability | Standard picks | Flex/surprise picks |
| `macro` | Map play sophistication | Mechanical focus | Rotations/objectives |

**Extensibility:** Additional stats can be added to `stats` object. Frontend will display any keys present.

#### PunishStrategy Actions

| Action | Description |
|--------|-------------|
| `ban` | Remove champions from the pool |
| `pick` | Prioritize picking these champions |
| `counter` | Prepare specific counter-picks |
| `playstyle` | Adjust game approach (description explains) |

---

### PlayerAnalysis

Individual player breakdown.

```json
{
  "playerId": "player-1",
  "nickname": "Cabochard",
  "role": "top",
  "entropy": 0.72,
  "championPool": [
    {
      "championId": "Gnar",
      "gamesPlayed": 5,
      "winrate": 60.0,
      "isComfort": true
    }
  ],
  "tendencies": {
    "earlyGameAggression": 0.65,
    "teamfightParticipation": 0.80,
    "soloKillRate": 0.45,
    "visionScore": 0.55
  }
}
```

#### Entropy Scale

| Range | Interpretation |
|-------|----------------|
| 0.0 - 0.3 | Very predictable, narrow pool |
| 0.3 - 0.6 | Moderate variety |
| 0.6 - 1.0 | Highly unpredictable, wide pool |

---

## Error Responses

```json
{
  "error": {
    "code": "TEAM_NOT_FOUND",
    "message": "Team with ID 'xyz' not found",
    "details": {}
  }
}
```

| HTTP Status | Code | Description |
|-------------|------|-------------|
| 404 | `TEAM_NOT_FOUND` | Team ID doesn't exist |
| 400 | `INVALID_TIMEFRAME` | Invalid date range |
| 500 | `ANALYSIS_FAILED` | Internal processing error |

---

## Implementation Notes

1. **Champion IDs**: Use consistent naming (PascalCase, no spaces). Map to Data Dragon API names.
2. **Percentages**: Always 0-100, not 0-1. Frontend displays with % symbol.
3. **Normalized Values**: Always 0-1 for radar charts and progress bars.
4. **Sorting**: `scenarios` by likelihood DESC, `priorityPicks` by priority ASC.
5. **Timestamps**: ISO 8601 format with timezone (prefer UTC).
