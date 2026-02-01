import Box from '@mui/material/Box';
import type { ScenarioCard as ScenarioCardType } from '../../types';
import { SectionHeader, ScenarioCard } from '../dashboard';

interface ScenariosSectionProps {
  data: ScenarioCardType[];
}

export function ScenariosSection({ data }: ScenariosSectionProps) {
  // Sort by likelihood descending
  const sortedScenarios = [...data].sort((a, b) => b.likelihood - a.likelihood);

  return (
    <Box id="scenarios" sx={{ scrollMarginTop: 80 }}>
      <SectionHeader
        title="Scenario Cards"
        subtitle="Predicted game scenarios with probability and counter-strategies"
      />

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          '& > *': {
            animation: 'slideUpFadeIn 0.5s ease-out forwards',
            opacity: 0,
          },
          '& > *:nth-of-type(1)': { animationDelay: '0.1s' },
          '& > *:nth-of-type(2)': { animationDelay: '0.2s' },
          '& > *:nth-of-type(3)': { animationDelay: '0.3s' },
          '& > *:nth-of-type(4)': { animationDelay: '0.4s' },
          '& > *:nth-of-type(5)': { animationDelay: '0.5s' },
        }}
      >
        {sortedScenarios.map((scenario) => (
          <ScenarioCard key={scenario.scenarioId} scenario={scenario} />
        ))}
      </Box>
    </Box>
  );
}
