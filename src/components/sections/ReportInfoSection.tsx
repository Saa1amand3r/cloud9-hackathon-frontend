import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import type { ReportInfo } from '../../types';
import { SectionHeader, StatCard, RoleIcon } from '../dashboard';
import { GamepadIcon, KDAIcon } from '../icons';
import { semanticColors } from '../../theme';

interface ReportInfoSectionProps {
  data: ReportInfo;
}

export function ReportInfoSection({ data }: ReportInfoSectionProps) {
  const kdRatio = (data.averageKills / data.averageDeaths).toFixed(2);
  const isKdPositive = data.averageKills > data.averageDeaths;

  return (
    <Box>
      <SectionHeader
        id="report-info"
        title={data.teamName}
        subtitle={`Analysis of ${data.gamesAnalyzed} games | Patch ${data.timeframe.patchVersion || 'N/A'}`}
      />

      <Stack spacing={3}>
        {/* Key Stats Row */}
        <Stack direction="row" flexWrap="wrap" gap={2}>
          <StatCard
            label="Games Analyzed"
            value={data.gamesAnalyzed}
            icon={<GamepadIcon />}
            sx={{ flex: '1 1 150px' }}
          />
          <StatCard
            label="Opponent Winrate"
            value={`${data.opponentWinrate}%`}
            variant={data.opponentWinrate >= 50 ? 'danger' : 'positive'}
            sx={{ flex: '1 1 150px' }}
          />
          <StatCard
            label="Avg K/D"
            value={`${data.averageKills.toFixed(1)} / ${data.averageDeaths.toFixed(1)}`}
            sublabel={`Ratio: ${kdRatio}`}
            variant={isKdPositive ? 'positive' : 'danger'}
            icon={<KDAIcon />}
            sx={{ flex: '1 1 180px' }}
          />
        </Stack>

        {/* Players */}
        <Box>
          <Typography variant="overline" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Roster
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {data.players.map((player) => (
              <Chip
                key={player.playerId}
                icon={<RoleIcon role={player.role} size={20} showTooltip={false} />}
                label={player.nickname}
                sx={{
                  bgcolor: 'action.hover',
                  borderColor: 'divider',
                  border: '1px solid',
                  height: 36,
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  pl: 2.5,
                  '& .MuiChip-icon': {
                    color: semanticColors.accent.main,
                    ml: 1,
                  },
                  '& .MuiChip-label': {
                    pr: 2.5,
                  },
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* Timeframe */}
        <Typography variant="caption" color="text.secondary">
          Analysis period: {data.timeframe.startDate} to {data.timeframe.endDate}
        </Typography>
      </Stack>
    </Box>
  );
}
