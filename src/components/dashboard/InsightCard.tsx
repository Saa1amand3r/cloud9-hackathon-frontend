import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import { semanticColors } from '../../theme';

type InsightVariant = 'info' | 'warning' | 'success' | 'danger';

interface InsightCardProps {
  children: React.ReactNode;
  variant?: InsightVariant;
  icon?: React.ReactNode;
  sx?: SxProps<Theme>;
}

const variantStyles = {
  info: {
    borderColor: semanticColors.accent.main,
    bgColor: 'rgba(26, 95, 122, 0.08)',
  },
  warning: {
    borderColor: semanticColors.warning.main,
    bgColor: 'rgba(180, 83, 9, 0.08)',
  },
  success: {
    borderColor: semanticColors.positive.main,
    bgColor: 'rgba(22, 101, 52, 0.08)',
  },
  danger: {
    borderColor: semanticColors.danger.main,
    bgColor: 'rgba(153, 27, 27, 0.08)',
  },
};

export function InsightCard({
  children,
  variant = 'info',
  icon,
  sx,
}: InsightCardProps) {
  const styles = variantStyles[variant];

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1.5,
        p: 2,
        borderRadius: 2,
        bgcolor: styles.bgColor,
        borderLeft: '3px solid',
        borderColor: styles.borderColor,
        ...sx,
      }}
    >
      {icon && (
        <Box sx={{ color: styles.borderColor, mt: 0.25 }}>{icon}</Box>
      )}
      <Typography variant="body2" sx={{ flex: 1 }}>
        {children}
      </Typography>
    </Box>
  );
}
