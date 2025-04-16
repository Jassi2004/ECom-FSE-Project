import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ArrowUpDown, ChevronDown } from "lucide-react";

const SortDropdown = () => {
  const { updateSortOption } = useContext(AppContext); // Get function to update sort option

  const handleSortChange = (e) => {
    const selectedOption = e.target.innerText; // Get selected option text
    updateSortOption(selectedOption); // Update the sort option in context
  };

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 bg-black border border-amber-900/30 px-5 py-3 hover:border-amber-400/60 transition-colors">
        <ArrowUpDown className="h-4 w-4 text-amber-400" />
        <span className="text-sm uppercase tracking-wider">Sort By</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {/* Sort dropdown menu */}
      <div className="absolute right-0 mt-2 w-48 bg-black border border-amber-900/30 shadow-lg shadow-amber-900/10 hidden group-hover:block z-20">
        {["Featured", "Price: High to Low", "Price: Low to High", "Newest", "Most Popular"].map((option, index) => (
          <div
            key={index}
            className="px-4 py-3 hover:bg-amber-900/20 text-sm cursor-pointer border-b border-amber-900/10 last:border-0"
            onClick={handleSortChange} // Handle the option click
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortDropdown;
