// Your web app's Firebase configuration
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB4klcA2bcQj1nsi2gOlRfUGaJuPUTOsuA',
  authDomain: 'pictura-obscura.firebaseapp.com',
  projectId: 'pictura-obscura',
  storageBucket: 'pictura-obscura.appspot.com',
  messagingSenderId: '371127671237',
  appId: '1:371127671237:web:9a3c090b270ac7b12fd3ac',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
