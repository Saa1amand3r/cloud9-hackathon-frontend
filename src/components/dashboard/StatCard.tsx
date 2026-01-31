import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import { semanticColors } from '../../theme';

type StatVariant = 'default' | 'positive' | 'warning' | 'danger' | 'accent';

interface StatCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
  variant?: StatVariant;
  icon?: React.ReactNode;
  sx?: SxProps<Theme>;
}

const variantColors: Record<StatVariant, string> = {
  default: 'text.primary',
  positive: semanticColors.positive.main,
  warning: semanticColors.warning.main,
  danger: semanticColors.danger.main,
  accent: semanticColors.accent.main,
};

export function StatCard({
  label,
  value,
  sublabel,
  variant = 'default',
  icon,
  sx,
}: StatCardProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        p: 2,
        borderRadius: 2,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        ...sx,
      }}
    >
      {icon && (
        <Box
          sx={{
            color: variantColors[variant],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
      )}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ display: 'block', mb: 0.5, fontSize: '0.9rem' }}
        >
          {label}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            color: variantColors[variant],
            lineHeight: 1.2,
            fontSize: '1.5rem',
          }}
        >
          {value}
        </Typography>
        {sublabel && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25, fontSize: '0.85rem' }}>
            {sublabel}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
