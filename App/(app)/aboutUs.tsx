import React from "react";
import WebView from "react-native-webview";

const AboutUs = () => {
  return (
    <WebView
      source={{ uri: "https://www.oiconomos.com" }}
      style={{ flex: 1 }}
    />
  );
};

export default AboutUs;
