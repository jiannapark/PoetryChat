// initial source: https://snack.expo.io/@bacon/firebase-basic-chat-video-tutorial

import React from 'react';
import {StyleSheet, SafeAreaView, Button, View} from 'react-native';

import {auth, firestore, generatePoem} from '../firebase';
import {signout} from '../api/users';
import MessageList from './MessageList';
import NewMessageEntry from './NewMessageEntry';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class Main extends React.Component {
  state = {
    messages: [],
  };

  static navigationOptions = ({navigation}) => ({
    title: "Let's Chat!",
    headerLeft: () => (
      <Button
        title="Sign Out"
        onPress={() => {
          signout();
          navigation.navigate('Auth');
        }}
      />
    ),
    headerRight: () => {
      const poem = generatePoem('1');
      return (
        <Button
          title="Poemify"
          onPress={() => {
            navigation.navigate('Poem', poem);
          }}
        />
      );
    },
  });

  parse = data => {
    const {timestamp, text, name, userId} = data;
    const message = {
      timestamp: timestamp.toDate(),
      text,
      name,
      userId,
    };
    return message;
  };

  componentDidMount() {
    this.onMount();
  }

  onMount = () => {
    this.ref()
      .orderBy('timestamp', 'desc')
      .limit(20)
      .onSnapshot(snapshot => {
        let messages = [];
        for (let i = 0; i < snapshot.docs.length; i++) {
          messages.unshift(this.parse(snapshot.docs[i]._data));
        }
        this.setState({messages});
      });
  };

  uid = () => {
    return (auth.currentUser || {}).uid;
  };

  ref = () => {
    return firestore
      .collection('rooms')
      .doc('1')
      .collection('messages');
  };

  user = () => {
    return {
      name: this.props.navigation.state.params._user.displayName,
      _id: this.uid(),
    };
  };

  onSend = message => {
    console.log(message, 'message on send');
    const newMessage = {
      text: message.text,
      name: message.name,
      // userId: this.uid,
      // timestamp: firestore.Timestamp,
      timestamp: new Date(Date.now()),
    };
    this.ref().add(newMessage);

    this.setState(prevState => ({
      messages: [...prevState.messages, message],
    }));
  };

  componentWillUnmount() {
    this.ref().off;
    // this.ref().off() is not a function
  }

  render() {
    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{x: 0, y: 0}}
        extraScrollHeight={48}
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={false}>
        <SafeAreaView style={styles.container}>
          <View style={styles.messages}>
            <MessageList messages={this.state.messages} />
          </View>
          <View style={styles.entryView}>
            <View style={styles.entry}>
              <NewMessageEntry user={this.user()} onSend={this.onSend} />
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  container: {
    display: 'flex',
    flex: 1,
  },
  messages: {
    flex: 1,
  },
  entryView: {
    justifyContent: 'flex-end',
  },
  entry: {
    borderColor: '#B5B4BC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingLeft: 12,
  },
});

export default Main;
