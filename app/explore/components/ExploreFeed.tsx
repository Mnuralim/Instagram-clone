"use client";
import { axiosAuth } from "@/lib/axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ExploreFeed = () => {
  const [post, setPost] = useState<Post[]>([]);
  const { data: session } = useSession();
  const token = session?.user.token;

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        const res = await axiosAuth.get("/post", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPost(res.data.data);
      };
      fetchData();
    }
  }, [token]);
  return (
    <section className="flex flex-col pt-1 text-white mt-14">
      <div className="grid grid-cols-3 gap-[2px]">
        {post.map((p) => (
          <Link href={`/${p.user_id.username}/${p._id}`} key={p._id} className="aspect-square">
            <Image src={p.media} alt={p.caption} width={5000} height={5000} className="object-cover w-full h-full bg-blue-400" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ExploreFeed;
