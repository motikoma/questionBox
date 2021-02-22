import React from "react";
import Head from "next/head";

type LayoutProps = {
  title?: string;
};

const Layout: React.FC<LayoutProps> = ({ children, title }) => (
  <div>
    <Head>
      <title>{title} - QuestionBox</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
