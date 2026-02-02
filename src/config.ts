/**
 * Application configuration
 *
 * Configuration is loaded from environment variables with sensible defaults.
 * In development, Vite loads variables from .env files.
 */

export const config = {
  /**
   * Backend API base URL
   * Set via VITE_API_BASE_URL environment variable
   * Defaults to localhost:8000 for development
   */
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',

  /**
   * WebSocket URL for report generation
   * Set via VITE_WS_URL environment variable
   * Defaults to localhost:8000/ws/report for development
   */
  wsUrl: import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws/report',

  /**
   * Use fake/mock mode for development
   * Set via VITE_USE_MOCK environment variable
   * Defaults to false (use real backend)
   */
  useMock: import.meta.env.VITE_USE_MOCK === 'true',

  /**
   * Your team name (for matchup context)
   * Set via VITE_OUR_TEAM environment variable
   */
  ourTeam: import.meta.env.VITE_OUR_TEAM || 'Cloud9',
} as const;

export type Config = typeof config;
