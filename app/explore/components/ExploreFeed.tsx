"use client";
import { usePostContext } from "@/app/context/post";

import Image from "next/image";
import Link from "next/link";

const ExploreFeed = () => {
  const { posts } = usePostContext();
  return (
    <section className="flex flex-col pt-1 text-white mt-14">
      <div className="grid grid-cols-3 gap-[2px]">
        {posts.map((p) => (
          <Link href={`/${p.user_id.username}/${p._id}`} key={p._id} className="aspect-square">
            <Image src={p.media} alt={p.caption} width={5000} height={5000} className="object-cover w-full h-full bg-blue-400" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ExploreFeed;
