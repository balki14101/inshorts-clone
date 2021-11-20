import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {State} from 'react-native-gesture-handler';

import {connect} from 'react-redux';

import {useSelector, useDispatch} from 'react-redux';

import {fetchCategoryTopics, fetchSuggestedTopics} from '../reducer/news';

const home = props => {
  // const {trendingTopics} = useSelector(state => {
  //   return {trendingTopics: state.news.suggestedTopics};
  // });

  const {categoryfeeds} = useSelector(state => {
    console.log('categoryfeeds', state);
    return {categoryfeeds: state.news.categoryTopics};
  });
  console.log(categoryfeeds);

  const dispatch = useDispatch();
  // console.log('trending topics state', trendingTopics);
  useEffect(() => {
    // dispatch(fetchSuggestedTopics());
    dispatch(fetchCategoryTopics());
  }, []);

  // console.log(props);
  // console.log(TrendingTopics);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: '#000000'}}>{'This is feed screen'}</Text>
      {/* {trendingTopics.map((item, index) => {
        return <Text>{item.label}</Text>;
      })} */}
    </View>
  );
};

export default home;
