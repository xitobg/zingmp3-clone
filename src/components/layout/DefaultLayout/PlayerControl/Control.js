import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "~/components/Icon";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import {
  changeIconPlaying,
  setCurrentIndexSong,
  setCurrentIndexSongRandom,
  setInfoSongPlayer,
  setLoadingPlay,
  setRandomSong,
  setRepeatSong,
  setSongId,
} from "~/redux-toolkit/audio/audioSlice";
import Progress from "./Progress";
import IconLoading from "~/components/Icon/IconLoading";
import { AiOutlineExpand } from "react-icons/ai";
import { setShowNowPlaying } from "~/redux-toolkit/global/globalSlice";
import scrollIntoView from "~/utils/ScrollIntoView";

const Control = ({ valueVolume = 100 }) => {
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  let songActive = document.querySelector(".song-item.active");
  const {
    isPlay,
    loadingPlay,
    isRepeat,
    isRandom,
    playlistSong,
    playlistRandom,
    currentSongId,
  } = useSelector((state) => state.audio);
  let currentIndex = useSelector((state) => state.audio.currentIndexSong);

  let currentIndexRandom = useSelector(
    (state) => state.audio.currentIndexSongRandom
  );
  // console.log(playlistId);
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

  const handleNextSong = (e) => {
    if (songActive) {
      scrollIntoView(songActive);
    }
    dispatch(setLoadingPlay(true));
    if (!isRandom) {
      if (currentIndex >= playlistSong.length - 1) {
        dispatch(setCurrentTime(0));
        dispatch(setCurrentIndexSong(0));
        dispatch(setInfoSongPlayer(playlistSong[0]));
        dispatch(setSongId(playlistSong[0].encodeId));
        let codeId = playlistSong[0].encodeId;
        dispatch(
          setCurrentIndexSongRandom(
            playlistRandom.findIndex((item) => item.encodeId === codeId)
          )
        );
        dispatch(changeIconPlaying(true));
      } else {
        dispatch(setCurrentIndexSong((currentIndex += 1)));
        dispatch(setInfoSongPlayer(playlistSong[currentIndex]));
        dispatch(setSongId(playlistSong[currentIndex].encodeId));
        let codeId = playlistSong[currentIndex].encodeId;
        dispatch(
          setCurrentIndexSongRandom(
            playlistRandom.findIndex((item) => item.encodeId === codeId)
          )
        );
        dispatch(changeIconPlaying(true));
      }
    } else if (isRandom) {
      if (currentIndexRandom >= playlistRandom.length - 1) {
        dispatch(setCurrentIndexSongRandom(0));
        dispatch(setInfoSongPlayer(playlistRandom[0]));
        dispatch(setSongId(playlistRandom[0]?.encodeId));
        // dispatch(setCurrentIndexSong(playlistSong.indexOf(playlistRandom[0])));
        let codeId = playlistRandom[0].encodeId;
        dispatch(
          setCurrentIndexSong(
            playlistSong.findIndex((item) => item.encodeId === codeId)
          )
        );
        dispatch(changeIconPlaying(true));
      } else {
        dispatch(setCurrentIndexSongRandom((currentIndexRandom += 1)));
        dispatch(setInfoSongPlayer(playlistRandom[currentIndexRandom]));
        dispatch(setSongId(playlistRandom[currentIndexRandom].encodeId));
        let codeId = playlistRandom[currentIndexRandom].encodeId;
        dispatch(
          setCurrentIndexSong(
            playlistSong.findIndex((item) => item.encodeId === codeId)
          )
        );

        dispatch(changeIconPlaying(true));
      }
    }
  };

  const handlePrevSong = () => {
    if (songActive) {
      scrollIntoView(songActive);
    }
    dispatch(setLoadingPlay(true));
    if (!isRandom) {
      if (currentIndex <= 0) {
        dispatch(setCurrentIndexSong(playlistSong.length - 1));
        dispatch(setInfoSongPlayer(playlistSong[playlistSong.length - 1]));
        dispatch(setSongId(playlistSong[playlistSong.length - 1].encodeId));
        dispatch(
          setCurrentIndexSongRandom(
            playlistRandom.indexOf(playlistSong[playlistSong.length - 1])
          )
        );
        dispatch(changeIconPlaying(true));
      } else {
        dispatch(setCurrentIndexSong((currentIndex -= 1)));
        dispatch(setInfoSongPlayer(playlistSong[currentIndex]));
        dispatch(setSongId(playlistSong[currentIndex].encodeId));
        dispatch(
          setCurrentIndexSongRandom(
            playlistRandom.indexOf(playlistSong[currentIndex])
          )
        );
        dispatch(changeIconPlaying(true));
      }
    } else if (isRandom) {
      if (currentIndexRandom <= 0) {
        dispatch(setCurrentIndexSongRandom(playlistRandom.length - 1));
        dispatch(setInfoSongPlayer(playlistRandom[playlistRandom.length - 1]));
        dispatch(setSongId(playlistRandom[playlistRandom.length - 1].encodeId));
        let codeId = playlistRandom[playlistRandom.length - 1].encodeId;
        dispatch(
          setCurrentIndexSong(
            playlistSong.findIndex((item) => item.encodeId === codeId)
          )
        );

        dispatch(changeIconPlaying(true));
      } else {
        dispatch(setCurrentIndexSongRandom((currentIndexRandom -= 1)));
        dispatch(setInfoSongPlayer(playlistRandom[currentIndexRandom]));
        dispatch(setSongId(playlistRandom[currentIndexRandom].encodeId));
        let codeId = playlistRandom[currentIndexRandom].encodeId;
        dispatch(
          setCurrentIndexSong(
            playlistSong.findIndex((item) => item.encodeId === codeId)
          )
        );
        dispatch(changeIconPlaying(true));
      }
    }
  };
  const handleRandomSong = () => dispatch(setRandomSong(!isRandom));
  const handleRepeatSong = () => dispatch(setRepeatSong(!isRepeat));
  const handleOntimeUpdate = () => {
    if (audioRef.current?.duration) {
      dispatch(setLoadingPlay(false));
    }
    setCurrentTime(audioRef.current?.currentTime);
  };
  const handleUpdateTime = (currentime) => {
    audioRef.current.currentTime = currentime;
    return currentime;
  };
  //disable button when playlist.length = 1
  const isDisable = useMemo(() => {
    return playlistSong.length === 1;
  }, [playlistSong.length]);
  const disableStyleBtn = useMemo(() => {
    return {
      opacity: isDisable ? 0.5 : 1,
      cursor: isDisable ? "not-allowed" : "pointer",
    };
  });
  useEffect(() => {
    audioRef.current.volume = valueVolume / 100;
  }, [valueVolume]);
  useEffect(() => {
    if (songActive) {
      scrollIntoView(songActive);
    }
  }, [songActive]);

  return (
    <div className="player-control w-[40%] flex flex-col">
      <div className="flex items-center justify-center control-btn-list">
        <div className="inline-flex items-center ">
          <Tippy content="Phát ngẫu nhiên">
            <Icon className="random-btn" onClick={handleRandomSong} control>
              <i
                className={`p-1 bi bi-shuffle ${isRandom ? "is-random" : ""}`}
              ></i>
            </Icon>
          </Tippy>
          <Icon
            isDisabled={isDisable}
            style={disableStyleBtn}
            className="prev-btn"
            onClick={handlePrevSong}
            control
          >
            <i className="p-1 bi bi-skip-start-fill"></i>
          </Icon>
          <button
            onClick={handlePlaySong}
            className="relative overflow-hidden toggle-play"
          >
            {isPlay && !loadingPlay ? (
              <i className="p-1 bi bi-pause-fill"></i>
            ) : (
              !loadingPlay && <i className="p-1 bi bi-play-fill "></i>
            )}
            {loadingPlay && <IconLoading />}
          </button>
          <Icon
            style={disableStyleBtn}
            isDisabled={isDisable}
            onClick={handleNextSong}
            control
          >
            <i className="p-1 bi bi-skip-end-fill"></i>
          </Icon>
          <Tippy content="Phát lại một bài">
            <Icon className="repeat-btn" onClick={handleRepeatSong} control>
              <i
                className={`p-1 bi bi-arrow-repeat ${
                  isRepeat ? "is-repeat" : ""
                }`}
              ></i>
            </Icon>
          </Tippy>
          <Icon
            className="hidden show-now-playing-mobile"
            onClick={() => dispatch(setShowNowPlaying(true))}
          >
            <AiOutlineExpand className="text-lg " />
          </Icon>
        </div>
      </div>
      <div className="w-full mt-[10px] flex items-center justify-center player-progress ">
        <Progress
          songDuration={audioRef.current?.duration}
          currentTime={currentTime}
          onChangeTime={handleUpdateTime}
        />
      </div>
      <audio
        className="hidden audio-element"
        loop={isRepeat}
        autoPlay={isPlay}
        hidden
        ref={audioRef}
        src={
          currentSongId
            ? `http://api.mp3.zing.vn/api/streaming/audio/${currentSongId}/320`
            : ""
        }
        onEnded={handleNextSong}
        onTimeUpdate={handleOntimeUpdate}
      ></audio>
    </div>
  );
};

export default Control;
