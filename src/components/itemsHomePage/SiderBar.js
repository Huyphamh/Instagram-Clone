import React, { useEffect, useState } from "react";
import HeaderHomePage from "./HeaderHomePage";
import AddNewPost from "components/addPost/AddNewPost";
import { useAuth } from "contexts/auth-context";
import { doc, getDoc } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import { Link, useNavigate } from "react-router-dom";
import SignOut from "components/signOut/SignOut";
import SearchForm from "./SearchForm";

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
      <div className="fixed bottom-0 z-50 w-full bg-white border sm:w-auto sm:h-full sm:border-r-black border-t-black">
        <div className="flex items-center justify-center pl-4 pr-5 text-center md:pl-2 sm:block">
          <div className="z-50 flex items-center justify-center mx-2 mt-2 md:my-5 hover:cursor-pointer">
            <i className="hidden text-3xl sm:block lg:hidden bx bxl-instagram sm:py-1 sm:my-3"></i>
            <h1 className="hidden py-5 text-2xl lg:block">Instagram</h1>
          </div>
          <Link
            to="/HomePage"
            className="flex items-center px-5 mt-2 rounded-lg ss:px-5 sm:py-1 sm:my-3 hover:cursor-pointer lg:pr-20 hover:bg-slate-200"
          >
            <i className="text-3xl bx bxs-home"></i>{" "}
            <p className="hidden ml-3 text-base lg:block">Trang chủ</p>
          </Link>
          <SearchForm></SearchForm>
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
            onClick={() => navigate(`/Personal?userName=${user.username}`)}
            className="flex items-center mt-2 rounded-lg ss:px-5 sm:py-1 sm:my-3 hover:cursor-pointer lg:pr-20 hover:bg-slate-200"
          >
            <img
              src={
                user.avatar ||
                "https://st.quantrimang.com/photos/image/2022/09/13/Meo-khoc-1.jpg"
              }
              alt=""
              className="object-cover w-10 h-10 mr-2 border border-gray-500 rounded-full"
            />
            <p className="hidden ml-3 text-base font-bold lg:block">
              {user.username}
            </p>
          </div>
          <SignOut></SignOut>
        </div>
      </div>
    </div>
  );
};

export default SiderBar;
