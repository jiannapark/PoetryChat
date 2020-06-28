// initial sources: https://www.youtube.com/watch?v=qo7xtBCh18o && https://blog.logrocket.com/user-authentication-firebase-react-apps/

import firebase from 'react-native-firebase';

const app = firebase.app();

export const auth = firebase.auth();
export const firestore = firebase.firestore(app);

export const generateUserDocument = async user => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const {email, displayName, password} = user;
    try {
      await userRef.set({
        displayName,
        email,
        password,
      });
    } catch (error) {
      console.log('Error creating user document', error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.log('Error fetching user', error);
  }
};
