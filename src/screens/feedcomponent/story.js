import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import colors from '../../constants/colors';
import {Height, Width} from '../../constants/dimension';
import {
  FONT_SIZE_SMALL,
  FONT_SIZE_NORMAL,
  FONT_SIZE_LARGE,
} from '../../constants/fontsize';

const story = props => {
  const [showAuthorName, setshowAuthorName] = useState(false);

  const navigaion = useNavigation();

  const {data, index} = props;

  return (
    <View
      style={
        styles.container
        // index % 2 == 0 ? { backgroundColor: 'green' } : null,
        // {backgroundColor: index % 2 == 0 ? 'green' : 'red'},
      }>
      <Image
        source={{uri: data.image_url}}
        style={{height: Height / 3, width: Width}}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View style={styles.contentView}>
          <Text style={styles.titleText}>{data.title}</Text>
          <Text style={styles.descriptionText}>{data.content}</Text>
          {showAuthorName ? (
            <Text
              onPress={() => {
                navigaion.navigate('WebView', data.source_url);
                setshowAuthorName(!showAuthorName);
              }}
              style={styles.sourceNameText}>
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
                navigaion.navigate('WebView', data.source_url);
                setshowAuthorName(!showAuthorName);
              }}
              style={styles.authorNameText}>
              {`shot by ${data.author_name}`}
            </Text>
          )}
        </View>

        <ImageBackground
          source={{uri: data.image_url}}
          style={{width: Width, height: Height / 14}}
          blurRadius={16}>
          <View style={styles.bottomView}>
            <Text style={styles.bottomHeadline}>{data.bottom_headline}</Text>
            <Text style={styles.bottomText}>{data.bottom_text}</Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default React.memo(story);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  contentView: {
    padding: 12,
  },
  titleText: {color: colors.BLACK, fontSize: FONT_SIZE_LARGE},
  descriptionText: {
    // color: '#909090',
    color: colors.GREY,
    fontSize: FONT_SIZE_LARGE,
    fontWeight: '300',
    marginTop: 8,
    lineHeight: 26,
  },
  sourceNameText: {
    color: '#909090',
    fontSize: FONT_SIZE_NORMAL,
    fontWeight: '400',
    marginTop: 8,
    lineHeight: 26,
  },

  authorNameText: {
    color: '#909090',
    fontSize: FONT_SIZE_NORMAL,
    fontWeight: '400',
    marginTop: 8,
    lineHeight: 26,
  },
  bottomView: {
    flex: 1,
    backgroundColor: colors.BLACK_VARIENT1,
    paddingLeft: 16,
    justifyContent: 'center',
  },
  bottomHeadline: {
    color: colors.WHITE,
    fontSize: FONT_SIZE_NORMAL,
    fontWeight: 'bold',
  },
  bottomText: {color: colors.WHITE, fontSize: FONT_SIZE_SMALL},
});
