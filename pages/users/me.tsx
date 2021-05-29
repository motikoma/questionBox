import Layout from "../../components/Layout";
import TwitterShareButton from "../../components/TwitterShareButton";
import useAuthentication from "../../fooks/authentication";

const UsersMe = () => {
  const { user } = useAuthentication();
  const url = `${process.env.NEXT_PUBLIC_WEB_URL}/users/${user.uid}`;

  if (user === null) {
    return (
      <Layout>
        <p>認証できていません</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="text-center">
        <h1 className="h4">自分のページ</h1>
        <p className="user-select-all overflow-auto">{url}</p>
        <p>このURLをシェアしてみんなに質問してもらおう！</p>
        <div className="d-flex justify-content-center">
          <TwitterShareButton
            url={url}
            text="質問してね！"
          ></TwitterShareButton>
        </div>
      </section>
    </Layout>
  );
};

export default UsersMe;
