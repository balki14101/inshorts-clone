import {configureStore} from '@reduxjs/toolkit';
import NewsReducer from './reducer/news';

export default store = configureStore({
  reducer: {
    news: NewsReducer,
  },
});
