import React, { useEffect, useState } from "react";
import Test from "./Test";
import BuyPage from "./BuyPage";
import axios from "axios";

const data = {
  id: 52,
  full_name: "Nguyen Van B",
  email: "user2@abc.xyz",
  available_a4_pages: 100,
};

export default function Infor() {
  const [infor, setInfor] = useState("");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get the token from localStorage or wherever you are storing it
        const token = localStorage.getItem("accessToken");

        // Make the GET request with Bearer token
        const response = await axios.get("http://127.0.0.1:5000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the Bearer token in the header
          },
        });

        // Handle the response
        console.log("User Data: ", response.data);
        setInfor(response.data);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, []);
  return (
    <>
      <h1 className="mt-8 text-2xl w-fit mx-auto mb-4 ">INFORMATION</h1>

      <div>
        <div className="relative w-fit overflow-hidden    mx-auto border border-black rounded-xl  ">
          <table className="w-[800px] table-auto border-collapse border border-gray-200">
            <tbody>
              <>
                {Object.entries(infor).map(([key, value]) => (
                  <tr
                    key={key}
                    className=" border-b border-black hover:bg-gray-500 "
                  >
                    <td className="text-xl px-4 py-2   font-medium text-gray-700 hover:text-white">
                      {key.toUpperCase()}
                    </td>
                    <td className=" py-2 text-xl text-gray-700 hover:text-white">
                      {value}
                    </td>
                  </tr>
                ))}
              </>
            </tbody>
          </table>
        </div>
        <div className="w-[500px] mx-auto flex justify-between mt-4">
          <div></div>
          <BuyPage />
        </div>
      </div>
    </>
  );
}
