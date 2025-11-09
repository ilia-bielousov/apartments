// src/store/useApartmentsStore.js
import { create } from 'zustand';
import { floors, apartments } from '../data/mockData';

const RU_AVAILABLE = '\u0434\u043e\u0441\u0442\u0443\u043f\u043d\u043e';
const RU_RESERVED = '\u0437\u0430\u0440\u0435\u0437\u0435\u0440\u0432\u0438\u0440\u043e\u0432\u0430\u043d\u043e';
const RU_SOLD = '\u043f\u0440\u043e\u0434\u0430\u043d\u043e';

export const INITIAL_FILTERS = {
  status: [RU_AVAILABLE, RU_RESERVED, RU_SOLD],
  rooms: 5,
  area: 162,
  price: 3.5,
};

export const AVAILABLE_STATUSES = [RU_AVAILABLE, RU_SOLD, RU_RESERVED];

const cloneFilters = (filters = INITIAL_FILTERS) => ({
  status: [...filters.status],
  rooms: filters.rooms,
  area: filters.area,
  price: filters.price,
});

const apartmentsByFloor = apartments.reduce((acc, apartment) => {
  if (!acc[apartment.floor]) {
    acc[apartment.floor] = [];
  }
  acc[apartment.floor].push(apartment);
  return acc;
}, {});

const filtersKey = (filters) => {
  const normalizedStatuses = [...filters.status].sort().join('|');
  return `${normalizedStatuses}-${filters.rooms}-${filters.area}-${filters.price}`;
};

export const useApartmentsStore = create((set) => ({
  floors,
  selectedFloor: null,
  highlightedApartmentId: null,
  selectedApartmentId: null,
  filters: cloneFilters(),
  selectFloor: (floorId) =>
    set({
      selectedFloor: floorId,
      selectedApartmentId: null,
      highlightedApartmentId: null,
    }),
  selectApartment: (id) =>
    set((state) => ({
      selectedApartmentId: state.selectedApartmentId === id ? null : id,
      highlightedApartmentId: null,
    })),
  highlightApartment: (id) =>
    set((state) => {
      if (id === null) {
        return { highlightedApartmentId: null };
      }
      if (id === state.selectedApartmentId) {
        return {};
      }
      return { highlightedApartmentId: id };
    }),
  setFilters: (filters) => set({ filters: cloneFilters(filters) }),
  resetFilters: () =>
    set({
      filters: cloneFilters(),
      highlightedApartmentId: null,
    }),
  resetAll: () =>
    set({
      selectedFloor: null,
      highlightedApartmentId: null,
      selectedApartmentId: null,
      filters: cloneFilters(),
    }),
}));

export const selectSelectedApartment = (() => {
  let lastSelectedId = null;
  let lastApartment = null;

  return (state) => {
    if (state.selectedApartmentId === lastSelectedId) {
      return lastApartment;
    }
    lastSelectedId = state.selectedApartmentId;
    if (!state.selectedApartmentId) {
      lastApartment = null;
    } else {
      lastApartment =
        apartments.find((apt) => apt.id === state.selectedApartmentId) ?? null;
    }
    return lastApartment;
  };
})();

export const selectDynamicMaxLimits = (() => {
  let lastFloor;
  let lastResult = { maxArea: 0, maxPrice: 0 };

  return (state) => {
    if (state.selectedFloor === lastFloor) {
      return lastResult;
    }
    const list = apartmentsByFloor[state.selectedFloor] || [];
    if (!list.length) {
      lastFloor = state.selectedFloor;
      lastResult = { maxArea: 0, maxPrice: 0 };
      return lastResult;
    }
    const maxArea = Math.max(...list.map((a) => a.area));
    const maxPrice = Math.max(...list.map((a) => a.price));
    lastFloor = state.selectedFloor;
    lastResult = {
      maxArea: Math.ceil(maxArea),
      maxPrice: Math.ceil(maxPrice / 100000) / 10,
    };
    return lastResult;
  };
})();

export const selectFilteredApartments = (() => {
  let lastFloor;
  let lastFiltersSignature = '';
  let lastResult = [];

  return (state) => {
    const floor = state.selectedFloor;
    const signature = filtersKey(state.filters);

    if (floor === lastFloor && signature === lastFiltersSignature) {
      return lastResult;
    }

    const baseList = apartmentsByFloor[floor] || [];
    const nextResult = baseList.filter((apt) => {
      const priceInMillions = apt.price / 1_000_000;
      return (
        state.filters.status.includes(apt.status) &&
        apt.rooms <= state.filters.rooms &&
        apt.area <= state.filters.area &&
        priceInMillions <= state.filters.price
      );
    });

    lastFloor = floor;
    lastFiltersSignature = signature;
    lastResult = nextResult;
    return lastResult;
  };
})();
