import { View, StyleSheet } from "react-native";
import React from "react";
import BlueButton from "../Common/Button/BlueButton";
import { useTheme } from "../../theme/ThemeProvider";

interface WillFormContainerProps {
  children?: React.ReactNode;
  Handler?: () => void;
  nextDisabled?: boolean;
  title?: string;
}

const WillFormContainer: React.FC<WillFormContainerProps> = ({
  children,
  Handler,
  nextDisabled,
  title,
}) => {
  const {
    theme: { spacing, colors },
  } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white100,
    },
    formContainer: {
      flexGrow: 1,
      marginBottom: spacing.xxxl,
    },

    footer: {
      position: "absolute",
      bottom: 0,
      backgroundColor: colors.white100,
      flexDirection: "row",
      paddingVertical: spacing.md,
      paddingBottom: spacing.lg,
      paddingHorizontal: spacing.lg,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>{children}</View>
      <View style={styles.footer}>
        <BlueButton
          title={title ? title : "Confirm"}
          expandHorizontal
          onPress={Handler}
          disabled={nextDisabled}
        />
      </View>
    </View>
  );
};

export default WillFormContainer;
