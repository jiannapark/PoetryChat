/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// initial source: https://www.youtube.com/watch?v=7_nO6Tok5IQ

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Main from './screens/Main';
import Login from './screens/Login';
// import Chat from './screens/Chat';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const AuthNavigator = createStackNavigator({
  LoginRoute: {
    screen: Login,
    navigationOptions: () => ({
      headerShown: false,
    }),
  },
});

const AppNavigator = createSwitchNavigator(
  {
    Auth: AuthNavigator,
    App: {screen: Main},
    // Chat: {screen: Chat},
  },
  {
    initialRouteName: 'Auth',
  },
);

export default createAppContainer(AppNavigator);
