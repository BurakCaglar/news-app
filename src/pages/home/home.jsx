import React, { useEffect, useState } from "react";

/* Packages */
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/* Store */
import {
  selectCategory,
  resetSelectedCategories,
} from "../../store/news/newsSlice.js";
import { fetchSources } from "../../store/news/newsActions.js";

/* Components */
import Button from "../../components/button/button";
import CardHome from "../../components/CardHome/CardHome";

/* Style */
import { ReactComponent as TickIcon } from "../../assets/tick.svg";
import { ReactComponent as PlusIcon } from "../../assets/plus.svg";
import Loader from "../../components/Loader/Loader";
import "./home.scss";

const Home = () => {
  const [maxCount, setMaxCount] = useState(10);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    sources: { loading, error, categories, data },
  } = useSelector((state) => state.news);
  useEffect(() => {
    dispatch(fetchSources());
  }, []);

  function handleCardClick(sourceName) {
    navigate(`/news/${sourceName}`);
  }
  function handleSeeMore() {
    setMaxCount(maxCount + 10);
  }
  function handleSelectCategory(item) {
    dispatch(selectCategory(item.id));
  }
  const renderFooterIcon = (selected) =>
    selected ? (
      <TickIcon />
    ) : (
      <div className="plusIcon mr-[-1px]">
        <PlusIcon />
      </div>
    );
  function resetCategory() {
    dispatch(resetSelectedCategories());
  }

  const hasSelectedCategories = categories?.some(
    (category) => category.selected
  );
  const filteredData = hasSelectedCategories
    ? data?.filter((item) =>
        categories.some(
          (category) => category.selected && category.category === item.category
        )
      )
    : data;

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full flex max-w-6xl px-4 md:px-6 py-8 mx-auto flex-col">
      <div className="w-full flex max-w-6xl space-x-2.5 overflow-scroll pb-3">
        <Button
          label="News"
          className="!bg-[#F4F7FF] !basis-0 !border-transparent !:text-[#052C54]"
          onClick={resetCategory}
        />
        {categories?.map((item, index) => (
          <Button
            key={index}
            label={item.category}
            icon={renderFooterIcon(item.selected)}
            onClick={() => handleSelectCategory(item)}
            isActive={item.selected}
            className="max-[768px]:!basis-0"
          />
        ))}
      </div>

      <hr className="mt-6 mb-4" />

      <div className="md:px-4">
        {filteredData
          ?.slice(0, maxCount)
          .map(({ name, description, id, category }, index) => (
            <div
              key={index}
              className="[&:not(:last-child)]:border-b border-dashed py-6 border-[#DBE5FF]"
            >
              <CardHome
                title={name}
                description={description}
                onClick={() => handleCardClick(id)}
              />
            </div>
          ))}
      </div>

      <Button
        label="Show More"
        className="!basis-0 mx-auto max-[768px]:!w-full"
        onClick={handleSeeMore}
      />
    </div>
  );
};
export { Home };
