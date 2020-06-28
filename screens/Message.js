// source: https://github.com/FullstackAcademy/PairProject.StackChat

import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

export default function Message(props) {
  const message = props.message;

  return (
    <View style={styles.message}>
      <Text>{message.name}</Text>
      <Text>{message.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 32,
  },
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  message: {
    display: 'flex',
    backgroundColor: 'pink',
  },
});
