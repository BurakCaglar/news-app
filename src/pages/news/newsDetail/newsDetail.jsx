import React, { useEffect } from "react";

/* Packages */
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

/* Components */
import CardNews from "../../../components/CardNews/CardNews";

/* Helpers */
import { formatDateToHoursAndMinutes } from "../../../utils/helpers";
import { showToast } from "../../../utils/index";

/* Store */
import {
  addToMyFavorites,
  removeFromMyFavorites,
} from "../../../store/news/newsSlice.js";
import { fetchNews } from "../../../store/news/newsActions.js";

/* Style */
import { ReactComponent as PlusIcon } from "../../../assets/plus.svg";
import { ReactComponent as RemoveIcon } from "../../../assets/remove.svg";
import Button from "../../../components/button/button";
import Loader from "../../../components/Loader/Loader";

const NewsDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sourceTitle } = useParams();
  const {
    news: { loading, selectedArticle },
  } = useSelector((state) => state.news);

  useEffect(() => {
    if (sourceTitle) {
      const unParsedTitle = sourceTitle.replaceAll("-", " ");
      dispatch(fetchNews({ searchKey: unParsedTitle, pageSize: 1 }));
    }
  }, [sourceTitle]);

  function goBack() {
    navigate(-1);
  }

  function handleCardButtonClick(article) {
    if (article?.favorite) {
      showToast("Article has been deleted from my read list");
      return dispatch(
        removeFromMyFavorites({ id: article.title, isOnlyOneArticle: true })
      );
    }
    showToast("Article has been added to my read list");
    return dispatch(
      addToMyFavorites({ id: article.title, isOnlyOneArticle: true })
    );
  }

  const renderFooterIcon = (favorite) =>
    favorite ? <RemoveIcon /> : <PlusIcon />;
  const renderFooterLeftText = (favorite) =>
    favorite ? "Remove from list" : "Add my read list";

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full flex max-w-3xl px-4 md:px-6 py-8 mx-auto flex-col gap-11">
      <div className=" flex-col">
        <CardNews
          headline={selectedArticle.title}
          image={selectedArticle.urlToImage}
          description={selectedArticle.content}
          icon={renderFooterIcon(selectedArticle?.favorite)}
          footerLeftText={renderFooterLeftText(selectedArticle?.favorite)}
          footerRightText={formatDateToHoursAndMinutes(
            selectedArticle.publishedAt
          )}
          cardButtonClick={() => handleCardButtonClick(selectedArticle)}
          imageClassName="!max-h-full"
        />
      </div>
      <Button
        label="< Go to Back"
        className="!w-max !basis-0"
        type="secondary"
        onClick={goBack}
      />
      <Toaster />
    </div>
  );
};

export default NewsDetail;
