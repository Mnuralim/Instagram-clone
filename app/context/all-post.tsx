"use client";

import { axiosAuth } from "@/lib/axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useTokenContext } from "./token";

interface PostContextProps {
  posts: Post[];
  postTriger: boolean;
  setpostTriger: React.Dispatch<React.SetStateAction<boolean>>;
}
const PostContext = createContext<PostContextProps>({
  posts: [],
  postTriger: false,
  setpostTriger: () => {},
});

export const PostContextProvider = ({ children }: any) => {
  const [posts, setPost] = useState<Post[]>([]);
  const [postTriger, setpostTriger] = useState<boolean>(false);
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
  }, [token, postTriger]);
  const contextValue: PostContextProps = {
    posts,
    postTriger,
    setpostTriger,
  };
  console.log(postTriger);

  return <PostContext.Provider value={contextValue}>{children}</PostContext.Provider>;
};

export const usePostContext = () => useContext(PostContext);
