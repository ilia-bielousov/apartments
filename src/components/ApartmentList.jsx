import React, { useRef, useEffect } from 'react';
import ApartmentListCard from './ApartmentListCard.jsx';
import {
  useApartmentsStore,
  selectFilteredApartments,
} from '../store/useApartmentsStore';

const ApartmentList = () => {
  const apartments = useApartmentsStore(selectFilteredApartments);
  const highlightedApartmentId = useApartmentsStore(
    (state) => state.highlightedApartmentId,
  );
  const selectedApartmentId = useApartmentsStore(
    (state) => state.selectedApartmentId,
  );
  const highlightApartment = useApartmentsStore(
    (state) => state.highlightApartment,
  );
  const selectApartment = useApartmentsStore((state) => state.selectApartment);

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
        Список квартир{' '}
        <span className="text-blue-600">(Найдено {apartments.length})</span>
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
              onMouseEnter={() => highlightApartment(apartment.id)}
              onMouseLeave={() => highlightApartment(null)}
              onClick={() => selectApartment(apartment.id)}
            />
          ))
        ) : (
          <div className="p-5 mt-5 bg-amber-50 border border-amber-400 rounded-md text-amber-800 text-center">
            Нет свободных квартир.
          </div>
        )}
      </div>
    </div>
  );
};

export default ApartmentList;
