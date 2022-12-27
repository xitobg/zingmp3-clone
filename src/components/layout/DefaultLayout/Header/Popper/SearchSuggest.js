import React from "react";
import { useDispatch } from "react-redux";
import SongItem from "~/components/songItem";
import handlePlaySingleSong from "~/functions/HandlePlaySingleSong";
const SearchSuggest = ({ data = [] }) => {
  const dispatch = useDispatch();
  return (
    data.length > 0 &&
    data.map((item, index) => {
      return (
        <SongItem
          onClick={() => {
            handlePlaySingleSong(item, dispatch);
          }}
          section="search"
          key={index}
          item={item}
        />
      );
    })
  );
};

export default SearchSuggest;
