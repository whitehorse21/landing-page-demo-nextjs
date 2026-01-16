'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { SkeletonStatCard, SkeletonChart, SkeletonCard } from '@/components/dashboard/SkeletonLoader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

type BlockType = 'bookings' | 'reviews' | 'messages' | 'news'

const Dashboard = () => {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const [draggedBlock, setDraggedBlock] = useState<BlockType | null>(null)
  const [dragOverBlock, setDragOverBlock] = useState<BlockType | null>(null)
  const [blockOrder, setBlockOrder] = useState<BlockType[]>(['bookings', 'reviews', 'messages', 'news'])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Load block order from localStorage
  useEffect(() => {
    const savedOrder = localStorage.getItem('dashboardBlockOrder')
    if (savedOrder) {
      try {
        const parsed = JSON.parse(savedOrder)
        if (Array.isArray(parsed) && parsed.length === 4) {
          setBlockOrder(parsed)
        }
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, [])

  // Save block order to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('dashboardBlockOrder', JSON.stringify(blockOrder))
    }
  }, [blockOrder, isLoading])

  const handleDragStart = (e: React.DragEvent, blockType: BlockType) => {
    setDraggedBlock(blockType)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', blockType)
    
    // Create a custom drag image with better styling
    const cardElement = e.currentTarget as HTMLElement
    const dragImage = cardElement.cloneNode(true) as HTMLElement
    
    // Style the drag image
    dragImage.style.width = `${cardElement.offsetWidth}px`
    dragImage.style.opacity = '0.9'
    dragImage.style.transform = 'rotate(2deg) scale(0.95)'
    dragImage.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(16, 185, 129, 0.3)'
    dragImage.style.borderRadius = '8px'
    dragImage.style.position = 'absolute'
    dragImage.style.top = '-9999px'
    dragImage.style.left = '-9999px'
    dragImage.style.pointerEvents = 'none'
    dragImage.style.zIndex = '9999'
    
    document.body.appendChild(dragImage)
    
    // Set drag image offset to center of the card
    const rect = cardElement.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const offsetY = e.clientY - rect.top
    
    e.dataTransfer.setDragImage(dragImage, offsetX, offsetY)
    
    // Remove the temporary element after drag starts
    setTimeout(() => {
      if (document.body.contains(dragImage)) {
        document.body.removeChild(dragImage)
      }
    }, 0)
  }

  const handleDragEnd = (e: React.DragEvent) => {
    setDraggedBlock(null)
    setDragOverBlock(null)
  }

  const handleDragEnter = (e: React.DragEvent, targetBlockType: BlockType) => {
    e.preventDefault()
    if (draggedBlock && draggedBlock !== targetBlockType) {
      setDragOverBlock(targetBlockType)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    // Only clear if we're actually leaving the drop zone
    const relatedTarget = e.relatedTarget as HTMLElement
    if (!e.currentTarget.contains(relatedTarget)) {
      setDragOverBlock(null)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, targetBlockType: BlockType) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!draggedBlock || draggedBlock === targetBlockType) {
      setDraggedBlock(null)
      setDragOverBlock(null)
      return
    }

    const newOrder = [...blockOrder]
    const draggedIndex = newOrder.indexOf(draggedBlock)
    const targetIndex = newOrder.indexOf(targetBlockType)

    // Remove dragged block from its position
    newOrder.splice(draggedIndex, 1)
    // Insert at target position
    newOrder.splice(targetIndex, 0, draggedBlock)

    setBlockOrder(newOrder)
    setDraggedBlock(null)
    setDragOverBlock(null)
  }

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
    { id: 4, destination: 'Rome, Italy', date: '2026-05-01', status: 'Confirmed', amount: '$1,350' },
    { id: 5, destination: 'Dubai, UAE', date: '2026-05-15', status: 'Pending', amount: '$2,500' },
  ]

  const recentMessages = [
    { 
      id: 1, 
      name: 'Travel Support', 
      message: 'Your booking has been confirmed!', 
      time: '2 hours ago', 
      unread: 2, 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Support' 
    },
    { 
      id: 2, 
      name: 'Paris Hotel', 
      message: 'Welcome! Your check-in instructions have been sent.', 
      time: '1 day ago', 
      unread: 0, 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hotel' 
    },
    { 
      id: 3, 
      name: 'Flight Updates', 
      message: 'Your flight is on time. Have a great trip!', 
      time: '2 days ago', 
      unread: 0, 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Flight' 
    },
    { 
      id: 4, 
      name: 'Customer Service', 
      message: 'Thank you for your feedback. We appreciate your review!', 
      time: '3 days ago', 
      unread: 0, 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Service' 
    },
    { 
      id: 5, 
      name: 'Booking Team', 
      message: 'Your payment has been processed successfully.', 
      time: '4 days ago', 
      unread: 0, 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Booking' 
    },
  ]

  const recentNewsItems = [
    { 
      id: 1, 
      title: 'New Destinations Added: Explore Hidden Gems in Southeast Asia', 
      description: 'Discover breathtaking locations in Thailand, Vietnam, and Indonesia. Book now and get 20% off your first booking!', 
      date: '2 days ago',
      category: 'Travel Updates',
      icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      iconColor: 'text-blue-600 dark:text-blue-400',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30'
    },
    { 
      id: 2, 
      title: 'Summer Travel Deals: Save Up to 40% on European Destinations', 
      description: 'Plan your perfect summer getaway. Special offers on Paris, Rome, Barcelona, and more popular European cities.', 
      date: '4 days ago',
      category: 'Deals & Offers',
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/30'
    },
    { 
      id: 3, 
      title: 'Travel Safety Guidelines Updated for 2026', 
      description: 'Stay informed about the latest travel safety protocols and requirements for international destinations.', 
      date: '1 week ago',
      category: 'Safety & Guidelines',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      iconColor: 'text-green-600 dark:text-green-400',
      iconBg: 'bg-green-100 dark:bg-green-900/30'
    },
    { 
      id: 4, 
      title: 'New Mobile App Features: Enhanced Booking Experience', 
      description: 'Download our updated mobile app to enjoy faster bookings, real-time updates, and exclusive mobile-only deals.', 
      date: '2 weeks ago',
      category: 'App Updates',
      icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
      iconColor: 'text-purple-600 dark:text-purple-400',
      iconBg: 'bg-purple-100 dark:bg-purple-900/30'
    },
    { 
      id: 5, 
      title: 'Loyalty Program Launch: Earn Points on Every Booking', 
      description: 'Join our new loyalty program and earn points with every booking. Redeem points for discounts and exclusive perks!', 
      date: '3 weeks ago',
      category: 'Program Updates',
      icon: 'M12 8v13m0-13V6a2 2 0 112 2v2m0 0v5m0 5v2m0-2a2 2 0 104 0m-4-8a2 2 0 11-2 2 2 2 0 012-2z',
      iconColor: 'text-orange-600 dark:text-orange-400',
      iconBg: 'bg-orange-100 dark:bg-orange-900/30'
    },
  ]

  const recentReviews = [
    { 
      id: 1, 
      destination: 'Sydney, Australia', 
      rating: 5, 
      comment: 'Absolutely fantastic! The views were breathtaking and the staff went above and beyond to make our stay memorable. Highly recommend!', 
      date: '2025-07-20',
      bookingId: 'BK-2025-009',
      checkIn: '2025-07-10',
      checkOut: '2025-07-17',
      guests: 3,
      amount: '$2,300'
    },
    { 
      id: 2, 
      destination: 'London, UK', 
      rating: 5, 
      comment: 'Amazing experience! The location was perfect and the service was excellent. Would definitely book again.', 
      date: '2025-11-12',
      bookingId: 'BK-2025-006',
      checkIn: '2025-11-05',
      checkOut: '2025-11-10',
      guests: 1,
      amount: '$1,400'
    },
    { 
      id: 3, 
      destination: 'New York, USA', 
      rating: 4, 
      comment: 'Great stay overall. The room was clean and comfortable. The only minor issue was the noise from the street, but it was manageable.', 
      date: '2025-09-30',
      bookingId: 'BK-2025-007',
      checkIn: '2025-09-20',
      checkOut: '2025-09-27',
      guests: 2,
      amount: '$1,800'
    },
    { 
      id: 4, 
      destination: 'Berlin, Germany', 
      rating: 5, 
      comment: 'Perfect stay! Everything exceeded our expectations. The room was spacious, modern, and the location was ideal for sightseeing.', 
      date: '2025-02-15',
      bookingId: 'BK-2025-014',
      checkIn: '2025-02-05',
      checkOut: '2025-02-12',
      guests: 2,
      amount: '$1,100'
    },
  ]

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${star <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

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

        {/* Recent Bookings & Reviews Skeleton */}
        <SkeletonCard />
        
        {/* Recent Messages Skeleton */}
        <SkeletonCard />
        
        {/* Recent News Skeleton */}
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
                  <p className="text-lg text-gray-600 dark:text-gray-400">{t(stat.labelKey)}</p>
                  <p className="text-4xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                  <p className="text-base text-emerald-600 dark:text-emerald-400 mt-1">
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

      {/* Recent Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {blockOrder.map((blockType) => {
          const isDragging = draggedBlock === blockType
          const isDragOver = dragOverBlock === blockType && !isDragging
          
          if (blockType === 'bookings') {
            return (
              <Card
                key="bookings"
                draggable
                onDragStart={(e) => handleDragStart(e, 'bookings')}
                onDragEnd={handleDragEnd}
                onDragEnter={(e) => handleDragEnter(e, 'bookings')}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'bookings')}
                className={`transition-all duration-200 ${
                  isDragging 
                    ? 'opacity-40 scale-95 cursor-grabbing shadow-2xl' 
                    : isDragOver
                    ? 'ring-2 ring-emerald-500 ring-offset-2 scale-[1.02] bg-emerald-50/50 dark:bg-emerald-900/10'
                    : 'opacity-100 cursor-grab hover:shadow-lg'
                }`}
              >
                <CardHeader className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 opacity-0 transition-opacity" 
                       style={{ opacity: isDragOver ? 1 : 0 }} />
                  <CardTitle className="flex items-center justify-between group">
                    <span className="flex items-center gap-2">
                      <svg 
                        className={`w-5 h-5 text-gray-400 transition-colors ${isDragging ? 'text-emerald-500' : 'group-hover:text-emerald-600'}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                      {t('dashboard.dashboard.recentBookings')}
                    </span>
                    {isDragOver && (
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium animate-pulse">
                        Drop here
                      </span>
                    )}
                  </CardTitle>
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
            )
          }

          if (blockType === 'reviews') {
            return (
              <Card
                key="reviews"
                draggable
                onDragStart={(e) => handleDragStart(e, 'reviews')}
                onDragEnd={handleDragEnd}
                onDragEnter={(e) => handleDragEnter(e, 'reviews')}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'reviews')}
                className={`transition-all duration-200 ${
                  isDragging 
                    ? 'opacity-40 scale-95 cursor-grabbing shadow-2xl' 
                    : isDragOver
                    ? 'ring-2 ring-emerald-500 ring-offset-2 scale-[1.02] bg-emerald-50/50 dark:bg-emerald-900/10'
                    : 'opacity-100 cursor-grab hover:shadow-lg'
                }`}
              >
                <CardHeader className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 opacity-0 transition-opacity" 
                       style={{ opacity: isDragOver ? 1 : 0 }} />
                  <CardTitle className="flex items-center justify-between group">
                    <span className="flex items-center gap-2">
                      <svg 
                        className={`w-5 h-5 text-gray-400 transition-colors ${isDragging ? 'text-emerald-500' : 'group-hover:text-emerald-600'}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                      {t('dashboard.dashboard.recentReviews')}
                    </span>
                    {isDragOver && (
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium animate-pulse">
                        Drop here
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentReviews.map((review) => (
                      <div
                        key={review.id}
                        className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{review.destination}</h3>
                            <div className="flex items-center gap-2 mb-2">
                              {renderStars(review.rating)}
                            </div>
                            {/* Booking Info */}
                            <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                                <div>
                                  <span className="font-medium">{t('dashboard.bookings.fields.bookingId')}:</span> {review.bookingId}
                                </div>
                                <div>
                                  <span className="font-medium">{t('dashboard.bookings.fields.checkIn')}:</span> {new Date(review.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </div>
                                <div>
                                  <span className="font-medium">{t('dashboard.bookings.fields.checkOut')}:</span> {new Date(review.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </div>
                                <div>
                                  <span className="font-medium">{t('dashboard.bookings.fields.guests')}:</span> {review.guests} {review.guests === 1 ? 'guest' : 'guests'}
                                </div>
                              </div>
                              <div className="mt-2 text-sm">
                                <span className="font-medium text-gray-700 dark:text-gray-300">{t('dashboard.bookings.details.totalAmount')}:</span>
                                <span className="ml-2 font-semibold text-emerald-600 dark:text-emerald-400">{review.amount}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 ml-4 whitespace-nowrap">
                            {t('dashboard.dashboard.reviewedOn')} {new Date(review.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 line-clamp-2">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          }

          if (blockType === 'messages') {
            return (
              <Card
                key="messages"
                draggable
                onDragStart={(e) => handleDragStart(e, 'messages')}
                onDragEnd={handleDragEnd}
                onDragEnter={(e) => handleDragEnter(e, 'messages')}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'messages')}
                className={`transition-all duration-200 ${
                  isDragging 
                    ? 'opacity-40 scale-95 cursor-grabbing shadow-2xl' 
                    : isDragOver
                    ? 'ring-2 ring-emerald-500 ring-offset-2 scale-[1.02] bg-emerald-50/50 dark:bg-emerald-900/10'
                    : 'opacity-100 cursor-grab hover:shadow-lg'
                }`}
              >
                <CardHeader className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 opacity-0 transition-opacity" 
                       style={{ opacity: isDragOver ? 1 : 0 }} />
                  <CardTitle className="flex items-center justify-between group">
                    <span className="flex items-center gap-2">
                      <svg 
                        className={`w-5 h-5 text-gray-400 transition-colors ${isDragging ? 'text-emerald-500' : 'group-hover:text-emerald-600'}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                      {t('dashboard.dashboard.recentMessages')}
                    </span>
                    {isDragOver && (
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium animate-pulse">
                        Drop here
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentMessages.map((chat) => (
                      <div
                        key={chat.id}
                        className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                      >
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={chat.avatar} alt={chat.name} />
                          <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white truncate">{chat.name}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 ml-2 whitespace-nowrap">{chat.time}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{chat.message}</p>
                            {chat.unread > 0 && (
                              <Badge className="ml-2 bg-emerald-500 text-white">
                                {chat.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          }

          if (blockType === 'news') {
            return (
              <Card
                key="news"
                draggable
                onDragStart={(e) => handleDragStart(e, 'news')}
                onDragEnd={handleDragEnd}
                onDragEnter={(e) => handleDragEnter(e, 'news')}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'news')}
                className={`transition-all duration-200 ${
                  isDragging 
                    ? 'opacity-40 scale-95 cursor-grabbing shadow-2xl' 
                    : isDragOver
                    ? 'ring-2 ring-emerald-500 ring-offset-2 scale-[1.02] bg-emerald-50/50 dark:bg-emerald-900/10'
                    : 'opacity-100 cursor-grab hover:shadow-lg'
                }`}
              >
                <CardHeader className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 opacity-0 transition-opacity" 
                       style={{ opacity: isDragOver ? 1 : 0 }} />
                  <CardTitle className="flex items-center justify-between group">
                    <span className="flex items-center gap-2">
                      <svg 
                        className={`w-5 h-5 text-gray-400 transition-colors ${isDragging ? 'text-emerald-500' : 'group-hover:text-emerald-600'}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                      {t('dashboard.dashboard.recentNews')}
                    </span>
                    {isDragOver && (
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium animate-pulse">
                        Drop here
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentNewsItems.map((news) => (
                      <div
                        key={news.id}
                        className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                      >
                        <div className={`flex-shrink-0 p-3 rounded-lg ${news.iconBg}`}>
                          <svg className={`w-6 h-6 ${news.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={news.icon} />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{news.category}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">•</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{news.date}</span>
                          </div>
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{news.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{news.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          }

          return null
        })}
      </div>
    </div>
  )
}

export default Dashboard
