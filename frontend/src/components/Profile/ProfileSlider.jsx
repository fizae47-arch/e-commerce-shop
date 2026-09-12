import { RxPerson } from "react-icons/rx";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
  
  AiOutlineLogout,
  AiOutlineMessage,
} from "react-icons/ai";
import { MdOutlinePassword, MdOutlineTrackChanges } from "react-icons/md"; // ✅ correct icon
import { useNavigate } from "react-router-dom";
import { TbAddressBook } from "react-icons/tb";
import { server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";

function ProfileSlider({ setActive, active }) {
  const navigate = useNavigate();

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      {/* Profile */}
      <div
        className="w-full md:w-[250px] bg-white shadow-sm rounded-[10px] p-4 pt-8 flex flex-col items-center md:items-start"
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "red" : ""} />
        <span
          className={`pl-3 ${active === 1 ? "text-red-500" : "text-gray-700"} hidden md:block`}
        >
          Profile
        </span>
      </div>

      {/* Orders */}
      <div
        className="w-full md:w-[250px] bg-white shadow-sm rounded-[10px] p-4 pt-8 flex flex-col items-center md:items-start"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
        <span
          className={`pl-3 ${active === 2 ? "text-red-500" : "text-gray-700"} hidden md:block `}
        >
          Orders
        </span>
      </div>

      {/* Refunds */}
      <div
        className="w-full md:w-[250px] bg-white shadow-sm rounded-[10px] p-4 pt-8 flex flex-col items-center md:items-start"
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund size={20} color={active === 3 ? "red" : ""} />
        <span
          className={`pl-3 ${active === 3 ? "text-red-500" : "text-gray-700"} hidden md:block`}
        >
          Refunds
        </span>
      </div>

      {/* Inbox */}
      <div
        className="w-full md:w-[250px] bg-white shadow-sm rounded-[10px] p-4 pt-8 flex flex-col items-center md:items-start"
        onClick={() => {
          setActive(4);
          navigate("/inbox");
        }}
      >
        <AiOutlineMessage size={20} color={active === 4 ? "red" : ""} />
        <span
          className={`pl-3 ${active === 4 ? "text-red-500" : "text-gray-700"} hidden md:block`}
        >
          Inbox
        </span>
      </div>

      {/* Track Order */}
      <div
        className="w-full md:w-[250px] bg-white shadow-sm rounded-[10px] p-4 pt-8 flex flex-col items-center md:items-start"
        onClick={() => setActive(5)}
      >
        <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : ""} />
        <span
          className={`pl-3 ${active === 5 ? "text-red-500" : "text-gray-700"} hidden md:block`}
        >
          Track Orders
        </span>
      </div>

      <div
        className="w-full md:w-[250px] bg-white shadow-sm rounded-[10px] p-4 pt-8 flex flex-col items-center md:items-start"
        onClick={() => setActive(6)}
      >
        <MdOutlinePassword size={20} color={active === 6 ? "red" : ""} />
        <span
          className={`pl-3 ${active === 6 ? "text-red-500" : "text-gray-700"} hidden md:block`}
        >
          Change Password
        </span>
      </div>

      <div
        className="w-full md:w-[250px] bg-white shadow-sm rounded-[10px] p-4 pt-8 flex flex-col items-center md:items-start"
        onClick={() => setActive(7)}
      >
        <TbAddressBook size={20} color={active === 7 ? "red" : ""} />
        <span
          className={`pl-3 ${active === 7 ? "text-red-500" : "text-gray-700"} hidden md:block`}
        >
          Address
        </span>
      </div>

      <div
        className="w-full md:w-[250px] bg-white shadow-sm rounded-[10px] p-4 pt-8 flex flex-col items-center md:items-start"
        onClick={() => setActive(8) || logoutHandler()}
      >
        <AiOutlineLogout size={20} color={active === 8 ? "red" : ""} />
        <span
          className={`pl-3 ${active === 8 ? "text-red-500" : "text-gray-700"} hidden md:block`}
        >
          Log out
        </span>
      </div>
    </div>
  );
}

export default ProfileSlider;
