import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { useTheme } from "../../theme/ThemeProvider";
import { RadioButton } from "react-native-paper";

interface WillSecondaryCardProp {
  beneficiaryName: string;
  distType: 1 | 2;
  changeToType2: () => void;
  changeToType1: () => void;
  distributionCard: React.ReactNode;
  isError: boolean;
  distData: any[];
}

const WillSecondaryCard: React.FC<WillSecondaryCardProp> = ({
  beneficiaryName,
  distType,
  changeToType2,
  changeToType1,
  distributionCard,
  distData,
  isError,
}) => {
  const {
    theme: { spacing, colors, fontFamily, fontSize },
  } = useTheme();

  const styles = StyleSheet.create({
    card: {
      marginBottom: spacing.md,
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: spacing.xs,
      marginHorizontal: spacing.lg,
      padding: spacing.md,
      borderColor: colors.black300,
    },
    beneficiaryName: {
      fontFamily: fontFamily.regular,
      color: colors.blue500,
      fontSize: fontSize.lg,
      lineHeight: fontSize.xl,
      marginBottom: spacing.sm,
    },
    optionText: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
    },
    option: {
      flexDirection: "row",
      alignItems: "center",
    },
    errorText: {
      textAlign: "center",
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      color: colors.red400,
    },
  });

  const distCheck = distData.reduce(
    (acc, curr) => acc + Number(curr.percent),
    0,
  );

  const check100 = distCheck === 100 || distCheck === 99.99;

  return (
    <View style={styles.card}>
      <Text style={styles.beneficiaryName}>{beneficiaryName}</Text>

      <View>
        <Pressable
          onPress={changeToType1}
          style={[styles.option, { marginBottom: spacing.xs }]}
        >
          <RadioButton
            value="1"
            status={distType === 1 ? "checked" : "unchecked"}
            color={colors.blue500}
            onPress={changeToType1}
          />
          <Text style={styles.optionText}>Lineal Descendants</Text>
        </Pressable>

        <Pressable onPress={changeToType2} style={styles.option}>
          <RadioButton
            value="2"
            status={distType === 2 ? "checked" : "unchecked"}
            color={colors.blue500}
            onPress={changeToType2}
          />
          <Text style={styles.optionText}>
            Distribute among other beneficiaries
          </Text>
        </Pressable>

        {!check100 && distType === 2 && isError && (
          <View>
            <Text style={styles.errorText}>
              Sum of all the distribution should be 100 or 99.99
            </Text>
          </View>
        )}

        {distType === 2 && distributionCard}
      </View>
    </View>
  );
};

export default WillSecondaryCard;
