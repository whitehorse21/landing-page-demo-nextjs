'use client'

import { useState, useEffect } from 'react'
import BookingDetailsModal from '@/components/dashboard/BookingDetailsModal'
import { useLanguage } from '@/contexts/LanguageContext'
import { SkeletonTableRow } from '@/components/dashboard/SkeletonLoader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Booking {
  id: number
  destination: string
  checkIn: string
  checkOut: string
  guests: number
  status: string
  amount: string
  bookingId: string
}

const Bookings = () => {
  const [activeTab, setActiveTab] = useState<'current' | 'past'>('current')
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useLanguage()
  const itemsPerPage = 5

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const currentBookings: Booking[] = [
    { id: 1, destination: 'Paris, France', checkIn: '2026-02-15', checkOut: '2026-02-20', guests: 2, status: 'Confirmed', amount: '$1,200', bookingId: 'BK-2026-001' },
    { id: 2, destination: 'Tokyo, Japan', checkIn: '2026-03-20', checkOut: '2026-03-27', guests: 2, status: 'Pending', amount: '$2,100', bookingId: 'BK-2026-002' },
    { id: 3, destination: 'Rome, Italy', checkIn: '2026-04-10', checkOut: '2026-04-17', guests: 3, status: 'Confirmed', amount: '$1,350', bookingId: 'BK-2026-003' },
    { id: 4, destination: 'Dubai, UAE', checkIn: '2026-05-05', checkOut: '2026-05-12', guests: 2, status: 'Confirmed', amount: '$2,500', bookingId: 'BK-2026-004' },
    { id: 5, destination: 'Amsterdam, Netherlands', checkIn: '2026-06-01', checkOut: '2026-06-08', guests: 2, status: 'Confirmed', amount: '$1,400', bookingId: 'BK-2026-005' },
  ]

  const pastBookings: Booking[] = [
    { id: 6, destination: 'Barcelona, Spain', checkIn: '2025-12-10', checkOut: '2025-12-15', guests: 2, status: 'Completed', amount: '$950', bookingId: 'BK-2025-005' },
    { id: 7, destination: 'London, UK', checkIn: '2025-11-05', checkOut: '2025-11-10', guests: 1, status: 'Completed', amount: '$1,400', bookingId: 'BK-2025-006' },
    { id: 8, destination: 'New York, USA', checkIn: '2025-09-20', checkOut: '2025-09-27', guests: 2, status: 'Completed', amount: '$1,800', bookingId: 'BK-2025-007' },
  ]

  const bookings = activeTab === 'current' ? currentBookings : pastBookings
  const totalPages = Math.ceil(bookings.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedBookings = bookings.slice(startIndex, endIndex)

  const handleTabChange = (tab: 'current' | 'past') => {
    setActiveTab(tab)
    setCurrentPage(1)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-9 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
          <div className="h-5 w-96 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-2">
              <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
              <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('dashboard.bookings.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {t('dashboard.bookings.subtitle')}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => handleTabChange(v as 'current' | 'past')}>
        <TabsList>
          <TabsTrigger value="current">
            {t('dashboard.bookings.tabs.current')} ({currentBookings.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            {t('dashboard.bookings.tabs.past')} ({pastBookings.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          {paginatedBookings.map((booking) => (
            <Card
              key={booking.id}
              onClick={() => {
                setSelectedBooking(booking)
                setIsModalOpen(true)
              }}
              className="cursor-pointer hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {booking.destination}
                      </h3>
                      <Badge
                        variant={booking.status === 'Confirmed' ? 'default' : 'secondary'}
                        className={
                          booking.status === 'Confirmed'
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }
                      >
                        {booking.status === 'Confirmed' 
                          ? t('dashboard.bookings.status.confirmed')
                          : t('dashboard.bookings.status.pending')}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{t('dashboard.bookings.fields.checkIn')}</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{booking.checkIn}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{t('dashboard.bookings.fields.checkOut')}</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{booking.checkOut}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{t('dashboard.bookings.fields.guests')}</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{booking.guests}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{t('dashboard.bookings.fields.bookingId')}</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{booking.bookingId}</p>
                      </div>
                    </div>
                  </div>
                  <div className="ml-6 text-right">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{booking.amount}</p>
                    {activeTab === 'current' && booking.status === 'Confirmed' && (
                      <Button variant="destructive" className="mt-4">
                        {t('dashboard.bookings.cancel')}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {paginatedBookings.map((booking) => (
            <Card
              key={booking.id}
              onClick={() => {
                setSelectedBooking(booking)
                setIsModalOpen(true)
              }}
              className="cursor-pointer hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {booking.destination}
                      </h3>
                      <Badge variant="secondary">
                        {t('dashboard.bookings.status.completed')}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{t('dashboard.bookings.fields.checkIn')}</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{booking.checkIn}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{t('dashboard.bookings.fields.checkOut')}</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{booking.checkOut}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{t('dashboard.bookings.fields.guests')}</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{booking.guests}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{t('dashboard.bookings.fields.bookingId')}</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{booking.bookingId}</p>
                      </div>
                    </div>
                  </div>
                  <div className="ml-6 text-right">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{booking.amount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {totalPages > 1 && (
        <Card>
          <CardContent className="px-6 py-4 flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {t('dashboard.bookings.pagination.showing')} {startIndex + 1} {t('dashboard.bookings.pagination.to')} {Math.min(endIndex, bookings.length)} {t('dashboard.bookings.pagination.of')} {bookings.length} {t('dashboard.bookings.pagination.results')}
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                variant="outline"
              >
                {t('dashboard.bookings.pagination.previous')}
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="sm"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                variant="outline"
              >
                {t('dashboard.bookings.pagination.next')}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

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
