import { React, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import axios from "axios";

const dataFake = [
  {
    name: "BTL-script - Thực hiện quản lý DA linh hoạt.pdf",
    start_time: "2024-12-01T14:18:22.123Z",
    number_of_copies: 1,
    campus: "Cơ sở Lý Thường Kiệt",
    building: "A5",
    room: "B3-258",
    number_of_pages: 5,
    p_state: "completed",
  },
  {
    name: "BTL-script - Thực hiện quản lý DA linh hoạt.pdf",
    start_time: "2024-12-01T14:07:15.701Z",
    number_of_copies: 1,
    campus: "Cơ sở Lý Thường Kiệt",
    building: "A5",
    room: "B3-258",
    number_of_pages: 5,
    p_state: "printing",
  },
  // Add more objects as needed
];

export default function History() {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [origindata, setOrigindata] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    const filterData =
      selectedStatus === "All"
        ? origindata
        : origindata.filter((item) => item.p_state === selectedStatus);
    setData(filterData);
  }, [selectedStatus]);

  useEffect(() => {
    const fetchPrintOrder = async () => {
      const token = localStorage.getItem("accessToken"); // Lấy token từ localStorage
      if (!token) {
        alert("Token không có hoặc đã hết hạn");
        window.location.href = "/login";
        return;
      }

      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/api/print-order",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gửi Bearer token trong header
            },
          }
        );

        console.log("Print order response:", response.data);
        setOrigindata(response.data);
        setData(response.data);
        // Xử lý dữ liệu nhận được từ API (nếu có)
      } catch (error) {
        // Nếu có lỗi, ví dụ token hết hạn hoặc không hợp lệ, xử lý ở đây
        console.error(
          "Error fetching print order:",
          error.response || error.message
        );

        if (error.response && error.response.status === 401) {
          alert("Token hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại!");
          localStorage.removeItem("accessToken"); // Xóa token nếu không hợp lệ
          // Điều hướng về trang login (hoặc thực hiện điều hướng cần thiết)
          window.location.href = "/login"; // Điều hướng về trang login
        }
      }
    };

    fetchPrintOrder();
  }, []);
  return (
    <>
      <div className="max-w-7xl w-full mx-auto my-8">
        <div className="flex justify-end mr-4 mb-4">
          <div className="flex items-center gap-2">
            <IoIosSearch className="text-2xl" />
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
              }}
              className="border border-gray-300 p-2 rounded"
            >
              <option value="All">All Status</option>
              <option value="completed">Completed</option>
              <option value="printing">Printing</option>
              <option value="failed">Failed</option>
              {/* Add more states as needed */}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4 border-b font-semibold">
                  Document Name
                </th>
                <th className="py-2 px-4 border-b font-semibold">Time Start</th>

                <th className="py-2 px-4 border-b font-semibold">
                  Number of Copies
                </th>

                <th className="py-2 px-4 border-b font-semibold">Address</th>
                <th className="py-2 px-4 border-b font-semibold">
                  Pages each Doc
                </th>
                <th className="py-2 px-4 border-b font-semibold">State</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="odd:bg-gray-50 even:bg-gray-200">
                  <td className="py-2 px-4 border-b">{item.name}</td>
                  <td className="py-2 px-4 border-b">{item.start_time}</td>

                  <td className="py-2 px-4 border-b">
                    {item.number_of_copies}
                  </td>

                  <td className="py-2 px-4 border-b">
                    {item.campus}-{item.building}-{item.room}
                  </td>
                  <td className="py-2 px-4 border-b">{item.number_of_pages}</td>
                  <td className="py-2 px-4 border-b"> {item.p_state}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
