import { BackHandler, StyleSheet, View } from "react-native";
import OnBoardingFooter from "../../testApp/components/OnBoarding/OnBoardingFooter";
import OnBoardingSlidesList from "../../testApp/components/OnBoarding/OnBoardingSlidesList";
import { useTheme } from "../../testApp/theme/ThemeProvider";
import CustomSafeView from "../../testApp/components/Common/CustomSafeView";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { rootApiSlice } from "../../testApp/redux/api/rootApi";

const OnBoardingScreen = () => {
  const {
    theme: { colors },
  } = useTheme();

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
