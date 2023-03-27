import "rc-slider/assets/index.css";
import "../styles/antd-style.less";
import "../styles/main.scss";

import { ReactElement, ReactNode, useEffect, useState } from "react";

import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import Layout from "@/common/components/Layout";
import type { NextPage } from "next";
import { Provider } from "react-redux";
import SEO from "../next-seo.config";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import store from "@/common/redux/store";
import { ConfigProvider } from "antd";
import { AuthProvider } from "@/common/hooks/useAuth";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
  theme?: string;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      <Head>
        <title>SOFIN</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="description" content="Bounty Task" />
      </Head>
      <AuthProvider>
        <Provider store={store}>
          <ConfigProvider
            theme={{
              token: {
                fontFamily: `"Chalkboard", sans-serif`,
                colorPrimary: "#6A51A3",
              },
            }}
          >
            <ThemeProvider defaultTheme="light" enableSystem={false} attribute="class" forcedTheme={Component.theme || null}>
              <DefaultSeo {...SEO} />
              {/* <TopProgressBar /> */}
              {getLayout(<Component {...pageProps} />)}

              {/* ToastContainer */}
              <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
          </ConfigProvider>
        </Provider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
