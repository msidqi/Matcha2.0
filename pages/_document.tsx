import React from "react";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentInitialProps,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html lang="en" className="bg-gray-50">
        <Head>
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css"
            rel="stylesheet"
            integrity="sha512-zqhgG9z6BhYl/GmeyxIZBGDmTjwDQcrSMisme023jQ2EDtzALLRfgd1Ems0aietepsfFwB8olKVsHnlJjPIH/w=="
            crossOrigin="anonymous"
          />
          <script
            src="https://api.mapbox.com/mapbox-gl-js/v2.0.1/mapbox-gl-csp.js"
            crossOrigin="anonymous"
            integrity="sha512-rNVCdoNez4QjqKQaGwhxgIk3ylDKNULyUSACnTriewOCCLt+IC7KeBDGkDQUJAWj7/ODA4Z9l6AcXpwslTQxAA=="
          ></script>
          <script
            src="/mapbox.js"
            integrity="sha512-a4LxUpK8kXIuWppGAGfnFQ+WxANV/TSBI2Tj/QwXsjQi0ZCgai89f0Z4SP21FjtUICQQlZEGPgAOAi2/xsby1w=="
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
