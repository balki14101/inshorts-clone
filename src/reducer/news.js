import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import apiclient from '../apiclient';

export const fetchCategoryTopics = createAsyncThunk(
  'fetchCategoryTopics',
  async (userId, thunkAPI) => {
    const categoryTopicsResponse = await apiclient.get(
      'news?category=top_stories&max_limit=10&include_card_data=true',
    );
    console.log('categoryTopicsResponse', categoryTopicsResponse);
    return categoryTopicsResponse.data;
  },
);

export const fetchSuggestedTopics = createAsyncThunk(
  'fetchSuggestedTopics',
  async (userId, thunkAPI) => {
    const suggestedTopicsResponse = await apiclient.get(
      'search/trending_topics',
    );
    console.log(suggestedTopicsResponse);
    return suggestedTopicsResponse.data;
  },
);

const initialState = {
  // trendingTopics: [],
  suggestedTopics: [],
  categoryTopics: [],
};

export const newsslice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCategoryTopics.fulfilled, (state, action) => {
      console.log(' category topics action', action);
      state.categoryTopics = action.payload.news_list;
    });
  },
  extraReducers: builder => {
    builder.addCase(fetchSuggestedTopics.fulfilled, (state, action) => {
      console.log(action);
      state.suggestedTopics = action.payload.trending_tags;
    });
  },
});

export default newsslice.reducer;
