import moment from "moment";
import React from "react";

const Comment = ({ post }) => {
  const timePost = {
    ...post.createAt,
  };
  let timeString = moment(timePost.seconds * 1000).fromNow();
  if (moment().diff(moment(timePost.seconds * 1000), "days") > 7) {
    timeString = moment(post.createAt.seconds * 1000).format(
      "DD/MM/YYYY HH:mm:ss"
    );
  }

  console.log(post);

  return (
    <div className="flex flex-wrap items-center w-auto mb-3">
      <img src={post.avatar} alt="" className="rounded-full w-7 h-7" />
      <p className="px-2 font-bold">{post.commentNameUser} : </p>
      <p className="w-auto break-all">{post.commentPost}</p>{" "}
      <p className="mb-2 ml-2 text-xs text-gray-500">{timeString}</p>
    </div>
  );
};

export default Comment;
