import { View, StyleSheet, Button, Text } from "react-native";
import React from "react";
import BlueButton from "../Common/Button/BlueButton";
import { useTheme } from "../../theme/ThemeProvider";

const WillFormContainer = ({
  children,
  prevHandler,
  nextHandler,
  prevDisabled,
  nextDisabled,
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
      justifyContent: "space-between",
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
          outline
          title="Prev"
          expandHorizontal
          onPress={prevHandler}
          disabled={prevDisabled}
        />
        <View style={{ width: spacing.xl }} />
        <BlueButton
          title="Next"
          expandHorizontal
          onPress={nextHandler}
          disabled={nextDisabled}
        />
      </View>
    </View>
  );
};

{
  /* <BlueButton
        outline
        title="popop"
        onPress={() => {
          navigation.popToTop();
        }}
      /> */
}

export default WillFormContainer;
