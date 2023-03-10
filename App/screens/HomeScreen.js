import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useAuth } from "../authentication/AuthProvider";

import CustomSafeView from "../components/Common/CustomSafeView";
import HomeHeader from "../components/Home/HomeHeader";
import { useTheme } from "../theme/ThemeProvider";
import { HOME_MAJOR_MENU_DATA, HOME_MINOR_MENU_DATA } from "../data/HomeData";
import MajorMenu from "../components/Common/MajorMenu";
import MinorMenu from "../components/Common/MinorMenu";

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
          <MajorMenu title="home" menuData={HOME_MAJOR_MENU_DATA} />
          <MinorMenu title="home" centered menuData={HOME_MINOR_MENU_DATA} />
        </View>
      </ScrollView>
    </CustomSafeView>
  );
};

export default HomeScreen;
