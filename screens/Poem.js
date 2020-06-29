import React from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';

export default function Poem(props) {
  const text = props.navigation.state.params._55;
  const textArr = text.split(' ');
  let poem = [];
  for (let i = 0; i < textArr.length; i++) {
    if (i % 6 === 0) {
      poem.push('\n');
    }
    poem.push(textArr[i]);
  }
  poem = poem.join(' ');

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{poem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    padding: 20,
    fontSize: 18,
    lineHeight: 30,
  },
});
