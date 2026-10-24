import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../context/AuthContext'
import { api, Complaint, School } from '../../api/client'
import { Card, StatCard } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge, StatusBadge } from '../../components/ui/Badge'
import { Modal } from '../../components/ui/Modal'
import { Input, Textarea } from '../../components/ui/Input'
import { LoadingSkeleton } from '../../components/ui/EmptyState'
import {
  Building2,
  AlertTriangle,
  ClipboardList,
  CheckCircle,
  MapPin,
  TrendingUp,
} from 'lucide-react'

export const OfficerDashboard: React.FC = () => {
  const { t } = useTranslation()
  const { user } = useAuth()

  const [schools, setSchools] = useState<School[]>([])
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [inspections, setInspections] = useState<any[]>([])
  const [fundRequests, setFundRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Inspection modal
  const [selectedInspection, setSelectedInspection] = useState<any>(null)
  const [academicScore, setAcademicScore] = useState('9.0')
  const [infraScore, setInfraScore] = useState('8.5')
  const [hygieneScore, setHygieneScore] = useState('9.2')
  const [reportSummary, setReportSummary] = useState('')
  const [coords, setCoords] = useState<{ lat?: number; lng?: number }>({ lat: 11.6643, lng: 78.1460 })
  const [submittingInspection, setSubmittingInspection] = useState(false)

  // Fund review modal
  const [reviewFund, setReviewFund] = useState<any>(null)
  const [officerNotes, setOfficerNotes] = useState('Sanction approved following verified infrastructure audit.')
  const [submittingFundReview, setSubmittingFundReview] = useState(false)

  const [toastMsg, setToastMsg] = useState('')

  const loadData = async () => {
    try {
      const [schoolList, cmpList, inspList, reqList] = await Promise.all([
        api.getSchools().catch(() => []),
        api.getComplaints().catch(() => []),
        api.getInspections().catch(() => []),
        api.getFundRequests().catch(() => []),
      ])
      setSchools(schoolList)
      setComplaints(cmpList)
      setInspections(inspList)
      setFundRequests(reqList)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // Browser geolocation helper
  const captureLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude })
          setToastMsg('Browser GPS coordinates captured for inspection report.')
        },
        () => {
          setCoords({ lat: 11.6645, lng: 78.1462 })
        }
      )
    }
  }

  const handleCompleteInspection = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedInspection) return
    setSubmittingInspection(true)
    try {
      await api.completeInspection(selectedInspection.id, {
        academic_score: parseFloat(academicScore),
        infrastructure_score: parseFloat(infraScore),
        hygiene_score: parseFloat(hygieneScore),
        report_summary: reportSummary,
        photo_evidence: [
          'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400',
        ],
        latitude: coords.lat,
        longitude: coords.lng,
      })
      setSelectedInspection(null)
      setReportSummary('')
      setToastMsg('Inspection report and audit scores successfully committed!')
      loadData()
    } catch (err: any) {
      alert(err.message || 'Failed to complete inspection')
    } finally {
      setSubmittingInspection(false)
    }
  }

  const handleFundReview = async (status: 'approved' | 'rejected') => {
    if (!reviewFund) return
    setSubmittingFundReview(true)
    try {
      await api.reviewFundRequest(reviewFund.id, status, officerNotes)
      setReviewFund(null)
      setToastMsg(`Fund request has been ${status}.`)
      loadData()
    } catch (err: any) {
      alert(err.message || 'Failed to review request')
    } finally {
      setSubmittingFundReview(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-[#172B4D] to-teal-900 text-white p-6 md:p-8 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'}
            alt="Officer Avatar"
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/30"
          />
          <div>
            <h1 className="text-xl md:text-2xl font-bold">
              {user?.full_name || 'Thiru R. Karunakaran M.A., B.Ed.'}
            </h1>
            <p className="text-xs text-teal-200 mt-1">
              District Educational Officer (DEO) • Salem Educational District (DEO-TN-4190)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="success" className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30 text-xs py-1.5 px-3">
            <CheckCircle className="w-4 h-4 mr-1.5" />
            Official Authority
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
          title="District Model Schools"
          value={schools.length || 3}
          subtitle="Salem Educational Region"
          icon={<Building2 className="w-5 h-5 text-emerald-600" />}
        />
        <StatCard
          title="Pending Fund Sanctions"
          value={fundRequests.filter(r => r.status === 'pending').length}
          subtitle="Infrastructure Requests"
          trend="Action Required"
          icon={<TrendingUp className="w-5 h-5 text-amber-500" />}
        />
        <StatCard
          title="Escalated Grievances"
          value={complaints.filter(c => c.is_escalated_to_officer).length}
          subtitle="High Priority"
          icon={<AlertTriangle className="w-5 h-5 text-red-500" />}
        />
        <StatCard
          title="Inspections Completed"
          value={inspections.filter(i => i.status === 'completed').length}
          subtitle="Target: 2 / School"
          trend="On Track"
          trendPositive={true}
          icon={<ClipboardList className="w-5 h-5 text-teal-600" />}
        />
      </div>

      {/* Grid: Fund Requests Review & Inspections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Fund Sanction Requests */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              {t('officer.fundReview')}
            </h3>
            <Badge variant="warning">{fundRequests.filter(r => r.status === 'pending').length} Pending</Badge>
          </div>

          <div className="space-y-3">
            {fundRequests.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">{req.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{req.purpose}</p>
                  </div>
                  <StatusBadge status={req.status} />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700 text-xs">
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 font-mono">
                    ₹{req.estimated_amount.toLocaleString()}
                  </span>

                  {req.status === 'pending' ? (
                    <Button size="sm" onClick={() => setReviewFund(req)}>
                      Review & Sanction
                    </Button>
                  ) : (
                    <span className="text-gray-400 font-medium">Status: {req.status}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Inspections Schedule & Audit Reports */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-teal-600" />
              {t('officer.inspections')}
            </h3>
            <Badge variant="brand">Target: 2 / School / Year</Badge>
          </div>

          <div className="space-y-3">
            {inspections.map((insp) => (
              <div
                key={insp.id}
                className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                      Government Model Higher Secondary School, Salem North
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{insp.report_summary}</p>
                  </div>
                  <StatusBadge status={insp.status} />
                </div>

                {insp.status === 'completed' && (
                  <div className="grid grid-cols-3 gap-2 p-2 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-center text-xs">
                    <div>
                      <span className="text-[10px] text-gray-500 block">Academic</span>
                      <span className="font-bold text-teal-800 dark:text-teal-300">{insp.academic_score} / 10</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 block">Infrastructure</span>
                      <span className="font-bold text-teal-800 dark:text-teal-300">{insp.infrastructure_score} / 10</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 block">Hygiene/Meals</span>
                      <span className="font-bold text-teal-800 dark:text-teal-300">{insp.hygiene_score} / 10</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-400">
                  <div className="flex items-center gap-1 font-mono text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-teal-600" />
                    <span>{insp.latitude ? `${insp.latitude}, ${insp.longitude}` : 'GPS Tagged'}</span>
                  </div>

                  {insp.status === 'scheduled' && (
                    <Button size="sm" onClick={() => setSelectedInspection(insp)}>
                      Submit Audit
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Escalated Grievances Queue */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            {t('officer.escalatedComplaints')}
          </h3>
          <Badge variant="danger">Escalated to District Education Officer</Badge>
        </div>

        <div className="space-y-3">
          {complaints.filter(c => c.is_escalated_to_officer).map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-xl bg-red-50/30 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 flex flex-col md:flex-row md:items-center justify-between gap-3"
            >
              <div>
                <span className="font-mono text-xs text-red-400">{c.reference_number}</span>
                <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mt-0.5">{c.title}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{c.description}</p>
                {c.escalation_reason && (
                  <p className="text-[11px] text-red-600 dark:text-red-400 font-medium mt-1">
                    <strong>Reason for Escalation:</strong> {c.escalation_reason}
                  </p>
                )}
              </div>
              <Button size="sm" variant="outline" onClick={() => alert('Verification and administrative inquiry initiated for complaint: ' + c.reference_number)}>
                Initiate District Inquiry
              </Button>
            </div>
          ))}
        </div>
      </Card>
      </>
      )}

      {/* Fund Review Modal */}
      <Modal
        isOpen={Boolean(reviewFund)}
        onClose={() => setReviewFund(null)}
        title="Sanction Government Grant Request"
      >
        <div className="space-y-4">
          <div>
            <span className="text-xs text-gray-500 font-medium">Grant Proposal</span>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{reviewFund?.title}</p>
            <p className="text-xs text-gray-500 mt-1">{reviewFund?.purpose}</p>
            <p className="text-sm font-bold text-emerald-600 mt-2">
              Amount: ₹{reviewFund?.estimated_amount.toLocaleString()}
            </p>
          </div>

          <Textarea
            label="Education Officer Sanction Notes"
            value={officerNotes}
            onChange={(e) => setOfficerNotes(e.target.value)}
            required
          />

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              variant="danger"
              isLoading={submittingFundReview}
              onClick={() => handleFundReview('rejected')}
            >
              Reject Request
            </Button>
            <Button
              isLoading={submittingFundReview}
              onClick={() => handleFundReview('approved')}
            >
              Approve & Sanction
            </Button>
          </div>
        </div>
      </Modal>

      {/* Inspection Completion Modal */}
      <Modal
        isOpen={Boolean(selectedInspection)}
        onClose={() => setSelectedInspection(null)}
        title={t('officer.completeInspection')}
      >
        <form onSubmit={handleCompleteInspection} className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <Input
              label={t('officer.academicScore')}
              type="number"
              step="0.1"
              value={academicScore}
              onChange={(e) => setAcademicScore(e.target.value)}
              required
            />
            <Input
              label={t('officer.infraScore')}
              type="number"
              step="0.1"
              value={infraScore}
              onChange={(e) => setInfraScore(e.target.value)}
              required
            />
            <Input
              label={t('officer.hygieneScore')}
              type="number"
              step="0.1"
              value={hygieneScore}
              onChange={(e) => setHygieneScore(e.target.value)}
              required
            />
          </div>

          <Textarea
            label="Inspection Evaluation & Stock Verification Report"
            value={reportSummary}
            onChange={(e) => setReportSummary(e.target.value)}
            placeholder="Detailed narrative on midday meal hygiene, smart classroom utilization, and student attendance..."
            required
          />

          <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-xs">
            <div className="flex items-center gap-1.5 font-mono">
              <MapPin className="w-4 h-4 text-teal-600" />
              <span>GPS Tag: {coords.lat ? coords.lat.toFixed(4) : '11.6643'}, {coords.lng ? coords.lng.toFixed(4) : '78.1460'}</span>
            </div>
            <Button type="button" size="sm" variant="outline" onClick={captureLocation}>
              Capture Current GPS
            </Button>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setSelectedInspection(null)}>
              {t('common.cancel')}
            </Button>
            <Button type="submit" isLoading={submittingInspection}>
              Commit Inspection Audit
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
