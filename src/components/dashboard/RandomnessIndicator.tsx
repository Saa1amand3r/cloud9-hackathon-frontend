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
    label: 'Predictable',
    color: semanticColors.positive.main,
    description: 'Consistent patterns, easy to prepare against',
  },
  moderate: {
    label: 'Moderate',
    color: semanticColors.warning.main,
    description: 'Some variation, balanced preparation needed',
  },
  chaotic: {
    label: 'Chaotic',
    color: semanticColors.danger.main,
    description: 'High variance, flexible strategies required',
  },
};

export function RandomnessIndicator({
  level,
  score,
  sx,
}: RandomnessIndicatorProps) {
  const config = levelConfig[level];

  return (
    <Tooltip title={config.description} arrow placement="top">
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1,
          px: 1.5,
          py: 0.75,
          borderRadius: 2,
          bgcolor: `${config.color}15`,
          border: '1px solid',
          borderColor: `${config.color}30`,
          cursor: 'help',
          ...sx,
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: config.color,
            animation: level === 'chaotic' ? 'pulse 1.5s infinite' : 'none',
            '@keyframes pulse': {
              '0%, 100%': { opacity: 1 },
              '50%': { opacity: 0.5 },
            },
          }}
        />
        <Typography
          variant="body2"
          sx={{ fontWeight: 600, color: config.color }}
        >
          {config.label}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: 'text.secondary', fontVariantNumeric: 'tabular-nums' }}
        >
          ({(score * 100).toFixed(0)}%)
        </Typography>
      </Box>
    </Tooltip>
  );
}
