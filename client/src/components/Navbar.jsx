import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingBag, Clock, Watch, Crown, ChevronDown } from 'lucide-react';

export default function Navbar() {
    const scrolled = true; // Placeholder for scroll state, replace with actual scroll detection logic
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const isScrolled = window.scrollY > window.innerHeight - 100;
//       if (isScrolled !== scrolled) {
//         setScrolled(isScrolled);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [scrolled]);

//   const scrollToProducts = () => {
//     const productsSection = document.getElementById('products-section');
//     productsSection?.scrollIntoView({ behavior: 'smooth' });
//   };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-700 ${scrolled ? 'bg-black/95 py-4' : 'bg-transparent py-6'}`}>
      {/* Gold trim at top */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
      
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between">
          {/* Logo - centered when not scrolled, left-aligned when scrolled */}
          <div className={`transition-all duration-700 flex items-center ${scrolled ? 'mr-0' : 'mx-auto'}`}>
            <div className="relative group">
              <Clock className={`transition-all duration-700 ${scrolled ? 'h-8 w-8' : 'h-10 w-10'} text-amber-400`} />
              <div className="absolute -inset-1 bg-amber-400/20 rounded-full blur-sm group-hover:bg-amber-400/30 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
            </div>
            <div className={`transition-all duration-700 ${scrolled ? 'ml-3' : 'ml-4'}`}>
              <h1 className={`font-serif tracking-wider transition-all duration-700 ${scrolled ? 'text-2xl' : 'text-3xl'}`}>
                CHRONOS<span className="text-amber-400">.</span>
              </h1>
              <p className={`text-xs text-amber-400/80 uppercase tracking-widest transition-all duration-700 ${scrolled ? 'opacity-100' : 'opacity-0'}`}>Est. 1884</p>
            </div>
          </div>
          
          {/* Navigation links - only visible when scrolled */}
          <div className={`transition-all duration-700 ${scrolled ? 'opacity-100 flex-1 ml-16' : 'opacity-0 pointer-events-none'}`}>
            {/* <div className="hidden md:flex justify-center space-x-10">
              {[
                { name: "Collections", icon: <Crown className="h-3 w-3 mr-1" /> },
                { name: "Craftmanship", icon: <Watch className="h-3 w-3 mr-1" /> },
                { name: "Heritage", icon: null },
                { name: "Service", icon: null }
              ].map((item) => (
                <a 
                  key={item.name} 
                  href="#" 
                  className="text-sm uppercase tracking-widest text-white/90 hover:text-amber-400 transition-colors duration-300 group flex items-center"
                >
                  {item.icon && item.icon}
                  {item.name}
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-700 h-px bg-amber-400 mt-1"></span>
                </a>
              ))}
            </div> */}
          </div>
          
          {/* Icons - only visible when scrolled */}
          <div className={`flex items-center space-x-8 transition-all duration-700 ${scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <Search className="h-5 w-5 text-white/80 hover:text-amber-400 transition-colors duration-300 cursor-pointer" />
            <User className="h-5 w-5 text-white/80 hover:text-amber-400 transition-colors duration-300 cursor-pointer" />
            <div className="relative">
              <ShoppingBag className="h-5 w-5 text-white/80 hover:text-amber-400 transition-colors duration-300 cursor-pointer" />
              <span className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center bg-amber-400 text-black text-xs rounded-full">0</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom gold trim */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-400/20 to-transparent"></div>
    </nav>
  );
}