import { display } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  changeIconPlaying,
  setAudioSrc,
  setInfoSongPlayer,
  setPlaylistId,
  setPlaylistRandom,
  setPlaylistSong,
  setSongId,
} from "~/redux-toolkit/audio/audioSlice";
import request from "~/services/request";

const BannerItem = ({ item }) => {
  const dispatch = useDispatch();

  return item.type === 4 ? (
    <Link
      to={item.link}
      state={{ id: item.encodeId }}
      key={item.encodeId}
      className="relative w-full rounded-lg cursor-pointer"
    >
      <img
        className="object-cover w-full rounded-lg"
        src={item.banner}
        alt=""
      />
    </Link>
  ) : (
    <div className="relative w-full rounded-lg cursor-pointer">
      <img
        className="object-cover w-full rounded-lg"
        src={item.banner}
        alt=""
      />
    </div>
  );
};

export default BannerItem;
