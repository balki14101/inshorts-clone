import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Alert,
} from 'react-native';
import {State} from 'react-native-gesture-handler';

import Story from './feedcomponent/story';
import LinearGradient from 'react-native-linear-gradient';

import Carousel from 'react-native-snap-carousel';

import {connect} from 'react-redux';

import {useSelector, useDispatch} from 'react-redux';
import colors from '../constants/colors';
import {Height, Width, carouselHeight} from '../constants/dimension';

import {
  FONT_SIZE_LARGE,
  FONT_SIZE_MEDIUM,
  FONT_SIZE_NORMAL,
  FONT_SIZE_SMALL,
} from '../constants/fontsize';

import {
  fetchStories,
  setSelectedCategory,
  fetchSuggestedTopics,
  fetchTrendingTopicsFeed,
  setShowAuthorName,
} from '../reducer/news';

const home = props => {
  // const {trendingTopics} = useSelector(state => {
  //   return {trendingTopics: state.news.suggestedTopics};
  // });
  const sliderHeight = Dimensions.get('window').height;
  const itemHeight = Dimensions.get('window').height;

  var news_offset = null;

  //state
  const {stories, selectedCategory} = useSelector(state => {
    return {
      stories: state.news.stories,
      selectedCategory: state.news.selectedCategory,
    };
  });

  if (stories && stories.length > 0) {
    news_offset = stories[stories.length - 1].hash_id;
  }

  const trendingTopicsFeed = useSelector(state => {
    return state.news.trendingTopicsFeed;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStories({selectedCategory}));
  }, []);

  const onEndReached = () => {
    alert('onendreached props');
    dispatch(fetchStories({selectedCategory, news_offset}));

    // var offset = props[props.length - 1].hash_id
    // var offSet = props[]
    // return offSet;
  };

  const renderItem = item => {
    const data = item.item.news_obj;

    // return null;
    return <Story key={String(item.index)} data={data} index={item.index} />;
  };

  return (
    <View
    // style={{ justifyContent: 'center' }}
    >
      <Carousel
        data={stories}
        renderItem={renderItem}
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

export default home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentView: {
    padding: 12,
  },
});
