import axios from "axios";
import React, { useEffect, useState } from "react";
import WrapperLayout from "~/components/wrapperLayout";
import PostItem from "./PostItem/PostItem";

const Follow = () => {
  const [dataFollow, setDataFollow] = useState([]);
  useEffect(() => {
    async function fetch() {
      try {
        const response = await axios.get(
          `https://api-zingmp3next.vercel.app/api/newfeeds?id="IWZ9Z08I"`
        );
        console.log("data follow:", response.data.data);
        if (response.data && response.data.data) {
          setDataFollow(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <WrapperLayout>
      <div className="follow-container mt-12">
        <div className="grid grid-cols-3 post-list-item gap-y-5 gap-x-7">
          {dataFollow?.items &&
            dataFollow.items.map((item, index) => {
              return (
                <PostItem
                  key={`${item.publishTime}${item.title}`}
                  item={item}
                />
              );
            })}
        </div>
      </div>
    </WrapperLayout>
  );
};

export default Follow;
