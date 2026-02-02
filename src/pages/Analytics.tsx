import { useState, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import LinearProgress from '@mui/material/LinearProgress';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell,
} from 'recharts';
import { semanticColors } from '../theme';
import { getChampionName, getChampionImageUrl } from '../data/championMap';
import analyticsData from '../data/scouting_analytics.json';
import type { ChampionDNAProfile, TopSynergy, Archetype } from '../types/analytics';

const data = analyticsData as typeof analyticsData;

// Animated counter hook
function useAnimatedCounter(end: number, duration = 2000): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return count;
}

// Champion portrait component
function ChampionPortrait({
  championId,
  size = 48,
  showName = true,
  winrate,
  subtitle,
}: {
  championId: number;
  size?: number;
  showName?: boolean;
  winrate?: number;
  subtitle?: string;
}) {
  const name = getChampionName(championId);
  const imageUrl = getChampionImageUrl(championId);

  return (
    <Tooltip title={`${name}${winrate ? ` - ${winrate.toFixed(1)}% WR` : ''}`} arrow>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
        <Box
          sx={{
            width: size,
            height: size,
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid',
            borderColor: winrate && winrate > 55 ? semanticColors.positive.main :
                        winrate && winrate < 48 ? semanticColors.danger.main :
                        'divider',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'scale(1.1)',
              boxShadow: '0 6px 20px rgba(26, 95, 122, 0.4)',
            },
          }}
        >
          <img
            src={imageUrl}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://via.placeholder.com/${size}?text=${name[0]}`;
            }}
          />
        </Box>
        {showName && (
          <Typography variant="caption" sx={{
            fontSize: size < 40 ? '0.65rem' : '0.75rem',
            color: 'text.secondary',
            textAlign: 'center',
            maxWidth: size + 20,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {name}
          </Typography>
        )}
        {subtitle && (
          <Typography variant="caption" sx={{
            fontSize: '0.65rem',
            color: winrate && winrate > 55 ? semanticColors.positive.main : 'text.secondary',
            fontWeight: 600,
          }}>
            {subtitle}
          </Typography>
        )}
      </Box>
    </Tooltip>
  );
}

// Section wrapper with animation
function Section({
  title,
  description,
  children,
  delay = 0,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <Box
      sx={{
        mb: 6,
        animation: 'slideUpFadeIn 0.6s ease-out forwards',
        animationDelay: `${delay}ms`,
        opacity: 0,
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700 }}>
          {description}
        </Typography>
      </Box>
      {children}
    </Box>
  );
}

// Champion DNA Radar visualization
function ChampionDNARadar({ profiles, selectedId }: { profiles: ChampionDNAProfile[]; selectedId: number | null }) {
  const profile = profiles.find(p => p.champion_id === selectedId) ?? profiles[0];

  const radarData = data.vizConfigs.radarDimensions.map(dim => ({
    dimension: dim,
    value: profile[dim as keyof ChampionDNAProfile] as number,
    fullMark: 100,
  }));

  return (
    <Box sx={{
      bgcolor: 'background.paper',
      borderRadius: 3,
      p: 3,
      border: '1px solid',
      borderColor: 'divider',
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <ChampionPortrait championId={profile.champion_id} size={56} showName={false} />
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {getChampionName(profile.champion_id)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Playstyle DNA Profile
          </Typography>
        </Box>
      </Box>
      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={radarData}>
          <PolarGrid stroke="rgba(255,255,255,0.1)" />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{ fill: '#8b9ab5', fontSize: 11 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: '#8b9ab5', fontSize: 10 }}
          />
          <Radar
            name={getChampionName(profile.champion_id)}
            dataKey="value"
            stroke={semanticColors.accent.main}
            fill={semanticColors.accent.main}
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </Box>
  );
}

// Synergy Pair Card
function SynergyPairCard({ synergy, rank }: { synergy: TopSynergy; rank: number }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.2s',
        '&:hover': {
          borderColor: semanticColors.positive.main,
          transform: 'translateX(4px)',
        },
      }}
    >
      <Typography
        sx={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: rank <= 3 ? semanticColors.positive.main : 'text.secondary',
          minWidth: 32,
        }}
      >
        #{rank}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: -1 }}>
        <ChampionPortrait championId={synergy.champ1} size={44} showName={false} />
        <Box sx={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          bgcolor: semanticColors.positive.main,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          border: '2px solid',
          borderColor: 'background.paper',
        }}>
          <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: 'white' }}>+</Typography>
        </Box>
        <ChampionPortrait championId={synergy.champ2} size={44} showName={false} />
      </Box>
      <Box sx={{ flex: 1, ml: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {getChampionName(synergy.champ1)} & {getChampionName(synergy.champ2)}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {synergy.games} games together
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'right' }}>
        <Typography
          sx={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: semanticColors.positive.main,
          }}
        >
          {synergy.winrate.toFixed(1)}%
        </Typography>
        <Typography variant="caption" color="text.secondary">
          win rate
        </Typography>
      </Box>
    </Box>
  );
}

