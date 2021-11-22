import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {State} from 'react-native-gesture-handler';

import Carousel from 'react-native-snap-carousel';

import {connect} from 'react-redux';

import {useSelector, useDispatch} from 'react-redux';
import colors from '../constants/colors';
import {Height, Width} from '../constants/dimension';
import {
  FONT_SIZE_LARGE,
  FONT_SIZE_MEDIUM,
  FONT_SIZE_NORMAL,
} from '../constants/fontsize';

import {
  fetchStories,
  fetchSuggestedTopics,
  fetchTrendingTopicsFeed,
} from '../reducer/news';

const home = props => {
  // const {trendingTopics} = useSelector(state => {
  //   return {trendingTopics: state.news.suggestedTopics};
  // });

  const [showAuthorName, setshowAuthorName] = useState(false);
  var category = null;

  console.log('feeds screens props', props);
  if (props.route.params) {
    category = props.route.params.category;
    console.log('If statementn occurs', category);
  } else {
    console.log('else statementn occurs');
    category = 'top_stories';
  }

  //state
  const {stories} = useSelector(state => {
    console.log('stories', state);
    return {stories: state.news.stories};
  });
  // console.log(categoryfeeds);
  // var {showAuthorName} = useSelector(state => {
  //   console.log('stories', state);
  //   return {showAuthorName: state.news.showAuthorName};
  // });

  const trendingTopicsFeed = useSelector(state => {
    console.log('state of trendingTopicsFeed', state.news.trendingTopicsFeed);
    return state.news.trendingTopicsFeed;
  });

  const dispatch = useDispatch();
  // console.log('trending topics state', trendingTopics);

  useEffect(() => {
    dispatch(fetchStories(category));
    // dispatch(fetchTrendingTopicsFeed());
  }, []);

  const renderItem = item => {
    const data = item.item.news_obj;

    return (
      <View style={styles.container}>
        <Image
          source={{uri: data.image_url}}
          style={{height: Height / 2.6, width: Width}}
        />
        <View style={styles.contentView}>
          <Text style={{color: colors.BLACK, fontSize: FONT_SIZE_LARGE}}>
            {data.title}
          </Text>
          <Text
            style={{
              // color: '#909090',
              color: colors.GREY,
              fontSize: FONT_SIZE_LARGE,
              fontWeight: '300',
              marginTop: 8,
              lineHeight: 26,
            }}>
            {data.content}
          </Text>
          {showAuthorName ? (
            <Text
              onPress={() => {
                props.navigation.navigate('WebView', data.source_url);
                setshowAuthorName(!showAuthorName);
              }}
              style={{
                color: '#909090',
                fontSize: FONT_SIZE_NORMAL,
                fontWeight: '400',
                marginTop: 8,
                lineHeight: 26,
              }}>
              {`tap for more at `}
              <Text
                style={{
                  color: colors.LIGHT_BLUE,
                  fontWeight: '500',
                }}>
                {data.source_name}
              </Text>
              {' / today'}
            </Text>
          ) : (
            <Text
              onPress={() => {
                props.navigation.navigate('WebView', data.source_url);
                setshowAuthorName(!showAuthorName);
              }}
              style={{
                color: '#909090',
                fontSize: FONT_SIZE_NORMAL,
                fontWeight: '400',
                marginTop: 8,
                lineHeight: 26,
              }}>
              {`shot by ${data.author_name}`}
            </Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <View
    // style={{ justifyContent: 'center' }}
    >
      {/* <Text style={{color: '#000000'}}>{'This is feed screen'}</Text> */}
      <Carousel
        data={stories}
        renderItem={renderItem}
        sliderWidth={Width}
        itemWidth={Width}
        sliderHeight={Height}
        itemHeight={Height}
        vertical={true}
        activeSlideOffset={10}
      />
    </View>
  );
};

export default home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  contentView: {
    padding: 12,
  },
});
