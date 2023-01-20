import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store } from "../Redux/store";
import { appWithTranslation } from "next-i18next";
import { SessionProvider } from "next-auth/react";
import { SSRProvider } from "react-bootstrap";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SSRProvider>
      <SessionProvider session={session}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </SessionProvider>
    </SSRProvider>
  );
}

export default appWithTranslation(MyApp);
