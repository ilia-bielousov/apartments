import React, { useState } from "react";
import { useApartmentsStore } from "../store/useApartmentsStore";

const FloorSelector = () => {
  const floors = useApartmentsStore((state) => state.floors);
  const selectedFloor = useApartmentsStore((state) => state.selectedFloor);
  const selectFloor = useApartmentsStore((state) => state.selectFloor);

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="text-center pb-5">
      {/* Заголовок с кнопкой */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-3 cursor-pointer"
      >
        <span>Выбери этаж</span>
        <span className="text-blue-600 text-sm">
          {isOpen ? "Скрыть ▲" : "Показать ▼"}
        </span>
      </button>

      {/* Список этажей */}
      {isOpen && (
        <div className="flex flex-col gap-2 justify-center max-h-[50vh] overflow-y-auto pr-1 transition-all duration-300">
          {floors.map((floor) => (
            <button
              key={floor.id}
              onClick={() => selectFloor(floor.id)}
              className={`px-3 py-2 text-sm border rounded transition-all duration-150 cursor-pointer ${
                floor.id === selectedFloor
                  ? "bg-blue-600 text-white border-blue-600 font-bold"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400"
              }`}
            >
              {floor.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FloorSelector;
