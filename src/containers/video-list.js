import React from "react";
import VideoListItem from "../components/video-list-item";
const VideoList = props => {
  // console.log("##movieList", movieList);
  const { movieList } = props;
  return (
    <div>
      <ul>
        {movieList.map(movie => {
          return (
            <VideoListItem
              movie={movie}
              key={movie.id}
              callback={receiveCallBack}
            />
          );
        })}
      </ul>
    </div>
  );
  function receiveCallBack(movie) {
    props.callback(movie);
  }
};

export default VideoList;
