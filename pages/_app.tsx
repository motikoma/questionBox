import { RecoilRoot } from "recoil";
import { AppProps } from "next/app";
import "../lib/firebase";
import "../fooks/authentication";
import "../styles/globals.scss";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
};

export default App;
