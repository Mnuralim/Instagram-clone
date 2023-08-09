"use client";
import { IoIosArrowBack } from "@react-icons/all-files/io/IoIosArrowBack";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import Image from "next/image";
import { useEffect } from "react";
import { axiosAuth } from "@/lib/axios";
import { useSession } from "next-auth/react";
import Link from "next/link";

type Params = {
  datas: Like[];
  onClose: any;
  isOpen: boolean;
};

const ListLikes: React.FC<Params> = ({ datas, onClose, isOpen }) => {
  const { data: session } = useSession();
  const token = session?.user.token;
  const handleFollow = async () => {};

  if (!isOpen) return null;

  return (
    <section className="bg-black z-[999999999] min-h-screen fixed inset-0  overflow-auto ">
      <div className="flex justify-between items-center pt-4 px-3">
        <button onClick={onClose}>
          <IoIosArrowBack className="text-2xl font-semibold" />
        </button>
        <h2 className="font-semibold">Likes</h2>
        <p></p>
      </div>
      <div className="w-full h-[1px] bg-white my-2"></div>
      <form className="relative flex items-center w-full px-3 mt-5">
        <input type="text" className="bg-[#262626] w-full pl-14 py-2 rounded-lg outline-none placeholder:text-lg" placeholder="Search" />
        <div className="absolute inset-y-0 left-3 flex items-center px-4 bg-transparent rounded-r-lg">
          <AiOutlineSearch className="text-2xl" />
        </div>
      </form>
      <div className="px-2 flex flex-col mt-4 gap-1">
        {datas.map((data) => (
          <div key={data._id} className="flex justify-between items-center">
            <Link href={`/${data.username}`} className="flex items-center gap-3">
              <Image src={data.profile.image_profile} alt={"test"} width={100} height={100} className="object-cover rounded-full bg-blue-400 w-14 h-14 mt-2" />
              <div>
                <h2 className="font-semibold text-sm">{data.username}</h2>
                <p className="text-[#A8A8A8]">{data.profile?.full_name}</p>
              </div>
            </Link>
            <div>
              <button className="bg-[#0195f7] font-bold py-1 w-24 rounded-md">Follow</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ListLikes;
