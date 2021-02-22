import { RecoilRoot } from "recoil";
import { AppProps } from "next/app";
import "../lib/firebase";
import "../fooks/authentication";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
};

export default App;
