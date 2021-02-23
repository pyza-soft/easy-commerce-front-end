import "../styles/globals.css";
import "../styles/antd.less";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel='stylesheet'
          href='https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css'
          crossOrigin='anonymous'
        />
        <link rel='stylesheet/less' type='text/css' href='styles.less' />
        <script
          src='https://code.jquery.com/jquery-3.5.1.slim.min.js'
          crossOrigin='anonymous'
        />
        <script
          src='https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js'
          crossOrigin='anonymous'
        />
        <script
          src='https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js'
          crossOrigin='anonymous'
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
