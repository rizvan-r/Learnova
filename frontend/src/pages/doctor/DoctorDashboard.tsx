import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../context/AuthContext'
import { api } from '../../api/client'
import { Card, StatCard } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge, StatusBadge } from '../../components/ui/Badge'
import { Modal } from '../../components/ui/Modal'
import { Input, Select } from '../../components/ui/Input'
import { LoadingSkeleton } from '../../components/ui/EmptyState'
import {
  Calendar,
  Send,
  AlertTriangle,
  CheckCircle,
  FileSpreadsheet,
  PlusCircle,
  Building,
  HeartPulse,
} from 'lucide-react'

export const DoctorDashboard: React.FC = () => {
  const { t } = useTranslation()
  const { user } = useAuth()

  const [visits, setVisits] = useState<any[]>([])
  const [records, setRecords] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // New screening modal
  const [modalOpen, setModalOpen] = useState(false)
  const [studentName, setStudentName] = useState('')
  const [grade, setGrade] = useState('11-A')
  const [height, setHeight] = useState('160.0')
  const [weight, setWeight] = useState('51.5')
  const [vision, setVision] = useState('Normal (6/6)')
  const [dental, setDental] = useState('Good')
  const healthStatus = 'Fit & Healthy'
  const [followUp, setFollowUp] = useState(false)
  const [followUpReason, setFollowUpReason] = useState('')
  const [parentPhone, setParentPhone] = useState('+91 98765 43210')
  const [submitting, setSubmitting] = useState(false)
  const [toastMsg, setToastMsg] = useState('')

  const loadData = async () => {
    try {
      const [visitData, recordData] = await Promise.all([
        api.getDoctorVisits().catch(() => []),
        api.getHealthRecords().catch(() => []),
      ])
      setVisits(visitData)
      setRecords(recordData)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleCreateRecord = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await api.createHealthRecord({
        visit_id: visits[0]?.id || 'dv-001',
        student_name: studentName,
        grade,
        height_cm: parseFloat(height),
        weight_kg: parseFloat(weight),
        vision_status: vision,
        dental_status: dental,
        general_health: healthStatus,
        follow_up_needed: followUp,
        follow_up_reason: followUp ? followUpReason : null,
        mock_sms_phone: parentPhone,
      })
      setModalOpen(false)
      setStudentName('')
      setFollowUpReason('')
      setToastMsg('Student health screening recorded successfully!')
      loadData()
    } catch (err: any) {
      alert(err.message || 'Failed to record screening')
    } finally {
      setSubmitting(false)
    }
  }

  const handleSendMockSms = async (recordId: string) => {
    try {
      const res = await api.sendMockSms(recordId)
      setToastMsg(`Simulated SMS delivered to parent phone: ${res.phone}`)
      loadData()
    } catch (err: any) {
      alert(err.message || 'Failed to dispatch mock SMS')
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-900 via-cyan-900 to-[#172B4D] text-white p-6 md:p-8 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar_url || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150'}
            alt="Doctor Avatar"
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/30"
          />
          <div>
            <h1 className="text-xl md:text-2xl font-bold">
              {user?.full_name || 'Dr. S. Vignesh M.B.B.S.'}
            </h1>
            <p className="text-xs text-teal-200 mt-1">
              School Health Officer • Salem Regional Adolescent Health Mission (DOC-TN-8821)
            </p>
          </div>
        </div>

        <Button
          variant="white"
          onClick={() => setModalOpen(true)}
          className="shadow-xs font-semibold text-teal-900 hover:bg-teal-50"
        >
          <PlusCircle className="w-4 h-4 mr-1.5 text-teal-900" />
          {t('doctor.recordHealth')}
        </Button>
      </div>

      {/* Fictional Medical Records Disclaimer Banner */}
      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600" />
        <span>
          <strong>Simulated Health Records:</strong> {t('doctor.simulatedDisclaimer')} SMS parent notifications use mock delivery simulation with zero real telecommunication charges.
        </span>
      </div>

      {toastMsg && (
        <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 text-xs text-green-700 dark:text-green-300 flex items-center justify-between">
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg('')} className="font-bold underline text-xs cursor-pointer">
            Dismiss
          </button>
        </div>
      )}

      {/* Stats Counter */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Assigned Schools"
          value="4 Schools"
          subtitle="Salem Urban Block"
          icon={<Building className="w-5 h-5 text-teal-600" />}
        />
        <StatCard
          title="Students Screened"
          value={records.length}
          subtitle="Term 1 Adolescents"
          icon={<HeartPulse className="w-5 h-5 text-rose-500" />}
        />
        <StatCard
          title="Flagged Follow-ups"
          value={records.filter(r => r.follow_up_needed).length}
          subtitle="Optometry / Dental Care"
          icon={<AlertTriangle className="w-5 h-5 text-amber-500" />}
        />
        <StatCard
          title="Mock SMS Sent"
          value={records.filter(r => r.mock_sms_sent).length}
          subtitle="Simulated Parent Delivery"
          icon={<Send className="w-5 h-5 text-blue-600" />}
        />
      </div>

      {/* Visit Schedule Calendar & Screening Table */}
      {loading ? (
        <LoadingSkeleton rows={6} />
      ) : (
        <div className="space-y-6">
          {/* Visit Calendar */}
          <Card className="space-y-4">
          <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-teal-600" />
            {t('doctor.visitCalendar')}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visits.map((v) => (
              <div
                key={v.id}
                className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    Government Model Higher Secondary School, Salem North
                  </span>
                  <StatusBadge status={v.status} />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{v.notes}</p>
                <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700">
                  <span>Scheduled: {v.scheduled_date}</span>
                  <span>Screened: {v.total_screened} Students</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Fictional Student Screening Table */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-[#087F72]" />
              {t('doctor.screenings')}
            </h3>
            <Badge variant="brand">Simulated Records</Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-400 uppercase tracking-wider">
                  <th className="py-2.5 px-3">Student Name</th>
                  <th className="py-2.5 px-3">Class</th>
                  <th className="py-2.5 px-3">Height / Weight</th>
                  <th className="py-2.5 px-3">Vision Index</th>
                  <th className="py-2.5 px-3">Dental / Health</th>
                  <th className="py-2.5 px-3">Follow-up</th>
                  <th className="py-2.5 px-3 text-right">Parent SMS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {records.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30">
                    <td className="py-3 px-3 font-semibold text-gray-900 dark:text-gray-100">{r.student_name}</td>
                    <td className="py-3 px-3 text-gray-500">{r.grade}</td>
                    <td className="py-3 px-3 font-mono text-gray-600 dark:text-gray-300">
                      {r.height_cm} cm • {r.weight_kg} kg
                    </td>
                    <td className="py-3 px-3">{r.vision_status}</td>
                    <td className="py-3 px-3">
                      <span className="font-medium text-gray-700 dark:text-gray-200">{r.general_health}</span>
                      <span className="block text-[11px] text-gray-400">{r.dental_status}</span>
                    </td>
                    <td className="py-3 px-3">
                      {r.follow_up_needed ? (
                        <span className="text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Needed
                        </span>
                      ) : (
                        <span className="text-green-600 dark:text-green-400 font-medium">None</span>
                      )}
                      {r.follow_up_reason && (
                        <span className="block text-[10px] text-gray-400 truncate max-w-[150px]">
                          {r.follow_up_reason}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      {r.mock_sms_sent ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-950/40 px-2 py-0.5 rounded-md font-mono">
                          <CheckCircle className="w-3 h-3" />
                          Simulated Sent
                        </span>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => handleSendMockSms(r.id)}>
                          <Send className="w-3 h-3 mr-1" />
                          Mock SMS
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
      )}

      {/* Record Screening Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={t('doctor.recordHealth')}
      >
        <form onSubmit={handleCreateRecord} className="space-y-4">
          <Input
            label={t('doctor.studentName')}
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="e.g. K. Arulmozhi"
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Grade & Section"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              required
            />
            <Input
              label="Parent Phone (Simulated)"
              value={parentPhone}
              onChange={(e) => setParentPhone(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Height (cm)"
              type="number"
              step="0.1"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
            />
            <Input
              label="Weight (kg)"
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Select
              label={t('doctor.visionStatus')}
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              options={[
                { value: 'Normal (6/6)', label: 'Normal (6/6)' },
                { value: 'Mild Myopia (6/9)', label: 'Mild Myopia (6/9)' },
                { value: 'Refraction Required', label: 'Refraction Required (6/12+)' },
              ]}
            />
            <Select
              label={t('doctor.dentalStatus')}
              value={dental}
              onChange={(e) => setDental(e.target.value)}
              options={[
                { value: 'Good', label: 'Good & Healthy' },
                { value: 'Satisfactory', label: 'Satisfactory' },
                { value: 'Caries Present', label: 'Dental Caries Present' },
              ]}
            />
          </div>

          <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="fu-check"
                checked={followUp}
                onChange={(e) => setFollowUp(e.target.checked)}
                className="h-4 w-4 text-teal-600 rounded-sm"
              />
              <label htmlFor="fu-check" className="text-xs font-semibold text-gray-900 dark:text-gray-100 cursor-pointer">
                {t('doctor.followUp')}
              </label>
            </div>
            {followUp && (
              <Input
                label="Referral & Clinical Notes"
                value={followUpReason}
                onChange={(e) => setFollowUpReason(e.target.value)}
                placeholder="e.g. Ophthalmology refraction checkup recommended"
                required
              />
            )}
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button type="submit" isLoading={submitting}>
              Save Health Record
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
