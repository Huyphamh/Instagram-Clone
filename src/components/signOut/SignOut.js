import { auth } from "firebase-app/firebase-config";
import { signOut } from "firebase/auth";
import React from "react";

const SignOut = () => {
  return (
    <div
      onClick={() => signOut(auth)}
      className="items-center hidden px-5 mt-2 rounded-lg ss:px-5 sm:flex sm:py-1 sm:my-3 hover:cursor-pointer lg:pr-20 hover:bg-slate-200"
    >
      <i className="text-3xl bx bx-log-out"></i>
      <p className="hidden ml-3 text-base lg:block">Đăng xuất</p>
    </div>
  );
};

export default SignOut;
