import {useEffect} from "react";
import firebase from 'firebase/app'
import {User} from "../interfaces/index";
import {atom, useRecoilState} from "recoil";

const userState = atom<User>({
  key: 'user',
  default: {
    uid: '',
    isAnonymous: false
  },
});

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