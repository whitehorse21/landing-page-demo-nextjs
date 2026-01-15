'use client'

import { useState, useMemo, useEffect } from 'react'
import BookingModal from '@/components/dashboard/BookingModal'
import { useLanguage } from '@/contexts/LanguageContext'
import { SkeletonCityCard } from '@/components/dashboard/SkeletonLoader'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface City {
  id: number
  name: string
  country: string
  image: string
  price: string
  rating: number
}

const BrowseCities = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [displayCount, setDisplayCount] = useState(9)
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const cities = [
    { id: 1, name: 'Paris', country: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', price: '$1,200', rating: 4.8 },
    { id: 2, name: 'Tokyo', country: 'Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', price: '$2,100', rating: 4.9 },
    { id: 3, name: 'Barcelona', country: 'Spain', image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', price: '$950', rating: 4.7 },
    { id: 4, name: 'New York', country: 'USA', image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', price: '$1,800', rating: 4.6 },
    { id: 5, name: 'London', country: 'UK', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', price: '$1,400', rating: 4.8 },
    { id: 6, name: 'Dubai', country: 'UAE', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', price: '$1,600', rating: 4.9 },
    { id: 7, name: 'Rome', country: 'Italy', image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', price: '$1,100', rating: 4.7 },
    { id: 8, name: 'Sydney', country: 'Australia', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', price: '$1,500', rating: 4.8 },
    { id: 9, name: 'Amsterdam', country: 'Netherlands', image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', price: '$1,300', rating: 4.6 },
    { id: 10, name: 'Singapore', country: 'Singapore', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', price: '$1,400', rating: 4.9 },
    { id: 11, name: 'Bangkok', country: 'Thailand', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', price: '$800', rating: 4.5 },
    { id: 12, name: 'Istanbul', country: 'Turkey', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', price: '$900', rating: 4.6 },
    { id: 13, name: 'Vienna', country: 'Austria', image: 'https://images.unsplash.com/photo-1516550893923-42d28dfd19a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', price: '$1,200', rating: 4.7 },
    { id: 14, name: 'Prague', country: 'Czech Republic', image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', price: '$850', rating: 4.6 },
    { id: 15, name: 'Berlin', country: 'Germany', image: 'https://images.unsplash.com/photo-1587330979470-3585a3b0eea8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', price: '$1,100', rating: 4.7 },
    { id: 16, name: 'Hong Kong', country: 'Hong Kong', image: 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', price: '$1,500', rating: 4.8 },
    { id: 17, name: 'Bali', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', price: '$700', rating: 4.7 },
    { id: 18, name: 'Santorini', country: 'Greece', image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', price: '$1,200', rating: 4.9 },
    { id: 19, name: 'Marrakech', country: 'Morocco', image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', price: '$750', rating: 4.6 },
  ]

  const filteredCities = useMemo(() => {
    return cities.filter(city =>
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.country.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  const displayedCities = filteredCities.slice(0, displayCount)
  const hasMore = displayCount < filteredCities.length

  useEffect(() => {
    setDisplayCount(9)
  }, [searchQuery])

  const handleLoadMore = () => {
    setDisplayCount(prev => Math.min(prev + 9, filteredCities.length))
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
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <SkeletonCityCard key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('dashboard.browseCities.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {t('dashboard.browseCities.subtitle')}
        </p>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Input
              type="text"
              placeholder={t('dashboard.browseCities.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10"
            />
            <svg
              className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedCities.map((city) => (
          <Card key={city.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
              <img 
                src={city.image} 
                alt={city.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = `https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`
                }}
              />
              <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 px-2 py-1 rounded-full text-sm font-semibold text-gray-900 dark:text-white">
                ⭐ {city.rating}
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{city.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{city.country}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                  {city.price}
                </span>
                <Button
                  onClick={() => {
                    setSelectedCity(city)
                    setIsModalOpen(true)
                  }}
                >
                  {t('dashboard.browseCities.bookNow')}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={handleLoadMore}
            variant="default"
            size="lg"
          >
            {t('dashboard.browseCities.loadMore')} ({filteredCities.length - displayCount} {t('dashboard.browseCities.moreAvailable')})
          </Button>
        </div>
      )}

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedCity(null)
        }}
        city={selectedCity}
      />
    </div>
  )
}

export default BrowseCities
