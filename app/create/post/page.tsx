"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "@react-icons/all-files/io/IoIosArrowBack";
import { MdCloudUpload } from "@react-icons/all-files/md/MdCloudUpload";
import Link from "next/link";
import Image from "next/image";
import { axiosAuth } from "@/lib/axios";
import { useRouter } from "next/navigation";
import Loading from "../../loading";
import { useTokenContext } from "@/app/context/token";
import { useUserContext } from "@/app/context/my-profile";
import { usePostContext } from "@/app/context/all-post";

const CreatePost = () => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [imagePost, setImagePost] = useState<any>(null);
  const [caption, setCaption] = useState<string>("");
  const [imageProfile, setImageProfile] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const { token } = useTokenContext();
  const { users } = useUserContext();
  const { setpostTriger } = usePostContext();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePost(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("post", imagePost);
    formData.append("category", "post");
    try {
      const res = await axiosAuth.post("/post", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status == 200) {
        setpostTriger((prev) => !prev);
        setLoading(false);
        router.push("/");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      throw new Error("error");
    }
  };

  return (
    <section className="text-white">
      {loading ? <Loading /> : ""}
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center pt-4 px-3">
          <Link href={"/"}>
            <IoIosArrowBack className="text-2xl font-semibold" />
          </Link>
          <h2 className=" font-semibold ml-4">New Post</h2>
          <button type="submit" className="text-sm text-indigo-800 font-semibold">
            Share
          </button>
        </div>
        <div className=" flex justify-between items-center  gap-3 w-full px-3 py-4 mt-4">
          <Image src={users && users?.profile?.image_profile} alt={"test"} width={100} height={100} className="object-cover rounded-full bg-blue-400 w-8 h-8" />
          <div className="w-full items-center flex">
            <div className="w-full">
              <input type="text" placeholder="Write a caption..." className="w-full outline-none  py-1 bg-transparent text-sm" value={caption} onChange={(e) => setCaption(e.target.value)} />
            </div>
            <div>
              <label htmlFor="postFile" className="">
                {image ? <Image src={image.toString()} alt="" width={100} height={100} className="object-cover w-10 h-10" /> : <MdCloudUpload className="text-3xl text-blue-700" />}
              </label>
              <input onChange={handleImageChange} accept="image/*" type="file" name="postFile" id="postFile" className="hidden" />
            </div>
          </div>
        </div>
        <h3 className="px-3 py-2 border-b border-t border-white border-opacity-20">Tag people</h3>
        <h3 className="px-3 py-2 border-b  border-white border-opacity-20">Add location</h3>
      </form>
    </section>
  );
};

export default CreatePost;
