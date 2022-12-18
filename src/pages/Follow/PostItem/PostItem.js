import React from "react";
import styled from "styled-components";
import { FaRegComment } from "react-icons/fa";
import ReactPlayer from "react-player";
import ConvertDates from "~/utils/ConvertDates";
const PostItem = ({ item = {} }) => {
  return (
    <StyledPostItem className="relative p-5 rounded-lg shadow-md ">
      <div className="flex flex-col mb-3">
        <div className="flex items-center gap-x-3">
          <div className="w-10 h-10 rounded-full post-avatar-img">
            <img
              className="rounded-full"
              src={item?.publisher?.thumbnail || ""}
              alt=""
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <div className="flex items-center">
              <span className="text-base font-medium post-name">
                {item?.publisher?.name || item?.publisher?.alias || ""}
              </span>
              <span className="post-dot ">&nbsp;&nbsp;•&nbsp;&nbsp;</span>
              <span className="text-sm cursor-pointer whitespace-nowrap post-follower">
                Quan Tâm
              </span>
            </div>
            <span className="text-xs post-time opacity-60">
              {ConvertDates(item?.publishTime || item?.createdTime)}
            </span>
          </div>
        </div>
        <div className="mt-4 post-content">
          {item?.title || item?.shortDescription || item?.description || ""}
        </div>
      </div>
      <div className="post-image h-[350px] flex justify-center items-center relative  rounded-lg">
        {item?.content?.photos && (
          <img
            className="rounded-lg h-[350px]  object-cover "
            src={item?.content?.photos[0]?.url}
            alt=""
          />
        )}
        {item?.content.source && (
          <ReactPlayer
            width={"100%"}
            height={"100%"}
            loop={true}
            controls={true}
            url={item?.content?.source["240p"]}
          />
        )}
      </div>
      <div className="flex items-center mt-3 post-action gap-x-4">
        <div className="flex items-center gap-x-2">
          <i className="cursor-pointer bi post-heart post-follower bi-heart-fill"></i>
          <span className="post-content">{item?.like}</span>
        </div>
        <div className="flex items-center gap-x-1">
          <FaRegComment className="cursor-pointer post-content" />
          <span className="post-content">{item?.comment}</span>
        </div>
      </div>
    </StyledPostItem>
  );
};

export default PostItem;
const StyledPostItem = styled.div`
  background-color: ${(props) => props.theme.boxItemBg};
  .post-follower {
    color: ${(props) => props.theme.purplePrimary};
  }
  .post-content,
  .post-time,
  .post-dot,
  .post-name {
    color: ${(props) => props.theme.textPrimary};
  }
`;
