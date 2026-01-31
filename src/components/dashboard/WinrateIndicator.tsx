import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import { semanticColors } from '../../theme';

interface WinrateIndicatorProps {
  winrate: number;
  showPercent?: boolean;
  size?: 'small' | 'medium';
  sx?: SxProps<Theme>;
}

function getWinrateColor(winrate: number): string {
  if (winrate >= 55) return semanticColors.positive.main;
  if (winrate >= 50) return semanticColors.positive.light;
  if (winrate >= 45) return semanticColors.warning.main;
  return semanticColors.danger.main;
}

export function WinrateIndicator({
  winrate,
  showPercent = true,
  size = 'medium',
  sx,
}: WinrateIndicatorProps) {
  const color = getWinrateColor(winrate);
  const variant = size === 'small' ? 'caption' : 'body2';

  return (
    <Typography
      variant={variant}
      sx={{
        color,
        fontWeight: 600,
        fontVariantNumeric: 'tabular-nums',
        ...sx,
      }}
    >
      {winrate.toFixed(1)}{showPercent && '%'}
    </Typography>
  );
}
