import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { IoSettingsOutline } from "react-icons/io5";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Search from "./Search";
import ModalTheme from "~/themes/modalTheme";
import { useDispatch, useSelector } from "react-redux";
import { setShowModalTheme } from "~/redux-toolkit/global/globalSlice";
import avatar from "~/assets/image/avatar.jpg";
import { useAuth } from "~/contexts/auth-context";
import { ThemeIcon } from "~/components/layout/DefaultLayout/Header/icons/Icons";
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
  const { userInfo } = useAuth();
  console.log("user info:", userInfo);
  return (
    <Fragment>
      <StyledHeader
        className={`header justify-between flex items-center fixed top-0 right-0 h-[70px] px-7 ${
          isSticky ? "isSticky" : ""
        }`}
      >
        <Search></Search>
        <div className="flex gap-x-3">
          <Tippy content="Chủ đề">
            <button
              onClick={() => dispatch(setShowModalTheme(true))}
              className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer btn-theme "
            >
              <ThemeIcon />
            </button>
          </Tippy>
          <Tippy content="Tải lên ">
            <button className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer btn-theme ">
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
          {!userInfo ? (
            <button className="flex items-center justify-center w-10 h-10 overflow-hidden rounded-full cursor-pointer">
              <img className="rounded-full" src={avatar} alt="" />
            </button>
          ) : (
            <button className="flex items-center justify-center w-10 h-10 overflow-hidden rounded-full cursor-pointer">
              <img className="rounded-full" src={userInfo.photoURL} alt="" />
            </button>
          )}
        </div>
      </StyledHeader>
      <ModalTheme
        handleClose={() => dispatch(setShowModalTheme(false))}
      ></ModalTheme>
    </Fragment>
  );
};

export default Header;
