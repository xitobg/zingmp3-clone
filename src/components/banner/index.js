import React from "react";
import { Link } from "react-router-dom";
import BannerItem from "./bannerItem/BannerItem";
// slick slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
const StyledBanner = styled.div`
  & .slick-slider {
    & .slick-slide__btn {
      display: inline-block;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background-color: ${(props) => props.theme.alphaBg};
      border-radius: 100rem;
      cursor: pointer;
      z-index: 50;
      opacity: 0;
      visibility: hidden;
    }
    &:hover .slick-slide__btn {
      opacity: 1;
      visibility: visible;
    }
    & .next-btn {
      right: 0;
      color: #fff;
      font-size: 50px;
    }
    & .prev-btn {
      left: 0;
      color: #fff;
      font-size: 50px;
    }
  }
`;
function NextArrow(props) {
  const { onClick } = props;
  return (
    <div className="next-btn slick-slide__btn" onClick={onClick}>
      <BiChevronRight />
    </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;

  return (
    <div className="prev-btn slick-slide__btn" onClick={onClick}>
      <BiChevronLeft />
    </div>
  );
}
const Banner = ({ data }) => {
  const { items } = data;
  let slickProperty = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };
  return (
    <StyledBanner className="container-layout">
      <div className="relative w-full overflow-hidden ">
        <Slider {...slickProperty}>
          {items
            .filter((item) => item.type !== 8)
            .map((item, index) => (
              <BannerItem key={item.encodeId} item={item} />
            ))}
        </Slider>
      </div>
    </StyledBanner>
  );
};

export default Banner;
