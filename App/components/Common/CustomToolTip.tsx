import React, { useState } from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";

interface CustomToolTipProps {
  icon: React.ReactNode;
  message: React.JSX.Element;
  position: "top" | "bottom" | "left" | "right" | "center" | undefined;
  style: StyleProp<ViewStyle>;
}

const CustomToolTip: React.FC<CustomToolTipProps> = ({
  icon,
  message,
  position,
  style,
}) => {
  const [tip, setTip] = useState(false);

  return (
    <Tooltip
      isVisible={tip}
      content={message}
      placement={position}
      onClose={() => setTip(false)}
    >
      <Pressable style={style} onPress={() => setTip(true)}>
        {icon}
      </Pressable>
    </Tooltip>
  );
};

export default CustomToolTip;
