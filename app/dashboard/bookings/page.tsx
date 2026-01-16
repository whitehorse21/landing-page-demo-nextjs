'use client'

import { useState, useEffect } from 'react'
import BookingDetailsModal from '@/components/dashboard/BookingDetailsModal'
import { useLanguage } from '@/contexts/LanguageContext'
import { SkeletonTableRow } from '@/components/dashboard/SkeletonLoader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DatePickerInput } from '@/components/ui/date-picker'
interface Review {
  rating: number
  comment: string
  date: string
}

interface Booking {
  id: number
  destination: string
  checkIn: string
  checkOut: string
  guests: number
  status: string
  amount: string
  bookingId: string
  review?: Review
}

type StatusFilter = 'All' | 'Confirmed' | 'Pending' | 'Completed'

const Bookings = () => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All')
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useLanguage()
  const itemsPerPage = 10

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const allBookings: Booking[] = [
    { id: 1, destination: 'Paris, France', checkIn: '2026-02-15', checkOut: '2026-02-20', guests: 2, status: 'Confirmed', amount: '$1,200', bookingId: 'BK-2026-001' },
    { id: 2, destination: 'Tokyo, Japan', checkIn: '2026-03-20', checkOut: '2026-03-27', guests: 2, status: 'Pending', amount: '$2,100', bookingId: 'BK-2026-002' },
    { id: 3, destination: 'Rome, Italy', checkIn: '2026-04-10', checkOut: '2026-04-17', guests: 3, status: 'Confirmed', amount: '$1,350', bookingId: 'BK-2026-003' },
    { id: 4, destination: 'Dubai, UAE', checkIn: '2026-05-05', checkOut: '2026-05-12', guests: 2, status: 'Confirmed', amount: '$2,500', bookingId: 'BK-2026-004' },
    { id: 5, destination: 'Amsterdam, Netherlands', checkIn: '2026-06-01', checkOut: '2026-06-08', guests: 2, status: 'Confirmed', amount: '$1,400', bookingId: 'BK-2026-005' },
    { id: 6, destination: 'Barcelona, Spain', checkIn: '2025-12-10', checkOut: '2025-12-15', guests: 2, status: 'Completed', amount: '$950', bookingId: 'BK-2025-005' },
    { id: 7, destination: 'London, UK', checkIn: '2025-11-05', checkOut: '2025-11-10', guests: 1, status: 'Completed', amount: '$1,400', bookingId: 'BK-2025-006', review: { rating: 5, comment: 'Amazing experience! The location was perfect and the service was excellent. Would definitely book again.', date: '2025-11-12' } },
    { id: 8, destination: 'New York, USA', checkIn: '2025-09-20', checkOut: '2025-09-27', guests: 2, status: 'Completed', amount: '$1,800', bookingId: 'BK-2025-007', review: { rating: 4, comment: 'Great stay overall. The room was clean and comfortable. The only minor issue was the noise from the street, but it was manageable.', date: '2025-09-30' } },
    { id: 9, destination: 'Singapore', checkIn: '2025-08-15', checkOut: '2025-08-22', guests: 2, status: 'Completed', amount: '$1,500', bookingId: 'BK-2025-008' },
    { id: 10, destination: 'Sydney, Australia', checkIn: '2025-07-10', checkOut: '2025-07-17', guests: 3, status: 'Completed', amount: '$2,300', bookingId: 'BK-2025-009', review: { rating: 5, comment: 'Absolutely fantastic! The views were breathtaking and the staff went above and beyond to make our stay memorable. Highly recommend!', date: '2025-07-20' } },
    { id: 11, destination: 'Bangkok, Thailand', checkIn: '2025-06-05', checkOut: '2025-06-12', guests: 2, status: 'Completed', amount: '$800', bookingId: 'BK-2025-010' },
    { id: 12, destination: 'Istanbul, Turkey', checkIn: '2025-05-20', checkOut: '2025-05-27', guests: 2, status: 'Completed', amount: '$900', bookingId: 'BK-2025-011', review: { rating: 4, comment: 'Beautiful city and great accommodation. The breakfast was delicious and the location was convenient for exploring.', date: '2025-05-29' } },
    { id: 13, destination: 'Vienna, Austria', checkIn: '2025-04-15', checkOut: '2025-04-22', guests: 2, status: 'Completed', amount: '$1,200', bookingId: 'BK-2025-012' },
    { id: 14, destination: 'Prague, Czech Republic', checkIn: '2025-03-10', checkOut: '2025-03-17', guests: 2, status: 'Completed', amount: '$850', bookingId: 'BK-2025-013' },
    { id: 15, destination: 'Berlin, Germany', checkIn: '2025-02-05', checkOut: '2025-02-12', guests: 2, status: 'Completed', amount: '$1,100', bookingId: 'BK-2025-014', review: { rating: 5, comment: 'Perfect stay! Everything exceeded our expectations. The room was spacious, modern, and the location was ideal for sightseeing.', date: '2025-02-15' } },
  ]

  const filteredBookings = allBookings.filter(booking => {
    // Status filter
    const statusMatch = statusFilter === 'All' || booking.status === statusFilter
    
    // Date range filter (using checkIn date)
    let dateMatch = true
    if (startDate || endDate) {
      const checkInDate = new Date(booking.checkIn)
      if (startDate) {
        const start = new Date(startDate)
        start.setHours(0, 0, 0, 0)
        if (checkInDate < start) dateMatch = false
      }
      if (endDate) {
        const end = new Date(endDate)
        end.setHours(23, 59, 59, 999)
        if (checkInDate > end) dateMatch = false
      }
    }
    
    return statusMatch && dateMatch
  })

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedBookings = filteredBookings.slice(startIndex, endIndex)

  const handleStatusFilterChange = (status: StatusFilter) => {
    setStatusFilter(status)
    setCurrentPage(1)
  }

  // Reset to page 1 when date filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [startDate, endDate])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-9 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
          <div className="h-5 w-96 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
              <div className="flex gap-1">
                <div className="h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                <div className="h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                <div className="h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                <div className="h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <th key={i} className="px-6 py-3">
                      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {[1, 2, 3, 4, 5].map((i) => (
                  <SkeletonTableRow key={i} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  // Calculate stats for each status
  const bookingStats = {
    all: {
      count: allBookings.length,
      amount: allBookings.reduce((sum, b) => {
        const amountStr = b.amount.replace(/[^0-9.]/g, '')
        return sum + (parseFloat(amountStr) || 0)
      }, 0)
    },
    confirmed: {
      count: allBookings.filter(b => b.status === 'Confirmed').length,
      amount: allBookings.filter(b => b.status === 'Confirmed').reduce((sum, b) => {
        const amountStr = b.amount.replace(/[^0-9.]/g, '')
        return sum + (parseFloat(amountStr) || 0)
      }, 0)
    },
    pending: {
      count: allBookings.filter(b => b.status === 'Pending').length,
      amount: allBookings.filter(b => b.status === 'Pending').reduce((sum, b) => {
        const amountStr = b.amount.replace(/[^0-9.]/g, '')
        return sum + (parseFloat(amountStr) || 0)
      }, 0)
    },
    completed: {
      count: allBookings.filter(b => b.status === 'Completed').length,
      amount: allBookings.filter(b => b.status === 'Completed').reduce((sum, b) => {
        const amountStr = b.amount.replace(/[^0-9.]/g, '')
        return sum + (parseFloat(amountStr) || 0)
      }, 0)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('dashboard.bookings.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {t('dashboard.bookings.subtitle')}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 cursor-pointer transition-all hover:shadow-lg ${
            statusFilter === 'All' ? 'ring-2 ring-emerald-500' : ''
          }`}
          onClick={() => handleStatusFilterChange('All')}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-xl text-gray-600 dark:text-gray-400">{t('dashboard.bookings.filter.all')}</p>
            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-900 dark:text-white">{bookingStats.all.count}</p>
          <p className="text-base text-gray-500 dark:text-gray-400 mt-1">
            ${bookingStats.all.amount.toLocaleString()}
          </p>
        </div>
        <div 
          className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 cursor-pointer transition-all hover:shadow-lg ${
            statusFilter === 'Confirmed' ? 'ring-2 ring-emerald-500' : ''
          }`}
          onClick={() => handleStatusFilterChange('Confirmed')}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-xl text-gray-600 dark:text-gray-400">{t('dashboard.bookings.status.confirmed')}</p>
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
              <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-5xl font-bold text-emerald-600 dark:text-emerald-400">{bookingStats.confirmed.count}</p>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-1">
            ${bookingStats.confirmed.amount.toLocaleString()}
          </p>
        </div>
        <div 
          className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 cursor-pointer transition-all hover:shadow-lg ${
            statusFilter === 'Pending' ? 'ring-2 ring-emerald-500' : ''
          }`}
          onClick={() => handleStatusFilterChange('Pending')}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-xl text-gray-600 dark:text-gray-400">{t('dashboard.bookings.status.pending')}</p>
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-5xl font-bold text-yellow-600 dark:text-yellow-400">{bookingStats.pending.count}</p>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-1">
            ${bookingStats.pending.amount.toLocaleString()}
          </p>
        </div>
        <div 
          className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 cursor-pointer transition-all hover:shadow-lg ${
            statusFilter === 'Completed' ? 'ring-2 ring-emerald-500' : ''
          }`}
          onClick={() => handleStatusFilterChange('Completed')}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-xl text-gray-600 dark:text-gray-400">{t('dashboard.bookings.status.completed')}</p>
            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <p className="text-5xl font-bold text-gray-600 dark:text-gray-400">{bookingStats.completed.count}</p>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-1">
            ${bookingStats.completed.amount.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('dashboard.bookings.title')}</h2>
              {/* Status Filter */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">{t('dashboard.bookings.filter.status')}:</span>
                <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 flex-wrap">
                  {(['All', 'Confirmed', 'Pending', 'Completed'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusFilterChange(status)}
                      className={`px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                        statusFilter === status
                          ? 'bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      {status === 'All' 
                        ? t('dashboard.bookings.filter.all')
                        : t(`dashboard.bookings.status.${status.toLowerCase()}`)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Date Range Filter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">{t('dashboard.bookings.filter.dateRange')}</span>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-1">
                <DatePickerInput
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  placeholder={t('dashboard.bookings.filter.from')}
                />
                <DatePickerInput
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  placeholder={t('dashboard.bookings.filter.to')}
                  minDate={startDate || undefined}
                />
                {(startDate || endDate) && (
                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setStartDate(null)
                        setEndDate(null)
                        setCurrentPage(1)
                      }}
                      className="whitespace-nowrap h-[42px] px-4 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200"
                    >
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      {t('dashboard.bookings.filter.clear')}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('dashboard.bookings.fields.bookingId')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('dashboard.bookings.table.destination')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('dashboard.bookings.fields.checkIn')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('dashboard.bookings.fields.checkOut')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('dashboard.bookings.fields.guests')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('dashboard.bookings.table.amount')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('dashboard.bookings.table.status')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('dashboard.bookings.table.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedBookings.map((booking) => (
                <tr 
                  key={booking.id} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-900/50 cursor-pointer transition-colors"
                  onClick={() => {
                    setSelectedBooking(booking)
                    setIsModalOpen(true)
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {booking.bookingId}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {booking.destination}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {booking.checkIn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {booking.checkOut}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {booking.guests}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                    {booking.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === 'Confirmed'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                          : booking.status === 'Completed'
                          ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}
                    >
                      {booking.status === 'Confirmed' 
                        ? t('dashboard.bookings.status.confirmed')
                        : booking.status === 'Pending'
                        ? t('dashboard.bookings.status.pending')
                        : t('dashboard.bookings.status.completed')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {booking.status === 'Confirmed' && (
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          // Handle cancel action
                        }}
                      >
                        {t('dashboard.bookings.cancel')}
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {t('dashboard.bookings.pagination.showing')} {startIndex + 1} {t('dashboard.bookings.pagination.to')} {Math.min(endIndex, filteredBookings.length)} {t('dashboard.bookings.pagination.of')} {filteredBookings.length} {t('dashboard.bookings.pagination.results')}
          </div>
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === 1
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {t('dashboard.bookings.pagination.previous')}
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === totalPages
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {t('dashboard.bookings.pagination.next')}
              </button>
            </div>
          )}
        </div>
      </div>


      <BookingDetailsModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedBooking(null)
        }}
        booking={selectedBooking}
      />
    </div>
  )
}

export default Bookings
