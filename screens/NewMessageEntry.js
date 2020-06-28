// source: https://github.com/FullstackAcademy/PairProject.StackChat

import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {withFormik} from 'formik';

const NewMessageEntry = props => {
  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={text => props.setFieldValue('text', text)}
        name="text"
        placeholder="Say something nice..."
      />
      <TouchableOpacity onPress={() => props.handleSubmit()}>
        <Text style={styles.button}>Send</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 32,
  },
  container: {
    flex: 1,
  },
  button: {
    width: 200,
    marginBottom: 16,
  },
  input: {
    width: 300,
    height: 50,
  },
});

export default withFormik({
  mapPropsToValues: () => ({text: ''}),
  handleSubmit: (values, {props}) => {
    console.log(values.text, props.user.name, 'from new message entry');
    props.onSend({text: values.text, name: props.user.name});
  },
})(NewMessageEntry);
