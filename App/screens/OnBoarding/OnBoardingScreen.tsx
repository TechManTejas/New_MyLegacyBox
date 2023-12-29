import { StatusBar, StyleSheet, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import OnBoardingFooter from "../../components/OnBoarding/OnBoardingFooter";
import OnBoardingSlidesList from "../../components/OnBoarding/OnBoardingSlidesList";
import { useTheme } from "../../theme/ThemeProvider";
import CustomSafeView from "../../components/Common/CustomSafeView";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { rootApiSlice } from "../../redux/api/rootApi";

const OnBoardingScreen = () => {
  const {
    theme: { colors },
  } = useTheme();

  const isFoucused = useIsFocused();

  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    safeViewStyle: {
      backgroundColor: colors.white400,
    },
    list: {
      flex: 1,
    },
  });

  useEffect(() => {
    dispatch(rootApiSlice.util.resetApiState());
  }, []);

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
