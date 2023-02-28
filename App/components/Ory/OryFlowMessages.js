import React from "react";
import { Text, View } from "react-native";

const OryFlowMessages = ({ messages = [] }) => {
  return (
    <View>
      {messages.map(({ text, id }, index) => (
        <Text key={`flow-message-${id}-${index}`}>{text}</Text>
      ))}
    </View>
  );
};

export default OryFlowMessages;
