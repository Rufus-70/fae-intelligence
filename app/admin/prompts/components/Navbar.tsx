// app/admin/prompts/components/Navbar.tsx
import React from 'react';
// Assuming IconSearch and other icons might be used from constants
// For now, using text for buttons/actions.
// import { IconSearch, IconPlus } from '../../constants'; // Example path

interface NavbarProps {
  onSearchChange: (searchTerm: string) => void;
  onAddNew: () => void;
  // onFilterChange?: (filters: any) => void; // Optional: if more filters are added
}

const Navbar: React.FC<NavbarProps> = ({ onSearchChange, onAddNew }) => {
  return (
    <nav className="bg-slate-800 p-4 rounded-lg shadow-md mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
      <div className="relative flex-grow w-full sm:w-auto max-w-xs">
        <input
          type="text"
          placeholder="Search prompts..."
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full p-2 pl-10 text-sm text-white bg-slate-700 rounded-md focus:ring-sky-500 focus:border-sky-500 border-slate-600"
        />
        {/* Placeholder for search icon, absolutely positioned */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {/* <IconSearch className="h-5 w-5 text-slate-400" /> */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-slate-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
      </div>
      {/* Add filter controls here if needed */}
      <button
        onClick={onAddNew}
        className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-md transition duration-150 ease-in-out flex items-center space-x-2 shadow-sm"
      >
        {/* <IconPlus className="h-5 w-5" /> */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
         <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        <span>Add New Prompt</span>
      </button>
    </nav>
  );
};

export default Navbar;
