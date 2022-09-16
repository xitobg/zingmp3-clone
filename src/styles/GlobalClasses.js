import { css } from "styled-components";

export const GlobalClasses = css`
  body {
    background-color: ${(props) => props.theme.layoutBg};

    &::-webkit-scrollbar {
      display: none;
    }
  }
  h3,
  h4 {
    color: ${(props) => props.theme.textPrimary};
  }
  //slick slider
  .slick-list {
    margin: 0 -14px;
    & .slick-slide {
      padding: 0 14px;
    }
  }
  .container-layout {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
  }
  .card-title {
    color: ${(props) => props.theme.textPrimary};
    display: -webkit-box;
    word-break: break-word;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    text-transform: capitalize;
  }
  h4,
  h3 {
    color: ${(props) => props.theme.textPrimary};
  }
  .card-content-subtitle {
    font-size: 14px;
    line-height: 1.33;
    color: ${(props) => props.theme.textSecondary};
    text-transform: capitalize;
    flex-wrap: nowrap;
    display: -webkit-box;
    word-break: break-word;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-weight: 400;
  }

  .tippy-box {
    font-size: 12px;
  }
  .tippy-content {
    padding-top: 3px;
    padding-bottom: 3px;
  }
  .overlay {
    position: relative;
    overflow: hidden;
    &::after {
      position: absolute;
      border-radius: 6px;
      content: "";
      inset: 0;
      width: 100%;
      height: 100%;
      background-color: ${(props) => props.theme.darkAlpha50Bg};
      visibility: hidden;
    }
    &:hover::after {
      visibility: visible;
    }
  }
  .center {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    z-index: 100;
  }
  .has-scroll-bar {
    will-change: scroll-position;
    scroll-behavior: smooth;
    overflow: hidden overlay;
    &::-webkit-scrollbar {
      width: 4px;
      display: none;
    }
    &:hover::-webkit-scrollbar {
      width: 4px;
      display: inline-block;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 12px;
      background: ${(props) => props.theme.tabActiveBg};
    }
  }

  .song-animated-item {
    position: absolute;
    cursor: pointer;
    border-radius: 4px;
    overflow: hidden;
    transition: all 0.9s;
    width: 230px;
    height: 230px;
    transition: all 0.9s;
    &.first {
      z-index: 3;
      left: 40px;
      opacity: 1;
    }
    &.second {
      z-index: 2;
      left: 20px;
      width: 196px;
      height: 196px;
      opacity: 0.7;
      background-image: linear-gradient(
        90deg,
        hsla(0, 0%, 100%, 0.5) 1%,
        rgba(0, 0, 0, 0.6) 14%
      );
    }
    &.third {
      z-index: 1;
      left: 0;
      width: 162px;
      height: 162px;
      opacity: 0.3;
      background-image: linear-gradient(
        90deg,
        hsla(0, 0%, 100%, 0.5) 1%,
        rgba(0, 0, 0, 0.6) 14%
      );
    }
  }
  //RESPONSIVE
  @media (max-width: 1024px) {
    .hide-on-mobile-tablet {
      display: none;
    }
    //Trang chu
    .side-bar {
      width: 70px;
      padding-top: 10px;
      & .sidebar-navbar-list::after {
        width: 70px !important;
      }
      & .menu-item {
        padding: 15px 0;
        justify-content: center;
        align-items: center;
      }
      & .zingmp3-brand {
        width: inherit;
        padding: 0;
        justify-content: center;
        align-items: center;
        height: auto;
        & .logo-mobile {
          display: block;
        }
      }
    }
    //header
    .header {
      width: calc(100% - 70px);
    }
    .playlist-list {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
`;
