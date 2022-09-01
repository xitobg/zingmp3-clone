import React, { useRef, useState } from "react";
import styled from "styled-components";
const StyledProgress = styled.div`
  & .progress-dot,
  & .progress-bar {
    background-color: ${(props) => props.theme.purplePrimary};
  }
`;
const Progress = ({ setWidth, setHeight, percentSlider, getPercentSlider }) => {
  const sliderRef = useRef(null);

  // Active UI Dot Slider Hover
  const [isActiveSliderDotHover, setActiveSliderDotHover] = useState(false);

  // Active UI Tooltip Dot Hover
  const [isActiveSliderTooltipHover, setActiveSliderTooltipHover] =
    useState(false);

  // Handler Active Dot Slider Hover
  const handleActiveSliderDotHover = (handle) => {
    setActiveSliderDotHover(handle);
  };

  // Handler Active Tooltip Dot Hover
  const handleActiveSliderTooltipHover = (handle) => {
    setActiveSliderTooltipHover(handle);
  };
  return (
    <StyledProgress
      style={{
        width: `${setWidth}`,
      }}
      className="relative w-full progress"
    >
      {/* Slider Bar Progress */}
      <div
        className="px-0 py-[6px]"
        onMouseOver={() => handleActiveSliderDotHover(true)}
        onMouseOut={() => handleActiveSliderDotHover(false)}
        ref={sliderRef}
        onMouseDown={(e) => {
          // console.log("Mouse Down")

          /*
            |-------------------|------|----------------|------|
            ^                   ^      ^                ^
            |<--Bounding Left-->|      |                |
            |<-----------clientX------>|                |
            |<-------------Slider Offset Width--------->|
          */

          if (sliderRef.current) {
            let percentSliderWidth =
              ((e.clientX - sliderRef.current.getBoundingClientRect().left) /
                sliderRef.current.offsetWidth) *
              100;

            percentSliderWidth =
              percentSliderWidth < 0
                ? 0
                : percentSliderWidth > 100
                ? 100
                : percentSliderWidth;

            getPercentSlider(percentSliderWidth);
          }

          const handleMouseMove = (e) => {
            // console.log("Mouse Move")
            if (sliderRef.current) {
              let percentSliderWidth =
                ((e.clientX - sliderRef.current.getBoundingClientRect().left) /
                  sliderRef.current.offsetWidth) *
                100;

              percentSliderWidth =
                percentSliderWidth < 0
                  ? 0
                  : percentSliderWidth > 100
                  ? 100
                  : percentSliderWidth;

              getPercentSlider(percentSliderWidth);
            }
          };

          // Add Event Mouse Move
          window.addEventListener("mousemove", handleMouseMove);

          // Add Event Mouse Up
          window.addEventListener("mouseup", () => {
            // Remove Event Mouse Move
            window.removeEventListener("mousemove", handleMouseMove);
          });
        }}
      >
        {/* Slider Bar Rail */}
        <div
          style={{
            height: `${setHeight}`,
          }}
          className="relative   w-full transition-[width,left] duration-300 bg-[#4642422e] rounded-[15px]"
        >
          <div
            style={{
              width: `${percentSlider}%`,
              height: `${setHeight}`,
            }}
            className="top-0 left-0 -translate-y-2/4   absolute z-[1] progress-bar rounded-[15px]"
          ></div>
          {/* End React Slider Process  */}
          {/* React Slider Dot
           * Change Slider Dot -> left: 23%
           */}
          <div
            style={{
              left: `${percentSlider}%`,
            }}
            className="absolute z-[5] w-3 h-3 top-[50%] translate-x-[-50%] translate-y-[-50%] transition-[left]"
          >
            <div
              onMouseOver={() => handleActiveSliderTooltipHover(true)}
              onMouseOut={() => handleActiveSliderTooltipHover(false)}
              className="box-border w-full h-full rounded-full cursor-pointer progress-dot "
            ></div>
          </div>
        </div>
      </div>
    </StyledProgress>
  );
};

export default Progress;
