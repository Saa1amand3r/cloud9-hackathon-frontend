# Cloudy Poro Backend API Specification

This document describes the API contract for the Cloudy Poro esports analytics platform backend.
The frontend expects a **Python FastAPI** backend with REST endpoints and WebSocket support.

---

## Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [REST Endpoints](#rest-endpoints)
4. [WebSocket Protocol](#websocket-protocol)
5. [Data Models (Pydantic)](#data-models-pydantic)
6. [Example Responses](#example-responses)
7. [Error Handling](#error-handling)
8. [CORS Configuration](#cors-configuration)

---

## Overview

### Base URL
```
Production: https://api.cloudyporo.com
Development: http://localhost:8000
```

### Technology Stack
- **Framework**: FastAPI
- **WebSocket**: FastAPI WebSocket support
- **Validation**: Pydantic v2
- **Async**: Use async/await for all endpoints

---

## Authentication

For the demo/hackathon, authentication is simplified:

### Login Endpoint
```
POST /auth/login
```

**Request Body:**
```json
{
  "team": "cloud9"
}
```

**Response:**
```json
{
  "token": "demo-token-cloud9",
  "team": {
    "id": "cloud9",
    "name": "Cloud9"
  }
}
```

> **Note**: For production, implement proper OAuth2/JWT authentication.

---

## REST Endpoints

### 1. Get Team Analysis Report

Retrieves a complete analysis report for a target opponent team.

```
GET /api/v1/analysis/{team_id}
```

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| team_id | string | Target team identifier (e.g., "t1", "geng", "fnatic") |

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| start_date | string (ISO 8601) | No | Filter games from this date |
| end_date | string (ISO 8601) | No | Filter games until this date |
| patch_version | string | No | Filter by game patch (e.g., "14.5") |
| last_n_games | integer | No | Analyze only last N games |
| include_player_analysis | boolean | No | Include detailed player analysis (default: true) |

**Response:** `TeamAnalysisReport` (see Data Models)

**Example:**
```bash
GET /api/v1/analysis/t1?last_n_games=20&include_player_analysis=true
```

---

### 2. Search Teams

Search for teams by name (for autocomplete/suggestions).

```
GET /api/v1/teams/search
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| q | string | Yes | Search query (min 2 characters) |
| limit | integer | No | Max results (default: 10) |

**Response:**
```json
{
  "teams": [
    { "id": "t1", "name": "T1", "region": "LCK" },
    { "id": "team-liquid", "name": "Team Liquid", "region": "LCS" }
  ]
}
```

---

### 3. List Available Teams

Get all teams available for analysis.

```
GET /api/v1/teams
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| region | string | No | Filter by region (LCK, LEC, LCS, LPL, etc.) |

**Response:**
```json
{
  "teams": [
    { "id": "t1", "name": "T1", "region": "LCK" },
    { "id": "geng", "name": "Gen.G", "region": "LCK" },
    { "id": "fnatic", "name": "Fnatic", "region": "LEC" }
  ]
}
```

---

## WebSocket Protocol

The WebSocket endpoint is used for real-time report generation progress updates.

### Connection URL
```
ws://localhost:8000/ws/report
wss://api.cloudyporo.com/ws/report
```

### Flow

1. **Client connects** to WebSocket
2. **Client sends** generation request:
   ```json
   { "action": "generate", "teamName": "T1" }
   ```
3. **Server sends** progress updates:
   ```json
   { "status": "processing", "progress": 25, "message": "Fetching match history..." }
   ```
4. **Server sends** completion:
   ```json
   { "status": "completed", "progress": 100, "message": "Report ready!" }
   ```
5. **Client fetches** full report via REST endpoint

### WebSocket Message Types

#### Client -> Server

**Generate Report Request:**
```json
{
  "action": "generate",
  "teamName": "T1"
}
```

#### Server -> Client

**Progress Update:**
```json
{
  "status": "connecting" | "processing" | "completed" | "error",
  "progress": 0-100,
  "message": "Human-readable status message"
}
```

### Status Values

| Status | Description |
|--------|-------------|
| `connecting` | Initial connection established |
| `processing` | Report generation in progress |
| `completed` | Report ready to fetch |
| `error` | An error occurred |

### Recommended Progress Steps

Send progress updates at these milestones:
1. `10%` - Connecting to data sources
2. `25%` - Fetching match history
3. `45%` - Analyzing draft patterns
4. `65%` - Processing player statistics
5. `80%` - Generating AI insights (pause here for LLM processing)
6. `90%` - Finalizing report
7. `95%` - Almost done
8. `100%` - Report ready

### FastAPI WebSocket Example

```python
from fastapi import FastAPI, WebSocket
import json
import asyncio

app = FastAPI()

@app.websocket("/ws/report")
async def websocket_report(websocket: WebSocket):
    await websocket.accept()

    try:
        # Receive generation request
        data = await websocket.receive_text()
        request = json.loads(data)
        team_name = request.get("teamName")

        # Send progress updates
        await websocket.send_json({
            "status": "processing",
            "progress": 10,
            "message": "Connecting to data sources..."
        })

        await asyncio.sleep(0.5)  # Simulate work

        await websocket.send_json({
            "status": "processing",
            "progress": 25,
            "message": "Fetching match history..."
        })

        # ... continue with actual processing ...

        # When done with AI processing:
        await websocket.send_json({
            "status": "completed",
            "progress": 100,
            "message": "Report ready!"
        })

    except Exception as e:
        await websocket.send_json({
            "status": "error",
            "progress": 0,
            "message": str(e)
        })
    finally:
        await websocket.close()
```

---

## Data Models (Pydantic)

### Core Types

```python
from pydantic import BaseModel, Field
from typing import Literal, Optional
from datetime import datetime

# Type aliases
ChampionId = str  # e.g., "Sejuani", "Gnar"
PlayerId = str
TeamId = str
Percentage = float  # 0-100
NormalizedValue = float  # 0-1

Role = Literal["top", "jungle", "mid", "adc", "support"]
RandomnessLevel = Literal["predictable", "moderate", "chaotic"]
DraftPriority = Literal["flexibility", "comfort", "counter", "early_power"]
PunishAction = Literal["ban", "pick", "counter", "playstyle"]
```

### Report Metadata

```python
class PlayerSummary(BaseModel):
    player_id: PlayerId = Field(alias="playerId")
    nickname: str
    role: Role

class TimeframeInfo(BaseModel):
    start_date: str = Field(alias="startDate")  # ISO 8601 date
    end_date: str = Field(alias="endDate")
    patch_version: Optional[str] = Field(None, alias="patchVersion")

class ReportInfo(BaseModel):
    team_id: TeamId = Field(alias="teamId")
    team_name: str = Field(alias="teamName")
    games_analyzed: int = Field(alias="gamesAnalyzed")
    opponent_winrate: Percentage = Field(alias="opponentWinrate")
    average_kills: float = Field(alias="averageKills")
    average_deaths: float = Field(alias="averageDeaths")
    players: list[PlayerSummary]
    timeframe: TimeframeInfo
    generated_at: str = Field(alias="generatedAt")  # ISO 8601 timestamp

    class Config:
        populate_by_name = True
```

### Overview & Analysis

```python
class OverviewAnalysis(BaseModel):
    randomness: RandomnessLevel
    randomness_score: NormalizedValue = Field(alias="randomnessScore")
    strategic_insights: list[str] = Field(alias="strategicInsights")

    class Config:
        populate_by_name = True
```

### Draft Analysis

```python
class CounterPickStrategy(BaseModel):
    target_champion: ChampionId = Field(alias="targetChampion")
    suggested_counters: list[ChampionId] = Field(alias="suggestedCounters")

    class Config:
        populate_by_name = True

class DraftPlan(BaseModel):
    ban_plan: list[ChampionId] = Field(alias="banPlan")
    draft_priority: DraftPriority = Field(alias="draftPriority")
    counter_picks: list[CounterPickStrategy] = Field(alias="counterPicks")
    strategic_notes: list[str] = Field(alias="strategicNotes")

    class Config:
        populate_by_name = True

class ChampionPriority(BaseModel):
    champion_id: ChampionId = Field(alias="championId")
    pick_rate: Percentage = Field(alias="pickRate")
    ban_rate: Percentage = Field(alias="banRate")
    priority: int  # 1 = highest priority

    class Config:
        populate_by_name = True

class DraftTendencies(BaseModel):
    priority_picks: list[ChampionPriority] = Field(alias="priorityPicks")

    class Config:
        populate_by_name = True
```

### Stable Picks

```python
class StablePick(BaseModel):
    champion_id: ChampionId = Field(alias="championId")
    role: Role
    games_played: int = Field(alias="gamesPlayed")
    winrate: Percentage
    kda: float
    is_signature_pick: bool = Field(alias="isSignaturePick")

    class Config:
        populate_by_name = True

class StablePicksByRole(BaseModel):
    role: Role
    picks: list[StablePick]
```

### Scenario Analysis

```python
class ScenarioStats(BaseModel):
    teamfightiness: NormalizedValue
    early_aggression: NormalizedValue = Field(alias="earlyAggression")
    draft_volatility: NormalizedValue = Field(alias="draftVolatility")
    macro: NormalizedValue

    class Config:
        populate_by_name = True
        extra = "allow"  # Allow additional stats

class PunishStrategy(BaseModel):
    action: PunishAction
    targets: list[ChampionId]
    description: str

class ScenarioCard(BaseModel):
    scenario_id: str = Field(alias="scenarioId")
    name: str
    description: Optional[str] = None
    likelihood: Percentage
    winrate: Percentage
    stats: ScenarioStats
    punish_strategy: PunishStrategy = Field(alias="punishStrategy")

    class Config:
        populate_by_name = True
```

### Player Analysis

```python
class ChampionPoolEntry(BaseModel):
    champion_id: ChampionId = Field(alias="championId")
    games_played: int = Field(alias="gamesPlayed")
    winrate: Percentage
    is_comfort: bool = Field(alias="isComfort")

    class Config:
        populate_by_name = True

class PlayerTendencies(BaseModel):
    early_game_aggression: NormalizedValue = Field(alias="earlyGameAggression")
    teamfight_participation: NormalizedValue = Field(alias="teamfightParticipation")
    solo_kill_rate: NormalizedValue = Field(alias="soloKillRate")
    vision_score: NormalizedValue = Field(alias="visionScore")

    class Config:
        populate_by_name = True

class PlayerAnalysis(BaseModel):
    player_id: PlayerId = Field(alias="playerId")
    nickname: str
    role: Role
    entropy: NormalizedValue  # 0-1, higher = wider pool
    champion_pool: list[ChampionPoolEntry] = Field(alias="championPool")
    tendencies: PlayerTendencies

    class Config:
        populate_by_name = True
```

### Main Response Model

```python
class TeamAnalysisReport(BaseModel):
    report_info: ReportInfo = Field(alias="reportInfo")
    overview: OverviewAnalysis
    draft_plan: DraftPlan = Field(alias="draftPlan")
    draft_tendencies: DraftTendencies = Field(alias="draftTendencies")
    stable_picks: list[StablePicksByRole] = Field(alias="stablePicks")
    scenarios: list[ScenarioCard]
    player_analysis: list[PlayerAnalysis] = Field(alias="playerAnalysis")

    class Config:
        populate_by_name = True
```

### WebSocket Models

```python
class ReportGenerateRequest(BaseModel):
    action: Literal["generate"]
    team_name: str = Field(alias="teamName")

    class Config:
        populate_by_name = True

class ReportProgress(BaseModel):
    status: Literal["connecting", "processing", "completed", "error"]
    progress: int = Field(ge=0, le=100)
    message: Optional[str] = None
```

---

## Example Responses

### Full Team Analysis Report

```json
{
  "reportInfo": {
    "teamId": "t1",
    "teamName": "T1",
    "gamesAnalyzed": 20,
    "opponentWinrate": 40,
    "averageKills": 11.9,
    "averageDeaths": 12.3,
    "players": [
      { "playerId": "p1", "nickname": "Zeus", "role": "top" },
      { "playerId": "p2", "nickname": "Oner", "role": "jungle" },
      { "playerId": "p3", "nickname": "Faker", "role": "mid" },
      { "playerId": "p4", "nickname": "Gumayusi", "role": "adc" },
      { "playerId": "p5", "nickname": "Keria", "role": "support" }
    ],
    "timeframe": {
      "startDate": "2024-01-01",
      "endDate": "2024-03-15",
      "patchVersion": "14.5"
    },
    "generatedAt": "2024-03-15T10:30:00Z"
  },
  "overview": {
    "randomness": "moderate",
    "randomnessScore": 0.55,
    "strategicInsights": [
      "T1 shows consistent early game patterns - expect aggressive jungle invades.",
      "Faker tends to roam after level 6 - ward river entrances.",
      "Their bot lane plays for scaling - punish early with lane kingdom picks."
    ]
  },
  "draftPlan": {
    "banPlan": ["Azir", "Viego", "Nautilus", "Maokai", "Orianna"],
    "draftPriority": "counter",
    "counterPicks": [
      {
        "targetChampion": "Azir",
        "suggestedCounters": ["Syndra", "Xerath"]
      }
    ],
    "strategicNotes": [
      "Consider blue side for counter-pick advantage in mid lane."
    ]
  },
  "draftTendencies": {
    "priorityPicks": [
      { "championId": "Azir", "pickRate": 70, "banRate": 55, "priority": 1 },
      { "championId": "Viego", "pickRate": 60, "banRate": 40, "priority": 2 }
    ]
  },
  "stablePicks": [
    {
      "role": "mid",
      "picks": [
        {
          "championId": "Azir",
          "role": "mid",
          "gamesPlayed": 12,
          "winrate": 75.0,
          "kda": 5.2,
          "isSignaturePick": true
        }
      ]
    }
  ],
  "scenarios": [
    {
      "scenarioId": "teamfight-heavy",
      "name": "Teamfight Heavy",
      "description": "Strong 5v5 with AOE engage",
      "likelihood": 45,
      "winrate": 52,
      "stats": {
        "teamfightiness": 0.85,
        "earlyAggression": 0.30,
        "draftVolatility": 0.40,
        "macro": 0.55
      },
      "punishStrategy": {
        "action": "ban",
        "targets": ["Gnar", "Maokai"],
        "description": "Ban Gnar, Maokai to deny engage frontline"
      }
    }
  ],
  "playerAnalysis": [
    {
      "playerId": "p3",
      "nickname": "Faker",
      "role": "mid",
      "entropy": 0.72,
      "championPool": [
        { "championId": "Azir", "gamesPlayed": 12, "winrate": 75.0, "isComfort": true },
        { "championId": "Orianna", "gamesPlayed": 6, "winrate": 66.7, "isComfort": true }
      ],
      "tendencies": {
        "earlyGameAggression": 0.55,
        "teamfightParticipation": 0.88,
        "soloKillRate": 0.42,
        "visionScore": 0.75
      }
    }
  ]
}
```

---

## Error Handling

### Error Response Format

```json
{
  "error": {
    "code": "TEAM_NOT_FOUND",
    "message": "Team with ID 'unknown-team' not found",
    "details": null
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `TEAM_NOT_FOUND` | 404 | Requested team does not exist |
| `INVALID_REQUEST` | 400 | Invalid request parameters |
| `ANALYSIS_FAILED` | 500 | Report generation failed |
| `RATE_LIMITED` | 429 | Too many requests |
| `UNAUTHORIZED` | 401 | Invalid or missing auth token |

### FastAPI Exception Handler

```python
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse

app = FastAPI()

class APIError(Exception):
    def __init__(self, code: str, message: str, status_code: int = 400):
        self.code = code
        self.message = message
        self.status_code = status_code

@app.exception_handler(APIError)
async def api_error_handler(request, exc: APIError):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": {
                "code": exc.code,
                "message": exc.message,
                "details": None
            }
        }
    )
```

---

## CORS Configuration

The frontend runs on `http://localhost:5173` during development.

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite dev server
        "http://localhost:3000",  # Alternative dev port
        "https://cloudyporo.com",  # Production
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Quick Start Template

Here's a minimal FastAPI server to get started:

```python
from fastapi import FastAPI, WebSocket, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
import asyncio

app = FastAPI(title="Cloudy Poro API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simple auth endpoint
@app.post("/auth/login")
async def login(body: dict):
    return {
        "token": f"demo-token-{body.get('team', 'unknown')}",
        "team": {"id": body.get("team"), "name": body.get("team", "").title()}
    }

# Team analysis endpoint
@app.get("/api/v1/analysis/{team_id}")
async def get_analysis(team_id: str):
    # TODO: Replace with actual analysis logic
    # Return mock data for now
    return {
        "reportInfo": { ... },
        "overview": { ... },
        # ... full TeamAnalysisReport
    }

# WebSocket for progress
@app.websocket("/ws/report")
async def websocket_report(websocket: WebSocket):
    await websocket.accept()

    try:
        data = await websocket.receive_text()
        request = json.loads(data)
        team_name = request.get("teamName", "Unknown")

        # Progress updates
        steps = [
            (10, "Connecting to data sources..."),
            (25, "Fetching match history..."),
            (45, "Analyzing draft patterns..."),
            (65, "Processing player statistics..."),
            (80, f"Generating AI analysis for {team_name}..."),
        ]

        for progress, message in steps:
            await websocket.send_json({
                "status": "processing",
                "progress": progress,
                "message": message
            })
            await asyncio.sleep(0.5)

        # Simulate AI processing
        await asyncio.sleep(2)

        # Final steps
        for progress, message in [(90, "Finalizing..."), (95, "Almost done..."), (100, "Report ready!")]:
            await websocket.send_json({
                "status": "processing" if progress < 100 else "completed",
                "progress": progress,
                "message": message
            })
            await asyncio.sleep(0.3)

    except Exception as e:
        await websocket.send_json({
            "status": "error",
            "progress": 0,
            "message": str(e)
        })

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

---

## Frontend Integration

To connect the frontend to your backend:

1. Update `src/services/reportWebSocket.ts`:
   ```typescript
   const ws = createReportWebSocket({
     useFake: false,
     url: 'ws://localhost:8000/ws/report'
   });
   ```

2. Update API base URL in the fetch calls (create environment config):
   ```typescript
   const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';
   ```

---

## Notes for Implementation

1. **Champion IDs**: Use standard Riot champion names (e.g., "Sejuani", "LeeSin", "KogMaw")

2. **Entropy Calculation**: Player entropy should be calculated based on champion pool diversity:
   - Higher entropy (0.7-1.0) = Wide champion pool, unpredictable
   - Medium entropy (0.4-0.7) = Moderate variety
   - Low entropy (0-0.4) = Limited pool, predictable

3. **Randomness Score**: Team randomness based on draft variance across games

4. **Scenario Likelihood**: Should sum to approximately 100% across all scenarios

5. **Data Dragon**: Champion icons are fetched from Riot's Data Dragon CDN by the frontend:
   ```
   https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/{championId}.png
   ```
   Ensure champion IDs match Data Dragon naming conventions.
