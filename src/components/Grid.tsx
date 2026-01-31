import Box from '@mui/material/Box';
import type { ReactNode } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';

interface GridProps {
  children: ReactNode;
  columns?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  gap?: number;
  sx?: SxProps<Theme>;
}

export function Grid({ children, columns = { xs: 1, sm: 1, md: 2, lg: 2 }, gap = 3, sx }: GridProps) {
  const getGridColumns = () => {
    if (typeof columns === 'number') {
      return `repeat(${columns}, 1fr)`;
    }
    return {
      xs: `repeat(${columns.xs || 1}, 1fr)`,
      sm: `repeat(${columns.sm || columns.xs || 1}, 1fr)`,
      md: `repeat(${columns.md || columns.sm || columns.xs || 2}, 1fr)`,
      lg: `repeat(${columns.lg || columns.md || columns.sm || columns.xs || 2}, 1fr)`,
      xl: `repeat(${columns.xl || columns.lg || columns.md || columns.sm || columns.xs || 2}, 1fr)`,
    };
  };

  const gridColumns = getGridColumns();

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: typeof gridColumns === 'string'
          ? gridColumns
          : {
              xs: gridColumns.xs,
              sm: gridColumns.sm,
              md: gridColumns.md,
              lg: gridColumns.lg,
              xl: gridColumns.xl,
            },
        gap,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

interface GridItemProps {
  children: ReactNode;
  span?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  sx?: SxProps<Theme>;
}

export function GridItem({ children, span, sx }: GridItemProps) {
  const getGridSpan = () => {
    if (!span) return undefined;
    if (typeof span === 'number') {
      return `span ${span}`;
    }
    return {
      xs: span.xs ? `span ${span.xs}` : undefined,
      sm: span.sm ? `span ${span.sm}` : undefined,
      md: span.md ? `span ${span.md}` : undefined,
      lg: span.lg ? `span ${span.lg}` : undefined,
      xl: span.xl ? `span ${span.xl}` : undefined,
    };
  };

  const gridSpan = getGridSpan();

  return (
    <Box
      sx={{
        gridColumn: gridSpan,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
