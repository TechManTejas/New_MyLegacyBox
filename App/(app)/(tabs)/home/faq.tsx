import React from "react";
import CustomWebView from "../../../../testApp/components/Common/CustomWebView";

const Faq = () => {
  return (
    <CustomWebView
      uri={`${process.env.EXPO_PUBLIC_OICONOMOS_WEBSITE}/app/faq/`}
    />
  );
};

export default Faq;
