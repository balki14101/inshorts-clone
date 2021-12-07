import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

import Story from './feedcomponent/story';

import Carousel from 'react-native-snap-carousel';

import {useSelector, useDispatch} from 'react-redux';
import {Width, carouselHeight} from '../constants/dimension';

import {fetchStories} from '../reducer/news';

const home = props => {
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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStories({selectedCategory}));
  }, []);

  const onEndReached = () => {
    dispatch(fetchStories({selectedCategory, news_offset}));
  };

  const renderItem = item => {
    const data = item.item.news_obj;

    // return null;
    return <Story key={String(item.index)} data={data} index={item.index} />;
  };

  return (
    <View>
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
