import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store } from "../Redux/store";
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
