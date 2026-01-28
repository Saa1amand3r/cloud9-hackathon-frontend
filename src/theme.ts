import { createTheme } from '@mui/material/styles';
import type { ThemeOptions, PaletteMode } from '@mui/material/styles';

// Semantic color palette - consistent meaning across the app
const semanticColors = {
  // Primary accent - Info / Neutral insight
  accent: {
    main: '#2781BF',
    light: '#4A9BD1',
    dark: '#1E6799',
    contrastText: '#FFFFFF',
  },
  // Positive / Advantage / High win rate
  positive: {
    main: '#22C55E',
    light: '#4ADE80',
    dark: '#16A34A',
    contrastText: '#FFFFFF',
  },
  // Warning / Volatile / Uncertain
  warning: {
    main: '#F59E0B',
    light: '#FBBF24',
    dark: '#D97706',
    contrastText: '#000000',
  },
  // Danger / Punish / High threat
  danger: {
    main: '#EF4444',
    light: '#F87171',
    dark: '#DC2626',
    contrastText: '#FFFFFF',
  },
  // New / Changed since last patch
  highlight: {
    main: '#A855F7',
    light: '#C084FC',
    dark: '#9333EA',
    contrastText: '#FFFFFF',
  },
  // Inactive / Historical / Disabled
  muted: {
    main: '#6B7280',
    light: '#9CA3AF',
    dark: '#4B5563',
    contrastText: '#FFFFFF',
  },
};

// Dark theme palette - primary theme for dashboard
const darkPalette = {
  mode: 'dark' as PaletteMode,
  primary: semanticColors.accent,
  secondary: semanticColors.highlight,
  error: semanticColors.danger,
  warning: semanticColors.warning,
  info: semanticColors.accent,
  success: semanticColors.positive,
  background: {
    default: '#0F1117',      // Near-black / charcoal
    paper: '#1A1D24',        // Slightly lighter charcoal for cards/surfaces
  },
  divider: 'rgba(255, 255, 255, 0.08)',  // Subtle gray borders
  text: {
    primary: '#F1F5F9',      // Off-white for primary text
    secondary: '#94A3B8',    // Muted gray for secondary text
    disabled: '#475569',     // Disabled text
  },
  action: {
    active: '#F1F5F9',
    hover: 'rgba(39, 129, 191, 0.08)',
    selected: 'rgba(39, 129, 191, 0.16)',
    disabled: '#475569',
    disabledBackground: 'rgba(255, 255, 255, 0.04)',
  },
};

// Light theme palette - alternative for accessibility
const lightPalette = {
  mode: 'light' as PaletteMode,
  primary: {
    main: '#2781BF',
    light: '#4A9BD1',
    dark: '#1E6799',
    contrastText: '#FFFFFF',
  },
  secondary: semanticColors.highlight,
  error: semanticColors.danger,
  warning: semanticColors.warning,
  info: semanticColors.accent,
  success: semanticColors.positive,
  background: {
    default: '#F8FAFC',      // Light gray background
    paper: '#FFFFFF',        // White for cards/surfaces
  },
  divider: 'rgba(0, 0, 0, 0.08)',  // Subtle gray borders
  text: {
    primary: '#0F172A',      // Near-black for primary text
    secondary: '#64748B',    // Muted gray for secondary text
    disabled: '#94A3B8',     // Disabled text
  },
  action: {
    active: '#0F172A',
    hover: 'rgba(39, 129, 191, 0.08)',
    selected: 'rgba(39, 129, 191, 0.12)',
    disabled: '#94A3B8',
    disabledBackground: 'rgba(0, 0, 0, 0.04)',
  },
};

// Shared typography configuration
const typography = {
  fontFamily: [
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
  ].join(','),
  h1: {
    fontSize: '2.25rem',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  h2: {
    fontSize: '1.875rem',
    fontWeight: 700,
    lineHeight: 1.25,
    letterSpacing: '-0.01em',
  },
  h3: {
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: 1.3,
  },
  h4: {
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: 1.35,
  },
  h5: {
    fontSize: '1.125rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h6: {
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  subtitle1: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.5,
  },
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.5,
  },
  body1: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  body2: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  button: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.5,
    textTransform: 'none' as const,
  },
  caption: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
  },
};

