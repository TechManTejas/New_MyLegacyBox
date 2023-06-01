import { Text, View, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import WillWitnessInfoForm from "../../components/Will/WillWitnessInfoForm";
import { useRoute } from "@react-navigation/native";

const WillWitnessInfoScreen = () => {
  const route = useRoute();

  const {
    theme: { spacing, colors },
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
      <WillWitnessInfoForm initialValues={initialValues} index={index} />
    </View>
  );
};

export default WillWitnessInfoScreen;
