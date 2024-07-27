import React from "react";
import WebView from "react-native-webview";

const Faq = () => {
  return (
    <WebView
      source={{
        uri: `${process.env.EXPO_PUBLIC_OICONOMOS_WEBSITE}/faq/`,
      }}
      style={{ flex: 1 }}
    />
  );
};

export default Faq;
