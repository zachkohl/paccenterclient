// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";
import { Fragment } from "react";
import googleId from "../utilities/googleAnalyticsId";
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const productionStatus = process.env.NODE_ENV === "production";
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, productionStatus };
  }

  setupGoogleAnalytics() {
    return {
      __html: ` window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', '${googleId}');`
    };
  }

  render() {
    const { productionStatus } = this.props;
    return (
      <Html>
        <Head>
          {productionStatus && (
            <Fragment>
              <script
                async
                src="https://www.googletagmanager.com/gtag/js?id=UA-155059509-2"
              ></script>
              <script dangerouslySetInnerHTML={this.setupGoogleAnalytics()} />
            </Fragment>
          )}
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
