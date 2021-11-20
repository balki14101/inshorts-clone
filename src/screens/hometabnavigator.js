import React from 'react';
import {View, Text} from 'react-native';

import Menu from './menu';
import Feed from './feed';
import WebView from './webview';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

function hometabnavigator() {
  return (
    <Tab.Navigator initialRouteName={'Feed'} tabBar={() => null}>
      <Tab.Screen name="Menu" component={Menu} />
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="WebView" component={WebView} />
    </Tab.Navigator>
  );
}

export default hometabnavigator;
