type ReelsVideo = {
  id: number;
  url: string;
};

type singleFeed = {
  id: number;
  username: string;
  profileImage: string;
  postImage: string;
  postCaption: string;
  postLikesNumber: number;
  postCommentNumber: number;
  location: string;
};

//start

type User = {
  _id: string;
  profile: {
    image_profile: string;
    full_name: string;
    bio: string;
    link: string;
  };
  username: string;
  email: string;
  followers: [];
  following: [];
  total_following: number;
  total_followers: number;
  total_post: number;
};

type Comments = {
  _id: string;
  text: string;
  user: {
    profile: {
      image_profile: string;
    };
    username: string;
  };
  createdAt: Date;
};
type Like = {
  profile: {
    image_profile: string;
    full_name: string;
  };
  username: string;
  _id: string;
};

type Post = {
  _id: string;
  user_id: {
    profile: {
      image_profile: string;
    };
    _id: string;
    username: string;
  };
  caption: string;
  media: string;
  comments: Comments[];
  likes: Like[];
  total_likes: number;
  total_comments: number;
  createdAt: Date;
};
