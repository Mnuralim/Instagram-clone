"use client";
import { HeartOutlined, EllipsisOutlined } from "@ant-design/icons";
import { FaRegComment } from "@react-icons/all-files/fa/FaRegComment";
import { FiSend } from "@react-icons/all-files/fi/FiSend";
import { FaMusic } from "@react-icons/all-files/fa/FaMusic";
import { BsDot } from "@react-icons/all-files/bs/BsDot";
import { BsFillPlayFill } from "@react-icons/all-files/bs/BsFillPlayFill";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export const ReelVideo = ({ url }: any) => {
  const [isVideoPlaying, setisVideoPlaying] = useState(false);

  const vidRef = useRef<HTMLVideoElement>(null);
  const onVideoClick = () => {
    if (isVideoPlaying) {
      vidRef.current?.pause();
      setisVideoPlaying(false);
    } else {
      vidRef.current?.play();
      setisVideoPlaying(true);
    }
  };

  useEffect(() => {
    const scroll = document.getElementById("video-container");

    if (scroll) {
      scroll.addEventListener("scroll", () => {
        vidRef.current?.pause();
      });
    }
  }, []);
  return (
    <div className="relative ">
      <video src={url} loop className="video-player" ref={vidRef} onClick={onVideoClick} />
      <div className="absolute right-3 bottom-10 flex flex-col items-center gap-2">
        <HeartOutlined className="text-white text-3xl" />
        <p className="text-sm font-semibold">27.7K</p>
        <FaRegComment className="text-white text-3xl transform scale-x-[-1]" />
        <p className="text-sm font-semibold">120</p>
        <FiSend className="text-white text-3xl rotate-12" />
        <p className="text-sm font-semibold">86</p>
        <EllipsisOutlined className="text-3xl rotate-90" />
        <Image src={"/image/patrick2.jpg"} alt="" width={100} height={200} className="object-cover rounded-md w-6 border-2 h-6" />
      </div>
      {isVideoPlaying ? (
        ""
      ) : (
        <div className="bg-slate-800/75 w-12 h-12 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center transition-all duration-500 ease-in-out">
          <BsFillPlayFill className="text-white text-3xl" />
        </div>
      )}

      <div className="absolute left-3 bottom-8 w-full">
        <div className="flex items-center gap-2 mb-3">
          <Image src={"/image/patrick2.jpg"} alt="" width={100} height={200} className="object-cover rounded-full w-11 h-11" />
          <h2 className="font-bold">serba.viral</h2>
          <button className="py-1 px-3 border font-semibold rounded-md text-sm">Follow</button>
        </div>
        <p className="text-base">Lorem ipsum dolor consecelit ...</p>
        <div>
          <div className="relative flex w-full items-center my-5">
            <Image src={"/image/patrick2.jpg"} alt="" width={100} height={200} className="object-cover z-20 absolute left-0 rounded-full w-4 h-4" />
            <Image src={"/image/patrick2.jpg"} alt="" width={100} height={200} className="object-cover z-10 absolute left-3 rounded-full w-4 h-4" />
            <Image src={"/image/patrick2.jpg"} alt="" width={100} height={200} className="object-cover absolute left-6 rounded-full w-4 h-4" />
            <p className="absolute left-12 text-sm text-slate-300">Liked by bagus_r and 208,427 others</p>
          </div>
        </div>
        <div className="flex items-center text-sm gap-1">
          <FaMusic />
          <p>Stephen Sanchez</p>
          <BsDot />
          <p>Until I Found You</p>
        </div>
      </div>
    </div>
  );
};
