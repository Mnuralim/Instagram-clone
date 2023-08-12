"use client";

import { axiosAuth } from "@/lib/axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useTokenContext } from "./token";

interface PostByUsernameContextProps {
  posts: Post[];
  postTriger: boolean;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setpostTriger: React.Dispatch<React.SetStateAction<boolean>>;
}
const PostContextByUsername = createContext<PostByUsernameContextProps>({
  posts: [],
  postTriger: false,
  username: "",
  setUsername: () => {},
  setpostTriger: () => {},
});

export const PostContextByUsernameProvider = ({ children }: any) => {
  const [posts, setPost] = useState<Post[]>([]);
  const [postTriger, setpostTriger] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const { token } = useTokenContext();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosAuth(`/post/otheruser-post/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPost(res.data.data);
    };
    if (token) {
      fetchData();
    }
  }, [token, postTriger, username]);
  const contextValue: PostByUsernameContextProps = {
    posts,
    postTriger,
    username,
    setUsername,
    setpostTriger,
  };
  console.log(postTriger);

  return <PostContextByUsername.Provider value={contextValue}>{children}</PostContextByUsername.Provider>;
};

export const usePostContextByUsername = () => useContext(PostContextByUsername);
