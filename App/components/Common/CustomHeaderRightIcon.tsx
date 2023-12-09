import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { FontAwesome5 } from "@expo/vector-icons";
import CustomToolTip from "./CustomToolTip";
import { useSelector } from "react-redux";
import { RootStoreType } from "../../redux/store";

const CustomHeaderRightIcon = () => {
  const message: string = useSelector(
    (state: RootStoreType) => state.screenInfo.message
  );

  const {
    theme: { colors, spacing, fontSize, fontFamily },
  } = useTheme();

  const styles = StyleSheet.create({
    headerRightIcon: {
      paddingHorizontal: spacing.md,
      paddingRight: spacing.lg,
      fontSize: fontSize.default,
      color: colors.blue400,
    },
    toolTipMessage: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: spacing.lg,
      color: colors.blue500,
    },
  });

  return (
    <CustomToolTip
      icon={
        <FontAwesome5
          name="info"
          size={styles.headerRightIcon.fontSize}
          color={styles.headerRightIcon.color}
        />
      }
      message={
        <View>
          <Text style={styles.toolTipMessage}>{message}</Text>
        </View>
      }
      position={"left"}
      style={styles.headerRightIcon}
    />
  );
};

export default CustomHeaderRightIcon;
