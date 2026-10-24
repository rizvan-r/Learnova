import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import {
  Compass,
  ArrowDownCircle,
  GraduationCap,
  Sparkles,
  Search,
  FileText,
  Eye,
  CheckCircle2,
} from 'lucide-react'

export const HeroSection: React.FC = () => {
  const { t, i18n } = useTranslation()

  const handleScrollToUpdates = (e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.getElementById('education-updates')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#087F72] via-[#075E54] to-[#172B4D] text-white p-6 sm:p-10 lg:p-14 shadow-lg">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* Left Column: Headline, Copy, and CTAs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="brand" className="bg-white/15 text-white border-white/20 text-xs py-1">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-teal-300" />
              {t('common.demoBadge')}
            </Badge>
            <span className="text-xs font-medium text-teal-100/80 bg-black/20 px-2.5 py-0.5 rounded-full">
              TN Model Schools 2026
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
            {t('home.heroTitleMain')}
          </h1>

          <p className="text-base sm:text-lg text-teal-50/90 leading-relaxed font-normal max-w-2xl">
            {t('home.heroSubtitleMain')}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link to="/career">
              <Button
                variant="white"
                size="lg"
                className="font-semibold shadow-md cursor-pointer hover:scale-102 transition-transform"
              >
                <Compass className="w-5 h-5 mr-2 text-[#087F72]" />
                {t('home.exploreCareersCTA')}
              </Button>
            </Link>

            <a href="#education-updates" onClick={handleScrollToUpdates}>
              <Button
                size="lg"
                variant="outline"
                className="border-white/50 text-white hover:bg-white/15 font-medium cursor-pointer"
              >
                <ArrowDownCircle className="w-5 h-5 mr-2" />
                {t('home.viewUpdatesCTA')}
              </Button>
            </a>
          </div>

          {/* Trust Highlights */}
          <div className="pt-4 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-teal-100">
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <Search className="w-4 h-4 text-teal-300" />
              </div>
              <span className="font-medium">{t('home.trustCareer')}</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-teal-100">
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-teal-300" />
              </div>
              <span className="font-medium">{t('home.trustUpdates')}</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-teal-100">
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <Eye className="w-4 h-4 text-teal-300" />
              </div>
              <span className="font-medium">{t('home.trustTransparency')}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Education Showcase */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md">
            {/* Ambient Backlight */}
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-400/20 to-blue-500/20 rounded-3xl blur-2xl pointer-events-none" />

            {/* Visual Glassmorphic Card Container */}
            <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-white/15">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-white text-[#087F72] flex items-center justify-center shadow-md">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Learnova Portal</h3>
                    <p className="text-[11px] text-teal-200">
                      {i18n.language === 'ta' ? 'அனைத்து மாணவர்களுக்கும் சமவாய்ப்பு' : 'Equal Opportunity for Every Learner'}
                    </p>
                  </div>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1 border border-emerald-400/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Live 2026
                </span>
              </div>

              {/* Student illustration banner */}
              <div className="relative rounded-xl overflow-hidden aspect-4/3 bg-gray-950/40 border border-white/15">
                <img
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80"
                  alt="Government model school students learning in modern classroom"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                  <p className="text-white text-xs font-bold leading-tight">
                    {i18n.language === 'ta'
                      ? 'தமிழ்நாடு மாதிரிப் பள்ளிகள் - நவீன அறிவியல் & கணினி ஆய்வகம்'
                      : 'Tamil Nadu Model Schools - STEM & Advanced Computing Labs'}
                  </p>
                  <p className="text-[11px] text-teal-200 mt-1">
                    {i18n.language === 'ta' ? '38 மாவட்டங்களில் விரிவுபடுத்தப்பட்டுள்ளது' : 'Expanded across all 38 educational districts'}
                  </p>
                </div>
              </div>

              {/* Quick interactive badges */}
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="bg-white/10 rounded-lg p-2.5 border border-white/10">
                  <span className="block font-black text-lg text-white">100%</span>
                  <span className="text-[11px] text-teal-100">
                    {i18n.language === 'ta' ? 'வெளிப்படையான நிதி' : 'Transparent Grants'}
                  </span>
                </div>
                <div className="bg-white/10 rounded-lg p-2.5 border border-white/10">
                  <span className="block font-black text-lg text-white">35+</span>
                  <span className="text-[11px] text-teal-100">
                    {i18n.language === 'ta' ? 'தொழில் வழிகாட்டுதல்கள்' : 'Career Roadmaps'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative blurred glow in corner */}
      <div className="absolute -right-16 -bottom-16 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  )
}
