import "bootstrap/dist/css/bootstrap.min.css";
import { appWithTranslation } from "next-i18next";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default appWithTranslation(MyApp);
