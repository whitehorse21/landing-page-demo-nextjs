interface ServiceCardImageProps {
  kind: 'tours' | 'hiking' | 'support' | 'planning'
  className?: string
}

const ServiceCardImage = ({ kind, className = '' }: ServiceCardImageProps) => {
  // Real world images from Unsplash matching each service type
  const serviceImages = {
    tours: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=200&fit=crop&q=80', // Guided tours group
    hiking: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=200&fit=crop&q=80', // Mountain hiking
    support: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=200&fit=crop&q=80', // Customer support/help
    planning: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=200&fit=crop&q=80', // Travel planning
  }

  return (
    <img
      src={serviceImages[kind]}
      alt={`${kind} service`}
      className={`${className} object-cover rounded-xl`}
      loading="lazy"
    />
  )
}

export default ServiceCardImage
