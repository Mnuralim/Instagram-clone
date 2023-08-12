"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsFacebook } from "react-icons/bs";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "../loading";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
      const data = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      console.log(data);
      if (data?.ok) {
        setLoading(false);
        router.push("/");
      } else {
        setLoading(false);
        router.push("/login");
      }
    } catch (error) {
      throw new Error("error");
    }
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <section className="flex justify-between flex-col items-center h-screen">
      <div className="pt-3"></div>
      <div className="flex flex-col w-5/6 gap-3">
        <center>
          <Image src={"/image/iglogo.png"} alt="logo" width={10300} height={1000} className="white-logo pt-1 object-cover w-[193px] h-[59px]" />
        </center>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <input type="email" name="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#262626] py-3 px-3 outline-none rounded-md" />
          </div>
          <div>
            <input type="password" name="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#262626] py-3 px-3 outline-none rounded-md" />
          </div>
          <button type="submit" className="text-white bg-blue-500 py-3 rounded-md">
            Log in
          </button>
        </form>
        <p className="text-sm text-center text-[#A8A8A8]">
          Forgot your login details?{" "}
          <Link href={"#"} className="text-slate-300 font-semibold">
            Get help logging in.
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
          Don&apos;t have an account?{" "}
          <Link href={"/register"} className="text-slate-300 font-semibold">
            Sign up.
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
