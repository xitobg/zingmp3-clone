import React from "react";
import { Link } from "react-router-dom";

const BannerItem = ({ item }) => {
  return (
    <Link
      to={item.link}
      state={{ playListId: item.encodeId }}
      key={item.encodeId}
      className="relative w-full rounded-lg cursor-pointer"
    >
      <img
        className="object-cover w-full rounded-lg"
        src={item.banner}
        alt=""
      />
    </Link>
  );
};

export default BannerItem;
