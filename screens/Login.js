// initial source: https://www.youtube.com/watch?v=7_nO6Tok5IQ

import React, {Component} from 'react';
import AuthForm from './AuthForm';
import {login, signup, subscribeToAuthChanges} from '../api/users';
import {StyleSheet, View, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class Login extends Component {
  state = {
    authMode: 'login',
  };

  componentDidMount() {
    subscribeToAuthChanges(this.onAuthStateChanged);
  }

  onAuthStateChanged = user => {
    if (user !== null) {
      this.props.navigation.navigate('Chat', user);
    }
  };

  switchAuthMode = () => {
    this.setState(prevState => ({
      authMode: prevState.authMode === 'login' ? 'signup' : 'login',
    }));
  };

  render() {
    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{x: 0, y: 0}}
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={false}>
        <View style={styles.container}>
          <Text style={styles.title}>PoetryChat</Text>
          <AuthForm
            login={login}
            signup={signup}
            authMode={this.state.authMode}
            switchAuthMode={this.switchAuthMode}
            navigation={this.props.navigation}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  title: {
    fontWeight: '800',
    color: '#514E5A',
    marginTop: 150,
    marginBottom: -250,
    fontSize: 40,
    textAlign: 'center',
  },
});

export default Login;
