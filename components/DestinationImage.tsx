interface DestinationImageProps {
  type: 'lake' | 'beach' | 'pier'
  className?: string
}

const DestinationImage = ({ type, className = '' }: DestinationImageProps) => {
  // Real city images from Unsplash matching each destination type
  const cityImages = {
    lake: {
      primary: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      fallback: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    beach: {
      primary: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      fallback: 'https://images.unsplash.com/photo-1502780402662-acc019171b0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    pier: {
      primary: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      fallback: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
  }

  return (
    <img
      src={cityImages[type].primary}
      alt={`${type} destination`}
      className={`${className} object-cover`}
      loading="lazy"
      onError={(e) => {
        e.currentTarget.src = cityImages[type].fallback
      }}
    />
  )
}

export default DestinationImage
