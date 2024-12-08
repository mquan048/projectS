import { React, useState } from "react";

export default function Test() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  function SubmitForm(e) {
    e.preventDefault();
    alert(name + " " + email);
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
        Mở Form
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
            <h2 className="text-xl font-semibold mb-4">Form Popup</h2>
            <form onSubmit={SubmitForm}>
              <label htmlFor="name" className="block mb-2">
                Họ và tên:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Nhập họ và tên"
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="email" className="block mb-2">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Nhập email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded mt-4"
              >
                Gửi
              </button>
              <div>
                <div className="relative mt-4 w-32 group ">
                  {/* Printer Text */}
                  <p className="bg-blue-400 px-4 py-2 text-white rounded ">
                    Printer
                  </p>

                  {/* Description Text */}
                  <p className="absolute overflow-auto h-64 left-28 -top-64 mt-2 w-64  p-4 bg-white border border-gray-300 rounded-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-300">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Possimus reprehenderit placeat quos labore. Fugit deserunt
                    inventore non debitis natus vitae, iusto minima ab?
                    Molestiae nemo possimus voluptatem exercitationem!
                    Obcaecati, ipsa!
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
