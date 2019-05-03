import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import SMHI from "../components/smhi-weather/smhiweather";
import SLRealTime from "../components/sthlm-local-traffic/slrealtime";

import "./index.scss";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`dashboard`, `SL`, `SMHI`]} />
    <SLRealTime />
    <SMHI />
  </Layout>
);

export default IndexPage;
