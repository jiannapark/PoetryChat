// initial sources: https://www.youtube.com/watch?v=qo7xtBCh18o && https://blog.logrocket.com/user-authentication-firebase-react-apps/
// generatePoem: Markov poetry generator original source: https://medium.com/@alexkrameris/markov-chain-implementation-in-javascript-a698f371d66f

import firebase from 'react-native-firebase';

const app = firebase.app();

export const auth = firebase.auth();
export const firestore = firebase.firestore(app);

export const generateUserDocument = async user => {
  if (!user) {
    return;
  }
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const {email, displayName, password, uid} = user;
    try {
      await userRef.set({
        displayName,
        email,
        password,
        uid,
      });
    } catch (error) {
      console.log('Error creating user document', error);
    }
  }
  return getUserDocument(user.uid);
};

export const getUserDocument = async uid => {
  if (!uid) {
    return null;
  }
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

export const generatePoem = async roomId => {
  try {
    const markovChain = {};
    const texts = await getMessageDocuments(roomId);
    const textArr = texts.join(' ').split(' ');
    for (let i = 0; i < textArr.length; i++) {
      let word = textArr[i].toLowerCase().replace(/[\W_]/, ' ');
      if (!markovChain[word]) {
        markovChain[word] = [];
      }
      if (textArr[i + 1]) {
        markovChain[word].push(
          textArr[i + 1].toLowerCase().replace(/[\W_]/, ' '),
        );
      }
    }
    const words = Object.keys(markovChain);
    let word = words[Math.floor(Math.random() * words.length)];
    let result = '';
    for (let i = 0; i < words.length; i++) {
      result += word + ' ';
      let newWord =
        markovChain[word][Math.floor(Math.random() * markovChain[word].length)];
      word = newWord;
      if (!word || !markovChain.hasOwnProperty(word)) {
        word = words[Math.floor(Math.random() * words.length)];
      }
    }

    const newPoem = {
      title: '',
      body: result,
    };

    await firestore
      .collection('rooms')
      .doc(roomId)
      .collection('poems')
      .add(newPoem);

    return result;
  } catch (error) {
    console.log('Error creating a poem--which is in itself a poem: ', error);
  }
};

const getMessageDocuments = async roomId => {
  try {
    let texts = [];
    let messageDocuments = await firestore
      .collection('rooms')
      .doc(roomId)
      .collection('messages')
      .get();
    messageDocuments = messageDocuments.docs;
    messageDocuments.forEach(doc => {
      texts.push(doc._data.text);
    });
    return texts;
  } catch (error) {
    console.log('Error fetching messages', error);
  }
};

export const addTitle = async (title, poemId) => {
  try {
    console.log();
  } catch (error) {
    console.log('Error adding title', error);
  }
};
