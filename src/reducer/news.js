import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import apiclient from '../apiclient';

export const fetchStories = createAsyncThunk(
  'fetchStories',
  async (userId, thunkAPI) => {
    console.log('userID', userId);
    const storiesResponse = await apiclient.get(
      `news?category=${userId}&max_limit=10&include_card_data=true`,
    );
    console.log('storiesResponse', storiesResponse);
    return storiesResponse.data;
  },
);

export const fetchTrendingTopics = createAsyncThunk(
  'fetchTrendingTopics',
  async (userId, thunkAPI) => {
    const trendingTopicsResponse = await apiclient.get(
      'search/trending_topics',
    );
    console.log('trendingTopicsResponse', trendingTopicsResponse);
    return trendingTopicsResponse.data;
  },
);
export const fetchTrendingTopicsFeed = createAsyncThunk(
  'fetchTrendingTopicsFeed',
  async (userId, thunkAPI) => {
    const trendingTopicsFeedResponse = await apiclient.get(
      'search/trending_topics/T20_World_Cup?page=1&type=CUSTOM_CATEGORY',
    );
    console.log('trendingTopicsFeedResponse,', trendingTopicsFeedResponse);
    return trendingTopicsFeedResponse;
  },
);

const initialState = {
  // trendingTopics: [],
  stories: null,
  trendingTopics: null,
  trendingTopicsFeed: null,
  // showAuthorName: false,
};

export const newsslice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchStories.fulfilled, (state, action) => {
      console.log(' category topics action', action);
      state.stories = action.payload.news_list;
    });

    builder.addCase(fetchTrendingTopics.fulfilled, (state, action) => {
      console.log(action);
      state.trendingTopics = action.payload.trending_tags;
    });
    builder.addCase(fetchTrendingTopicsFeed.fulfilled, (state, action) => {
      console.log(action);
      state.trendingTopicsFeed = action.payload.data.news_list;
    });
  },
});

export default newsslice.reducer;
