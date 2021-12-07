import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

import logo from '../assets/inshorts_logo.png';
import colors from '../constants/colors';
import {Height, Width} from '../constants/dimension';

const splashscreen = ({navigation}) => {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.navigate('home');
    }, 1000);
  }, []);
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
    </View>
  );
};

export default splashscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  image: {
    height: Height / 8,
    width: Width / 4,
  },
});
