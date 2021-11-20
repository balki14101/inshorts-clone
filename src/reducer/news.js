import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import apiclient from '../apiclient';

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
    builder.addCase(fetchSuggestedTopics.fulfilled, (state, action) => {
      console.log(action);
      state.suggestedTopics = action.payload.trending_tags;
    });
  },
});

export default newsslice.reducer;
