import React from 'react'
import { useTranslation } from 'react-i18next'
import { Card } from '../components/ui/Card'
import { HeroSection } from '../components/home/HeroSection'
import { EducationUpdatesSection } from '../components/home/EducationUpdatesSection'
import { CareerDiscoverySection } from '../components/home/CareerDiscoverySection'
import { SchoolProgressSection } from '../components/home/SchoolProgressSection'
import { AwarenessVideoSection } from '../components/home/AwarenessVideoSection'
import { RoleLoginEntrySection } from '../components/home/RoleLoginEntrySection'
import {
  Building2,
  Users,
  Landmark,
  CheckCircle2,
} from 'lucide-react'

export const Home: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Key Educational Governance Statistics */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {[
          {
            label: t('home.statSchools', 'Model Schools'),
            value: '45+',
            icon: <Building2 className="w-5 h-5 text-[#087F72] dark:text-[#2DD4BF]" />,
            bg: 'bg-teal-50 dark:bg-teal-950/60',
          },
          {
            label: t('home.statStudents', 'Students Impacted'),
            value: '18,500+',
            icon: <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
            bg: 'bg-blue-50 dark:bg-blue-950/60',
          },
          {
            label: t('home.statGrants', 'Grants Disbursed'),
            value: '₹7.5 Cr',
            icon: <Landmark className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
            bg: 'bg-purple-50 dark:bg-purple-950/60',
          },
          {
            label: t('home.statResolution', 'Grievances Resolved'),
            value: '96.4%',
            icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
            bg: 'bg-emerald-50 dark:bg-emerald-950/60',
          },
        ].map((stat, i) => (
          <Card key={i} className="text-center p-5 hover:shadow-md transition-shadow">
            <div
              className={`mx-auto w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center mb-3 shadow-xs`}
            >
              {stat.icon}
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
              {stat.value}
            </p>
            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">
              {stat.label}
            </p>
          </Card>
        ))}
      </section>

      {/* 3. Education Updates & Official Circulars */}
      <EducationUpdatesSection />

      {/* 4. Career Explorer & Qualification Pathways */}
      <CareerDiscoverySection />

      {/* 5. School Progress & Public Fund Transparency */}
      <SchoolProgressSection />

      {/* 6. Awareness Video Section */}
      <AwarenessVideoSection />

      {/* 7. Role-Based Demo Login Entry Point */}
      <RoleLoginEntrySection />
    </div>
  )
}
export default Home
