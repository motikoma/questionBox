import firebase from "firebase/app";
import { User } from "../../interfaces";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

type Query = {
  uid: string;
};

const UserShow: React.FC = () => {
  // ユーザー情報は共有せずにコンポーネントないのstateとして管理する
  const [user, setUser] = useState<User>();
  const [body, setBody] = useState("");
  const [isSending, setIsSending] = useState(false);
  const router = useRouter();
  const query = router.query as Query;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    // idを自動生成するためaddメソッドを使用
    await firebase.firestore().collection("questions").add({
      senderUid: firebase.auth().currentUser?.uid,
      receiverUid: user?.uid,
      body,
      isReplied: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setIsSending(false);
    setBody("");
    alert("質問を送信しました");
  };

  useEffect(() => {
    // 初回レンダリングの場合は query の値が存在しない
    if (query.uid === undefined) return;

    async function loadUser() {
      const doc = await firebase
        .firestore()
        .collection("users")
        .doc(query.uid)
        .get();

      // ユーザー情報が存在する場合
      if (doc.exists) {
        const gotUser = doc.data() as User;
        gotUser.uid = doc.id;
        setUser(gotUser);
      }
    }
    loadUser();
  }, [query.uid]);

  return (
    <Layout>
      <div className="container">
        {user && (
          <div className="text-center">
            <h1 className="h4">{user.name}さんのページ</h1>
            <div className="m-5">{user.name}さんに質問しよう！</div>
          </div>
        )}
      </div>
      <div className="row justify-content-center mb-3">
        <div className="col-12 col-md-6">
          <form onSubmit={onSubmit}>
            <textarea
              className="form-control"
              placeholder="おげんきですか？"
              rows={6}
              required
              value={body}
              onChange={(e) => {
                setBody(e.target.value);
              }}
            ></textarea>
            <div className="m-3">
              {isSending ? (
                <div className="spinner-border text-secondary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <button type="submit" className="btn btn-primary">
                  質問を送信する
                </button>
              )}
            </div>
          </form>
          <div>
            {user && (
              <p>
                <Link href="/users/me">
                  <a className="btn btn-link">
                    自分もみんなに質問してもらおう!
                  </a>
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserShow;
