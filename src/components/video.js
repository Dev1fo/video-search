import React from "react";

const BASE_URL = "https://www.youtube.com/embed/";

const Video = ({ videoId }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <iframe
        style={{ width: "1100px", height: "450px", marginTop: "50px" }}
        className=""
        src={`${BASE_URL}${videoId}`}
        title="video"
      />
    </div>
  );
};

export default Video;
