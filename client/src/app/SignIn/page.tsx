import Image from "next/image";
import vector from "../../../public/vector.svg";
import Link from "next/link";

const page = () => {
  return (
    <div className="relative flex items-center justify-center w-[100vw] h-[100vh] overflow-hidden bg-gradient-to-b from-[#232323] to-[#181717]">
      <Image
        src={vector}
        alt="vector"
        className="absolute right-0 top-0 w-[100%]"
      />
      <div className="flex gap-6 flex-col justify-center items-center h-[300px] p-[20px] w-[40%] z-[50] rounded-[24.369px] bg-white/80 backdrop-blur-[calc(var(--sds-size-depth-400)_/_2)">
        <h2>Welcome To Our Club</h2>
        <Link href="/SignUp">Start</Link>
      </div>
    </div>
  );
};

export default page;
