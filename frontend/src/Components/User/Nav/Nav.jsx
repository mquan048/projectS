import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa6";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../../Screen/Logout";
import Notifi from "./Notifi";
export default function Nav() {
  const [toggleAva, setToggleAva] = useState(false);
  const navigate = useNavigate(); // Get the navigate function from useNavigate

  const handleLogout = () => {
    logout(navigate); // Call the logout function and pass navigate
  };
  return (
    <>
      <header className=" flex p-2 items-center mx-auto w-[1200px] max-w-full justify-between ">
        <Link to={"/user"}>
          <div className="flex items-center gap-1">
            <img
              src="https://cdn.haitrieu.com/wp-content/uploads/2021/09/Logo-DH-Bach-Khoa-HCMUT.png"
              alt=""
              className="h-12 w-12"
            />

            <p className="text-2xl ml-2 text-blue-600">SSPS</p>
          </div>
        </Link>

        <div className="flex items-center gap-32 text-xl">
          <div id="sidebar">
            <NavLink id="sidebar" to={"print"} className="px-8 py-4">
              In Tài Liệu
            </NavLink>
          </div>
          <div id="sidebar">
            <NavLink id="sidebar" to={"history"} className="px-8 py-4">
              Lịch Sử In
            </NavLink>
          </div>
        </div>
        <div className="flex items-center ">
          <Notifi />
          <div className="relative cursor-pointer z-20">
            <div
              className="flex items-center"
              onClick={() => setToggleAva(!toggleAva)}
            >
              <CiUser className="text-[40px]" />
              <FaAngleDown />
            </div>

            {toggleAva && (
              <>
                <div className="shadow-2xl absolute bg-slate-50 -bottom-[85px]  w-32 flex flex-col jus  border-2 border-blue-600  rounded-md  ">
                  <Link
                    to={"infor"}
                    onClick={() => setToggleAva(!toggleAva)}
                    className="flex-1 hover:bg-slate-300 hover:underline  px-3 py-2 border border-b-2 border-black"
                  >
                    Profile
                  </Link>

                  <div
                    onClick={handleLogout}
                    className="flex-1 hover:bg-slate-300 hover:underline px-3 py-2"
                  >
                    Logout
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
