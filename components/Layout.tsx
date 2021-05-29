import React from "react";
import Head from "next/head";
import Link from "next/link";

const ogpImageUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/images/card.png`;

type LayoutProps = {
  title?: string;
};

const Layout: React.FC<LayoutProps> = ({
  children,
  title = "トップページ",
}) => (
  <div>
    <Head>
      <title>{title} - QuestionBox</title>
      <meta charSet="utf-8" />
      <meta
        name="description"
        key="description"
        content="質問と回答を行えるサービスです。"
      />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
        crossOrigin="anonymous"
      ></link>

      {/* facebook OGPの設定 */}
      <meta
        property="og:title"
        key="ogTitle"
        content={`${title} - QuestionBox`}
      />
      <meta
        property="og:site_name"
        key="ogSiteName"
        content={`${title} - QuestionBox`}
      />
      <meta
        property="og:description"
        key="ogDescription"
        content="質問と回答を行えるサービスです。"
      />

      {/* twitter OGPの設定 */}
      <meta property="og:image" key="ogImage" content={ogpImageUrl} />
      <meta name="twitter:card" key="twitterCard" content="summary" />
      <meta name="twitter:image" key="twitterImage" content={ogpImageUrl} />
    </Head>
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light mb-3"
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <div className="container">
          <div className="mr-auto">
            <a className="navbar-brand" href="#">
              My質問サービス
            </a>
          </div>
          <form className="d-flex">
            <button className="btn btn-outline-primary" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
      <div className="container">{children}</div>
    </div>
    <footer className="text-center mt-5 py-5 bg-light">
      <div className="pb-1 text-muted">
        Created by{" "}
        <a href="https://twitter.com/motikoma" className="link-info">
          @motikoma
        </a>
      </div>
      <div>
        <Link href="/terms-of-service">
          <a className="d-inline-block mx-1">利用規約</a>
        </Link>
      </div>
      <div>
        <Link href="/privacy-policy">
          <a className="d-inline-block mx-1">プライバシーポリシー</a>
        </Link>
      </div>
    </footer>
    <nav className="navbar fixed-bottom navbar-light bg-light">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center w-100">
          <i className="material-icons">menu</i>
          <Link href="/questions/received">
            <a>
              <i className="material-icons">home</i>
            </a>
          </Link>
          <Link href="/users/me">
            <a>
              <i className="material-icons">person</i>
            </a>
          </Link>
        </div>
      </div>
    </nav>
  </div>
);

export default Layout;
