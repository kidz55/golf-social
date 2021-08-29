import * as firebase from 'firebase/app';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});

const db = getFirestore();

const Api = {
  get: async (service, id) => {
    const docRef = doc(db, service, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error('not_found');
    }
    return docSnap.data();
  },
};

export default Api;
