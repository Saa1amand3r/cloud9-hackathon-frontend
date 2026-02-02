import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTeamAnalysis } from '../hooks';
import { AnimatedSection, DashboardSkeleton } from '../components/dashboard';
import {
  ReportInfoSection,
  OverviewSection,
  DraftPlanSection,
  DraftTendenciesSection,
  StablePicksSection,
  ScenariosSection,
  PlayerAnalysisSection,
} from '../components/sections';
import { semanticColors } from '../theme';
import type { TeamAnalysisReport } from '../types';

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 001.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 00-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 005.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

interface DashboardProps {
  teamId?: string;
  searchQuery?: string;
  onNewSearch?: () => void;
  initialData?: TeamAnalysisReport | null;
}

export function Dashboard({ teamId = 'karmine-corp', searchQuery, onNewSearch, initialData }: DashboardProps) {
  // Only fetch if we don't have initialData from WebSocket
  const request = useMemo(() => initialData ? null : { teamId }, [teamId, initialData]);
  const { data: fetchedData, isLoading: isFetching, error } = useTeamAnalysis(request);

  // Use initialData if available, otherwise use fetched data
  const data = initialData || fetchedData;
  // Only show loading if we're fetching AND don't have initialData
  const isLoading = isFetching && !initialData;

  if (isLoading) {
    return (
      <Box sx={{ minHeight: '100vh', py: 4 }}>
        <Container maxWidth="lg" sx={{ pl: { xs: 2, md: 10 }, pr: { xs: 2, md: 2 } }}>
          <DashboardSkeleton />
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Failed to load analysis
          </Typography>
          <Typography variant="body2">{error.message}</Typography>
        </Alert>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="info">No data available</Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Search Bar Header - only show if searchQuery is provided */}
      {searchQuery && (
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            bgcolor: 'background.default',
            borderBottom: '1px solid',
            borderColor: 'divider',
            py: 2,
            mb: 2,
          }}
        >
          <Container maxWidth="lg" sx={{ pl: { xs: 2, md: 10 }, pr: { xs: 2, md: 2 } }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  flex: 1,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    px: 2.5,
                    py: 1.25,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    minWidth: 200,
                  }}
                >
                  <Box sx={{ color: 'text.secondary', display: 'flex' }}>
                    <SearchIcon />
                  </Box>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: '1.1rem',
                    }}
                  >
                    {searchQuery}
                  </Typography>
                </Box>
                <Typography
                  color="text.secondary"
                  sx={{ fontSize: '0.95rem' }}
                >
                  Analysis Report
                </Typography>
              </Box>
              {onNewSearch && (
                <Button
                  variant="outlined"
                  onClick={onNewSearch}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    borderColor: semanticColors.accent.main,
                    color: semanticColors.accent.main,
                    '&:hover': {
                      borderColor: semanticColors.accent.light,
                      bgcolor: `${semanticColors.accent.main}10`,
                    },
                  }}
                >
                  New Search
                </Button>
              )}
            </Box>
          </Container>
        </Box>
      )}

      {/* Main Content */}
      <Container
        maxWidth="lg"
        sx={{
          pl: { xs: 2, md: 10 },
          pr: { xs: 2, md: 2 },
          py: searchQuery ? 2 : 4,
        }}
      >
        <Stack spacing={6}>
          <AnimatedSection delay={0}>
            <ReportInfoSection data={data.reportInfo} />
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <OverviewSection data={data.overview} />
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <DraftPlanSection data={data.draftPlan} />
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <DraftTendenciesSection data={data.draftTendencies} />
          </AnimatedSection>
          <AnimatedSection delay={250}>
            <StablePicksSection data={data.stablePicks} />
          </AnimatedSection>
          <AnimatedSection delay={300}>
            <ScenariosSection data={data.scenarios} />
          </AnimatedSection>
          <AnimatedSection delay={350}>
            <PlayerAnalysisSection data={data.playerAnalysis} />
          </AnimatedSection>
        </Stack>
      </Container>
    </Box>
  );
}
