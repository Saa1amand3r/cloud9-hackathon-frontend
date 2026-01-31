import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type { DraftPlan } from '../../types';
import { SectionHeader, ChampionChip } from '../dashboard';
import { semanticColors } from '../../theme';

interface DraftPlanSectionProps {
  data: DraftPlan;
}

const priorityLabels: Record<string, { label: string; color: string }> = {
  flexibility: { label: 'Flexibility', color: semanticColors.accent.main },
  comfort: { label: 'Comfort', color: semanticColors.positive.main },
  counter: { label: 'Counter', color: semanticColors.warning.main },
  early_power: { label: 'Early Power', color: semanticColors.danger.main },
};

export function DraftPlanSection({ data }: DraftPlanSectionProps) {
  const priorityConfig = priorityLabels[data.draftPriority];

  return (
    <Box>
      <SectionHeader
        id="draft-plan"
        title="Draft Plan"
        subtitle="Recommended ban and draft strategy"
        action={
          <Chip
            label={`Priority: ${priorityConfig.label}`}
            size="medium"
            sx={{
              bgcolor: `${priorityConfig.color}20`,
              color: priorityConfig.color,
              fontWeight: 600,
            }}
          />
        }
      />

      <Stack spacing={3}>
        {/* Ban Plan */}
        <Card sx={{ bgcolor: 'rgba(153, 27, 27, 0.05)' }}>
          <CardContent>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
              Ban Plan
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1} >
              {data.banPlan.map((champion, index) => (
                <Box key={champion} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 600,
                      minWidth: 20,
                        ml: 2,
                    }}
                  >
                    {index + 1}.
                  </Typography>
                  <ChampionChip championId={champion} variant="ban" />
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
