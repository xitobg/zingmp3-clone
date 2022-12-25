import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SongItem from "~/components/songItem";
const ChartRanking = ({ data = [], onClick }) => {
  const dispatch = useDispatch();
  const { isRandom } = useSelector((state) => state.audio);
  const [songList, setSongList] = useState([]);
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    if (data && data.RTChart) {
      const { items } = data.RTChart;
      setSongList(items);
    }
  }, [data, showAll]);

  return (
    <div className="chart__ranking-container mt-7">
      {showAll &&
        songList?.map((song, index) => (
          <SongItem
            key={song.encodeId}
            index={index}
            item={song}
            section="zingchart"
            onClick={() =>
              onClick(
                song,
                songList,
                data.RTChart.sectionId,
                isRandom,
                dispatch
              )
            }
          />
        ))}
      {!showAll &&
        songList
          ?.slice(0, 10)
          .map((song, index) => (
            <SongItem
              key={song.encodeId}
              index={index}
              item={song}
              section="zingchart"
              onClick={() =>
                onClick(
                  song,
                  songList,
                  data.RTChart.sectionId,
                  isRandom,
                  dispatch
                )
              }
            />
          ))}
      {!showAll && (
        <div className="w-full text-center">
          <button onClick={() => setShowAll(true)} className="view-all">
            Xem top 100
          </button>
        </div>
      )}
    </div>
  );
};

export default ChartRanking;
