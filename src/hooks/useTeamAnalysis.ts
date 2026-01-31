import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import type { TeamAnalysisReport, TeamAnalysisRequest } from '../types';
import { fetchTeamAnalysis, ApiClientError } from '../api/client';

interface UseTeamAnalysisState {
  data: TeamAnalysisReport | null;
  isLoading: boolean;
  error: ApiClientError | Error | null;
}

interface UseTeamAnalysisReturn extends UseTeamAnalysisState {
  refetch: () => void;
}

// Initial state when no request is provided
const EMPTY_STATE: UseTeamAnalysisState = {
  data: null,
  isLoading: false,
  error: null,
};

export function useTeamAnalysis(
  request: TeamAnalysisRequest | null
): UseTeamAnalysisReturn {
  // Use initial state based on whether request is provided
  const initialState = useMemo<UseTeamAnalysisState>(
    () => (request ? { data: null, isLoading: true, error: null } : EMPTY_STATE),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [] // Only compute once on mount
  );

  const [state, setState] = useState<UseTeamAnalysisState>(initialState);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!request) return;

    // Abort previous request if any
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    let isCancelled = false;

    const doFetch = async () => {
      try {
        const data = await fetchTeamAnalysis(request);
        if (!isCancelled) {
          setState({ data, isLoading: false, error: null });
        }
      } catch (err) {
        if (!isCancelled) {
          const error = err instanceof Error ? err : new Error('Unknown error');
          setState({ data: null, isLoading: false, error });
        }
      }
    };

    doFetch();

    return () => {
      isCancelled = true;
      abortControllerRef.current?.abort();
    };
  }, [request]);

  const refetch = useCallback(() => {
    if (request) {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      fetchTeamAnalysis(request)
        .then((data) => setState({ data, isLoading: false, error: null }))
        .catch((err) => {
          const error = err instanceof Error ? err : new Error('Unknown error');
          setState((prev) => ({ ...prev, isLoading: false, error }));
        });
    }
  }, [request]);

  return {
    ...state,
    refetch,
  };
}
