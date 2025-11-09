import React, { useMemo, useState } from "react";
import buildingImage from "../assets/dom.jpg";
import { useApartmentsStore } from "../store/useApartmentsStore";

const ORIGINAL_WIDTH = 737;
const ORIGINAL_HEIGHT = 503;
const TARGET_WIDTH = 2200;
const TARGET_HEIGHT = 1237;
const SCALE_X = TARGET_WIDTH / ORIGINAL_WIDTH;
const SCALE_Y = TARGET_HEIGHT / ORIGINAL_HEIGHT;
const STROKE_WIDTH = 2 / Math.max(SCALE_X, SCALE_Y);

const BuildingView = () => {
  const floors = useApartmentsStore((state) => state.floors);
  const selectedFloor = useApartmentsStore((state) => state.selectedFloor);
  const selectFloor = useApartmentsStore((state) => state.selectFloor);
  const [hovered, setHovered] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const overlayFloors = useMemo(() => {
    if (!floors) {
      return [];
    }
    return [...floors].sort((a, b) => b.id - a.id);
  }, [floors]);

  return (
    <div className="relative flex justify-center items-center w-full h-full bg-gray-100 overflow-hidden">
      <div className="relative w-full max-w-[1900px] aspect-video overflow-hidden rounded-lg shadow-lg">
        <img
          src={buildingImage}
          alt="Building"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          draggable={false}
        />
        <svg
          viewBox={`0 0 ${TARGET_WIDTH} ${TARGET_HEIGHT}`}
          preserveAspectRatio="xMidYMid meet"
          className="absolute top-0 left-0 w-full h-full"
          onMouseMove={(e) =>
            setPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })
          }
          onMouseLeave={() => setHovered(null)}
        >
          <g transform={`translate(159, 390)`}>
            {overlayFloors.map((floor) => {
              if (!floor?.svg_shape?.d) {
                return null;
              }
              const isActive =
                hovered?.id === floor.id || selectedFloor === floor.id;
              return (
                <path
                  key={floor.id}
                  d={floor.svg_shape.d}
                  fill={
                    isActive
                      ? "rgba(37,99,235,0.65)"
                      : "rgba(59,130,246,0.25)"
                  }
                  // stroke="#2563eb"
                  // strokeWidth={STROKE_WIDTH}
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setHovered(floor)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => selectFloor(floor.id)}
                />
              );
            })}
          </g>
        </svg>

        {hovered && (
          <div
            className="absolute bg-white text-sm text-gray-700 px-2 py-1 rounded shadow border border-gray-300 pointer-events-none"
            style={{ left: pos.x + 15, top: pos.y - 25 }}
          >
            {hovered.label}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuildingView;
