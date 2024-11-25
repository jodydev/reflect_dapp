import { IoSearch } from "react-icons/io5"; 

export default function SearchBar() {
  return (
    <div className="relative w-full md:w-96">
      {/* Icona di ricerca */}
      <span className="absolute inset-y-0 left-0 flex items-center pl-4">
        <IoSearch className="w-5 h-5 text-gray-500 transition-all duration-300 ease-in-out group-hover:text-primary" />
      </span>
      
      {/* Barra di ricerca */}
      <input
        type="text"
        placeholder="Search..."
        className="w-full px-10 py-2 border-none text-black bg-white/30 shadow-sm rounded-xl focus:outline-none transition-all duration-300 ease-in-out focus:ring-2 focus:ring-primary group hover:ring-2 hover:ring-gray-200 focus:ring-offset-2 focus:ring-offset-white"
      />
    </div>
  );
}
