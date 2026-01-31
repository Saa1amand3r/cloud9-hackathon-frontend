import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import type { DraftTendencies } from '../../types';
import { SectionHeader, ChampionIcon } from '../dashboard';
import { semanticColors } from '../../theme';

interface DraftTendenciesSectionProps {
  data: DraftTendencies;
}

export function DraftTendenciesSection({ data }: DraftTendenciesSectionProps) {
  return (
    <Box>
      <SectionHeader
        id="draft-tendencies"
        title="Draft Tendencies"
        subtitle="Opponent's most picked and banned champions"
      />

      <Stack direction="row" flexWrap="wrap" gap={2.5}>
        {data.priorityPicks.map((pick, index) => {
          // Opacity decreases for lower priority picks
          const opacity = 1 - (index * 0.07);

          return (
            <Box
              key={pick.championId}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                px: 3,
                py: 1,
                borderRadius: 2,
                bgcolor: `${semanticColors.accent.main}${Math.round(opacity * 20).toString(16).padStart(2, '0')}`,
                border: '1px solid',
                borderColor: `${semanticColors.accent.main}30`,
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  bgcolor: `${semanticColors.accent.main}25`,
                },
              }}
            >
              <ChampionIcon championId={pick.championId} size={42} />
              <Box>
                <Box sx={{ fontWeight: 600, fontSize: '1.5rem', lineHeight: 1.2 }}>
                  {pick.championId}
                </Box>
                <Box
                  sx={{
                    fontSize: '1rem',
                    color: 'text.secondary',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {pick.pickRate}% pick · {pick.banRate}% ban
                </Box>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
