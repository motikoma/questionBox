import Link from "next/link";
import Layout from "../components/Layout";
import useAuthentication from "../fooks/authentication";

const IndexPage = () => {
  const { user } = useAuthentication();
  return (
    <Layout title="Home">
      <h1>Hello Next.js 👋</h1>
      <p>{user?.uid || "未ログイン"}</p>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </Layout>
  );
};

export default IndexPage;
