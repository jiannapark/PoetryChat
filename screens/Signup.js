// // source: https://www.youtube.com/watch?v=qo7xtBCh18o && https://www.youtube.com/watch?v=eR1vP-W1emI

// import React from 'react';
// import {
//   StyleSheet,
//   SafeAreaView,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
// } from 'react-native';

// import {auth, firestore} from '../firebase';
// import {addUser, getUsers, signout} from '../api/users';

// class Signup extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       loading: true,
//       user: {
//         name: '',
//         email: '',
//         password: '',
//       },
//     };
//   }

//   static navigationOptions = {
//     title: 'Chatter',
//   };

//   componentDidMount() {
//     auth.onAuthStateChanged(user => {
//       console.log(user);
//       if (!user) {
//         user = {
//           displayName: '',
//           email: '',
//           password: '',
//         };
//       }
//       this.setState({loading: false, user});
//     });
//   }

//   onSignedOut = () => {
//     console.log('signed out');
//     this.props.navigation.navigate('Auth');
//   };

//   onPressContinue = () => {
//     this.props.navigation.navigate('Chat', this.state.user);
//   };

//   onPressSignup = () => {
//     this.props.navigation.navigate('Signup', this.state.user);
//   };

//   // handleChange = e => {
//   //   console.log(e);
//   //   this.setState({user: {[e.target.name]: e.target.value}});
//   // };

//   handleChangeName = displayName => {
//     this.setState({user: {displayName: displayName}});
//   };

//   handleChangeEmail = email => {
//     this.setState({user: {email: email}});
//   };

//   handleChangePassword = password => {
//     this.setState({user: {password: password}});
//   };

//   render() {
//     return (
//       <SafeAreaView style={styles.container}>
//         {/* <Text style={styles.title}>PoetryChat</Text> */}
//         <Text style={styles.label}>DisplayName</Text>
//         <TextInput
//           style={styles.input}
//           name="displayName"
//           placeHolder="Your display name here"
//           onChangeText={this.handleChangeName}
//           value={this.state.user.displayName}
//         />
//         {/* <Text style={styles.label}>Email</Text>
//         <TextInput
//           style={styles.input}
//           name="email"
//           placeHolder="Your email here"
//           // onChange={e => this.handleChange(e)}
//           onChangeText={this.handleChangeEmail}
//           value={this.state.user.email}
//         /> */}
//         {/* <TouchableOpacity onPress={this.onPress}>
//           <Text style={styles.buttonText}>Next</Text>
//         </TouchableOpacity> */}
//         {/* <Text style={styles.label}>Password</Text>
//         <TextInput
//           style={styles.input}
//           name="password"
//           placeHolder="Your password here"
//           onChangeText={this.handleChangePassword}
//           value={this.state.user.password}
//         /> */}
//         <View style={styles.buttons}>
//           <TouchableOpacity onPress={this.onPressContinue}>
//             <Text style={styles.buttonText}>Continue</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     );
//   }
// }

// const offset = 24;

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

// export default Signup;
