import React, { useEffect, useState } from "react";

/* Store */
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

/* Helpers */
import { formatDateToHoursAndMinutes } from "../../utils/helpers";
import { showToast } from "../../utils/index";

/* Store */
import {
  addToMyFavorites,
  removeFromMyFavorites,
} from "../../store/news/newsSlice.js";

/* Components */
import Slider from "../../components/Slider/Slider";
import { fetchNews } from "../../store/news/newsActions.js";
import Button from "../../components/button/button";
import CardNews from "../../components/CardNews/CardNews";

/* Style */
import { ReactComponent as PlusIcon } from "../../assets/plus.svg";
import { ReactComponent as RemoveIcon } from "../../assets/remove.svg";
import Loader from "../../components/Loader/Loader";

const News = () => {
  const [isOpenReadList, setIsOpenReadList] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sourceName } = useParams();
  const {
    news: {
      loading,
      error,
      data: { articles },
    },
    sources: { categories },
  } = useSelector((state) => state.news);

  useEffect(() => {
    if (sourceName) {
      dispatch(fetchNews({ sourceName }));

      const interval = setInterval(() => {
        dispatch(fetchNews({ sourceName }));
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [sourceName]);

  function handleCardClick(article) {
    navigate(
      `/news/${sourceName}/${article.title.toLowerCase().replaceAll(" ", "-")}`
    );
  }
  function handleCardButtonClick(event, article) {
    event.stopPropagation();
    if (article.favorite) {
      showToast("Article has been deleted from my read list");
      return dispatch(
        removeFromMyFavorites({ id: article.title, isOnlyOneArticle: false })
      );
    }
    showToast("Article has been added to my read list");

    return dispatch(
      addToMyFavorites({ id: article.title, isOnlyOneArticle: false })
    );
  }
  function goBack() {
    navigate(-1);
  }
  function toggleReadList() {
    setIsOpenReadList(!isOpenReadList);
  }
  const renderFooterIcon = (favorite) =>
    favorite ? <RemoveIcon /> : <PlusIcon />;
  const renderFooterLeftText = (favorite) =>
    favorite ? "Remove from list" : "Add my read list";

  const renderNotFoundReadList = isOpenReadList &&
    !articles.some((article) => article.favorite === true) && (
      <div>There is no article that you added to your read list.</div>
    );

  const renderArticles = articles?.map((article, index) => {
    if (isOpenReadList && !article.favorite) {
      return;
    }

    return (
      <div key={index} className="col-span-12 md:col-span-6 lg:col-span-3">
        <CardNews
          image={article.urlToImage}
          title={article.author}
          icon={renderFooterIcon(article.favorite)}
          footerLeftText={renderFooterLeftText(article.favorite)}
          footerRightText={formatDateToHoursAndMinutes(article.publishedAt)}
          cardClick={() => handleCardClick(article)}
          cardButtonClick={(event) => handleCardButtonClick(event, article)}
          imageClassName="w-full"
        />
      </div>
    );
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="w-full bg-[#F4F7FF]">
        <Toaster />
        <div className="w-full max-w-6xl px-4 md:px-6 py-8 mx-auto">
          <Slider>
            {articles?.map((article, index) => (
              <CardNews
                key={index}
                image={article.urlToImage}
                title={article.author}
                description={`${article.content.slice(0, 100)}...`}
                icon={renderFooterIcon(article.favorite)}
                footerLeftText={renderFooterLeftText(article.favorite)}
                footerRightText={formatDateToHoursAndMinutes(
                  article.publishedAt
                )}
                cardClick={() => handleCardClick(article)}
                cardButtonClick={(event) =>
                  handleCardButtonClick(event, article)
                }
                imageWrapperClassName="!flex !justify-center max-w-100 max-h-[200px]"
                imageClassName="!flex !justify-center !w-full !max-h-full"
              />
            ))}
          </Slider>
        </div>
      </div>
      <div className="w-full max-w-6xl px-4 md:px-6 py-8 mx-auto flex flex-col gap-[44px]">
        <div className="flex justify-between items-center flex-wrap">
          <div className="capitalize text-black text-[22px] font-bold truncate">
            {categories
              ?.filter(({ selected }) => selected)
              .map(({ category }) => category)
              .join(" + ") || "All Categories"}
          </div>
          <div className="sm:flex sm:gap-4 sm:flex-wrap max-[768px]:!w-full max-[768px]:!mt-4">
            <Button
              label="< Go to News"
              className="!py-2 !px-2 max-[768px]:!py-4 !text-xs !font-semibold max-[768px]:!w-full max-[768px]:!mt-2"
              type="secondary"
              onClick={goBack}
            />
            <Button
              label={isOpenReadList ? "Show News" : "Show Read List"}
              className="!py-2 !px-2 max-[768px]:!py-4 !text-xs !font-semibold max-[768px]:!w-full max-[768px]:!mt-2"
              type="secondary"
              onClick={toggleReadList}
            />
          </div>
        </div>

        {renderNotFoundReadList}

        <div className="grid grid-cols-12 md:gap-x-[66px] gap-y-[44px]">
          {renderArticles}
        </div>
      </div>
    </>
  );
};

export default News;
