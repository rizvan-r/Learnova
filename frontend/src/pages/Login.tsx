import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import {
  GraduationCap,
  Briefcase,
  Landmark,
  Stethoscope,
  FileCheck2,
  Lock,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'

export const Login: React.FC = () => {
  const { loginWithRole, loginWithEmis, isLoading } = useAuth()
  const navigate = useNavigate()

  const [tab, setTab] = useState<'demo' | 'emis'>('demo')
  const [emisNumber, setEmisNumber] = useState('3302010010101')
  const [dob, setDob] = useState('2009-08-15')
  const [errorMsg, setErrorMsg] = useState('')

  const handleRoleLogin = async (role: string) => {
    try {
      await loginWithRole(role)
      const route = role === 'education_officer' ? 'officer' : role
      navigate(`/dashboard/${route}`)
    } catch (e: any) {
      setErrorMsg(e.message || 'Login failed')
    }
  }

  const handleEmisSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!emisNumber || !dob) {
      setErrorMsg('Please enter EMIS Number and Date of Birth.')
      return
    }
    setErrorMsg('')
    try {
      await loginWithEmis(emisNumber, dob)
      navigate('/dashboard/student')
    } catch (e: any) {
      setErrorMsg(e.message || 'EMIS Authentication failed')
    }
  }

  return (
    <div className="max-w-xl mx-auto py-8 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#087F72] to-[#2DD4BF] text-white flex items-center justify-center mx-auto shadow-sm">
          <GraduationCap className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Sign In to Learnova
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Education Governance & Transparent School Platform
        </p>
      </div>

      <Card className="p-6">
        {/* Tab selection */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            onClick={() => { setTab('demo'); setErrorMsg('') }}
            className={`pb-3 text-sm font-semibold border-b-2 px-4 transition-colors cursor-pointer ${
              tab === 'demo'
                ? 'border-[#087F72] text-[#087F72] dark:border-[#2DD4BF] dark:text-[#2DD4BF]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Instant Demo Roles
          </button>
          <button
            onClick={() => { setTab('emis'); setErrorMsg('') }}
            className={`pb-3 text-sm font-semibold border-b-2 px-4 transition-colors cursor-pointer ${
              tab === 'emis'
                ? 'border-[#087F72] text-[#087F72] dark:border-[#2DD4BF] dark:text-[#2DD4BF]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Student EMIS Login
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-400">
            {errorMsg}
          </div>
        )}

        {tab === 'demo' ? (
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 p-3 rounded-lg bg-teal-50/60 dark:bg-teal-950/40 border border-teal-200/50 dark:border-teal-800/50 text-xs text-teal-800 dark:text-teal-300">
              <ShieldCheck className="w-4 h-4 shrink-0 text-[#087F72]" />
              <span>Click any role below to instantly load their authenticated dashboard and permissions.</span>
            </div>

            <div className="space-y-2.5">
              {[
                {
                  role: 'student',
                  label: 'Student (Priya Ramanathan)',
                  sub: 'EMIS: 3302010010101 • Class 11-A',
                  icon: <GraduationCap className="w-5 h-5 text-[#087F72]" />,
                },
                {
                  role: 'staff',
                  label: 'Teacher / Staff (Anitha Subramanian)',
                  sub: 'PG Computer Science • Digital Teaching Evidence',
                  icon: <Briefcase className="w-5 h-5 text-blue-600" />,
                },
                {
                  role: 'headmaster',
                  label: 'Headmaster (Dr. K. Meenakshi Sundaram)',
                  sub: 'School Administration & Fund Approvals',
                  icon: <Landmark className="w-5 h-5 text-purple-600" />,
                },
                {
                  role: 'doctor',
                  label: 'School Medical Officer (Dr. S. Vignesh)',
                  sub: 'Health Screenings & Mock Parent SMS',
                  icon: <Stethoscope className="w-5 h-5 text-rose-600" />,
                },
                {
                  role: 'education_officer',
                  label: 'District Education Officer (Thiru R. Karunakaran)',
                  sub: 'Inspections, Audit Scores & Escalated Grievances',
                  icon: <FileCheck2 className="w-5 h-5 text-emerald-600" />,
                },
              ].map((item) => (
                <button
                  key={item.role}
                  onClick={() => handleRoleLogin(item.role)}
                  disabled={isLoading}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#087F72] dark:hover:border-[#2DD4BF] hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all cursor-pointer text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{item.label}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{item.sub}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#087F72] dark:group-hover:text-[#2DD4BF] group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <form onSubmit={handleEmisSubmit} className="space-y-4">
            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs text-blue-800 dark:text-blue-300">
              Demo Student EMIS: <span className="font-mono font-semibold">3302010010101</span>, DOB: <span className="font-mono font-semibold">2009-08-15</span>
            </div>

            <Input
              label="EMIS Code (13 Digits)"
              value={emisNumber}
              onChange={(e) => setEmisNumber(e.target.value)}
              placeholder="e.g. 3302010010101"
              required
            />

            <Input
              label="Date of Birth"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />

            <Input
              label="Passcode (Demo Default)"
              type="password"
              defaultValue="learnova2026"
              disabled
            />

            <Button type="submit" className="w-full" isLoading={isLoading}>
              <Lock className="w-4 h-4 mr-1.5" />
              Sign In with EMIS
            </Button>
          </form>
        )}
      </Card>
    </div>
  )
}
