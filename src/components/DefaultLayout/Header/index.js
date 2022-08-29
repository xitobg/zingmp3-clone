import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { IoSettingsOutline } from "react-icons/io5";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Search from "./Search";
import ModalTheme from "~/themes/modalTheme";
import { useDispatch, useSelector } from "react-redux";
import { setShowModalTheme } from "~/redux-toolkit/global/globalSlice";

const StyledHeader = styled.div`
  z-index: 300;
  color: ${(props) => props.theme.textColor};
  &.isSticky {
    box-shadow: 0 3px 5px rgb(0 0 0 / 10%);
    background-color: ${(props) => props.theme.layoutBg};
  }
  width: calc(100% - 240px);

  .btn-theme {
    background-color: ${(props) => props.theme.alphaBg};
  }
  @keyframes animation {
    100% {
      transform: rotate(360deg);
    }
  }
  .btn-seting {
    animation: animation 2.5s linear infinite;
    color: ${(props) => props.theme.settingIconText};
  }
  .upload-btn {
    color: ${(props) => props.theme.settingIconText};
  }
`;
const Header = () => {
  const dispatch = useDispatch();
  const { isSticky } = useSelector((state) => state.global);
  return (
    <Fragment>
      <StyledHeader
        className={`header justify-between flex items-center fixed top-0 right-0 h-[70px] px-7 ${
          isSticky ? "isSticky" : ""
        }`}
      >
        <Search></Search>
        <div className="flex">
          <Tippy content="Chủ đề">
            <button
              onClick={() => dispatch(setShowModalTheme(true))}
              className="flex items-center justify-center w-10 h-10 mr-3 rounded-full cursor-pointer btn-theme "
            >
              <svg width="20" height="20" viewBox="0 0 20 20">
                <defs>
                  <linearGradient
                    id="j32lhg93hd"
                    x1="62.206%"
                    x2="18.689%"
                    y1="70.45%"
                    y2="39.245%"
                  >
                    <stop offset="0%" stopColor="#F81212"></stop>
                    <stop offset="100%" stopColor="red"></stop>
                  </linearGradient>
                  <linearGradient
                    id="hjoavsus6g"
                    x1="50%"
                    x2="11.419%"
                    y1="23.598%"
                    y2="71.417%"
                  >
                    <stop offset="0%" stopColor="#00F"></stop>
                    <stop offset="100%" stopColor="#0031FF"></stop>
                  </linearGradient>
                  <linearGradient
                    id="la1y5u3dvi"
                    x1="65.655%"
                    x2="25.873%"
                    y1="18.825%"
                    y2="56.944%"
                  >
                    <stop offset="0%" stopColor="#FFA600"></stop>
                    <stop offset="100%" stopColor="orange"></stop>
                  </linearGradient>
                  <linearGradient
                    id="2dsmrlvdik"
                    x1="24.964%"
                    x2="63.407%"
                    y1="8.849%"
                    y2="55.625%"
                  >
                    <stop offset="0%" stopColor="#13EFEC"></stop>
                    <stop offset="100%" stopColor="#00E8DF"></stop>
                  </linearGradient>
                  <filter
                    id="4a7imk8mze"
                    width="230%"
                    height="230%"
                    x="-65%"
                    y="-65%"
                    filterUnits="objectBoundingBox"
                  >
                    <feGaussianBlur
                      in="SourceGraphic"
                      stdDeviation="3.9"
                    ></feGaussianBlur>
                  </filter>
                  <filter
                    id="301mo6jeah"
                    width="312.7%"
                    height="312.7%"
                    x="-106.4%"
                    y="-106.4%"
                    filterUnits="objectBoundingBox"
                  >
                    <feGaussianBlur
                      in="SourceGraphic"
                      stdDeviation="3.9"
                    ></feGaussianBlur>
                  </filter>
                  <filter
                    id="b2zvzgq7fj"
                    width="295%"
                    height="295%"
                    x="-97.5%"
                    y="-97.5%"
                    filterUnits="objectBoundingBox"
                  >
                    <feGaussianBlur
                      in="SourceGraphic"
                      stdDeviation="3.9"
                    ></feGaussianBlur>
                  </filter>
                  <filter
                    id="a1wq161tvl"
                    width="256%"
                    height="256%"
                    x="-78%"
                    y="-78%"
                    filterUnits="objectBoundingBox"
                  >
                    <feGaussianBlur
                      in="SourceGraphic"
                      stdDeviation="3.9"
                    ></feGaussianBlur>
                  </filter>
                  <path
                    id="qtpqrj1oda"
                    d="M3.333 14.167V5.833l-1.666.834L0 3.333 3.333 0h3.334c.04 1.57.548 2.4 1.524 2.492l.142.008C9.403 2.478 9.958 1.645 10 0h3.333l3.334 3.333L15 6.667l-1.667-.834v8.334h-10z"
                  ></path>
                  <path id="jggzvnjgfc" d="M0 0H20V20H0z"></path>
                  <path
                    id="2eiwxjmc7m"
                    d="M3.333 14.167V5.833l-1.666.834L0 3.333 3.333 0h3.334c.04 1.57.548 2.4 1.524 2.492l.142.008C9.403 2.478 9.958 1.645 10 0h3.333l3.334 3.333L15 6.667l-1.667-.834v8.334h-10z"
                  ></path>
                </defs>
                <g fill="none" fillRule="evenodd" transform="translate(2 3)">
                  <mask id="tinejqaasb" fill="#fff">
                    <use xlinkHref="#qtpqrj1oda"></use>
                  </mask>
                  <use
                    fill="#FFF"
                    fillOpacity="0"
                    xlinkHref="#qtpqrj1oda"
                  ></use>
                  <g mask="url(#tinejqaasb)">
                    <g transform="translate(-2 -3)">
                      <mask id="uf3ckvfvpf" fill="#fff">
                        <use xlinkHref="#jggzvnjgfc"></use>
                      </mask>
                      <use fill="#D8D8D8" xlinkHref="#jggzvnjgfc"></use>
                      <circle
                        cx="8.9"
                        cy="6.8"
                        r="9"
                        fill="url(#j32lhg93hd)"
                        filter="url(#4a7imk8mze)"
                        mask="url(#uf3ckvfvpf)"
                      ></circle>
                      <circle
                        cx="9.3"
                        cy="13.7"
                        r="5.5"
                        fill="url(#hjoavsus6g)"
                        filter="url(#301mo6jeah)"
                        mask="url(#uf3ckvfvpf)"
                      ></circle>
                      <circle
                        cx="15.9"
                        cy="6.9"
                        r="6"
                        fill="url(#la1y5u3dvi)"
                        filter="url(#b2zvzgq7fj)"
                        mask="url(#uf3ckvfvpf)"
                      ></circle>
                      <circle
                        cx="16.4"
                        cy="17.7"
                        r="7.5"
                        fill="url(#2dsmrlvdik)"
                        filter="url(#a1wq161tvl)"
                        mask="url(#uf3ckvfvpf)"
                      ></circle>
                    </g>
                  </g>
                  <use
                    fill="#FFF"
                    fillOpacity="0.05"
                    xlinkHref="#2eiwxjmc7m"
                  ></use>
                </g>
              </svg>
            </button>
          </Tippy>
          <Tippy content="Tải lên ">
            <button className="flex items-center justify-center w-10 h-10 mr-3 rounded-full cursor-pointer btn-theme ">
              <input id="upload-song" className="hidden" type="file" />
              <label htmlFor="upload-song">
                <i className="cursor-pointer upload-btn bi text-inherit bi-upload"></i>
              </label>
            </button>
          </Tippy>
          <Tippy content="Cài đặt">
            <button className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer btn-theme ">
              <IoSettingsOutline className="cursor-pointer btn-seting"></IoSettingsOutline>
            </button>
          </Tippy>
        </div>
      </StyledHeader>
      <ModalTheme
        handleClose={() => dispatch(setShowModalTheme(false))}
      ></ModalTheme>
    </Fragment>
  );
};

export default Header;
