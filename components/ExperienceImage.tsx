const ExperienceImage = () => {
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden shadow-xl">
      <img
        src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=500&fit=crop&q=80"
        alt="Travel experience - happy travelers"
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
    </div>
  )
}

export default ExperienceImage
