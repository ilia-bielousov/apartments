import React from 'react';

const ApartmentFilter = ({
  filters,
  onFilterChange,
  availableStatuses,
  onReset,
  dynamicMaxLimits,
}) => {
  const { maxArea, maxPrice } = dynamicMaxLimits;

  const MAX_ROOMS = 5;
  const MAX_AREA_DISPLAY = maxArea || 150;
  const MAX_PRICE_DISPLAY = maxPrice || 3.5;

  const handleRangeChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: parseFloat(value),
    });
  };

  const handleStatusChange = (status) => {
    const newStatuses = filters.status.includes(status)
      ? filters.status.filter((s) => s !== status)
      : [...filters.status, status];
    onFilterChange({
      ...filters,
      status: newStatuses,
    });
  };

  return (
    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mt-5 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-4">
        🔍 Filtr mieszkań
      </h3>

      {/* --- Status Filter --- */}
      <div className="mb-5">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Status</h4>
        <div className="flex flex-wrap gap-2">
          {availableStatuses.map((status) => (
            <label
              key={status}
              className={`flex items-center px-2 py-1 border rounded-md text-sm cursor-pointer ${
                filters.status.includes(status)
                  ? 'bg-blue-100 border-blue-400 text-blue-700'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <input
                type="checkbox"
                className="mr-2 accent-blue-600"
                checked={filters.status.includes(status)}
                onChange={() => handleStatusChange(status)}
              />
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </label>
          ))}
        </div>
      </div>

      {/* --- Rooms --- */}
      <div className="mb-5">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Pokoje (Rooms)</h4>
        <input
          type="range"
          min="1"
          max={MAX_ROOMS}
          value={filters.rooms}
          onChange={(e) =>
            onFilterChange({ ...filters, rooms: parseInt(e.target.value) })
          }
          className="w-full accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>Min 1</span>
          <span>Max {filters.rooms}</span>
        </div>
      </div>

      {/* --- Area --- */}
      <div className="mb-5">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">
          Powierzchnia [m²]
        </h4>
        <input
          type="range"
          min="40"
          max={MAX_AREA_DISPLAY}
          step="1"
          name="area"
          value={filters.area}
          onChange={handleRangeChange}
          className="w-full accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>Min 40 m²</span>
          <span>Max {filters.area} m²</span>
        </div>
      </div>

      {/* --- Price --- */}
      <div className="mb-5">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Cena [mln zł]</h4>
        <input
          type="range"
          min="0.5"
          max={MAX_PRICE_DISPLAY}
          step="0.1"
          name="price"
          value={filters.price}
          onChange={handleRangeChange}
          className="w-full accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>Min 0.5 mln zł</span>
          <span>Max {MAX_PRICE_DISPLAY} mln zł</span>
        </div>
        <div className="text-right text-sm text-blue-600 mt-1">
          Aktualna: {filters.price.toFixed(1)} mln zł
        </div>
      </div>

      {/* --- Reset Button --- */}
      <button
        className="w-full py-2 font-semibold rounded-md border border-red-400 text-red-800 bg-red-100 hover:bg-red-200 transition-colors"
        onClick={onReset}
      >
        🔄 Wyczyść filtry
      </button>
    </div>
  );
};

export default ApartmentFilter;
