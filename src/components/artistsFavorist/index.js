import React, { useEffect, useState } from "react";
import Icon from "../Icon";
import { ArtistData } from "./ArtistFavoristData";
import styled from "styled-components";
const StyledArtistFav = styled.div`
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
const ArtistFavorist = () => {
  return (
    <StyledArtistFav className="container-layout">
      <h3>Nghệ Sĩ Yêu Thích</h3>
      <div className="grid grid-cols-3 gap-x-7">
        {ArtistData?.map((item) => {
          const { id, author, image, subimage } = item;
          return (
            <div
              key={id}
              className="relative  card__item-img after:invisible overflow-hidden hover:after:visible after:content-[''] after:w-full after:h-full after:inset-0 after:bg-black after:bg-opacity-50 after:absolute w-full rounded-md cursor-pointer "
            >
              <img
                className="object-cover w-full transition-all duration-700 rounded-md card-img"
                src={image}
                alt=""
              />
              <div className="absolute z-10 flex items-center invisible w-full card-action justify-evenly top-2/4 -translate-x-2/4 -translate-y-2/4 left-2/4 ">
                <Icon>
                  <i className="p-[5px] border border-white text-[30px] leading-[0px] flex justify-center items-center bi bi-play-fill text-white w-[45px] h-[45px] rounded-full"></i>
                </Icon>
              </div>
              <div className="absolute bottom-[15px] z-10 px-4 w-full">
                <span className="text-[10px] tracking-[1px] text-white uppercase  cursor-pointer font-bold ">
                  VÌ BẠN YÊU THÍCH
                </span>
                <h5 className=" font-bold text-[28px] text-white whitespace-normal text-ellipsis tracking-[-1px] leading-[1.2]">
                  {author}
                </h5>
                <div className="mt-2 grid grid-cols-4 gap-x-[10px]">
                  {subimage?.map((item, index) => (
                    <div
                      key={index}
                      className="relative w-full rounded-md cursor-pointer"
                    >
                      <img
                        className="object-cover w-full rounded-md"
                        src={item.img}
                        alt=""
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </StyledArtistFav>
  );
};

export default ArtistFavorist;
