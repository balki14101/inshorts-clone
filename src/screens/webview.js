import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {State} from 'react-native-gesture-handler';

import {connect} from 'react-redux';

import {useSelector, useDispatch} from 'react-redux';

import {fetchSuggestedTopics} from '../reducer/news';

const home = props => {
  const {trendingTopics} = useSelector(state => {
    return {trendingTopics: state.news.trendingTopics};
  });
  const dispatch = useDispatch();
  // console.log(trendingTopics);
  useEffect(() => {
    dispatch(fetchSuggestedTopics());
  }, []);

  // console.log(props);
  // console.log(TrendingTopics);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: '#000000'}}>{'This is webview screen'}</Text>
    </View>
  );
};

export default home;
