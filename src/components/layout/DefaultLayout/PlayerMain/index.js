import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useEffect } from "react";
import { BACKGROUND_PLAYER } from "./constaints/background";
const NowPlaying = () => {
  const { showNowPlaying } = useSelector((state) => state.global);
  const { infoSongPlayer, isPlay } = useSelector((state) => state.audio);

  const backgrounds = Object.values(BACKGROUND_PLAYER);
  console.log(backgrounds);
  // const [color, setColor] = useState(0);
  // useEffect(() => {
  //   setInterval(() => {
  //     setColor(() => Math.floor(Math.random() * colors.length));
  //   }, 1000);
  //   console.log(color);

  // }, []);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevState) => prevState + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const background = useMemo(() => {
    return backgrounds[index % backgrounds.length];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);
  return (
    <StyledPlaying
      className={`bottom-0 left-0 right-0  flex flex-col items-center justify-center w-full h-full p-3 ${
        showNowPlaying ? "open" : ""
      } `}
    >
      <div className="absolute inset-0 h-full">
        <img
          className="w-full h-screen transition-all duration-500 bg-player-main"
          src={`${background}`}
          alt=""
        />
      </div>
      <div className="flex flex-col items-center flex-1 now-playing-content">
        <div className="relative now-playing-thumb">
          <img
            className="object-cover w-full"
            src={infoSongPlayer.thumbnailM}
            alt=""
          />
          {isPlay && (
            <div className="absolute  bottom-[-14px] left-[14px] w-10 h-10 now-playing-icon">
              <div className="music-waves">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
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
  .music-waves {
    position: absolute;
  }

  .music-waves span {
    position: absolute;
    width: 5px;
    height: 5px;
    bottom: 0;
    background: #000;
    animation: waves 0.5s infinite ease;
  }

  .music-waves span:nth-child(1) {
    animation-delay: 0.3s;
    background: #ff8c00;
  }

  .music-waves span:nth-child(2) {
    margin-left: 7px;
    animation-delay: 0.4s;
    background: #ffff00;
  }

  .music-waves span:nth-child(3) {
    margin-left: 14px;
    animation-delay: 0.6s;
    background: #26d53a;
  }

  .music-waves span:nth-child(4) {
    margin-left: 21px;
    animation-delay: 0.8s;
    background: #26e6a3;
  }

  .music-waves span:nth-child(5) {
    margin-left: 28px;
    animation-delay: 1s;
    background: #1da8e2;
  }

  @keyframes waves {
    0% {
      height: 8px;
    }

    30% {
      height: 18px;
    }

    60% {
      height: 24px;
    }

    80% {
      height: 18px;
    }

    100% {
      height: 8px;
    }
  }
  .bg-player-main {
    object-position: center center;
  }
`;
