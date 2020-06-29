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
import Poem from './screens/Poem';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const AppNavigator = createStackNavigator(
  {
    Auth: {
      screen: Login,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    Chat: {screen: Main},
    // change Main to be ChannelList
    Poem: {screen: Poem},
    // Chat: {screen: Chat}, // per RoomId
  },
  {
    initialRouteName: 'Auth',
  },
);

export default createAppContainer(AppNavigator);
