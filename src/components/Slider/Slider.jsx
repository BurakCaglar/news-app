import React, { useState } from "react";

/* Packages */
import ReactDOM from "react-dom";
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
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

  const addItem = () => {
    const nextItem = Math.max(1, items.length + 1);
    setItems([...items, nextItem]);
  };

  const removeItem = () => {
    const endRange = Math.max(0, items.length - 1);
    setItems(items.slice(0, endRange));
  };

  return (
    <>
      <div className="carousel-wrapper">
        <Carousel
          showArrows={false}
          renderArrow={myArrow}
          autoPlaySpeed={5000}
          breakPoints={breakPoints}
        >
          {children}
        </Carousel>
      </div>
    </>
  );
};

export default Slider;
