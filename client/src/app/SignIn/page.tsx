"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, FormEvent } from "react";
import { useMutation, UseMutationResult } from "react-query";
import BaseUrl from "@/components/BaseUrl";
import secureLocalStorage from "react-secure-storage";
import vector from "../../../public/vector.svg";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface SignInResponse {
  data: {
    token: string;
  };
}

interface SignInData {
  email: string;
  password: string;
}

interface ErrorResponse {
  message: string | string[];
}

const Page: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const {
    mutate: signin,
  }: UseMutationResult<
    SignInResponse,
    AxiosError<ErrorResponse>,
    SignInData
  > = useMutation({
    mutationFn: (data: SignInData) => BaseUrl.post("/auth/signin", data),
    onSuccess: ({ data }) => {
      secureLocalStorage.setItem("token", data.token);
      window.location.href = `/Home`;
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(Array.isArray(errorMessage) ? errorMessage[0] : errorMessage);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signin({ email, password });
  };

  return (
    <div className="relative flex items-center justify-center w-[100vw] h-[100vh] overflow-hidden bg-gradient-to-b from-[#232323] to-[#181717]">
      <Image
        src={vector}
        alt="vector"
        className="absolute right-0 top-0 w-[100%]"
      />
      <div className="flex gap-6 flex-col justify-center items-center h-[500px] p-[20px] w-[40%] z-[50] rounded-[24.369px] bg-white/90 backdrop-blur-[calc(var(--sds-size-depth-400)_/_2)] max-xl:w-[50%] max-lg:w-[62%] max-md:w-[90%]">
        <h2 className="text-[#76E494] font-[800] text-[36px]">Welcome Back!</h2>
        <span className="text-[#000000] mt-[0px] mb-[10px] block">
          Don&apos;t have an account?{" "}
          <Link href="/SignUp" className="text-[#76E494]">
            Sign Up
          </Link>
        </span>
        <form className="flex flex-col gap-4 w-[440px] max-md:w-[90%]" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="py-[6px] px-[16px] bg-[#F1F0F0] border border-[#B5B5B5] rounded-[8px] outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="py-[6px] px-[16px] bg-[#F1F0F0] border border-[#B5B5B5] rounded-[8px] outline-none"
          />
          <button
            type="submit"
            className="bg-[#76E494] w-[140px] py-[8px] text-[19px] rounded-[6px] font-[700] text-[#FFFFFF] mx-auto mt-[16px]"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;