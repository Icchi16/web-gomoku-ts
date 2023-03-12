import type { AppProps } from "next/app";

import SideBar, { SIDEBAR_SIZE } from "../components/sideBar/SideBar";

import { NextUIProvider, Row, Col } from "@nextui-org/react";

import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  // 2. Use at the root of your app
  return (
    <NextUIProvider>
      <Row gap={0} css={{ position: "relative", height: "calc(100vh)" }}>
        <Col
          css={{
            maxWidth: SIDEBAR_SIZE,
            display: "flex",
            justifyContent: "center",
            "&::after": {
              content: "''",
              display: "block",
              position: "absolute",
              width: SIDEBAR_SIZE,
              backgroundColor: "$blue100",
              top: "0",
              left: "0",
              bottom: "0",
            },
          }}
        >
          <SideBar />
        </Col>
        <Col>
          <Component {...pageProps} />
        </Col>
      </Row>
    </NextUIProvider>
  );
}

export default MyApp;
