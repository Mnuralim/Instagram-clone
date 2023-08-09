"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { axiosAuth } from "@/lib/axios";
import FeedCard from "@/app/components/FeedCard";
import Loading from "@/app/loading";

type Params = {
  params: {
    id: string;
  };
};

const SinglePost: React.FC<Params> = ({ params }) => {
  const [postData, setPostdata] = useState<Post | any>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const { data: session } = useSession();
  const token = session?.user.token;

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          const res = await axiosAuth.get(`/post/my-post/${params.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setPostdata(res.data.data);
          setIsLoading(false);
        } catch (error) {
          setError("Failed to fetch");
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [token, params.id]);
  console.log({ params: params.id, postData, token });

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div className="text-4xl text-red-600">{error}</div>;
  }

  return (
    <div className="mb-32">
      <div className="flex justify-between items-center pt-4 px-3">
        <Link href={`/profile/`}>
          <IoIosArrowBack className="text-2xl font-semibold" />
        </Link>
        <h2 className=" font-semibold ">Posts</h2>
        <p></p>
      </div>
      {/* <FeedCard data={post} token={token} /> */}
      <FeedCard data={postData} token={token} />
    </div>
  );
};

export default SinglePost;
