import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import apiclient from '../apiclient';

export const fetchStories = createAsyncThunk(
  'fetchStories',
  async ({selectedCategory, news_offset, reset}) => {
    const storiesResponse = await apiclient.get(`news`, {
      params: {
        category: selectedCategory,
        news_offset: news_offset,
        max_limit: 10,
        include_card_data: true,
      },
    });
    return storiesResponse.data;
  },
);

export const fetchTrendingTopics = createAsyncThunk(
  'fetchTrendingTopics',
  async (userId, thunkAPI) => {
    const trendingTopicsResponse = await apiclient.get(
      'search/trending_topics',
    );
    return trendingTopicsResponse.data;
  },
);
export const fetchTrendingTopicsFeed = createAsyncThunk(
  'fetchTrendingTopicsFeed',
  async (userId, thunkAPI) => {
    const trendingTopicsFeedResponse = await apiclient.get(
      'search/trending_topics/T20_World_Cup?page=1&type=CUSTOM_CATEGORY',
    );
    return trendingTopicsFeedResponse;
  },
);

const initialState = {
  selectedCategory: 'top_stories',
  stories: [],
  trendingTopics: null,
  trendingTopicsFeed: null,
};

export const newsslice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    clearStories: state => {
      state.stories = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchStories.fulfilled, (state, action) => {
      state.stories = [...state.stories, ...action.payload.news_list];
    });

    builder.addCase(fetchTrendingTopics.fulfilled, (state, action) => {
      state.trendingTopics = action.payload.trending_tags;
    });
    builder.addCase(fetchTrendingTopicsFeed.fulfilled, (state, action) => {
      state.trendingTopicsFeed = action.payload.data.news_list;
    });
  },
});

export const {setSelectedCategory, clearStories} = newsslice.actions;

export default newsslice.reducer;
