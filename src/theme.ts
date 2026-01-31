import { createTheme } from '@mui/material/styles';
import type { ThemeOptions, PaletteMode } from '@mui/material/styles';

// Semantic color palette - deep, muted tones with transparency support
const semanticColors = {
  // Primary accent - Info / Neutral insight (deep teal-blue)
  accent: {
    main: '#1a5f7a',
    light: '#2d7d9a',
    dark: '#134a5e',
    contrastText: '#FFFFFF',
  },
  // Positive / Advantage / High win rate (deep emerald)
  positive: {
    main: '#166534',
    light: '#22804a',
    dark: '#14532d',
    contrastText: '#FFFFFF',
  },
  // Warning / Volatile / Uncertain (deep amber)
  warning: {
    main: '#b45309',
    light: '#d97706',
    dark: '#92400e',
    contrastText: '#FFFFFF',
  },
  // Danger / Punish / High threat (deep crimson)
  danger: {
    main: '#991b1b',
    light: '#b91c1c',
    dark: '#7f1d1d',
    contrastText: '#FFFFFF',
  },
  // New / Changed since last patch (deep purple)
  highlight: {
    main: '#6b21a8',
    light: '#7e22ce',
    dark: '#581c87',
    contrastText: '#FFFFFF',
  },
  // Inactive / Historical / Disabled (deep slate)
  muted: {
    main: '#475569',
    light: '#64748b',
    dark: '#334155',
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
    default: '#080a0e',      // Deep near-black
    paper: 'rgba(18, 22, 30, 0.85)',  // Translucent dark surface
  },
  divider: 'rgba(255, 255, 255, 0.06)',  // Subtle borders
  text: {
    primary: '#e2e8f0',      // Soft off-white for primary text
    secondary: '#8b9ab5',    // Muted slate for secondary text
    disabled: '#4a5568',     // Disabled text
  },
  action: {
    active: '#e2e8f0',
    hover: 'rgba(26, 95, 122, 0.12)',
    selected: 'rgba(26, 95, 122, 0.20)',
    disabled: '#4a5568',
    disabledBackground: 'rgba(255, 255, 255, 0.03)',
  },
};

// Light theme palette - alternative for accessibility
const lightPalette = {
  mode: 'light' as PaletteMode,
  primary: semanticColors.accent,
  secondary: semanticColors.highlight,
  error: semanticColors.danger,
  warning: semanticColors.warning,
  info: semanticColors.accent,
  success: semanticColors.positive,
  background: {
    default: '#f0f4f8',      // Soft cool gray background
    paper: 'rgba(255, 255, 255, 0.85)',  // Translucent white for cards/surfaces
  },
  divider: 'rgba(0, 0, 0, 0.06)',  // Subtle borders
  text: {
    primary: '#1a202c',      // Deep charcoal for primary text
    secondary: '#4a5568',    // Muted slate for secondary text
    disabled: '#a0aec0',     // Disabled text
  },
  action: {
    active: '#1a202c',
    hover: 'rgba(26, 95, 122, 0.08)',
    selected: 'rgba(26, 95, 122, 0.14)',
    disabled: '#a0aec0',
    disabledBackground: 'rgba(0, 0, 0, 0.03)',
  },
};

// Shared typography configuration
const typography = {
  fontFamily: [
    'Nunito',
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
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.5,
  },
  body1: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  body2: {
    fontSize: '1rem',
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
      '@keyframes slideUpFadeIn': {
        '0%': {
          opacity: 0,
          transform: 'translateY(30px)',
        },
        '100%': {
          opacity: 1,
          transform: 'translateY(0)',
        },
      },
      body: {
        scrollbarColor: mode === 'dark' ? '#2d3748 #080a0e' : '#cbd5e0 #f0f4f8',
        '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
          width: 8,
          height: 8,
        },
        '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
          borderRadius: 4,
          backgroundColor: mode === 'dark' ? '#2d3748' : '#cbd5e0',
        },
        '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
          backgroundColor: mode === 'dark' ? '#080a0e' : '#f0f4f8',
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
        borderRadius: 16,
        backdropFilter: 'blur(12px)',
        boxShadow: mode === 'dark'
          ? '0 4px 20px rgba(26, 95, 122, 0.15), 0 2px 8px rgba(0, 0, 0, 0.3)'
          : '0 4px 20px rgba(26, 95, 122, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06)',
        border: mode === 'dark'
          ? '1px solid rgba(255, 255, 255, 0.06)'
          : '1px solid rgba(0, 0, 0, 0.04)',
        animation: 'slideUpFadeIn 0.5s ease-out forwards',
        opacity: 0,
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
        '&:hover': {
          boxShadow: mode === 'dark'
            ? '0 8px 32px rgba(26, 95, 122, 0.25), 0 4px 12px rgba(0, 0, 0, 0.4)'
            : '0 8px 32px rgba(26, 95, 122, 0.20), 0 4px 12px rgba(0, 0, 0, 0.08)',
          transform: 'translateY(-2px)',
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
        backdropFilter: 'blur(12px)',
      },
      rounded: {
        borderRadius: 16,
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
        backgroundColor: mode === 'dark' ? 'rgba(30, 35, 45, 0.95)' : 'rgba(26, 32, 44, 0.95)',
        color: '#e2e8f0',
        fontSize: '0.75rem',
        fontWeight: 500,
        borderRadius: 8,
        padding: '8px 14px',
        backdropFilter: 'blur(8px)',
      },
      arrow: {
        color: mode === 'dark' ? 'rgba(30, 35, 45, 0.95)' : 'rgba(26, 32, 44, 0.95)',
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
          ? 'rgba(255, 255, 255, 0.05)'
          : 'rgba(0, 0, 0, 0.05)',
      },
      head: {
        fontWeight: 600,
        backgroundColor: mode === 'dark' ? 'rgba(18, 22, 30, 0.9)' : 'rgba(240, 244, 248, 0.9)',
      },
    },
  },
  MuiTableRow: {
    styleOverrides: {
      root: {
        '&:hover': {
          backgroundColor: mode === 'dark'
            ? 'rgba(26, 95, 122, 0.06)'
            : 'rgba(26, 95, 122, 0.04)',
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
        borderRadius: 10,
        backdropFilter: 'blur(8px)',
      },
      standardInfo: {
        backgroundColor: mode === 'dark'
          ? 'rgba(26, 95, 122, 0.18)'
          : 'rgba(26, 95, 122, 0.12)',
      },
      standardSuccess: {
        backgroundColor: mode === 'dark'
          ? 'rgba(22, 101, 52, 0.18)'
          : 'rgba(22, 101, 52, 0.12)',
      },
      standardWarning: {
        backgroundColor: mode === 'dark'
          ? 'rgba(180, 83, 9, 0.18)'
          : 'rgba(180, 83, 9, 0.12)',
      },
      standardError: {
        backgroundColor: mode === 'dark'
          ? 'rgba(153, 27, 27, 0.18)'
          : 'rgba(153, 27, 27, 0.12)',
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
        borderRadius: 12,
        boxShadow: mode === 'dark'
          ? '0 8px 32px rgba(26, 95, 122, 0.15), 0 4px 16px rgba(0, 0, 0, 0.4)'
          : '0 8px 32px rgba(26, 95, 122, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08)',
        backdropFilter: 'blur(12px)',
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
        borderRadius: 10,
        '&.Mui-selected': {
          backgroundColor: 'rgba(26, 95, 122, 0.15)',
          '&:hover': {
            backgroundColor: 'rgba(26, 95, 122, 0.22)',
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
