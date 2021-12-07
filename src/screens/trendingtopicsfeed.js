import React, {useEffect} from 'react';
import {View, Text, Dimensions} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';

import {fetchTrendingTopicsFeed} from '../reducer/news';

import Carousel from 'react-native-snap-carousel';

import {Height, Width, carouselHeight} from '../constants/dimension';
import Story from './feedcomponent/story';
import colors from '../constants/colors';

const trendingtopicsfeed = props => {
  // console.log('trendingtopicsfeeds props', props);
  const topic = props.route.params;
  const {trendingTopicsFeed} = useSelector(state => {
    return {trendingTopicsFeed: state.news.trendingTopicsFeed};
  });

  // if (trendingTopicsFeed && trendingTopicsFeed.length > 0) {
  //   news_offset = stories[stories.length - 1].hash_id;
  // }

  const dispatch = useDispatch();

  const onEndReached = () => {
    alert('this is the end');
    dispatch(fetchTrendingTopicsFeed({topic}));
  };

  const renderTrendingTopicItem = item => {
    const data = item.item.news_obj;
    return <Story key={String(item.index)} data={data} index={item.index} />;
  };
  return (
    <View>
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
