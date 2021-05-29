import Link from "next/link";
import Layout from "../components/Layout";
import useAuthentication from "../fooks/authentication";

const IndexPage = () => {
  const { user } = useAuthentication();
  return (
    <Layout title="Home">
      <h1>QuestionBox</h1>
      <p>{user?.uid || "未ログイン"}</p>
      <p>
        <Link href={`/users/${user?.uid}`}>
          <a>自分のQuestionBoxのURLだよ</a>
        </Link>
      </p>
      <p>
        <Link href={`/questions/${user?.uid}`}>
          <a>受け取った質問リストだよ</a>
        </Link>
      </p>
    </Layout>
  );
};

export default IndexPage;
