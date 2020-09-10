import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyD92D_0SDU0nUGM-RkYiYgW6cfubdu4-mc",
  authDomain: "apparel-webapp.firebaseapp.com",
  databaseURL: "https://apparel-webapp.firebaseio.com",
  projectId: "apparel-webapp",
  storageBucket: "apparel-webapp.appspot.com",
  messagingSenderId: "253793791731",
  appId: "1:253793791731:web:bff9d46e803c5dc7a41186",
  measurementId: "G-ELNYYG2LB1"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
