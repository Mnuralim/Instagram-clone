"use client";

import { useSession } from "next-auth/react";
import React, { createContext, useContext } from "react";

type Props = {
  token: string | undefined;
};

const TokenContext = createContext<Props>({
  token: "",
});

export const TokenContextProvider = ({ children }: any) => {
  const { data: session } = useSession();
  const token = session?.user.token;

  return <TokenContext.Provider value={{ token }}>{children}</TokenContext.Provider>;
};

export const useTokenContext = () => useContext(TokenContext);
