import { View, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import { SvgProps } from "react-native-svg";

interface ProgressTrackerSegmentProps {
  Icon: React.FC<SvgProps>;
  isLast?: boolean;
  size?: number;
  color?: string;
  lineColor?: string;
}

const ProgressTrackerSegment: React.FC<ProgressTrackerSegmentProps> = ({
  Icon,
  isLast,
  size,
  color,
  lineColor,
}) => {
  const {
    theme: { spacing },
  } = useTheme();

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      flexDirection: "row",
    },
    horizontalLine: {
      borderWidth: 1.6 * StyleSheet.hairlineWidth,
      borderColor: lineColor,
      flexGrow: 1,
      marginHorizontal: spacing.md,
    },
  });
  
  return (
    <View style={[styles.container, !isLast && { flexGrow: 1 }]}>
      {<Icon color={color} width={size} height={size} />}
      {!isLast && <View style={styles.horizontalLine} />}
    </View>
  );
};

export default ProgressTrackerSegment;
