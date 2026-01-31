import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import type { SxProps, Theme } from '@mui/material/styles';
import type { Role } from '../../types';

interface RoleIconProps {
  role: Role;
  size?: number;
  showTooltip?: boolean;
  sx?: SxProps<Theme>;
}

const roleLabels: Record<Role, string> = {
  top: 'Top Lane',
  jungle: 'Jungle',
  mid: 'Mid Lane',
  adc: 'ADC',
  support: 'Support',
};

const roleIconPaths: Record<Role, string> = {
  top: '/roleicons/top-icon.svg',
  jungle: '/roleicons/jungle-icon.svg',
  mid: '/roleicons/mid-icon.svg',
  adc: '/roleicons/adc-icon.svg',
  support: '/roleicons/support-icon.svg',
};

export function RoleIcon({
  role,
  size = 20,
  showTooltip = true,
  sx,
}: RoleIconProps) {
  const icon = (
    <Box
      component="img"
      src={roleIconPaths[role]}
      alt={roleLabels[role]}
      sx={{
        width: size,
        height: size,
        objectFit: 'contain',
        opacity: 0.85,
        ...sx,
      }}
    />
  );

  if (!showTooltip) return icon;

  return (
    <Tooltip title={roleLabels[role]} arrow placement="top">
      {icon}
    </Tooltip>
  );
}
