
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';


const vietnameseFirstNames = [
  'Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ', 'Võ', 'Đặng',
  'Bùi', 'Đỗ', 'Hồ', 'Ngô', 'Dương', 'Lý'
];


const vietnameseMiddleNames = [
  'Văn', 'Thị', 'Đức', 'Minh', 'Hoàng', 'Hữu', 'Đình', 'Xuân', 'Quang', 'Thành'
];

const vietnameseLastNames = [
  'An', 'Bình', 'Cường', 'Dũng', 'Đức', 'Hùng', 'Huy', 'Khang', 'Long', 'Minh',
  'Nam', 'Phúc', 'Quân', 'Thắng', 'Thiện', 'Trung', 'Tuấn', 'Việt', 'Vũ', 'Xuân'
];

const generateVietnameseName = () => {
  const firstName = faker.helpers.arrayElement(vietnameseFirstNames);
  const middleName = faker.helpers.arrayElement(vietnameseMiddleNames);
  const lastName = faker.helpers.arrayElement(vietnameseLastNames);
  return `${firstName} ${middleName} ${lastName}`;
};

const createSPSO = (index) => {
  const password = 'spso123';
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);


  const username = `spso${String(index + 1).padStart(2, '0')}`;


  const phoneNumber = '0' + faker.string.numeric(9);

  const spso = {
    username,
    password: hashedPassword,
    full_name: generateVietnameseName(),
    email: `${username}@hcmut.edu.vn`,
    phone_number: phoneNumber,
    date_of_birth: faker.date.birthdate({ min: 25, max: 65, mode: 'age' }),
    created_at: faker.date.past(),
    updated_at: faker.date.recent()
  };
  return spso;
};

export default createSPSO;
