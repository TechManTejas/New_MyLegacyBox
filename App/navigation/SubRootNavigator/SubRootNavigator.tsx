import React from "react";
import HomeNavigator from "../HomeNavigator/HomeNavigator";
import WillNavigator from "../WillNavigator/WillNavigator";
import NomineeNavigator from "../NomineeNavigator/NomineeNavigator";
import BottomTabNavigator from "../BottomTabNavigator/BottomTabNavigator";
import { useTheme } from "../../theme/ThemeProvider";
import { StyleSheet } from "react-native";
import CustomHeaderLeftIcon from "../../components/Common/CustomHeaderLeftIcon";
import CustomHeaderTitle from "../../components/Common/CustomHeaderTitle";
import CustomHeaderRightIcon from "../../components/Common/CustomHeaderRightIcon";
import { StackType } from "../RootNavigator/RootNavigator";
import SharedArtifactsNavigator from "../DrawerNavigator/SharedArtifactsNavigator";

const SubRootNavigator: React.FC<StackType> = ({ Stack }) => {
  const {
    theme: { colors },
  } = useTheme();

  const styles = StyleSheet.create({
    headerStyle: {
      backgroundColor: colors.blue100,
    },
    drawerItemHidden: {
      height: 0,
      padding: 0,
      margin: 0,
    },
  });

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: styles.headerStyle,
        headerLeft: () => <CustomHeaderLeftIcon navigation={navigation} />,
        headerRight: () => <CustomHeaderRightIcon />,
        headerTitleAlign: "center",
        headerTitle: (props) => <CustomHeaderTitle {...props} />,
      })}
    >
      <Stack.Screen
        name="BOTTOM_STACK_NAVIGATOR"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />

      {HomeNavigator({ Stack })}

      {WillNavigator({ Stack })}

      {NomineeNavigator({ Stack })}
    </Stack.Navigator>
  );
};

export default SubRootNavigator;
