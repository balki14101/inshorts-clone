import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {useNavigation} from '@react-navigation/native';

import colors from '../../constants/colors';
import {Height, Width} from '../../constants/dimension';
import {FONT_SIZE_SMALL} from '../../constants/fontsize';

import {useSelector, useDispatch} from 'react-redux';

import {
  clearTrendingTopicFeed,
  fetchTrendingTopicsFeed,
  resetPageNumber,
} from '../../reducer/news';

const suggestedtopics = props => {
  const navigation = useNavigation();
  const suggestedtopic = [];
  suggestedtopic.push(props.props);
  const topics = suggestedtopic[0];

  const dispatch = useDispatch();

  return (
    <View style={[styles.row, {flexWrap: 'wrap', marginVertical: 8}]}>
      {topics?.map((item, index) => {
        const topic = item.tag;
        return (
          <TouchableOpacity
            key={String(index)}
            style={{
              padding: 2,
              marginTop: 4,
              borderRadius: 8,
            }}
            onPress={() => {
              dispatch(clearTrendingTopicFeed());
              dispatch(resetPageNumber());
              dispatch(fetchTrendingTopicsFeed({topic, pageNumber: 1}));

              navigation.navigate('Feed', {
                screen: 'trendingtopicsfeed',
                params: item.tag,
              });
            }}>
            <ImageBackground
              source={{uri: item.image_url}}
              style={{
                height: Height / 6,
                width: Width / 3.4,
              }}
              imageStyle={{
                borderRadius: 4,
              }}>
              <LinearGradient
                colors={['#00000000', '#00000000', '#FFFFFF']}
                style={styles.linearGradient}>
                <Text style={styles.buttonText}>{item.label}</Text>
              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default suggestedtopics;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    borderRadius: 4,
    borderColor: colors.LIGHT_BLUE,
    borderWidth: 1,
    borderBottomWidth: 2,
  },
  buttonText: {
    fontSize: FONT_SIZE_SMALL,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 4,
    color: colors.BLACK,
    backgroundColor: 'transparent',
  },
});
