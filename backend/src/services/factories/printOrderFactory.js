// src/services/factories/printOrderFactory.js
import { faker } from '@faker-js/faker';

const createPrintOrder = (userId, documentId, printerId) => {
  const startTime = faker.date.recent();

  return {
    user_id: userId,
    document_id: documentId,
    printer_id: printerId,
    start_time: startTime,
    end_time: faker.date.between({ from: startTime, to: new Date() }),
    sided: faker.helpers.arrayElement(['one-sided', 'two-sided']),
    paper_size: faker.helpers.arrayElement(['A4', 'A3']),
    paper_orientation: faker.helpers.arrayElement(['portrait', 'landscape']),
    pages_per_sheet: faker.helpers.arrayElement([1, 2, 4]),
    number_of_copies: faker.number.int({ min: 1, max: 10 }),
    scale: faker.number.int({ min: 50, max: 100 }),
    p_state: faker.helpers.arrayElement(['pending', 'printing', 'completed', 'failed']),
    created_at: faker.date.past(),
    updated_at: faker.date.recent()
  };
};

export default createPrintOrder;
