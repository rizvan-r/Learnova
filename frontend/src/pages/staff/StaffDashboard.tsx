import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../context/AuthContext'
import { api } from '../../api/client'
import { Card, StatCard } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge, StatusBadge } from '../../components/ui/Badge'
import { Modal } from '../../components/ui/Modal'
import { Input, Textarea } from '../../components/ui/Input'
import { LoadingSkeleton } from '../../components/ui/EmptyState'
import {
  Briefcase,
  CheckSquare,
  Video,
  Award,
  UploadCloud,
  FileCheck,
  ExternalLink,
} from 'lucide-react'

export const StaffDashboard: React.FC = () => {
  const { t } = useTranslation()
  const { user } = useAuth()

  const [tasks, setTasks] = useState<any[]>([])
  const [performance, setPerformance] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Evidence submit modal
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [evidenceUrl, setEvidenceUrl] = useState('')
  const [evidenceNotes, setEvidenceNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [toastMsg, setToastMsg] = useState('')

  const loadData = async () => {
    try {
      const [taskData, perfData] = await Promise.all([
        api.getTasks().catch(() => []),
        api.getMyPerformance().catch(() => null),
      ])
      setTasks(taskData)
      setPerformance(perfData)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleSubmitEvidence = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedTask) return
    setSubmitting(true)
    try {
      await api.submitTaskEvidence(selectedTask.id, evidenceUrl, evidenceNotes)
      setSelectedTask(null)
      setEvidenceUrl('')
      setEvidenceNotes('')
      setToastMsg('Fortnightly teaching evidence submitted for Headmaster verification!')
      loadData()
    } catch (err: any) {
      alert(err.message || 'Failed to submit evidence')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header Profile Greeting */}
      <div className="bg-gradient-to-r from-blue-900 to-[#172B4D] text-white p-6 md:p-8 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar_url || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'}
            alt="Staff Avatar"
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/30"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-bold">
                {user?.full_name || 'Anitha Subramanian'}
              </h1>
              <Badge variant="brand" className="bg-white/20 text-white border-none text-[11px]">
                {user?.designation || 'PG Teacher (Computer Science)'}
              </Badge>
            </div>
            <p className="text-xs text-blue-200 mt-1">
              Government Model Higher Secondary School, Salem North • Staff Code: 3302010010102
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="success" className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30 text-xs py-1.5 px-3">
            <Award className="w-4 h-4 mr-1.5" />
            Credits: {performance?.total_credits || 88} / 100
          </Badge>
        </div>
      </div>

      {toastMsg && (
        <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 text-xs text-green-700 dark:text-green-300 flex items-center justify-between">
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg('')} className="font-bold underline text-xs cursor-pointer">
            Dismiss
          </button>
        </div>
      )}

      {loading ? (
        <LoadingSkeleton rows={6} />
      ) : (
        <>
          {/* Stats Counter */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Assigned Tasks"
          value={tasks.length}
          subtitle="Annual Plan"
          icon={<CheckSquare className="w-5 h-5 text-blue-600" />}
        />
        <StatCard
          title="Digital Evidence Submissions"
          value={tasks.filter(t => t.task_type === 'digital_teaching').length}
          subtitle="Fortnightly Compliance"
          trend="Up to Date"
          trendPositive={true}
          icon={<Video className="w-5 h-5 text-[#087F72]" />}
        />
        <StatCard
          title="Assessment Credits"
          value={`${performance?.total_credits || 88} Pts`}
          subtitle="Term 1 Review"
          trend="Approved"
          trendPositive={true}
          icon={<Award className="w-5 h-5 text-amber-500" />}
        />
        <StatCard
          title="Student Batches"
          value="44 Students"
          subtitle="Grade 11 CS Lab"
          icon={<Briefcase className="w-5 h-5 text-purple-600" />}
        />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task Management & Fortnightly Digital Teaching Evidence */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Video className="w-5 h-5 text-[#087F72] dark:text-[#2DD4BF]" />
                {t('staff.digitalEvidence')}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t('staff.digitalEvidenceDesc')}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <Card key={task.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={task.task_type === 'digital_teaching' ? 'brand' : 'gray'} size="sm">
                        {task.task_type === 'digital_teaching' ? 'Fortnightly Teaching' : 'Activity'}
                      </Badge>
                      <span className="text-[11px] text-gray-400">Due: {task.due_date}</span>
                    </div>
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">{task.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{task.description}</p>
                  </div>
                  <StatusBadge status={task.status} />
                </div>

                {task.evidence_url && (
                  <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700 text-xs space-y-1">
                    <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Uploaded Evidence Record</span>
                      <a href={task.evidence_url} target="_blank" rel="noreferrer" className="text-[#087F72] dark:text-[#2DD4BF] hover:underline flex items-center gap-1">
                        <span>View Attachment</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    {task.evidence_notes && <p className="text-gray-500 dark:text-gray-400 text-[11px]">{task.evidence_notes}</p>}
                    {task.review_feedback && (
                      <div className="pt-1.5 mt-1 border-t border-gray-200 dark:border-gray-600 text-teal-800 dark:text-teal-300 text-[11px]">
                        <strong>HM Review:</strong> {task.review_feedback} ({task.credits_awarded} credits awarded)
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-end pt-2 border-t border-gray-100 dark:border-gray-700/60">
                  {task.status === 'pending' && (
                    <Button size="sm" onClick={() => setSelectedTask(task)}>
                      <UploadCloud className="w-3.5 h-3.5 mr-1" />
                      {t('staff.submitEvidence')}
                    </Button>
                  )}
                  {task.status === 'submitted' && (
                    <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                      Awaiting Headmaster Verification
                    </span>
                  )}
                  {task.status === 'approved' && (
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                      <FileCheck className="w-4 h-4" />
                      Verified & Credits Awarded (+{task.credits_awarded} pts)
                    </span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column: Performance Breakdown (6 Months Review System) */}
        <div className="space-y-6">
          <Card className="space-y-4">
            <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              {t('staff.credits')}
            </h3>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200/50 dark:border-teal-800/50 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-teal-900 dark:text-teal-200">
                  <span>Term 1 (First 6 Months)</span>
                  <Badge variant="success">88 / 100</Badge>
                </div>
                <div className="space-y-1 text-[11px] text-gray-600 dark:text-gray-300">
                  <div className="flex justify-between">
                    <span>Digital Pedagogy Lab:</span>
                    <span className="font-medium">28 / 30</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Student Science Activities:</span>
                    <span className="font-medium">22 / 25</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Innovative Teaching:</span>
                    <span className="font-medium">20 / 25</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Evaluation Timeliness:</span>
                    <span className="font-medium">18 / 20</span>
                  </div>
                </div>
                <p className="text-[11px] text-teal-800 dark:text-teal-300 pt-1 border-t border-teal-200/50">
                  "Exemplary dedication to hands-on Python lab demonstrations."
                </p>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-700 space-y-1 opacity-70">
                <div className="flex items-center justify-between text-xs font-semibold text-gray-700 dark:text-gray-300">
                  <span>Term 2 (Next 6 Months)</span>
                  <Badge variant="gray">Scheduled</Badge>
                </div>
                <p className="text-[11px] text-gray-500">
                  Covers board examination readiness, remedial workshops, and validated outcome metrics at year-end.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-blue-50/60 dark:bg-gray-800 border-blue-200/50 dark:border-blue-900/50 space-y-2">
            <h4 className="text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider">
              Smart Classroom Best Practice
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              Ensure screen recordings of interactive DIKSHA modules or hands-on terminal exercises are uploaded within 14 days of session delivery.
            </p>
          </Card>
        </div>
      </div>
      </>
      )}

      {/* Submit Evidence Modal */}
      <Modal
        isOpen={Boolean(selectedTask)}
        onClose={() => setSelectedTask(null)}
        title={t('staff.submitEvidence')}
      >
        <form onSubmit={handleSubmitEvidence} className="space-y-4">
          <div>
            <label className="text-xs text-gray-500 font-medium">Task / Deliverable</label>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{selectedTask?.title}</p>
          </div>

          <Input
            label={t('staff.evidenceUrl')}
            value={evidenceUrl}
            onChange={(e) => setEvidenceUrl(e.target.value)}
            placeholder="e.g. https://storage.supabase.co/learnova/cs11_python_lab_evidence.mp4"
            required
          />

          <Textarea
            label={t('staff.evidenceNotes')}
            value={evidenceNotes}
            onChange={(e) => setEvidenceNotes(e.target.value)}
            placeholder="Explain student participation count, concepts demonstrated, and outcome..."
            required
          />

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setSelectedTask(null)}>
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
