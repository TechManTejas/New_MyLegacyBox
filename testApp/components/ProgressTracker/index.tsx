import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import React from "react";
import ProgressTrackerSegment from "./ProgressTrackerSegment";
import { SvgProps } from "react-native-svg";

interface ProgressTrackerProps {
  icons?: React.FC<SvgProps>[];
  icon?: React.ReactNode;
  size?: number;
  currentColor?: string;
  activeColor?: string;
  inActiveColor?: string;
  currentIndex: number;
  style?: StyleProp<ViewStyle>;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  icons,
  activeColor,
  currentColor,
  inActiveColor,
  size,
  currentIndex,
  style,
}) => {
  const lastIconIndex = icons ? icons.length - 1 : 0;

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
    },
  });

  const getColor = (index: number) => {
    if (index === currentIndex) return currentColor;
    else if (index < currentIndex) return activeColor;

    return inActiveColor;
  };

  const getLineColor = (index: number) => {
    return index < currentIndex ? activeColor : inActiveColor;
  };

  return (
    <View style={[styles.container, style]}>
      {icons?.map((item, index) => {
        return (
          <ProgressTrackerSegment
            key={index}
            Icon={item}
            isLast={index === lastIconIndex}
            color={getColor(index)}
            lineColor={getLineColor(index)}
            size={size}
          />
        );
      })}
    </View>
  );
};

export default ProgressTracker;
