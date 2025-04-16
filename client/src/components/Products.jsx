import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Filter,
  X,
  ChevronsUpDown,
  Circle,
  Watch,
  ArrowUpDown,
  Star,
} from "lucide-react";
import Card from "./Card";
import List from "./List";
import { AppContext } from "../context/AppContext";
import PageNumber from "./PageNumber";
import SortDropdown from "./SortDropdown";

export default function Products() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [luxuryWatches, setLuxuryWatches] = useState([]);
  const [openProducts, setOpenProducts] = useState(false);

  const productsRef = useRef(null); // 👈 create a ref

  const { products, pageNumber } = useContext(AppContext);

  

  useEffect(() => {
    console.log(products);
    
    if (productsRef.current) {
      window.scrollTo({
        top: productsRef.current.offsetTop - 100, // 👈 adjust this offset to your needs
        behavior: "smooth",
      });
    }
  }, [pageNumber]); // 

  const ToggleOpenProducts = () => {
    setOpenProducts(!openProducts);
  };

  let start = Math.ceil(pageNumber * 10);
  const paginatedProducts = products.slice(start, start + 12);

  useEffect(() => {
    const fetchWatches = async () => {
      try {
        const res = await fetch("/watches.json"); // fetch from public/
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setLuxuryWatches(data);
      } catch (err) {
        console.error("Failed to fetch watches:", err);
      }
    };

    fetchWatches();
  }, []);

  // Toggle filter menu
  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  // Filter categories
  const filterCategories = [
    {
      name: "Collection",
      options: [
        "Celestial",
        "Royal",
        "Nautilus",
        "Platinum",
        "Heritage",
        "Sport",
      ],
    },
    {
      name: "Price Range",
      options: [
        "Under $50,000",
        "$50,000-$100,000",
        "$100,000-$200,000",
        "Above $200,000",
      ],
    },
    {
      name: "Case Material",
      options: [
        "Rose Gold",
        "Yellow Gold",
        "White Gold",
        "Platinum",
        "Stainless Steel",
        "Titanium",
      ],
    },
    {
      name: "Strap Type",
      options: [
        "Alligator Leather",
        "Crocodile Leather",
        "Rubber",
        "Stainless Steel",
        "Gold Bracelet",
      ],
    },
    {
      name: "Movement",
      options: ["Automatic", "Manual", "Self-winding", "Quartz"],
    },
    {
      name: "Case Size",
      options: ["36-38mm", "39-41mm", "42-44mm", "45mm+"],
    },
  ];

  // Add or remove filter
  const toggleFilter = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  return (
    <section
      id="products-section"
      ref={productsRef} // 👈 attach the ref here
      className="bg-gradient-to-b from-black to-gray-900 py-32"
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Filters and Sorting Controls */}
        <div className="mb-12 flex flex-col lg:flex-row justify-between items-start lg:items-center">
          {/* Filter toggle button */}
          <div className="flex items-center mb-6 lg:mb-0">
            <button
              onClick={toggleFilters}
              className="flex items-center space-x-2 bg-black border border-amber-900/30 px-5 py-3 hover:border-amber-400/60 transition-colors group"
            >
              <Filter className="h-4 w-4 text-amber-400" />
              <span className="text-sm uppercase tracking-wider">
                Refine Collection
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  filtersOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Active filters */}
            {activeFilters.length > 0 && (
              <div className="hidden md:flex items-center space-x-2 ml-6">
                {activeFilters.slice(0, 2).map((filter, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-1 bg-amber-900/20 border border-amber-900/30 px-3 py-1 text-xs"
                  >
                    <span className="text-amber-400/80">{filter}</span>
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-amber-400"
                      onClick={() => toggleFilter(filter)}
                    />
                  </div>
                ))}
                {activeFilters.length > 2 && (
                  <div className="text-amber-400/80 text-xs">
                    +{activeFilters.length - 2} more
                  </div>
                )}
                <button
                  className="text-xs text-amber-400/80 underline hover:text-amber-400"
                  onClick={() => setActiveFilters([])}
                >
                  Clear All
                </button>
              </div>
            )}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-6">
            {/* View options */}
            <div className="flex items-center border border-amber-900/30 bg-black/30">
              <button
                className={`px-4 py-2 text-xs uppercase ${
                  viewMode === "grid"
                    ? "bg-amber-900/40 text-amber-400"
                    : "text-white/60"
                }`}
                onClick={() => setViewMode("grid")}
              >
                Grid
              </button>
              <button
                className={`px-4 py-2 text-xs uppercase ${
                  viewMode === "list"
                    ? "bg-amber-900/40 text-amber-400"
                    : "text-white/60"
                }`}
                onClick={() => setViewMode("list")}
              >
                List
              </button>
            </div>

            {/* Sort dropdown */}
            <SortDropdown/>
            {/* <div className="relative group">
              <button className="flex items-center space-x-2 bg-black border border-amber-900/30 px-5 py-3 hover:border-amber-400/60 transition-colors">
                <ArrowUpDown className="h-4 w-4 text-amber-400" />
                <span className="text-sm uppercase tracking-wider">
                  Sort By
                </span>
                <ChevronDown className="h-4 w-4" />
              </button>

              <div className="absolute right-0 mt-2 w-48 bg-black border border-amber-900/30 shadow-lg shadow-amber-900/10 hidden group-hover:block z-20">
                {[
                  "Featured",
                  "Price: High to Low",
                  "Price: Low to High",
                  "Newest",
                  "Most Popular",
                ].map((option, index) => (
                  <div
                    key={index}
                    className="px-4 py-3 hover:bg-amber-900/20 text-sm cursor-pointer border-b border-amber-900/10 last:border-0"
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>

        {/* Expanded Filter Panel */}
        <div
          className={`bg-black/80 border border-amber-900/30 mb-8 transform transition-all duration-500 overflow-hidden ${
            filtersOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-8">
            <div className="flex justify-between items-center mb-0">
              <h3 className="text-xl font-serif">Refine Your Collection</h3>
              <button
                onClick={toggleFilters}
                className="text-amber-400 hover:text-amber-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filterCategories.map((category, idx) => (
                <div key={idx} className="border-b border-amber-900/20 pb-6">
                  <h4 className="text-amber-400 uppercase text-sm tracking-wider mb-4">
                    {category.name}
                  </h4>
                  <div className="space-y-3">
                    {category.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div
                          className={`h-4 w-4 border cursor-pointer ${
                            activeFilters.includes(option)
                              ? "border-amber-400 bg-amber-400/20"
                              : "border-gray-600"
                          }`}
                          onClick={() => toggleFilter(option)}
                        >
                          {activeFilters.includes(option) && (
                            <div className="h-full w-full flex items-center justify-center">
                              <div className="h-1 w-1 bg-amber-400 rounded-full"></div>
                            </div>
                          )}
                        </div>
                        <span className="text-sm">{option}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                className="bg-amber-400 text-black px-8 py-3 text-sm uppercase tracking-wider hover:bg-amber-500 transition-colors"
                onClick={toggleFilters}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Product Display */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {paginatedProducts.map((watch) => (
              <Card key={watch.id} watch={watch} />
            ))}
          </div>
        ) : (
          // List view for watches
          <div className="space-y-8">
            {paginatedProducts.map((watch) => (
              <List key={watch.id} watch={watch} />
            ))}
          </div>
        )}

        <div className="App">
            <PageNumber size={products.length / 10} />
        </div>


        {/* Collection preview banner */}
        <div className="mt-24 relative overflow-hidden">
          <div className="bg-black border border-amber-900/30 p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <div className="font-serif italic text-amber-400/70 mb-2">
                  Coming Soon
                </div>
                <h3 className="text-3xl font-serif mb-4">
                  The Celestial Grand Complication
                </h3>
                <p className="text-white/70 mb-6 leading-relaxed max-w-lg">
                  Experience our most intricate masterpiece, featuring a
                  perpetual calendar, minute repeater, and tourbillon in a
                  single extraordinary timepiece. Limited to just 25 pieces
                  worldwide.
                </p>
                <button className="bg-transparent border border-white/20 text-white px-8 py-3 text-sm uppercase tracking-wider hover:border-amber-400 hover:text-amber-400 transition-colors">
                  Join Waitlist
                </button>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative">
                  <img
                    src="/api/placeholder/500/500"
                    alt="Grand Complication"
                    className="max-w-xs w-full"
                  />
                  <div className="absolute -inset-4 border border-amber-400/20 -z-10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
