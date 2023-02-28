import React from "react";
import { getNodeTitle } from "../../utils/oryForm";
import BlueButton from "../Button/BlueButton";

const OryNodeInputSubmit = ({
  node,
  isSubmitting,
  onSubmitPress,
  notAllowedToSubmit,
}) => {
  const { attributes } = node;

  if (attributes.type !== "submit") return null;

  const title = getNodeTitle(node);

  return (
    <BlueButton
      extraSpaceTop
      disabled={isSubmitting || notAllowedToSubmit}
      title={title}
      onPress={() => {
        onSubmitPress(attributes.name, attributes.value);
      }}
    />
  );
};

export default OryNodeInputSubmit;
