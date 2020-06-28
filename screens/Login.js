// initial source: https://www.youtube.com/watch?v=7_nO6Tok5IQ

import React, {Component} from 'react';
import AuthForm from './AuthForm';
import {login, signup, subscribeToAuthChanges} from '../api/users';

class Login extends Component {
  state = {
    authMode: 'login',
  };

  componentDidMount() {
    subscribeToAuthChanges(this.onAuthStateChanged);
  }

  onAuthStateChanged = user => {
    if (user !== null) {
      this.props.navigation.navigate('App', user);
    }
  };

  switchAuthMode = () => {
    this.setState(prevState => ({
      authMode: prevState.authMode === 'login' ? 'signup' : 'login',
    }));
  };

  render() {
    return (
      <AuthForm
        login={login}
        signup={signup}
        authMode={this.state.authMode}
        switchAuthMode={this.switchAuthMode}
        navigation={this.props.navigation}
      />
    );
  }
}

export default Login;
