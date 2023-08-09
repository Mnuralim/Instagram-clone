"use client";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { BsDot } from "@react-icons/all-files/bs/BsDot";
import { useRouter } from "next/navigation";

type Props = {
  username: string;
};

const HistorySearch: React.FC<Props> = ({ username }) => {
  const [user, setUser] = useState<User[]>([]);
  const router = useRouter();

  const handleStorage = (data: any, username: string) => {
    const updatedHistory = [...user, data];
    localStorage.setItem("user", JSON.stringify(updatedHistory));
    router.push(`/${username}`);
  };

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    if (userStorage) {
      setUser(JSON.parse(userStorage));
    }
  }, []);

  const uniqueUsers = user.filter((user, index, self) => index === self.findIndex((u) => u._id === user._id)).slice(0, 5);

  const handleDeleteHistory = (id: string) => {
    const updatedHistory = user.filter((u) => u._id !== id);
    setUser(updatedHistory);
    localStorage.setItem("user", JSON.stringify(updatedHistory));
  };

  return (
    <div className="mx-3 mt-2">
      <div className="flex justify-between">
        <h3 className="font-bold text-lg">Recent</h3>
        <p className="text-[#0095F6]">See all</p>
      </div>
      <div className="flex flex-col mt-3 gap-4">
        {uniqueUsers.map((d) => (
          <div key={d._id}>
            <div className="flex gap-4 items-center justify-between">
              <div className="flex gap-4">
                <div className="rounded-full w-14 h-14 relative overflow-hidden">
                  <Image src={d.profile.image_profile} alt="profile" width={100} height={100} className="object-cover w-full h-full" />
                </div>
                <div onClick={() => handleStorage(d, d.username)} className="flex flex-col items-start">
                  <p>{d.username}</p>
                  <div className="flex items-center text-[#A8A8A8]">
                    <h3>{d.profile.full_name}</h3>
                    <BsDot className="text-[#A8A8A8]" />
                    <p>{d.total_followers} followers</p>
                  </div>
                </div>
              </div>
              <button onClick={() => handleDeleteHistory(d._id)} className="text-[#A8A8A8]">
                <RxCross2 />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistorySearch;
