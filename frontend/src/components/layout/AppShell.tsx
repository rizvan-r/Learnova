import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import {
  GraduationCap,
  LayoutDashboard,
  Compass,
  Landmark,
  AlertCircle,
  CheckSquare,
  Stethoscope,
  ClipboardCheck,
  Languages,
  Sun,
  Moon,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  UserCheck,
} from 'lucide-react'

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t, i18n } = useTranslation()
  const { user, loginWithRole, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  const [isCollapsed, setIsCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false)

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'ta' : 'en'
    i18n.changeLanguage(nextLang)
  }

  // Navigation items tailored by role
  const getNavItems = () => {
    const items = [
      { path: '/', label: t('nav.home'), icon: <LayoutDashboard className="w-5 h-5" /> },
      { path: '/career', label: t('nav.careerExplorer'), icon: <Compass className="w-5 h-5" /> },
      { path: '/funds', label: t('nav.funds'), icon: <Landmark className="w-5 h-5" /> },
    ]

    if (user) {
      if (user.role === 'student') {
        items.splice(1, 0, {
          path: '/dashboard/student',
          label: t('nav.dashboard'),
          icon: <GraduationCap className="w-5 h-5" />,
        })
        items.push({
          path: '/complaints',
          label: t('nav.complaints'),
          icon: <AlertCircle className="w-5 h-5" />,
        })
      } else if (user.role === 'staff') {
        items.splice(1, 0, {
          path: '/dashboard/staff',
          label: t('nav.dashboard'),
          icon: <CheckSquare className="w-5 h-5" />,
        })
        items.push({
          path: '/complaints',
          label: t('nav.complaints'),
          icon: <AlertCircle className="w-5 h-5" />,
        })
      } else if (user.role === 'headmaster') {
        items.splice(1, 0, {
          path: '/dashboard/headmaster',
          label: t('nav.dashboard'),
          icon: <Landmark className="w-5 h-5" />,
        })
        items.push({
          path: '/complaints',
          label: t('nav.complaints'),
          icon: <AlertCircle className="w-5 h-5" />,
        })
      } else if (user.role === 'doctor') {
        items.splice(1, 0, {
          path: '/dashboard/doctor',
          label: t('nav.dashboard'),
          icon: <Stethoscope className="w-5 h-5" />,
        })
      } else if (user.role === 'education_officer') {
        items.splice(1, 0, {
          path: '/dashboard/officer',
          label: t('nav.dashboard'),
          icon: <ClipboardCheck className="w-5 h-5" />,
        })
        items.push({
          path: '/complaints',
          label: t('nav.complaints'),
          icon: <AlertCircle className="w-5 h-5" />,
        })
      }
    }

    return items
  }

  const navItems = getNavItems()

  const handleRoleSwitch = async (role: string) => {
    await loginWithRole(role)
    setRoleSwitcherOpen(false)
    navigate(`/dashboard/${role === 'education_officer' ? 'officer' : role}`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 md:px-6 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer"
            aria-label="Toggle mobile navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#087F72] to-[#2DD4BF] flex items-center justify-center text-white shadow-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#087F72] to-[#075E54] dark:from-[#2DD4BF] dark:to-teal-200 bg-clip-text text-transparent">
                Learnova
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs text-gray-500 dark:text-gray-400 font-medium border-l border-gray-300 dark:border-gray-600 pl-2">
                {t('common.tagline')}
              </span>
            </div>
          </Link>
        </div>

        {/* Public Navigation Header Links */}
        <nav className="hidden lg:flex items-center gap-1 mx-4">
          <Link
            to="/"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              location.pathname === '/' && !location.hash
                ? 'text-[#087F72] dark:text-[#2DD4BF] bg-teal-50 dark:bg-teal-950/50'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700/50'
            }`}
          >
            {t('nav.home')}
          </Link>

          <a
            href="/#education-updates"
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault()
                document.getElementById('education-updates')?.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
          >
            {t('nav.educationUpdates')}
          </a>

          <a
            href="/#school-progress"
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault()
                document.getElementById('school-progress')?.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
          >
            {t('nav.schoolProgress')}
          </a>

          <Link
            to="/career"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              location.pathname === '/career'
                ? 'text-[#087F72] dark:text-[#2DD4BF] bg-teal-50 dark:bg-teal-950/50'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700/50'
            }`}
          >
            {t('nav.careerExplorer')}
          </Link>
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 shrink-0">
          {/* Role Switcher Demo Dropdown (visible from sm breakpoint upwards) */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#DDF5EF] text-[#087F72] dark:bg-teal-950/70 dark:text-[#2DD4BF] border border-teal-200/60 dark:border-teal-800/60 hover:opacity-90 transition-opacity cursor-pointer"
              title="Switch demo role instantly"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span className="capitalize">{user ? user.role.replace('_', ' ') : 'Select Role'}</span>
            </button>

            {roleSwitcherOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 p-2 z-50">
                <div className="px-2 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  {t('home.demoLoginTitle')}
                </div>
                {[
                  { id: 'student', label: '1. Student (Priya R.)' },
                  { id: 'staff', label: '2. Staff (Anitha S.)' },
                  { id: 'headmaster', label: '3. Headmaster (Dr. K.M.)' },
                  { id: 'doctor', label: '4. Doctor (Dr. S. Vignesh)' },
                  { id: 'education_officer', label: '5. Education Officer (DEO)' },
                ].map((r) => (
                  <button
                    key={r.id}
                    onClick={() => handleRoleSwitch(r.id)}
                    className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors cursor-pointer ${
                      user?.role === r.id
                        ? 'bg-[#087F72] text-white dark:bg-[#2DD4BF] dark:text-gray-900 font-semibold'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            title="Switch Language: English / தமிழ்"
          >
            <Languages className="w-3.5 h-3.5 text-[#087F72] dark:text-[#2DD4BF]" />
            <span className="hidden sm:inline">{i18n.language === 'en' ? 'தமிழ்' : 'English'}</span>
            <span className="sm:hidden">{i18n.language === 'en' ? 'த' : 'EN'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 sm:p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
          </button>

          {/* User Profile / Logout */}
          {user ? (
            <div className="flex items-center gap-1.5 sm:gap-2 pl-1.5 sm:pl-2 border-l border-gray-200 dark:border-gray-700">
              <img
                src={user.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80'}
                alt={user.full_name}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-[#087F72]/30 dark:ring-[#2DD4BF]/40"
              />
              <button
                onClick={logout}
                className="p-1 sm:p-1.5 text-gray-500 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors cursor-pointer"
                title={t('common.logout')}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#087F72] text-white hover:bg-[#075E54] dark:bg-[#2DD4BF] dark:text-gray-900 transition-colors shrink-0"
            >
              {t('nav.login')}
            </Link>
          )}
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="flex-1 flex">
        {/* Desktop Expandable Sidebar */}
        <aside
          className={`hidden md:flex flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-300 ${
            isCollapsed ? 'w-[76px]' : 'w-[248px]'
          }`}
        >
          {/* Nav Links */}
          <nav className="flex-1 p-3 space-y-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'bg-[#087F72] text-white dark:bg-[#2DD4BF] dark:text-gray-900 shadow-xs'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <span className="shrink-0">{item.icon}</span>
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </Link>
              )
            })}
          </nav>

          {/* Collapse/Expand Toggle */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-full flex items-center justify-center p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex">
            <div className="w-72 bg-white dark:bg-gray-800 h-full p-4 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#087F72] text-white flex items-center justify-center">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-lg text-[#087F72] dark:text-[#2DD4BF]">Learnova</span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    aria-label="Close navigation"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Public Navigation in Drawer */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3">
                    Navigation
                  </span>
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#087F72]" />
                    <span>{t('nav.home')}</span>
                  </Link>

                  <a
                    href="/#education-updates"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      if (location.pathname === '/') {
                        document.getElementById('education-updates')?.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <CheckSquare className="w-4 h-4 text-teal-600" />
                    <span>{t('nav.educationUpdates')}</span>
                  </a>

                  <a
                    href="/#school-progress"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      if (location.pathname === '/') {
                        document.getElementById('school-progress')?.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Landmark className="w-4 h-4 text-purple-600" />
                    <span>{t('nav.schoolProgress')}</span>
                  </a>

                  <Link
                    to="/career"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Compass className="w-4 h-4 text-emerald-600" />
                    <span>{t('nav.careerExplorer')}</span>
                  </Link>

                  <Link
                    to="/funds"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Landmark className="w-4 h-4 text-blue-600" />
                    <span>{t('nav.funds')}</span>
                  </Link>
                </div>

                {/* Role specific items if logged in */}
                {user && (
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700 space-y-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3">
                      Authorized Workflows
                    </span>
                    {navItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
                          location.pathname === item.path
                            ? 'bg-[#087F72] text-white dark:bg-[#2DD4BF] dark:text-gray-900'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                {!user && (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center py-2 px-4 rounded-xl bg-[#087F72] text-white font-semibold text-xs shadow-xs hover:bg-[#075E54]"
                  >
                    {t('nav.login')}
                  </Link>
                )}
                <div className="text-[11px] text-gray-500 text-center">
                  {t('common.demoBadge')}
                </div>
              </div>
            </div>
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
          </div>
        )}

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8 px-4 md:px-8 text-xs text-gray-500 dark:text-gray-400">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#087F72] text-white flex items-center justify-center shadow-xs">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-base text-gray-900 dark:text-gray-100">Learnova</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t('common.tagline')}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
              <Link to="/" className="hover:text-[#087F72] dark:hover:text-[#2DD4BF] transition-colors">{t('nav.home')}</Link>
              <a href="/#education-updates" className="hover:text-[#087F72] dark:hover:text-[#2DD4BF] transition-colors">{t('nav.educationUpdates')}</a>
              <a href="/#school-progress" className="hover:text-[#087F72] dark:hover:text-[#2DD4BF] transition-colors">{t('nav.schoolProgress')}</a>
              <Link to="/career" className="hover:text-[#087F72] dark:hover:text-[#2DD4BF] transition-colors">{t('nav.careerExplorer')}</Link>
              <Link to="/funds" className="hover:text-[#087F72] dark:hover:text-[#2DD4BF] transition-colors">{t('nav.funds')}</Link>
              <Link to="/login" className="hover:text-[#087F72] dark:hover:text-[#2DD4BF] transition-colors">{t('nav.login')}</Link>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-700/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-gray-400">
            <p>© 2026 Learnova. {t('common.demoBadge')} — Department of School Education Governance Prototype.</p>
            <p>Strict Privacy Protocols: Zero public disclosure of private student health, academic, or grievance records.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
