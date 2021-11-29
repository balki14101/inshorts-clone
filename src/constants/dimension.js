import {Dimensions} from 'react-native';

const Height = Dimensions.get('screen').height;
const Width = Dimensions.get('screen').width;

const carouselHeight = Dimensions.get('window').height;

export {Height, Width, carouselHeight};
