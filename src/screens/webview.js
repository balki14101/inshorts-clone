import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

import {WebView} from 'react-native-webview';

import {connect} from 'react-redux';

import {useSelector, useDispatch} from 'react-redux';
import Colors from '../constants/colors';
import {FONT_SIZE_EXTRA_LARGE} from '../constants/fontsize';

import {fetchSuggestedTopics} from '../reducer/news';

const home = props => {
  // const {trendingTopics} = useSelector(state => {
  //   return {trendingTopics: state.news.trendingTopics};
  // });
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchSuggestedTopics());
  // }, []);

  return <WebView source={{uri: props.route.params}} />;
};

export default home;
