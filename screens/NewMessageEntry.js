import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {withFormik} from 'formik';

const NewMessageEntry = props => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={text => props.setFieldValue('text', text)}
          ref={input => {
            this.textInput = input;
          }}
          name="text"
          placeholder="Say something nice..."
        />
        <TouchableOpacity
          style={styles.send}
          onPress={() => props.handleSubmit()}>
          <Text style={styles.button}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  send: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
  },
  button: {
    textAlign: 'center',
    fontWeight: '600',
  },
  input: {
    width: 330,
    height: 50,
  },
});

export default withFormik({
  mapPropsToValues: () => ({text: ''}),
  handleSubmit: (values, {props}) => {
    props.onSend({text: values.text, name: props.user.name});
    this.textInput.clear();
  },
})(NewMessageEntry);
