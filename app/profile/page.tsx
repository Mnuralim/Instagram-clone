"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { axiosAuth } from "@/lib/axios";
import { usePostContextByUsername } from "../context/get-post-by-username";
import { useUserContext } from "../context/my-profile";

const Profile = () => {
  const { posts, setUsername } = usePostContextByUsername();
  const { users } = useUserContext();
  useEffect(() => {
    setUsername(users.username);
  });

  return (
    <section className="flex flex-col pt-1  text-white mb-20">
      <div className="grid grid-cols-3 gap-[2px]">
        {posts?.map((p) => (
          <Link key={p._id} href={`/profile/${p._id}`} className="aspect-square">
            <Image src={p.media} alt={p.caption} width={5000} height={5000} className="object-cover w-full h-full bg-blue-400" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Profile;
