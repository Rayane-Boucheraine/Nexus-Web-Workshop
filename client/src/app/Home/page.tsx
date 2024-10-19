"use client";

import Image from "next/image";
import Link from "next/link";
import vector from "../../../public/vector.svg";
import secureLocalStorage from "react-secure-storage";

const Page: React.FC = () => {
  const handleLogout = (): void => {
    secureLocalStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="relative flex items-center justify-center w-[100vw] h-[100vh] overflow-hidden bg-gradient-to-b from-[#232323] to-[#181717]">
      <Image
        src={vector}
        alt="vector"
        className="absolute right-0 top-0 w-[100%]"
      />
      <div className="flex gap-6 flex-col justify-center items-center h-[500px] p-[20px] w-[40%] z-[50] rounded-[24.369px] bg-white/90 backdrop-blur-[calc(var(--sds-size-depth-400)_/_2)]">
        <h2 className="text-[#76E494] font-[800] text-[36px] mb-4">
          Welcome To Your Profile!
        </h2>
        <div className="flex flex-col gap-6 items-center">
          <Link
            href="/Home/Profile"
            className="font-[700] text-[20px] bg-[#76E494] text-[#FFFFFF] px-[30px] w-[240px] text-center py-[6px] rounded-[10px]"
          >
            My Profile
          </Link>
          <Link
            href="/Home/Posts"
            className="font-[700] text-[20px] bg-[#76E494] text-[#FFFFFF] px-[30px] w-[240px] text-center py-[6px] rounded-[10px]"
          >
            My Posts
          </Link>
          <button
            className="font-[700] text-[20px] bg-[red] text-[#FFFFFF] px-[30px] w-[240px] text-center py-[6px] rounded-[10px]"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
