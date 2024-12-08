import React from "react";
import img_regu from "../../Img_user/regulation.svg";

export default function Regulation() {
  return (
    <>
      <div className="w-3/4 mx-auto p-16">
        <h1 className="text-4xl pb-8">Hướng dẫn chi tiết dành cho sinh viên</h1>

        <div className="flex justify-between">
          <img src={img_regu} alt="" className="pl-4 h-[450px]" />
          <div className="flex flex-col  items-center ">
            <h1 className=" pt-16 text-2xl font-bold ">
              Các bạn lưu ý và đọc kỹ nhé
            </h1>
            <p className="text-red-600 pt-6 text-[20px]">
              (Nếu có sai sót, chúng tôi sẽ không chịu trách nhiệm)
            </p>
            <button
              onClick={() => {
                alert("Click");
              }}
              className="text-white bg-[#0388B3] mt-32 p-4 rounded-xl"
            >
              Xem thêm (View)
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
