import React, { useMemo, useState, useEffect } from "react";
import buildingImage from "../assets/dom.jpg";
import { useApartmentsStore } from "../store/useApartmentsStore";

const TARGET_WIDTH = 2200;
const TARGET_HEIGHT = 1237;

const BuildingView = () => {
  const floors = useApartmentsStore((state) => state.floors);
  const apartments = useApartmentsStore((state) => state.apartments);
  const selectedFloor = useApartmentsStore((state) => state.selectedFloor);
  const selectFloor = useApartmentsStore((state) => state.selectFloor);

  const [hovered, setHovered] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(true);

  // Следим за шириной экрана
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const overlayFloors = useMemo(() => {
    if (!floors) return [];
    return [...floors].sort((a, b) => b.id - a.id);
  }, [floors]);

  const getFloorStats = (floorId) => {
    if (!apartments?.length) return { total: 0, available: 0, sold: 0, reserved: 0 };

    const floorApts = apartments.filter((apt) => apt.floor === floorId);
    const total = floorApts.length;
    const available = floorApts.filter((a) => a.status === "доступно").length;
    const sold = floorApts.filter((a) => a.status === "продано").length;
    const reserved = floorApts.filter((a) => a.status === "зарезервировано").length;

    return { total, available, sold, reserved };
  };

  return (
    <div className="relative flex justify-center items-center w-full h-full bg-gray-100 overflow-hidden">
      <div className="relative w-full max-w-[1900px] aspect-[16/9] overflow-hidden rounded-lg shadow-lg">
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
              if (!floor?.svg_shape?.d) return null;
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
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => isDesktop && setHovered(floor)}
                  onMouseLeave={() => isDesktop && setHovered(null)}
                  onClick={() => selectFloor(floor.id)}
                />
              );
            })}
          </g>
        </svg>

        {/* 🧩 Тултип — показываем только на десктопе */}
        {isDesktop && hovered && (
          <div
            className="absolute z-30 bg-white text-gray-800 text-sm rounded-lg shadow-xl border border-gray-200 px-3 py-2 animate-fadeIn"
            style={{
              left: Math.min(pos.x + 20, TARGET_WIDTH - 220),
              top: Math.max(pos.y - 100, 20),
            }}
          >
            <div className="font-semibold text-blue-600 mb-1">
              {hovered.label}
            </div>

            {(() => {
              const stats = getFloorStats(hovered.id);
              const progress =
                stats.total > 0
                  ? Math.round((stats.available / stats.total) * 100)
                  : 0;

              return (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Всего квартир:</span>
                    <span className="font-medium">{stats.total}</span>
                  </div>
                  <div className="flex justify-between text-xs text-green-600">
                    <span>Доступно:</span>
                    <span>{stats.available}</span>
                  </div>
                  <div className="flex justify-between text-xs text-yellow-600">
                    <span>Резерв:</span>
                    <span>{stats.reserved}</span>
                  </div>
                  <div className="flex justify-between text-xs text-red-600">
                    <span>Продано:</span>
                    <span>{stats.sold}</span>
                  </div>

                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                    <div
                      className="h-full bg-green-500 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>

                  <div className="text-[11px] text-gray-500 text-right mt-1">
                    {progress}% свободных
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuildingView;
