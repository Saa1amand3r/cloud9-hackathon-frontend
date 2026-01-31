import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import type { SxProps, Theme } from '@mui/material/styles';
import type { RandomnessLevel } from '../../types';
import { semanticColors } from '../../theme';

interface RandomnessIndicatorProps {
  level: RandomnessLevel;
  score: number;
  sx?: SxProps<Theme>;
}

const levelConfig = {
  predictable: {
    label: 'Highly Predictable',
    color: semanticColors.positive.main,
    description: 'This team follows consistent patterns and drafts. You can prepare specific counters and expect them to stick to their comfort picks.',
  },
  moderate: {
    label: 'Moderately Flexible',
    color: semanticColors.warning.main,
    description: 'This team shows some variation in their approach. They have core strategies but can adapt. Prepare for 2-3 different scenarios.',
  },
  chaotic: {
    label: 'Chaotic',
    color: semanticColors.danger.main,
    description: 'This team is highly unpredictable with diverse strategies and flex picks. Focus on fundamentals and adaptable compositions rather than hard counters.',
  },
};

export function RandomnessIndicator({
  level,
  sx,
}: RandomnessIndicatorProps) {
  const config = levelConfig[level];

  const tooltipContent = (
    <Box sx={{ p: 1, maxWidth: 280 }}>
      <Typography sx={{ fontWeight: 600, mb: 1, fontSize: '0.95rem' }}>
        {config.label}
      </Typography>
      <Typography sx={{ fontSize: '0.85rem', lineHeight: 1.5, color: 'rgba(255,255,255,0.9)' }}>
        {config.description}
      </Typography>
    </Box>
  );

  return (
    <Tooltip title={tooltipContent} arrow placement="bottom">
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1.5,
          px: 2.5,
          py: 1,
          borderRadius: 3,
          bgcolor: `${config.color}20`,
          border: '2px solid',
          borderColor: config.color,
          cursor: 'help',
          transition: 'all 0.2s ease',
          '&:hover': {
            bgcolor: `${config.color}30`,
          },
          ...sx,
        }}
      >
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            bgcolor: config.color,
            animation: level === 'chaotic' ? 'pulse 1.5s infinite' : 'none',
            '@keyframes pulse': {
              '0%, 100%': { opacity: 1 },
              '50%': { opacity: 0.4 },
            },
          }}
        />
        <Typography
          sx={{ fontWeight: 600, color: config.color, fontSize: '1.05rem' }}
        >
          {config.label}
        </Typography>
        <Typography
          sx={{
            color: 'text.secondary',
            fontVariantNumeric: 'tabular-nums',
            fontSize: '0.95rem',
            opacity: 0.8,
          }}
        >
          ?
        </Typography>
      </Box>
    </Tooltip>
  );
}
