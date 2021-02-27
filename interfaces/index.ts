// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

import firebase from 'firebase/app'

export type User = {
  uid: string
  isAnonymous: boolean
  name: string
}
export interface Question {
  id: string
  senderUid: string
  receiverUid: string
  body: string
  isReplied: boolean
  createdAt: firebase.firestore.Timestamp
}

export interface Answer {
  id: string
  uid: string
  questionId: string
  body: string
  createdAt: firebase.firestore.Timestamp
}