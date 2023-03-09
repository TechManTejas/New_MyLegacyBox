import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useAuth } from "../authentication/AuthProvider";

import CustomSafeView from "../components/Common/CustomSafeView";
import HomeHeader from "../components/Home/HomeHeader";
import { useTheme } from "../theme/ThemeProvider";
import HomeMajorMenu from "../components/Home/HomeMajorMenu";
import HomeMinorMenu from "../components/Home/HomeMinorMenu";

const HomeScreen = () => {
  const { sessionToken } = useAuth();
  const {
    theme: { spacing },
  } = useTheme();

  console.log("Session Token : ", sessionToken);

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.u56 + spacing.sm,
    },
  });

  return (
    <CustomSafeView>
      <ScrollView>
        <View style={styles.container}>
          <HomeHeader />
          <HomeMajorMenu />
          <HomeMinorMenu centered />
        </View>
      </ScrollView>
    </CustomSafeView>
  );
};

export default HomeScreen;
