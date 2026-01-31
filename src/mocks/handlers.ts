import { http, HttpResponse, delay } from 'msw';
import { mockTeamAnalysis } from './data';

const API_BASE = '/api';

export const handlers = [
  http.get(`${API_BASE}/teams/:teamId/analysis`, async ({ params }) => {
    // Simulate network delay for realistic feel
    await delay(800);

    const { teamId } = params;

    // For now, return mock data for any team ID
    // In production, this would validate the teamId
    if (teamId === 'not-found') {
      return HttpResponse.json(
        {
          error: {
            code: 'TEAM_NOT_FOUND',
            message: `Team with ID '${teamId}' not found`,
            details: {},
          },
        },
        { status: 404 }
      );
    }

    return HttpResponse.json(mockTeamAnalysis);
  }),
];
