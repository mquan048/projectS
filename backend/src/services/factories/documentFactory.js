import { faker } from '@faker-js/faker';

const FILE_TYPES = ['pdf', 'doc', 'docx'];
const DOCUMENT_TYPES = [
  'Đề thi giữa kỳ',
  'Đề thi cuối kỳ',
  'Bài giảng',
  'Giáo trình',
  'Tài liệu thực hành',
  'Bài tập',
  'Đề cương môn học',
  'Slide bài giảng'
];

const SUBJECTS = [

  'Lập trình web',
  'Cơ sở dữ liệu',
  'Kỹ thuật lập trình',
  'Cấu trúc dữ liệu và giải thuật',
  'Mạng máy tính',
  'Hệ điều hành',
  'Trí tuệ nhân tạo',
  'An toàn thông tin',
  'Công nghệ phần mềm',
  'Kiến trúc máy tính',
  'Phân tích thiết kế hệ thống',
  'Lập trình hướng đối tượng',
  'Phát triển ứng dụng di động',
  'Điện toán đám mây',
  'Internet vạn vật',
  'Khai phá dữ liệu',
  'Học máy',
  'Xử lý ảnh',
  'Thị giác máy tính',


  'Toán rời rạc',
  'Xác suất thống kê',
  'Đại số tuyến tính',
  'Giải tích 1',
  'Giải tích 2',
  'Phương pháp tính',
  'Logic học',
  'Tối ưu hóa',
  'Lý thuyết số',


  'Mạch điện tử',
  'Kỹ thuật số',
  'Vi xử lý',
  'Điện tử công suất',
  'Đo lường điện',
  'Hệ thống nhúng',
  'Thiết kế VLSI',
  'Xử lý tín hiệu số',
  'Điều khiển tự động',


  'Cơ học kỹ thuật',
  'Vẽ kỹ thuật',
  'Nguyên lý máy',
  'Chi tiết máy',
  'Công nghệ chế tạo máy',
  'Vật liệu kỹ thuật',
  'CAD/CAM-CNC',
  'Đồ án thiết kế máy',
  'Công nghệ kim loại',


  'Kinh tế vĩ mô',
  'Kinh tế vi mô',
  'Nguyên lý kế toán',
  'Tài chính tiền tệ',
  'Marketing căn bản',
  'Quản trị học',
  'Kinh tế quốc tế',
  'Thương mại điện tử',
  'Phân tích tài chính',


  'Tiếng Anh cơ bản',
  'Tiếng Anh chuyên ngành',
  'Ngữ pháp nâng cao',
  'Kỹ năng viết',
  'Kỹ năng thuyết trình',


  'Triết học Mác-Lênin',
  'Kinh tế chính trị Mác-Lênin',
  'Tư tưởng Hồ Chí Minh',
  'Pháp luật đại cương',
  'Vật lý đại cương',
  'Hóa đại cương',
  'Quốc phòng - An ninh',
  'Giáo dục thể chất'
];

const SEMESTERS = [
  'HK1-2023-2024',
  'HK2-2023-2024',
  'HK1-2024-2025',
  'HK2-2024-2025'
];

const createDocument = (userId) => {
  const documentType = faker.helpers.arrayElement(DOCUMENT_TYPES);
  const subject = faker.helpers.arrayElement(SUBJECTS);
  const semester = faker.helpers.arrayElement(SEMESTERS);
  const name = `${documentType} ${subject} ${semester}`;
  const number_of_pages = faker.number.int({ min: 1, max: 100 });
  const minSize = number_of_pages * 50 * 1024;
  const maxSize = number_of_pages * 200 * 1024;
  const fileSize = faker.number.int({ min: minSize, max: maxSize });
  return {

    document_id: faker.string.uuid(),
    name,
    file_type: faker.helpers.arrayElement(FILE_TYPES),
    number_of_pages: number_of_pages,
    file_size: fileSize,
    user_id: userId,
    created_at: faker.date.past(),
    updated_at: faker.date.recent()
  };
};

export default createDocument;
