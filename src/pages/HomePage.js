import FollowHP from "components/itemsHomePage/FollowHP";
import Post from "components/itemsHomePage/Post";
import SiderBar from "components/itemsHomePage/SiderBar";
import Story from "components/itemsHomePage/Story";
import { useAuth } from "contexts/auth-context";
import React from "react";
import LandingPage from "./LandingPage";

const HomePage = () => {
  const {userInfo} = useAuth();
  if(!userInfo) return <LandingPage></LandingPage>
  // console.log(userInfo);
  return (
    <div className="">
      <SiderBar className=""></SiderBar>
      <Story></Story>
      <div className="flex justify-end">
        <Post></Post>
        <FollowHP></FollowHP>
      </div>
    </div>
  );
};

// {
//   /* <div className="absolute right-0 flex justify-between w-3/4 h-auto bg-slate-600">
//         <div className="w-[600px] h-full mt-10 mr-20 ">
//             <Story></Story>
//             <Post></Post>
//         </div>
//         <div className="w-[400px] h-[100px] bg-orange-400 mr-10">

//         </div>
//       </div> */
// }

export default HomePage;
