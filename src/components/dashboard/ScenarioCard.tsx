import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ScenarioCard as ScenarioCardType } from '../../types';
import { ScenarioRadar } from '../charts';
import { ChampionChip } from './ChampionChip';
import { WinrateIndicator } from './WinrateIndicator';
import { semanticColors } from '../../theme';

interface ScenarioCardProps {
  scenario: ScenarioCardType;
  sx?: SxProps<Theme>;
}

const actionLabels: Record<string, { label: string; color: string }> = {
  ban: { label: 'Ban', color: semanticColors.danger.main },
  pick: { label: 'Pick', color: semanticColors.positive.main },
  counter: { label: 'Counter', color: semanticColors.warning.main },
  playstyle: { label: 'Adapt', color: semanticColors.accent.main },
};

export function ScenarioCard({ scenario, sx }: ScenarioCardProps) {
  const { likelihood, winrate, stats, punishStrategy, name, description } = scenario;
  const actionConfig = actionLabels[punishStrategy.action];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: 280,
        maxWidth: 340,
        flex: '1 1 280px',
        ...sx,
      }}
    >
      {/* Likelihood Badge - Above Card */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 1.5,
        }}
      >
        <Box
          sx={{
            px: 3,
            py: 1,
            borderRadius: 2,
            bgcolor: `${semanticColors.accent.main}25`,
            border: '2px solid',
            borderColor: semanticColors.accent.main,
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              color: semanticColors.accent.main,
              fontVariantNumeric: 'tabular-nums',
              textAlign: 'center',
              fontSize: '1.75rem',
              lineHeight: 1.2,
            }}
          >
            {likelihood}%
          </Typography>
          <Typography
            sx={{
              display: 'block',
              textAlign: 'center',
              color: 'text.secondary',
              fontWeight: 500,
              fontSize: '0.9rem',
            }}
          >
            Likelihood
          </Typography>
        </Box>
      </Box>

      {/* Main Card */}
      <Box
        sx={{
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          flex: 1,
        }}
      >
        {/* Content */}
        <Box sx={{ p: 3 }}>
          {/* Title */}
          <Typography
            sx={{ fontWeight: 600, textAlign: 'center', mb: 0.5, fontSize: '1.35rem' }}
          >
            {name}
          </Typography>
          {description && (
            <Typography
              color="text.secondary"
              sx={{ display: 'block', textAlign: 'center', mb: 2.5, lineHeight: 1.5, fontSize: '1rem' }}
            >
              {description}
            </Typography>
          )}

          {/* Radar Chart - with contrast background */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 2.5,
              p: 2,
              borderRadius: 2,
              bgcolor: 'rgba(0, 0, 0, 0.25)',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <ScenarioRadar stats={stats} size={180} />
          </Box>

          {/* Winrate */}
          <Box sx={{ textAlign: 'center', mb: 2.5 }}>
            <Stack direction="row" justifyContent="center" alignItems="baseline" spacing={1.5}>
              <Typography color="text.secondary" sx={{ fontSize: '1.05rem' }}>
                Win Rate:
              </Typography>
              <WinrateIndicator winrate={winrate} size="medium" sx={{ fontSize: '1.35rem' }} />
            </Stack>
          </Box>

          {/* Punish Strategy */}
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: 'action.hover',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
              <Chip
                label={actionConfig.label}
                sx={{
                  bgcolor: `${actionConfig.color}30`,
                  color: actionConfig.color,
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  height: 28,
                }}
              />
            </Stack>
            {punishStrategy.targets.length > 0 ? (
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {punishStrategy.targets.map((target) => (
                  <ChampionChip
                    key={target}
                    championId={target}
                    variant={punishStrategy.action === 'ban' ? 'ban' : 'pick'}
                  />
                ))}
              </Stack>
            ) : (
              <Typography color="text.secondary" sx={{ fontSize: '1rem' }}>
                {punishStrategy.description}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
