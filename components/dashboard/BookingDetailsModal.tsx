'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

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

interface BookingDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  booking: Booking | null
}

const BookingDetailsModal = ({ isOpen, onClose, booking }: BookingDetailsModalProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const { t } = useLanguage()

  const getCityId = (destination: string): number => {
    const cityMap: Record<string, number> = {
      'Paris, France': 1,
      'Tokyo, Japan': 2,
      'Barcelona, Spain': 3,
      'New York, USA': 4,
      'London, UK': 5,
      'Dubai, UAE': 6,
    }
    return cityMap[destination] || 1
  }

  const cityPhotos: Record<number, string[]> = {
    1: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    2: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
  }

  const cityId = booking ? getCityId(booking.destination) : 1
  const photos = cityPhotos[cityId] || []

  useEffect(() => {
    if (isOpen) {
      setSelectedImageIndex(0)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const calculateNights = () => {
    if (!booking) return 0
    const start = new Date(booking.checkIn)
    const end = new Date(booking.checkOut)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  if (!booking) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0">
        <div className="p-6 bg-gray-100 dark:bg-gray-900">
          <div className="relative h-96 rounded-lg overflow-hidden mb-4 bg-gray-200 dark:bg-gray-800">
            <img
              src={photos[selectedImageIndex] || photos[0] || 'https://via.placeholder.com/800x600'}
              alt={booking.destination}
              className="w-full h-full object-cover"
            />
            {photos.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImageIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-lg"
                >
                  <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setSelectedImageIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-lg"
                >
                  <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
          {photos.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {photos.map((photo, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index
                      ? 'border-emerald-500 ring-2 ring-emerald-200 dark:ring-emerald-800'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <img src={photo} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 space-y-6">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <DialogTitle className="text-3xl font-bold text-gray-900 dark:text-white">{booking.destination}</DialogTitle>
              <Badge
                variant={booking.status === 'Confirmed' ? 'default' : 'secondary'}
                className={
                  booking.status === 'Confirmed'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                    : booking.status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    : ''
                }
              >
                {booking.status === 'Confirmed' 
                  ? t('dashboard.bookings.status.confirmed')
                  : booking.status === 'Pending'
                  ? t('dashboard.bookings.status.pending')
                  : t('dashboard.bookings.status.completed')}
              </Badge>
            </div>
            <DialogDescription className="text-gray-600 dark:text-gray-400">{t('dashboard.bookings.fields.bookingId')}: {booking.bookingId}</DialogDescription>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('dashboard.bookings.fields.checkIn')}</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {new Date(booking.checkIn).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('dashboard.bookings.fields.checkOut')}</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {new Date(booking.checkOut).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('dashboard.bookings.details.duration')}</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {calculateNights()} {calculateNights() === 1 ? 'night' : 'nights'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('dashboard.bookings.fields.guests')}</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('dashboard.bookings.details.priceSummary')}</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>{t('dashboard.bookings.details.totalAmount')}</span>
                <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{booking.amount}</span>
              </div>
            </div>
          </div>

          {booking.status === 'Confirmed' && (
            <div className="flex gap-4">
              <Button className="flex-1">
                {t('dashboard.bookings.details.actions.downloadReceipt')}
              </Button>
              <Button variant="destructive" className="flex-1">
                {t('dashboard.bookings.details.actions.cancelBooking')}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default BookingDetailsModal
