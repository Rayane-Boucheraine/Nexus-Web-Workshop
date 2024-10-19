"use client";

import Image from "next/image";
import vector from "../../../../public/vector.svg";
import Link from "next/link";
import BaseUrl from "@/components/BaseUrl";
import Loading from "@/components/Loading";
import { useQuery } from "react-query";

const Page: React.FC = () => {
  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryFn: async () => {
      const response = await BaseUrl.get("/auth/profile");
      return response.data
    },
  });

  if (isLoading) return <Loading />;

  if (error) return <>Error...</>;

  return (
    <div className="relative flex items-center justify-center w-[100vw] h-[100vh] overflow-hidden bg-gradient-to-b from-[#232323] to-[#181717]">
      <Image
        src={vector}
        alt="vector"
        className="absolute right-0 top-0 w-[100%]"
      />
      <div className="relative flex gap-6 flex-col h-[400px] px-[30px] py-[26px] w-[40%] z-[50] rounded-[24.369px] bg-white/90 backdrop-blur-[calc(var(--sds-size-depth-400)_/_2)] max-xl:w-[50%] max-lg:w-[62%] max-md:w-[80%]">
        <div className="flex items-center justify-between w-[100%]">
          <h2 className="text-[#76E494] font-[800] text-[24px] max-md:text-[20px]">
            Your Profile
          </h2>
          <Link
            href={`/Home/Profile/${data && data.id}`}
            className="border border-[#76E494] text-[#76E494] px-[20px] py-[6px] rounded-[10px] font-[600] max-md:text-[15px] max-md:px-[16px]"
          >
            Edit Profile
          </Link>
        </div>
        <ul className="absolute top-[60%] left-[50%] translate-x-[-50%] translate-y-[-60%] flex flex-col gap-12 items-center">
          <li className="bg-[#76E494] text-[#FFFFFF] w-[340px]  text-center rounded-[6px] py-[6px] font-[700] text-[18px] shadow-[0px_0px_19.534px_3.573px_rgba(0,0,0,0.20)] max-md:w-[90%] max-md:text-[16px]">
            {data && data.firstName}
          </li>
          <li className="bg-[#76E494] text-[#FFFFFF] w-[340px] text-center rounded-[6px] py-[6px] font-[700] text-[18px] shadow-[0px_0px_19.534px_3.573px_rgba(0,0,0,0.20)] max-md:w-[90%] max-md:text-[16px]">
            {data && data.familyName}
          </li>
          <li className="bg-[#76E494] text-[#FFFFFF] w-[340px] text-center rounded-[6px] py-[6px] font-[700] text-[18px] shadow-[0px_0px_19.534px_3.573px_rgba(0,0,0,0.20)] max-md:w-[90%] max-md:text-[16px]">
            {data && data.email}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Page;