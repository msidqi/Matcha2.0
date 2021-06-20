import React from "react";
import { AppProps } from "next/app";
import { UserProvider } from "@/components/auth";
import "../styles/index.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { SocketsProvider } from "@/components/Sockets";

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <SocketsProvider>
        <Component {...pageProps} />
      </SocketsProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
