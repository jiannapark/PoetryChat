import React from 'react';
import {StyleSheet, Button, Text, View, TextInput} from 'react-native';
import {withFormik} from 'formik';

const AuthForm = props => {
  const displayNameInput = (
    <View>
      <TextInput
        style={styles.formInput}
        onChangeText={text => props.setFieldValue('displayName', text)}
        placeholder="Display Name"
      />
      <Text style={styles.validationText}>{props.errors.displayName}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {props.authMode === 'signup' ? displayNameInput : null}
      <TextInput
        style={styles.formInput}
        onChangeText={text => props.setFieldValue('email', text)}
        placeholder="email"
      />
      <Text style={styles.validationText}>{props.errors.email}</Text>
      <TextInput
        style={styles.formInput}
        onChangeText={text => props.setFieldValue('password', text)}
        placeholder="password"
      />
      <Text style={styles.validationText}>{props.errors.password}</Text>
      <Button
        onPress={() => props.handleSubmit()}
        buttonStyle={styles.button}
        title={props.authMode === 'login' ? 'Login' : 'Create Account'}
      />
      <Button
        backgroundColor="transparent"
        color="black"
        buttonStyle={styles.button}
        onPress={() => props.switchAuthMode()}
        title={
          props.authMode === 'login' ? 'Switch to Signup' : 'Switch to Login'
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  validationText: {
    marginTop: 8,
    marginBottom: 16,
    color: 'red',
    alignSelf: 'center',
  },
  formInput: {
    width: 300,
    height: 50,
    borderColor: '#B5B4BC',
    borderWidth: 1,
    marginBottom: 16,
    padding: 10,
    borderRadius: 30,
  },
  button: {
    width: 200,
    marginBottom: 16,
  },
});

export default withFormik({
  mapPropsToValues: () => ({email: '', password: ''}),
  validate: (values, props) => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Email Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid Email Address';
    }

    if (!values.password) {
      errors.password = 'Password Required';
    } else if (values.password.length < 8) {
      errors.password = 'Minimum length of password is 8 characters';
    }

    if (props.authMode === 'signup') {
      if (!values.displayName) {
        errors.displayName = 'Display Name Required';
      } else if (values.displayName.length < 3) {
        errors.displayName = 'Minimum length of display name is 3 characters';
      }
    }

    return errors;
  },
  handleSubmit: (values, {props}) => {
    props.authMode === 'login' ? props.login(values) : props.signup(values);
    props.navigation.actions.navigate('Chat');
  },
})(AuthForm);
