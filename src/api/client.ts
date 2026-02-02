import type { TeamAnalysisReport, TeamAnalysisRequest } from '../types';
import { config } from '../config';

const API_BASE = config.apiBaseUrl;

interface ApiError {
  code: string;
  message: string;
  details: Record<string, unknown>;
}

export class ApiClientError extends Error {
  code: string;
  details: Record<string, unknown>;

  constructor(code: string, message: string, details: Record<string, unknown> = {}) {
    super(message);
    this.name = 'ApiClientError';
    this.code = code;
    this.details = details;
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = (await response.json()) as { error: ApiError };
    throw new ApiClientError(
      errorData.error.code,
      errorData.error.message,
      errorData.error.details
    );
  }
  return response.json() as Promise<T>;
}

export async function fetchTeamAnalysis(
  request: TeamAnalysisRequest
): Promise<TeamAnalysisReport> {
  const { teamId, timeframe, includePlayerAnalysis } = request;

  const params = new URLSearchParams();
  params.set('ourTeam', config.ourTeam);
  if (timeframe?.startDate) params.set('startDate', timeframe.startDate);
  if (timeframe?.endDate) params.set('endDate', timeframe.endDate);
  if (timeframe?.patchVersion) params.set('patchVersion', timeframe.patchVersion);
  if (timeframe?.lastNGames) params.set('lastNGames', String(timeframe.lastNGames));
  if (includePlayerAnalysis !== undefined) {
    params.set('includePlayerAnalysis', String(includePlayerAnalysis));
  }

  const queryString = params.toString();
  const url = `${API_BASE}/api/teams/${teamId}/analysis${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url);
  return handleResponse<TeamAnalysisReport>(response);
}
