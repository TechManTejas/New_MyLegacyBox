import React from "react";
import CustomWebView from "../../../testApp/components/Common/CustomWebView";

const Ohub = () => {
  return (
    <CustomWebView
      uri={`${process.env.EXPO_PUBLIC_OICONOMOS_WEBSITE}/app/quiz/`}
    />
  );
};

export default Ohub;
