// initial sources: https://www.youtube.com/watch?v=qo7xtBCh18o && https://blog.logrocket.com/user-authentication-firebase-react-apps/
// generatePoem: Markov poetry generator original source: https://medium.com/@alexkrameris/markov-chain-implementation-in-javascript-a698f371d66f

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
      if (!word || !markovChain.hasOwnProperty(word))
        word = words[Math.floor(Math.random() * words.length)];
    }

    // const users = await firestore
    //   .collection('rooms')
    //   .doc(roomId)
    //   .get('users');

    const newPoem = {
      title: '',
      body: result,
      // collaborators: users,
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

// ["", "", "Cleabuttonmode always does not work", "Oh no it doesn’t wrap ", "Hi", "Hello", "Textinput clea", "Testttt", "Again", "Hellllooo", "What if text is multiple lines? What if text is mu… multiple lines? What if text is multiple lines? ", "Empty input field upon click", "Hello", "Texting", "How do I make it update realtime", "Still works?", "No double initializing firebase", "Messages not clearing ", "DefaultValue", "Value", "Let vs const", "Also does not keep consistent margin, just keeps shrinking", "Onmount", "So...", "Or use componentwillunmount", "Bye", "Cleabuttonmode always", "No?", "Have to setState with empty messages array in ML state", "Change", "Testing", "_document._data", "Doesn’t delete auto", "Ooh this.textInput.clear() works", "Doc.data", "Yo", "Ty again "]
