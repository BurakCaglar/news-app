import React from "react";

const CardNews = ({
  headline,
  image,
  title,
  description,
  footerLeftText,
  footerRightText,
  icon,
  cardClick,
  cardButtonClick,
  imageClassName,
  imageWrapperClassName,
}) => {
  return (
    <div
      onClick={cardClick}
      className="flex flex-col gap-[14px] cursor-pointer"
    >
      {headline && (
        <h6 className="text-lg font-bold text-[#052C54] truncate">
          {headline}
        </h6>
      )}
      <div className={imageWrapperClassName}>
        <img
          className={`rounded-xl max-h-100 md:max-h-52 ${imageClassName}`}
          src={image}
          alt={`${title} image`}
        />
      </div>
      {title && (
        <h6 className="text-lg font-bold text-[#052C54] overflow-hidden line-clamp-1">
          {title}
        </h6>
      )}
      {description && (
        <p className="text-[14px] text-[#7C89A0]">{description}</p>
      )}
      <div className="flex items-center justify-between">
        <div
          className="flex items-center select-none"
          onClick={cardButtonClick}
        >
          {icon}
          <span className="text-[14px] font-normal text-[#052C54] ml-1 mt-[1px]">
            {footerLeftText}
          </span>
        </div>
        <span className="text-sm font-normal text-[#7C89A0]">
          {footerRightText}
        </span>
      </div>
    </div>
  );
};

export default CardNews;
