import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import store from './src/store';

import splashscreen from './src/screens/splashscreen';
import hometabnavigator from './src/screens/hometabnavigator';
import WebView from './src/screens/webview';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="splashscreen"
            component={splashscreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="home"
            component={hometabnavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="WebView"
            component={WebView}
            options={{title: ''}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
