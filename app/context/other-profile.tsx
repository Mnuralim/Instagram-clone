"use client";

import { axiosAuth } from "@/lib/axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useTokenContext } from "./token";

interface OtherOtherUserContextProps {
  users: User;
  triger: boolean;
  username: string;
  setusername: React.Dispatch<React.SetStateAction<string>>;
  settriger: React.Dispatch<React.SetStateAction<boolean>>;
}
const OtherUserContext = createContext<OtherOtherUserContextProps>({
  users: {} as User,
  triger: false,
  username: "",
  settriger: () => {},
  setusername: () => {},
});

export const OtherUserContextProvider = ({ children }: any) => {
  const [users, setUsers] = useState<User>({} as User);
  const [triger, settriger] = useState<boolean>(false);
  const [username, setusername] = useState<string>("");
  const { token } = useTokenContext();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosAuth(`/user/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data.data);
    };
    if (token) {
      fetchData();
    }
  }, [token, triger, username]);
  const contextValue: OtherOtherUserContextProps = {
    users,
    triger,
    settriger,
    setusername,
    username,
  };

  return <OtherUserContext.Provider value={contextValue}>{children}</OtherUserContext.Provider>;
};

export const useOtherUserContext = () => useContext(OtherUserContext);
