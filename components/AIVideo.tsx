'use client'

import { useState, useRef, useEffect } from 'react'

interface AIVideoProps {
    videoSrc?: string
    posterSrc?: string
    className?: string
}

const AIVideo = ({
    videoSrc = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    posterSrc = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop&q=80',
    className = ''
}: AIVideoProps) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [hasError, setHasError] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        const video = videoRef.current
        if (video) {
            const handleCanPlay = () => {
                setIsLoaded(true)
                setHasError(false)
            }
            const handleError = () => {
                setHasError(true)
                setIsLoaded(false)
            }

            video.addEventListener('canplay', handleCanPlay)
            video.addEventListener('error', handleError)

            // Try to load the video
            video.load()

            return () => {
                video.removeEventListener('canplay', handleCanPlay)
                video.removeEventListener('error', handleError)
            }
        }
    }, [videoSrc])

    return (
        <div className={`relative w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden shadow-2xl animate-zoom-in ${className}`}>
            {/* Video Element */}
            {!hasError && (
                <video
                    ref={videoRef}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    poster={posterSrc}
                >
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}

            {/* Fallback Image */}
            {(hasError || !isLoaded) && (
                <img
                    src={posterSrc}
                    alt="Travel adventure - exploring the world"
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            )}

            {/* Gradient Overlay - positioned to not cover video controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>

            {/* Loading Indicator */}
            {!isLoaded && !hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Loading video...</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AIVideo
