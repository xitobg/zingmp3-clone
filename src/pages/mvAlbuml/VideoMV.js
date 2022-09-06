import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Tippy from "@tippyjs/react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { setShowVideoMV } from "~/redux-toolkit/global/globalSlice";
import { Link, useLocation } from "react-router-dom";
const StyledVideo = styled.div`
  position: fixed;
  top: 100%;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  transition: 0.6s all;
  &.show {
    top: 0;
  }
  background-color: #1e1e1e;
  & .artist-name {
    cursor: pointer;
    color: ${(props) => props.theme.textSecondary};
    &:hover {
      text-decoration: underline;
      ${(props) => props.theme.purplePrimary};
    }
  }
  & video {
    border-radius: 10px;
  }
  & .title {
    color: #fff;
    font-size: 18px;
    font-weight: 700;
  }
  & .card-title {
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    white-space: normal;
    line-height: 1.5;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    color: #fff;
    &:hover {
      color: ${(props) => props.theme.linkTextHover};
    }
  }
  .card-subtitle {
    color: ${(props) => props.theme.textSecondary};
    &:hover {
      color: #ea7aa0;
      text-decoration: underline;
    }
  }
`;
const VideoMV = () => {
  const dispatch = useDispatch();
  const { showVideoMV } = useSelector((state) => state.global);
  const [dataMv, setDataMv] = useState([]);

  useEffect(() => {
    async function fetch() {
      try {
        const response = await axios.get(
          `https://apizingmp3.herokuapp.com/api/video?id=ZW8ICOAI}`
        );
        console.log("data mv:", response.data.data);
        if (response.data && response.data.data) {
          setDataMv(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetch();
  }, []);
  const { streaming, recommends, artist, title } = dataMv;
  return (
    <StyledVideo className={`${showVideoMV ? "show" : ""}`}>
      <div className="relative w-full h-full px-8 overflow-hidden">
        <div className="video-container min-h-screen bg-[rgba(0,0,0,.5) ">
          <div className="flex justify-between p-4 video-header">
            <div className="flex items-center gap-x-3">
              <div className="w-10 h-10 rounded-full video-avatar">
                <img className="rounded-full" src={artist?.thumbnail} alt="" />
              </div>
              <div className="flex flex-col justify-start whitespace-nowrap">
                <h3 className="mb-0 text-lg font-semibold text-white">
                  {title}
                </h3>
                <span className="text-sm font-medium text-left artist-name">
                  {artist?.name}
                </span>
              </div>
            </div>
            <Tippy content="Đóng">
              <div
                onClick={() => dispatch(setShowVideoMV(false))}
                className="close-video flex justify-center items-center  w-10 h-10 rounded-full bg-[hsla(0,0%,100%,.1)] shadow-[0_2px_4px_0_rgb(133 105 208 / 11%)]"
              >
                <i className="text-lg leading-[0px]  text-white bi bi-x-lg"></i>
              </div>
            </Tippy>
          </div>
          <div className="relative flex px-3 gap-x-7 video-body">
            <div className="w-[70%] relative">
              <div className="video-player rounded-md h-[500px] overflow-hidden w-full relative">
                <ReactPlayer
                  width={"100%"}
                  height={"100%"}
                  loop={true}
                  controls={true}
                  url={streaming?.mp4["720p"] || streaming?.hls["720p"]}
                />
              </div>
            </div>
            <div className="w-[30%] recommend-container rounded-md bg-[hsla(0,0%,100%,.10196078431372549)] flex  flex-col">
              <div className="flex items-center justify-between p-5 recommend-header">
                <h3 className="title">Danh sách phát</h3>
              </div>
              <div className="flex flex-col h-[400px] recommend-list has-scroll-bar">
                {recommends &&
                  recommends.map((item, index) => {
                    const { encodeId, thumbnail, title } = item;
                    return (
                      <div
                        key={encodeId}
                        className="recommend-card relative gap-3 flex py-[6px] hover:bg-[hsla(0,0%,100%,.05)] px-5"
                      >
                        <div className="z-50 relative cursor-pointer overflow-hidden w-[120px] h-[64px] rounded-md">
                          <img
                            className="w-full rounded-md"
                            src={thumbnail}
                            alt=""
                          />
                        </div>
                        <div className="flex flex-col justify-center flex-1 flex-grow select-none gap-y-1 ">
                          <span className="text-white card-title whitespace-nowrap">
                            {title}
                          </span>
                          <p className="text-xs font-normal cursor-pointer card-subtitle">
                            Hương Ly
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledVideo>
  );
};

export default VideoMV;
