import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {State} from 'react-native-gesture-handler';

import {connect} from 'react-redux';

import {useSelector, useDispatch} from 'react-redux';

import {fetchTrendingTopics} from '../reducer/news';

import LinearGradient from 'react-native-linear-gradient';

import SettingsIcon from 'react-native-vector-icons/SimpleLineIcons';
import Arrow from 'react-native-vector-icons/MaterialIcons';
import CategoriesIcon from 'react-native-vector-icons/Entypo';

import colors from '../constants/colors';
import {
  FONT_SIZE_MEDIUM,
  FONT_SIZE_NORMAL,
  FONT_SIZE_SMALL,
} from '../constants/fontsize';
import categories from '../constants/constants';

import {Height, Width} from '../constants/dimension';

import SuggestedTopicsComponent from './menucomponents/suggestedtopics';
import suggestedtopics from './menucomponents/suggestedtopics';

const home = props => {
  const {trendingTopics} = useSelector(state => {
    console.log('state of trending topics', state);
    return {trendingTopics: state.news.trendingTopics};
  });
  const dispatch = useDispatch();
  console.log('trending topics props in menu', trendingTopics);
  useEffect(() => {
    dispatch(fetchTrendingTopics());
  }, []);

  // console.log('menu props', props);
  // console.log(TrendingTopics);
  return (
    <View style={{flex: 1, padding: 12, backgroundColor: colors.WHITE}}>
      <View style={styles.headerView}>
        <Text style={{color: '#808080', fontSize: 16}}>
          {'Categories and Topics'}
        </Text>
        <View style={styles.row}>
          <SettingsIcon
            name="settings"
            size={20}
            color={colors.LIGHT_BLUE}
            style={{marginRight: 24}}
          />
          <Arrow name="arrow-forward-ios" size={20} color={colors.LIGHT_BLUE} />
        </View>
      </View>
      <ScrollView>
        <View>
          <ScrollView horizontal={true} style={{marginVertical: 32}}>
            {/* Stories */}
            {categories.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('Feed', item);
                  }}
                  style={{
                    marginHorizontal: 20,
                    alignItems: 'center',
                  }}>
                  <CategoriesIcon
                    name={item.icon}
                    size={40}
                    color={colors.LIGHT_BLUE}
                  />
                  <Text
                    style={{
                      color: colors.GREY,
                      fontSize: FONT_SIZE_SMALL,
                      marginTop: 8,
                      fontWeight: 'bold',
                    }}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
            {/* </View> */}
          </ScrollView>
        </View>
        <View style={{}}>
          <Text
            style={{
              color: colors.BLACK,
              fontSize: FONT_SIZE_MEDIUM,
              fontWeight: 'bold',
            }}>
            {'SUGGESTED TOPICS'}
          </Text>

          {/* <SuggestedTopicsComponent props={suggestedTopics} /> */}

          <View style={[styles.row, {flexWrap: 'wrap', marginVertical: 8}]}>
            {
              // !!suggestedTopics &&

              trendingTopics?.map((item, index) => {
                return (
                  <TouchableOpacity
                    style={{
                      padding: 2,
                      marginTop: 4,
                      borderRadius: 8,
                    }}
                    onPress={() => {
                      props.navigation.navigate('Feed', item);
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
                      {/* <Text>{item.tag}</Text> */}
                    </ImageBackground>
                  </TouchableOpacity>
                );
              })
            }

            <Text style={{color: colors.BLACK}}>{'Suggested topics icon'}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default home;
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  headerView: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  linearGradient: {
    flex: 1,
    // backgroundColor: 'red',
    justifyContent: 'flex-end',
    borderRadius: 4,
    borderColor: colors.LIGHT_BLUE,
    borderWidth: 1,
    borderBottomWidth: 2,

    // paddingLeft: 15,
    // paddingRight: 15,
    // borderRadius: 5,
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
