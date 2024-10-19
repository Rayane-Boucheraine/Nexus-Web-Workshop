import Image from "next/image";
import logo from "../../public/Nexus.png";

const Loading = () => {
  return (
    <div className="absolute h-[100%] w-[100%] top-0 left-0 bg-[#FFFFFF] flex items-center justify-center z-[100]">
      <div className="animate-pulse">
        <Image src={logo} alt="logo" className="w-[200px]" />
      </div>
    </div>
  );
};

export default Loading;