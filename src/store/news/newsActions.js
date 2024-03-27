import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = "dabadb1386d24b1d9000ee2e4af989f0";

export const fetchSources = createAsyncThunk(
  "news/fetchSources",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines/sources`,
        {
          params: {
            language: "en",
            apiKey,
          },
        }
      );
      return response.data.sources;
    } catch (error) {
      return rejectWithValue({
        error: error.response?.data?.message || error.message,
      });
    }
  }
);

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async ({ sourceName, searchKey, pageSize }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
        params: {
          sources: sourceName,
          apiKey,
          q: searchKey,
          pageSize,
        },
      });

      const mutatedResponse = { ...response.data, pageSize };

      return mutatedResponse;
    } catch (error) {
      return rejectWithValue({
        error: error.response?.data?.message || error.message,
      });
    }
  }
);
