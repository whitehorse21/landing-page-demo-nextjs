'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlogPostImage from '@/components/BlogPostImage'
import BlogDetail from '@/components/BlogDetail'
import { useLanguage } from '@/contexts/LanguageContext'
import blogPostsData from '@/data/blogPosts.json'

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

const BlogContent = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const { t } = useLanguage()

  // Import blog posts from JSON file
  const allPosts: BlogPost[] = blogPostsData as BlogPost[]
  const itemsPerPage = 6

  // Get page from URL params, default to 1
  const pageParam = searchParams.get('page')
  const parsedPage = parseInt(pageParam || '1', 10)
  const totalPages = Math.ceil(allPosts.length / itemsPerPage)
  const currentPage = isNaN(parsedPage) || parsedPage < 1 ? 1 : Math.min(parsedPage, totalPages)

  // Calculate pagination
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPosts = allPosts.slice(startIndex, endIndex)

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post)
    setIsDetailOpen(true)
  }

  const handleCloseDetail = () => {
    setIsDetailOpen(false)
    setTimeout(() => setSelectedPost(null), 300)
  }

  const handlePageChange = (page: number) => {
    router.push(`/blog?page=${page}`)
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <div className="pt-16 pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 pt-8">
              <p className="text-sm text-primary dark:text-emerald-400 font-semibold uppercase tracking-wide mb-2">
                Blog
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                {t('blog.title')}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {t('blog.description')}
              </p>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
              {currentPosts.map((post) => (
                <article
                  key={post.title}
                  onClick={() => handlePostClick(post)}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 cursor-pointer"
                >
                  <div className="relative">
                    <BlogPostImage
                      category={post.category}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary dark:bg-emerald-500 text-white shadow">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <span>{post.dateLabel}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 2 && (
                        <span className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                          +{post.tags.length - 2}
                        </span>
                      )}
                    </div>

                    <div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          handlePostClick(post)
                        }}
                        className="text-sm font-semibold text-primary dark:text-emerald-400 hover:text-primary-dark dark:hover:text-emerald-500 transition-colors"
                      >
                        {t('blog.readMore')} →
                      </button>
                    </div>
                  </div>

                  {/* Decorative Element */}
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 dark:from-emerald-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {startIndex + 1} to {Math.min(endIndex, allPosts.length)} of {allPosts.length} posts
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      currentPage === 1
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    Previous
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
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
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      currentPage === totalPages
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Blog Detail Panel */}
      <BlogDetail post={selectedPost} isOpen={isDetailOpen} onClose={handleCloseDetail} />
    </>
  )
}

const BlogPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <Suspense fallback={
        <div className="pt-16 pb-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading blog posts...</p>
              </div>
            </div>
          </div>
        </div>
      }>
        <BlogContent />
      </Suspense>
      <Footer />
    </main>
  )
}

export default BlogPage
