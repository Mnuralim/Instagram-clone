"use client";
import React from "react";
import FeedCard from "./FeedCard";
import { useTokenContext } from "../context/token";
import { usePostContext } from "../context/post";

const HomePage = () => {
  const { posts, setTotalLikeState } = usePostContext();

  const { token } = useTokenContext();

  return (
    <section className="text-white" id="home">
      {posts?.map((post) => (
        <FeedCard key={post._id} data={post} token={token} setlikeState={setTotalLikeState} />
      ))}
    </section>
  );
};

export default HomePage;
