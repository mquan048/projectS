// src/services/factories/pageOrderFactory.js
import { faker } from '@faker-js/faker';

const createPageOrder = (userId) => {
  const pages = faker.number.int({ min: 1, max: 100 });

  return {
    user_id: userId,
    number_of_a4_pages: pages,
    transaction_time: faker.date.recent(),
    o_state: faker.helpers.arrayElement(['pending', 'completed', 'failed']),
    price: pages * 1000, // 1000 VND per page
    created_at: faker.date.past(),
    updated_at: faker.date.recent()
  };
};

export default createPageOrder;
