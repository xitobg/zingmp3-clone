import React, { useEffect, useRef, useState } from "react";
import { GiMicrophone } from "react-icons/gi";
import Icon from "~/components/Icon";
import SlideShow from "./SlideShow";
import styled from "styled-components";
import ConvertDuration from "~/utils/ConvertTime";
import Tippy from "@tippyjs/react";
import { Link } from "react-router-dom";
import SongItem from "~/components/songItem";
import {
  changeIconPlaying,
  setAudioSrc,
  setCurrentIndexSong,
  setCurrentTime,
  setInfoSongPlayer,
  setPlaylistId,
  setPlaylistRandom,
  setPlaylistSong,
  setRandomSong,
  setSongId,
} from "~/redux-toolkit/audio/audioSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
const StyledSectionSong = styled.div`
  .play-list {
    & .song-item {
      border-bottom: 1px solid ${(props) => props.theme.borderSecondary};
      border-radius: 5px;
      width: 100%;
      cursor: pointer;
      &:hover {
        background-color: ${(props) => props.theme.alphaBg};
      }
      &:hover .media-action {
        visibility: visible;
      }
      &:hover .song-thumb::after {
        visibility: visible;
      }

      .icon-dash {
        color: ${(props) => props.theme.textPrimary};
      }
      .song__info {
        flex-wrap: nowrap;
        display: -webkit-box;
        word-break: break-word;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
      .song__info-name {
        line-height: 14px;
        color: ${(props) => props.theme.textPrimary};
        margin-top: 3px;
        flex-wrap: nowrap;
        display: -webkit-box;
        word-break: break-word;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        line-height: 16px;
      }
      .song__info-author {
        margin-top: 6px;
        line-height: 1.33;
        color: ${(props) => props.theme.textSecondary};
        display: flex;
        flex-wrap: nowrap;
        display: -webkit-box;
        word-break: break-word;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        .artists {
          cursor: pointer;
          & .artist-name:hover {
            color: ${(props) => props.theme.linkTextHover};
            text-decoration: underline;
          }
        }
      }
      .media-content {
        flex-basis: auto;
        flex-grow: 1;
        flex-shrink: 1;
        align-self: center;
        width: 0;
        color: ${(props) => props.theme.textSecondary};
        &:hover {
          color: ${(props) => props.theme.linkTextHover};
          text-decoration: underline;
        }
      }
      .media-right {
        flex-basis: auto;
        flex-grow: 0;
        flex-shrink: 0;
      }
      .hover-item {
        display: none;
        word-break: break-word;
      }
      &:hover .hover-item {
        display: flex;
      }
      &:hover .media-duration {
        display: none;
      }

      .media-duration {
        word-break: break-word;
        font-size: 12px;
        color: ${(props) => props.theme.textSecondary};
      }
    }
  }
`;
const SongSection = ({ data = {}, onClick, id }) => {
  const dispatch = useDispatch();
  const { items, title } = data;
  const { isRandom } = useSelector((state) => state.audio);
  const getCurrentIdexSong = (currentPlaylist, song) => {
    return currentPlaylist.indexOf(song);
  };
  //Tạo ra array mới đã random từ array playlist
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * i); // no +1 here!
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  const handleGetSongPlaylist = (song, currentPlayList, idPlaylist) => {
    const playlistCanPlay = [];
    if (song.streamingStatus === 1 && song.isWorldWide) {
      dispatch(setAudioSrc(""));
      dispatch(setCurrentTime(0));
      dispatch(setPlaylistId(idPlaylist));
      for (let songItem of currentPlayList) {
        if (songItem.streamingStatus === 1 && songItem.isWorldWide) {
          playlistCanPlay.push(songItem);
        }
      }
      if (isRandom) {
        dispatch(setSongId(song.encodeId));
        dispatch(setPlaylistRandom(shuffleArray([...playlistCanPlay])));
        dispatch(setInfoSongPlayer(song));
        dispatch(setPlaylistSong(playlistCanPlay));
        dispatch(
          setCurrentIndexSong(getCurrentIdexSong(playlistCanPlay, song))
        );
        // dispatch(setCurrentIndexSongRandom(-1));
        dispatch(changeIconPlaying(true));
      } else {
        dispatch(setSongId(song.encodeId));
        dispatch(setPlaylistRandom(shuffleArray([...playlistCanPlay])));
        dispatch(setInfoSongPlayer(song));
        dispatch(setPlaylistSong(playlistCanPlay));
        // dispatch(setCurrentIndexSongRandom(-1));
        dispatch(
          setCurrentIndexSong(getCurrentIdexSong(playlistCanPlay, song))
        );
        dispatch(changeIconPlaying(true));
      }
    } else {
      Swal.fire({
        icon: "error",
        text: "Playlist chưa được hỗ trợ!",
      });
    }
  };
  //play random moi khi vao useEffect
  const handlePlayRandomSong = (playlist, idPlaylist) => {
    let songCanPlay = [];
    let randomIndex;
    for (let songItem of playlist) {
      if (songItem.streamingStatus === 1 && songItem.isWorldWide) {
        songCanPlay.push(songItem);
      }
    }
    if (songCanPlay.length === 0) {
      Swal.fire({
        icon: "error",
        text: "Playlist chưa được hỗ trợ",
      });
    } else {
      dispatch(setPlaylistId(idPlaylist));
      dispatch(setAudioSrc(""));
      dispatch(setCurrentTime(0));
      randomIndex = Math.floor(Math.random() * songCanPlay.length - 1) + 1;
      dispatch(setSongId(songCanPlay[randomIndex].encodeId));
      dispatch(setInfoSongPlayer(songCanPlay[randomIndex]));
      dispatch(setPlaylistSong(songCanPlay));
      dispatch(setCurrentIndexSong(randomIndex));
      dispatch(setRandomSong(true));
      dispatch(changeIconPlaying(true));
    }
  };
  useEffect(() => {
    handlePlayRandomSong(items, id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, items]);
  return (
    <StyledSectionSong className="container-layout">
      <h3>{title}</h3>
      <div className="flex mb-[25px]">
        <div className="relative pt-[10px] w-[270px] h-[230px] flex items-center">
          <SlideShow data={items} />
        </div>
        <div className="h-[244px] has-scroll-bar play-list pl-5 w-full flex flex-col flex-1">
          {items?.length > 0 &&
            items?.map((item, index) => {
              return (
                <SongItem
                  onClick={() => handleGetSongPlaylist(item, items, id)}
                  key={item.encodeId}
                  item={item}
                />
              );
            })}
        </div>
      </div>
    </StyledSectionSong>
  );
};

export default SongSection;