// Function to get component overrides based on mode
const getComponentOverrides = (mode: PaletteMode): ThemeOptions['components'] => ({
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        scrollbarColor: mode === 'dark' ? '#374151 #1A1D24' : '#CBD5E1 #F1F5F9',
        '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
          width: 8,
          height: 8,
        },
        '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
          borderRadius: 4,
          backgroundColor: mode === 'dark' ? '#374151' : '#CBD5E1',
        },
        '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
          backgroundColor: mode === 'dark' ? '#1A1D24' : '#F1F5F9',
        },
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        fontWeight: 500,
        padding: '8px 16px',
      },
      contained: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
      },
      outlined: {
        borderWidth: 1.5,
        '&:hover': {
          borderWidth: 1.5,
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        boxShadow: mode === 'dark'
          ? '0 1px 3px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.3)'
          : '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
        border: mode === 'dark'
          ? '1px solid rgba(255, 255, 255, 0.05)'
          : '1px solid rgba(0, 0, 0, 0.05)',
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
      },
      rounded: {
        borderRadius: 12,
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 6,
        fontWeight: 500,
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 8,
        },
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: mode === 'dark' ? '#374151' : '#1E293B',
        color: '#F1F5F9',
        fontSize: '0.75rem',
        fontWeight: 500,
        borderRadius: 6,
        padding: '6px 12px',
      },
      arrow: {
        color: mode === 'dark' ? '#374151' : '#1E293B',
      },
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: {
        borderColor: mode === 'dark'
          ? 'rgba(255, 255, 255, 0.08)'
          : 'rgba(0, 0, 0, 0.08)',
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        borderColor: mode === 'dark'
          ? 'rgba(255, 255, 255, 0.06)'
          : 'rgba(0, 0, 0, 0.06)',
      },
      head: {
        fontWeight: 600,
        backgroundColor: mode === 'dark' ? '#1A1D24' : '#F8FAFC',
      },
    },
  },
  MuiTableRow: {
    styleOverrides: {
      root: {
        '&:hover': {
          backgroundColor: mode === 'dark'
            ? 'rgba(39, 129, 191, 0.04)'
            : 'rgba(39, 129, 191, 0.04)',
        },
      },
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        borderRadius: 4,
        backgroundColor: mode === 'dark'
          ? 'rgba(255, 255, 255, 0.08)'
          : 'rgba(0, 0, 0, 0.08)',
      },
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
      standardInfo: {
        backgroundColor: mode === 'dark'
          ? 'rgba(39, 129, 191, 0.15)'
          : 'rgba(39, 129, 191, 0.1)',
      },
      standardSuccess: {
        backgroundColor: mode === 'dark'
          ? 'rgba(34, 197, 94, 0.15)'
          : 'rgba(34, 197, 94, 0.1)',
      },
      standardWarning: {
        backgroundColor: mode === 'dark'
          ? 'rgba(245, 158, 11, 0.15)'
          : 'rgba(245, 158, 11, 0.1)',
      },
      standardError: {
        backgroundColor: mode === 'dark'
          ? 'rgba(239, 68, 68, 0.15)'
          : 'rgba(239, 68, 68, 0.1)',
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        borderRight: mode === 'dark'
          ? '1px solid rgba(255, 255, 255, 0.05)'
          : '1px solid rgba(0, 0, 0, 0.05)',
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: 'none',
        borderBottom: mode === 'dark'
          ? '1px solid rgba(255, 255, 255, 0.05)'
          : '1px solid rgba(0, 0, 0, 0.05)',
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      indicator: {
        height: 3,
        borderRadius: '3px 3px 0 0',
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontWeight: 500,
        minHeight: 48,
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: 16,
      },
    },
  },
  MuiMenu: {
    styleOverrides: {
      paper: {
        borderRadius: 8,
        boxShadow: mode === 'dark'
          ? '0 4px 20px rgba(0, 0, 0, 0.5)'
          : '0 4px 20px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        borderRadius: 4,
        margin: '2px 8px',
        padding: '8px 12px',
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        '&.Mui-selected': {
          backgroundColor: 'rgba(39, 129, 191, 0.12)',
          '&:hover': {
            backgroundColor: 'rgba(39, 129, 191, 0.16)',
          },
        },
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
    },
  },
  MuiBadge: {
    styleOverrides: {
      badge: {
        fontWeight: 600,
      },
    },
  },
});

// Create theme based on mode
export const createAppTheme = (mode: PaletteMode) => {
  const palette = mode === 'dark' ? darkPalette : lightPalette;

  return createTheme({
    palette,
    typography,
    spacing: 8,
    shape: {
      borderRadius: 8,
    },
    components: getComponentOverrides(mode),
  });
};

// Export semantic colors for direct use in components
export { semanticColors };

// Default theme (dark mode)
const theme = createAppTheme('dark');

export default theme;
