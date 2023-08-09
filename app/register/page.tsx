"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsFacebook } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { axiosAuth } from "@/lib/axios";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axiosAuth.post("/user/register", {
        username: username.toLowerCase(),
        email,
        password,
      });
      if (res.status == 200) {
        router.push("/login");
      } else {
        setMessage(res.data.data);
      }
    } catch (error) {
      throw new Error("Internal server error");
    }
  };

  return (
    <section className="flex justify-between flex-col items-center h-screen">
      <div className="pt-3"></div>
      <div className="flex flex-col w-5/6 gap-3">
        <center>
          <p className="text-sm text-red-600">{message}</p>
        </center>
        <center>
          <Image src={"/image/iglogo.png"} alt="logo" width={10300} height={1000} className="white-logo pt-1 object-cover w-[193px] h-[59px]" />
        </center>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <input type="text" name="username" id="username" placeholder="Username" className="w-full bg-[#262626] py-3 px-3 outline-none rounded-md" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <input type="email" name="email" id="email" placeholder="Email" className="w-full bg-[#262626] py-3 px-3 outline-none rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <input type="password" name="password" id="password" placeholder="Password" className="w-full bg-[#262626] py-3 px-3 outline-none rounded-md" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="text-white bg-blue-500 py-3 rounded-md">
            Register
          </button>
        </form>
        <p className="text-sm text-center text-[#A8A8A8]">
          Have problems?{" "}
          <Link href={"#"} className="text-slate-300 font-semibold">
            Support.
          </Link>
        </p>
        <div className="flex items-center gap-1">
          <div className="w-full h-[1px] bg-[#262626] bg-opacity-50"></div>
          <h3 className="text-[#A8A8A8] font-semibold">OR</h3>
          <div className="w-full h-[1px] bg-[#262626] bg-opacity-50"></div>
        </div>
        <button className="bg-blue-600 flex justify-center items-center gap-1 py-3 rounded-md">
          <BsFacebook className="text-2xl" />
          <p className="font-bold">Continue with Facebook</p>
        </button>
      </div>
      <div className="pb-3">
        <p className="text-sm text-center text-[#A8A8A8]">
          Do you have an account?{" "}
          <Link href={"/login"} className="text-slate-300 font-semibold">
            Login.
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
