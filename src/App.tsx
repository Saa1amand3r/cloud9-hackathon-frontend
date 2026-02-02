import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useThemeMode } from './contexts/ThemeContext';
import { Dashboard, Analytics } from './pages';
import { LoginCard, SearchPage, ReportLoading } from './components/flow';
import { SectionNav } from './components/dashboard';
import type { NavSection } from './components/dashboard';
import { OverviewIcon, ChampionIcon, ScenarioIcon } from './components/icons';

const NAV_SECTIONS: NavSection[] = [
  { id: 'overview', label: 'Overview', icon: <OverviewIcon /> },
  { id: 'stable-picks', label: 'Stable Picks', icon: <ChampionIcon /> },
  { id: 'scenarios', label: 'Scenarios', icon: <ScenarioIcon /> },
];

type FlowState = 'login' | 'search' | 'loading' | 'dashboard' | 'analytics';

const LightModeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
  </svg>
);

const DarkModeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
  </svg>
);

function App() {
  const { mode, toggleTheme } = useThemeMode();
  const [flowState, setFlowState] = useState<FlowState>('login');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleLogin = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setFlowState('search');
      setIsTransitioning(false);
    }, 300);
  }, []);

  const handleSearch = useCallback((teamName: string) => {
    setSearchQuery(teamName);
    setIsTransitioning(true);
    setTimeout(() => {
      setFlowState('loading');
      setIsTransitioning(false);
    }, 300);
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setFlowState('dashboard');
      setIsTransitioning(false);
    }, 300);
  }, []);

  const handleNewSearch = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setFlowState('search');
      setSearchQuery('');
      setIsTransitioning(false);
    }, 300);
  }, []);

  const handleAnalytics = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setFlowState('analytics');
      setIsTransitioning(false);
    }, 300);
  }, []);

  const handleBackToLogin = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setFlowState('login');
      setIsTransitioning(false);
    }, 300);
  }, []);

  const renderContent = () => {
    switch (flowState) {
      case 'login':
        return <LoginCard onLogin={handleLogin} onAnalytics={handleAnalytics} />;
      case 'search':
        return <SearchPage onSearch={handleSearch} />;
      case 'loading':
        return <ReportLoading teamName={searchQuery} onComplete={handleLoadingComplete} />;
      case 'dashboard':
        return <Dashboard searchQuery={searchQuery} onNewSearch={handleNewSearch} />;
      case 'analytics':
        return <Analytics onBack={handleBackToLogin} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Section Navigation - Outside transformed container for proper fixed positioning */}
      {flowState === 'dashboard' && (
        <SectionNav
          sections={NAV_SECTIONS}
          sx={{ display: { xs: 'none', md: 'flex' } }}
        />
      )}

      {/* Theme Toggle - Fixed position */}
      <IconButton
        onClick={toggleTheme}
        color="primary"
        sx={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 1000,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          '&:hover': { bgcolor: 'action.hover' },
        }}
      >
        {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>

      {/* Content with fade transition */}
      <Box
        sx={{
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning ? 'translateY(10px)' : 'translateY(0)',
          transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
}

export default App;
