
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';


const vietnameseFirstNames = [
  'Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ', 'Võ', 'Đặng',
  'Bùi', 'Đỗ', 'Hồ', 'Ngô', 'Dương', 'Lý'
];


const vietnameseMiddleNames = [
  'Văn', 'Thị', 'Đức', 'Minh', 'Hoàng', 'Hữu', 'Đình', 'Xuân', 'Quang', 'Thành',
  'Thanh', 'Thúy', 'Thu', 'Ngọc', 'Kim', 'Phương'
];


const vietnameseLastNames = [
  'An', 'Bình', 'Cường', 'Dũng', 'Đức', 'Hùng', 'Huy', 'Khang', 'Long', 'Minh',
  'Nam', 'Phúc', 'Quân', 'Thắng', 'Thiện', 'Trung', 'Tuấn', 'Việt', 'Vũ', 'Xuân',
  'Hương', 'Lan', 'Mai', 'Phương', 'Thảo', 'Trang', 'Vân', 'Yến'
];

const generateVietnameseName = () => {
  const firstName = faker.helpers.arrayElement(vietnameseFirstNames);
  const middleName = faker.helpers.arrayElement(vietnameseMiddleNames);
  const lastName = faker.helpers.arrayElement(vietnameseLastNames);
  return `${firstName} ${middleName} ${lastName}`;
};

const generateStudentEmail = (fullName) => {

  const removeAccents = (str) => {
    return str.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  };


  const nameParts = fullName.split(' ');
  const lastName = nameParts[nameParts.length - 1];
  const otherNames = nameParts.slice(0, -1);


  const emailPrefix = otherNames.map(name => removeAccents(name.charAt(0).toLowerCase())).join('')
    + removeAccents(lastName.toLowerCase());


  const randomNum = faker.string.numeric(6);

  return `${emailPrefix}${randomNum}@hcmut.edu.vn`;
};

const createUser = async () => {
  const hashedPassword = await bcrypt.hash('password123', 10);
  const fullName = generateVietnameseName();

  return {
    email: generateStudentEmail(fullName),
    password: hashedPassword,
    full_name: fullName,
    date_of_birth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
    available_a4_pages: faker.number.int({ min: 0, max: 100 }),
    last_modified: faker.date.past(),
    created_at: faker.date.past(),
    updated_at: faker.date.recent()
  };
};

export default createUser;
