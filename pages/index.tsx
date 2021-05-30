import Link from "next/link";
import Layout from "../components/Layout";
import useAuthentication from "../fooks/authentication";

const IndexPage = () => {
  const { user } = useAuthentication();
  return (
    <Layout title="Home">
      <h1>QuestionBox</h1>
      <p>ここは質問をしたり回答できるサービスです。</p>
      <p>{user?.uid || "未ログイン"}</p>
      <p>
        <Link href={`/users/me`}>
          <a className="btn btn-primary" role="button">
            質問をしてもらう！
          </a>
        </Link>
      </p>
    </Layout>
  );
};

export default IndexPage;
