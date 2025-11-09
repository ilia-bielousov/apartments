import React from 'react';

const ApartmentShape = ({
  apartment,
  onMouseEnter,
  onMouseLeave,
  onClick,
  isHighlighted,
  isSelected,
}) => {
  const { status, svg_shape } = apartment;

  const getFillColor = () => {
    switch (status) {
      case 'sold':
        return 'rgba(211, 80, 80, 0.7)'; // красный
      case 'available':
        return 'rgba(80, 211, 120, 0.7)'; // зелёный
      case 'reserved':
        return 'rgba(240, 180, 90, 0.7)'; // оранжевый
      default:
        return 'rgba(150, 150, 150, 0.5)'; // серый
    }
  };

  const isInteractive = status === 'available' || status === 'reserved';

  const handleHover = (apartmentId) => {
    const el = document.getElementById(`card-${apartmentId}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const getStrokeStyle = () => {
    if (isSelected) return '#007bff'; // ярко-синий
    if (isHighlighted) return '#ff9900'; // ярко-оранжевый
    return '#333'; // стандарт
  };

  const getStrokeWidth = () => {
    if (isSelected) return 4;
    if (isHighlighted) return 3;
    return 1;
  };

  const hoverProps =
    isInteractive && !isSelected
      ? {
          onMouseEnter: () => {
            handleHover(apartment.id);
            if (onMouseEnter) onMouseEnter();
          },
          onMouseLeave,
          onClick,
        }
      : {};

  // path
  if (svg_shape.type === 'path') {
    return (
      <path
        d={svg_shape.d}
        transform={svg_shape.transform}
        fill={getFillColor()}
        stroke={getStrokeStyle()}
        strokeWidth={getStrokeWidth()}
        className={`transition-all duration-200 ${
          isInteractive
            ? 'hover:fill-opacity-90 hover:stroke-black hover:stroke-[2px]'
            : ''
        }`}
        style={{
          cursor: isInteractive ? 'pointer' : 'not-allowed',
          filter: isSelected
            ? 'drop-shadow(0 0 6px rgba(0,123,255,0.8))'
            : isHighlighted
            ? 'drop-shadow(0 0 6px rgba(255,153,0,0.8))'
            : 'none',
        }}
        {...hoverProps}
      />
    );
  }

  // rect
  if (svg_shape.type === 'rect') {
    return (
      <rect
        x={svg_shape.x}
        y={svg_shape.y}
        width={svg_shape.width}
        height={svg_shape.height}
        fill={getFillColor()}
        stroke={getStrokeStyle()}
        strokeWidth={getStrokeWidth()}
        className={`transition-all duration-200 ${
          isInteractive
            ? 'hover:fill-opacity-90 hover:stroke-black hover:stroke-[2px]'
            : ''
        }`}
        style={{
          cursor: isInteractive ? 'pointer' : 'not-allowed',
          filter: isSelected
            ? 'drop-shadow(0 0 6px rgba(0,123,255,0.8))'
            : isHighlighted
            ? 'drop-shadow(0 0 6px rgba(255,153,0,0.8))'
            : 'none',
        }}
        {...hoverProps}
      />
    );
  }

  return null;
};

export default ApartmentShape;
