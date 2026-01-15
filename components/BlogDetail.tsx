'use client'

import { useEffect } from 'react'
import BlogPostImage from './BlogPostImage'
import { useLanguage } from '@/contexts/LanguageContext'

type BlogCategory = 'Guides' | 'Deals' | 'Stories' | 'Tips'

interface BlogPost {
  title: string
  category: BlogCategory
  excerpt: string
  fullDescription: string
  dateLabel: string
  readTime: string
  tags: string[]
}

interface BlogDetailProps {
  post: BlogPost | null
  isOpen: boolean
  onClose: () => void
}

const BlogDetail = ({ post, isOpen, onClose }: BlogDetailProps) => {
  const { t } = useLanguage()

  // Close on Escape key and manage scrollbar visibility
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll and hide scrollbar when detail is open
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
      document.documentElement.style.overflow = 'hidden'
    } else {
      // Restore scrollbar when detail is closed
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
      document.documentElement.style.overflow = ''
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      // Cleanup: restore scrollbar
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
      document.documentElement.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!post) return null

  return (
    <>
      {/* Backdrop with blur */}
      <div
        className={`fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-md z-[100] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Detail Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-4xl bg-white dark:bg-gray-900 z-[101] shadow-2xl overflow-y-auto ${
          isOpen ? 'blog-detail-enter' : 'blog-detail-exit'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 z-10 p-2 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-lg"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="relative">
          {/* Full Image */}
          <div className="relative w-full h-96 lg:h-[500px]">
            <BlogPostImage
              category={post.category}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary dark:bg-emerald-500 text-white shadow">
                  {post.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                {post.title}
              </h1>
              <div className="flex items-center gap-3 text-sm text-white/90">
                <span>{post.dateLabel}</span>
                <span className="w-1 h-1 rounded-full bg-white/60" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-8 lg:py-12">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Excerpt */}
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 font-medium">
              {post.excerpt}
            </p>

            {/* Full Description */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {post.fullDescription}
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-primary dark:bg-emerald-500 text-white rounded-lg font-semibold hover:bg-primary-dark dark:hover:bg-emerald-600 transition-all duration-300 shadow-lg hover:scale-105"
              >
                ← {t('blog.backToBlog') || 'Back to Blog'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogDetail
