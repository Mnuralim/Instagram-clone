// "use client";
// import { useSession } from "next-auth/react";
// import axios from "../axios";

// export const useRefreshToken = () => {
//   const { data: session } = useSession();

//   const refreshToken = async () => {
//     const res = await axios.post("/refresh-token", {
//       refreshtoken: session?.user.refreshtoken,
//     });

//     console.log(session);

//     if (session) session.user.token = res.data.token;
//     console.log(session);
//   };

//   return refreshToken;
// };
