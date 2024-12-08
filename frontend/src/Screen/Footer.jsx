import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import bku_logo from "../Screen/Img_Footer/logo_BK2.jpg";

export default function Footer() {
  return (
    <>
      <footer
        id="lienhe"
        className="w-full h-28 bg-[#142D65] pt-4 pl-8 pr-12 flex"
      >
        <div className="flex flex-1">
          <img src={bku_logo} alt="" className="h-16 w-16 " />
          <div className="ml-2 text-white">
            <p>ĐẠI HỌC QUỐC GIA THÀNH PHỐ HỒ CHÍ MINH</p>
            <p>TRƯỜNG ĐẠI HỌC BÁCH KHOA</p>
          </div>
        </div>
        <div>
          <div className="flex items-center ">
            <FaMapMarkerAlt className="text-[#e2b6b6] mr-2" />
            <p className="text-white">
              Cơ sở Lý Thường Kiệt: 268 Lý Thường Kiệt, Phường 14, Quận 10, TP.
              HCM
            </p>
          </div>

          <div className=" flex items-center">
            <FaMapMarkerAlt className="text-[#e2b6b6] mr-2" />
            <p className="text-white">
              Cơ sở Dĩ An: Khu phố Tân Lập, Phường Đông Hòa, TP. Dĩ An, Tỉnh
              Bình Dương
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
