import React from "react";
import { Stack } from "expo-router";
import CustomHeaderLeftIcon from "../../../../testApp/components/Common/CustomHeaderLeftIcon";
import CustomHeaderTitle from "../../../../testApp/components/Common/CustomHeaderTitle";
import { useTheme } from "../../../../testApp/theme/ThemeProvider";

const MembersLayout = () => {
  const {
    theme: { colors },
  } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false
        // headerStyle: {
        //   backgroundColor: colors.blue100,
        // },
        // headerLeft: () => <CustomHeaderLeftIcon />,
        // headerTitleAlign: "center",
        // headerTitle: (props) => <CustomHeaderTitle {...props} />,
      }}
    >
      <Stack.Screen name="index" options={{ title: "My Circle" }} />
      <Stack.Screen name="addNominee" options={{ title: "Add Member" }} />
      <Stack.Screen name="updateNominee" options={{ title: "Edit Member" }} />
      <Stack.Screen
        name="assetsWithNominee"
        options={{ title: "Assets with Nominee" }}
      />
    </Stack>
  );
};

export default MembersLayout;
