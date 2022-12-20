import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Swal from "sweetalert2";
import Button from "~/components/button";
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
  setSongId,
} from "~/redux-toolkit/audio/audioSlice";
import { shuffle } from "../ZingChart";
const WeekChart = ({ data = {} }) => {
  const dispatch = useDispatch();
  const { isRandom } = useSelector((state) => state.audio);
  const dataWeekChart = Object.entries(data ? data : {});
  const handlePlaySong = (song, playlist, idPlaylist) => {
    const playlistCanPlay = [];
    if (song.streamingStatus === 1) {
      dispatch(setPlaylistId(idPlaylist));
      dispatch(setCurrentTime(0));
      dispatch(setAudioSrc(""));
      for (let songItem of playlist) {
        if (songItem.streamingStatus === 1) {
          playlistCanPlay.push(songItem);
        }
      }
      if (isRandom) {
        dispatch(setPlaylistRandom(shuffle([...playlistCanPlay])));
        dispatch(setSongId(song.encodeId));
        dispatch(setInfoSongPlayer(song));
        dispatch(setPlaylistSong(playlistCanPlay));
        dispatch(
          setCurrentIndexSong(
            playlistCanPlay.findIndex((item) => item.encodeId === song.encodeId)
          )
        );
        dispatch(changeIconPlaying(true));
      } else {
        dispatch(setInfoSongPlayer(song));
        dispatch(setSongId(song.encodeId));
        dispatch(setPlaylistSong(playlistCanPlay));
        dispatch(
          setCurrentIndexSong(
            playlistCanPlay.findIndex((item) => item.encodeId === song.encodeId)
          )
        );
        dispatch(changeIconPlaying(true));
      }
    } else {
      Swal.fire({
        icon: "error",
        text: "Bài hát chưa được hỗ trợ!",
      });
    }
  };
  return (
    <StyledWeekChart>
      <h3 className="title">Bảng Xếp Hạng Tuần</h3>
      <div className="grid grid-cols-3 mt-10 gap-y-4 weekchart-grid gap-x-7">
        {dataWeekChart &&
          dataWeekChart?.map((weekChart, index) => {
            console.log(weekChart);
            return (
              <div key={index} className="px-3 py-5 chart-box rounded-xl">
                <div className="flex pb-3 pl-10 font-semibold box-header gap-x-3">
                  <span className="text-2xl font-semibold uppercase text-inherit">
                    {weekChart ? weekChart[0] : ""}
                  </span>
                  <button className="flex items-center justify-center rounded-full weekchart-btn w-7 h-7">
                    <i className="p-1 text-white bi bi-play-fill play-btn"></i>
                  </button>
                </div>
                <div className="flex flex-col mb-4 chart-list-song">
                  {weekChart &&
                    weekChart[1]?.items
                      ?.slice(0, 5)
                      .map((song, index) => (
                        <SongItem
                          onClick={() =>
                            handlePlaySong(
                              song,
                              weekChart[1]?.items,
                              weekChart[1]?.items?.playlistId
                            )
                          }
                          item={song}
                          key={song.encodeId}
                        />
                      ))}
                </div>
                <div className="flex items-center justify-center">
                  <button className="view-all-song">Xem Tất Cả</button>
                </div>
              </div>
            );
          })}
      </div>
    </StyledWeekChart>
  );
};

export default WeekChart;
const StyledWeekChart = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  .chart-box {
    background-color: ${(props) => props.theme.alphaBg};
  }
  .box-header {
    color: ${(props) => props.theme.textPrimary};
  }
  .weekchart-btn {
    background-color: ${(props) => props.theme.purplePrimary};
  }
  .view-all-song {
    border-radius: 999px;
    border: 1px solid ${(props) => props.theme.purplePrimary};
    font-size: 14px;
    font-weight: 500;
    line-height: 1.43;
    text-align: center;
    color: ${(props) => props.theme.purplePrimary};
    padding: 8px 25px;
  }
  //song weekchart
  .song-weekchart {
    /* .add-to-library, */
    .media-content {
      display: none;
    }
  }
  .song-item-content {
    justify-content: space-between;
  }
  .song__info {
    display: flex;
    flex-direction: column;
    overflow: initial;
    display: -webkit-box;
    word-break: break-word;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    max-width: 125px;
  }
  .song__info-name > span {
    display: -webkit-box;
    word-break: break-word;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    white-space: initial;
  }
`;
