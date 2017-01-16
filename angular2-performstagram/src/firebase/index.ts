import {AngularFireModule, AuthMethods} from 'angularfire2';

const firebaseConfig = {
  apiKey: "AIzaSyDUIdypVb0OJcBxkeM27Igij1Hj9M-0GEE",
  authDomain: "performstagram-ec72e.firebaseapp.com",
  databaseURL: "https://performstagram-ec72e.firebaseio.com",
  storageBucket: "performstagram-ec72e.appspot.com",
  messagingSenderId: "447900732483"
};

const firebaseAuthConfig = {
  method: AuthMethods.Popup,
  remember: 'default'
};

export const FirebaseModule = AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig);
