import { QueryClient, QueryClientProvider } from "react-query";
import '../styles/styles.scss';
// use the react query library.
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    // queryclient makes it able to use the react queryclient in all components.
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
