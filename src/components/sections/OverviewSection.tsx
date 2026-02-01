import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import type { OverviewAnalysis } from '../../types';
import { SectionHeader, RandomnessIndicator } from '../dashboard';
import { semanticColors } from '../../theme';

interface OverviewSectionProps {
  data: OverviewAnalysis;
}

export function OverviewSection({ data }: OverviewSectionProps) {
  return (
    <Box id="overview" sx={{ scrollMarginTop: 80 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <SectionHeader title="Overview" />
        <RandomnessIndicator level={data.randomness} score={data.randomnessScore} sx={{ mb: 2 }} />
      </Box>

      {/* Strategic Insights as advice cards */}
      <Stack spacing={2}>
        {data.strategicInsights.map((insight, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2,
              p: 2.5,
              borderRadius: 2,
              bgcolor: index === 0 ? `${semanticColors.warning.main}12` : 'action.hover',
              borderLeft: '4px solid',
              borderColor: index === 0 ? semanticColors.warning.main : semanticColors.accent.main,
            }}
          >
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                bgcolor: index === 0 ? `${semanticColors.warning.main}25` : `${semanticColors.accent.main}25`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                mt: 0.25,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  color: index === 0 ? semanticColors.warning.main : semanticColors.accent.main,
                }}
              >
                {index + 1}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: '1.1rem', lineHeight: 1.6, flex: 1 }}>
              {insight}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
