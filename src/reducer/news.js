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
  async ({topic, pageNumber}) => {
    console.log(topic, pageNumber);
    const trendingTopicsFeedResponse = await apiclient.get(
      `search/trending_topics/${topic}`,
      {
        params: {
          page: pageNumber,
          type: 'CUSTOM_CATEGORY',
        },
      },
    );
    return trendingTopicsFeedResponse.data;
  },
);

const initialState = {
  selectedCategory: 'top_stories',
  showAuthorName: false,
  showImage: false,
  stories: [],
  trendingTopics: null,
  trendingTopicsFeed: [],
  pageNumber: 1,
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
    clearTrendingTopicFeed: state => {
      state.trendingTopicsFeed = [];
    },
    setShowImage: state => {
      state.showImage = !state.showImage;
    },
    setShowAuthorName: state => {
      state.showAuthorName = !state.showAuthorName;
    },
    resetPageNumber: state => {
      state.pageNumber = 1;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchStories.fulfilled, (state, action) => {
      state.stories = [...state.stories, ...action.payload.news_list];
    });

    builder.addCase(fetchTrendingTopics.fulfilled, (state, action) => {
      state.trendingTopics = [
        ...state.trendingTopicsFeed,
        ...action.payload.trending_tags,
      ];
    });
    builder.addCase(fetchTrendingTopicsFeed.fulfilled, (state, action) => {
      state.trendingTopicsFeed = [
        ...state.trendingTopicsFeed,
        ...action.payload.news_list,
      ];
      state.pageNumber = state.pageNumber + 1;
    });
  },
});

export const {
  setSelectedCategory,
  clearStories,
  setShowImage,
  setShowAuthorName,
  clearTrendingTopicFeed,
  resetPageNumber,
} = newsslice.actions;

export default newsslice.reducer;
