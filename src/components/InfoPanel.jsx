import React from 'react';

const InfoPanel = ({ apartment, onClose }) => {
  const { id, status, price, area, rooms, balcony_area, pdf_url } = apartment;

  const getStatusLabel = (s) => {
    switch (s) {
      case 'available':
        return { label: 'Dostępne', color: '#16a34a' };
      case 'sold':
        return { label: 'Sprzedane', color: '#dc2626' };
      case 'reserved':
        return { label: 'Zarezerwowane', color: '#d97706' };
      default:
        return { label: 'Nieznany', color: '#737373' };
    }
  };

  const statusInfo = getStatusLabel(status);

  return (
    <div className="flex flex-col h-full p-4 bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center pb-2 border-b-2 border-blue-600 mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Mieszkanie {id}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-red-600 text-lg transition-colors"
        >
          ✖️ Zamknij
        </button>
      </div>

      {/* Status */}
      <div
        className="text-white font-semibold rounded-md text-center py-2 mb-4"
        style={{ backgroundColor: statusInfo.color }}
      >
        {statusInfo.label}
      </div>

      {/* Placeholder image */}
      <div className="h-[200px] bg-gray-200 border border-dashed border-gray-400 flex flex-col items-center justify-center text-gray-500 mb-5 rounded">
        <p>Tutaj będzie plan mieszkania</p>
      </div>

      {/* Details */}
      <div className="mb-5">
        <h4 className="text-gray-700 border-b border-gray-200 pb-1 mb-3 font-medium">
          Szczegóły
        </h4>
        <div className="space-y-2 text-[15px]">
          <div className="flex justify-between">
            <span className="text-gray-600">Cena:</span>
            <strong className="text-gray-800">
              {price.toLocaleString('pl-PL')} zł
            </strong>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Powierzchnia:</span>
            <strong className="text-gray-800">{area} m²</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Pokoje:</span>
            <strong className="text-gray-800">{rooms}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Balkon/Taras:</span>
            <strong className="text-gray-800">
              {balcony_area > 0 ? `${balcony_area} m²` : 'Brak'}
            </strong>
          </div>
        </div>
      </div>

      {/* Actions */}
      <a
        href={pdf_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full py-2 rounded-md text-center font-semibold bg-blue-600 text-white border border-blue-600 hover:bg-blue-700 transition-colors"
      >
        Pobierz Kartę Mieszkania (PDF)
      </a>

      <button className="block w-full py-2 rounded-md text-blue-600 border border-blue-600 bg-white hover:bg-blue-50 font-semibold mt-3 transition-colors">
        Zarezerwuj online
      </button>
    </div>
  );
};

export default InfoPanel;
