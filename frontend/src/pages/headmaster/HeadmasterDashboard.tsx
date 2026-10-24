import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../context/AuthContext'
import type { Complaint } from '../../api/client'
import { api } from '../../api/client'
import { Card, StatCard } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge, StatusBadge } from '../../components/ui/Badge'
import { Modal } from '../../components/ui/Modal'
import { Input, Textarea, Select } from '../../components/ui/Input'
import { LoadingSkeleton } from '../../components/ui/EmptyState'
import {
  Landmark,
  ShieldAlert,
  Handshake,
  CheckSquare,
  PlusCircle,
  TrendingUp,
  FileText,
  Lock,
  ExternalLink,
} from 'lucide-react'

export const HeadmasterDashboard: React.FC = () => {
  const { t, i18n } = useTranslation()
  const { user } = useAuth()

  const [dashboardData, setDashboardData] = useState<any>(null)
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [tasks, setTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Fund request modal
  const [fundModalOpen, setFundModalOpen] = useState(false)
  const [reqTitle, setReqTitle] = useState('')
  const [reqPurpose, setReqPurpose] = useState('')
  const [reqAmount, setReqAmount] = useState('175000')
  const [reqUrgency, setReqUrgency] = useState('high')
  const [submittingFund, setSubmittingFund] = useState(false)
  const [alertMsg, setAlertMsg] = useState('')

  // Staff review modal
  const [reviewModalTask, setReviewModalTask] = useState<any>(null)
  const [reviewNotes, setReviewNotes] = useState('Exemplary pedagogical delivery. Credits approved.')
  const [reviewCredits, setReviewCredits] = useState(15)

  const loadData = async () => {
    try {
      const [dash, cmps, taskList] = await Promise.all([
        api.getDashboard().catch(() => null),
        api.getComplaints().catch(() => []),
        api.getTasks().catch(() => []),
      ])
      setDashboardData(dash)
      setComplaints(cmps)
      setTasks(taskList)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleCreateFundRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmittingFund(true)
    try {
      await api.createFundRequest({
        title: reqTitle,
        purpose: reqPurpose,
        estimated_amount: parseFloat(reqAmount),
        urgency: reqUrgency,
      })
      setFundModalOpen(false)
      setReqTitle('')
      setReqPurpose('')
      setAlertMsg('Fund request dispatched to District Education Officer for sanction!')
      loadData()
    } catch (err: any) {
      alert(err.message || 'Failed to submit fund request')
    } finally {
      setSubmittingFund(false)
    }
  }

  const handleReviewTask = async (status: 'approved' | 'rejected') => {
    if (!reviewModalTask) return
    try {
      await api.reviewTask(reviewModalTask.id, status, reviewNotes, reviewCredits)
      setReviewModalTask(null)
      setAlertMsg(`Staff task evidence has been ${status} and credits recorded.`)
      loadData()
    } catch (err: any) {
      alert(err.message || 'Failed to review task')
    }
  }

  const fin = dashboardData?.financial_summary || {
    total_sanctioned: 750000,
    total_spent: 320600,
    total_remaining: 229400,
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-[#172B4D] text-white p-6 md:p-8 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'}
            alt="Headmaster Avatar"
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/30"
          />
          <div>
            <h1 className="text-xl md:text-2xl font-bold">
              {i18n.language === 'ta' && user?.full_name_ta ? user.full_name_ta : (user?.full_name || 'Dr. K. Meenakshi Sundaram')}
            </h1>
            <p className="text-xs text-purple-200 mt-1">
              Headmaster • Government Model Higher Secondary School, Salem North (EMIS: 33020100101)
            </p>
          </div>
        </div>

        <Button
          variant="white"
          onClick={() => setFundModalOpen(true)}
          className="shadow-xs font-semibold text-purple-900 hover:bg-purple-50"
        >
          <PlusCircle className="w-4 h-4 mr-1.5 text-purple-900" />
          {t('headmaster.requestFunds')}
        </Button>
      </div>

      {alertMsg && (
        <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 text-xs text-green-700 dark:text-green-300 flex items-center justify-between">
          <span>{alertMsg}</span>
          <button onClick={() => setAlertMsg('')} className="font-bold underline text-xs cursor-pointer">
            Dismiss
          </button>
        </div>
      )}

      {loading ? (
        <LoadingSkeleton rows={6} />
      ) : (
        <>
          {/* Financial Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title={t('headmaster.totalAllocated')}
          value={`₹${fin.total_sanctioned.toLocaleString()}`}
          subtitle="FY 2026-27 Sanctioned"
          icon={<Landmark className="w-5 h-5 text-purple-600" />}
        />
        <StatCard
          title={t('headmaster.totalSpent')}
          value={`₹${fin.total_spent.toLocaleString()}`}
          subtitle="Verified Invoice Vouchers"
          icon={<TrendingUp className="w-5 h-5 text-amber-600" />}
        />
        <StatCard
          title={t('headmaster.remainingBal')}
          value={`₹${fin.total_remaining.toLocaleString()}`}
          subtitle="Available in School Account"
          trend="Healthy Balance"
          trendPositive={true}
          icon={<FileText className="w-5 h-5 text-green-600" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Anonymous Complaint Queue & Staff Review */}
        <div className="lg:col-span-2 space-y-6">
          {/* Anonymous Complaint Queue */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  {t('headmaster.anonymousQueue')}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t('headmaster.anonymousNotice')}
                </p>
              </div>
              <Badge variant="warning">Privacy Vault Enforced</Badge>
            </div>

            <div className="space-y-3">
              {complaints.map((c) => (
                <Card key={c.id} className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-gray-400">{c.reference_number}</span>
                        {c.is_anonymous ? (
                          <Badge variant="gray" size="sm" className="flex items-center gap-1">
                            <Lock className="w-3 h-3" />
                            Anonymous Complainant
                          </Badge>
                        ) : (
                          <Badge variant="info" size="sm">Student Verified</Badge>
                        )}
                        <span className="text-xs text-gray-400">• {c.vote_count} Student Votes</span>
                      </div>
                      <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">{c.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{c.description}</p>
                    </div>
                    <StatusBadge status={c.status} />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Staff Task & Evidence Reviews */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-[#087F72] dark:text-[#2DD4BF]" />
              {t('headmaster.staffReviews')}
            </h2>

            <div className="space-y-3">
              {tasks.filter(t => t.status === 'submitted').map((task) => (
                <Card key={task.id} className="p-4 space-y-3 border-amber-200 dark:border-amber-800/60 bg-amber-50/20">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge variant="brand" size="sm">Evidence Submitted for Verification</Badge>
                      <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mt-1">{task.title}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{task.evidence_notes}</p>
                    </div>
                    <Button size="sm" onClick={() => setReviewModalTask(task)}>
                      Review & Award Credits
                    </Button>
                  </div>

                  {task.evidence_url && (
                    <a
                      href={task.evidence_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-[#087F72] dark:text-[#2DD4BF] hover:underline flex items-center gap-1 font-medium"
                    >
                      <span>Inspect Teaching Media Record</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </Card>
              ))}

              {tasks.filter(t => t.status === 'submitted').length === 0 && (
                <div className="p-4 text-center rounded-xl border border-dashed border-gray-200 dark:border-gray-700 text-xs text-gray-400">
                  All submitted staff digital teaching deliverables have been reviewed.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Col: College & Company Collaboration Tracker (Target: 2 in first 6 months) */}
        <div className="space-y-6">
          <Card className="space-y-4 border-teal-200/60 dark:border-teal-800/60">
            <div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Handshake className="w-5 h-5 text-[#087F72] dark:text-[#2DD4BF]" />
                {t('headmaster.collabsTitle')}
              </h3>
              <p className="text-xs text-teal-800 dark:text-teal-300 font-medium mt-1">
                {t('headmaster.collabsTarget')}
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  partner: 'Government College of Engineering, Salem',
                  type: 'Engineering College',
                  focus: 'Robotics, IoT and Electronics Hands-on Mentorship',
                  students: '120 Beneficiaries',
                  period: 'Jun 2026 - Nov 2026',
                  status: 'Active Partnership #1',
                },
                {
                  partner: 'Zoho Schools of Learning & Titan Corp',
                  type: 'Industry Enterprise',
                  focus: 'Full-Stack Web Development & Career Apprenticeship Bootcamp',
                  students: '85 Beneficiaries',
                  period: 'Jul 2026 - Dec 2026',
                  status: 'Active Partnership #2',
                },
              ].map((collab, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-700/40 border border-gray-100 dark:border-gray-700 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{collab.partner}</span>
                    <Badge variant="success">{collab.status}</Badge>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{collab.focus}</p>
                  <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1 border-t border-gray-100 dark:border-gray-700">
                    <span>{collab.students}</span>
                    <span>{collab.period}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/40 text-xs text-green-800 dark:text-green-300 font-medium">
              ✓ Demo target fulfilled: 2 premier industry and collegiate mentorships active in Term 1.
            </div>
          </Card>
        </div>
      </div>
      </>
      )}

      {/* Fund Request Modal */}
      <Modal
        isOpen={fundModalOpen}
        onClose={() => setFundModalOpen(false)}
        title={t('headmaster.requestFunds')}
      >
        <form onSubmit={handleCreateFundRequest} className="space-y-4">
          <Input
            label="Grant / Proposal Title"
            value={reqTitle}
            onChange={(e) => setReqTitle(e.target.value)}
            placeholder="e.g. Robotics & AI Innovation Lab Hardware Setup"
            required
          />

          <Input
            label={t('headmaster.estimatedAmount')}
            type="number"
            value={reqAmount}
            onChange={(e) => setReqAmount(e.target.value)}
            required
          />

          <Select
            label="Priority / Urgency"
            value={reqUrgency}
            onChange={(e) => setReqUrgency(e.target.value)}
            options={[
              { value: 'medium', label: 'Medium Priority (Normal Cycle)' },
              { value: 'high', label: 'High Priority (Term Requirement)' },
              { value: 'critical', label: 'Critical Emergency (Health/Safety)' },
            ]}
          />

          <Textarea
            label={t('headmaster.fundPurpose')}
            value={reqPurpose}
            onChange={(e) => setReqPurpose(e.target.value)}
            placeholder="Describe student impact, specifications, and vendor quotations..."
            required
          />

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setFundModalOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button type="submit" isLoading={submittingFund}>
              Submit Request to Education Officer
            </Button>
          </div>
        </form>
      </Modal>

      {/* Staff Review Modal */}
      <Modal
        isOpen={Boolean(reviewModalTask)}
        onClose={() => setReviewModalTask(null)}
        title="Review Staff Evidence & Award Credits"
      >
        <div className="space-y-4">
          <div>
            <span className="text-xs text-gray-500 font-medium">Task / Deliverable</span>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{reviewModalTask?.title}</p>
          </div>

          <Textarea
            label="Headmaster Review Evaluation & Remarks"
            value={reviewNotes}
            onChange={(e) => setReviewNotes(e.target.value)}
            required
          />

          <Input
            label="Performance Credits to Award (0 - 20 Pts)"
            type="number"
            value={reviewCredits}
            onChange={(e) => setReviewCredits(parseInt(e.target.value) || 0)}
            required
          />

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button variant="danger" onClick={() => handleReviewTask('rejected')}>
              Request Revision
            </Button>
            <Button onClick={() => handleReviewTask('approved')}>
              Approve & Award Credits
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
