import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaPrint } from "react-icons/fa6";
import { BiShow } from "react-icons/bi";
import axios from "axios";
import { showFail, showSucess } from "../Alert/Aleart";

const printerFake = [
  {
    printer_id: 1,
    name: "Super",
    brand: "HP",
    model: "SP123",
    campus: "CS1",
    building: "H6",
    room: 612,
    img: "https://www.midshire.co.uk/wp-content/uploads/2017/03/Ricoh-Multifunction-Printer.jpg",
  },
  {
    printer_id: 2,
    name: "LaserJet",
    brand: "HP",
    model: "LJ900",
    campus: "CS2",
    building: "B5",
    room: 102,
    img: "https://www.midshire.co.uk/wp-content/uploads/2017/03/Ricoh-Multifunction-Printer.jpg",
  },
  {
    printer_id: 3,
    name: "OfficePro",
    brand: "Canon",
    model: "OP5000",
    campus: "CS3",
    building: "A1",
    room: 210,
    img: "https://www.midshire.co.uk/wp-content/uploads/2017/03/Ricoh-Multifunction-Printer.jpg",
  },
  {
    printer_id: 4,
    name: "PrintMaster",
    brand: "Brother",
    model: "PM450",
    campus: "CS1",
    building: "H7",
    room: 315,
    img: "https://www.midshire.co.uk/wp-content/uploads/2017/03/Ricoh-Multifunction-Printer.jpg",
  },
  {
    printer_id: 5,
    name: "EcoPrint",
    brand: "Epson",
    model: "EPX900",
    campus: "CS2",
    building: "C3",
    room: 405,
    img: "https://www.midshire.co.uk/wp-content/uploads/2017/03/Ricoh-Multifunction-Printer.jpg",
  },
  {
    printer_id: 6,
    name: "QuickPrint",
    brand: "Lexmark",
    model: "QPX300",
    campus: "CS3",
    building: "D9",
    room: 122,
    img: "https://www.midshire.co.uk/wp-content/uploads/2017/03/Ricoh-Multifunction-Printer.jpg",
  },
  {
    printer_id: 7,
    name: "MegaPrint",
    brand: "Xerox",
    model: "MP1000",
    campus: "CS1",
    building: "H3",
    room: 510,
    img: "https://www.midshire.co.uk/wp-content/uploads/2017/03/Ricoh-Multifunction-Printer.jpg",
  },
  {
    printer_id: 8,
    name: "PrintJet",
    brand: "Samsung",
    model: "PJ150",
    campus: "CS2",
    building: "F6",
    room: 809,
    img: "https://www.midshire.co.uk/wp-content/uploads/2017/03/Ricoh-Multifunction-Printer.jpg",
  },
  {
    printer_id: 9,
    name: "SpeedPrint",
    brand: "Ricoh",
    model: "SP2000",
    campus: "CS3",
    building: "E2",
    room: 303,
    img: "https://www.midshire.co.uk/wp-content/uploads/2017/03/Ricoh-Multifunction-Printer.jpg",
  },
  {
    printer_id: 10,
    name: "UltraPrint",
    brand: "Kyocera",
    model: "UP700",
    campus: "CS1",
    building: "B8",
    room: 707,
    img: "https://www.midshire.co.uk/wp-content/uploads/2017/03/Ricoh-Multifunction-Printer.jpg",
  },
];

