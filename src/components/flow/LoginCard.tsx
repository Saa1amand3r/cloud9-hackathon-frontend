import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { semanticColors } from '../../theme';

interface LoginCardProps {
  onLogin: () => void;
}

export function LoginCard({ onLogin }: LoginCardProps) {
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
          maxWidth: 420,
          width: '100%',
          p: 5,
          borderRadius: 4,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          textAlign: 'center',
        }}
      >
        {/* Logo / Brand */}
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            bgcolor: `${semanticColors.accent.main}20`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: '2.5rem',
              fontWeight: 800,
              color: semanticColors.accent.main,
            }}
          >
            C9
          </Typography>
        </Box>

        <Typography
          sx={{
            fontSize: '1.75rem',
            fontWeight: 700,
            mb: 1,
          }}
        >
          Cloudy Poro
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            fontSize: '1.1rem',
            mb: 4,
            lineHeight: 1.5,
          }}
        >
          AI-powered esports analytics platform
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={onLogin}
          fullWidth
          sx={{
            py: 1.75,
            fontSize: '1.1rem',
            fontWeight: 600,
            borderRadius: 2,
            bgcolor: semanticColors.accent.main,
            '&:hover': {
              bgcolor: semanticColors.accent.light,
            },
          }}
        >
          Login as Cloud9
        </Button>

        <Typography
          color="text.secondary"
          sx={{
            fontSize: '0.9rem',
            mt: 3,
            opacity: 0.7,
          }}
        >
          Demo Mode
        </Typography>
      </Box>
    </Box>
  );
}
