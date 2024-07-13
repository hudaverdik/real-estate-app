import * as admin from 'firebase-admin';
import * as path from 'path';

const serviceAccount = require(path.resolve(__dirname, '../../config/serviceAccountKey.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://real-estate-app-11ecd.appspot.com",
});

const db = admin.firestore();
const storage = admin.storage();

export { admin, db, storage };
