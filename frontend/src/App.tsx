import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './i18n/i18n'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { AppShell } from './components/layout/AppShell'

// Pages
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { StudentDashboard } from './pages/student/StudentDashboard'
import { StaffDashboard } from './pages/staff/StaffDashboard'
import { HeadmasterDashboard } from './pages/headmaster/HeadmasterDashboard'
import { DoctorDashboard } from './pages/doctor/DoctorDashboard'
import { OfficerDashboard } from './pages/officer/OfficerDashboard'
import { CareerExplorer } from './pages/career/CareerExplorer'
import { FundsTransparency } from './pages/funds/FundsTransparency'
import { ComplaintsPage } from './pages/complaints/ComplaintsPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60000,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <AppShell>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard/student" element={<StudentDashboard />} />
                <Route path="/dashboard/staff" element={<StaffDashboard />} />
                <Route path="/dashboard/headmaster" element={<HeadmasterDashboard />} />
                <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
                <Route path="/dashboard/officer" element={<OfficerDashboard />} />
                <Route path="/career" element={<CareerExplorer />} />
                <Route path="/funds" element={<FundsTransparency />} />
                <Route path="/complaints" element={<ComplaintsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AppShell>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
