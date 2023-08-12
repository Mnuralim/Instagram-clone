"use client";
import Loading from "@/app/loading";
import { axiosAuth } from "@/lib/axios";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import { GoLocation } from "@react-icons/all-files/go/GoLocation";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import SearchListComponent from "./SearchList";
import HistorySearch from "./HistorySearch";

const fetcher = async (url: string, token: string | undefined) => {
  if (token) {
    const res = await axiosAuth.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  }
};

const ExploreSearch = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [username, setUsername] = useState<string>("");
  const { data: session } = useSession();
  const token = session?.user.token;
  const { data, error } = useSWR<User[]>("/user", (url) => fetcher(url, token));
  if (error) {
    return <div className="text-center text-9xl text-white font-bold">Error fetching data</div>;
  }
  if (!data) {
    return <Loading />;
  }
  const filteredData = data.filter((d) => d.username.toLowerCase().includes(username.toLowerCase())).slice(0, 5);
  return (
    <section className="text-white fixed top-0 z-[9999] bg-black py-[10px] w-full">
      <div className="flex items-center justify-between px-3 gap-2">
        <div className="relative flex items-center w-full">
          <input
            type="text"
            className="bg-[#262626] w-full pl-14 py-2 rounded-lg outline-none placeholder:text-lg"
            placeholder="Search"
            onClick={() => router.push("/explore/search")}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center px-4 bg-transparent rounded-r-lg">
            <AiOutlineSearch className="text-2xl" />
          </div>
        </div>
        <div>{pathName == "/explore/search" ? <button onClick={() => router.push("/explore")}>Cancel</button> : <GoLocation className="text-2xl" />}</div>
      </div>
      {pathName == "/explore/search" ? <div>{username === "" ? <HistorySearch username={username} /> : <SearchListComponent data={filteredData} />}</div> : ""}
    </section>
  );
};

export default ExploreSearch;
