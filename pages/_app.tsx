import { AppProps } from "next/app";
import "../lib/firebase";
import "../lib/authentication";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
