import React from 'react';
import {View, SafeAreaView, StyleSheet, Text} from 'react-native';

export default function Message(props) {
  const message = props.message;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.message}>
        <Text style={styles.name}>{message.name}</Text>
        <Text style={styles.text}>{message.text}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    paddingLeft: 8,
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  name: {
    fontWeight: '800',
    marginRight: 10,
  },
  text: {
    alignSelf: 'auto',
  },
});
