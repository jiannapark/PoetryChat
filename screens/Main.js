// initial source: https://www.youtube.com/watch?v=qo7xtBCh18o

import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Button,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {auth, firestore} from '../firebase';
import {signout} from '../api/users';
// import {GiftedChat} from 'react-native-gifted-chat';
import MessageList from './MessageList';

class Main extends React.Component {
  state = {
    messages: [],
  };

  static navigationOptions = {
    title: "Let's Chat!",
    headerRight: (
      <Button title="Sign Out" onPress={() => signout(this.onSignedOut)} />
    ),
  };

  componentDidMount() {
    let prevMessages = [];
    this.ref()
      .orderBy('timestamp')
      .limit(20)
      .onSnapshot(snapshot => {
        snapshot.docChanges.forEach(change => {
          // console.log(change._document._data)
          return prevMessages.push(change._document._data);
        });
      });
    console.log('prevmsgs', prevMessages);
    this.onMount(prevMessages);
    // this.on(message =>
    //   this.setState(prevState => ({
    //     messages: [...prevState.messages, message],
    //   })),
    // );
  }

  onMount(messages) {
    this.setState({messages});
  }

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

  // timestamp() {
  //   return firestore.FieldValue.serverTimestamp();
  // }

  parse = snapshot => {
    const {timestamp: numberStamp, text, name, userId} = snapshot.val();
    const {key: _id} = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      name,
      userId,
    };
    return message;
  };

  on = cb => {
    this.ref()
      .orderBy('timestamp', 'desc')
      .limit(20)
      // .get()
      .onSnapshot(snapshot => {
        console.log('snapshot', snapshot);
        // cb(this.parse(snapshot));
      });
  };

  // close the connection to the backend
  off = () => this.ref().off;

  onSend = message => {
    // backend
    const newMessage = {
      text: message.text,
      name: message.name,
      // userId: this.uid,
      // timestamp: this.timestamp(),
      timestamp: new Date(Date.now()),
    };
    this.ref().add(newMessage);
    // for (let i = 0; i < messages.length; i++) {
    //   const {text, name} = messages[i];
    //   const message = {
    //     text,
    //     name,
    //     // userId: this.uid,
    //     timestamp: this.timestamp,
    //   };
    //   console.log('message inside onSend', message);
    //   console.log(this.ref(), 'this.ref()')
    //   this.ref().push(message);
    // }
    // frontend
    this.setState(prevState => ({
      messages: [...prevState.messages, message],
    }));
  };

  onSignedOut = () => {
    console.log('signed out');
    this.props.navigation.navigate('Auth');
  };

  componentWillUnmount() {
    this.off();
  }

  render() {
    console.log('messages in render', this.state.messages);
    return (
      <SafeAreaView>
        <MessageList
          messages={this.state.messages}
          onSend={this.onSend}
          user={this.user()}
        />
      </SafeAreaView>
      // <GiftedChat
      //   messages={this.state.messages}
      //   onSend={this.onSend}
      //   send={this.send}
      //   user={this.user()}
      // />
    );
  }
}

export default Main;

//   // return (
//   //   <SafeAreaView style={styles.container}>
//   {
//     /* <Text style={styles.title}>PoetryChat</Text> */
//   }
//   {
//     /* <Text style={styles.label}>DisplayName</Text>
//       <TextInput
//         style={styles.input}
//         name="displayName"
//         placeHolder="Your display name here"
//         onChangeText={this.handleChangeName}
//         value={this.state.user.displayName}
//       /> */
//   }
//   {
//     /* <Text style={styles.label}>Email</Text>
//       <TextInput
//         style={styles.input}
//         name="email"
//         placeHolder="Your email here"
//         // onChange={e => this.handleChange(e)}
//         onChangeText={this.handleChangeEmail}
//         value={this.state.user.email}
//       /> */
//   }
//   {
//     /* <TouchableOpacity onPress={this.onPress}>
//         <Text style={styles.buttonText}>Next</Text>
//       </TouchableOpacity> */
//   }
//   {
//     /* <Text style={styles.label}>Password</Text>
//       <TextInput
//         style={styles.input}
//         name="password"
//         placeHolder="Your password here"
//         onChangeText={this.handleChangePassword}
//         value={this.state.user.password}
//       /> */
//   }
//   {
//     /* <View style={styles.buttons}> */
//   }
//   {
//     /* <TouchableOpacity onPress={this.onPressContinue}>
//           <Text style={styles.buttonText}>Continue</Text>
//         </TouchableOpacity> */
//   }
//   {
//     /* {auth.currentUser ? (
//           <TouchableOpacity onPress={() => signout(this.onSignedOut)}>
//             <Text style={styles.buttonText}>Sign Out</Text>
//           </TouchableOpacity>
//         ) : (
//           <Text />
//         )} */
//   }
//   {
//     /* <TouchableOpacity onPress={this.onPressSignup}>
//           <Text style={styles.buttonText}>Sign Up</Text>
//         </TouchableOpacity> */
//   }
//   {
//     /* </View> */
//   }
//   //   </SafeAreaView>
//   // );
// }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFF',
//   },
//   title: {
//     fontWeight: '800',
//     color: '#514E5A',
//     // marginTop: 100,
//     // marginBottom: 50,
//     fontSize: 40,
//     textAlign: 'center',
//   },
//   label: {
//     fontWeight: '600',
//     color: '#514E5A',
//     marginTop: 32,
//     fontSize: 30,
//     textAlign: 'center',
//   },
//   input: {
//     height: offset * 2,
//     margin: offset,
//     paddingHorizontal: offset,
//     borderWidth: StyleSheet.hairlineWidth,
//     borderColor: '#BAB7C3',
//     borderRadius: 30,
//   },
//   buttons: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//   },
//   buttonText: {
//     fontSize: 35,
//     fontWeight: '600',
//     color: '#514E5A',
//     textAlign: 'right',
//     marginTop: 32,
//   },
// });
