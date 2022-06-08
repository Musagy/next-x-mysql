import Layout from "../components/layout";
import { StoreProvider } from "../context/storeContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
}

export default MyApp;
