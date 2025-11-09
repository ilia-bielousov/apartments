// Apartments dataset: 7 floors, mixed layouts

const floorShapeLayers = [
  {
    id: 7,
    svg_shape: {
      type: "path",
      d: "M246.75 83.4853V81.0588M246.75 81.0588V0.5H621.848L692.772 50V81.5441L712.751 91.7353L713.75 114.059L692.273 132.5L690.775 111.632L620.35 83.9706H246.75V81.0588Z",
    },
  },
  {
    id: 6,
    svg_shape: {
      type: "path",
      d: "M246.5 143.385V142.882M246.5 142.882V82.5H620.305L690.969 111.182L692.505 132.315L713.5 140.366V161.5H691.481L619.793 143.889H246.742L246.5 142.882Z",
    },
  },
  {
    id: 5,
    svg_shape: {
      type: "path",
      d: "M91.5 180.816V197.962H551.63L713.5 202.5V188.885L692.017 185.859V160.645L622.073 143.5H246.5V180.816L91.5 180.816Z",
    },
  },
  {
    id: 4,
    svg_shape: {
      type: "path",
      d: "M91.5 198V283H551.5L697.5 258.5H713V236L692.5 234V210L713 209V202.5L551.5 198H91.5Z",
    },
  },
  {
    id: 3,
    svg_shape: {
      type: "path",
      d: "M91.5 283L90.5 359.5H551.5L713 300V283.5H693.5V261L713 258.5H697.5L551.5 283H91.5Z",
    },
  },
  {
    id: 2,
    svg_shape: {
      type: "path",
      d: "M90.5 359.5V432L552 433L713 332.5L697.5 310.5L713 307V300L551.5 359.5H90.5Z",
    },
  },
  {
    id: 1,
    svg_shape: {
      type: "path",
      d: "M19.5 495L0.5 501.5V502L597.5 500L735.5 383L727.5 369L728 347H721.5V339.5H713V333L552 433L90.5 432V467L19.5 488.5V495Z",
    },
  },
];

const floors = floorShapeLayers
  .map((layer) => ({
    ...layer,
    label: `Этаж ${layer.id}`,
  }))
  .sort((a, b) => a.id - b.id);

const BASE_LOW_RISE_LAYOUT = [
  {
    status: "доступно",
    rooms: 3,
    area: 84,
    price: 1480000,
    balcony_area: 6,
    d: "M303.5 153.597H0.5V422.597H303.5V153.597Z",
  },
  {
    status: "доступно",
    rooms: 3,
    area: 88,
    price: 1530000,
    balcony_area: 7,
    d: "M511.5 153.597H303.5V422.597H511.5V153.597Z",
  },
  {
    status: "доступно",
    rooms: 4,
    area: 96,
    price: 1670000,
    balcony_area: 10,
    d: "M727.5 153.597H511.5V422.597H727.5V153.597Z",
  },
  {
    status: "продано",
    rooms: 3,
    area: 90,
    price: 1580000,
    balcony_area: 6,
    d: "M889.5 153.597H727.5V422.597H889.5V153.597Z",
  },
  {
    status: "доступно",
    rooms: 4,
    area: 104,
    price: 1820000,
    balcony_area: 11,
    d: "M1104.5 153.597H889.5V422.597H1104.5V153.597Z",
  },
  {
    status: "доступно",
    rooms: 3,
    area: 92,
    price: 1490000,
    balcony_area: 5,
    d: "M0.5 422.597V757.597H303.5V486.597H163.269V422.597H0.5Z",
  },
  {
    status: "продано",
    rooms: 2,
    area: 74,
    price: 1320000,
    balcony_area: 4,
    d: "M303.5 486.597V757.597H511.5V538.37V486.597H415.236H303.5Z",
  },
  {
    status: "зарезервировано",
    rooms: 3,
    area: 86,
    price: 1410000,
    balcony_area: 5,
    d: "M511.5 486.597V757.597H727.5V538.37V486.597H627.533H511.5Z",
  },
  {
    status: "доступно",
    rooms: 3,
    area: 88,
    price: 1450000,
    balcony_area: 6,
    d: "M727.5 486.597V757.597H935.5V538.37V486.597H839.236H727.5Z",
  },
  {
    status: "доступно",
    rooms: 3,
    area: 94,
    price: 1510000,
    balcony_area: 7,
    d: "M935.5 486.597V757.597H1137.5V538.37V486.597H1044.01H935.5Z",
  },
  {
    status: "доступно",
    rooms: 4,
    area: 118,
    price: 1890000,
    balcony_area: 12,
    d: "M1137.5 486.597V757.597L1306.5 722.597L1250.5 462.597L1137.5 486.597Z",
  },
  {
    status: "доступно",
    rooms: 4,
    area: 126,
    price: 1980000,
    balcony_area: 14,
    d: "M1250.5 462.597L1306.5 722.597L1505 682.597L1449.5 420.597L1250.5 462.597Z",
  },
  {
    status: "доступно",
    rooms: 5,
    area: 135,
    price: 2120000,
    balcony_area: 16,
    d: "M1449 420.597L1505.5 682.597L1704 641.597L1648.5 379.597L1449 420.597Z",
  },
  {
    status: "доступно",
    rooms: 5,
    area: 162,
    price: 2380000,
    balcony_area: 20,
    d: "M1648.5 379.597L1704 641.097L1934 587.097L1874 297.597L1770.5 320.097L1777 353.597L1648.5 379.597Z",
  },
  {
    status: "продано",
    rooms: 4,
    area: 148,
    price: 2260000,
    balcony_area: 14,
    d: "M1352.5 376.097L1296.5 110.597L1579.5 51.0969L1636 315.597L1352.5 376.097Z",
  },
  {
    status: "доступно",
    rooms: 4,
    area: 140,
    price: 2210000,
    balcony_area: 13,
    d: "M1636 315.597L1579.5 51.0969L1808 0.596893C1830.06 103.891 1851.94 194.303 1874 297.597L1770.5 320.097L1763.5 288.597L1636 315.597Z",
  },
];

