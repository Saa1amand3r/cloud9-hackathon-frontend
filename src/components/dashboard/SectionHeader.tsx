import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';

interface SectionHeaderProps {
  id: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  sx?: SxProps<Theme>;
}

export function SectionHeader({
  id,
  title,
  subtitle,
  action,
  sx,
}: SectionHeaderProps) {
  return (
    <Box
      id={id}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 2,
        mb: 2,
        scrollMarginTop: 80,
        ...sx,
      }}
    >
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 0.5, fontSize: '1.75rem' }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem' }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {action && <Box>{action}</Box>}
    </Box>
  );
}
