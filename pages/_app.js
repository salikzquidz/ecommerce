import { useEffect } from "react";
import "../styles/globals.css";
import { StoreProvider } from "../utils/Store";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jss = document.querySelector("#jss-server-side");
    if (jss) {
      jss.parentElement.removeChild(jss);
    }
    // return () => {
    //   cleanup;
    // };
  }, []);
  return (
    <StoreProvider>
      <Component {...pageProps} />;
    </StoreProvider>
  );
}

export default MyApp;
