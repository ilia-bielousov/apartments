import React, { forwardRef } from 'react';

const ApartmentListCard = forwardRef(
  (
    { apartment, onMouseEnter, onMouseLeave, onClick, isHighlighted, isSelected },
    ref
  ) => {
    const { id, status, price, area, rooms, balcony_area, pdf_url } = apartment;

    const getStatusLabel = () => {
      switch (status) {
        case 'доступно':
          return { label: 'доступно', color: '#16a34a' };
        case 'продано':
          return { label: 'продано', color: '#dc2626' };
        case 'зарезервировано':
          return { label: 'зарезервировано', color: '#d97706' };
        default:
          return { label: 'Неизвестный', color: '#737373' };
      }
    };

    const statusInfo = getStatusLabel(status);

    let borderColor = 'border-gray-200';
    let glow = 'shadow-sm';
    let background = 'bg-white';

    if (isHighlighted) {
      borderColor = 'border-amber-400';
      glow = 'shadow-[0_0_12px_rgba(251,191,36,0.8)]';
    }

    if (isSelected) {
      borderColor = 'border-blue-500';
      glow = 'shadow-[0_0_14px_rgba(59,130,246,0.8)]';
      background = 'bg-blue-50';
    }

    return (
      <div
        id={`card-${id}`}
        ref={ref}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`border ${borderColor} ${background} ${glow} rounded-lg p-4 transition-all duration-200 hover:shadow-lg hover:border-blue-400 cursor-pointer`}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-100 pb-2 mb-3">
          <h4 className="text-blue-600 font-semibold text-base">
            Квартира {id}
          </h4>
          <span
            className="text-white text-xs font-bold px-2 py-1 rounded"
            style={{ backgroundColor: statusInfo.color }}
          >
            {statusInfo.label}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-1 mb-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Цена:</span>
            <span className="font-bold text-blue-600">
              {price.toLocaleString('pl-PL')} зт
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Площадь:</span>
            <span className="font-medium text-gray-800">{area} м²</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Комнаты:</span>
            <span className="font-medium text-gray-800">{rooms}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Балкон:</span>
            <span className="font-medium text-gray-800">
              {balcony_area > 0 ? `${balcony_area} м²` : 'Нет'}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button className="flex-1 py-2 text-sm border border-blue-500 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded transition-colors">
            Увидеть план
          </button>
          <a
            href={pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded text-center transition-colors"
          >
            Скачать план PDF
          </a>
        </div>
      </div>
    );
  }
);

export default ApartmentListCard;
