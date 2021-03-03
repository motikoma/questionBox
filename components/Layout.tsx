import React from "react";
import Head from "next/head";

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
    </Head>
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light mb-3"
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <div className="container">
          <div className="mr-auto">
            <a className="navbar-brand" href="#">
              Navbar
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
  </div>
);

export default Layout;
