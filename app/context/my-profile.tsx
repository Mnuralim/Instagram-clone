"use client";

import { axiosAuth } from "@/lib/axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useTokenContext } from "./token";

interface UserContextProps {
  users: User;
}
const UserContext = createContext<UserContextProps>({
  users: {} as User,
});

export const UserContextProvider = ({ children }: any) => {
  const [users, setUsers] = useState<User>({} as User);
  const { token } = useTokenContext();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosAuth("/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data.data);
    };
    if (token) {
      fetchData();
    }
  }, [token]);
  const contextValue: UserContextProps = {
    users,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
