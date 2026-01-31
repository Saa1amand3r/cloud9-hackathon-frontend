import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import { ChampionIcon } from './ChampionIcon';

interface ChampionChipProps {
  championId: string;
  variant?: 'default' | 'ban' | 'pick';
  sx?: SxProps<Theme>;
}

const variantStyles = {
  default: {
    bgcolor: 'action.hover',
    borderColor: 'divider',
  },
  ban: {
    bgcolor: 'rgba(153, 27, 27, 0.15)',
    borderColor: 'rgba(153, 27, 27, 0.3)',
  },
  pick: {
    bgcolor: 'rgba(22, 101, 52, 0.15)',
    borderColor: 'rgba(22, 101, 52, 0.3)',
  },
};

export function ChampionChip({
  championId,
  variant = 'default',
  sx,
}: ChampionChipProps) {
  const styles = variantStyles[variant];

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        px: 1.5,
        py: 0.75,
        borderRadius: 1.5,
        border: '1px solid',
        ...styles,
        ...sx,
      }}
    >
      <ChampionIcon championId={championId} size={28} showTooltip={false} />
      <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>
        {championId}
      </Typography>
    </Box>
  );
}
