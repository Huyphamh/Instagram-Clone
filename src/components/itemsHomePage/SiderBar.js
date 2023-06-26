import React, { useEffect, useState } from "react";
import HeaderHomePage from "./HeaderHomePage";
import AddNewPost from "components/addPost/AddNewPost";
import { useAuth } from "contexts/auth-context";
import { doc, getDoc } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import { useNavigate } from "react-router-dom";

const SiderBar = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const [user, setUser] = useState({});
  useEffect(() => {
    async function fetchUser() {
      if (userInfo && userInfo.uid) {
        const colRel = doc(db, "users", userInfo.uid);
        const docSnap = await getDoc(colRel);
        setUser(docSnap.data());
      }
    }
    fetchUser();
  }, [userInfo]);
  return (
    <div>
      <HeaderHomePage></HeaderHomePage>
      <div className="fixed bottom-0 w-full bg-white border sm:w-auto sm:h-full sm:border-r-black border-t-black">
        <div className="flex items-center justify-center pl-4 pr-5 text-center md:pl-2 sm:block">
          <div className="flex items-center justify-center mx-2 mt-2 md:my-5 hover:cursor-pointer">
            <i className="hidden text-3xl sm:block lg:hidden bx bxl-instagram sm:py-1 sm:my-3"></i>
            <h1 className="hidden py-5 text-2xl lg:block">Instagram</h1>
          </div>
          <div className="flex items-center px-5 mt-2 rounded-lg ss:px-5 sm:py-1 sm:my-3 hover:cursor-pointer lg:pr-20 hover:bg-slate-200">
            <i className="text-3xl bx bxs-home"></i>{" "}
            <p className="hidden ml-3 text-base lg:block"> Trang chủ</p>
          </div>
          <div className="flex items-center px-5 mt-2 rounded-lg ss:px-5 sm:py-1 sm:my-3 hover:cursor-pointer lg:pr-20 hover:bg-slate-200">
            <i className="text-3xl bx bx-search-alt"></i>
            <p className="hidden ml-3 text-base lg:block">Tìm kiếm</p>
          </div>

          <div className="flex items-center px-5 mt-2 rounded-lg px ss:px-5 sm:py-1 sm:my-3 hover:cursor-pointer lg:pr-20 hover:bg-slate-200">
            <i className="text-3xl bx bx-movie-play"></i>
            <p className="hidden ml-3 text-base lg:block">Reels</p>
          </div>
          <div className="items-center hidden px-5 mt-2 rounded-lg ss:px-5 sm:flex sm:py-1 sm:my-3 hover:cursor-pointer lg:pr-20 hover:bg-slate-200">
            <i className="text-3xl bx bxl-messenger"></i>
            <p className="hidden ml-3 text-base lg:block ">Tin nhắn</p>
          </div>
          <div className="items-center hidden px-5 mt-2 rounded-lg ss:px-5 sm:flex sm:py-1 sm:my-3 hover:cursor-pointer lg:pr-20 hover:bg-slate-200">
            <i className="text-3xl bx bx-heart"></i>
            <p className="hidden ml-3 text-base lg:block">Thông báo</p>
          </div>
          <AddNewPost></AddNewPost>
          <div
           onClick={()=> navigate(`/Personal?${user.fullname}`)}
           className="flex items-center px-5 mt-2 rounded-lg ss:px-5 sm:py-1 sm:my-3 hover:cursor-pointer lg:pr-20 hover:bg-slate-200">
            <img
              src={user.avatar}
              alt=""
              className="w-8 h-8 mr-2 border border-gray-500 rounded-full"
            />
            <p className="hidden ml-3 text-base font-bold lg:block">
              {userInfo.displayName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiderBar;
