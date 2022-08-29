import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import SongItem from "~/components/songItem";
import {
  changeIconPlaying,
  setInfoSongPlayer,
  setPlaylistId,
  setPlaylistSong,
  setSongId,
} from "~/redux-toolkit/audio/audioSlice";

const ChartRanking = ({ data = [], onClick }) => {
  const dispatch = useDispatch();
  const [songList, setSongList] = useState([]);
  const handlePlaySongChart = (song, playlist, idPlaylist) => {
    dispatch(setSongId(song.encodeId));
    dispatch(setInfoSongPlayer(song));
    dispatch(setPlaylistId(idPlaylist));
    dispatch(setPlaylistSong(playlist));
    dispatch(changeIconPlaying(true));
  };
  useEffect(() => {
    if (data && data.RTChart) {
      const { items } = data.RTChart;
      setSongList(items.slice(0, 20));
    }
  }, [data]);

  return (
    <div className="chart__ranking-container mt-7">
      {songList.length > 0 &&
        songList.map((item, index) => (
          <SongItem
            key={item.encodeId}
            index={index}
            item={item}
            section="zingchart"
            onClick={() =>
              handlePlaySongChart(item, songList, data.RTChart.sectionId)
            }
          />
        ))}

      <button className="view-all">Xem top 100</button>
    </div>
  );
};

export default ChartRanking;
