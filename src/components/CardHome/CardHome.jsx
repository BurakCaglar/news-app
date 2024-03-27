import React from "react";

/* Style */
import { ReactComponent as ArrowIcon } from "../../assets/arrow.svg";

const CardHome = ({ title, description, onClick }) => {
  return (
    <div onClick={onClick} className="flex flex-col gap-2.5">
      <h6 className="text-lg font-bold text-[#5325EA] cursor-pointer">
        {title}
      </h6>
      <div className="flex items-center justify-between">
        <p className="text-[#7C89A0] text-xs font-medium">{description}</p>
        <span className="ml-4 cursor-pointer">
          <ArrowIcon />
        </span>
      </div>
    </div>
  );
};

export default CardHome;
