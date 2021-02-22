import { RecoilRoot } from "recoil";
import { AppProps } from "next/app";
import "../lib/firebase";
import "../fooks/authentication";
import "../styles/globals.scss";
import dayjs from "dayjs";
import "dayjs/locale/ja";
dayjs.locale("ja");

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
};

export default App;
