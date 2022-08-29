import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import SongItem from "~/components/songItem";

const ChartRanking = ({ data = [], onClick = () => {} }) => {
  const [songList, setSongList] = useState([]);
  useEffect(() => {
    if (data && data.RTChart) {
      const { items } = data.RTChart;
      setSongList(items.slice(0, 5));
    }
  }, [data]);

  return (
    <div onClick={onClick} className="chart__ranking-container mt-7">
      {songList.length > 0 &&
        songList.map((item, index) => (
          <SongItem
            key={item.encodeId}
            index={index}
            item={item}
            section="zingchart"
          />
        ))}

      <button className="view-all">Xem top 100</button>
    </div>
  );
};

export default ChartRanking;
