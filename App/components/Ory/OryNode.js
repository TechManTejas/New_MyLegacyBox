import React from "react";
import { Text } from "react-native";
import { isUiNodeInputAttributes } from "../../utils/oryForm";
import OryNodeInput from "./OryNodeInput";
import OryNodeInputSubmit from "./OryNodeInputSubmit";

const OryNode = (props) => {
  const { node } = props;

  if (isUiNodeInputAttributes(node.attributes)) {
    if (node.attributes.type === "submit") {
      return <OryNodeInputSubmit {...props} />;
    }

    return <OryNodeInput {...props} />;
  }

  return <Text>Unknown Element : {node.type}</Text>;
};

export default OryNode;
