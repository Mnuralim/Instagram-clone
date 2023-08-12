"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { axiosAuth } from "@/lib/axios";
import { usePostContextByUsername } from "../context/get-post-by-username";

type Params = {
  params: {
    username: string;
  };
};

const Profile: React.FC<Params> = ({ params }) => {
  const { posts, setUsername } = usePostContextByUsername();

  useEffect(() => {
    setUsername(params.username);
  }, []);

  return (
    <section className="flex flex-col pt-1  text-white mb-20">
      <div className="grid grid-cols-3 gap-[2px]">
        {posts?.map((p) => (
          <Link key={p._id} href={`/${params.username}/${p._id}`} className="aspect-square">
            <Image src={p.media} alt={p.caption} width={5000} height={5000} className="object-cover w-full h-full bg-blue-400" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Profile;
