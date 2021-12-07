import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Modal,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import colors from '../../constants/colors';
import {Height, Width} from '../../constants/dimension';
import {
  FONT_SIZE_SMALL,
  FONT_SIZE_NORMAL,
  FONT_SIZE_LARGE,
  FONT_SIZE_MEDIUM,
} from '../../constants/fontsize';
import {useSelector, useDispatch} from 'react-redux';

import {setShowImage, setShowAuthorName} from '../../reducer/news';

const story = props => {
  // const [showAuthorName, setshowAuthorName] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const navigaion = useNavigation();

  const {data, index} = props;

  const {showImage, showAuthorName} = useSelector(state => {
    return {
      showImage: state.news.showImage,
      showAuthorName: state.news.showAuthorName,
    };
  });

  const dispatch = useDispatch();

  console.log('image show', showImage);

  return (
    <View style={styles.container}>
      <Modal
        animationType="none"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <Image
            source={{uri: data.image_url}}
            style={{height: Height, width: Width}}
            resizeMode="contain"
          />
        </View>
      </Modal>

      <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={1}>
        <Image
          source={{uri: data.image_url}}
          style={{height: Height / 3, width: Width}}
        />
      </TouchableOpacity>
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
                // setshowAuthorName(!showAuthorName);
                dispatch(setShowAuthorName());
              }}
              style={styles.authorNameText}>
              {`shot by ${data.author_name}`}
            </Text>
          ) : (
            <Text
              onPress={() => {
                navigaion.navigate('WebView', data.source_url);
                // setshowAuthorName(!showAuthorName);
                dispatch(setShowAuthorName());
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
          )}
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigaion.navigate('WebView', data.source_url);
          }}>
          <ImageBackground
            source={{uri: data.image_url}}
            style={{width: Width, height: Height / 14}}
            blurRadius={16}>
            <View style={styles.bottomView}>
              <Text style={styles.bottomHeadline}>{data.bottom_headline}</Text>
              <Text style={styles.bottomText}>{data.bottom_text}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default story;

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
    color: colors.GREY,
    fontSize: FONT_SIZE_MEDIUM,
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
  /////////////////////////////////////////

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.BLACK,
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
