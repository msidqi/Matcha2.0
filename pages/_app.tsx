import React from "react";
import { AppProps } from "next/app";
import { UserProvider } from "@/components/auth";
import { ProtectRoute } from "@/components/ProtectedRoute";
import "../styles/index.css";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <UserProvider>
    <ProtectRoute>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ProtectRoute>
  </UserProvider>
);

export default App;
