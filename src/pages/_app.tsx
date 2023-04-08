import { store } from "@/redux/store";
import { queryClient } from "@/services/queryClient";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import { Provider } from "react-redux";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
