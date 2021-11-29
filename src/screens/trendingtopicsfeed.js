import React, {useEffect} from 'react';
import {View, Text, Dimensions} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';

import {fetchTrendingTopicsFeed} from '../reducer/news';

import Carousel from 'react-native-snap-carousel';

import {Height, Width, carouselHeight} from '../constants/dimension';

const trendingtopicsfeed = props => {
  //   console.log('trendingtopicsfeeds props', props);
  const topic = props.route.params;
  const {trendingTopicsFeed} = useSelector(state => {
    return {trendingTopicsFeed: state.news.trendingTopicsFeed};
  });

  const dispatch = useDispatch();

  //   useEffect(() => {
  //     dispatch(fetchTrendingTopicsFeed(topic));
  //   }, []);

  const onEndReached = () => {
    alert('this is the end');
  };

  const renderTrendingTopicItem = item => {
    return (
      <View style={{backgroundColor: 'red', flex: 1}}>
        <Text style={{color: '#000000'}}>{item.item.news_obj.title}</Text>
      </View>
    );
  };
  return (
    <View>
      {/* <Text style={{color: '#000000'}}>{topic}</Text>
      {trendingTopicsFeed.map((item, index) => {
        return <Text style={{color: '#000000'}}>{item.news_obj.title}</Text>;
      })} */}
      <Carousel
        data={trendingTopicsFeed}
        renderItem={renderTrendingTopicItem}
        sliderWidth={Width}
        itemWidth={Width}
        sliderHeight={carouselHeight}
        itemHeight={carouselHeight}
        vertical={true}
        onEndReached={onEndReached}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        windowSize={5}
      />
    </View>
  );
};

export default trendingtopicsfeed;
