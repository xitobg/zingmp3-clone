import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "~/components/Icon";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import {
  changeIconPlaying,
  setAudioSrc,
  setCurrentIndexSong,
  setCurrentIndexSongRandom,
  setCurrentTime,
  setInfoSongPlayer,
  setPlaylistRandom,
  setPlaylistSong,
  setRandomSong,
  setRepeatSong,
  setSongId,
} from "~/redux-toolkit/audio/audioSlice";

const Control = ({ audioRef }) => {
  const dispatch = useDispatch();
  const {
    isPlay,
    isRepeat,
    isRandom,
    srcAudio,
    playlistSong,
    playlistRandom,
    currentSongId,
  } = useSelector((state) => state.audio);
  let currentIndex = useSelector((state) => state.audio.currentIndexSong);
  let currentIndexRandom = useSelector(
    (state) => state.audio.currentIndexSongRandom
  );
  const handlePlaySong = () => {
    if (isPlay) {
      dispatch(changeIconPlaying(false));
      if (audioRef) {
        audioRef.current.pause();
      }
    } else {
      dispatch(changeIconPlaying(true));
      if (audioRef) {
        audioRef.current.play();
      }
    }
  };
  const handleNextSong = () => {
    if (
      currentIndex === playlistSong.length - 1 ||
      currentIndex >= playlistSong.length - 1 ||
      currentIndexRandom === playlistRandom.length - 1 ||
      currentIndexRandom >= playlistRandom.length - 1
    ) {
      return;
    } else {
      dispatch(setAudioSrc(""));
      dispatch(setCurrentTime(0));
      audioRef.current.currentTime = 0;
      if (isRandom) {
        dispatch(setCurrentIndexSongRandom((currentIndexRandom += 1)));
        dispatch(setInfoSongPlayer(playlistRandom[currentIndexRandom]));
        dispatch(setSongId(playlistRandom[currentIndexRandom].encodeId));
        dispatch(
          setCurrentIndexSong(
            playlistSong.indexOf(playlistRandom[currentIndexRandom])
          )
        );
        dispatch(changeIconPlaying(true));
      } else {
        dispatch(setCurrentIndexSong((currentIndex += 1)));
        dispatch(setInfoSongPlayer(playlistSong[currentIndex]));
        dispatch(setSongId(playlistSong[currentIndex].encodeId));
        dispatch(changeIconPlaying(true));
      }
    }
  };

  const handlePrevSong = () => {
    dispatch(setAudioSrc(""));
    dispatch(setCurrentTime(0));
    audioRef.current.currentTime = 0;
    if (currentIndex === 0) {
      dispatch(setCurrentIndexSong((currentIndex = playlistSong.length - 1)));
      dispatch(setInfoSongPlayer(playlistSong[currentIndex]));
      dispatch(setSongId(playlistSong[currentIndex].encodeId));
      dispatch(changeIconPlaying(true));
    } else {
      if (isRandom) {
        dispatch(setCurrentIndexSongRandom((currentIndexRandom -= 1)));
        dispatch(setInfoSongPlayer(playlistRandom[currentIndexRandom]));
        dispatch(setSongId(playlistRandom[currentIndexRandom].encodeId));
        dispatch(
          setCurrentIndexSong(
            playlistSong.indexOf(playlistRandom[currentIndexRandom])
          )
        );
        dispatch(changeIconPlaying(true));
      } else {
        dispatch(setCurrentIndexSong((currentIndex -= 1)));
        dispatch(setInfoSongPlayer(playlistSong[currentIndex]));
        dispatch(setSongId(playlistSong[currentIndex].encodeId));
        dispatch(changeIconPlaying(true));
      }
    }
  };
  const handleRandomSong = () => dispatch(setRandomSong(!isRandom));
  const handleRepeatSong = () => dispatch(setRepeatSong(!isRepeat));
  useEffect(() => {
    if (srcAudio !== "" || srcAudio !== undefined) {
      isPlay ? audioRef.current?.play() : audioRef.current?.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [srcAudio, isPlay]);

  return (
    <div className="player-control w-[40%] flex flex-col">
      <div className="flex items-center justify-center">
        <div className="inline-flex items-center ">
          <Tippy content="Phát ngẫu nhiên">
            <Icon onClick={handleRandomSong} control>
              <i
                className={`p-1 bi bi-shuffle ${isRandom ? "is-random" : ""}`}
              ></i>
            </Icon>
          </Tippy>
          <Icon onClick={handlePrevSong} control>
            <i className="p-1 bi bi-skip-start-fill"></i>
          </Icon>
          <button
            onClick={handlePlaySong}
            className="relative overflow-hidden toggle-play"
          >
            {isPlay ? (
              <i className="p-1 bi bi-pause-fill"></i>
            ) : (
              <i className="p-1 bi bi-play-fill "></i>
            )}
            {/* <svg
                classname="lds-spinner"
                width="40px"
                height="40px"
                fill="#f1f1f1"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
                style={{ background: "none" }}
              >
                <g transform="rotate(0 50 50)">
                  <rect
                    x={47}
                    y={24}
                    rx="3.7600000000000002"
                    ry="1.92"
                    width={6}
                    height={12}
                  >
                    <animate
                      attributeName="opacity"
                      values="1;0"
                      keyTimes="0;1"
                      dur="1s"
                      begin="-0.9166666666666666s"
                      repeatCount="indefinite"
                    />
                  </rect>
                </g>
                <g transform="rotate(30 50 50)">
                  <rect
                    x={47}
                    y={24}
                    rx="3.7600000000000002"
                    ry="1.92"
                    width={6}
                    height={12}
                  >
                    <animate
                      attributeName="opacity"
                      values="1;0"
                      keyTimes="0;1"
                      dur="1s"
                      begin="-0.8333333333333334s"
                      repeatCount="indefinite"
                    />
                  </rect>
                </g>
                <g transform="rotate(60 50 50)">
                  <rect
                    x={47}
                    y={24}
                    rx="3.7600000000000002"
                    ry="1.92"
                    width={6}
                    height={12}
                  >
                    <animate
                      attributeName="opacity"
                      values="1;0"
                      keyTimes="0;1"
                      dur="1s"
                      begin="-0.75s"
                      repeatCount="indefinite"
                    />
                  </rect>
                </g>
                <g transform="rotate(90 50 50)">
                  <rect
                    x={47}
                    y={24}
                    rx="3.7600000000000002"
                    ry="1.92"
                    width={6}
                    height={12}
                  >
                    <animate
                      attributeName="opacity"
                      values="1;0"
                      keyTimes="0;1"
                      dur="1s"
                      begin="-0.6666666666666666s"
                      repeatCount="indefinite"
                    />
                  </rect>
                </g>
                <g transform="rotate(120 50 50)">
                  <rect
                    x={47}
                    y={24}
                    rx="3.7600000000000002"
                    ry="1.92"
                    width={6}
                    height={12}
                  >
                    <animate
                      attributeName="opacity"
                      values="1;0"
                      keyTimes="0;1"
                      dur="1s"
                      begin="-0.5833333333333334s"
                      repeatCount="indefinite"
                    />
                  </rect>
                </g>
                <g transform="rotate(150 50 50)">
                  <rect
                    x={47}
                    y={24}
                    rx="3.7600000000000002"
                    ry="1.92"
                    width={6}
                    height={12}
                  >
                    <animate
                      attributeName="opacity"
                      values="1;0"
                      keyTimes="0;1"
                      dur="1s"
                      begin="-0.5s"
                      repeatCount="indefinite"
                    />
                  </rect>
                </g>
                <g transform="rotate(180 50 50)">
                  <rect
                    x={47}
                    y={24}
                    rx="3.7600000000000002"
                    ry="1.92"
                    width={6}
                    height={12}
                  >
                    <animate
                      attributeName="opacity"
                      values="1;0"
                      keyTimes="0;1"
                      dur="1s"
                      begin="-0.4166666666666667s"
                      repeatCount="indefinite"
                    />
                  </rect>
                </g>
                <g transform="rotate(210 50 50)">
                  <rect
                    x={47}
                    y={24}
                    rx="3.7600000000000002"
                    ry="1.92"
                    width={6}
                    height={12}
                  >
                    <animate
                      attributeName="opacity"
                      values="1;0"
                      keyTimes="0;1"
                      dur="1s"
                      begin="-0.3333333333333333s"
                      repeatCount="indefinite"
                    />
                  </rect>
                </g>
                <g transform="rotate(240 50 50)">
                  <rect
                    x={47}
                    y={24}
                    rx="3.7600000000000002"
                    ry="1.92"
                    width={6}
                    height={12}
                  >
                    <animate
                      attributeName="opacity"
                      values="1;0"
                      keyTimes="0;1"
                      dur="1s"
                      begin="-0.25s"
                      repeatCount="indefinite"
                    />
                  </rect>
                </g>
                <g transform="rotate(270 50 50)">
                  <rect
                    x={47}
                    y={24}
                    rx="3.7600000000000002"
                    ry="1.92"
                    width={6}
                    height={12}
                  >
                    <animate
                      attributeName="opacity"
                      values="1;0"
                      keyTimes="0;1"
                      dur="1s"
                      begin="-0.16666666666666666s"
                      repeatCount="indefinite"
                    />
                  </rect>
                </g>
                <g transform="rotate(300 50 50)">
                  <rect
                    x={47}
                    y={24}
                    rx="3.7600000000000002"
                    ry="1.92"
                    width={6}
                    height={12}
                  >
                    <animate
                      attributeName="opacity"
                      values="1;0"
                      keyTimes="0;1"
                      dur="1s"
                      begin="-0.08333333333333333s"
                      repeatCount="indefinite"
                    />
                  </rect>
                </g>
                <g transform="rotate(330 50 50)">
                  <rect
                    x={47}
                    y={24}
                    rx="3.7600000000000002"
                    ry="1.92"
                    width={6}
                    height={12}
                  >
                    <animate
                      attributeName="opacity"
                      values="1;0"
                      keyTimes="0;1"
                      dur="1s"
                      begin="0s"
                      repeatCount="indefinite"
                    />
                  </rect>
                </g>
              </svg> */}
          </button>
          <Icon onClick={handleNextSong} control>
            <i className="p-1 bi bi-skip-end-fill"></i>
          </Icon>
          <Tippy content="Phát lại một bài">
            <Icon onClick={handleRepeatSong} control>
              <i
                className={`p-1 bi bi-arrow-repeat ${
                  isRepeat ? "is-repeat" : ""
                }`}
              ></i>
            </Icon>
          </Tippy>
        </div>
      </div>
      <div className="w-full mt-[10px] flex items-center justify-center ">
        <span className="current-time">03:20</span>
        <div className="progress-area">
          <div className="progress-bar after:absolute after:content[''] after:w-[14px] after:h-[14px] after:top-2/4 after:bg-inherit after:-translate-y-2/4"></div>
        </div>
        <div className="duration-time ml-[10px] text-xs min-w-[45px]">
          04:30
        </div>
      </div>
    </div>
  );
};

export default Control;
