"use client";

import { axiosAuth } from "@/lib/axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useTokenContext } from "./token";

interface PostContextProps {
  posts: Post[];
  totalLikeState: boolean;
  setTotalLikeState: React.Dispatch<React.SetStateAction<boolean>>;
}
const PostContext = createContext<PostContextProps>({
  posts: [],
  totalLikeState: false,
  setTotalLikeState: () => {},
});

export const PostContextProvider = ({ children }: any) => {
  const [posts, setPost] = useState<Post[]>([]);
  const [totalLikeState, setTotalLikeState] = useState<boolean>(false);
  const { token } = useTokenContext();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosAuth("/post", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPost(res.data.data);
    };
    if (token) {
      fetchData();
    }
  }, [token, totalLikeState]);
  const contextValue: PostContextProps = {
    posts,
    totalLikeState,
    setTotalLikeState,
  };
  console.log(totalLikeState);

  return <PostContext.Provider value={contextValue}>{children}</PostContext.Provider>;
};

export const usePostContext = () => useContext(PostContext);
