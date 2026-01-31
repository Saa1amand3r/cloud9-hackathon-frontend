export type ReportStatus = 'connecting' | 'processing' | 'completed' | 'error';

export interface ReportProgress {
  status: ReportStatus;
  progress: number; // 0-100
  message?: string;
}

export interface ReportWebSocketConfig {
  /** WebSocket URL - for real backend connection */
  url?: string;
  /** Use fake/demo mode */
  useFake?: boolean;
}

type ProgressCallback = (progress: ReportProgress) => void;

/**
 * WebSocket service for report generation progress.
 *
 * Usage with real backend:
 * const ws = createReportWebSocket({ url: 'wss://api.example.com/reports' });
 *
 * Usage with fake (demo mode):
 * const ws = createReportWebSocket({ useFake: true });
 */
export function createReportWebSocket(config: ReportWebSocketConfig = {}) {
  const { url, useFake = true } = config;

  let ws: WebSocket | null = null;
  let onProgressCallback: ProgressCallback | null = null;

  const connect = (teamName: string) => {
    if (useFake) {
      // Fake WebSocket for demo
      runFakeProgress(teamName);
      return;
    }

    // Real WebSocket connection
    if (!url) {
      throw new Error('WebSocket URL is required when not using fake mode');
    }

    ws = new WebSocket(url);

    ws.onopen = () => {
      onProgressCallback?.({ status: 'connecting', progress: 0 });
      // Send the team name to start report generation
      ws?.send(JSON.stringify({ action: 'generate', teamName }));
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as ReportProgress;
        onProgressCallback?.(data);
      } catch {
        console.error('Failed to parse WebSocket message');
      }
    };

    ws.onerror = () => {
      onProgressCallback?.({ status: 'error', progress: 0, message: 'Connection failed' });
    };

    ws.onclose = () => {
      ws = null;
    };
  };

  const runFakeProgress = (teamName: string) => {
    // Simulate realistic report generation progress
    const steps = [
      { progress: 10, message: 'Connecting to data sources...', delay: 200 },
      { progress: 25, message: 'Fetching match history...', delay: 400 },
      { progress: 45, message: 'Analyzing draft patterns...', delay: 500 },
      { progress: 65, message: 'Processing player statistics...', delay: 400 },
      { progress: 80, message: 'Generating insights...', delay: 300 },
      // Pause at 80% to simulate "waiting for AI"
    ];

    let currentStep = 0;

    onProgressCallback?.({ status: 'connecting', progress: 0, message: 'Initializing...' });

    const runStep = () => {
      if (currentStep < steps.length) {
        const step = steps[currentStep];
        onProgressCallback?.({
          status: 'processing',
          progress: step.progress,
          message: step.message
        });
        currentStep++;
        setTimeout(runStep, step.delay);
      } else {
        // After reaching 80%, simulate AI processing time
        onProgressCallback?.({
          status: 'processing',
          progress: 80,
          message: `Generating AI analysis for ${teamName}...`
        });

        // Simulate final processing (this is where real WebSocket would wait)
        setTimeout(() => {
          onProgressCallback?.({ status: 'processing', progress: 90, message: 'Finalizing report...' });
          setTimeout(() => {
            onProgressCallback?.({ status: 'processing', progress: 95, message: 'Almost done...' });
            setTimeout(() => {
              onProgressCallback?.({ status: 'completed', progress: 100, message: 'Report ready!' });
            }, 400);
          }, 500);
        }, 1500); // Simulated AI wait time
      }
    };

    setTimeout(runStep, 300);
  };

  const disconnect = () => {
    if (ws) {
      ws.close();
      ws = null;
    }
  };

  const onProgress = (callback: ProgressCallback) => {
    onProgressCallback = callback;
  };

  return {
    connect,
    disconnect,
    onProgress,
  };
}
