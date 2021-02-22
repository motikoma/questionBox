import {useEffect} from "react";
import firebase from 'firebase/app'
import {User} from "../interfaces/index";
import {atom, useRecoilState} from "recoil";
import { disconnect } from "process";

const userState = atom<User>({
  key: 'user',
  default: {
    uid: '',
    isAnonymous: false
  },
});

const createUserIfNotFound = async (user: User) => {
  const userRef = firebase.firestore().collection('users').doc(user.uid);

  // docが存在する場合は終了
  const doc = await userRef.get();
  if(doc.exists) return;

  await userRef.set({
    name: `${new Date().getTime()}`
  })
}

const useAuthentication = () => {
  const [user, setUser] = useRecoilState(userState);

  useEffect(()=>{
    if (user.uid) return;

    firebase
    .auth()
    .signInAnonymously()
    .catch((error) => console.error(error));

  firebase.auth().onAuthStateChanged( (firebaseUser) => {
    if (firebaseUser) {
      setUser({uid: firebaseUser.uid, isAnonymous: firebaseUser.isAnonymous})
      createUserIfNotFound(firebaseUser);
    } else {
      setUser({
        uid: '',
        isAnonymous: false
      });
    }
    // ...
  })

  },[]);
  return {user};
}

export default useAuthentication;