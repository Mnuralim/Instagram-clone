import React from "react";
import { ReelVideo } from "./components/ReelVideo";
import { reelsVideo } from "@/data/dummy";

const Reels = () => {
  return (
    <section className="z-[999] relative bg-black">
      <div className="video-container overflow-hidden" id="video-container">
        {reelsVideo.map((list, i) => (
          <ReelVideo key={i} url={list.url} />
        ))}
      </div>
    </section>
  );
};

export default Reels;
