import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PlayerControl from "../PlayerControl";
import iconPlay from "~/assets/image/iconPlaying.gif";
const StyledPlaying = styled.div`
  position: fixed;
  background-size: 1920px auto;
  background-repeat: no-repeat;
  -webkit-tap-highlight-color: transparent;
  transition: 0.7s;
  background-color: black;
  z-index: 9999;
  & .now-playing-thumb {
    border-radius: 12px;
    box-shadow: 0 54px 55px rgb(0 0 0 / 25%), 0 -12px 30px rgb(0 0 0 / 12%),
      0 4px 6px rgb(0 0 0 / 12%), 0 12px 13px rgb(0 0 0 / 17%),
      0 -3px 5px rgb(0 0 0 / 9%);
    height: 350px;
    overflow: hidden;
    width: 350px;
  }
`;
const NowPlaying = () => {
  const { infoSongPlayer, isPlay } = useSelector((state) => state.audio);
  return (
    <StyledPlaying className="inset-0 flex flex-col items-center justify-center w-full h-full p-3">
      <div className="flex flex-col items-center flex-1">
        <div className="relative now-playing-thumb">
          <img
            className="object-cover w-full"
            src={infoSongPlayer.thumbnailM}
            alt=""
          />
          {isPlay && (
            <div className="absolute bottom-[14px] left-[14px] w-10 h-10 now-playing-icon">
              <img src={iconPlay} alt="" />
            </div>
          )}
        </div>
        <h3 className="mt-4 mb-3 text-3xl font-semibold text-white whitespace-nowrap now-playing-title">
          {infoSongPlayer.title}
        </h3>
        <span className="text-sm font-medium text-white opacity-70 now-playing-name whitespace-nowrap">
          {infoSongPlayer.artistsNames}
        </span>
      </div>
      <PlayerControl />
    </StyledPlaying>
  );
};

export default NowPlaying;
