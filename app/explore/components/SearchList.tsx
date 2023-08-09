"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BsDot } from "@react-icons/all-files/bs/BsDot";
import { useRouter } from "next/navigation";

type Props = {
  data: User[];
};

const SearchListComponent: React.FC<Props> = ({ data }) => {
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

  return (
    <div className="mx-3 mt-2">
      <div className="flex flex-col mt-5 gap-4">
        {data.map((d) => (
          <button key={d._id} onClick={() => handleStorage(d, d.username)}>
            <div className="flex gap-4">
              <div className="rounded-full w-14 h-14 relative overflow-hidden">
                <Image src={d.profile.image_profile} alt="profile" width={100} height={100} className="object-cover w-full h-full" />
              </div>
              <div className="flex flex-col items-start">
                <p>{d.username}</p>
                <div className="flex items-center text-[#A8A8A8]">
                  <h3>{d.profile.full_name}</h3>
                  <BsDot className="text-[#A8A8A8]" />
                  <p>{d.total_followers} followers</p>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchListComponent;
