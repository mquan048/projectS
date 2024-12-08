import { IoIosNotificationsOutline } from "react-icons/io";
import { FaRegPaperPlane } from "react-icons/fa6";
import { SiTicktick } from "react-icons/si";
import { useEffect, useState } from "react";
import axios from "axios";

const Nofi = [
  { id: 1, name: "KTMT.pdf" },
  { id: 2, name: "MathModeling.pdf" },
  { id: 3, name: "CNPM.txt" },
  { id: 1, name: "KTMT.pdf" },
  { id: 2, name: "MathModeling.pdf" },
  { id: 3, name: "CNPM.txt" },
  { id: 1, name: "KTMTfgrdgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfg.pdf" },
  { id: 2, name: "MathModeling.pdf" },
];

function List(props) {
  const { name } = props.data;
  // Set the maximum length
  const MAX_LENGTH = 25;

  // Truncate name if it exceeds MAX_LENGTH and add ellipsis
  const truncatedName =
    name.length > MAX_LENGTH ? name.substring(0, MAX_LENGTH) + "..." : name;
  return (
    <div className="flex justify-between bg-slate-50 hover:bg-white px-2 py-1 border border-b-2 border-blue-500  ">
      <p className="text-blue-500">{truncatedName}</p>
      <SiTicktick />
    </div>
  );
}

export default function Notifi() {
  const [noti, setNoti] = useState([]);
  const [togglenoti, setTogglenoti] = useState(false);

  useEffect(() => {
    const fetchOrderCompleted = async () => {
      const accessToken = localStorage.getItem("accessToken"); // Or wherever your token is stored

      try {
        // Make the GET request with the Bearer token in the Authorization header
        const response = await axios.get(
          "http://127.0.0.1:5000/api/print-order",
          {
            params: {
              status: "completed",
            },
            headers: {
              Authorization: `Bearer ${accessToken}`, // Attach the token
            },
          }
        );

        console.log("Order Print Response:", response.data);
        setNoti(response.data);

        // Handle the response as needed
      } catch (error) {
        console.error("Error fetching print order:", error.response || error);
        // Handle the error (maybe show a message to the user)
      }
    };

    fetchOrderCompleted();
  }, []);

  return (
    <>
      <div
        className="relative mr-16 "
        onClick={() => {
          setTogglenoti(!togglenoti);
        }}
      >
        <IoIosNotificationsOutline className=" text-[35px]  cursor-pointer" />
        {noti.length > 0 && (
          <>
            <span className="absolute -right-2 -top-2   text-white px-1 rounded-full bg-red-500  ">
              {noti.length}
            </span>
            {togglenoti && (
              <>
                <div className="absolute z-20 -left-[220px] h-max-36 w-72 overflow-auto  border border-black rounded-xl  ">
                  <div className=" bg-slate-700 px-1 pt-1 flex justify-between ">
                    <p className="text-white">In xong ùi nè </p>
                    <FaRegPaperPlane className="text-blue-400" />
                  </div>
                  <div>
                    {noti.map((data) => {
                      return <List data={data} />;
                    })}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

// /user/........
// /admin/......
// /authen/.....
