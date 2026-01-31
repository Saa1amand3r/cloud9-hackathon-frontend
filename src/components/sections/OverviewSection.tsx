import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { OverviewAnalysis } from '../../types';
import {RandomnessIndicator, SectionHeader} from '../dashboard';
import { semanticColors } from '../../theme';

interface OverviewSectionProps {
  data: OverviewAnalysis;
}

const randomnessLabels: Record<string, { label: string; color: string }> = {
  predictable: { label: 'predictable', color: semanticColors.positive.main },
  moderate: { label: 'moderate', color: semanticColors.warning.main },
  chaotic: { label: 'chaotic', color: semanticColors.danger.main },
};

export function OverviewSection({ data }: OverviewSectionProps) {
  // const randomnessConfig = randomnessLabels[data.randomness];
  const insightText = data.strategicInsights.join(' ');

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <SectionHeader id="overview" title="Overview"/>
        <RandomnessIndicator level={"chaotic"} score={0.91} sx={{mb: 2}}/>
      </Box>

      <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
        {/*<Typography*/}
        {/*  component="span"*/}
        {/*  sx={{ fontWeight: 600, fontSize: 'inherit' }}*/}
        {/*>*/}
        {/*  Randomness:{' '}*/}
        {/*</Typography>*/}
        {/*<Typography*/}
        {/*  component="span"*/}
        {/*  sx={{ fontWeight: 600, color: randomnessConfig.color, fontSize: 'inherit' }}*/}
        {/*>*/}
        {/*  {randomnessConfig.label}*/}
        {/*</Typography>*/}


      </Typography>
      <Typography component="span" sx={{ fontSize: 'inherit' }}>
        {insightText}
      </Typography>
    </Box>
  );
}
