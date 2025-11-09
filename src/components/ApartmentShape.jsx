import React from 'react';

const RU_AVAILABLE = '\u0434\u043e\u0441\u0442\u0443\u043f\u043d\u043e';
const RU_RESERVED = '\u0437\u0430\u0440\u0435\u0437\u0435\u0440\u0432\u0438\u0440\u043e\u0432\u0430\u043d\u043e';
const RU_SOLD = '\u043f\u0440\u043e\u0434\u0430\u043d\u043e';

const STATUS_COLOR_MAP = {
  available: 'rgba(80, 211, 120, 0.7)',
  reserved: 'rgba(240, 180, 90, 0.7)',
  sold: 'rgba(211, 80, 80, 0.7)',
  [RU_AVAILABLE]: 'rgba(80, 211, 120, 0.7)',
  [RU_RESERVED]: 'rgba(240, 180, 90, 0.7)',
  [RU_SOLD]: 'rgba(211, 80, 80, 0.7)',
};

const INTERACTIVE_STATUSES = new Set([
  'available',
  'reserved',
  RU_AVAILABLE,
  RU_RESERVED,
]);

const ApartmentShape = ({
  apartment,
  onMouseEnter,
  onMouseLeave,
  onClick,
  isHighlighted,
  isSelected,
}) => {
  const { status, svg_shape } = apartment;

  const getFillColor = () =>
    STATUS_COLOR_MAP[status] || 'rgba(150, 150, 150, 0.5)';

  const isInteractive = INTERACTIVE_STATUSES.has(status);

  const handleHover = (apartmentId) => {
    const el = document.getElementById(`card-${apartmentId}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const getStrokeStyle = () => {
    if (isSelected) return '#007bff';
    if (isHighlighted) return '#ff9900';
    return '#333';
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

  const commonProps = {
    fill: getFillColor(),
    stroke: getStrokeStyle(),
    strokeWidth: getStrokeWidth(),
    className: `transition-all duration-200 ${
      isInteractive
        ? 'hover:fill-opacity-90 hover:stroke-black hover:stroke-[2px]'
        : ''
    }`,
    style: {
      cursor: isInteractive ? 'pointer' : 'not-allowed',
      filter: isSelected
        ? 'drop-shadow(0 0 6px rgba(0,123,255,0.8))'
        : isHighlighted
        ? 'drop-shadow(0 0 6px rgba(255,153,0,0.8))'
        : 'none',
    },
    ...hoverProps,
  };

  if (svg_shape.type === 'path') {
    return <path d={svg_shape.d} transform={svg_shape.transform} {...commonProps} />;
  }

  if (svg_shape.type === 'rect') {
    return (
      <rect
        x={svg_shape.x}
        y={svg_shape.y}
        width={svg_shape.width}
        height={svg_shape.height}
        {...commonProps}
      />
    );
  }

  return null;
};

export default ApartmentShape;
