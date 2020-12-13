import React from "react";
import { AppProps } from "next/app";
import { UserProvider } from "@/components/auth";
import "../styles/index.css";

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <UserProvider>
    <Component {...pageProps} />
  </UserProvider>
)

export default App;
