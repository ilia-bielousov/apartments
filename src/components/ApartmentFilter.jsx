import React, { useState } from "react";
import {
  useApartmentsStore,
  AVAILABLE_STATUSES,
  selectDynamicMaxLimits,
} from "../store/useApartmentsStore";

const ApartmentFilter = () => {
  const filters = useApartmentsStore((state) => state.filters);
  const dynamicMaxLimits = useApartmentsStore(selectDynamicMaxLimits);
  const setFilters = useApartmentsStore((state) => state.setFilters);
  const resetFilters = useApartmentsStore((state) => state.resetFilters);

  const { maxArea, maxPrice } = dynamicMaxLimits;
  const MAX_ROOMS = 5;
  const MAX_AREA_DISPLAY = maxArea || 150;
  const MAX_PRICE_DISPLAY = maxPrice || 3.5;

  const [isOpen, setIsOpen] = useState(true);

  const handleRangeChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: parseFloat(value),
    });
  };

  const handleStatusChange = (status) => {
    const newStatuses = filters.status.includes(status)
      ? filters.status.filter((s) => s !== status)
      : [...filters.status, status];
    setFilters({
      ...filters,
      status: newStatuses,
    });
  };

  return (
    <div className="mt-5">
      {/* Заголовок фильтра */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-3 cursor-pointer"
      >
        <span>Фильтр квартир</span>
        <span className="text-blue-600 text-sm">
          {isOpen ? "Скрыть ▲" : "Показать ▼"}
        </span>
      </button>

      {/* Контент фильтра */}
      {isOpen && (
        <div className="space-y-5 transition-all duration-300">
          {/* Статус */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Статус</h4>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_STATUSES.map((status) => (
                <label
                  key={status}
                  className={`flex items-center px-2 py-1 border rounded-md text-sm cursor-pointer ${
                    filters.status.includes(status)
                      ? "bg-blue-100 border-blue-400 text-blue-700"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
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

          {/* Комнаты */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Комнаты
            </h4>
            <input
              type="range"
              min="1"
              max={MAX_ROOMS}
              value={filters.rooms}
              onChange={(e) =>
                setFilters({ ...filters, rooms: parseInt(e.target.value, 10) })
              }
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>Минимум 1</span>
              <span>Максимум {filters.rooms}</span>
            </div>
          </div>

          {/* Площадь */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Площадь
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
              <span>Минимум м²</span>
              <span>Максимум {filters.area} м²</span>
            </div>
          </div>

          {/* Цена */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Цена млн зт
            </h4>
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
              <span>мин. 0.5 млн зт</span>
              <span>макс. {MAX_PRICE_DISPLAY} млн зт</span>
            </div>
            <div className="text-right text-sm text-blue-600 mt-1">
              Текущая: {filters.price.toFixed(1)} млн зт
            </div>
          </div>

          {/* Кнопка очистки */}
          <button
            className="w-full py-2 font-semibold rounded-md border border-red-400 text-red-800 bg-red-100 hover:bg-red-200 transition-colors cursor-pointer"
            onClick={resetFilters}
          >
            Очистить фильтры
          </button>
        </div>
      )}
    </div>
  );
};

export default ApartmentFilter;
