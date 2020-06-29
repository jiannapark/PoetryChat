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

export function signout() {
  auth
    .signOut()
    .then(() => {
      console.log('Signed out');
    })
    .catch(error => console.log(error));
}
