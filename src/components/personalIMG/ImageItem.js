import React from "react";
import { useNavigate } from "react-router-dom";

const ImageItem = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="w-40 h-40 m-5 border-2 border-gray-600 cursor-pointer lg:w-60 lg:h-60">
      <img
        src={data.image}
        className="object-cover w-full max-h-[240px] h-full"
        alt=""
        onClick={() => navigate(`/PostAbout?id=${data.id}`)}
      />
    </div>
  );
};

export default ImageItem;