// Archetype Card
function ArchetypeCard({ archetype, color }: { archetype: Archetype; color: string }) {
  const championIds = archetype.signature_champions.map(s => parseInt(s, 10));

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: 'background.paper',
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        borderLeft: `4px solid ${color}`,
        transition: 'all 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 8px 24px ${color}33`,
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box>
          <Chip
            label={archetype.archetype}
            size="small"
            sx={{
              bgcolor: `${color}22`,
              color: color,
              fontWeight: 600,
              mb: 1,
            }}
          />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {archetype.share.toFixed(0)}%
          </Typography>
          <Typography variant="caption" color="text.secondary">
            of all team comps
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: archetype.winrate > 50 ? semanticColors.positive.main :
                     archetype.winrate < 48 ? semanticColors.danger.main : 'text.primary',
            }}
          >
            {archetype.winrate.toFixed(1)}%
          </Typography>
          <Typography variant="caption" color="text.secondary">
            win rate
          </Typography>
        </Box>
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
        Core Champions
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {championIds.slice(0, 5).map(id => (
          <ChampionPortrait key={id} championId={id} size={36} showName={false} />
        ))}
      </Box>
    </Box>
  );
}

// Main Analytics page component
interface AnalyticsProps {
  onBack: () => void;
}

export function Analytics({ onBack }: AnalyticsProps) {
  const [selectedDnaChampion, setSelectedDnaChampion] = useState<number | null>(null);

  const totalGames = useAnimatedCounter(data.meta.total_records);
  const totalChampions = useAnimatedCounter(data.meta.unique_champions);

  // Get top champions for DNA selection
  const topChampions = useMemo(() =>
    data.champions.topByPickrate.slice(0, 12),
    []
  );

  // Top 10 synergies
  const topSynergies = useMemo(() =>
    data.synergyNetwork.topSynergies.slice(0, 8),
    []
  );

  // Winrate bar chart data
  const winrateChartData = useMemo(() =>
    data.champions.topByWinrate.slice(0, 10).map(c => ({
      name: getChampionName(c.champion_id),
      winrate: c.winrate,
      championId: c.champion_id,
    })),
    []
  );

  return (
    <Box sx={{ minHeight: '100vh', pb: 8 }}>
      {/* Hero Header */}
      <Box
        sx={{
          position: 'relative',
          py: { xs: 6, md: 10 },
          px: 3,
          background: `linear-gradient(135deg, ${semanticColors.accent.dark}22 0%, transparent 50%)`,
          borderBottom: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
        }}
      >
        {/* Decorative grid */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(rgba(26, 95, 122, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(26, 95, 122, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            pointerEvents: 'none',
          }}
        />

        <Box sx={{ maxWidth: 1200, mx: 'auto', position: 'relative' }}>
          <Button
            onClick={onBack}
            sx={{
              mb: 3,
              color: 'text.secondary',
              '&:hover': { color: 'text.primary' },
            }}
          >
            ← Back to Login
          </Button>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                bgcolor: `${semanticColors.accent.main}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography sx={{ fontSize: '1.5rem' }}>📊</Typography>
            </Box>
            <Box>
              <Typography variant="overline" color="text.secondary">
                Cloud9 Analytics Lab
              </Typography>
              <Typography variant="h2" sx={{ fontWeight: 700, lineHeight: 1.1 }}>
                Meta Intelligence
              </Typography>
            </Box>
          </Box>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 600, mb: 4, fontWeight: 400 }}
          >
            Deep insights from {totalGames.toLocaleString()}+ ranked games,
            analyzing {totalChampions} champions to give you the competitive edge.
          </Typography>

          {/* Stats row */}
          <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {[
              { label: 'Games Analyzed', value: totalGames.toLocaleString(), icon: '🎮' },
              { label: 'Champions Tracked', value: totalChampions.toString(), icon: '⚔️' },
              { label: 'Synergy Pairs', value: data.synergyNetwork.edges.length.toString(), icon: '🤝' },
              { label: 'Team Archetypes', value: data.archetypes.clusters.length.toString(), icon: '🧩' },
            ].map(stat => (
              <Box key={stat.label} sx={{ minWidth: 120 }}>
                <Typography sx={{ fontSize: '2rem', fontWeight: 700, lineHeight: 1 }}>
                  {stat.icon} {stat.value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, pt: 6 }}>

        {/* Champion Win Rates */}
        <Section
          title="Highest Win Rate Champions"
          description="These champions are statistically dominating the current meta. A high win rate combined with decent pick rate indicates a genuinely strong pick, not just a one-trick anomaly."
          delay={100}
        >
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 3,
          }}>
            <Box sx={{
              bgcolor: 'background.paper',
              borderRadius: 3,
              p: 3,
              border: '1px solid',
              borderColor: 'divider',
            }}>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={winrateChartData} layout="vertical" margin={{ left: 80 }}>
                  <XAxis type="number" domain={[45, 60]} tick={{ fill: '#8b9ab5' }} />
                  <YAxis type="category" dataKey="name" tick={{ fill: '#e2e8f0', fontSize: 12 }} />
                  <Bar dataKey="winrate" radius={[0, 4, 4, 0]}>
                    {winrateChartData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={entry.winrate > 54 ? semanticColors.positive.main :
                              entry.winrate > 52 ? semanticColors.accent.main :
                              semanticColors.muted.main}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {data.champions.topByWinrate.slice(0, 5).map((champ, i) => (
                <Box
                  key={champ.champion_id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Typography sx={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: i < 3 ? semanticColors.positive.main : 'text.secondary',
                    minWidth: 28,
                  }}>
                    #{i + 1}
                  </Typography>
                  <ChampionPortrait championId={champ.champion_id} size={48} showName={false} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {getChampionName(champ.champion_id)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {champ.games} games · {champ.pickrate.toFixed(1)}% pick rate
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: semanticColors.positive.main }}
                    >
                      {champ.winrate.toFixed(1)}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={champ.winrate}
                      sx={{
                        width: 60,
                        height: 4,
                        borderRadius: 2,
                        bgcolor: 'rgba(255,255,255,0.1)',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: semanticColors.positive.main,
                        },
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Section>

        {/* Champion Synergies */}
        <Section
          title="Strongest Champion Synergies"
          description="When these duos are on the same team, they consistently outperform expectations. Whether it's complementary abilities, lane dominance, or teamfight synergy—these pairs are proven winners."
          delay={200}
        >
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 2,
          }}>
            {topSynergies.map((syn, i) => (
              <SynergyPairCard key={`${syn.champ1}-${syn.champ2}`} synergy={syn} rank={i + 1} />
            ))}
          </Box>
        </Section>

        {/* Champion DNA */}
        <Section
          title="Champion DNA Profiles"
          description="Every champion has a unique 'fingerprint' based on how they're played. This radar shows six key dimensions: Aggression (early fights), Risk (volatility), Support (utility), Economy (gold efficiency), Damage (output), and Vision (map control)."
          delay={300}
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
              Select a champion to view their DNA profile:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {topChampions.map(champ => (
                <Box
                  key={champ.champion_id}
                  onClick={() => setSelectedDnaChampion(champ.champion_id)}
                  sx={{
                    cursor: 'pointer',
                    opacity: selectedDnaChampion === champ.champion_id ? 1 : 0.6,
                    transition: 'all 0.2s',
                    '&:hover': { opacity: 1 },
                  }}
                >
                  <ChampionPortrait championId={champ.champion_id} size={40} showName={false} />
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
            gap: 3,
          }}>
            <ChampionDNARadar
              profiles={data.championDNA.profiles}
              selectedId={selectedDnaChampion ?? topChampions[0]?.champion_id ?? 1}
            />
            <ChampionDNARadar
              profiles={data.championDNA.profiles}
              selectedId={topChampions[1]?.champion_id ?? 2}
            />
            <ChampionDNARadar
              profiles={data.championDNA.profiles}
              selectedId={topChampions[2]?.champion_id ?? 3}
            />
          </Box>
        </Section>

        {/* Team Archetypes */}
        <Section
          title="Team Composition Archetypes"
          description="Using machine learning clustering, we identified distinct team composition 'styles' in the meta. Each archetype represents a strategic approach—understanding these helps you draft with purpose and counter enemy strategies."
          delay={400}
        >
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(5, 1fr)' },
            gap: 2,
          }}>
            {data.archetypes.clusters.map((arch, i) => (
              <ArchetypeCard
                key={arch.cluster}
                archetype={arch}
                color={data.vizConfigs.clusterColors[i]}
              />
            ))}
          </Box>
        </Section>

        {/* Counter Picks */}
        <Section
          title="Dominant Counter Picks"
          description="These matchups are brutally one-sided. If you see the enemy lock in one of these champions, here's who to pick to make their game miserable. Data doesn't lie—these counters have proven 100% win rates in our sample."
          delay={500}
        >
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
            gap: 2,
          }}>
            {data.counterPicks.bestCounters.slice(0, 9).map((counter) => (
              <Box
                key={`${counter.my_champion}-${counter.vs_champion}`}
                sx={{
                  p: 2.5,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: semanticColors.danger.main,
                  },
                }}
              >
                <ChampionPortrait
                  championId={counter.my_champion}
                  size={52}
                  showName={false}
                  winrate={counter.winrate}
                />
                <Box sx={{ textAlign: 'center' }}>
                  <Typography sx={{
                    fontSize: '1.5rem',
                    color: semanticColors.danger.main,
                    lineHeight: 1,
                  }}>
                    →
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    beats
                  </Typography>
                </Box>
                <ChampionPortrait
                  championId={counter.vs_champion}
                  size={52}
                  showName={false}
                />
                <Box sx={{ flex: 1, textAlign: 'right' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: semanticColors.positive.main }}>
                    {counter.winrate.toFixed(0)}%
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {counter.games} games
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Section>

        {/* Footer CTA */}
        <Box
          sx={{
            textAlign: 'center',
            py: 6,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Ready to Scout Your Next Opponent?
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Use our AI-powered scouting tool to analyze any team's draft tendencies.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={onBack}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              bgcolor: semanticColors.accent.main,
              '&:hover': { bgcolor: semanticColors.accent.light },
            }}
          >
            Start Scouting
          </Button>
        </Box>
      </Box>
    </Box>
  );
}