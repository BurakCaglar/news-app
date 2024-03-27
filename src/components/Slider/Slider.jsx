import React from "react";

/* Packages */
import Carousel, { consts } from "react-elastic-carousel";

/* Style */
import "./Slider.scss";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

const myArrow = ({ type, onClick, isEdge }) => {
  const pointer = type === consts.PREV ? <div>&#60;</div> : <div>&#62;</div>;
  return (
    <div
      className="flex items-center mb-10 cursor-pointer"
      onClick={onClick}
      disabled={isEdge}
    >
      {pointer}
    </div>
  );
};

const Slider = ({ children }) => {
  return (
    <>
      <div className="carousel-wrapper">
        <Carousel
          showArrows={false}
          renderArrow={myArrow}
          autoPlaySpeed={5000}
          breakPoints={breakPoints}
          enableAutoPlay
        >
          {children}
        </Carousel>
      </div>
    </>
  );
};

export default Slider;
