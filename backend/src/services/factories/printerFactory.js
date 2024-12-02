import { faker } from '@faker-js/faker';

const PRINTER_BRANDS = ['HP', 'Canon', 'Epson', 'Brother', 'Xerox'];

const CAMPUSES = [
  {
    name: 'Cơ sở Lý Thường Kiệt',
    address: '268 Lý Thường Kiệt, Phường 14, Quận 10, TP. HCM',
    buildings: ['A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'B2', 'B3', 'B4', 'B6', 'B9', 'B11', 'C1', 'C3']
  },
  {
    name: 'Cơ sở Dĩ An',
    address: 'Khu phố Tân Lập, Phường Đông Hòa, TP. Dĩ An, Tỉnh Bình Dương',
    buildings: ['H1', 'H2', 'H3', 'H6']
  }
];

const STATES = ['active', 'inactive', 'maintenance'];

const createPrinter = () => {
  const brand = faker.helpers.arrayElement(PRINTER_BRANDS);
  const campus = faker.helpers.arrayElement(CAMPUSES);
  const building = faker.helpers.arrayElement(campus.buildings);
  return {
    name: `${brand} Printer ${faker.string.alphanumeric(4)}`,
    brand,
    model: `${brand}-${faker.string.alphanumeric(6)}`,
    state: faker.helpers.arrayElement(STATES),
    campus: campus.name,
    campus_address: campus.address,
    building: faker.helpers.arrayElement(campus.buildings),
    room: `${building}-${faker.number.int({ min: 100, max: 899 })}`,
    created_at: faker.date.past(),
    updated_at: faker.date.recent()
  };
};

export default createPrinter;
