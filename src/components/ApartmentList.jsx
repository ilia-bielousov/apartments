import React, { useRef, useEffect } from 'react';
import ApartmentListCard from './ApartmentListCard.jsx';

const ApartmentList = ({
  apartments,
  onHover,
  onSelect,
  highlightedApartmentId,
  selectedApartmentId,
}) => {
  const cardRefs = useRef({});
  const listContainerRef = useRef(null);

  useEffect(() => {
    if (selectedApartmentId) {
      const targetElement = cardRefs.current[selectedApartmentId];
      const scrollContainer = listContainerRef.current;

      if (targetElement && scrollContainer) {
        const cardTop = targetElement.offsetTop;
        const cardHeight = targetElement.offsetHeight;
        const containerScrollTop = scrollContainer.scrollTop;
        const containerHeight = scrollContainer.offsetHeight;

        if (cardTop < containerScrollTop) {
          scrollContainer.scrollTo({
            top: cardTop - 10,
            behavior: 'smooth',
          });
        } else if (cardTop + cardHeight > containerScrollTop + containerHeight) {
          scrollContainer.scrollTo({
            top: cardTop - containerHeight + cardHeight + 10,
            behavior: 'smooth',
          });
        }
      }
    }
  }, [selectedApartmentId]);

  return (
    <div className="w-full max-w-3xl mt-5 px-2">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Dostępne mieszkania{' '}
        <span className="text-blue-600">(Znaleziono: {apartments.length})</span>
      </h3>

      <div
        ref={listContainerRef}
        className="flex flex-col gap-4 overflow-y-auto max-h-[90vh] pr-2 scroll-smooth"
      >
        {apartments.length > 0 ? (
          apartments.map((apartment) => (
            <ApartmentListCard
              key={apartment.id}
              ref={(el) => (cardRefs.current[apartment.id] = el)}
              apartment={apartment}
              isHighlighted={apartment.id === highlightedApartmentId}
              isSelected={apartment.id === selectedApartmentId}
              onMouseEnter={() => onHover(apartment.id)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onSelect(apartment.id)}
            />
          ))
        ) : (
          <div className="p-5 mt-5 bg-amber-50 border border-amber-400 rounded-md text-amber-800 text-center">
            Brak dostępnych mieszkań
          </div>
        )}
      </div>
    </div>
  );
};

export default ApartmentList;
