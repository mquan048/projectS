import { React, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showErrorToast, showSucessToast } from "./Alert/Aleart";

export default function BuyPage() {
  const [page, setPage] = useState(100);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      // Retrieve token from localStorage or wherever you store it
      const token = localStorage.getItem("accessToken");

      // Data you want to send in the POST request
      const postData = {
        number_of_a4_pages: page,
        o_state: "completed",
      };

      // Make POST request with Bearer token
      const response = await axios.post(
        "http://127.0.0.1:5000/api/page-order",
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Set Authorization header with Bearer token
          },
        }
      );

      console.log("Response Data: ", response.data); // You can log or use it as required
      showSucessToast("Buy sucessfully!!!");
      // alert("Buy sucessfully!!!");
    } catch (err) {
      console.error("Error: ", err);
      showErrorToast("Error");
      alert(err.message);
    }
  };

  function SubmitForm(e) {
    e.preventDefault();
    handleSubmit();
  }

  // Hàm mở popup
  const openForm = () => setIsOpen(true);

  // Hàm đóng popup
  const closeForm = () => setIsOpen(false);

  return (
    <div>
      {/* Nút bấm để mở form */}
      <button
        onClick={openForm}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg"
      >
        Mua thêm trang In
      </button>

      {/* Form Popup */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeForm} // Đóng form khi click ngoài popup
        >
          <div
            className="bg-white p-6 rounded-lg w-96 relative"
            onClick={(e) => e.stopPropagation()} // Ngừng sự kiện click để không đóng khi click vào form
          >
            {/* Nút đóng */}
            <button
              onClick={closeForm}
              className="absolute top-2 right-2 text-2xl font-bold text-gray-600"
            >
              &times;
            </button>
            <div className="flex justify-center">
              <h2 className="text-xl font-semibold mb-4 ">Mua Trang In</h2>
            </div>

            <form onSubmit={SubmitForm}>
              <label htmlFor="page" className="block mb-2">
                Nhập số trang bạn muốn mua:
              </label>
              <input
                type="number"
                value={page}
                min={100}
                step={50}
                id="page"
                name="page"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Page A4 ......."
                onChange={(e) => setPage(e.target.value)}
              />

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded mt-4"
              >
                Mua
              </button>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
