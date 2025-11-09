import React from 'react';
import {
  useApartmentsStore,
  selectSelectedApartment,
} from '../store/useApartmentsStore';

const InfoPanel = () => {
  const apartment = useApartmentsStore(selectSelectedApartment);
  const selectApartment = useApartmentsStore((state) => state.selectApartment);

  if (!apartment) {
    return null;
  }

  const { id, status, price, area, rooms, balcony_area, pdf_url } = apartment;

  const getStatusLabel = (s) => {
    switch (s) {
      case 'available':
        return { label: 'доступно', color: '#16a34a' };
      case 'sold':
        return { label: 'продано', color: '#dc2626' };
      case 'reserved':
        return { label: 'зарезервировано', color: '#d97706' };
      default:
        return { label: 'Неизвестный', color: '#737373' };
    }
  };

  const statusInfo = getStatusLabel(status);

  return (
    <div className="flex flex-col h-full p-4 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center pb-2 border-b-2 border-blue-600 mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Mieszkanie {id}
        </h2>
        <button
          onClick={() => selectApartment(null)}
          className="text-gray-500 hover:text-red-600 text-lg transition-colors"
        >
          Закрыть
        </button>
      </div>

      <div
        className="text-white font-semibold rounded-md text-center py-2 mb-4"
        style={{ backgroundColor: statusInfo.color }}
      >
        {statusInfo.label}
      </div>

      <div className="h-[200px] bg-gray-200 border border-dashed border-gray-400 flex flex-col items-center justify-center text-gray-500 mb-5 rounded">
        <p>Здесь будет план</p>
      </div>

      <div className="mb-5">
        <h4 className="text-gray-700 border-b border-gray-200 pb-1 mb-3 font-medium">
          Подробности
        </h4>
        <div className="space-y-2 text-[15px]">
          <div className="flex justify-between">
            <span className="text-gray-600">Cena:</span>
            <strong className="text-gray-800">
              {price.toLocaleString('pl-PL')} z�'
            </strong>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Площадь:</span>
            <strong className="text-gray-800">{area} м<sup>2</sup></strong>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Комнаты:</span>
            <strong className="text-gray-800">{rooms}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Балкон:</span>
            <strong className="text-gray-800">
              {balcony_area > 0 ? `${balcony_area} м${<sup>2</sup>}` : 'Нет'}
            </strong>
          </div>
        </div>
      </div>

      <a
        href={pdf_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full py-2 rounded-md text-center font-semibold bg-blue-600 text-white border border-blue-600 hover:bg-blue-700 transition-colors"
      >
        Скачать карту (PDF)
      </a>

      <button className="block w-full py-2 rounded-md text-blue-600 border border-blue-600 bg-white hover:bg-blue-50 font-semibold mt-3 transition-colors">
        Зарезирвировать
      </button>
    </div>
  );
};

export default InfoPanel;
