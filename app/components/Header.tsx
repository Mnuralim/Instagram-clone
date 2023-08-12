"use client";
import { HeartOutlined, PlusSquareOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const path = usePathname();

  useEffect(() => {
    if (path?.startsWith("/p")) {
      setShowHeader(false);
    } else if (path?.startsWith("/create")) {
      setShowHeader(false);
    } else if (path?.startsWith("/login")) {
      setShowHeader(false);
    } else if (path?.startsWith("/register")) {
      setShowHeader(false);
    } else if (path?.startsWith("/accounts")) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  }, [path]);

  return showHeader ? (
    <section className="flex py-[10px] justify-between items-center px-3 fixed top-0 w-full bg-black z-[100]">
      <Link href={"/"}>
        <Image src={"/image/iglogo.png"} alt="logo" width={123} height={39} className="white-logo pt-1 object-cover w-[123px] h-[39px]" />
      </Link>
      <div className="flex justify-center gap-5">
        <PlusSquareOutlined className="text-white text-2xl" />
        <HeartOutlined className="text-white text-2xl" />
      </div>
    </section>
  ) : (
    ""
  );
};

export default Header;
