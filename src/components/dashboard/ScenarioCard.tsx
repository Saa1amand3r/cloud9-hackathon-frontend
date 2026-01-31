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

  // Glass fill effect - higher likelihood = more fill
  const fillPercent = likelihood;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: 240,
        maxWidth: 300,
        flex: '1 1 240px',
        ...sx,
      }}
    >
      {/* Likelihood Badge - Above Card */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 1,
        }}
      >
        <Box
          sx={{
            px: 2.5,
            py: 0.75,
            borderRadius: 2,
            bgcolor: `${semanticColors.accent.main}25`,
            border: '2px solid',
            borderColor: semanticColors.accent.main,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: semanticColors.accent.main,
              fontVariantNumeric: 'tabular-nums',
              textAlign: 'center',
            }}
          >
            {likelihood}%
          </Typography>
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              textAlign: 'center',
              color: 'text.secondary',
              fontWeight: 500,
            }}
          >
            Likelihood
          </Typography>
        </Box>
      </Box>

      {/* Main Card */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          flex: 1,
        }}
      >
        {/* Glass fill effect background - more visible */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: `${fillPercent}%`,
            background: `linear-gradient(to top, ${semanticColors.accent.main}35, ${semanticColors.accent.main}15)`,
            transition: 'height 0.8s ease-out',
            pointerEvents: 'none',
          }}
        />

        {/* Content */}
        <Box sx={{ position: 'relative', p: 2.5 }}>
          {/* Title */}
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, textAlign: 'center', mb: 0.5, fontSize: '1.1rem' }}
          >
            {name}
          </Typography>
          {description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: 'block', textAlign: 'center', mb: 2, lineHeight: 1.4 }}
            >
              {description}
            </Typography>
          )}

          {/* Radar Chart - with contrast background */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 2,
              p: 1.5,
              borderRadius: 2,
              bgcolor: 'rgba(0, 0, 0, 0.2)',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <ScenarioRadar stats={stats} size={160} />
          </Box>

          {/* Winrate */}
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Stack direction="row" justifyContent="center" alignItems="baseline" spacing={1}>
              <Typography variant="body2" color="text.secondary">
                Win Rate:
              </Typography>
              <WinrateIndicator winrate={winrate} size="medium" sx={{ fontSize: '1.1rem' }} />
            </Stack>
          </Box>

          {/* Punish Strategy */}
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor: 'action.hover',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <Chip
                label={actionConfig.label}
                size="small"
                sx={{
                  bgcolor: `${actionConfig.color}25`,
                  color: actionConfig.color,
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  height: 24,
                }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
                Punish
              </Typography>
            </Stack>
            {punishStrategy.targets.length > 0 ? (
              <Stack direction="row" flexWrap="wrap" gap={0.5}>
                {punishStrategy.targets.map((target) => (
                  <ChampionChip
                    key={target}
                    championId={target}
                    variant={punishStrategy.action === 'ban' ? 'ban' : 'pick'}
                  />
                ))}
              </Stack>
            ) : (
              <Typography variant="body2" color="text.secondary">
                {punishStrategy.description}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
