import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../context/AuthContext'
import type { Complaint } from '../../api/client'
import { api } from '../../api/client'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge, StatusBadge } from '../../components/ui/Badge'
import { Modal } from '../../components/ui/Modal'
import { Input, Select, Textarea } from '../../components/ui/Input'
import { EmptyState, LoadingSkeleton } from '../../components/ui/EmptyState'
import {
  Vote,
  ThumbsUp,
  PlusCircle,
  Lock,
} from 'lucide-react'

export const ComplaintsPage: React.FC = () => {
  const { t, i18n } = useTranslation()
  const { user } = useAuth()

  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  // Modal
  const [modalOpen, setModalOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('classroom_projector')
  const [desc, setDesc] = useState('')
  const [isAnon, setIsAnon] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [toastMsg, setToastMsg] = useState('')

  const loadComplaints = async () => {
    try {
      const data = await api.getComplaints()
      setComplaints(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadComplaints()
  }, [])

  const handleVote = async (id: string) => {
    try {
      await api.voteComplaint(id)
      setToastMsg('Your vote was verified and recorded!')
      loadComplaints()
    } catch (err: any) {
      alert(err.message || 'You have already voted on this issue.')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await api.createComplaint({
        title,
        category,
        description: desc,
        is_anonymous: isAnon,
        is_common_issue: true,
      })
      setModalOpen(false)
      setTitle('')
      setDesc('')
      setToastMsg(
        isAnon
          ? 'Grievance submitted anonymously. Your identity is concealed from school administrators.'
          : 'Grievance recorded with reference tracking number.'
      )
      loadComplaints()
    } catch (err: any) {
      alert(err.message || 'Failed to submit grievance')
    } finally {
      setSubmitting(false)
    }
  }

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'classroom_projector', label: 'Classroom Projector / Smart Board' },
    { value: 'drinking_water', label: 'Drinking Water & RO Filter' },
    { value: 'sports_equipment', label: 'Sports Equipment' },
    { value: 'cleanliness', label: 'Cleanliness & Sanitation' },
    { value: 'meals', label: 'Midday Meals' },
    { value: 'infrastructure', label: 'Infrastructure & Labs' },
  ]

  const filtered = complaints.filter((c) => {
    if (filterCategory === 'all') return true
    return c.category === filterCategory
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-900 to-[#172B4D] text-white p-8 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Badge variant="brand" className="bg-white/20 text-white border-none text-xs">
            Transparent Grievance Governance
          </Badge>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1">
            {t('nav.complaints')}
          </h1>
          <p className="text-xs md:text-sm text-teal-100 mt-1 max-w-xl">
            Report school facility issues, vote on urgent maintenance, or file anonymous complaints protected from administrative exposure.
          </p>
        </div>

        <Button
          variant="white"
          onClick={() => setModalOpen(true)}
          className="shadow-xs font-semibold"
        >
          <PlusCircle className="w-4 h-4 mr-1.5 text-[#087F72]" />
          File Grievance
        </Button>
      </div>

      {toastMsg && (
        <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 text-xs text-green-700 dark:text-green-300 flex items-center justify-between">
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg('')} className="font-bold underline text-xs cursor-pointer">
            Dismiss
          </button>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFilterCategory(cat.value)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              filterCategory === cat.value
                ? 'bg-[#087F72] text-white dark:bg-[#2DD4BF] dark:text-gray-900'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grievance Cards List */}
      {loading ? (
        <LoadingSkeleton rows={4} />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No grievances found"
          description="There are currently no recorded grievances in this category."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((c) => (
          <Card key={c.id} className="p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-gray-400">{c.reference_number}</span>
                <StatusBadge status={c.status} />
              </div>

              <div>
                <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">
                  {i18n.language === 'ta' && c.title_ta ? c.title_ta : c.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{c.description}</p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                {c.is_anonymous ? (
                  <Badge variant="gray" size="sm" className="flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Anonymous Complainant
                  </Badge>
                ) : (
                  <Badge variant="info" size="sm">Verified Identity</Badge>
                )}
                {c.is_escalated_to_officer && (
                  <Badge variant="danger" size="sm">Escalated to DEO</Badge>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                <Vote className="w-4 h-4 text-teal-600" />
                <span className="font-bold text-gray-900 dark:text-gray-100">{c.vote_count}</span>
                <span>Verified Student Votes</span>
              </div>

              {user?.role === 'student' && (
                c.has_voted ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#087F72] dark:text-[#2DD4BF] bg-[#DDF5EF] dark:bg-teal-950/60 px-2.5 py-1 rounded-lg">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    Voted
                  </span>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => handleVote(c.id)}>
                    <Vote className="w-3.5 h-3.5 mr-1" />
                    Vote
                  </Button>
                )
              )}
            </div>
          </Card>
        ))}
      </div>
      )}

      {/* File Complaint Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Submit Grievance or Facility Maintenance Issue"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Issue Headline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Science lab chemical reagent shortage"
            required
          />

          <Select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={categories.filter(c => c.value !== 'all')}
          />

          <Textarea
            label="Detailed Description & Context"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Specify affected grades, location, and nature of the issue..."
            required
          />

          <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 flex items-start gap-2.5">
            <input
              type="checkbox"
              id="modal-anon"
              checked={isAnon}
              onChange={(e) => setIsAnon(e.target.checked)}
              className="mt-1 h-4 w-4 text-[#087F72] rounded-sm"
            />
            <label htmlFor="modal-anon" className="text-xs text-gray-700 dark:text-gray-300 cursor-pointer">
              <span className="font-semibold block">Submit Anonymously</span>
              <span>Your profile identity is separated into an isolated security table and concealed from the Headmaster and school staff.</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" isLoading={submitting}>
              Submit Grievance
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
