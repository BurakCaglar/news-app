import { createSlice } from "@reduxjs/toolkit";
import { fetchSources, fetchNews } from "./newsActions";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  sources: {
    loading: false,
    error: null,
    categories: [],
    data: [],
  },
  news: {
    loading: false,
    error: null,
    data: [],
    selectedArticle: {},
  },
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    addToMyFavorites(state, action) {
      const selectedFavoriteIndex = state?.news?.data?.articles?.findIndex(
        (article) => article.title === action.payload.id
      );
      state.news.data.articles[selectedFavoriteIndex].favorite = true;

      if (action.payload.isOnlyOneArticle) {
        state.news.selectedArticle.favorite = true;
      }
    },
    removeFromMyFavorites(state, action) {
      const selectedFavoriteIndex = state.news.data.articles.findIndex(
        (article) => article.title === action.payload.id
      );
      state.news.data.articles[selectedFavoriteIndex].favorite = false;

      if (action.payload.isOnlyOneArticle) {
        state.news.selectedArticle.favorite = false;
      }
    },
    selectCategory(state, action) {
      const selectedCategoryIndex = state.sources.categories.findIndex(
        (category) => category.id === action.payload
      );
      state.sources.categories[selectedCategoryIndex].selected =
        !state.sources.categories[selectedCategoryIndex].selected;
    },
    resetSelectedCategories(state, action) {
      const updatedCategories = state.sources.categories.map((category) => {
        return { ...category, selected: false };
      });
      state.sources.categories = updatedCategories;
    },
    selectArticle(state, action) {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSources.pending, (state) => {
        state.sources.loading = true;
        state.sources.error = null;
      })
      .addCase(fetchSources.fulfilled, (state, action) => {
        const uniqueCategories = new Set(
          action.payload.map(({ category }) => category)
        );
        const categories = Array.from(uniqueCategories).map((category) => ({
          category,
          selected: false,
          id: uuidv4(),
        }));
        state.sources.loading = false;
        state.sources.data = action.payload;
        state.sources.categories = categories;
      })
      .addCase(fetchSources.rejected, (state, action) => {
        state.sources.loading = false;
        state.sources.error = action.payload?.error;
      })
      .addCase(fetchNews.pending, (state) => {
        state.news.loading = true;
        state.news.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        if (state.news.data.totalResults !== action.payload.totalResults) {
          const IS_ONLY_ONE = 1;
          const dataWithIDs = {
            ...action.payload,
            articles: action.payload.articles.map((article) => {
              return { ...article, id: uuidv4() };
            }),
          };

          if (action.payload.pageSize !== IS_ONLY_ONE) {
            state.news.data = dataWithIDs;
          } else {
            state.news.selectedArticle = dataWithIDs.articles[0];
          }
        }

        state.news.loading = false;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.news.loading = false;
        state.news.error = action.payload?.error;
      });
  },
});

export const {
  addToMyFavorites,
  removeFromMyFavorites,
  selectCategory,
  resetSelectedCategories,
  selectArticle,
} = newsSlice.actions;

export default newsSlice.reducer;
