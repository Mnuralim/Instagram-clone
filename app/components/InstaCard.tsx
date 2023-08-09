"use client";
import React from "react";
import Image from "next/image";
import { EllipsisOutlined, HeartOutlined } from "@ant-design/icons";
import { FaRegComment } from "@react-icons/all-files/fa/FaRegComment";
import { FiSend } from "@react-icons/all-files/fi/FiSend";
import { VscBookmark } from "@react-icons/all-files/vsc/VscBookmark";
import { BsDot } from "@react-icons/all-files/bs/BsDot";

const InstaCard = () => {
  return (
    <section className="text-white">
      <div>
        <div className="flex justify-between items-center px-3 pt-5">
          <div className="flex items-center gap-3">
            <div className="rounded-full w-10 h-10 bg-red-50 p-[2px] bg-gradient-to-r from-[#FECD00] via-[#F9373F] to-[#C913B9]">
              <Image src={"/image/gambar2.jpg"} alt="profile" width={100} height={100} className="object-cover w-full h-full rounded-full bg-blue-400" />
            </div>
            <h3 className="font-semibold text-sm">izzycarcker04</h3>
          </div>
          <button>
            <EllipsisOutlined />
          </button>
        </div>
        <div className="aspect-square w-full pt-2">
          <Image src={"/image/test.jpg"} alt="profile" width={5000} height={5000} className="object-cover w-full h-full bg-blue-400" />
        </div>
        <div className="flex justify-between items-center py-2 px-3">
          <div className="flex items-center gap-6">
            <HeartOutlined className="text-white text-2xl" />
            <FaRegComment className="text-white text-2xl transform scale-x-[-1]" />
            <FiSend className="text-white text-2xl rotate-12" />
          </div>
          <VscBookmark className="text-white text-2xl" />
        </div>
        <p className="text-sm font-semibold px-3">42,150 Likes</p>
        <div className="px-3">
          <h3 className="font-semibold text-sm inline-block pr-1">izzycarcker04</h3>
          <span className="text-sm">Beautifull Vilage in Swiss </span>
          <span className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, laborum.</span>
        </div>
        <p className="px-3 text-sm text-[#A8A8A8] pt-1">View all 2000 comments</p>
        <div className="flex items-center px-3 pt-2">
          <p className="text-xs text-[#A8A8A8]">1 days ago</p>
          <BsDot className="text-[#A8A8A8]" />
          <button className="text-xs font-semibold">See translation</button>
        </div>
      </div>
    </section>
  );
};

export default InstaCard;
