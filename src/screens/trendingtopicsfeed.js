import React from 'react';
import {View} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';

import {fetchTrendingTopicsFeed} from '../reducer/news';

import Carousel from 'react-native-snap-carousel';

import {Width, carouselHeight} from '../constants/dimension';

import Story from './feedcomponent/story';

const trendingtopicsfeed = props => {
  const topic = props.route.params;
  const {trendingTopicsFeed, pageNumber} = useSelector(state => {
    return {
      trendingTopicsFeed: state.news.trendingTopicsFeed,
      pageNumber: state.news.pageNumber,
    };
  });

  const dispatch = useDispatch();

  const onEndReached = () => {
    dispatch(fetchTrendingTopicsFeed({topic, pageNumber}));
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
