import React from "react";
import styled from "styled-components";
import { FaRegComment } from "react-icons/fa";
import ReactPlayer from "react-player";
import ConvertDates from "~/utils/ConvertDates";
const PostItem = ({ item = {} }) => {
  return (
    <StyledPostItem className="rounded-lg relative p-5 shadow-md ">
      <div className="flex mb-3 flex-col">
        <div className="flex gap-x-3  items-center">
          <div className="post-avatar-img w-10 h-10 rounded-full">
            <img
              className="rounded-full"
              src={item?.publisher?.thumbnail || ""}
              alt=""
            />
          </div>
          <div className="flex  flex-col gap-y-1">
            <div className="flex items-center">
              <span className="post-name text-base font-medium">
                {item?.publisher?.name || item?.publisher?.alias || ""}
              </span>
              <span className="post-dot ">&nbsp;&nbsp;•&nbsp;&nbsp;</span>
              <span className="text-sm cursor-pointer post-follower">
                Quan Tâm
              </span>
            </div>
            <span className="post-time  text-xs opacity-60">
              {ConvertDates(item?.publishTime || item?.createdTime)}
            </span>
          </div>
        </div>
        <div className="post-content mt-4">
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
      <div className="post-action mt-3 flex items-center gap-x-4">
        <div className="flex items-center gap-x-2">
          <i className="bi cursor-pointer post-heart post-follower bi-heart-fill"></i>
          <span className="post-content">{item?.like}</span>
        </div>
        <div className="flex items-center gap-x-1">
          <FaRegComment className="post-content cursor-pointer" />
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
