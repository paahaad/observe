import { ThemeProvider } from "@/components/theme-provider.tsx"
import ObserverDashboard from "@/pages/landing.tsx"

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ObserverDashboard />
    </ThemeProvider>
  )
}

export default App
