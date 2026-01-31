import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import type { SxProps, Theme } from '@mui/material/styles';

const DDRAGON_VERSION = '14.5.1';
const DDRAGON_BASE = `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}`;

interface ChampionIconProps {
  championId: string;
  size?: number;
  showTooltip?: boolean;
  sx?: SxProps<Theme>;
}

function getChampionImageUrl(championId: string): string {
  // Handle special cases for champion IDs
  const normalizedId = championId
    .replace(/\s+/g, '')
    .replace("'", '')
    .replace('.', '');
  return `${DDRAGON_BASE}/img/champion/${normalizedId}.png`;
}

export function ChampionIcon({
  championId,
  size = 32,
  showTooltip = true,
  sx,
}: ChampionIconProps) {
  const icon = (
    <Box
      component="img"
      src={getChampionImageUrl(championId)}
      alt={championId}
      onError={(e) => {
        // Fallback to placeholder on error
        e.currentTarget.src = `https://placehold.co/${size}x${size}/1a5f7a/fff?text=${championId.charAt(0)}`;
      }}
      sx={{
        width: size,
        height: size,
        borderRadius: 1,
        objectFit: 'cover',
        ...sx,
      }}
    />
  );

  if (!showTooltip) return icon;

  return (
    <Tooltip title={championId} arrow placement="top">
      {icon}
    </Tooltip>
  );
}
