import { View, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../../testApp/theme/ThemeProvider";
import PersonalInfoForm from "../../testApp/components/Common/PersonalInfoForm";

const PersonalInfo = () => {
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

export default PersonalInfo;
