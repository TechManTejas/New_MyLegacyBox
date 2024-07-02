import React from "react";
import WebView from "react-native-webview";

const Ohub = () => {
  return (
    <WebView
      source={{
        uri: `${process.env.EXPO_PUBLIC_OICONOMOS_WEBSITE}/app/quiz/`,
      }}
      style={{ flex: 1 }}
    />
  );
};

export default Ohub;
