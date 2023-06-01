import { View, Text, StyleSheet } from "react-native";
import React from "react";
import WillBeneficiaryInfoForm from "../../components/Will/WillBeneficiaryInfoForm";
import { useRoute } from "@react-navigation/native";
import { useTheme } from "../../theme/ThemeProvider";

const WillBeneficiaryInfoScreen = () => {
  const route = useRoute();

  const {
    theme: { colors },
  } = useTheme();

  const { initialValues, index } = route.params;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white100,
    },
  });

  return (
    <View style={styles.container}>
      <WillBeneficiaryInfoForm initialValues={initialValues} index={index} />
    </View>
  );
};

export default WillBeneficiaryInfoScreen;
