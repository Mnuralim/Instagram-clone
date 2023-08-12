import React from "react";

const Loading = () => {
  return (
    <div className="flex relative items-center justify-center top-0 z-[9999999999999999999999999999999] bg-black min-h-screen">
      <div className="w-full h-[2px] bg-gradient-to-r from-[#FECD00] via-[#F9373F] to-[#C913B9] animate-slide-right absolute top-1 duration-700"></div>
    </div>
  );
};

export default Loading;
