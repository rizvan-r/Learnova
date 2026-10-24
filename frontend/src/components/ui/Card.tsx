import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  feature?: boolean
}

export const Card: React.FC<CardProps> = ({
  children,
  feature = false,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm transition-theme ${
        feature ? 'rounded-2xl p-6' : 'rounded-xl p-5'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ReactNode
  trend?: string
  trendPositive?: boolean
  className?: string
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendPositive,
  className = '',
}) => {
  return (
    <Card className={`flex flex-col justify-between ${className}`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{title}</p>
        {icon && (
          <div className="p-2 rounded-lg bg-[#DDF5EF] dark:bg-teal-950/50 text-[#087F72] dark:text-[#2DD4BF]">
            {icon}
          </div>
        )}
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
        <div className="flex items-center justify-between mt-1">
          {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>}
          {trend && (
            <span
              className={`text-xs font-medium ${
                trendPositive ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'
              }`}
            >
              {trend}
            </span>
          )}
        </div>
      </div>
    </Card>
  )
}
