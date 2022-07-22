import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/functions";
import "firebase/compat/analytics";
import config from "config/firebaseConfig";

class Firebase {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config.firebase);
    }

    this.auth = firebase.auth();
    this.db = firebase.firestore();
    this.functions = firebase.functions();
    this.storage = firebase.storage();
    this.functions.useEmulator("localhost", 5001); // Dev
  }

  // Auth API

  signIn = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  // Listener in the user
  doOnAutonAuthStateChanged = () =>
    this.auth.onAuthStateChanged((authUser) => console.log(authUser));

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) => {
    if (this.auth && this.auth.currentUser) {
      this.auth.currentUser.updatePassword(password);
    }
  };
}

export { Firebase };
