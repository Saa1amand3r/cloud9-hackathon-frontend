import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { semanticColors } from '../../theme';

interface SearchPageProps {
  onSearch: (teamName: string) => void;
}

const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" opacity={0.5}>
    <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 001.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 00-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 005.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

export function SearchPage({ onSearch }: SearchPageProps) {
  const [teamName, setTeamName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teamName.trim()) {
      onSearch(teamName.trim());
    }
  };

  const handleQuickSelect = (name: string) => {
    setTeamName(name);
  };

  const suggestedTeams = ['T1', 'Gen.G', 'Fnatic', 'G2 Esports', 'Team Liquid'];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        p: 3,
      }}
    >
      <Box
        sx={{
          maxWidth: 600,
          width: '100%',
          textAlign: 'center',
        }}
      >
        {/* Header */}
        <Typography
          sx={{
            fontSize: '2.5rem',
            fontWeight: 700,
            mb: 1,
          }}
        >
          Search for Opponent Team
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            fontSize: '1.15rem',
            mb: 5,
            lineHeight: 1.5,
          }}
        >
          Enter the team name to generate a comprehensive analysis report
        </Typography>

        {/* Search Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            gap: 2,
            mb: 4,
          }}
        >
          <TextField
            fullWidth
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter team name..."
            variant="outlined"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                fontSize: '1.15rem',
                borderRadius: 2,
                bgcolor: 'background.paper',
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={!teamName.trim()}
            sx={{
              px: 4,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: 2,
              bgcolor: semanticColors.accent.main,
              whiteSpace: 'nowrap',
              '&:hover': {
                bgcolor: semanticColors.accent.light,
              },
            }}
          >
            Generate Report
          </Button>
        </Box>

        {/* Quick Select */}
        <Box>
          <Typography
            color="text.secondary"
            sx={{ fontSize: '0.95rem', mb: 2 }}
          >
            Quick select:
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1.5,
              justifyContent: 'center',
            }}
          >
            {suggestedTeams.map((team) => (
              <Button
                key={team}
                variant="outlined"
                size="small"
                onClick={() => handleQuickSelect(team)}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem',
                  px: 2.5,
                  py: 1,
                  borderColor: teamName === team ? semanticColors.accent.main : 'divider',
                  color: teamName === team ? semanticColors.accent.main : 'text.secondary',
                  bgcolor: teamName === team ? `${semanticColors.accent.main}15` : 'transparent',
                  '&:hover': {
                    borderColor: semanticColors.accent.main,
                    bgcolor: `${semanticColors.accent.main}10`,
                  },
                }}
              >
                {team}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
