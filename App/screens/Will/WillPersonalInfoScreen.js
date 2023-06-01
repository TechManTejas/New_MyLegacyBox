import { View, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import { useSelector } from "react-redux";
import { getPersonalInfoSelector } from "../../services/willForm/willFormSlice";
import WillPersonalInfoForm from "../../components/Will/WillPersonalInfoForm";

const WillPersonalInfoScreen = () => {
  const personalInfo = useSelector((state) => getPersonalInfoSelector(state));

  const {
    theme: { spacing, colors },
  } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white100,
    },
  });

  return (
    <View style={styles.container}>
      <WillPersonalInfoForm initialValues={personalInfo} />
    </View>
  );
};

export default WillPersonalInfoScreen;
