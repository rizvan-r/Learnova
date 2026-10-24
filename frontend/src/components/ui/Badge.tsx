import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'gray' | 'outline'
  size?: 'sm' | 'md'
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'brand',
  size = 'md',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs font-medium',
  }[size]

  const variantStyles = {
    brand: 'bg-[#DDF5EF] text-[#087F72] dark:bg-teal-950/60 dark:text-[#2DD4BF] border border-teal-200/50 dark:border-teal-800/50',
    success: 'bg-green-100 text-green-800 dark:bg-green-950/60 dark:text-green-300 border border-green-200/50 dark:border-green-800/50',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/50',
    danger: 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300 border border-red-200/50 dark:border-red-800/50',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/50',
    gray: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700',
    outline: 'bg-transparent text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600',
  }[variant]

  return (
    <span className={`inline-flex items-center rounded-full ${sizeStyles} ${variantStyles} ${className}`}>
      {children}
    </span>
  )
}

interface StatusBadgeProps {
  status: string
  className?: string
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const normalized = status.toLowerCase()

  if (['resolved', 'completed', 'approved', 'verified', 'active'].includes(normalized)) {
    return <Badge variant="success" className={className}>{status.toUpperCase()}</Badge>
  }
  if (['in_review', 'action_taken', 'submitted', 'pending'].includes(normalized)) {
    return <Badge variant="warning" className={className}>{status.toUpperCase()}</Badge>
  }
  if (['escalated', 'rejected', 'cancelled', 'urgent', 'high'].includes(normalized)) {
    return <Badge variant="danger" className={className}>{status.toUpperCase()}</Badge>
  }
  return <Badge variant="gray" className={className}>{status.toUpperCase()}</Badge>
}
