import { Component, ReactNode } from "react";
import { Helmet } from "react-helmet";

class HelmetComponent extends Component {
  render(): ReactNode {
    return (
      <>
        <Helmet>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@700&display=swap"
            rel="stylesheet"
          ></link>
          <title>🤑</title>
          <link rel="stylesheet" href="./reset.css" />
        </Helmet>
      </>
    );
  }
}
export default HelmetComponent;