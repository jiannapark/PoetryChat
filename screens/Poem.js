import React from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';

export default function Poem(props) {
  const [title, onChangeText] = React.useState('Untitled');

  const text = props.navigation.state.params._55;
  const textArr = text.split(' ');
  let poem = [];
  for (let i = 0; i < 50; i++) {
    // i < textArr.length
    if (i % 6 === 0) {
      poem.push('\n');
    }
    poem.push(textArr[i]);
  }
  poem = poem.join(' ');

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{poem}</Text>
      <View style={styles.save}>
        <Text style={styles.prompt}>Save this poem?</Text>
        <TextInput
          style={styles.formInput}
          onChangeText={text => onChangeText(text)}
          placeholder="Untitled"
          value={title}
        />
        <Button
          onPress={() => props.handleSubmit()} // create this method
          buttonStyle={styles.button}
          title="Save"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    flex: 1,
    padding: 20,
    fontSize: 18,
    lineHeight: 30,
  },
  save: {
    paddingBottom: 50,
    backgroundColor: 'pink',
  },
  prompt: {
    padding: 20,
    fontSize: 16,
    color: 'gray',
  },
  titleInput: {
    padding: 20,
    width: '200px',
    backgroundColor: 'pink',
  },
  button: {
    backgroundColor: 'blue',
    width: '200px',
    marginTop: 100,
  },
});
