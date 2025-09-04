import {
  GoogleAuthProvider,
  AppleAuthProvider,
  getAuth,
  signInWithCredential as fbSignInWithCredential,
  signOut as fbSignOut,
  FirebaseAuthTypes,
} from '@react-native-firebase/auth';

const auth = getAuth();

export default {
  GoogleAuthProvider,
  AppleAuthProvider,

  currentUser: auth.currentUser,

  signInWithCredential(credential: FirebaseAuthTypes.AuthCredential): Promise<FirebaseAuthTypes.UserCredential> {
    return fbSignInWithCredential(auth, credential);
  },
  signOut: async () => {
    await fbSignOut(auth);
  },
};
