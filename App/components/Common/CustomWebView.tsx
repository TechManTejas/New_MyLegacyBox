import { WebView } from "react-native-webview";
import React from "react";

interface CustomWebViewProps {
  uri: string;
}

const CustomWebView: React.FC<CustomWebViewProps> = ({ uri }) => {
  return (
    <WebView
      source={{ uri }}
      style={{ flex: 1 }}
      onShouldStartLoadWithRequest={(req) => {
        if (req.url !== uri) return false;
        return true;
      }}
    />
  );
};

export default CustomWebView;
