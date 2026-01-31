import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import type { ScenarioStats } from '../../types';
import { semanticColors } from '../../theme';

interface ScenarioRadarProps {
  stats: ScenarioStats;
  size?: number;
  color?: string;
}

const statLabels: Record<string, string> = {
  teamfightiness: 'Teamfight',
  earlyAggression: 'Early Aggro',
  draftVolatility: 'Draft Flex',
  macro: 'Macro',
};

export function ScenarioRadar({ stats, size = 160, color }: ScenarioRadarProps) {
  const fillColor = color || semanticColors.highlight.main;

  // Convert stats object to array format for Recharts
  const data = Object.entries(stats).map(([key, value]) => ({
    stat: statLabels[key] || key,
    value: value * 100,
    fullMark: 100,
  }));

  return (
    <ResponsiveContainer width={size} height={size}>
      <RadarChart data={data} margin={{ top: 10, right: 25, bottom: 10, left: 25 }}>
        <PolarGrid
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth={1}
        />
        <PolarAngleAxis
          dataKey="stat"
          tick={{
            fill: 'rgba(255, 255, 255, 0.9)',
            fontSize: 11,
            fontWeight: 600,
          }}
          tickLine={false}
        />
        <Radar
          name="Stats"
          dataKey="value"
          stroke={fillColor}
          fill={fillColor}
          fillOpacity={0.4}
          strokeWidth={3}
          animationDuration={800}
          animationEasing="ease-out"
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