export default function Item(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [printers, setPrinter] = useState(printerFake);
  const [formData, setFormData] = useState({
    document_id: props.item.document_id,
    sided: "two-sided",
    paper_size: "A4",
    paper_orientation: "portrait",
    pages_per_sheet: 1,
    number_of_copies: 1,
    scale: 1,
    printer_id: 1,
    p_state: "printing",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOrder = async () => {
    const token = localStorage.getItem("accessToken"); // Get the Bearer token from localStorage

    if (!token) {
      alert("Token không có hoặc đã hết hạn");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/print-order", // API endpoint
        formData, // Data to be sent with the POST request
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include Bearer token in Authorization header
            "Content-Type": "application/json", // Make sure to send JSON data
          },
        }
      );

      console.log("Print order successful:", response.data);
      showSucess("Print order successful!!!");
    } catch (error) {
      console.error(
        "Error making print order:",
        error.response || error.message
      );

      if (error.response && error.response.status === 401) {
        alert("Token hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại!");
        localStorage.removeItem("accessToken"); // Remove expired/invalid token
        window.location.href = "/login"; // Redirect to login page
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleOrder();
  };

  const getLink = async () => {
    const token = localStorage.getItem("accessToken"); // Get token from localStorage

    if (!token) {
      alert("Token không có hoặc đã hết hạn");
      return;
    }

    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/api/file/${props.item.document_id}/url`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Set Authorization header
          },
        }
      );

      // Handle success
      console.log("Data fetched successfully:", response.data);
      window.open(response.data.url, "_blank");
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
  const showPdf = () => {
    getLink();
  };

  // Hàm mở popup
  const openForm = () => setIsOpen(true);

  // Hàm đóng popup
  const closeForm = () => setIsOpen(false);
  return (
    <>
      <div className="mt-8 mx-2">
        <div className="flex justify-between">
          <h1 className="text-[20px]">{props.item.name}</h1>

          <div className="flex text-[30px] gap-4">
            <BiShow onClick={showPdf} className="cursor-pointer" />
            <FaPrint onClick={openForm} />
            <MdDeleteForever
              onClick={() => {
                props.deleteFile(props.item.document_id);
              }}
              className="cursor-pointer"
            />
          </div>
        </div>
        <hr />
      </div>
      {/* Form Popup */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeForm} // Đóng form khi click ngoài popup
        >
          <div
            className="bg-white p-6 rounded-lg max-w-3xl  min-w-[500px] relative"
            onClick={(e) => e.stopPropagation()} // Ngừng sự kiện click để không đóng khi click vào form
          >
            {/* Nút đóng */}
            <button
              onClick={closeForm}
              className="absolute top-2 right-2 text-2xl font-bold text-gray-600"
            >
              &times;
            </button>

            <div className="flex gap-4">
              <div className=" border-r-2 ">
                <h1 className="text-2xl mb-4">Print Form:</h1>
                <form onSubmit={handleSubmit} className="pr-4">
                  <div className="mb-4">
                    <label
                      htmlFor="sided"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Sided
                    </label>
                    <select
                      name="sided"
                      value={formData.sided}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="one-sided">One-sided</option>
                      <option value="two-sided">Two-sided</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="paperSize"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Paper Size
                    </label>
                    <select
                      name="paper_size"
                      value={formData.paper_size}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="A4">A4</option>
                      <option value="A3">A3</option>
                      <option value="A5">A5</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="paperOrientation"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Paper Orientation
                    </label>
                    <select
                      name="paper_orientation"
                      value={formData.paper_orientation}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="portrait">Portrait</option>
                      <option value="landscape">Landscape</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="pagesPerSheet"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Pages per Sheet
                    </label>
                    <input
                      type="number"
                      name="pages_per_sheet"
                      value={formData.pages_per_sheet}
                      onChange={handleChange}
                      min="1"
                      max="10"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="numberOfCopies"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Number of Copies
                    </label>
                    <input
                      type="number"
                      name="number_of_copies"
                      value={formData.number_of_copies}
                      onChange={handleChange}
                      min="1"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="scale"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Scale (1-100)
                    </label>
                    <input
                      type="number"
                      name="scale"
                      value={formData.scale}
                      onChange={handleChange}
                      min="1"
                      max="100"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="printer_id"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Printer
                    </label>
                    <input
                      type="number"
                      name="printer_id"
                      value={formData.printer_id}
                      onChange={handleChange}
                      min="1"
                      max={printers.length}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>

              <div className="w-[600px]">
                <div className="flex justify-center">
                  <h1 className="text-2xl">Printer</h1>
                </div>
                <div className="grid grid-cols-4 gap-2 max-h-[450px] overflow-auto">
                  {printers.map((item) => {
                    return (
                      <>
                        <div
                          key={item.printer_id}
                          className="relative p-4 bg-gray-200 rounded-lg mt-4 mx-1"
                        >
                          <h1 className="text-xl font-semibold absolute -top-2 -left-0 border rounded-xl bg-red-400 px-1 z-10">
                            {item.printer_id}
                          </h1>
                          <span>
                            {item.campus}-{item.building}
                            {item.room}
                          </span>
                          <img
                            src={item.img}
                            alt={item.name}
                            className="mt-2 rounded-md w-full h-20 object-cover"
                          />
                          <span className="font-semibold mt-1">
                            {item.name}
                          </span>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
