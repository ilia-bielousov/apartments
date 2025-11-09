import React from "react";
import ApartmentShape from "./ApartmentShape";
import floor1Image from "../assets/floor1.jpg";
import floor2Image from "../assets/floor2.jpg";
import floor3Image from "../assets/floor3.jpg";
import floor4Image from "../assets/floor4.jpg";
import floor5Image from "../assets/floor5.jpg";

const floorImages = {
  1: floor1Image,
  2: floor2Image,
  3: floor3Image,
  4: floor4Image,
  5: floor5Image,
};

const VIEWBOX_W = 2240;
const VIEWBOX_H = 1240;

const FloorPlan = ({
  selectedFloor,
  apartments,
  onHover,
  onSelect,
  highlightedApartmentId,
  selectedApartmentId,
  onBack,
}) => {
  const planImage = floorImages[selectedFloor] || floor1Image;

  return (
    <div className="relative flex w-full h-full justify-center items-center overflow-hidden bg-gray-100">
      {/* Кнопка назад */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 z-20 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 shadow"
      >
        ← Powrót
      </button>

      {/* SVG слой */}
      <svg
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-auto max-w-[1400px]"
      >
        {/* фон */}
        <image
          href={planImage}
          x="0"
          y="0"
          width={VIEWBOX_W}
          height={VIEWBOX_H}
          preserveAspectRatio="xMidYMid meet"
        />

        {/* контуры квартир */}
        <g transform="translate(207, 188)">
          {apartments.map((apt) => (
            <ApartmentShape
              key={apt.id}
              apartment={apt}
              isHighlighted={apt.id === highlightedApartmentId}
              isSelected={apt.id === selectedApartmentId}
              onMouseEnter={() => onHover(apt)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onSelect(apt.id)}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default FloorPlan;
