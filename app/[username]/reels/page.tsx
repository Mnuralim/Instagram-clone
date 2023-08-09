"use client";
import Image from "next/image";
import Link from "next/link";

const Reels = () => {
  return (
    <section className="flex flex-col pt-1  text-white relative z-[999]">
      <div className="grid grid-cols-3 gap-[2px]">
        <div className="aspect-[9/16]">
          <Image src={"/image/test.jpg"} alt="profile" width={5000} height={5000} className="object-cover w-full h-full bg-blue-400" />
        </div>
        <div className="aspect-[9/16]">
          <Image src={"/image/test.jpg"} alt="profile" width={5000} height={5000} className="object-cover w-full h-full bg-blue-400" />
        </div>
        <div className="aspect-[9/16]">
          <Image src={"/image/test.jpg"} alt="profile" width={5000} height={5000} className="object-cover w-full h-full bg-blue-400" />
        </div>
      </div>
    </section>
  );
};

export default Reels;
