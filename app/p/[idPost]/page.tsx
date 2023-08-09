"use client";
import Image from "next/image";
import { HeartOutlined } from "@ant-design/icons";
import { IoIosArrowBack } from "@react-icons/all-files/io/IoIosArrowBack";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { axiosAuth } from "@/lib/axios";
import DateConv from "@/app/components/DateConv";

// import useAxiosAuth from "@/lib/hooks/useAxiosAuth";

type Params = {
  params: {
    idPost: string;
  };
};

const IdPost: React.FC<Params> = ({ params }) => {
  const [commentLists, setCommentLists] = useState<Comments[] | []>([]);
  const [comment, setComment] = useState<string>("");
  const [postUser, setPostUser] = useState<string>("");
  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      return router.replace("/login");
    },
  });
  const imageProfile = session?.user.profile_image || "/";
  const token = session?.user.token;

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        const post = await axiosAuth.get(`/post/${params.idPost}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPostUser(post.data.data.user_id.username);
      };
      fetchData();
    }
  });

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        const commentsData = await axiosAuth.get(`/comment/${params.idPost}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCommentLists(commentsData.data.data);
      };
      fetchData();
    }
  }, [params.idPost, token]);

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await axiosAuth.post(
        `/comment/${params.idPost}`,
        {
          comment: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.status == 200) {
        setComment("");
        const getComments = await axiosAuth.get(`/comment/${params.idPost}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCommentLists(getComments.data.data);
        router.refresh();
      } else {
        alert("error");
      }
    } catch (error) {
      alert("Internal srver error");
    }
  };
  return (
    <section className="bg-[#262626] relative z-[999999999] min-h-screen">
      <div className="flex justify-between items-center pt-4 px-3">
        <button onClick={() => router.back()}>
          <IoIosArrowBack className="text-2xl font-semibold" />
        </button>
        <h2 className=" font-semibold ">Comments</h2>
        <p></p>
      </div>
      <div className="w-full h-[1px] bg-white my-2"></div>
      <div className="px-2 pb-32">
        {commentLists.map((c) => (
          <div key={c._id} className="flex gap-2 justify-between mb-2">
            <div className="flex gap-3">
              <Image src={c.user.profile.image_profile} alt={"profile"} width={100} height={100} className="object-cover rounded-full bg-blue-400 w-10 h-10 mt-2" />
              <div className="flex flex-col gap-1">
                <p className="text-xs font-semibold flex">
                  <p>{c.user.username}</p>
                  <span className="text-[#a8a8a8] pl-1 text-xs">
                    <DateConv createdAt={c.createdAt} />
                  </span>
                </p>
                <p className="text-sm">{c.text}</p>
                <div className="flex  text-xs gap-4 text-[#a8a8a8]">
                  <button>Reply</button>
                  <button>See translation</button>
                </div>
              </div>
            </div>
            <div className="flex mt-3">
              <div className="flex flex-col items-center gap-1 text-[#a8a8a8]">
                <HeartOutlined />
                <p className="text-xs">453</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed flex justify-between items-center bottom-0 gap-3 w-full px-3 py-1 bg-[#262626]">
        <Image src={imageProfile} alt={"profile"} width={100} height={100} className="object-cover rounded-full bg-blue-400 w-10 h-10" />
        <form onSubmit={handleSumbit} className="w-full flex">
          <div className="w-full">
            <input type="text" placeholder={`Add a comment for ${postUser}...`} className="w-full outline-none  py-1 bg-transparent text-sm" value={comment} onChange={(e) => setComment(e.target.value)} />
          </div>
          <button className="text-sm text-blue-500" type="submit">
            Post
          </button>
        </form>
      </div>
    </section>
  );
};

export default IdPost;
