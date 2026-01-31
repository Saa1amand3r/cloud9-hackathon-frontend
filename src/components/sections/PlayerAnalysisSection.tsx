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
        <CardContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
              Player Volatility (Entropy)
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Higher entropy indicates a wider champion pool and less predictable picks
            </Typography>
          </Box>

          <EntropyBar players={data} />
        </CardContent>
      </Card>
    </Box>
  );
}
