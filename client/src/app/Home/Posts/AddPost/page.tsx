"use client";

import Image from "next/image";
import { useState, FormEvent } from "react";
import { useMutation, UseMutationResult } from "react-query";
import BaseUrl from "@/components/BaseUrl";
import vector from "../../../../../public/vector.svg";
import { toast } from "react-toastify";

interface PostData {
  title: string;
  description: string;
}

interface PostResponse {
  message: string;
}

interface PostError {
  response?: {
    data?: {
      message: string | string[];
    };
  };
}

const AddPostPage: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const {
    mutate: addPost,
  }: UseMutationResult<PostResponse, PostError, PostData> = useMutation({
    mutationFn: (data: PostData) => BaseUrl.post("/posts/create", data),
    onSuccess: (data) => {
      toast.success(data.message || "Post created successfully!");
      // window.location.href = `/posts`;
    },
    onError: (error: PostError) => {
      toast.error(
        error.response?.data?.message ||
          (Array.isArray(error.response?.data?.message)
            ? error.response.data.message[0]
            : error.response?.data?.message) ||
          "An error occurred while creating the post"
      );
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addPost({ title, description });
  };

  return (
    <div className="relative flex items-center justify-center w-[100vw] h-[100vh] overflow-hidden bg-gradient-to-b from-[#232323] to-[#181717]">
      <Image
        src={vector}
        alt="vector"
        className="absolute right-0 top-0 w-[100%]"
      />
      <div className="flex gap-6 flex-col justify-center items-center h-[500px] p-[20px] w-[40%] z-[50] rounded-[24.369px] bg-white/90 backdrop-blur-[calc(var(--sds-size-depth-400)_/_2)]">
        <h2 className="text-[#76E494] font-[800] text-[36px]">Add Post</h2>
        <form className="flex flex-col gap-4 w-[440px]" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            className="py-[6px] px-[16px] bg-[#F1F0F0] border border-[#B5B5B5] rounded-[8px] outline-none"
          />
          <textarea
            placeholder="Description"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
            className="py-[6px] px-[16px] bg-[#F1F0F0] border border-[#B5B5B5] rounded-[8px] outline-none h-[200px] resize-none"
          />
          <button
            type="submit"
            className="bg-[#76E494] w-[180px] py-[6px] text-[19px] rounded-[6px] font-[700] text-[#FFFFFF] mx-auto mt-[16px]"
          >
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPostPage;