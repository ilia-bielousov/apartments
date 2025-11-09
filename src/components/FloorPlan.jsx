import React from "react";
import ApartmentShape from "./ApartmentShape";
import floor1Image from "../assets/floor1.jpg";
import floor2Image from "../assets/floor2.jpg";
import floor3Image from "../assets/floor3.jpg";
import floor4Image from "../assets/floor4.jpg";
import floor5Image from "../assets/floor5.jpg";
import {
  useApartmentsStore,
  selectFilteredApartments,
} from "../store/useApartmentsStore";

const floorImages = {
  1: floor1Image,
  2: floor2Image,
  3: floor3Image,
  4: floor4Image,
  5: floor5Image,
  6: floor5Image,
  7: floor5Image,
};

const VIEWBOX_W = 2240;
const VIEWBOX_H = 1240;

// Разные смещения для двух типов домов
const FLOOR_TRANSFORMS = {
  lowRise: { x: 147, y: 229 },
  highRise: { x: 659, y: 229 },
};

const FloorPlan = () => {
  const selectedFloor = useApartmentsStore((state) => state.selectedFloor);
  const apartments = useApartmentsStore(selectFilteredApartments);
  const highlightedApartmentId = useApartmentsStore(
    (state) => state.highlightedApartmentId
  );
  const selectedApartmentId = useApartmentsStore(
    (state) => state.selectedApartmentId
  );
  const highlightApartment = useApartmentsStore(
    (state) => state.highlightApartment
  );
  const selectApartment = useApartmentsStore((state) => state.selectApartment);
  const resetAll = useApartmentsStore((state) => state.resetAll);

  const planImage = floorImages[selectedFloor] || floor1Image;

  // Определяем тип этажа: низкий (1–4) или высокий (5–7)
  const isHighRise = selectedFloor >= 5;
  const transform = isHighRise
    ? FLOOR_TRANSFORMS.highRise
    : FLOOR_TRANSFORMS.lowRise;

  return (
    <div className="relative flex w-full h-full justify-center items-center overflow-hidden bg-gray-100">
      <button
        onClick={resetAll}
        className="absolute top-4 left-4 z-20 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 shadow cursor-pointer"
      >
        Назад
      </button>

      <svg
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-auto max-w-[1400px]"
      >
        <image
          href={planImage}
          x="0"
          y="0"
          width={VIEWBOX_W}
          height={VIEWBOX_H}
          preserveAspectRatio="xMidYMid meet"
        />

        <g transform={`translate(${transform.x}, ${transform.y})`}>
          {apartments.map((apt) => (
            <ApartmentShape
              key={apt.id}
              apartment={apt}
              isHighlighted={apt.id === highlightedApartmentId}
              isSelected={apt.id === selectedApartmentId}
              onMouseEnter={() => highlightApartment(apt.id)}
              onMouseLeave={() => highlightApartment(null)}
              onClick={() => selectApartment(apt.id)}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default FloorPlan;
