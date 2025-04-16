import React, { useState, useEffect } from 'react';
import LuxuryWatchNavbar from '../components/Navbar';
import LuxuryWatchHero from '../components/Hero';
import { Watch, Shield, Award, Star } from 'lucide-react';
import Products from '../components/Products';

export default function LandingPage() {
  // Sample product data
  const luxuryWatches = [
    {
      id: 1,
      name: "CHRONOS Celestial Tourbillon",
      price: "$89,500",
      description: "Hand-crafted in Switzerland with 324 individual components",
      image: "/api/placeholder/600/600",
      tag: "Limited Edition"
    },
    {
      id: 2,
      name: "CHRONOS Royal Oak Perpetual",
      price: "$125,000",
      description: "18K rose gold case with sapphire crystal display",
      image: "/api/placeholder/600/600",
      tag: "Exclusive"
    },
    {
      id: 3,
      name: "CHRONOS Nautilus Moonphase",
      price: "$76,800",
      description: "Patented self-winding mechanism with 120-hour power reserve",
      image: "/api/placeholder/600/600",
      tag: "Heritage"
    },
    {
      id: 4,
      name: "CHRONOS Platinum Minute Repeater",
      price: "$218,000",
      description: "Handcrafted by master horologists with platinum case",
      image: "/api/placeholder/600/600",
      tag: "New Arrival"
    },
    {
      id: 1,
      name: "CHRONOS Celestial Tourbillon",
      price: "$89,500",
      description: "Hand-crafted in Switzerland with 324 individual components",
      image: "/api/placeholder/600/600",
      tag: "Limited Edition"
    },
    {
      id: 2,
      name: "CHRONOS Royal Oak Perpetual",
      price: "$125,000",
      description: "18K rose gold case with sapphire crystal display",
      image: "/api/placeholder/600/600",
      tag: "Exclusive"
    },
    {
      id: 3,
      name: "CHRONOS Nautilus Moonphase",
      price: "$76,800",
      description: "Patented self-winding mechanism with 120-hour power reserve",
      image: "/api/placeholder/600/600",
      tag: "Heritage"
    },
    {
      id: 4,
      name: "CHRONOS Platinum Minute Repeater",
      price: "$218,000",
      description: "Handcrafted by master horologists with platinum case",
      image: "/api/placeholder/600/600",
      tag: "New Arrival"
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      <LuxuryWatchNavbar />
      <LuxuryWatchHero />
      <Products/>
    </div>
  );
}