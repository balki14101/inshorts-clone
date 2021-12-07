import React from 'react';

import Menu from './menu';
import Feed from './feed';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

function hometabnavigator() {
  return (
    <Tab.Navigator initialRouteName={'Feed'} tabBar={() => null}>
      <Tab.Screen name="Menu" component={Menu} />
      <Tab.Screen name="Feed" component={Feed} />
    </Tab.Navigator>
  );
}

export default hometabnavigator;
