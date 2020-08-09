// initial source: https://www.youtube.com/watch?v=7_nO6Tok5IQ

import Main from './screens/Main';
import Login from './screens/Login';
import Poem from './screens/Poem';

import {createAppContainer} from 'react-navigation';
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
    Poem: {screen: Poem},
  },
  {
    initialRouteName: 'Auth',
  },
);

export default createAppContainer(AppNavigator);
