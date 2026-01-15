const WorldMapImage = () => {
  return (
    <div className="w-20 h-20">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* World map outline */}
        <g className="animate-fade-in">
          {/* Continents simplified */}
          <path
            d="M20,40 Q30,35 40,40 Q50,45 60,40 Q70,35 80,40 L80,50 Q70,55 60,50 Q50,45 40,50 Q30,55 20,50 Z"
            fill="#dbeafe"
            stroke="#3b82f6"
            strokeWidth="0.5"
          />
          <path
            d="M15,60 Q25,55 35,60 Q45,65 55,60 Q65,55 75,60 L75,70 Q65,75 55,70 Q45,65 35,70 Q25,75 15,70 Z"
            fill="#dbeafe"
            stroke="#3b82f6"
            strokeWidth="0.5"
          />
        </g>

        {/* Pins - animated with zoom */}
        <g className="animate-zoom-in" style={{ animationDelay: '0.2s' }}>
          <circle cx="30" cy="45" r="2" fill="#ef4444" />
          <line x1="30" y1="45" x2="30" y2="50" stroke="#ef4444" strokeWidth="1" />
        </g>
        <g className="animate-zoom-in" style={{ animationDelay: '0.4s' }}>
          <circle cx="50" cy="55" r="2" fill="#10b981" />
          <line x1="50" y1="55" x2="50" y2="60" stroke="#10b981" strokeWidth="1" />
        </g>
        <g className="animate-zoom-in" style={{ animationDelay: '0.6s' }}>
          <circle cx="70" cy="50" r="2" fill="#f59e0b" />
          <line x1="70" y1="50" x2="70" y2="55" stroke="#f59e0b" strokeWidth="1" />
        </g>
        <g className="animate-zoom-in" style={{ animationDelay: '0.8s' }}>
          <circle cx="40" cy="65" r="2" fill="#8b5cf6" />
          <line x1="40" y1="65" x2="40" y2="70" stroke="#8b5cf6" strokeWidth="1" />
        </g>

        {/* Customer avatars - animated with fade */}
        <g className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <circle cx="25" cy="40" r="3" fill="#fbbf24" />
          <circle cx="25" cy="40" r="2" fill="#78350f" />
        </g>
        <g className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <circle cx="45" cy="50" r="3" fill="#60a5fa" />
          <circle cx="45" cy="50" r="2" fill="#1e40af" />
        </g>
        <g className="animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <circle cx="65" cy="45" r="3" fill="#f87171" />
          <circle cx="65" cy="45" r="2" fill="#dc2626" />
        </g>

        {/* Connection lines - animated */}
        <line
          x1="30"
          y1="45"
          x2="25"
          y2="40"
          stroke="#94a3b8"
          strokeWidth="0.5"
          strokeDasharray="2,2"
          className="animate-fade-in"
          style={{ animationDelay: '0.4s' }}
        />
        <line
          x1="50"
          y1="55"
          x2="45"
          y2="50"
          stroke="#94a3b8"
          strokeWidth="0.5"
          strokeDasharray="2,2"
          className="animate-fade-in"
          style={{ animationDelay: '0.6s' }}
        />
        <line
          x1="70"
          y1="50"
          x2="65"
          y2="45"
          stroke="#94a3b8"
          strokeWidth="0.5"
          strokeDasharray="2,2"
          className="animate-fade-in"
          style={{ animationDelay: '0.8s' }}
        />
      </svg>
    </div>
  )
}

export default WorldMapImage
