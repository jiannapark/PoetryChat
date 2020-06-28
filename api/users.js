// source: https://www.youtube.com/watch?v=7_nO6Tok5IQ
import {auth, generateUserDocument} from '../firebase';

export async function login({email, password}) {
  try {
    auth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    console.log('Error Signing in with email and password', error);
  }
}

export async function signup({email, password, displayName}) {
  try {
    const {user} = await auth.createUserWithEmailAndPassword(email, password);
    generateUserDocument({...user, displayName});
  } catch (error) {
    console.log('Error Signing up with email and password', error);
  }
}

export function subscribeToAuthChanges(authStateChanged) {
  auth.onAuthStateChanged(user => {
    console.log(user);
    authStateChanged(user);
  });
}

export function signout(onSignedOut) {
  auth.signOut().then(() => {
    console.log('Signed out');
    onSignedOut();
  });
}

// export async function getUsers(usersRetrieved) {
//   const userList = [];
//   const snapshot = await firebase
//     .firestore()
//     .collection('users')
//     .get();

//   snapshot.forEach(doc => {
//     console.log('snapshot', snapshot.val());
//     console.log('doc.data', doc.data());
//     userList.push(doc.data());
//   });

// usersRetrieved(userList);
// }
