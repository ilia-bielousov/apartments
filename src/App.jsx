import React, { useState, useMemo } from "react";
import { floors, apartments } from "./data/mockData.js";

import FloorSelector from "./components/FloorSelector";
import ApartmentFilter from "./components/ApartmentFilter";
import FloorPlan from "./components/FloorPlan";
import BuildingView from "./components/BuildingView.jsx";
import ApartmentList from "./components/ApartmentList";
import InfoPanel from "./components/InfoPanel.jsx";

import "./App.css";

const INITIAL_FILTERS = {
  status: ["available", "reserved"],
  rooms: 5,
  area: 150,
  price: 3.5,
};

const AVAILABLE_STATUSES = ["available", "sold", "reserved"];

function App() {
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [highlightedApartmentId, setHighlightedApartmentId] = useState(null);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [selectedApartmentId, setSelectedApartmentId] = useState(null);

  // Сброс при возврате на главное здание
  const handleBackToBuilding = () => {
    setSelectedFloor(null);
    setSelectedApartmentId(null);
    setHighlightedApartmentId(null);
    setFilters(INITIAL_FILTERS);
  };

  const handleSelectFloor = (floorId) => {
    setSelectedFloor(floorId);
  };

  const selectedApartment = useMemo(
    () => apartments.find((apt) => apt.id === selectedApartmentId) || null,
    [selectedApartmentId]
  );

  const allApartmentsOnFloor = useMemo(
    () => apartments.filter((apt) => apt.floor === selectedFloor),
    [selectedFloor]
  );

  const dynamicMaxLimits = useMemo(() => {
    if (allApartmentsOnFloor.length === 0) {
      return { maxArea: 0, maxPrice: 0 };
    }
    const maxArea = Math.max(...allApartmentsOnFloor.map((a) => a.area));
    const maxPrice = Math.max(...allApartmentsOnFloor.map((a) => a.price));
    return {
      maxArea: Math.ceil(maxArea),
      maxPrice: Math.ceil(maxPrice / 100000) / 10,
    };
  }, [allApartmentsOnFloor]);

  const apartmentsForFloor = useMemo(() => {
    return allApartmentsOnFloor.filter((apt) => {
      const statusPass = filters.status.includes(apt.status);
      const roomPass = apt.rooms <= filters.rooms;
      const areaPass = apt.area <= filters.area;
      const pricePass = apt.price / 1000000 <= filters.price;
      return statusPass && roomPass && areaPass && pricePass;
    });
  }, [allApartmentsOnFloor, filters]);

  const handleHighlight = (apartmentId) => {
    if (apartmentId !== selectedApartmentId) {
      setHighlightedApartmentId(apartmentId);
    }
  };

  const handleFilterChange = (newFilters) => setFilters(newFilters);
  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setHighlightedApartmentId(null);
  };

  const handleApartmentClick = (apartmentId) => {
    setSelectedApartmentId((currentId) =>
      currentId === apartmentId ? null : apartmentId
    );
    setHighlightedApartmentId(null);
  };

  return (
    <div className="flex h-screen">
      {/* Левая колонка */}
      <aside className="w-[250px] bg-gray-50 border-r border-gray-300 p-4 overflow-y-auto flex-shrink-0">
        <FloorSelector
          floors={floors}
          selectedFloor={selectedFloor}
          onSelect={handleSelectFloor}
        />
        <ApartmentFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          availableStatuses={AVAILABLE_STATUSES}
          onReset={handleResetFilters}
          dynamicMaxLimits={dynamicMaxLimits}
        />
      </aside>

      {/* Центральная колонка */}
      <main className="flex-grow p-5 flex justify-center items-center overflow-hidden bg-white">
        <div className="relative w-full h-full overflow-hidden bg-gray-50">
          {/* Анимация перехода между BuildingView и FloorPlan */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              selectedFloor ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <BuildingView
              floors={floors}
              selectedFloor={selectedFloor}
              onSelectFloor={handleSelectFloor}
            />
          </div>

          <div
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              selectedFloor ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {selectedFloor && (
              <FloorPlan
                selectedFloor={selectedFloor}
                apartments={apartmentsForFloor}
                onHover={(apt) =>
                  handleHighlight(apt ? apt.id : null)
                }
                onSelect={handleApartmentClick}
                highlightedApartmentId={highlightedApartmentId}
                selectedApartmentId={selectedApartmentId}
                onBack={handleBackToBuilding}
              />
            )}
          </div>
        </div>
      </main>

      {/* Правая колонка */}
      <aside className="w-[350px] bg-white border-l border-gray-300 p-4 flex flex-col h-full overflow-hidden flex-shrink-0 box-border">
        {selectedApartment ? (
          <InfoPanel
            apartment={selectedApartment}
            onClose={() => setSelectedApartmentId(null)}
          />
        ) : (
          <ApartmentList
            apartments={apartmentsForFloor}
            selectedFloor={selectedFloor}
            onHover={(id) => handleHighlight(id)}
            onSelect={handleApartmentClick}
            highlightedApartmentId={highlightedApartmentId}
            selectedApartmentId={selectedApartmentId}
          />
        )}
      </aside>
    </div>
  );
}

export default App;

