"use client";
import { PlusSquareOutlined } from "@ant-design/icons";
import { AiOutlineMenu } from "@react-icons/all-files/ai/AiOutlineMenu";
import { HiOutlineUserAdd } from "@react-icons/all-files/hi/HiOutlineUserAdd";
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";
import { IoIosArrowDown } from "@react-icons/all-files/io/IoIosArrowDown";
import { MdGridOn } from "@react-icons/all-files/md/MdGridOn";
import { BsPersonCheck } from "@react-icons/all-files/bs/BsPersonCheck";
import { AiOutlineLink } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { axiosAuth } from "@/lib/axios";
import { useUserContext } from "@/app/context/my-profile";

const MainProfile = () => {
  const [showMainProfile, setShowMainProfile] = useState<boolean>(true);
  const path = usePathname();
  const params = useParams();

  const { users } = useUserContext();

  useEffect(() => {
    if (path) {
      if (path.startsWith(`/profile/${params?.id}`)) {
        setShowMainProfile(false);
      } else if (path.startsWith(`/profile/edit/`)) {
        setShowMainProfile(false);
      } else {
        setShowMainProfile(true);
      }
    }
  }, [path]);
  return showMainProfile ? (
    <section className="flex flex-col pt-[10px] text-white bg-black z-[999] relative">
      <div className="w-full justify-between items-center flex px-3">
        <div>
          <h1 className="font-semibold text-2xl">{users?.username}</h1>
        </div>
        <div className="flex justify-center items-center gap-5">
          <PlusSquareOutlined className="text-white text-2xl" />
          <button onClick={() => signOut()}>
            <AiOutlineMenu className="text-white text-2xl" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-12 w-full mt-5  px-3 ">
        <div className="rounded-full w-16 h-16 relative overflow-hidden">
          <Image src={users?.profile?.image_profile} alt="profile" width={64} height={64} className="object-cover w-[64px] h-[64px] rounded-full" />
        </div>
        <div className="flex gap-8">
          <div className="text-center">
            <h3 className="font-bold text-lg">{users?.total_post}</h3>
            <p>Posts</p>
          </div>
          <div className="text-center">
            <h3 className="font-bold text-lg">{users?.total_followers}</h3>
            <p>Followers</p>
          </div>
          <div className="text-center">
            <h3 className="font-bold text-lg">{users?.total_following}</h3>
            <p>Following</p>
          </div>
        </div>
      </div>

      <div className="mt-1 px-3">
        <h2 className="font-semibold">{users?.profile?.full_name}</h2>
        <p className="text-sm">{users?.profile?.bio}</p>
        <Link href={users?.profile?.link || "/"} target="_blank" className="text-sm text-[#E0F1FF]">
          <AiOutlineLink className="inline text-lg" /> {users?.profile?.link}
        </Link>
      </div>

      <div className="flex items-center gap-1 my-3 px-3">
        <Link href={`/profile/edit/${users?.username}`} className="bg-[#262626] py-1 w-[45%] text-center rounded-lg font-semibold">
          Edit profile
        </Link>
        <button className="bg-[#262626] py-1 w-[45%] text-center rounded-lg font-semibold">Share profile</button>
        <button className="bg-[#262626] py-1 w-[9%]  rounded-lg font-semibold">
          <HiOutlineUserAdd className="text-center inline-block transform scale-x-[-1]" />
        </button>
      </div>

      <div className="px-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">Story highlights</h2>
          <IoIosArrowDown className="transform scale-y-[-1]" />
        </div>
        <p className="text-sm">Keep your favorite stories on your profile</p>
        <div className="flex justify-between gap-3 mt-2">
          <div>
            <button className="w-14 h-14 flex justify-center items-center rounded-full border border-white">
              <AiOutlinePlus className="inline-block text-2xl" />
            </button>
            <p className="text-center text-sm">New</p>
          </div>
          <div className="w-14 h-14 flex justify-center items-center rounded-full bg-[#262626]"></div>
          <div className="w-14 h-14 flex justify-center items-center rounded-full bg-[#262626]"></div>
          <div className="w-14 h-14 flex justify-center items-center rounded-full bg-[#262626]"></div>
          <div className="w-14 h-14 flex justify-center items-center rounded-full bg-[#262626]"></div>
        </div>
      </div>

      <div className="grid grid-cols-3">
        <Link
          href={"/profile"}
          className={
            path == "/profile"
              ? "border-b-[2px] flex justify-center items-center py-3 transform transition-all ease-linear duration-200"
              : "flex justify-center items-center py-3 border-b-[2px] border-b-transparent transform transition-all ease-linear duration-200 text-[#A8A8A8]"
          }
        >
          <MdGridOn className="text-2xl" />
        </Link>
        <Link
          href={"/profile/reels"}
          className={
            path == "/profile/reels"
              ? "border-b-[2px] flex justify-center items-center py-3 transform transition-all ease-linear duration-200"
              : "flex justify-center items-center py-3 transform transition-all ease-linear duration-200 border-b-[2px] border-b-transparent"
          }
        >
          <img src="/image/instagram-reel.svg" alt="" className={path == "/profile/reels" ? "" : "grayish-img"} />
        </Link>
        <Link
          href={"/profile/tagged"}
          className={
            path == "/profile/tagged"
              ? "border-b-[2px] flex justify-center items-center py-3 transform transition-all ease-linear duration-200"
              : "flex justify-center items-center py-3 transform transition-all ease-linear duration-200 border-b-[2px] border-b-transparent text-[#A8A8A8]"
          }
        >
          <BsPersonCheck className="text-2xl" />
        </Link>
      </div>
    </section>
  ) : (
    ""
  );
};

export default MainProfile;
