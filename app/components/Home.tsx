"use client";
import React, { useState, useEffect } from "react";
import FeedCard from "./FeedCard";
import { useSession } from "next-auth/react";
import { axiosAuth } from "@/lib/axios";
import { useRouter } from "next/navigation";

const HomePage = () => {
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
    <section className="text-white" id="home">
      {post?.map((post) => (
        <FeedCard key={post._id} data={post} token={token} />
      ))}
    </section>
  );
};

export default HomePage;
