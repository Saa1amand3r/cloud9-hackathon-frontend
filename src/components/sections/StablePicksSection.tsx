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
    <Box>
      <SectionHeader
        id="stable-picks"
        title="Stable Picks"
        subtitle="Consistent champion picks by role with performance data"
      />

      <Stack spacing={3}>
        {data.map((roleData) => (
          <Box key={roleData.role}>
            {/* Role Header */}
            <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 1.5 }}>
              <RoleIcon role={roleData.role} size={20} showTooltip={false} />
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, textTransform: 'capitalize' }}
              >
                {roleData.role}
              </Typography>
            </Stack>

            {/* Champions Row */}
            <Stack direction="row" flexWrap="wrap" gap={1.5}>
              {roleData.picks.map((pick) => (
                <Box
                  key={pick.championId}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    px: 2,
                    py: 1.5,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: pick.isSignaturePick
                      ? semanticColors.highlight.main
                      : 'divider',
                    boxShadow: pick.isSignaturePick
                      ? `0 0 0 1px ${semanticColors.highlight.main}20`
                      : 'none',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    },
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <ChampionIcon championId={pick.championId} size={36} />
                    {pick.isSignaturePick && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -4,
                          right: -4,
                          width: 14,
                          height: 14,
                          borderRadius: '50%',
                          bgcolor: semanticColors.highlight.main,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          '& svg': { width: 8, height: 8, color: '#fff' },
                        }}
                      >
                        <StarIcon />
                      </Box>
                    )}
                  </Box>

                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                      {pick.championId}
                    </Typography>
                    <Stack direction="row" alignItems="center" gap={1} sx={{ mt: 0.25 }}>
                      <WinrateIndicator winrate={pick.winrate} size="small" />
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontVariantNumeric: 'tabular-nums' }}
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
