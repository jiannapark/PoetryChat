// // source: https://www.youtube.com/watch?v=qo7xtBCh18o
// // @flow
// import React from 'react';
// import {Button} from 'react-native';
// import {GiftedChat} from 'react-native-gifted-chat';

// // import Fire from '../firebase';
// import {auth, firestore} from '../firebase';
// import {signout} from '../api/users';

// type Props = {
//   name?: string,
// };

// class Chat extends React.Component<Props> {
//   // static navigationOptions = ({navigation}) => ({
//   //   title: (navigation.state.params || {}).name || 'Chat!',
//   //   headerRight: <Button onPress={() => signout(this.onSignedOut)} />,
//   // });

//   // onSignedOut = () => {
//   //   console.log('signed out');
//   //   this.props.navigation.navigate('Auth');
//   // };

//   state = {
//     messages: [],
//   };

//   get user() {
//     return {
//       name: this.props.navigation.state.params.name,
//       _id: Fire.shared.uid,
//     };
//   }

//   render() {
//     // console.log(this.props, this.user, Fire.shared)
//     return (
//       <GiftedChat
//         messages={this.state.messages}
//         onSend={Fire.shared.send}
//         user={this.user}
//       />
//     );
//   }

//   componentDidMount() {
//     Fire.shared.on(message =>
//       this.setState(previousState => ({
//         messages: GiftedChat.append(previousState.messages, message),
//       })),
//     );
//   }
//   componentWillUnmount() {
//     Fire.shared.off();
//   }
// }

// export default Chat;
