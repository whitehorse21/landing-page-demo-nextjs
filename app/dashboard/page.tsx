'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { SkeletonStatCard, SkeletonChart, SkeletonCard } from '@/components/dashboard/SkeletonLoader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const Dashboard = () => {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Mock data
  const stats = [
    { labelKey: 'dashboard.dashboard.stats.totalBookings', value: '12', changeKey: 'dashboard.dashboard.stats.thisMonth', changeValue: '2', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { labelKey: 'dashboard.dashboard.stats.upcomingTrips', value: '3', changeKey: 'dashboard.dashboard.stats.nextTrip', changeParams: { destination: 'Paris', days: '5' }, icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { labelKey: 'dashboard.dashboard.stats.totalSpent', value: '$4,250', changeKey: 'dashboard.dashboard.stats.thisMonth', changeValue: '$850', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { labelKey: 'dashboard.dashboard.stats.messages', value: '8', changeKey: 'dashboard.dashboard.stats.unread', changeValue: '3', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
  ]

  const recentBookings = [
    { id: 1, destination: 'Paris, France', date: '2026-02-15', status: 'Confirmed', amount: '$1,200' },
    { id: 2, destination: 'Tokyo, Japan', date: '2026-03-20', status: 'Pending', amount: '$2,100' },
    { id: 3, destination: 'Barcelona, Spain', date: '2026-04-10', status: 'Confirmed', amount: '$950' },
  ]

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-9 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
          <div className="h-5 w-96 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonStatCard key={i} />
          ))}
        </div>

        {/* Charts Row Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkeletonChart />
          <SkeletonChart />
        </div>

        {/* Recent Bookings Skeleton */}
        <SkeletonCard />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t('dashboard.dashboard.title').replace('{name}', user?.firstName || '')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {t('dashboard.dashboard.subtitle')}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t(stat.labelKey)}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                    {stat.changeParams
                      ? t(stat.changeKey).replace(/\{(\w+)\}/g, (_match: string, key: string) => (stat.changeParams as Record<string, string>)[key] || _match)
                      : t(stat.changeKey).replace('{value}', stat.changeValue || '').replace('{count}', stat.changeValue || '')}
                  </p>
                </div>
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bookings Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.dashboard.charts.bookingsOverview')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2">
              {[
                { month: 'Jan', value: 2, height: 40 },
                { month: 'Feb', value: 4, height: 60 },
                { month: 'Mar', value: 3, height: 50 },
                { month: 'Apr', value: 5, height: 80 },
                { month: 'May', value: 3, height: 50 },
                { month: 'Jun', value: 4, height: 60 },
              ].map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center justify-end" style={{ height: '200px' }}>
                    <div
                      className="w-full bg-emerald-500 dark:bg-emerald-600 rounded-t hover:bg-emerald-600 dark:hover:bg-emerald-500 transition-colors cursor-pointer"
                      style={{ height: `${item.height}%` }}
                      title={`${item.value} bookings`}
                    />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">{item.month}</span>
                  <span className="text-xs font-semibold text-gray-900 dark:text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Spending Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.dashboard.charts.spendingTrend')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 relative">
              <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="spendingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polyline
                  points="0,180 50,150 100,160 150,120 200,140 250,100 300,110 350,80 400,90"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  className="dark:stroke-emerald-400"
                />
                <polyline
                  points="0,180 50,150 100,160 150,120 200,140 250,100 300,110 350,80 400,90 400,200 0,200"
                  fill="url(#spendingGradient)"
                />
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <circle
                    key={i}
                    cx={i * 50}
                    cy={[180, 150, 160, 120, 140, 100, 110, 80, 90][i]}
                    r="4"
                    fill="#10b981"
                    className="dark:fill-emerald-400"
                  />
                ))}
              </svg>
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-600 dark:text-gray-400 px-2">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.dashboard.recentBookings')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg"
              >
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{booking.destination}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {t('dashboard.dashboard.departure')}: {booking.date}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      booking.status === 'Confirmed'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}
                  >
                    {booking.status}
                  </span>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mt-2">
                    {booking.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard
