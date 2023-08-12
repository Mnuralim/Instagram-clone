"use client";
import { AiOutlineMenu } from "@react-icons/all-files/ai/AiOutlineMenu";
import { HiOutlineUserAdd } from "@react-icons/all-files/hi/HiOutlineUserAdd";
import { MdGridOn } from "@react-icons/all-files/md/MdGridOn";
import { AiOutlineLink } from "react-icons/ai";
import { FiBell } from "react-icons/fi";
import { BsPersonCheck } from "@react-icons/all-files/bs/BsPersonCheck";
import { IoIosArrowBack } from "@react-icons/all-files/io/IoIosArrowBack";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { axiosAuth } from "@/lib/axios";
import { useOtherUserContext } from "@/app/context/other-profile";
import { useTokenContext } from "@/app/context/token";
import { useUserContext } from "@/app/context/my-profile";

const MainProfile = () => {
  const [showMainProfile, setShowMainProfile] = useState<boolean>(true);
  const [profile, setProfile] = useState<User | null>();
  const [buttonFollow, setButtonFollow] = useState<boolean>(false);
  const [showMyProfile, setShowMyProfile] = useState<boolean>(false);
  const path = usePathname();
  const router = useRouter();
  const params = useParams();
  const username = params?.username as string;

  const { users, setusername } = useOtherUserContext();
  const { users: user } = useUserContext();
  const { token } = useTokenContext();

  useEffect(() => {
    setusername(username);
    if (path?.startsWith(`/${username}/${params?.id}`)) {
      setShowMainProfile(false);
    } else if (path?.startsWith(`/profile/edit/`)) {
      setShowMainProfile(false);
    } else {
      setShowMainProfile(true);
    }
  }, [path, setShowMainProfile, params?.id, username, setusername]);

  useEffect(() => {
    if (token) {
      const fethData = async () => {
        const res = await axiosAuth.get(`/user/follow/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setButtonFollow(res.data.data);
      };
      fethData();
    }
  });

  useEffect(() => {
    if (token) {
      if (user.username == params?.username) {
        setShowMyProfile(true);
      } else {
        setShowMyProfile(false);
      }
    }
  }, [token, params?.username, user.username]);

  const handleFollow = async () => {
    try {
      const res = await axiosAuth.post(
        `/user/follow/${params?.username}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const getData = await axiosAuth.get(`/user/${params?.username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(getData.data.data);
      setButtonFollow(res.data.data);
    } catch (error) {
      throw new Error("Error");
    }
  };

  return showMainProfile ? (
    <section className="flex flex-col pt-[10px] text-white bg-black z-[999] relative">
      <div className="w-full justify-between items-center flex px-3">
        <div className="flex items-center gap-8">
          <button onClick={() => router.back()}>
            <IoIosArrowBack className="text-2xl font-semibold" />
          </button>
          <h1 className="font-semibold text-2xl">{users?.username}</h1>
        </div>
        <div className="flex justify-center items-center gap-5">
          <FiBell className="text-white text-2xl" />
          <AiOutlineMenu className="text-white text-2xl" />
        </div>
      </div>

      <div className="flex items-center gap-16 w-full mt-5  px-3 ">
        <div className="rounded-full w-16 h-16 relative overflow-hidden">
          <Image src={users?.profile?.image_profile} alt={users?.username || "profile"} width={70} height={70} className="object-cover w-full h-full" />
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
        <h2 className="font-semibold">{users?.username}</h2>
        <p className="text-sm">{users?.profile?.bio}</p>
        <Link href={users?.profile?.link || "/"} target="_blank" className="text-sm text-[#E0F1FF]">
          <AiOutlineLink className="inline text-lg" /> {users?.profile?.link}
        </Link>
      </div>
      {showMyProfile ? (
        <div className="flex items-center gap-1 my-3 px-3">
          <Link href={`/profile/edit/${users?.username}`} className="bg-[#262626] py-1 w-[45%] text-center rounded-lg font-semibold">
            Edit profile
          </Link>
          <button className="bg-[#262626] py-1 w-[45%] text-center rounded-lg font-semibold">Share profile</button>
          <button className="bg-[#262626] py-1 w-[9%]  rounded-lg font-semibold">
            <HiOutlineUserAdd className="text-center inline-block transform scale-x-[-1]" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-1 my-3 px-3">
          <button onClick={handleFollow} className={`${buttonFollow ? "bg-[#262626]" : "bg-[#0195f7]"} py-1 w-[45%] text-center rounded-lg font-semibold`}>
            {buttonFollow ? "Following" : "Follow"}
          </button>

          <button className="bg-[#262626] py-1 w-[45%] text-center rounded-lg font-semibold">Message</button>
          <button className="bg-[#262626] py-1 w-[9%]  rounded-lg font-semibold">
            <HiOutlineUserAdd className="text-center inline-block transform scale-x-[-1]" />
          </button>
        </div>
      )}

      <div className="px-3">
        <div className="flex justify-between gap-3 mt-2">
          <div className="w-14 h-14 flex justify-center items-center rounded-full bg-[#262626]"></div>
          <div className="w-14 h-14 flex justify-center items-center rounded-full bg-[#262626]"></div>
          <div className="w-14 h-14 flex justify-center items-center rounded-full bg-[#262626]"></div>
          <div className="w-14 h-14 flex justify-center items-center rounded-full bg-[#262626]"></div>
        </div>
      </div>

      <div className="grid grid-cols-3">
        <Link
          href={`/${params?.username}`}
          className={
            path == `/${params?.username}`
              ? "border-b-[2px] flex justify-center items-center py-3 transform transition-all ease-linear duration-200"
              : "flex justify-center items-center py-3 border-b-[2px] border-b-transparent transform transition-all ease-linear duration-200 text-[#A8A8A8]"
          }
        >
          <MdGridOn className="text-2xl" />
        </Link>
        <Link
          href={`/${params?.username}/reels`}
          className={
            path == `/${params?.username}/reels`
              ? "border-b-[2px] flex justify-center items-center py-3 transform transition-all ease-linear duration-200"
              : "flex justify-center items-center py-3 transform transition-all ease-linear duration-200 border-b-[2px] border-b-transparent "
          }
        >
          <img src="/image/instagram-reel.svg" alt="" className={path == `/${params?.username}/reels` ? "" : "grayish-img"} />
        </Link>
        <Link
          href={`/${params?.username}/tagged`}
          className={
            path == `/${params?.username}/tagged`
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
