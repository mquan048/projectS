import { faker } from '@faker-js/faker';

const NOTIFICATION_TEMPLATES = [
  'Đơn in của bạn đã được tạo thành công',
  'Đơn in của bạn đang được xử lý',
  'Đơn in của bạn đã hoàn thành và sẵn sàng để lấy',
  'Đơn in của bạn đã bị hủy',
  'Đơn in của bạn gặp lỗi trong quá trình xử lý'
];

const createNotification = (userId) => {
  return {
    user_id: userId,
    content: faker.helpers.arrayElement(NOTIFICATION_TEMPLATES),
    sent_time: faker.date.recent(),
    status: faker.helpers.arrayElement(['unread', 'read']),
    created_at: faker.date.past(),
    updated_at: faker.date.recent()
  };
};

export default createNotification;
