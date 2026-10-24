import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../context/AuthContext'
import { api, Complaint } from '../../api/client'
import { Card, StatCard } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge, StatusBadge } from '../../components/ui/Badge'
import { Modal } from '../../components/ui/Modal'
import { Input, Select, Textarea } from '../../components/ui/Input'
import { LoadingSkeleton } from '../../components/ui/EmptyState'
import {
  GraduationCap,
  Award,
  Vote,
  AlertCircle,
  Users,
  Compass,
  ArrowRight,
  CheckCircle,
  ThumbsUp,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export const StudentDashboard: React.FC = () => {
  const { t, i18n } = useTranslation()
  const { user } = useAuth()

  const [portfolio, setPortfolio] = useState<any>(null)
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [loading, setLoading] = useState(true)

  // Complaint modal
  const [modalOpen, setModalOpen] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newCategory, setNewCategory] = useState('classroom_projector')
  const [newDesc, setNewDesc] = useState('')
  const [isAnon, setIsAnon] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [feedbackMsg, setFeedbackMsg] = useState('')

  const loadData = async () => {
    try {
      const [portData, cmpData] = await Promise.all([
        api.getStudentPortfolio().catch(() => ({
          grade: '11',
          section: 'A',
          roll_number: '11A-14',
          attendance_percentage: 94.8,
          gpa: 9.1,
          achievements: [
            { title: '1st Prize in State Science Congress 2026', date: '2026-02-15', badge: 'Gold' },
            { title: 'TN Young Innovator Coding Scholar', date: '2026-08-10', badge: 'Merit' },
          ],
        })),
        api.getComplaints().catch(() => []),
      ])

      setPortfolio(portData)
      setComplaints(cmpData)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleVote = async (complaintId: string) => {
    try {
      await api.voteComplaint(complaintId)
      setFeedbackMsg('Your vote has been officially recorded!')
      loadData()
    } catch (e: any) {
      alert(e.message || 'You have already voted on this issue.')
    }
  }

  const handleCreateComplaint = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await api.createComplaint({
        title: newTitle,
        category: newCategory,
        description: newDesc,
        is_anonymous: isAnon,
        is_common_issue: true,
      })
      setModalOpen(false)
      setNewTitle('')
      setNewDesc('')
      setFeedbackMsg(
        isAnon
          ? 'Anonymous grievance filed. Your identity is concealed from the school.'
          : 'Complaint filed successfully with tracking reference.'
      )
      loadData()
    } catch (err: any) {
      alert(err.message || 'Failed to submit complaint')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header Profile Greeting */}
      <div className="bg-gradient-to-r from-teal-900 to-[#087F72] text-white p-6 md:p-8 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
            alt="Student Avatar"
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/30"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-bold">
                {i18n.language === 'ta' && user?.full_name_ta ? user.full_name_ta : (user?.full_name || 'Priya Ramanathan')}
              </h1>
              <Badge variant="brand" className="bg-white/20 text-white border-none text-[11px]">
                {t('student.emisId')}: {user?.emis_number || '3302010010101'}
              </Badge>
            </div>
            <p className="text-xs text-teal-100 mt-1">
              Government Model Higher Secondary School, Salem North • Class 11-A (Computer Science)
            </p>
          </div>
        </div>

        <Button
          variant="white"
          onClick={() => setModalOpen(true)}
          className="shadow-xs font-semibold"
        >
          <AlertCircle className="w-4 h-4 mr-1.5 text-[#087F72]" />
          {t('student.fileComplaint')}
        </Button>
      </div>

      {feedbackMsg && (
        <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 text-xs text-green-700 dark:text-green-300 flex items-center justify-between">
          <span>{feedbackMsg}</span>
          <button onClick={() => setFeedbackMsg('')} className="font-bold underline text-xs cursor-pointer">
            Dismiss
          </button>
        </div>
      )}

      {loading ? (
        <LoadingSkeleton rows={6} />
      ) : (
        <>
          {/* Academic Highlights Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title={t('student.attendance')}
          value={`${portfolio?.attendance_percentage || 94.8}%`}
          subtitle="Annual Verified Record"
          trend="Regular"
          trendPositive={true}
          icon={<CheckCircle className="w-5 h-5" />}
        />
        <StatCard
          title={t('student.gpa')}
          value={`${portfolio?.gpa || 9.1} / 10`}
          subtitle="Midterm Cumulative"
          trend="Top 5%"
          trendPositive={true}
          icon={<GraduationCap className="w-5 h-5" />}
        />
        <StatCard
          title="Active Issues Polled"
          value={complaints.filter(c => c.has_voted).length}
          subtitle="1-Student 1-Vote Enforced"
          icon={<Vote className="w-5 h-5" />}
        />
        <StatCard
          title="State Awards"
          value="2 Honors"
          subtitle="Innovation & Science"
          icon={<Award className="w-5 h-5" />}
        />
      </div>

      {/* Main Grid: Voting & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Facility Issue Voting (2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Vote className="w-5 h-5 text-[#087F72] dark:text-[#2DD4BF]" />
                {t('student.facilityVoting')}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t('student.votingDesc')}
              </p>
            </div>
            <Badge variant="brand">One-Student-One-Vote</Badge>
          </div>

          <div className="space-y-3">
            {complaints.filter(c => c.is_common_issue).map((c) => (
              <Card key={c.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-mono text-gray-400">{c.reference_number}</span>
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mt-0.5">
                      {i18n.language === 'ta' && c.title_ta ? c.title_ta : c.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{c.description}</p>
                  </div>
                  <StatusBadge status={c.status} />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700/60">
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{c.vote_count}</span>
                    <span>Student Votes</span>
                  </div>

                  {c.has_voted ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#087F72] dark:text-[#2DD4BF] bg-[#DDF5EF] dark:bg-teal-950/60 px-2.5 py-1 rounded-lg">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      {t('student.voted')}
                    </span>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleVote(c.id)}
                      className="border-[#087F72] text-[#087F72] hover:bg-[#DDF5EF] dark:border-[#2DD4BF] dark:text-[#2DD4BF]"
                    >
                      <Vote className="w-3.5 h-3.5 mr-1" />
                      {t('student.voteNow')}
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Portfolio Achievements & Career Shortcut */}
        <div className="space-y-6">
          {/* Achievements */}
          <Card className="space-y-4">
            <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              {t('student.achievements')}
            </h3>

            <div className="space-y-3">
              {(portfolio?.achievements || []).map((ach: any, idx: number) => (
                <div key={idx} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/40 border border-gray-100 dark:border-gray-700 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-gray-900 dark:text-gray-100">{ach.title}</span>
                    <Badge variant="warning">{ach.badge}</Badge>
                  </div>
                  <span className="text-[11px] text-gray-400">{ach.date}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Career Explorer Shortcut */}
          <Card className="p-5 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800 border-teal-200/60 dark:border-teal-800/40 space-y-3">
            <div className="p-2.5 w-fit rounded-xl bg-[#087F72] text-white">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm">
              Discover Higher Education Pathways
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Explore 50+ career domains across Engineering (Full-Stack, AI, Cloud), Medicine, Agriculture, and Law with entrance exams and fee structures.
            </p>
            <Link to="/career">
              <Button size="sm" className="w-full mt-1">
                Open Career Explorer
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </Card>

          {/* School Teachers Directory */}
          <Card className="space-y-3">
            <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" />
              {t('student.staffDirectory')}
            </h3>

            <div className="space-y-2">
              {[
                { name: 'Dr. K. Meenakshi Sundaram', role: 'Headmaster', contact: 'hm.demo@learnova.gov.in' },
                { name: 'Anitha Subramanian', role: 'PG Teacher (CS & IT)', contact: 'staff.demo@learnova.gov.in' },
              ].map((s, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2.5 rounded-lg bg-gray-50 dark:bg-gray-700/30 text-xs">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{s.name}</p>
                    <p className="text-[11px] text-gray-500">{s.role}</p>
                  </div>
                  <span className="text-[11px] text-teal-700 dark:text-teal-300 font-mono">{s.contact}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      </>
      )}

      {/* Private Complaint Submission Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={t('student.fileComplaint')}
      >
        <form onSubmit={handleCreateComplaint} className="space-y-4">
          <Input
            label={t('student.complaintTitle')}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="e.g. Broken water tap in Section 11 restroom"
            required
          />

          <Select
            label={t('student.complaintCategory')}
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            options={[
              { value: 'classroom_projector', label: 'Classroom Projector / Smart Board' },
              { value: 'cctv_camera', label: 'CCTV Camera / Surveillance' },
              { value: 'sports_equipment', label: 'Sports Equipment & Playground' },
              { value: 'cleanliness', label: 'Sanitation & Cleanliness' },
              { value: 'drinking_water', label: 'Drinking Water Cooler & RO Filter' },
              { value: 'meals', label: 'Midday Meals & Quality' },
              { value: 'infrastructure', label: 'Laboratory / Building Infrastructure' },
            ]}
          />

          <Textarea
            label={t('student.complaintDetails')}
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Provide context, floor location, and specifics..."
            required
          />

          <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 flex items-start gap-2.5">
            <input
              type="checkbox"
              id="anon-check"
              checked={isAnon}
              onChange={(e) => setIsAnon(e.target.checked)}
              className="mt-1 h-4 w-4 text-[#087F72] rounded-sm focus:ring-[#087F72]"
            />
            <label htmlFor="anon-check" className="text-xs text-gray-700 dark:text-gray-300 cursor-pointer">
              <span className="font-semibold block">{t('student.makeAnonymous')}</span>
              <span>Your name, email, and EMIS will be stored in a separate encrypted vault and never shown to the Headmaster or school staff.</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button type="submit" isLoading={submitting}>
              {t('common.submit')}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
