import React, {Component} from 'react';
import Message from './Message';
import {StyleSheet, SafeAreaView, View} from 'react-native';

export default class MessagesList extends Component {
  constructor(props) {
    super(props);
    this.state = {messages: []};
  }

  componentDidMount() {
    const {messages} = this.props;
    this.onMount(messages);
  }

  onMount(messages) {
    this.setState({messages});
  }

  render() {
    const messages = this.state.messages;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          {messages.map(message => {
            return (
              <View style={styles.container}>
                <Message message={message} key={message.timestamp} />
              </View>
            );
          })}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
