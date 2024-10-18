"use client";

import Image from "next/image";
import vector from "../../../../public/vector.svg";
import Link from "next/link";
import { title } from "process";

const posts = [
  {
    title: "Title 1",
    description: "lorem lorem lorem lorem lorem lorem",
  },
  {
    title: "Title 2",
    description: "lorem lorem lorem lorem lorem lorem",
  },
  {
    title: "Title 3",
    description: "lorem lorem lorem lorem lorem lorem",
  },
  {
    title: "Title 4",
    description: "lorem lorem lorem lorem lorem lorem",
  },
  {
    title: "Title 5",
    description: "lorem lorem lorem lorem lorem lorem",
  }
];

const Page: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center w-[100vw] h-[100vh] overflow-hidden bg-gradient-to-b from-[#232323] to-[#181717]">
      <Image
        src={vector}
        alt="vector"
        className="absolute right-0 top-0 w-[100%]"
      />
      <div className="relative flex gap-6 flex-col h-[500px] px-[30px] py-[16px] w-[50%] z-[50] rounded-[24.369px] bg-white/90 backdrop-blur-[calc(var(--sds-size-depth-400)_/_2)]">
        <div className="flex items-center justify-between w-[100%]">
          <h2 className="text-[#76E494] font-[800] text-[24px]">Your Posts</h2>
        </div>
        <ul className="w-[100%] flex flex-col gap-4 items-center">
          {posts.map((post, index) => {
            return (
              <li
                className="w-[100%] flex items-center justify-between border border-[#76E494] py-[8px] px-[20px] rounded-[10px]"
                key={index}
              >
                <div className="flex items-center gap-5">
                  <div className="bg-[#76E494] text-[#FFFFFF] px-[20px] py-[8px] rounded-[8px] text-[22px] font-[700]">
                    <span>{index + 1}</span>
                  </div>
                  <div>
                    <h3>{post.title}</h3>
                    <p>{post.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    href="/Home/Posts"
                    className="bg-[#76E494] text-[#FFFFFF] font-[600] px-[20px] py-[6px] rounded-[6px] text-[15px]"
                  >
                    Edit
                  </Link>
                  <button className="bg-[red] text-[#FFFFFF] font-[600] px-[20px] py-[6px] rounded-[6px] text-[15px]">
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Page;
