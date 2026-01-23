import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";

const WillAssetBeneficiaryToggler = ({
  distributionView,
  assetBtnCallback,
  beneficiaryBtnCallback,
}: {
  distributionView: any;
  assetBtnCallback: any;
  beneficiaryBtnCallback: any;
}) => {
  const {
    theme: { spacing, colors, fontFamily, fontSize },
  } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: spacing.lg,
    },
    text: { fontFamily: fontFamily.semiBold, textAlign: "center" },
    button: {
      backgroundColor: colors.white100,
      paddingHorizontal: spacing.md,
      elevation: 2,
      paddingVertical: spacing.md,
      borderRadius: spacing.sm,
      marginHorizontal: spacing.xs,
      flex: 1,
    },
    conditionalStyle: {
      borderColor: colors.blue500,
      borderWidth: 1,
    },
  });

  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.button,
          distributionView === "asset" && styles.conditionalStyle,
        ]}
        onPress={assetBtnCallback}
      >
        <Text style={styles.text}>Asset</Text>
      </Pressable>
      <Pressable
        style={[
          styles.button,
          distributionView === "beneficiary" && styles.conditionalStyle,
        ]}
        onPress={beneficiaryBtnCallback}
      >
        <Text style={{ fontFamily: fontFamily.semiBold, textAlign: "center" }}>
          Beneficiary
        </Text>
      </Pressable>
    </View>
  );
};

export default WillAssetBeneficiaryToggler;
