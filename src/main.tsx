import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './contexts/ThemeContext'
import App from './App.tsx'

async function enableMocking() {
  // Only enable MSW when VITE_USE_MOCK is explicitly set to 'true'
  if (import.meta.env.VITE_USE_MOCK === 'true') {
    console.log('[App] MSW mock mode enabled')
    const { worker } = await import('./mocks/browser')
    return worker.start({ onUnhandledRequest: 'bypass' })
  }
  console.log('[App] Using real backend at:', import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000')
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StrictMode>,
  )
})
