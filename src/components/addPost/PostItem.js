import { db } from "firebase-app/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PostItem = ({ data }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  useEffect(() => {
    async function fetchUser() {
      const docRef = doc(db, "users", data.userId);
      const docSnap = await getDoc(docRef);
      setUser(docSnap.data());
    }
    fetchUser();
  }, [data.userId]);

  let timeString = moment(data.createAt.seconds * 1000).fromNow();
  if (moment().diff(moment(data.createAt.seconds * 1000), "days") > 7) {
    timeString = moment(data.createAt.seconds * 1000).format(
      "DD/MM/YYYY HH:mm:ss"
    );
  }
  return (
    <div className="max-w-[528px] mx-5 h-auto mt-5 ">
      <div className="flex items-center justify-between pt-3">
        <div className="flex items-center">
          <img
            src={user.avatar}
            alt=""
            className="border border-gray-500 rounded-full w-9 h-9"
          />
          <p className="px-2 font-bold">{user?.username || user.fullname}</p>
          <p>{timeString}</p>
        </div>
        <i className="mt-2 text-xl bx bx-grid-alt"></i>
      </div>
      <div>
        <img
          src={data.image}
          alt=""
          className="object-cover w-full h-auto mt-2 cursor-pointer"
          onClick={() => navigate(`/PostAbout?id=${data.id}`)}
        />

        <div className="flex items-start justify-between">
          <div className="">
            <i className="text-3xl bx bx-heart"></i>
            <i className="mx-4 my-2 text-3xl bx bx-comment-detail "></i>
            <i className="text-3xl bx bx-share"></i>
          </div>
          <i className="text-3xl bx bx-label"></i>
        </div>
        <p className="font-bold ">1.989 lượt thích</p>
        <div className="flex">
          <p className="font-bold ">{user?.username || user.fullname}</p>
          <p className="px-2 ">{data.stt}</p>
        </div>
        <p>Xem bình luận</p>
        <input
          type="text"
          className="w-full focus:border-none"
          placeholder="Thêm bình luận"
        />
      </div>
    </div>
  );
};

export default PostItem;
