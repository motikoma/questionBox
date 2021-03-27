import * as admin from 'firebase-admin'

if (admin.apps.length == 0) {
  // ローカルではprocess.env.GCP_CREDENTIALはbase64でエンコードしているが、verselでは巣の状態で秘密鍵を入力しているので分岐処理を実行する
  // if ( process.env.NODE_ENV === "local") {
  //   console.log("process.env.GCP_CREDENTIAL");
  //   const credential = JSON.parse(
  //     Buffer.from(
  //       process.env.GCP_CREDENTIAL.replace(/\\n/g, '\n'),
  //       'base64'
  //     ).toString()
  //   )
  //   console.log(credential);
  // } else {
  //   const credential = process.env.GCP_CREDENTIAL;
  // }

  const credential = JSON.parse(process.env.GCP_CREDENTIAL);

  admin.initializeApp({
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    credential: admin.credential.cert(credential),
  })
}