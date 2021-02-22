import firebase from "firebase/app";
import { User } from "../../interfaces";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Query = {
  uid: string;
};

const UserShow: React.FC = () => {
  // ユーザー情報は共有せずにコンポーネントないのstateとして管理する
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const query = router.query as Query;

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
    </Layout>
  );
};

export default UserShow;
