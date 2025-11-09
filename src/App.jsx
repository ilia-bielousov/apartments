import React from "react";
import FloorSelector from "./components/FloorSelector";
import ApartmentFilter from "./components/ApartmentFilter";
import FloorPlan from "./components/FloorPlan";
import BuildingView from "./components/BuildingView.jsx";
import ApartmentList from "./components/ApartmentList";
import InfoPanel from "./components/InfoPanel.jsx";
import {
  useApartmentsStore,
  selectSelectedApartment,
} from "./store/useApartmentsStore";

import "./App.css";

function App() {
  const selectedFloor = useApartmentsStore((state) => state.selectedFloor);
  const selectedApartment = useApartmentsStore(selectSelectedApartment);

  return (
    <div className="flex flex-col md:flex-row min-h-[100dvh] md:h-screen bg-white">
      {/* СЛЕВА: этажи + фильтры (на мобилке остаётся слева сверху, но не давит на высоту) */}
      <aside className="w-full md:w-[250px] bg-gray-50 border-b md:border-b-0 md:border-r border-gray-300 p-4 overflow-y-auto shrink-0 order-1">
        <FloorSelector />
        <ApartmentFilter />
      </aside>

      {/* ЦЕНТР: дом/план — ВСЕГДА виден. Даём гарантированную высоту на мобилках */}
      <main className="grow order-2 p-3 md:p-5 bg-white">
        <div className="relative w-full md:h-full">
          {/* На мобильных даём «коробку» с аспектом 16/9, чтобы SVG получил реальную высоту */}
          <div className="relative w-full aspect-[16/9] md:aspect-auto md:h-full rounded-lg shadow-sm overflow-visible md:overflow-hidden bg-gray-50">
            {/* Вид здания */}
            <div
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                selectedFloor ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <BuildingView />
            </div>

            {/* План этажа */}
            <div
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                selectedFloor ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              {selectedFloor && <FloorPlan />}
            </div>
          </div>
        </div>
      </main>

      {/* СПРАВА: список/инфо (как было) */}
      <aside className="w-full md:w-[350px] bg-white border-t md:border-t-0 md:border-l border-gray-300 p-4 flex flex-col h-auto md:h-full overflow-y-auto shrink-0 order-3">
        {selectedApartment ? <InfoPanel /> : <ApartmentList />}
      </aside>
    </div>
  );
}

export default App;
