"use client";

import Image from "next/image";
import vector from "../../../../../public/vector.svg";
import { useQuery, useMutation } from "react-query";
import BaseUrl from "@/components/BaseUrl";
import Loading from "@/components/Loading";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios"; 

interface ProfileData {
  firstName: string;
  familyName: string;
  email: string;
}

interface ErrorResponse {
  message: string | string[];
}

const Page: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [familyName, setFamilyName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const { isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await BaseUrl.get("/auth/profile");
      return response.data;
    },
    onSuccess: (profile: ProfileData) => {
      setFirstName(profile.firstName);
      setFamilyName(profile.familyName);
      setEmail(profile.email);
    },
  });

  const { mutate: updateProfile } = useMutation({
    mutationFn: (data: ProfileData) => BaseUrl.patch("/auth/profile", data),
    onSuccess: () => {
      toast.success("Profile updated successfully!");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while updating the profile";
      toast.error(Array.isArray(errorMessage) ? errorMessage[0] : errorMessage);
    },
  });

  if (isLoading) return <Loading />;
  if (error) return <>Error...</>;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateProfile({ firstName, familyName, email });
  };

  return (
    <div className="relative flex items-center justify-center w-[100vw] h-[100vh] overflow-hidden bg-gradient-to-b from-[#232323] to-[#181717]">
      <Image
        src={vector}
        alt="vector"
        className="absolute right-0 top-0 w-[100%]"
      />
      <div className="flex gap-6 flex-col justify-center items-center h-[500px] p-[20px] w-[40%] z-[50] rounded-[24.369px] bg-white/90 backdrop-blur-[calc(var(--sds-size-depth-400)_/_2)] max-xl:w-[50%] max-lg:w-[62%] max-md:w-[80%]">
        <div>
          <h2 className="text-[#76E494] font-[800] text-[36px]">
            Edit Profile
          </h2>
        </div>
        <form
          className="flex flex-col gap-8 w-[440px] mt-[20px] max-md:w-[90%]"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            required
            onChange={(e) => setFirstName(e.target.value)}
            className="py-[6px] px-[16px] bg-[#F1F0F0] border border-[#B5B5B5] rounded-[8px] outline-none"
          />
          <input
            type="text"
            placeholder="Family Name"
            value={familyName}
            required
            onChange={(e) => setFamilyName(e.target.value)}
            className="py-[6px] px-[16px] bg-[#F1F0F0] border border-[#B5B5B5] rounded-[8px] outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="py-[6px] px-[16px] bg-[#F1F0F0] border border-[#B5B5B5] rounded-[8px] outline-none"
          />
          <button
            type="submit"
            className="bg-[#76E494]  w-[180px] py-[6px] text-[19px] rounded-[6px] font-[700] text-[#FFFFFF] mx-auto mt-[16px]"
          >
            Edit Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
