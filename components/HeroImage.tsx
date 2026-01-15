const HeroImage = () => {
  return (
    <div className="relative w-full h-[540px] rounded-2xl overflow-hidden shadow-2xl animate-zoom-in">
      <img
        src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop&q=80"
        alt="Travel adventure - exploring the world"
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
    </div>
  )
}

export default HeroImage
