import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';
import {addTitle} from '../firebase';

export default function Poem(props) {
  const [title, onChangeText] = React.useState('Untitled');

  const [poemId, text] = props.navigation.state.params;
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
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.text}>{poem}</Text>
        <View style={styles.save}>
          <Text style={styles.prompt}>Give this poem a title:</Text>
          <TextInput
            style={styles.titleInput}
            onChangeText={text => onChangeText(text)}
            placeholder="Untitled"
            value={title}
          />
          <Button onPress={() => addTitle(title, '1', poemId)} title="Save" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  text: {
    flex: 1,
    fontSize: 18,
    lineHeight: 30,
  },
  save: {
    marginVertical: 50,
  },
  prompt: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    marginVertical: 20,
  },
  titleInput: {
    height: 50,
    padding: 10,
    marginBottom: 10,
    fontSize: 25,
    textAlign: 'center',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
});
