import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Icon from "../Icon";
const StyledMix = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  .card__item-img {
    &:hover .card-img {
      transform: scale(1.1);
    }
    &:hover .card-action {
      visibility: visible;
    }
  }
  .artist-name {
    color: ${(props) => props.theme.textSecondary};
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.linkTextHover};
      text-decoration: underline;
    }
  }
`;
const Mix = ({ data = {} }) => {
  const { items } = data;

  return (
    <StyledMix className="container-layout">
      <h3>Mix Riêng Cho Bạn</h3>
      <div className="grid grid-cols-5 gap-x-7">
        {items?.slice(0, 5).map((item) => {
          const {
            encodeId,
            thumbnail,
            title,
            sortDescription,
            artistsNames,
            link,
            alias,
          } = item;
          return (
            <Link
              to={link}
              state={{ playListId: encodeId }}
              key={encodeId}
              className="flex flex-col"
            >
              <div className="relative  card__item-img after:invisible overflow-hidden hover:after:visible after:content-[''] after:w-full after:h-full after:inset-0 after:bg-black after:bg-opacity-50 after:absolute w-full rounded-md cursor-pointer ">
                <img
                  className="object-cover w-full transition-all duration-700 rounded-md card-img"
                  src={thumbnail}
                  alt=""
                />
                <div className="absolute z-10 flex items-center invisible w-full card-action justify-evenly top-2/4 -translate-x-2/4 -translate-y-2/4 left-2/4 ">
                  <Icon>
                    <i className="text-white bi bi-heart-fill icon-heart"></i>
                  </Icon>
                  <Icon>
                    <i className="p-[5px] border border-white text-[30px] leading-[0px] flex justify-center items-center bi bi-play-fill text-white w-[45px] h-[45px] rounded-full"></i>
                  </Icon>
                  <Icon>
                    <i className="text-white bi bi-three-dots playlist-action-dots"></i>
                  </Icon>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="mt-2 mb-1 text-base font-bold cursor-pointer card-title text-inherit ">
                  {title}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </StyledMix>
  );
};

export default Mix;
