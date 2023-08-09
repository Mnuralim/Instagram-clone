"use client";
import React, { useEffect, useState } from "react";
import { HomeFilled, SearchOutlined } from "@ant-design/icons";
import { AiOutlineHome } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import { BsPlusSquare } from "react-icons/bs";
import { MdGridOn } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { axiosAuth } from "@/lib/axios";

const Navbar = () => {
  const [showNav, setShowNav] = useState(true);
  const [imageProfile, setImageProfile] = useState<string>("");
  const [showUploadOption, setShowUploadOption] = useState<boolean>(false);
  const path = usePathname();
  const { data: session } = useSession();
  const token = session?.user.token;

  useEffect(() => {
    if (token) {
      const fethData = async () => {
        const res = await axiosAuth.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setImageProfile(res.data.data?.profile?.image_profile);
      };
      fethData();
    }
  });

  useEffect(() => {
    setShowNav(path?.includes("/p/") || path?.startsWith("/create") || path?.startsWith("/login") || path?.startsWith("/register") || path?.startsWith("/accounts") ? false : true);
    setShowUploadOption(false);
  }, [path, setShowNav]);

  return showNav ? (
    <nav className="fixed w-full bottom-0 text-white flex justify-between items-center h-12 px-7 bg-black z-[9999999999]">
      <Link href={"/"}>{path == "/" ? <HomeFilled className="text-[26px]" /> : <AiOutlineHome className="text-[26px]" />}</Link>
      <Link href={"/explore"}>{path == "/explore" ? <SearchOutlined className="text-[26px]" /> : <IoIosSearch className="text-[26px]" />}</Link>
      <button onClick={() => setShowUploadOption(!showUploadOption)} className="relative">
        <BsPlusSquare className="text-[22px]" />
        {showUploadOption ? (
          <div className="bg-[#262626] w-24 h-[70px] absolute rounded-md -top-12 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
            <div className="flex flex-col w-full px-2 gap-3">
              <Link href={"/create/post"} className="flex justify-between items-center">
                <p>Post</p>
                <MdGridOn size={18} />
              </Link>
              <Link href={"/create/reel"} className="flex justify-between items-center">
                <p>Reel</p>
                <img src="/image/instagram-reel.svg" alt="" className="w-[18px]" />
              </Link>
            </div>
          </div>
        ) : (
          ""
        )}
      </button>
      <Link href={"/reels"}>{path == "/reels" ? <img src="/image/instagram-reel (1).svg" alt="" className="white-logo" /> : <img src="/image/instagram-reel.svg" alt="" className="" />}</Link>
      <Link href={"/profile"}>
        {path == "/profile" ? (
          <Image src={imageProfile} alt="profile" width={100} height={100} className="object-cover w-7 h-7 rounded-full border-2" />
        ) : (
          <Image src={imageProfile} alt="profile" width={100} height={100} className="object-cover w-7 h-7 rounded-full border-2 border-transparent" />
        )}
      </Link>
    </nav>
  ) : (
    ""
  );
};

export default Navbar;
