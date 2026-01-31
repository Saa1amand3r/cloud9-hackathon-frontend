import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { useTeamAnalysis } from '../hooks';
import { SectionNav, AnimatedSection, DashboardSkeleton } from '../components/dashboard';
import type { NavSection } from '../components/dashboard';
import {
  ReportInfoSection,
  OverviewSection,
  DraftPlanSection,
  DraftTendenciesSection,
  StablePicksSection,
  ScenariosSection,
  PlayerAnalysisSection,
} from '../components/sections';
import {
  OverviewIcon,
  ChampionIcon,
  ScenarioIcon,
} from '../components/icons';

const NAV_SECTIONS: NavSection[] = [
  // { id: 'report-info', label: 'Report Info', icon: <InfoIcon /> },
  { id: 'overview', label: 'Overview', icon: <OverviewIcon /> },
  { id: 'stable-picks', label: 'Stable Picks', icon: <ChampionIcon /> },
  { id: 'scenarios', label: 'Scenarios', icon: <ScenarioIcon /> },
  // { id: 'player-analysis', label: 'Player Analysis', icon: <PlayerIcon /> },
];

interface DashboardProps {
  teamId?: string;
}

export function Dashboard({ teamId = 'karmine-corp' }: DashboardProps) {
  const request = useMemo(() => ({ teamId }), [teamId]);
  const { data, isLoading, error } = useTeamAnalysis(request);

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
    <Box sx={{ minHeight: '100vh', py: 4 }}>
      {/* Side Navigation */}
      <SectionNav
        sections={NAV_SECTIONS}
        sx={{ display: { xs: 'none', md: 'flex' } }}
      />

      {/* Main Content */}
      <Container
        maxWidth="lg"
        sx={{
          pl: { xs: 2, md: 10 },
          pr: { xs: 2, md: 2 },
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
