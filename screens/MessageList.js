// source: https://github.com/FullstackAcademy/PairProject.StackChat

import React, {Component} from 'react';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import {StyleSheet, SafeAreaView, FlatList} from 'react-native';

export default class MessagesList extends Component {
  constructor(props) {
    super(props);
    this.state = {messages: ['hello']};
  }

  async componentDidMount() {
    const {messages} = this.props;
    // const response = await axios.get('/api/messages');
    // const messages = response.data;
    this.onMount(messages);
  }

  onMount(messages) {
    this.setState({messages});
  }

  render() {
    // const channelId = Number(this.props.match.params.channelId); // because it's a string "1", not a number!
    const messages = this.state.messages;
    // const filteredMessages = messages.filter(
    //   message => message.channelId === channelId,
    // );
    console.log(messages, 'in messageList');

    return (
      <SafeAreaView>
        <FlatList style={styles.container}>
          {messages.map(message => (
            <Message message={message} key={message.timestamp} />
          ))}
        </FlatList>
        <NewMessageEntry user={this.props.user} onSend={this.props.onSend} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 32,
  },
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
});
