"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { EllipsisOutlined, HeartOutlined } from "@ant-design/icons";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "@react-icons/all-files/fa/FaRegComment";
import { FiSend } from "@react-icons/all-files/fi/FiSend";
import { VscBookmark } from "@react-icons/all-files/vsc/VscBookmark";
import { BsDot } from "@react-icons/all-files/bs/BsDot";
import Link from "next/link";
import ListLikes from "./Likes";
import { axiosAuth } from "@/lib/axios";
import { useSession } from "next-auth/react";
import DateConv from "./DateConv";
// import useAxiosAuth from "@/lib/hooks/useAxiosAuth";

type FeedCardProps = {
  data: Post;
  token: string | undefined;
  setlikeState: any;
};

const FeedCard: React.FC<FeedCardProps> = ({ data, token, setlikeState }) => {
  const [showLikeList, setShowLikeList] = useState<boolean>(false);
  const [captionText, setCaptionText] = useState<string>("");
  const [showButtonMore, setShowButtonMore] = useState<boolean>(true);
  const [alreadyLiked, setAlreadyLiked] = useState<boolean>(false);
  const [totalLikes, setTotalLikes] = useState<number>(0);

  const caption = data?.caption;
  const maxCaptionNumber = caption?.split(" ");
  const first10Words = maxCaptionNumber?.slice(0, 10);
  const result = first10Words?.join(" ");

  useEffect(() => {
    if (maxCaptionNumber.length <= 10) {
      setCaptionText(caption);
    }
  }, [caption, result, maxCaptionNumber]);

  //handle list likes button
  const handleCloseListLikes = () => {
    setShowLikeList(false);
  };

  const handleOpenListLikes = () => {
    setShowLikeList(true);
  };

  const handleChangeCaption = () => {
    setCaptionText(caption);
    setShowButtonMore(false);
  };

  useEffect(() => {
    const handleBodyOverflow = () => {
      document.body.style.overflow = showLikeList ? "hidden" : "auto";
    };
    handleBodyOverflow();
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showLikeList]);

  // already liked or not
  useEffect(() => {
    if (token) {
      const fetchDataLiked = async () => {
        const res = await axiosAuth.get(`/post/likes/${data._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAlreadyLiked(res.data.data);
      };
      fetchDataLiked();
    }
  }, [data._id, token]);

  //total likes

  useEffect(() => {
    if (token) {
      const fetchDataLiked = async () => {
        const res = await axiosAuth.get(`/post/total-likes/${data._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTotalLikes(res.data.data);
      };
      fetchDataLiked();
    }
  }, [data._id, token]);

  const handleLikeAndDislike = async () => {
    try {
      await axiosAuth.put(
        `/post/likes/${data._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const dataLike = await axiosAuth.get(`/post/likes/${data._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAlreadyLiked(dataLike.data.data);
      setlikeState((prev: boolean) => !prev);
    } catch (error) {
      throw new Error("Error");
    }
  };

  return (
    <div className="text-white relative">
      <div>
        <div className="flex justify-between items-center px-3 pt-5">
          <div className="flex items-center gap-3">
            <div className="rounded-full w-10 h-10 bg-red-50 p-[2px] bg-gradient-to-r from-[#FECD00] via-[#F9373F] to-[#C913B9]">
              <Link href={`/${data.user_id.username}`}>
                <Image src={data.user_id?.profile?.image_profile} alt={data.user_id.username} width={100} height={100} className="object-cover w-full h-full rounded-full bg-blue-400" />
              </Link>
            </div>
            <div className="flex flex-col">
              <Link href={`/${data.user_id.username}`} className="font-semibold text-sm">
                {data.user_id.username}
              </Link>
              <p className="text-xs">old traford</p>
            </div>
          </div>
          <button>
            <EllipsisOutlined />
          </button>
        </div>
        <div className="aspect-[4/5] w-full pt-2">
          <Image src={data.media} alt={data.caption} width={5000} height={5000} className="object-cover w-full h-full bg-blue-400" />
        </div>
        <div className="flex justify-between items-center py-2 px-3">
          <div className="flex items-center gap-6">
            <button onClick={handleLikeAndDislike}>{alreadyLiked ? <FcLike className="text-white text-[26px]" /> : <AiOutlineHeart className="text-white text-[26px]" />}</button>
            <Link href={`/p/${data._id}`}>
              <FaRegComment className="text-white text-2xl transform scale-x-[-1]" />
            </Link>
            <FiSend className="text-white text-2xl rotate-12" />
          </div>
          <VscBookmark className="text-white text-2xl" />
        </div>
        <button onClick={handleOpenListLikes} className="text-sm font-semibold px-3">
          {data.total_likes} Likes
        </button>
        <div className="px-3">
          <Link href={`/${data.user_id.username}`} className="font-semibold text-sm inline-block pr-1">
            {data.user_id.username}
          </Link>
          <span className="text-sm ">
            {captionText}
            {maxCaptionNumber.length >= 10 ? (
              <span>
                <span>{captionText == caption ? "" : result}</span>
                {showButtonMore && maxCaptionNumber.length >= 10 ? (
                  <button onClick={handleChangeCaption} className="text-[#A8A8A8] text-xs">
                    ... more
                  </button>
                ) : (
                  ""
                )}
              </span>
            ) : (
              ""
            )}
          </span>
        </div>
        <Link href={`/p/${data._id}`} className="px-3 text-sm text-[#A8A8A8] pt-1">
          View all {data.total_comments} comments
        </Link>
        <div className="flex items-center px-3 pt-1">
          <p className="text-xs text-[#A8A8A8] flex gap-1">
            <DateConv createdAt={data.createdAt} />
            <p>ago</p>
          </p>
          <BsDot className="text-[#A8A8A8]" />
          <button className="text-xs font-semibold">See translation</button>
        </div>
      </div>
      <ListLikes isOpen={showLikeList} onClose={handleCloseListLikes} datas={data.likes} />
    </div>
  );
};

export default FeedCard;
