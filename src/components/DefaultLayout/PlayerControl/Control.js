import React, {
  Fragment,
  useEffect,
  useRef,
  memo,
  useState,
  useTransition,
} from "react";
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
  setRandomSong,
  setRepeatSong,
  setSongId,
} from "~/redux-toolkit/audio/audioSlice";
import ConvertTotalDuration from "~/utils/ConvertTotalDuration";
import ConvertDuration from "~/utils/ConvertTime";
import Progress from "./Progress";

const Control = () => {
  const dispatch = useDispatch();
  const [progressValue, setProgressValue] = useState(0);
  const [isPending, startTransition] = useTransition();
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const {
    isPlay,
    isRepeat,
    isRandom,
    srcAudio,
    playlistSong,
    playlistRandom,
    infoSongPlayer,
    currentTime,
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
  //
  const handleNextSong = () => {
    dispatch(setAudioSrc(""));
    dispatch(setCurrentTime(0));
    audioRef.current.currentTime = 0;
    //Do array push vào khác với array render ra ui nên k check đúng được đk khi next
    if (
      currentIndex === playlistSong.length - 1 ||
      currentIndex >= playlistSong.length - 1 ||
      currentIndexRandom === playlistRandom.length - 1 ||
      currentIndexRandom >= playlistRandom.length - 1
    ) {
      return;
    } else {
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
    //Do array push vào khác với array render ra ui nên k check đúng được đk khi prev
    dispatch(setAudioSrc(""));
    dispatch(setCurrentTime(0));
    audioRef.current.currentTime = 0;
    if (isRandom) {
      if (currentIndexRandom <= 0) {
        dispatch(setCurrentIndexSongRandom(playlistRandom.length));
        dispatch(setInfoSongPlayer(playlistRandom[currentIndexRandom]));
        dispatch(setSongId(playlistRandom[currentIndexRandom].encodeId));
        dispatch(
          setCurrentIndexSong(
            playlistSong.indexOf(playlistRandom[currentIndexRandom])
          )
        );
        dispatch(changeIconPlaying(true));
      } else {
        dispatch(setCurrentIndexSongRandom((currentIndexRandom -= 1)));
        dispatch(setInfoSongPlayer(playlistRandom[currentIndexRandom]));
        dispatch(setSongId(playlistRandom[currentIndexRandom].encodeId));
        //tìm ra index của playlist dựa vào gt hiện tại trong playlistRandom
        dispatch(
          setCurrentIndexSong(
            playlistSong.indexOf(playlistRandom[currentIndexRandom])
          )
        );
        dispatch(changeIconPlaying(true));
      }
    }
    if (isRandom === false) {
      if (currentIndex <= 0) {
        dispatch(setCurrentIndexSong(playlistSong.length));
        dispatch(setInfoSongPlayer(playlistSong[currentIndex]));
        dispatch(setSongId(playlistSong[currentIndex].encodeId));
        dispatch(
          setCurrentIndexSongRandom(
            playlistRandom.indexOf(playlistSong[currentIndex])
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
    }
  };
  const handleOnEnded = () => {
    if (!isRepeat) {
      dispatch(setCurrentTime(0));
      dispatch(setAudioSrc(""));
      dispatch(changeIconPlaying(false));
      if (isRandom) {
        if (currentIndexRandom === playlistRandom.length - 1) {
          dispatch(setCurrentIndexSongRandom(0));
          dispatch(setInfoSongPlayer(playlistRandom[0]));
          dispatch(setSongId(playlistRandom[0].encodeId));
          dispatch(
            setCurrentIndexSong(
              playlistSong.findIndex(
                (song) => song.encodeId === playlistRandom[0].encodeId
              )
            )
          );
          dispatch(changeIconPlaying(true));
        } else {
          dispatch(setCurrentIndexSongRandom((currentIndexRandom += 1)));
          dispatch(setInfoSongPlayer(playlistRandom[currentIndexRandom]));
          dispatch(setSongId(playlistRandom[currentIndexRandom].encodeId));
          dispatch(
            setCurrentIndexSong(
              playlistSong.findIndex(
                (song) =>
                  song.encodeId === playlistRandom[currentIndexRandom].encodeId
              )
            )
          );

          dispatch(changeIconPlaying(true));
        }
      } else {
        if (currentIndex === playlistSong.length - 1) {
          dispatch(setCurrentIndexSong(0));
          dispatch(setInfoSongPlayer(playlistSong[0].encodeId));
          dispatch(setSongId(playlistSong[0].encodeId));
          dispatch(changeIconPlaying(true));
        } else {
          dispatch(setCurrentIndexSong((currentIndex += 1)));
          dispatch(setInfoSongPlayer(playlistSong[currentIndex]));
          dispatch(setSongId(playlistSong[currentIndex].encodeId));
          dispatch(changeIconPlaying(true));
        }
      }
    }
  };
  const handleRandomSong = () => dispatch(setRandomSong(!isRandom));
  const handleRepeatSong = () => dispatch(setRepeatSong(!isRepeat));
  const handleOntimeUpdate = () => {
    if (audioRef.current.currentTime !== undefined) {
      dispatch(setCurrentTime(audioRef.current.currentTime));
    }

    let progressWidth =
      (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgressValue(progressWidth);
  };

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
        <span className="current-time">{ConvertDuration(currentTime)}</span>
        <Progress
          setWidth={"100%"}
          setHeight={"2px"}
          percentSlider={progressValue}
          toogleTooltip={true}
          currentTimeSongTooltip={currentTime}
          getPercentSlider={(value) => {
            if (audioRef) {
              audioRef.currentTime = (value / 100) * audioRef.duration;
            }
          }}
        />
        <div className="duration-time ml-[10px] text-xs min-w-[45px]">
          {ConvertDuration(infoSongPlayer.duration)}
        </div>
      </div>
      <audio
        className="hidden"
        loop={isRepeat}
        autoPlay={isPlay}
        hidden
        ref={audioRef}
        src={srcAudio}
        onEnded={handleOnEnded}
        onTimeUpdate={handleOntimeUpdate}
      ></audio>
    </div>
  );
};

export default Control;
