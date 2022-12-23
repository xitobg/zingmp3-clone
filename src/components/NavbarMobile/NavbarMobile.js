import React from "react";
import { BsMusicNoteBeamed, BsStar, BsUiChecksGrid } from "react-icons/bs";
import { SiYoutubemusic } from "react-icons/si";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
const NavbarMobile = () => {
  return (
    <StyledNav className="items-center hidden mt-5 navbar__menu-mobile justify-evenly">
      <div className="relative flex flex-col items-center gap-y-2">
        <div className="relative">
          <NavLink
            to={`/new-release`}
            className="inline-block p-2 text-white transition-all duration-500 bg-blue-500 hover:opacity-70 rounded-xl"
          >
            <BsMusicNoteBeamed className="text-lg text-white cursor-pointer" />
          </NavLink>
        </div>
        <span className="text-xs select-none navbar-mobile-text">Nhạc Mới</span>
      </div>
      <div className="relative flex flex-col items-center gap-y-2">
        <div className="relative">
          <NavLink
            to={`/hub`}
            className="inline-block p-2 text-white transition-all duration-500 bg-[#fb8500] hover:opacity-70 rounded-xl"
          >
            <BsUiChecksGrid className="text-lg text-white cursor-pointer" />
          </NavLink>
        </div>
        <span className="text-xs select-none navbar-mobile-text">Thể Loại</span>
      </div>
      <div className="relative flex flex-col items-center gap-y-2">
        <div className="relative">
          <NavLink
            to={`/top-100`}
            className="inline-block p-2 text-white transition-all duration-500 bg-[#8338ec] hover:opacity-70 rounded-xl"
          >
            <BsStar className="text-lg text-white cursor-pointer" />
          </NavLink>
        </div>
        <span className="text-xs select-none navbar-mobile-text">Top 100</span>
      </div>
      <div className="relative flex flex-col items-center gap-y-2">
        <div className="relative">
          <NavLink
            to={`/mv`}
            className="inline-block p-2 text-white transition-all duration-500 bg-[#f72585] hover:opacity-70 rounded-xl"
          >
            <SiYoutubemusic className="text-lg text-white cursor-pointer" />
          </NavLink>
        </div>
        <span className="text-xs select-none navbar-mobile-text">MV</span>
      </div>
    </StyledNav>
  );
};

export default NavbarMobile;
const StyledNav = styled.div`
  .navbar-mobile-text {
    color: ${(props) => props.theme.textPrimary};
  }
`;
