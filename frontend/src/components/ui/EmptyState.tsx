import React from 'react'
import { FolderOpen } from 'lucide-react'

interface EmptyStateProps {
  title?: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No records found',
  description = 'There are no active items to display for this view.',
  icon,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
      <div className="p-3 mb-3 text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-800 rounded-full shadow-xs">
        {icon || <FolderOpen className="w-8 h-8" />}
      </div>
      <h4 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-1">{title}</h4>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-4">{description}</p>
      {action}
    </div>
  )
}

export const LoadingSkeleton: React.FC<{ rows?: number }> = ({ rows = 4 }) => {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-14 bg-gray-200 dark:bg-gray-700 rounded-lg w-full" />
      ))}
    </div>
  )
}
