import firebaseAuth from './firebaseAuth';
import firebaseMessaging from './firebaseMessaging';
import firebaseInstallations from './firebaseInstallations';

export const firebase = {
  auth: firebaseAuth,
  messaging: firebaseMessaging,
  installations: firebaseInstallations,
};

export default firebase;
