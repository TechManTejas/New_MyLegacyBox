import { StatusBar, StyleSheet, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import OnBoardingFooter from "../../components/OnBoarding/OnBoardingFooter";
import OnBoardingSlidesList from "../../components/OnBoarding/OnBoardingSlidesList";
import { useTheme } from "../../theme/ThemeProvider";
import CustomSafeView from "../../components/Common/CustomSafeView";
import React from "react";

const OnBoardingScreen = () => {
  const {
    theme: { colors },
  } = useTheme();

  const isFoucused = useIsFocused();

  const styles = StyleSheet.create({
    safeViewStyle: {
      backgroundColor: colors.white400,
    },
    list: {
      flex: 1,
    },
  });

  return (
    <CustomSafeView safeViewStyle={styles.safeViewStyle}>
      {isFoucused && (
        <StatusBar barStyle="light-content" backgroundColor={colors.white700} />
      )}
      <View style={styles.list}>
        <OnBoardingSlidesList />
      </View>
      <View>
        <OnBoardingFooter />
      </View>
    </CustomSafeView>
  );
};

export default OnBoardingScreen;
