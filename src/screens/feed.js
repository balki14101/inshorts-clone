import React from 'react';
import {View, Text} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';

import storiesfeed from './storiesfeed';
import trendingtopicsfeed from './trendingtopicsfeed';

const Stack = createStackNavigator();

const Feed = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={storiesfeed}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="trendingtopicsfeed"
        component={trendingtopicsfeed}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen name="home" component={Menu} /> */}
    </Stack.Navigator>
  );
};

export default Feed;
