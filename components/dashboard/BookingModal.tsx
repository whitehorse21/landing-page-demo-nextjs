'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface City {
  id: number
  name: string
  country: string
  image: string
  price: string
  rating: number
}

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  city: City | null
}

const BookingModal = ({ isOpen, onClose, city }: BookingModalProps) => {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('credit')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const { t } = useLanguage()

  const cityPhotos: Record<number, string[]> = {
    1: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    2: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
  }

  const photos = city ? cityPhotos[city.id] || [city.image] : []

  useEffect(() => {
    if (isOpen && city) {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const checkOutDate = new Date(tomorrow)
      checkOutDate.setDate(checkOutDate.getDate() + 3)
      
      setCheckIn(tomorrow.toISOString().split('T')[0])
      setCheckOut(checkOutDate.toISOString().split('T')[0])
      setGuests(1)
      setPaymentMethod('credit')
      setSelectedImageIndex(0)
    }
  }, [isOpen, city])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    alert(t('dashboard.booking.modal.success'))
    onClose()
  }

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const calculateTotal = () => {
    if (!city) return 0
    const basePrice = parseInt(city.price.replace(/[^0-9]/g, ''))
    const nights = calculateNights()
    return basePrice * nights * guests
  }

  if (!city) return null

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
              src={photos[selectedImageIndex] || city.image}
              alt={`${city.name} ${selectedImageIndex + 1}`}
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
            <DialogTitle className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{city.name}</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400 mt-1">{city.country}</DialogDescription>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">⭐ {city.rating}</span>
              <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{city.price} {t('dashboard.browseCities.perNight')}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="check-in">{t('dashboard.booking.modal.checkIn')}</Label>
                <Input
                  id="check-in"
                  type="date"
                  value={checkIn}
                  onChange={(e) => {
                    setCheckIn(e.target.value)
                    if (checkOut && e.target.value >= checkOut) {
                      const newCheckOut = new Date(e.target.value)
                      newCheckOut.setDate(newCheckOut.getDate() + 1)
                      setCheckOut(newCheckOut.toISOString().split('T')[0])
                    }
                  }}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="check-out">{t('dashboard.booking.modal.checkOut')}</Label>
                <Input
                  id="check-out"
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn || new Date().toISOString().split('T')[0]}
                  required
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label>{t('dashboard.booking.modal.guests')}</Label>
              <div className="flex items-center gap-4 mt-2">
                <Button type="button" variant="outline" onClick={() => setGuests(Math.max(1, guests - 1))}>-</Button>
                <span className="text-xl font-semibold text-gray-900 dark:text-white w-12 text-center">{guests}</span>
                <Button type="button" variant="outline" onClick={() => setGuests(guests + 1)}>+</Button>
              </div>
            </div>

            <div>
              <Label className="mb-3">{t('dashboard.booking.modal.paymentMethod')}</Label>
              <div className="space-y-3">
                {[
                  { value: 'credit', labelKey: 'dashboard.booking.modal.creditCard', icon: '💳' },
                  { value: 'debit', labelKey: 'dashboard.booking.modal.debitCard', icon: '💳' },
                  { value: 'paypal', labelKey: 'dashboard.booking.modal.paypal', icon: '🅿️' },
                ].map((method) => (
                  <label
                    key={method.value}
                    className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === method.value
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <input type="radio" name="payment" value={method.value} checked={paymentMethod === method.value} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 text-emerald-500" />
                    <span className="text-xl">{method.icon}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{t(method.labelKey)}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>{city.price} × {calculateNights()} nights</span>
                <span>${(parseInt(city.price.replace(/[^0-9]/g, '')) * calculateNights()).toLocaleString()}</span>
              </div>
              <div className="border-t border-gray-300 dark:border-gray-700 pt-2 mt-2">
                <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                  <span>{t('dashboard.booking.modal.summary.total')}</span>
                  <span className="text-emerald-600 dark:text-emerald-400">${calculateTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>

            <Button type="submit" disabled={isSubmitting || !checkIn || !checkOut} className="w-full" size="lg">
              {isSubmitting ? t('dashboard.booking.modal.summary.processing') : t('dashboard.booking.modal.summary.confirm').replace('{amount}', calculateTotal().toLocaleString())}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default BookingModal
