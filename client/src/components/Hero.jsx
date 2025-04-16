import React, { useState, useEffect } from 'react';
import { ChevronDown, Clock } from 'lucide-react';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background video with fine watch movement */}
      <div className="absolute inset-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/bgVideo.mp4" type="video/mp4" />
        </video>
        <img 
          src="https://images.unsplash.com/photo-1557531365-e8b22d93dbd0?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Luxury timepiece craftsmanship"
          className="w-full h-full object-cover"
        />
        
        {/* Cinematic dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
        
        {/* Subtle watch dial pattern overlay */}
        <div className="absolute inset-0 opacity-5 mix-blend-overlay">
          <div className="h-full w-full" style={{ 
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', 
            backgroundSize: '30px 30px' 
          }}></div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* Watch hand */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-64 bg-amber-400/20 rotate-45 origin-bottom"></div>
        
        {/* Hour markers */}
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className="absolute top-1/2 left-1/2 w-1 h-4 bg-amber-400/30"
            style={{ 
              transform: `rotate(${i * 30}deg) translateY(-40vh) translateX(-50%)`,
            }}
          ></div>
        ))}
        
        {/* Circular accent */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-amber-400/10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-amber-400/5"></div>
      </div>
      
      {/* Content */}
      <div className="relative container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
        <div className={`max-w-3xl text-white transform transition-all duration-1000 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Top decorative element */}
          <div className="mb-8 flex justify-center">
            <div className="h-px w-20 bg-gradient-to-r from-amber-400/0 via-amber-400 to-amber-400/0"></div>
          </div>
          
          {/* Subtitle */}
          <div className="text-sm text-amber-400 uppercase tracking-widest mb-6">The Pinnacle of Horology</div>
          
          {/* Main title */}
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
            <span className="block">Masterpieces</span>
            <span className="block text-amber-400">of Time</span>
          </h1>
          
          {/* Description */}
          <p className="text-xl mb-10 font-light leading-relaxed max-w-2xl mx-auto">
            Exquisite timepieces crafted with unparalleled precision and artistry, celebrating the legacy of horological excellence since 1884.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-8">
            <button className="group bg-transparent border border-amber-400 text-amber-400 px-10 py-4 text-sm uppercase tracking-widest font-light hover:bg-amber-400 hover:text-black transition-all duration-300">
              Discover Collection
            </button>
            
            <button className="text-white/70 hover:text-amber-400 transition-colors duration-300 text-sm uppercase tracking-widest font-light flex items-center group">
              <span className="mr-2">Book Consultation</span>
              <div className="h-px w-8 bg-white/30 group-hover:bg-amber-400 transition-colors duration-300"></div>
            </button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <button 
          onClick={scrollToProducts}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/70 hover:text-amber-400 transition-colors duration-300 animate-pulse group"
        >
          <span className="text-xs uppercase tracking-widest mb-4">Explore Collection</span>
          <ChevronDown className="h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
        </button>
      </div>
      
      {/* Signature watch details */}
      <div className="absolute bottom-12 right-12 flex items-center">
        <div className="text-right mr-4">
          <div className="text-amber-400 text-xs uppercase tracking-widest">Limited Edition</div>
          <div className="text-white/80 font-serif">Chronograph Tourbillon</div>
        </div>
        <div className="h-16 w-16 rounded-full border border-amber-400/30 flex items-center justify-center">
          <Clock className="h-8 w-8 text-amber-400/70" />
        </div>
      </div>
    </section>
  );
}