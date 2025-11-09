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
    <div className="flex h-screen">
      <aside className="w-[250px] bg-gray-50 border-r border-gray-300 p-4 overflow-y-auto shrink-0">
        <FloorSelector />
        <ApartmentFilter />
      </aside>

      <main className="flex-grow p-5 flex justify-center items-center overflow-hidden bg-white">
        <div className="relative w-full h-full overflow-hidden bg-gray-50">
          <div
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              selectedFloor ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <BuildingView />
          </div>

          <div
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              selectedFloor ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {selectedFloor && <FloorPlan />}
          </div>
        </div>
      </main>

      <aside className="w-[350px] bg-white border-l border-gray-300 p-4 flex flex-col h-full overflow-hidden shrink-0 box-border">
        {selectedApartment ? <InfoPanel /> : <ApartmentList />}
      </aside>
    </div>
  );
}

export default App;
