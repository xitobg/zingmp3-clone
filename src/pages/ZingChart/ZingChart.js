import React from "react";
import WrapperLayout from "~/components/wrapperLayout";
import styled from "styled-components";
import { useEffect } from "react";
import * as request from "~/services/request";
import { useDispatch, useSelector } from "react-redux";
import { setListSong, setLoading } from "~/redux-toolkit/global/globalSlice";
import { useState } from "react";
import SongItem from "~/components/songItem";
import ChartRanking from "./chartRank";
import Loading from "~/components/loading/Loading";
import WeekChart from "./weekChart";
const StyledZingChart = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  & .title {
    font-size: 40px;
    font-weight: 800;
    margin-bottom: 0;
    line-height: normal;
  }
  & .zingchart-btn {
    background-color: ${(props) => props.theme.purplePrimary};
  }
  & .chart-line {
    width: 100%;
    height: 1px;
    border: 1px dashed ${(props) => props.theme.navigationText};
    opacity: 0.5;
  }
  .view-all {
    display: inline-block;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.43;
    text-align: center;
    color: ${(props) => props.theme.purplePrimary};
    background-color: transparent;
    padding: 8px 25px;
    border: 1px solid ${(props) => props.theme.purplePrimary};
    margin: 20px auto 30px;
  }
`;
const ZingChart = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.global);
  const [dataZingChart, setDataZingChart] = useState([]);

  useEffect(() => {
    dispatch(setLoading(true));
    request
      .get("/chart/home")
      .then((res) => {
        console.log(res.data);
        setDataZingChart(res.data);
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
        console.log(err);
      });
  }, []);

  return (
    <WrapperLayout>
      {loading && <Loading />}
      {!loading && (
        <StyledZingChart>
          <div className="flex items-center chart-title gap-x-3">
            <h3 className="title">#zingchart</h3>
            <button className="flex items-center justify-center w-10 h-10 rounded-full zingchart-btn">
              <i className="text-xl text-white bi bi-play-fill"></i>
            </button>
          </div>
          <div className="flex flex-col my-7 gap-y-12">
            <div className="chart-line"></div>
            <div className="chart-line"></div>
            <div className="chart-line"></div>
            <div className="chart-line"></div>
          </div>
          <ChartRanking data={dataZingChart} />
          <WeekChart data={dataZingChart} />
        </StyledZingChart>
      )}
    </WrapperLayout>
  );
};

export default ZingChart;
