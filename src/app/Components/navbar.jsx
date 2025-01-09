import React, { useState } from "react";

export default function Navbar({ types, onTypeSelect, onLimitChange, selectedLimit }) {
  const [selectedType, setSelectedType] = useState(null); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const handleTypeSelect = (type) => {
    setSelectedType(type);
    onTypeSelect(type); 
    setIsDropdownOpen(false); 
  };

  const handleLimitChange = (event) => {
    const newLimit = parseInt(event.target.value, 10);
    onLimitChange(newLimit); 
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev); 
  };

  return (
    <nav className="p-4" style={{ backgroundColor: "#e10000" }}>
      <div className="text-white text-lg font-bold my-4">My Pokedex</div>
      <div className="container mx-auto flex justify-start items-center space-x-4">
        {/* Barre de recherche */}
        <input
          type="text"
          placeholder="Enter text"
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Menu déroulant pour les types */}
        <div className="relative">
          <button
            className="px-4 py-2 rounded-md border border-gray-300 bg-white flex items-center space-x-2"
            onClick={toggleDropdown}
          >
            <span>{selectedType ? selectedType.name : "Type"}</span>
            {selectedType && selectedType.image && (
              <img
                src={selectedType.image}
                alt={selectedType.name}
                className="w-6 h-6"
              />
            )}
          </button>

          {isDropdownOpen && (
            <div className="absolute bg-white border rounded-md shadow-md mt-2 z-10 w-40">
              {types.map((type) => (
                <div
                  key={type.id}
                  className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleTypeSelect(type)}
                >
                  {type.image && (
                    <img
                      src={type.image}
                      alt={type.name}
                      className="w-6 h-6 mr-2"
                    />
                  )}
                  <span>{type.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Menu déroulant pour la limite */}
        <select
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedLimit}
          onChange={handleLimitChange}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    </nav>
  );
}
