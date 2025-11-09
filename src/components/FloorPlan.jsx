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
  const isHighRise = selectedFloor >= 5;
  const transform = isHighRise
    ? FLOOR_TRANSFORMS.highRise
    : FLOOR_TRANSFORMS.lowRise;

  return (
    <div className="absolute inset-0">
      <button
        onClick={resetAll}
        className="fixed md:absolute top-3 left-3 z-20 px-3 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 active:scale-95 transition cursor-pointer"
      >
        Назад
      </button>

      <svg
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
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
