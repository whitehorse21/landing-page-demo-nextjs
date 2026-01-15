import React from 'react'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'card' | 'avatar' | 'image'
  width?: string | number
  height?: string | number
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
}) => {
  const baseClasses = 'animate-pulse bg-gray-200 dark:bg-gray-700 rounded'
  
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded',
    card: 'rounded-lg',
    avatar: 'rounded-full',
    image: 'rounded',
  }

  const style: React.CSSProperties = {}
  if (width) style.width = typeof width === 'number' ? `${width}px` : width
  if (height) style.height = typeof height === 'number' ? `${height}px` : height

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  )
}

// Pre-built skeleton components for common use cases
export const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
    <Skeleton variant="text" width="60%" height={20} className="mb-4" />
    <Skeleton variant="text" width="40%" height={16} />
  </div>
)

export const SkeletonStatCard = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <Skeleton variant="text" width="70%" height={16} className="mb-2" />
        <Skeleton variant="text" width="50%" height={32} className="mb-2" />
        <Skeleton variant="text" width="60%" height={14} />
      </div>
      <Skeleton variant="circular" width={48} height={48} />
    </div>
  </div>
)

export const SkeletonCityCard = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
    <Skeleton variant="image" width="100%" height={192} />
    <div className="p-4">
      <Skeleton variant="text" width="60%" height={24} className="mb-2" />
      <Skeleton variant="text" width="40%" height={16} className="mb-4" />
      <div className="flex items-center justify-between">
        <Skeleton variant="text" width={80} height={24} />
        <Skeleton variant="rectangular" width={100} height={36} className="rounded-lg" />
      </div>
    </div>
  </div>
)

export const SkeletonTableRow = () => (
  <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
    {[1, 2, 3, 4, 5].map((i) => (
      <td key={i} className="px-6 py-4">
        <Skeleton variant="text" width={i === 2 ? '80%' : '60%'} height={16} />
      </td>
    ))}
  </tr>
)

export const SkeletonChart = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
    <Skeleton variant="text" width="50%" height={24} className="mb-4" />
    <Skeleton variant="rectangular" width="100%" height={256} />
  </div>
)

export const SkeletonMessageItem = () => (
  <div className="flex items-center gap-3 p-3 border-b border-gray-200 dark:border-gray-700">
    <Skeleton variant="avatar" width={48} height={48} />
    <div className="flex-1">
      <Skeleton variant="text" width="40%" height={16} className="mb-2" />
      <Skeleton variant="text" width="70%" height={14} />
    </div>
  </div>
)

export default Skeleton
