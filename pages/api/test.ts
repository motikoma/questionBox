import { NextApiRequest, NextApiResponse } from 'next'
import '../../lib/firebase_admin'
import { firestore } from 'firebase-admin'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string

  // const doc = await firestore().collection('answers').doc(id).get()

  const data = {
    hoge: 1
  }

  // res.status(200).json(doc.data())
  res.status(200).json(data);
}