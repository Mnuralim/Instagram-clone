"use client";
import React, { useState, useEffect } from "react";
import { IoIosArrowBack } from "@react-icons/all-files/io/IoIosArrowBack";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { axiosAuth } from "@/lib/axios";
import Loading from "@/app/loading";
import { useTokenContext } from "@/app/context/token";
import { useUserContext } from "@/app/context/my-profile";

const EditProfile = () => {
  const [image, setImage] = useState<string | ArrayBuffer | null>("");
  const [imageProfile, setImageProfil] = useState<any>(null);
  const [prevImage, setPrevImage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const { token } = useTokenContext();
  const { users, settriger } = useUserContext();

  useEffect(() => {
    setPrevImage(users.profile.image_profile);
    setUsername(users.username);
    setName(users.profile.full_name);
    setBio(users.profile.bio);
    setLink(users.profile.link);
  }, [users]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageProfil(file);
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
    const formData: FormData = new FormData();
    formData.append("username", username.toLowerCase());
    formData.append("fullname", name);
    formData.append("bio", bio);
    formData.append("link", link);
    formData.append("image", imageProfile);
    try {
      const res = await axiosAuth.put("/user/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status == 201) {
        settriger((prev) => !prev);
        setLoading(false);
        router.push("/profile");
      } else {
        setLoading(false);
        alert(res.data.message);
      }
    } catch (error) {
      throw new Error("Error");
    }
  };

  return (
    <section className="text-white relative bg-black">
      {loading ? <Loading /> : ""}
      <button onClick={() => router.back()} className="absolute top-4 left-2">
        <IoIosArrowBack className="text-2xl font-semibold" />
      </button>
      <form onSubmit={handleSubmit} className="px-3">
        <div className="flex justify-between items-center pt-4 ">
          <div></div>
          <h2 className=" font-semibold ml-4">Edit Profile</h2>
          <button type="submit" className="text-sm text-indigo-800 font-semibold">
            Save
          </button>
        </div>
        <div className=" flex justify-between items-center  gap-3 w-full px-3 py-4 mt-4">
          <div className="flex flex-col items-center justify-center w-full gap-3">
            <label htmlFor="postFile" className="">
              {image ? (
                <Image src={image.toString()} alt="" width={100} height={100} className="object-cover w-16 h-16 rounded-full" />
              ) : (
                <Image src={prevImage} alt={"test"} width={100} height={100} className="object-cover rounded-full bg-blue-400 w-16 h-16" />
              )}
            </label>
            <input onChange={handleImageChange} accept="image/*" type="file" name="postFile" id="postFile" className="hidden" />
            <label htmlFor="postFile" className="text-sm text-indigo-800 font-bold">
              Edit picture
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="name">
            <p className="text-xs text-[#A8A8A8]">Name</p>
            <div>
              <input type="text" className="bg-transparent border-b w-full outline-none py-1" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </label>
          <label htmlFor="username">
            <p className="text-xs text-[#A8A8A8]">Username</p>
            <div>
              <input type="text" className="bg-transparent border-b w-full outline-none py-1" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
          </label>
          <label htmlFor="bio">
            <p className="text-xs text-[#A8A8A8]">Bio</p>
            <div>
              <input type="text" className="bg-transparent border-b w-full outline-none py-1" placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>
          </label>
          <label htmlFor="link">
            <p className="text-xs text-[#A8A8A8]">Link</p>
            <div>
              <input type="text" className="bg-transparent border-b w-full outline-none py-1" placeholder="Link" value={link} onChange={(e) => setLink(e.target.value)} />
            </div>
          </label>
        </div>
      </form>
    </section>
  );
};

export default EditProfile;
