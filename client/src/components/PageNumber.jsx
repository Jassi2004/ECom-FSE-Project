import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function PageNumber({ size }) {
  const { pageNumber, setPageNumber } = useContext(AppContext);

  const handleChange = (index) => {
    setPageNumber(index);
  };

  return (
    <div className="flex justify-center gap-2 mt-8 flex-wrap">
      {Array.from({ length: size }).map((_, index) => (
        <button
          key={index}
          onClick={() => handleChange(index)}
          className={`w-10 h-10 rounded-full text-sm font-medium border transition-colors duration-300 ${
            pageNumber === index
              ? "bg-amber-400 text-black border-amber-400"
              : "border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black"
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}
