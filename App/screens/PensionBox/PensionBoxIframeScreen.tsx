import { View, StyleSheet, BackHandler } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import WebView, { WebViewNavigation } from "react-native-webview";
import { useAuth } from "../../authentication/AuthProvider";

const PensionBoxIframeScreen = () => {
  const webViewRef = useRef<WebView | null>(null);
  const [canGoBack, setCanGoBack] = useState<boolean>(false);
  const { session } = useAuth();

  const handleBackPress = () => {
    if (webViewRef.current && canGoBack) {
      webViewRef.current.goBack();
      return true;
    }
    return false;
  };

  const onNavigationStateChange = (navState: WebViewNavigation) => {
    setCanGoBack(navState.canGoBack);
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => backHandler.remove();
  }, [canGoBack]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    webview: {
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{
          uri: `https://pensionbox.in/getstarted?partnerId=68044828-a7c7-4206-a183-840596edf3e7&mobileNo=${
            session?.identity.traits?.phone
              ? session?.identity.traits?.phone.startsWith("+91")
                ? session?.identity.traits?.phone.replaceAll("+91", "")
                : session?.identity.traits?.phone
              : ""
          }`,
          // uri: "https://pensionbox.in/getstarted?partnerId=68044828-a7c7-4206-a183-840596edf3e7&mobileNo=8088634021",
          // uri: "https://pensionbox.in/getstarted?partnerId=68044828-a7c7-4206-a183-840596edf3e7",
        }}
        onShouldStartLoadWithRequest={(request) => {
          const allowedHosts = ["pensionbox.in", "digilocker.gov.in", "digitallocker.gov.in"];
          const url = request.url.toLowerCase();

          return allowedHosts.some((host) => url.includes(host));
        }}
        style={styles.webview}
        onNavigationStateChange={onNavigationStateChange}
      />
    </View>
  );
};

export default PensionBoxIframeScreen;
