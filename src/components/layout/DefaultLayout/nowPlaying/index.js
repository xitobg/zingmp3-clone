import React, { useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PlayerControl from "../PlayerControl";
import iconPlay from "~/assets/image/iconPlaying.gif";
import { useEffect } from "react";
const StyledPlaying = styled.div`
  position: fixed;
  background-size: 1920px auto;
  background-repeat: no-repeat;
  -webkit-tap-highlight-color: transparent;
  transition: 0.7s;
  background-color: black;
  z-index: 900;
  top: 100%;
  &.open {
    top: 0;
  }
  & .now-playing-thumb {
    border-radius: 12px;
    box-shadow: 0 54px 55px rgb(0 0 0 / 25%), 0 -12px 30px rgb(0 0 0 / 12%),
      0 4px 6px rgb(0 0 0 / 12%), 0 12px 13px rgb(0 0 0 / 17%),
      0 -3px 5px rgb(0 0 0 / 9%);
    height: 350px;
    overflow: hidden;
    width: 350px;
  }
  & .show {
    display: block;
  }
`;
const NowPlaying = () => {
  const playingRef = useRef(null);
  const { infoSongPlayer, isPlay, showNowPlaying } = useSelector(
    (state) => state.audio
  );
  const colors = ["#3460f5", "#6b3483", "#3460f5", "#ea7aa0"];
  const changleColors = () => {
    for (let color of colors) {
      playingRef.current.backgroundColor = color;
      color++;
      if (color > colors.length - 1) {
        color = 0;
      }
    }
  };

  useEffect(() => {
    changleColors();
    setInterval(changleColors, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });
  return (
    <StyledPlaying
      ref={playingRef}
      className={`bottom-0 left-0 right-0 flex flex-col items-center justify-center w-full h-full p-3 ${
        showNowPlaying ? "open" : ""
      } `}
    >
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
    </StyledPlaying>
  );
};

export default NowPlaying;
