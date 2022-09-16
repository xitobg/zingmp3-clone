import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import PlaylistItem from "./PlaylistItem";
const StyledPlaylist = styled.div`
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
  .card-action.active {
    visibility: visible;
  }
`;
const Playlist = ({ data = {} }) => {
  const { items, title } = data;
  let slickProperty = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },

      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 5,
        },
      },
    ],
  };
  return (
    <StyledPlaylist className="container-layout">
      <h3>{title}</h3>
      <Slider {...slickProperty}>
        {items?.length > 0 &&
          items
            ?.slice(0, 5)
            .map((item, index) => (
              <PlaylistItem key={index} item={item}></PlaylistItem>
            ))}
      </Slider>
    </StyledPlaylist>
  );
};

export default Playlist;
