"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { axiosAuth } from "@/lib/axios";

type Params = {
  params: {
    username: string;
  };
};

const Profile: React.FC<Params> = ({ params }) => {
  const [post, setPost] = useState<Post[]>([]);
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      return router.replace("/login");
    },
  });
  const token = session?.user.token;

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        const res = await axiosAuth.get(`/post/otheruser-post/${params.username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPost(res.data.data);
      };
      fetchData();
    }
  }, [token, params.username]);

  return (
    <section className="flex flex-col pt-1  text-white mb-20">
      <div className="grid grid-cols-3 gap-[2px]">
        {post?.map((p) => (
          <Link key={p._id} href={`/${params.username}/${p._id}`} className="aspect-square">
            <Image src={p.media} alt={p.caption} width={5000} height={5000} className="object-cover w-full h-full bg-blue-400" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Profile;
