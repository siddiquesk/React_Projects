import React from "react";
import ShowSlider from "./ShowSlider";
function ImageSlider() {
  return (
    <>
      <ShowSlider
        url={"https://picsum.photos/v2/list"}
        limit={"10"}
        page={"1"}
      />
    </>
  );
}

export default ImageSlider;
