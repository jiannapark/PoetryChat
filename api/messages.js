// import firebase from 'react-native-firebase';

// export async function addMessage(roomId, message) {
//   await firebase
//     .firestore()
//     .collection('rooms')
//     .document(`${roomId || 1}`)
//     .collection('messages')
//     .add({
//       name: 'Jianna',
//       text: message,
//       timestamp: new Date(),
//     })
//     .then(snapshot => snapshot.get())
//     .then(userData => console.log('userData', userData.data()))
//     .catch(error => console.log(error));
// }

// export async function getMessages(roomId) {
//   const messages = [];
//   const snapshot = await firebase
//     .firestore()
//     .collection('rooms')
//     .document(roomId)
//     .collection('messages')
//     .getDocuments((querySnapshot, err) => {
//       if (err) {
//         console.log('error getting get message documents', err);
//       } else {
//         console.log('querySnapshot', querySnapshot);
//       }
//     });
// }
