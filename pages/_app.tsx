import React from "react";
import { AppProps } from "next/app";
import { UserProvider } from "@/components/auth";
import { ProtectRoute } from "@/components/ProtectedRoute";
import "../styles/index.css";

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <UserProvider>
    <ProtectRoute>
      <Component {...pageProps} />
    </ProtectRoute>
  </UserProvider>
)

export default App;
