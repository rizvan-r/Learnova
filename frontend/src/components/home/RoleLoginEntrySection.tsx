import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../context/AuthContext'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import {
  GraduationCap,
  Briefcase,
  Landmark,
  Stethoscope,
  FileCheck2,
  ArrowRight,
  KeyRound,
} from 'lucide-react'

export const RoleLoginEntrySection: React.FC = () => {
  const { t, i18n } = useTranslation()
  const { loginWithRole } = useAuth()
  const navigate = useNavigate()

  const handleRoleSelect = async (role: string) => {
    await loginWithRole(role)
    const route = role === 'education_officer' ? 'officer' : role
    navigate(`/dashboard/${route}`)
  }

  const roles = [
    {
      role: 'student',
      title: t('nav.student', 'Student'),
      persona: 'Priya Ramanathan (11-A)',
      desc: 'Academic portfolio, 1-vote facility polling, anonymous grievance redressal, and career roadmaps.',
      desc_ta: 'கல்வி போர்ட்ஃபோலியோ, 1-வாக்கு வசதி வாக்கெடுப்பு, அநாமதேய குறைதீர்ப்பு மற்றும் தொழில் வழிகாட்டல்.',
      icon: <GraduationCap className="w-6 h-6 text-[#087F72] dark:text-[#2DD4BF]" />,
      bg: 'bg-teal-50 dark:bg-teal-950/60',
    },
    {
      role: 'staff',
      title: t('nav.staff', 'Teacher / Staff'),
      persona: 'Anitha S. (PG Computer Science)',
      desc: 'Fortnightly digital pedagogical evidence, lesson calendars, events publishing, and performance points.',
      desc_ta: 'இருவார டிஜிட்டல் கற்பித்தல் சான்றுகள், பாட காலண்டர், நிகழ்வுகள் வெளியீடு மற்றும் மதிப்பீட்டு புள்ளிகள்.',
      icon: <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      bg: 'bg-blue-50 dark:bg-blue-950/60',
    },
    {
      role: 'headmaster',
      title: t('nav.headmaster', 'Headmaster'),
      persona: 'Dr. K. Meenakshi Sundaram',
      desc: 'School grant breakdown, fund requests, anonymous grievance review, and polytechnic ties.',
      desc_ta: 'பள்ளி மானிய விவரங்கள், நிதி கோரிக்கைகள், அநாமதேய குறைதீர்ப்பு மற்றும் கல்லூரி கூட்டாண்மைகள்.',
      icon: <Landmark className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
      bg: 'bg-purple-50 dark:bg-purple-950/60',
    },
    {
      role: 'doctor',
      title: t('nav.doctorRole', 'Medical Officer'),
      persona: 'Dr. S. Vignesh M.B.B.S.',
      desc: 'School screening visit schedule, student health assessment logging, and simulated parent notifications.',
      desc_ta: 'பள்ளி சுகாதார ஆய்வு காலண்டர், மாணவர் உடல்நல பதிவு மற்றும் உருவகப்படுத்தப்பட்ட பெற்றோர் எஸ்எம்எஸ்.',
      icon: <Stethoscope className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
      bg: 'bg-rose-50 dark:bg-rose-950/60',
    },
    {
      role: 'education_officer',
      title: t('nav.officer', 'Education Officer'),
      persona: 'Thiru R. Karunakaran (DEO)',
      desc: 'District school directory, complaint escalations, geotagged inspection scoring, and grant approvals.',
      desc_ta: 'மாவட்ட பள்ளி அடைவு, புகார் தீவிரப்படுத்தல், ஜியோடேக் செய்யப்பட்ட ஆய்வு மதிப்பெண்கள் மற்றும் மானிய ஒப்புதல்.',
      icon: <FileCheck2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      bg: 'bg-emerald-50 dark:bg-emerald-950/60',
    },
  ]

  return (
    <section className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#DDF5EF] text-[#087F72] dark:bg-teal-950/60 dark:text-[#2DD4BF]">
              <KeyRound className="w-3.5 h-3.5" />
              {t('home.roleAccessBadge', 'Instant Demo Authentication')}
            </span>
            <Badge variant="outline" size="sm" className="text-gray-500 dark:text-gray-400">
              {t('home.simulatedAccounts', 'Simulated Prototype Credentials')}
            </Badge>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
            {t('home.demoLoginTitle', 'Demo Access by Educational Role')}
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1 max-w-2xl">
            {t(
              'home.demoLoginSubtitle',
              'Select any educational role below to instantly preview authorized role-specific dashboards, workflows, and administrative actions.'
            )}
          </p>
        </div>

        <Link to="/login" className="shrink-0">
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#087F72] dark:text-[#2DD4BF] hover:underline cursor-pointer">
            <span>{t('home.goToLoginPage', 'Go to Main Sign In')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {roles.map((item) => {
          const isTamil = i18n.language === 'ta'
          const description = isTamil ? item.desc_ta : item.desc

          return (
            <Card
              key={item.role}
              className="flex flex-col justify-between hover:border-[#087F72] dark:hover:border-[#2DD4BF] hover:shadow-md transition-all cursor-pointer group p-5"
              onClick={() => handleRoleSelect(item.role)}
            >
              <div className="space-y-3">
                <div
                  className={`p-3 w-fit rounded-xl ${item.bg} group-hover:scale-105 transition-transform shadow-xs`}
                >
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                  {description}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-700/60 mt-4 space-y-2.5">
                <span className="inline-block text-[11px] font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700/60 px-2.5 py-1 rounded-md border border-gray-200/80 dark:border-gray-600/80 truncate max-w-full">
                  {item.persona}
                </span>
                <div className="flex items-center text-xs sm:text-sm font-semibold text-[#087F72] dark:text-[#2DD4BF] group-hover:translate-x-1 transition-transform">
                  <span>Enter Dashboard</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
