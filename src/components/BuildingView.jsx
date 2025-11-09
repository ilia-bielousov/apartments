import React, { useMemo, useState } from "react";
import buildingImage from "../assets/dom.jpg";
import { useApartmentsStore } from "../store/useApartmentsStore";

// Базовая система координат, под которую рисовались path’ы этажей
const VIEW_W = 2200;
const VIEW_H = 1237;

// Сдвиг контуров относительно фото (тот же, что у тебя был)
const OVERLAY_TRANSLATE = { x: 159, y: 390 };

const BuildingView = () => {
  const floors = useApartmentsStore((s) => s.floors);
  const selectedFloor = useApartmentsStore((s) => s.selectedFloor);
  const selectFloor = useApartmentsStore((s) => s.selectFloor);

  const [hovered, setHovered] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const overlayFloors = useMemo(() => {
    if (!floors) return [];
    // Сверху вниз
    return [...floors].sort((a, b) => b.id - a.id);
  }, [floors]);

  return (
    <div className="relative flex justify-center items-center w-full h-full bg-gray-100 overflow-hidden">
      {/* Один SVG: и картинка, и контуры в одной координатной системе */}
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full max-w-[1900px] h-auto rounded-lg shadow-lg"
        onMouseMove={(e) =>
          setPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })
        }
        onMouseLeave={() => setHovered(null)}
      >
        {/* Фото как слой внутри SVG */}
        <image
          href={buildingImage}
          x="0"
          y="0"
          width={VIEW_W}
          height={VIEW_H}
          preserveAspectRatio="xMidYMid meet"
        />

        {/* Контуры этажей */}
        <g transform={`translate(${OVERLAY_TRANSLATE.x}, ${OVERLAY_TRANSLATE.y})`}>
          {overlayFloors.map((floor) => {
            if (!floor?.svg_shape?.d) return null;
            const isActive =
              hovered?.id === floor.id || selectedFloor === floor.id;
            return (
              <path
                key={floor.id}
                d={floor.svg_shape.d}
                fill={isActive ? "rgba(37,99,235,0.65)" : "rgba(59,130,246,0.25)"}
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHovered(floor)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => selectFloor(floor.id)}
              />
            );
          })}
        </g>
      </svg>

      {/* Подсказка */}
      {hovered && (
        <div
          className="absolute bg-white text-xs md:text-sm text-gray-700 px-2 py-1 rounded shadow border border-gray-300 pointer-events-none"
          style={{ left: pos.x + 15, top: pos.y - 25 }}
        >
          {hovered.label}
        </div>
      )}
    </div>
  );
};

export default BuildingView;
