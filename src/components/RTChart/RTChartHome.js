import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import chartBg from "~/assets/bg/chartbg.jpg";
import Chart2 from "../chart/Chart2";
// import {Chart} from "chart.js/auto"
import SongItem from "../songItem";
const RTChartHome = ({ data = {} }) => {
  const { items, chart } = data;

  return (
    <StyledRTChart>
      <div
        style={{
          backgroundImage: `url(${chartBg})`,
        }}
        className="absolute inset-0 chart-bg-blur"
      ></div>
      <div className="inset-0 absolute z-0 chart-bg-alpha opacity-95"></div>
      <div className="relative z-50 flex items-center mb-4 gap-x-3">
        <h3 className="chart-home-title">#zingchart</h3>
        <button className="flex items-center justify-center w-8 h-8 transition-all duration-700 rounded-full hover:opacity-60 zingchart-btn">
          <i className="text-xl text-white bi bi-play-fill"></i>
        </button>
      </div>
      <div className="flex gap-x-4">
        <div className="chart-song-list w-[400px] flex-shrink-0 px-3">
          <div className="relative mb-1">
            {items &&
              items.slice(0, 3).map((song, index) => {
                return (
                  <SongItem
                    section="zingchart"
                    key={song.encodeId}
                    item={song}
                    playingBar
                    index={index}
                    className="song-chart"
                  />
                );
              })}
          </div>
          <div className="relative z-50 flex justify-center">
            <NavLink to={`/zingchart`} className="chart__btn-view-all ">
              XEM THÊM
            </NavLink>
          </div>
        </div>
        <div className="chart">{data && <Chart2 data={chart} />}</div>
      </div>
    </StyledRTChart>
  );
};

export default RTChartHome;
const StyledRTChart = styled.div`
  position: relative;
  margin-top: 48px;
  padding: 20px;
  border-radius: 8px;
  overflow: hidden;
  .chart {
    flex: 1;
  }
  .chart-home-title {
    color: ${(props) => props.theme.textPrimary};
    font-size: 20px;
    margin-bottom: 0;
    user-select: none;
  }
  & .zingchart-btn {
    background-color: ${(props) => props.theme.purplePrimary};
  }
  .chart-bg-alpha {
    background-image: linear-gradient(180deg, #740091, #2d1a4c);
  }
  .song-chart {
    background-color: hsla(0, 0%, 100%, 0.07);
    margin-bottom: 10px;
    .media-right,
    .media-content {
      display: none;
    }
  }
  .chart__btn-view-all {
    color: #fff;
    border-radius: 999px;
    border: 1px solid #fff;
    padding: 5px 25px;
    font-size: 14px;
    font-weight: 400;
    z-index: 50;
    position: relative;
    transition: 0.3s all;
    &:hover {
      background-color: hsla(0, 0%, 100%, 0.1);
    }
  }
`;
