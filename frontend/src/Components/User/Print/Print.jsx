import React, { useState, useEffect } from "react";
import bg_printer from "../../Img_user/bg-print.png";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoDocumentText } from "react-icons/io5";
import axios from "axios";
import Item from "./Item";
import { showFail, showSucess } from "../Alert/Aleart";

const dataFake = [
  {
    document_id: "1ff4vKPiXbLKAmonatMi0mNqMd6MwFHdZ",
    name: "BTL-script - Thực hiện quản lý DA linh hoạt.pdf",
    file_type: "pdf",
    number_of_pages: 5,
    webViewLink:
      "https://drive.google.com/file/d/1ff4vKPiXbLKAmonatMi0mNqMd6MwFHdZ/view?usp=drivesdk",
    webContentLink:
      "https://drive.google.com/uc?id=1ff4vKPiXbLKAmonatMi0mNqMd6MwFHdZ&export=download",
  },
  {
    document_id: "1iCPieT0M3xLqVzLKjVTpxHKbJ_5lD355",
    name: "Báo Cáo BTL_final - Thực hiện quản lý DA linh hoạt.pdf",
    file_type: "pdf",
    number_of_pages: 13,
    webViewLink:
      "https://drive.google.com/file/d/1iCPieT0M3xLqVzLKjVTpxHKbJ_5lD355/view?usp=drivesdk",
    webContentLink:
      "https://drive.google.com/uc?id=1iCPieT0M3xLqVzLKjVTpxHKbJ_5lD355&export=download",
  },
  {
    document_id: "1gd_wWTuQnnNTPr02WYHyALQ7JIo17oLG",
    name: "Rectangle 20.pdf",
    file_type: "pdf",
    number_of_pages: 1,
    webViewLink:
      "https://drive.google.com/file/d/1gd_wWTuQnnNTPr02WYHyALQ7JIo17oLG/view?usp=drivesdk",
    webContentLink:
      "https://drive.google.com/uc?id=1gd_wWTuQnnNTPr02WYHyALQ7JIo17oLG&export=download",
  },
];

export default function Printer() {
  const [toggle, setToggle] = useState(false);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);

  // Handlefile
  const fetchDoc = async () => {
    const token = localStorage.getItem("accessToken"); // Get token from localStorage

    if (!token) {
      showFail("Token không có hoặc đã hết hạn");
      return;
    }

    try {
      const response = await axios.get("http://127.0.0.1:5000/api/document", {
        headers: {
          Authorization: `Bearer ${token}`, // Set Authorization header
        },
      });

      // Handle success
      console.log("Data fetched successfully:", response.data);
      setData(response.data); // Store data in the state
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.response ? err.response.data : "An error occurred");
    }
  };

  useEffect(() => {
    fetchDoc();
  }, []);

  // deleteFile
  const deleteDocument = async (id) => {
    const token = localStorage.getItem("accessToken"); // Get token from localStorage

    if (!token) {
      alert("Token không có hoặc đã hết hạn");
      return;
    }

    try {
      const response = await axios.delete(
        `http://127.0.0.1:5000/api/file/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include Bearer token in Authorization header
          },
        }
      );

      console.log("Document deleted successfully:", response.data);
      fetchDoc();
    } catch (error) {
      console.error(
        "Error deleting document:",
        error.response || error.message
      );

      if (error.response && error.response.status === 401) {
        showFail("Token hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại!");

        localStorage.removeItem("accessToken"); // Remove expired/invalid token
        window.location.href = "/login"; // Redirect to login page
      } else {
        showFail("Your Document is printing!!!");
      }
    }
  };
  const deleteFile = (id) => {
    deleteDocument(id);
    fetchDoc();
  };

  // Handle file change
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]; // Lấy file đầu tiên từ input
    if (selectedFile) {
      setFile(selectedFile); // Cập nhật file trong state
      setFileName(selectedFile.name); // Cập nhật tên file
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken"); // Lấy token từ localStorage

    if (!token) {
      alert("Token không có hoặc đã hết hạn");
      return;
    }

    if (!file) {
      showFail("Vui lòng chọn một file để tải lên!");

      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Thêm file vào FormData

    setLoading(true); // Bắt đầu tải file -> Hiển thị loading

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/file", // URL API
        formData, // Dữ liệu FormData
        {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi Bearer token trong header
            "Content-Type": "multipart/form-data", // Cần chỉ định kiểu content cho file
          },
        }
      );

      console.log("File uploaded successfully:", response.data);
      showSucess("Tải lên file thành công!");
    } catch (error) {
      console.error("Error uploading file:", error.response || error.message);

      if (error.response && error.response.status === 401) {
        alert("Token hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại!");
        localStorage.removeItem("accessToken"); // Xóa token nếu không hợp lệ
        window.location.href = "/login"; // Điều hướng về trang login
      } else {
        showFail("Đã có lỗi xảy ra khi tải lên file.");
      }
    }
    setLoading(false);
    fetchDoc();
  };
  //////////////////

  return (
    <>
      <div className="flex mt-2 ">
        <div
          className=" relative py-16 px-32 flex-grow bg-opacity-10  bg-cover bg-center min-h-screen"
          // style={{
          //   backgroundImage: `url(${bg_printer})`,
          //   backgroundSize: "cover",
          // }}
        >
          <div className=" bg-slate-300 w-full h-full rounded-2xl bg-opacity-40">
            <form className="flex flex-col items-center space-y-4">
              {/* Custom File Input with Icon */}
              <label className="flex items-center space-x-2 cursor-pointer bg-transparent text-black px-4 py-2 ">
                <IoCloudUploadOutline className="text-[250px] mt-20 text-red-400" />

                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="application/pdf"
                />
              </label>

              {/* Show file name after selection */}
              {fileName && (
                <div className="mt-2 text-gray-700">
                  <span className="font-bold text-2xl text-violet-300 ">
                    Selected File:{" "}
                  </span>
                  <strong className="text-xl text-blue-600">{fileName}</strong>
                </div>
              )}

              {/* Nếu đang tải, hiển thị biểu tượng loading */}
              {loading && <p>Loading......</p>}

              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-blue-500 text-white rounded-md"
              >
                Submit
              </button>
            </form>
          </div>

          <button
            onClick={() => setToggle(!toggle)}
            className="absolute top-4 right-4  bg-red-500 p-1 rounded-md text-white"
          >
            <IoDocumentText className="text-4xl" />
          </button>
        </div>

        {toggle && (
          <div className=" w-1/3 pt-2 max-h-screen   overflow-auto  bg-slate-400 bg-opacity-80     ">
            <div className="flex justify-center text-[30px] mt-2">
              <h1 className="text-red-950 font-bold">Các file đã upload!!!</h1>
            </div>

            {data.length != 0 ? (
              <>
                {data.map((item) => {
                  return (
                    <>
                      <Item item={item} deleteFile={deleteFile} />
                    </>
                  );
                })}
              </>
            ) : (
              <>
                <h1 className="text-[50px] text-red-900 font-bold">
                  Empty List !!!
                </h1>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
