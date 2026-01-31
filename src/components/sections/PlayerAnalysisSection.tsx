import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type { PlayerAnalysis } from '../../types';
import { SectionHeader } from '../dashboard';
import { EntropyBar } from '../charts';

interface PlayerAnalysisSectionProps {
  data: PlayerAnalysis[];
}

export function PlayerAnalysisSection({ data }: PlayerAnalysisSectionProps) {
  return (
    <Box>
      <SectionHeader
        id="player-analysis"
        title="Player Analysis"
        subtitle="Individual player unpredictability and champion pool depth"
      />

      <Card>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontWeight: 600, mb: 1, fontSize: '1.25rem' }}>
              Player Volatility (Entropy)
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
              Higher entropy indicates a wider champion pool and less predictable picks.
              Players with high volatility may surprise with pocket picks.
            </Typography>
          </Box>

          <EntropyBar players={data} />
        </CardContent>
      </Card>
    </Box>
  );
}
