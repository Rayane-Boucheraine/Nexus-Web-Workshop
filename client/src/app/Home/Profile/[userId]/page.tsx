"use client";

import Image from "next/image";
import vector from "../../../../public/vector.svg";
import Link from "next/link";

const Page: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center w-[100vw] h-[100vh] overflow-hidden bg-gradient-to-b from-[#232323] to-[#181717]">
      <Image
        src={vector}
        alt="vector"
        className="absolute right-0 top-0 w-[100%]"
      />
      <div className="flex gap-6 flex-col justify-center items-center h-[500px] p-[20px] w-[40%] z-[50] rounded-[24.369px] bg-white/90 backdrop-blur-[calc(var(--sds-size-depth-400)_/_2)]">
        <div>
          <h2 className="text-[#76E494] font-[800] text-[36px]">
            Your Profile
          </h2>
          <Link href="/Home/Profile">Edit Profile</Link>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <span>Rayane</span>
          <span>Boucheraine</span>
          <span>r_boucheraine@estin.dz</span>
        </div>
      </div>
    </div>
  );
};

export default Page;
