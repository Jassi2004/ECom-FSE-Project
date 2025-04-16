import { Link } from "react-router-dom";
import { Star } from "lucide-react";

export default function Card({ watch }) {
  // console.log(watch.watch);

  return (
    <>
      <Link to={`/product/${watch.id}`} className="group relative block">
        <div key={watch.id} className="group relative">
          {/* Product Tag */}
          <div className="absolute top-4 left-4 bg-black/90 backdrop-blur-sm px-3 py-1 text-xs uppercase tracking-wider text-amber-400 border-l-2 border-amber-400 z-10">
            {watch.tag}
          </div>

          {/* Product Rating */}
          <div className="absolute top-4 right-4 bg-black/90 backdrop-blur-sm px-2 py-1 z-10 flex items-center">
            <Star className="h-3 w-3 text-amber-400 fill-amber-400 mr-1" />
            <span className="text-xs">{watch.rating}</span>
          </div>

          {/* Product Image */}
          <div className="mb-6 overflow-hidden relative group">
            <div className="aspect-square bg-gradient-to-b from-gray-800 to-black flex items-center justify-center relative">
              {/* Gold accent corner decorations */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-amber-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-amber-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              {/* Image */}
              <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-1000">
                <img
                  src={watch.image}
                  alt={watch.name}
                  className="w-full h-full object-contain p-4"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-4 transition-all duration-500">
              <button className="bg-amber-400 text-black px-5 py-2 text-xs uppercase tracking-wider hover:bg-amber-500 transition-colors mr-2 font-medium">
                View Details
              </button>
              <button className="bg-black/90 text-white border border-white/20 px-5 py-2 text-xs uppercase tracking-wider hover:border-amber-400 hover:text-amber-400 transition-colors font-medium">
                Add to Cart
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <div className="h-px w-12 bg-amber-400/30"></div>
            </div>
            <h3 className="font-serif text-xl mb-1">{watch.name}</h3>
            <p className="text-amber-400 mb-4 font-light">{watch.price}</p>
          </div>
        </div>
      </Link>
    </>
  );
}
