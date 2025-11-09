import React, { useState } from "react";
import buildingImage from "../assets/metropolis.jpg";
import { useApartmentsStore } from "../store/useApartmentsStore";

const BuildingView = () => {
  const floors = useApartmentsStore((state) => state.floors);
  const selectedFloor = useApartmentsStore((state) => state.selectedFloor);
  const selectFloor = useApartmentsStore((state) => state.selectFloor);

  const [hoveredFloor, setHoveredFloor] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  return (
    <div className="relative flex justify-center items-center w-full h-full bg-gray-100 overflow-hidden">
      <div className="relative w-full max-w-5xl aspect-video overflow-hidden rounded-lg shadow-lg">
        <img
          src={buildingImage}
          alt="Building"
          className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
        />

        <svg
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid meet"
          className="absolute top-0 left-0 w-full h-full"
          onMouseMove={(e) =>
            setTooltipPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })
          }
          onMouseLeave={() => setHoveredFloor(null)}
        >
          {floors.map((floor) => (
            <polygon
              key={floor.id}
              points={floor.points}
              fill={
                selectedFloor === floor.id
                  ? "rgba(37,99,235,0.6)"
                  : "rgba(59,130,246,0.25)"
              }
              stroke="#2563eb"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200 hover:fill-blue-500 hover:opacity-70"
              onMouseEnter={() => setHoveredFloor(floor)}
              onMouseLeave={() => setHoveredFloor(null)}
              onClick={() => selectFloor(floor.id)}
            />
          ))}
        </svg>

        {hoveredFloor && (
          <div
            className="absolute bg-white text-sm text-gray-700 px-2 py-1 rounded shadow border border-gray-300 pointer-events-none"
            style={{
              left: tooltipPos.x + 10,
              top: tooltipPos.y - 30,
            }}
          >
            {hoveredFloor.label}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuildingView;
