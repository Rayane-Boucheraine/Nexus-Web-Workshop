"use client";

import Image from "next/image";
import vector from "../../../../public/vector.svg";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "react-query";
import BaseUrl from "@/components/BaseUrl";
import Loading from "@/components/Loading";
import { toast } from "react-toastify";

interface Post {
  id: string;
  title: string;
  description: string;
}

const Page: React.FC = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await BaseUrl.get("/posts/my-posts");
      return response.data;
    },
  });

  const deletePostMutation = useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      await BaseUrl.delete(`/posts/${id}`);
    },
    onSuccess: () => {
      toast.success("Post deleted successfully!");
      queryClient.invalidateQueries("posts");
    },
    onError: () => {
      toast.error("Error deleting the post.");
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
      <div className="relative flex gap-6 flex-col h-[500px] px-[30px] py-[16px] w-[50%] z-[50] rounded-[24.369px] bg-white/90 backdrop-blur-[calc(var(--sds-size-depth-400)_/_2)]">
        <div className="flex items-center justify-between w-[100%]">
          <h2 className="text-[#76E494] font-[800] text-[24px]">Your Posts</h2>
          <Link
            href="/Home/Posts/AddPost"
            className="border border-[#76E494] text-[#76E494] px-[20px] py-[6px] rounded-[10px] font-[600]"
          >
            Add Post
          </Link>
        </div>

        <ul className="w-[100%] flex flex-col gap-4 items-center">
          {!data ? [] : data.map((post: Post, index: number) => {
            return (
              <li
                className="w-[100%] flex items-center justify-between border border-[#76E494] py-[8px] px-[20px] rounded-[10px]"
                key={post.id}
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
                    href={`/Home/Posts/${post.id}`}
                    className="bg-[#76E494] text-[#FFFFFF] font-[600] px-[20px] py-[6px] rounded-[6px] text-[15px]"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deletePostMutation.mutate(post.id)}
                    className="bg-[red] text-[#FFFFFF] font-[600] px-[20px] py-[6px] rounded-[6px] text-[15px]"
                  >
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