import { Link } from "react-router-dom";
import { Star } from "lucide-react";

export default function List({watch}) {
    return (
      <>
            <Link to={`/product/${watch.id}`} className="group relative block">
      <div key={watch.id} className="group bg-black border border-amber-900/30 hover:border-amber-400/30 transition-colors duration-500 p-6">
                <div className="flex flex-col md:flex-row">
                  {/* Left: Image */}
                  <div className="md:w-1/4 relative mb-6 md:mb-0">
                    {/* Product Tag */}
                    <div className="absolute top-2 left-2 bg-black/90 px-3 py-1 text-xs uppercase tracking-wider text-amber-400 border-l-2 border-amber-400 z-10">
                      {watch.tag} 
                    </div>
                    
                    <div className="aspect-square bg-gradient-to-b from-gray-800 to-black flex items-center justify-center relative">
                      <img src={watch.image} alt={watch.name} className="w-full h-full object-contain p-4" />
                    </div>
                  </div>
                  
                  {/* Middle: Details */}
                  <div className="md:w-2/4 md:px-8">
                    <h3 className="font-serif text-2xl mb-2">{watch.name}</h3>
                    <div className="flex items-center mb-4">
                      <Star className="h-4 w-4 text-amber-400 fill-amber-400 mr-1" />
                      <span className="text-sm mr-2">{watch.rating}</span>
                      <span className="text-white/40 text-xs">| Collection: {watch.collection}</span>
                    </div>
                    <p className="text-white/70 mb-6">{watch.description}</p>
                    
                    {/* Specs */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <span className="text-amber-400/70 text-xs block">Movement</span>
                        <span className="text-white/80 text-sm">{watch.movement}</span>
                      </div>
                      <div>
                        <span className="text-amber-400/70 text-xs block">Diameter</span>
                        <span className="text-white/80 text-sm">{watch.diameter}</span>
                      </div>
                      <div>
                        <span className="text-amber-400/70 text-xs block">Case</span>
                        <span className="text-white/80 text-sm">{watch.color}</span>
                      </div>
                      <div>
                        <span className="text-amber-400/70 text-xs block">Strap</span>
                        <span className="text-white/80 text-sm">{watch.strap}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right: Price and CTA */}
                  <div className="md:w-1/4 flex flex-col items-center justify-between border-t md:border-t-0 md:border-l border-amber-900/20 pt-6 md:pt-0 md:pl-8 mt-6 md:mt-0">
                    <div className="text-center mb-6">
                      <p className="text-amber-400 text-2xl font-light">{watch.price}</p>
                      <p className="text-white/40 text-xs mt-1">Price excludes taxes</p>
                    </div>
                    
                    <div className="space-y-4 w-full">
                      <button className="w-full bg-amber-400 text-black px-4 py-3 text-sm uppercase tracking-wider hover:bg-amber-500 transition-colors">
                        View Details
                      </button>
                      <button className="w-full bg-transparent border border-amber-900/50 text-white px-4 py-3 text-sm uppercase tracking-wider hover:border-amber-400 hover:text-amber-400 transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              </Link>
      </>
    );
  }
  