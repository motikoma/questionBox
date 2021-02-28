var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

// TODO: 下記を参考にリファクタする
// https://github.com/gladly-team/next-firebase-auth

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
  });
}
