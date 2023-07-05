import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FollowHP = () => {
  const navigate = useNavigate();
  const [userFl, setUserFl] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "users");
    onSnapshot(colRef, (snapshot) => {
      const results = [];
      snapshot.forEach((item) => {
        results.push({
          id: item.id,
          ...item.data(),
        });
      });
      setUserFl(results);
    });
  }, []);

  return (
    <div className="top-0 z-10 hidden w-1/5 h-auto mr-20 xl:block lg:w-1/5">
      <p className="mb-5">Gợi ý cho bạn</p>

      {userFl
        .sort((a, b) => b.status - a.status)
        .map((item) => (
          <div key={item.id} className="">
            <div
              onClick={() => navigate(`/Personal?userName=${item.username}`)}
              className="flex flex-wrap items-center mb-4 cursor-pointer"
            >
              <img
                src={
                  item.avatar ||
                  "https://st.quantrimang.com/photos/image/2022/09/13/Meo-khoc-1.jpg"
                }
                alt=""
                className="object-cover w-10 h-10 border border-gray-400 rounded-full"
              />
              {item.status === 2 ? (
                <div className="mt-2">
                  <p className="flex items-center px-2 text-sm font-semibold fle x-wrap">
                    {item?.username || item.fullname}{" "}
                    <i className="text-blue-500 bx bxs-brightness"></i>{" "}
                  </p>
                  <p className="ml-3 text-xs text-sky-500">Quản trị điên</p>
                </div>
                
              ) : (
                <p className="px-2 text-sm font-medium">
                  {item?.username || item.fullname}
                </p>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default FollowHP;
