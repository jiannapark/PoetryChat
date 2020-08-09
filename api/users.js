// source: https://github.com/JulianCurrie/CwC_React_Native/tree/firebase_basics
import {auth, generateUserDocument} from '../firebase';

export async function login({email, password}) {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    console.log('Error Signing in with email and password', error);
  }
}

export async function signup({email, password, displayName}) {
  try {
    const {user} = await auth.createUserWithEmailAndPassword(email, password);
    await user.updateProfile({displayName: displayName});
    await generateUserDocument({...user._user, displayName});
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

export function signout() {
  auth
    .signOut()
    .then(() => {
      console.log('Signed out');
    })
    .catch(error => console.log(error));
}
