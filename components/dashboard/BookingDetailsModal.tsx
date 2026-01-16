'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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

interface BookingDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  booking: Booking | null
}

const BookingDetailsModal = ({ isOpen, onClose, booking }: BookingDetailsModalProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [bookingWithReview, setBookingWithReview] = useState<Booking | null>(null)
  const { t } = useLanguage()

  // Define currentBooking early so it can be used throughout the component
  const currentBooking = bookingWithReview || booking

  const getCityId = (destination: string): number => {
    const cityMap: Record<string, number> = {
      'Paris, France': 1,
      'Tokyo, Japan': 2,
      'Barcelona, Spain': 3,
      'New York, USA': 4,
      'London, UK': 5,
      'Dubai, UAE': 6,
      'Singapore': 2,
      'Sydney, Australia': 1,
      'Bangkok, Thailand': 2,
      'Istanbul, Turkey': 1,
      'Vienna, Austria': 1,
      'Prague, Czech Republic': 1,
      'Berlin, Germany': 1,
      'Amsterdam, Netherlands': 3,
      'Rome, Italy': 1,
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
    if (isOpen && booking) {
      setSelectedImageIndex(0)
      setBookingWithReview(booking)
      setShowReviewForm(false)
      setRating(0)
      setComment('')
    }
  }, [isOpen, booking])

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
    if (!currentBooking) return 0
    const start = new Date(currentBooking.checkIn)
    const end = new Date(currentBooking.checkOut)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const handleSubmitReview = async () => {
    if (!rating || !comment.trim()) return
    
    setIsSubmittingReview(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newReview: Review = {
      rating,
      comment: comment.trim(),
      date: new Date().toISOString().split('T')[0]
    }
    
    if (bookingWithReview) {
      setBookingWithReview({ ...bookingWithReview, review: newReview })
    }
    
    setIsSubmittingReview(false)
    setShowReviewForm(false)
    setRating(0)
    setComment('')
  }

  const renderStars = (rating: number, interactive: boolean = false, onStarClick?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onStarClick && onStarClick(star)}
            disabled={!interactive}
            className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'} ${star <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
      </div>
    )
  }

  if (!booking || !currentBooking) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      // Only close when explicitly set to false (via close button), not on outside click
      if (!open) {
        onClose()
      }
    }}>
      <DialogContent 
        className="max-w-5xl max-h-[90vh] overflow-y-auto p-0"
        onInteractOutside={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <div className="p-6 bg-gray-100 dark:bg-gray-900">
          <div className="relative h-96 rounded-lg overflow-hidden mb-4 bg-gray-200 dark:bg-gray-800">
            <img
              src={photos[selectedImageIndex] || photos[0] || 'https://via.placeholder.com/800x600'}
              alt={currentBooking.destination}
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
              <DialogTitle className="text-3xl font-bold text-gray-900 dark:text-white">{currentBooking.destination}</DialogTitle>
              <Badge
                variant={currentBooking.status === 'Confirmed' ? 'default' : 'secondary'}
                className={
                  currentBooking.status === 'Confirmed'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                    : currentBooking.status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    : ''
                }
              >
                {currentBooking.status === 'Confirmed' 
                  ? t('dashboard.bookings.status.confirmed')
                  : currentBooking.status === 'Pending'
                  ? t('dashboard.bookings.status.pending')
                  : t('dashboard.bookings.status.completed')}
              </Badge>
            </div>
            <DialogDescription className="text-gray-600 dark:text-gray-400">{t('dashboard.bookings.fields.bookingId')}: {currentBooking.bookingId}</DialogDescription>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('dashboard.bookings.fields.checkIn')}</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {new Date(currentBooking.checkIn).toLocaleDateString('en-US', {
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
                  {new Date(currentBooking.checkOut).toLocaleDateString('en-US', {
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
                  {currentBooking.guests} {currentBooking.guests === 1 ? 'guest' : 'guests'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('dashboard.bookings.details.priceSummary')}</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>{t('dashboard.bookings.details.totalAmount')}</span>
                <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{currentBooking.amount}</span>
              </div>
            </div>
          </div>

          {/* Review Section */}
          {currentBooking.status === 'Completed' && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              {currentBooking.review ? (
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('dashboard.bookings.review.yourReview')}</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {t('dashboard.bookings.review.postedOn')} {new Date(currentBooking.review.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="mb-4">
                    {renderStars(currentBooking.review.rating)}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{currentBooking.review.comment}</p>
                </div>
              ) : showReviewForm ? (
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('dashboard.bookings.review.title')}</h3>
                  <div>
                    <Label className="mb-2 block">{t('dashboard.bookings.review.rating')}</Label>
                    {renderStars(rating, true, setRating)}
                  </div>
                  <div>
                    <Label htmlFor="review-comment" className="mb-2 block">{t('dashboard.bookings.review.comment')}</Label>
                    <textarea
                      id="review-comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder={t('dashboard.bookings.review.commentPlaceholder')}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button
                      onClick={handleSubmitReview}
                      disabled={!rating || !comment.trim() || isSubmittingReview}
                      className="flex-1"
                    >
                      {isSubmittingReview ? t('dashboard.bookings.review.submitting') : t('dashboard.bookings.review.submit')}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowReviewForm(false)
                        setRating(0)
                        setComment('')
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-4">
                  <Button onClick={() => setShowReviewForm(true)} className="flex-1">
                    {t('dashboard.bookings.review.title')}
                  </Button>
                </div>
              )}
            </div>
          )}

          {currentBooking.status === 'Confirmed' && (
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
