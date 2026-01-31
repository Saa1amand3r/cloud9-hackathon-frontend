import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';
import { useTheme } from '@mui/material/styles';
import type { PlayerAnalysis } from '../../types';
import { semanticColors } from '../../theme';

interface EntropyBarProps {
  players: PlayerAnalysis[];
  height?: number;
}

function getEntropyColor(entropy: number): string {
  if (entropy >= 0.7) return semanticColors.highlight.main;
  if (entropy >= 0.5) return semanticColors.accent.main;
  return semanticColors.muted.main;
}

export function EntropyBar({ players, height }: EntropyBarProps) {
  const theme = useTheme();

  // Sort by entropy descending
  const sortedPlayers = [...players].sort((a, b) => b.entropy - a.entropy);

  const data = sortedPlayers.map((p) => ({
    name: p.nickname,
    entropy: p.entropy,
    displayValue: (p.entropy * 100).toFixed(0),
  }));

  const barHeight = 48;
  const chartHeight = height || Math.max(300, data.length * barHeight + 60);

  return (
    <ResponsiveContainer width="100%" height={chartHeight}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 10, right: 70, left: 100, bottom: 10 }}
      >
        <XAxis
          type="number"
          domain={[0, 1]}
          tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
          tick={{ fill: theme.palette.text.secondary, fontSize: 14, fontWeight: 500 }}
          axisLine={{ stroke: theme.palette.divider }}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fill: theme.palette.text.primary, fontSize: 16, fontWeight: 600 }}
          axisLine={false}
          tickLine={false}
          width={90}
        />
        <Bar
          dataKey="entropy"
          radius={[0, 6, 6, 0]}
          animationDuration={1000}
          animationEasing="ease-out"
          barSize={32}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={getEntropyColor(entry.entropy)} />
          ))}
          <LabelList
            dataKey="displayValue"
            position="right"
            formatter={(v) => `${v}%`}
            style={{
              fill: theme.palette.text.primary,
              fontSize: 15,
              fontWeight: 600,
            }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
