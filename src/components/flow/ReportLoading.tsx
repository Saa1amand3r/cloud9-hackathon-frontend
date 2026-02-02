import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { createReportWebSocket, type ReportProgress } from '../../services/reportWebSocket';
import { semanticColors } from '../../theme';

interface ReportLoadingProps {
  teamName: string;
  onComplete: () => void;
}

export function ReportLoading({ teamName, onComplete }: ReportLoadingProps) {
  const [progress, setProgress] = useState<ReportProgress>({
    status: 'connecting',
    progress: 0,
    message: 'Initializing...',
  });

  const wsRef = useRef<ReturnType<typeof createReportWebSocket> | null>(null);

  useEffect(() => {
    // Create WebSocket connection (uses config defaults)
    const ws = createReportWebSocket();
    wsRef.current = ws;

    ws.onProgress((p) => {
      setProgress(p);

      if (p.status === 'completed') {
        // Small delay before transitioning to show 100%
        setTimeout(onComplete, 500);
      }
    });

    ws.connect(teamName);

    return () => {
      ws.disconnect();
    };
  }, [teamName, onComplete]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        p: 3,
      }}
    >
      <Box
        sx={{
          maxWidth: 500,
          width: '100%',
          textAlign: 'center',
        }}
      >
        {/* Animated Logo */}
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            bgcolor: `${semanticColors.accent.main}20`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 4,
            animation: 'pulse 2s ease-in-out infinite',
            '@keyframes pulse': {
              '0%, 100%': {
                transform: 'scale(1)',
                boxShadow: `0 0 0 0 ${semanticColors.accent.main}40`,
              },
              '50%': {
                transform: 'scale(1.05)',
                boxShadow: `0 0 0 20px ${semanticColors.accent.main}00`,
              },
            },
          }}
        >
          <Typography
            sx={{
              fontSize: '2.5rem',
              fontWeight: 800,
              color: semanticColors.accent.main,
            }}
          >
            C9
          </Typography>
        </Box>

        {/* Team Name */}
        <Typography
          sx={{
            fontSize: '1.5rem',
            fontWeight: 600,
            mb: 1,
          }}
        >
          Analyzing {teamName}
        </Typography>

        {/* Status Message */}
        <Typography
          color="text.secondary"
          sx={{
            fontSize: '1.1rem',
            mb: 4,
            minHeight: 28,
          }}
        >
          {progress.message}
        </Typography>

        {/* Progress Bar */}
        <Box sx={{ mb: 2 }}>
          <LinearProgress
            variant="determinate"
            value={progress.progress}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: 'action.hover',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                bgcolor: semanticColors.accent.main,
                transition: 'transform 0.4s ease-out',
              },
            }}
          />
        </Box>

        {/* Progress Percentage */}
        <Typography
          sx={{
            fontSize: '1.25rem',
            fontWeight: 600,
            color: semanticColors.accent.main,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {progress.progress}%
        </Typography>
      </Box>
    </Box>
  );
}