const LOW_RISE_FLOORS = [1, 2, 3, 4];

const duplicatedLowRiseApartments = LOW_RISE_FLOORS.flatMap((floor) =>
  BASE_LOW_RISE_LAYOUT.map((unit, index) => ({
    id: `APT-${floor}-${String(index + 1).padStart(2, "0")}`,
    floor,
    status: unit.status,
    area: unit.area,
    rooms: unit.rooms,
    price: unit.price,
    balcony_area: unit.balcony_area,
    pdf_url: "#",
    svg_shape: { type: "path", d: unit.d },
  }))
);

const floor5to7Layout = [
  {
    rooms: 3,
    area: 80,
    price: 1450000,
    balcony_area: 6,
    d: "M216.5 153.597H0.5V757.597H216.5V153.597Z",
  },
  {
    rooms: 3,
    area: 84,
    price: 1500000,
    balcony_area: 6,
    d: "M378.5 153.597H216.5V422.597H378.5V153.597Z",
  },
  {
    rooms: 3,
    area: 88,
    price: 1550000,
    balcony_area: 7,
    d: "M593.5 153.597H378.5V422.597H593.5V153.597Z",
  },
  {
    rooms: 2,
    area: 72,
    price: 1300000,
    balcony_area: 4,
    d: "M216.5 486.597V757.597H424.5V538.37V486.597H328.236H216.5Z",
  },
  {
    rooms: 2,
    area: 76,
    price: 1350000,
    balcony_area: 4,
    d: "M424.5 486.597V757.597H626.5V538.37V486.597H533.012H424.5Z",
  },
  {
    rooms: 3,
    area: 96,
    price: 1650000,
    balcony_area: 8,
    d: "M626.5 486.597V757.597L795.5 722.597L739.5 462.597L626.5 486.597Z",
  },
  {
    rooms: 4,
    area: 112,
    price: 1820000,
    balcony_area: 10,
    d: "M739.5 462.597L795.5 722.597L994 682.597L938.5 420.597L739.5 462.597Z",
  },
  {
    rooms: 4,
    area: 124,
    price: 1960000,
    balcony_area: 12,
    d: "M938 420.597L994.5 682.597L1193 641.597L1137.5 379.597L938 420.597Z",
  },
  {
    rooms: 5,
    area: 145,
    price: 2150000,
    balcony_area: 15,
    d: "M1137.5 379.597L1193 641.097L1423 587.097L1363 297.597L1259.5 320.097L1266 353.597L1137.5 379.597Z",
  },
  {
    rooms: 4,
    area: 132,
    price: 2020000,
    balcony_area: 13,
    d: "M841.5 376.097L785.5 110.597L1068.5 51.0969L1125 315.597L841.5 376.097Z",
  },
  {
    rooms: 4,
    area: 140,
    price: 2100000,
    balcony_area: 14,
    d: "M1125 315.597L1068.5 51.0969L1297 0.596924C1319.06 103.891 1340.94 194.303 1363 297.597L1259.5 320.097L1252.5 288.597L1125 315.597Z",
  },
];

const HIGH_RISE_FLOORS = [5, 6, 7];

const highRiseApartments = HIGH_RISE_FLOORS.flatMap((floor) =>
  floor5to7Layout.map((unit, index) => ({
    id: `APT-${floor}-${String(index + 1).padStart(2, "0")}`,
    floor,
    status: "доступно",
    area: unit.area,
    rooms: unit.rooms,
    price: unit.price,
    balcony_area: unit.balcony_area,
    pdf_url: "#",
    svg_shape: { type: "path", d: unit.d },
  }))
);

const apartments = [...duplicatedLowRiseApartments, ...highRiseApartments];

export { floors, apartments };
