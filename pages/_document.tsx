import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }
  render() {
    return (
      <Html>
        <Head>
          <base target="_blank" />
          <title> X-fest </title>
          <link rel="shortcut icon" href="/static/favicon.ico" />
        </Head>
        <body>
          <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
