# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (Vite with HMR)
npm run build    # Type-check with TypeScript and build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build locally
```

## Architecture

This is a React 19 + TypeScript esports analytics dashboard using Vite and Material UI v7.

### Domain Types

- **`src/types/domain.ts`** - TypeScript types for the Team Analysis API
- **`src/types/types.md`** - Documentation for backend developers describing the API contract

### API Layer

- **`src/api/client.ts`** - API client with `fetchTeamAnalysis()` function
- **`src/hooks/useTeamAnalysis.ts`** - React hook for fetching team analysis data
- **`src/mocks/`** - MSW mock server for development (handlers.ts, data.ts, browser.ts)

### Theming System

The app uses a custom MUI theme with semantic colors designed for dashboard components:

- **`src/theme.ts`** - Central theme configuration with `semanticColors` for consistent meaning-based coloring (accent, positive, warning, danger, highlight, muted). Exports `createAppTheme(mode)` for light/dark variants.
- **`src/contexts/ThemeContext.tsx`** - Theme context provider with `useThemeMode()` hook for toggling light/dark mode. Persists preference to localStorage.

Use `semanticColors` directly when applying semantic meaning to UI elements:
```tsx
import { semanticColors } from './theme'
sx={{ bgcolor: semanticColors.positive.main }}
```

### Component Structure

```
src/components/
├── dashboard/     # Reusable dashboard UI primitives
│   ├── ChampionIcon.tsx      # Champion portrait from Data Dragon CDN
│   ├── ChampionChip.tsx      # Champion name + icon chip
│   ├── ScenarioCard.tsx      # Scenario card with radar chart & glass effect
│   ├── SectionNav.tsx        # Fixed sidebar navigation with anchor links
│   ├── StatCard.tsx          # Stat display card with variants
│   └── ...
├── charts/        # Recharts-based chart components
│   ├── ScenarioRadar.tsx     # Radar chart for scenario stats
│   └── EntropyBar.tsx        # Horizontal bar chart for player entropy
├── sections/      # Dashboard section components
│   ├── ReportInfoSection.tsx
│   ├── OverviewSection.tsx
│   ├── DraftPlanSection.tsx
│   ├── ScenariosSection.tsx
│   └── PlayerAnalysisSection.tsx
└── icons/         # SVG icon components
```

### Pages

- **`src/pages/Dashboard.tsx`** - Main dashboard page assembling all sections with animated transitions

### Grid Layout

Custom responsive grid components in `src/components/Grid.tsx`:
- `<Grid columns={{ xs: 1, md: 2 }} gap={3}>` - Responsive CSS grid wrapper
- `<GridItem span={2}>` - Grid item with optional column span

## Tech Stack

- React 19 with React Compiler enabled (via babel-plugin-react-compiler)
- MUI v7 with Emotion styling
- Recharts for data visualization
- MSW (Mock Service Worker) for API mocking
- Vite 7 build tool
- TypeScript 5.9
