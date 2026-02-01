import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import type { StablePicksByRole } from '../../types';
import { SectionHeader, ChampionIcon, WinrateIndicator, RoleIcon } from '../dashboard';
import { StarIcon } from '../icons';
import { semanticColors } from '../../theme';

interface StablePicksSectionProps {
  data: StablePicksByRole[];
}

export function StablePicksSection({ data }: StablePicksSectionProps) {
  return (
    <Box id="stable-picks" sx={{ scrollMarginTop: 80 }}>
      <SectionHeader
        title="Stable Picks"
        subtitle="Consistent champion picks by role with performance data"
      />

      <Stack spacing={4}>
        {data.map((roleData) => (
          <Box key={roleData.role}>
            {/* Role Header */}
            <Stack direction="row" alignItems="center" gap={1.5} sx={{ mb: 2 }}>
              <RoleIcon role={roleData.role} size={28} showTooltip={false} />
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, textTransform: 'capitalize', fontSize: '1.25rem' }}
              >
                {roleData.role}
              </Typography>
            </Stack>

            {/* Champions Row - matching Draft Tendencies size */}
            <Stack direction="row" flexWrap="wrap" gap={2.5}>
              {roleData.picks.map((pick) => (
                <Box
                  key={pick.championId}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    px: 3,
                    py: 1.5,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: pick.isSignaturePick
                      ? semanticColors.highlight.main
                      : 'divider',
                    boxShadow: pick.isSignaturePick
                      ? `0 0 0 2px ${semanticColors.highlight.main}30`
                      : 'none',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    },
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <ChampionIcon championId={pick.championId} size={48} />
                    {pick.isSignaturePick && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -6,
                          right: -6,
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          bgcolor: semanticColors.highlight.main,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '2px solid',
                          borderColor: 'background.paper',
                          '& svg': { width: 10, height: 10, color: '#fff' },
                        }}
                      >
                        <StarIcon />
                      </Box>
                    )}
                  </Box>

                  <Box>
                    <Typography sx={{ fontWeight: 600, fontSize: '1.25rem', lineHeight: 1.2 }}>
                      {pick.championId}
                    </Typography>
                    <Stack direction="row" alignItems="center" gap={1.5} sx={{ mt: 0.5 }}>
                      <WinrateIndicator winrate={pick.winrate} size="medium" sx={{ fontSize: '1rem' }} />
                      <Typography
                        color="text.secondary"
                        sx={{ fontVariantNumeric: 'tabular-nums', fontSize: '0.95rem' }}
                      >
                        {pick.gamesPlayed}G · {pick.kda.toFixed(1)} KDA
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
