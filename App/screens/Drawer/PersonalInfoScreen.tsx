import { View, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import PersonalInfoForm from "../../components/Common/PersonalInfoForm";

const PersonalInfoScreen = () => {
  const {
    theme: { colors },
  } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white100,
    },
  });

  return (
    <View style={styles.container}>
      <PersonalInfoForm />
    </View>
  );
};

export default PersonalInfoScreen;
