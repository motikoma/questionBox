import { AppProps } from "next/app";
import "../styles/globals.css";
import "../lib/firebase";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
