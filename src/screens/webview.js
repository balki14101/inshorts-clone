import React from 'react';
import {WebView} from 'react-native-webview';

const Webview = props => {
  return <WebView source={{uri: props.route.params}} />;
};

export default Webview;
