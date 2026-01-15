interface BlogPostImageProps {
  category: 'Guides' | 'Deals' | 'Stories' | 'Tips'
  className?: string
}

const BlogPostImage = ({ category, className = '' }: BlogPostImageProps) => {
  // Real city images from Unsplash matching each category
  const cityImages = {
    Guides: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=450&fit=crop&q=80', // Tokyo, Japan - for Japan itinerary guide
    Deals: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=450&fit=crop&q=80', // New York City skyline - for booking deals
    Stories: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=450&fit=crop&q=80', // Paris, France - for travel stories
    Tips: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&h=450&fit=crop&q=80', // Barcelona, Spain - for travel tips
  }

  return (
    <img
      src={cityImages[category]}
      alt={`${category} blog post cover`}
      className={`${className} object-cover`}
      loading="lazy"
    />
  )
}

export default BlogPostImage
