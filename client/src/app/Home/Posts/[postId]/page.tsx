"use client";

import Image from "next/image";
import { useState, FormEvent } from "react";
import { useQuery, useMutation, UseMutationResult } from "react-query";
import { useParams } from "next/navigation";
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

interface ErrorResponse {
  message: string;
}

const UpdatePostPage: React.FC = () => {
  const { postId } = useParams();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const { isLoading, error } = useQuery<PostData>(
    ["post", postId],
    async () => {
      const response = await BaseUrl.get(`/posts/${postId}`);
      return response.data;
    },
    {
      enabled: !!postId,
      onSuccess: (data) => {
        setTitle(data.title);
        setDescription(data.description);
      },
    }
  );

  const {
    mutate: updatePost,
  }: UseMutationResult<PostResponse, ErrorResponse, PostData> = useMutation({
    mutationFn: (data: PostData) => BaseUrl.patch(`/posts/${postId}`, data),
    onSuccess: (data) => {
      toast.success(data.message || "Post updated successfully!");
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.message || "An error occurred while updating the post");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updatePost({ title, description });
  };

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error loading post...</p>;

  return (
    <div className="relative flex items-center justify-center w-[100vw] h-[100vh] overflow-hidden bg-gradient-to-b from-[#232323] to-[#181717]">
      <Image
        src={vector}
        alt="vector"
        className="absolute right-0 top-0 w-[100%]"
      />
      <div className="flex gap-6 flex-col justify-center items-center h-[500px] p-[20px] w-[40%] z-[50] rounded-[24.369px] bg-white/90 backdrop-blur-[calc(var(--sds-size-depth-400)_/_2)]">
        <h2 className="text-[#76E494] font-[800] text-[36px]">Update Post</h2>
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
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePostPage;