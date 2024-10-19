import Image from "next/image";
import vector from "../../public/vector.svg";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex items-center justify-center w-[100vw] h-[100vh] overflow-hidden bg-gradient-to-b from-[#232323] to-[#181717]">
      <Image
        src={vector}
        alt="vector"
        className="absolute right-0 top-0 w-[100%]"
      />
      <div className="flex gap-8 flex-col justify-center items-center h-[300px] p-[20px] w-[40%] z-[50] rounded-[24.369px] bg-white/90 backdrop-blur-[calc(var(--sds-size-depth-400)_/_2)]">
        <h2 className="text-[#76E494] font-[800] text-[36px]">
          Welcome To Our Club!
        </h2>
        <Link
          href="/SignUp"
          className="font-[700] text-[20px] bg-[#76E494] text-[#FFFFFF] w-[160px] text-center px-[30px] py-[6px] rounded-[8px]"
        >
          Start
        </Link>
      </div>
    </div>
  );
}
