import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Badge } from '../ui/Badge'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Subtitles,
  Tv,
} from 'lucide-react'

export const AwarenessVideoSection: React.FC = () => {
  const { t, i18n } = useTranslation()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [activeSubtitles, setActiveSubtitles] = useState(true)

  const isTamil = i18n.language === 'ta'

  const videoTitle = isTamil
    ? 'தமிழ்நாடு மாதிரிப் பள்ளிகளின் சாதனைப் பயணம் (2:45 நிமிடம்)'
    : 'Empowering Young Innovators: Journey of TN Model Schools (2:45 mins)'

  const videoSummary = isTamil
    ? 'அரசுப் பள்ளி மாணவர்களின் திறன்களை வெளிக்கொணரும் மாதிரிப் பள்ளிகள், உயர் தொழில்நுட்ப ஆய்வகங்கள் மற்றும் தொழில் வழிகாட்டுதல்கள் பற்றிய சிறப்பு விழிப்புணர்வு காணொளி.'
    : 'A state education documentary highlighting smart classrooms, cutting-edge STEM laboratories, and university career orientation for public school students.'

  return (
    <section className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 space-y-6 shadow-xs">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#DDF5EF] text-[#087F72] dark:bg-teal-950/60 dark:text-[#2DD4BF]">
              <Tv className="w-3.5 h-3.5" />
              {t('home.videoBadge', 'Official Documentary • விழிப்புணர்வு காணொளி')}
            </span>
            <Badge variant="success" size="sm">
              HD 1080p
            </Badge>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
            {t('home.awarenessVideoTitle', 'Digital Transformation in Tamil Nadu Schools')}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
            {videoSummary}
          </p>
        </div>

        {/* Audio & Subtitles Language Chips */}
        <div className="flex items-center gap-2 self-start md:self-center">
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Audio & CC:</span>
          <Badge variant="info" size="sm">English</Badge>
          <Badge variant="success" size="sm">தமிழ்</Badge>
        </div>
      </div>

      {/* Video Container (16:9 ratio) */}
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-gray-950 shadow-xl flex flex-col justify-between p-4 sm:p-6 border border-gray-800">
        {/* Background Visual Frame */}
        <img
          src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80"
          alt="Tamil Nadu students participating in high-tech educational demonstration"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isPlaying ? 'opacity-70' : 'opacity-40'
          }`}
        />

        {/* Video Overlay Top Bar */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="bg-black/60 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/10">
            TN Model Schools Directorate • 2026
          </span>
          <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-sm shadow-xs">
            {isPlaying ? 'PLAYING (SIMULATED)' : 'PREVIEW'}
          </span>
        </div>

        {/* Center Play/Pause button */}
        <div className="relative z-10 flex flex-col items-center justify-center my-auto">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#087F72] hover:bg-[#075E54] text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-all cursor-pointer ring-4 ring-white/30 focus:outline-none focus:ring-4 focus:ring-teal-400"
            aria-label={isPlaying ? 'Pause Awareness Video' : 'Play Awareness Video'}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 fill-white" />
            ) : (
              <Play className="w-8 h-8 ml-1 fill-white" />
            )}
          </button>
          <p className="text-white text-xs sm:text-sm font-bold mt-3.5 drop-shadow-md text-center max-w-md">
            {videoTitle}
          </p>
        </div>

        {/* Bottom Accessible Controls Bar */}
        <div className="relative z-10 bg-black/80 backdrop-blur-md rounded-xl p-3 text-xs text-gray-200 flex flex-wrap items-center justify-between gap-3 border border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="hover:text-teal-400 transition-colors p-1 cursor-pointer"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="hover:text-teal-400 transition-colors p-1 cursor-pointer flex items-center gap-1"
              aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-amber-400" />
                  <span className="text-[11px] text-amber-300">Muted (Standard safe default)</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-teal-400" />
                  <span className="text-[11px]">Audio Active</span>
                </>
              )}
            </button>

            <button
              onClick={() => setActiveSubtitles(!activeSubtitles)}
              className={`p-1 flex items-center gap-1 transition-colors cursor-pointer ${
                activeSubtitles ? 'text-teal-300 font-bold' : 'text-gray-400'
              }`}
              aria-label="Toggle Subtitles"
            >
              <Subtitles className="w-4 h-4" />
              <span className="text-[11px]">CC [Tamil/English]</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-gray-300">
            <span>Govt of Tamil Nadu • Dept of School Education</span>
            <button
              onClick={() => alert('Full screen presentation mode simulation.')}
              className="hover:text-white p-1 cursor-pointer"
              aria-label="Fullscreen"
            >
              <Maximize className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
