import { faker } from '@faker-js/faker';

const FEEDBACK_TITLES = [
  'Dịch vụ in ấn rất tốt',
  'Cần cải thiện thời gian chờ đợi',
  'Chất lượng in tuyệt vời',
  'Nhân viên phục vụ thân thiện',
  'Gặp vấn đề khi in tài liệu',
  'Máy in hoạt động không ổn định',
  'Rất hài lòng với dịch vụ',
  'Thời gian chờ hơi lâu',
  'Cần thêm máy in ở khu A',
  'Giá cả hợp lý',
  'Hệ thống dễ sử dụng',
  'Chất lượng giấy in tốt',
  'Cần cải thiện giao diện người dùng',
  'Quá trình thanh toán đơn giản'
];

const FEEDBACK_CONTENTS = [
  'Tôi rất hài lòng với chất lượng in ấn. Các trang tài liệu được in rõ ràng, sắc nét. Nhân viên hỗ trợ nhiệt tình và thân thiện.',
  'Thời gian chờ đợi hơi lâu, đặc biệt là vào giờ cao điểm. Mong trường có thể bổ sung thêm máy in để giảm thời gian chờ.',
  'Hệ thống hoạt động ổn định, dễ sử dụng. Tuy nhiên, đôi khi gặp lỗi khi tải file lên, cần khắc phục vấn đề này.',
  'Chất lượng in rất tốt, giá cả phải chăng. Tuy nhiên, một số máy in thường xuyên hết mực, cần được kiểm tra thường xuyên hơn.',
  'Rất tiện lợi khi có thể in tài liệu từ xa. Hệ thống thanh toán online hoạt động trơn tru. Mong có thêm nhiều điểm in ở các tòa nhà khác.',
  'Nhân viên hỗ trợ rất nhiệt tình và chuyên nghiệp. Tuy nhiên, cần cải thiện tốc độ xử lý khi có nhiều người cùng in.',
  'Giao diện người dùng dễ sử dụng, nhưng đôi khi bị treo khi tải file lớn. Cần tối ưu hóa hệ thống để xử lý file dung lượng cao.',
  'Dịch vụ in ấn rất chuyên nghiệp. Tài liệu được in đúng theo yêu cầu về màu sắc và định dạng. Tuy nhiên, giá in màu hơi cao.',
  'Hệ thống thường xuyên bảo trì vào giờ cao điểm, gây khó khăn cho việc in tài liệu gấp. Mong có thông báo bảo trì trước.',
  'Chất lượng giấy in tốt, không bị nhăn hay mờ. Tuy nhiên, đôi khi máy in bị kẹt giấy, cần có hướng dẫn xử lý rõ ràng hơn.',
  'Rất hài lòng với tính năng xem trước bản in. Giúp tiết kiệm giấy và tránh in sai. Mong phát triển thêm tính năng chỉnh sửa trực tiếp.',
  'Hệ thống thanh toán đa dạng và tiện lợi. Tuy nhiên, cần có thêm tùy chọn in hai mặt tự động để tiết kiệm giấy.',
  'Thời gian xử lý đơn hàng in nhanh chóng. Tuy nhiên, cần có thêm thông báo khi tài liệu đã in xong.',
  'Chất lượng phục vụ tốt, nhân viên thân thiện. Mong có thêm khuyến mãi cho sinh viên in số lượng lớn.'
];

const createFeedback = (userId) => {
  return {
    user_id: userId,
    title: faker.helpers.arrayElement(FEEDBACK_TITLES),
    content: faker.helpers.arrayElement(FEEDBACK_CONTENTS),
    rating: faker.number.int({ min: 1, max: 5 }),
    submission_date: faker.date.recent(),
    created_at: faker.date.past(),
    updated_at: faker.date.recent()
  };
};

export default createFeedback;
