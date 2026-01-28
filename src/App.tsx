import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import { useThemeMode } from './contexts/ThemeContext'
import { semanticColors } from './theme'

const LightModeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
  </svg>
)

const DarkModeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
  </svg>
)

function App() {
  const { mode, toggleTheme } = useThemeMode()

  return (
    <Box sx={{ minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <Stack spacing={4}>
          {/* Header with theme toggle */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" component="h1">
              Cloudy Poro
            </Typography>
            <IconButton
              onClick={toggleTheme}
              color="primary"
              sx={{
                bgcolor: 'action.hover',
                '&:hover': { bgcolor: 'action.selected' }
              }}
            >
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Box>

          {/* Semantic Colors Demo */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Semantic Color System
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Consistent meaning colors for dashboard components
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Chip
                  label="Info / Insight"
                  sx={{ bgcolor: semanticColors.accent.main, color: '#fff' }}
                />
                <Chip
                  label="Positive / Win"
                  sx={{ bgcolor: semanticColors.positive.main, color: '#fff' }}
                />
                <Chip
                  label="Warning / Volatile"
                  sx={{ bgcolor: semanticColors.warning.main, color: '#000' }}
                />
                <Chip
                  label="Danger / Threat"
                  sx={{ bgcolor: semanticColors.danger.main, color: '#fff' }}
                />
                <Chip
                  label="New / Changed"
                  sx={{ bgcolor: semanticColors.highlight.main, color: '#fff' }}
                />
                <Chip
                  label="Inactive / Historical"
                  sx={{ bgcolor: semanticColors.muted.main, color: '#fff' }}
                />
              </Stack>
            </CardContent>
          </Card>

          {/* Alerts Demo */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Alert Variants
              </Typography>
              <Stack spacing={2}>
                <Alert severity="info">Info: Neutral insight or information</Alert>
                <Alert severity="success">Success: Positive outcome or advantage</Alert>
                <Alert severity="warning">Warning: Volatile or uncertain situation</Alert>
                <Alert severity="error">Error: Danger or high threat detected</Alert>
              </Stack>
            </CardContent>
          </Card>

          {/* Buttons Demo */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Button Variants
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                <Button variant="contained" color="primary">Primary</Button>
                <Button variant="contained" color="secondary">Secondary</Button>
                <Button variant="contained" color="success">Success</Button>
                <Button variant="contained" color="warning">Warning</Button>
                <Button variant="contained" color="error">Error</Button>
                <Button variant="outlined" color="primary">Outlined</Button>
                <Button variant="text" color="primary">Text</Button>
              </Stack>
            </CardContent>
          </Card>

          {/* Typography Demo */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Typography Scale
              </Typography>
              <Stack spacing={1}>
                <Typography variant="h1">Heading 1</Typography>
                <Typography variant="h2">Heading 2</Typography>
                <Typography variant="h3">Heading 3</Typography>
                <Typography variant="h4">Heading 4</Typography>
                <Typography variant="h5">Heading 5</Typography>
                <Typography variant="h6">Heading 6</Typography>
                <Typography variant="body1">Body 1 - Primary text content</Typography>
                <Typography variant="body2" color="text.secondary">
                  Body 2 - Secondary text content with muted color
                </Typography>
                <Typography variant="caption" display="block">
                  Caption - Small text for labels
                </Typography>
                <Typography variant="overline" display="block">
                  Overline - Category labels
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Box>
  )
}

export default App
