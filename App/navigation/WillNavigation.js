import { SCREEN_NAMES } from "../constants/screenNames";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "../theme/ThemeProvider";
import CustomHeaderLeftIcon from "../components/Common/CustomHeaderLeftIcon";
import CustomHeaderTitle from "../components/Common/CustomHeaderTitle";
import { StyleSheet } from "react-native";
import WillScreen from "../screens/Will/WillScreen";
import WillAssetsScreen from "../screens/Will/WillAssetsScreen";
import WillAssetInfoScreen from "../screens/Will/WillAssetInfoScreen";
import WillDeclarationScreen from "../screens/Will/WillDeclarationScreen";
import WillGenerationScreen from "../screens/Will/WillGenerationScreen";
import WillInfoScreen from "../screens/Will/WillInfoScreen";
import CustomHeaderRightIcon from "../components/Common/CustomHeaderRightIcon";
import UpdateNomineeForm from "../components/Nominee/UpdateNomineeForm";
import AddNomineeForm from "../components/Nominee/AddNomineeForm";

const Stack = createStackNavigator();

const WillNavigation = () => {
  const {
    theme: { colors },
  } = useTheme();

  const styles = StyleSheet.create({
    headerStyle: {
      backgroundColor: colors.blue100,
    },
  });

  return (
    <Stack.Navigator
      initialRouteName={SCREEN_NAMES.willScreen}
      screenOptions={({ navigation }) => ({
        headerStyle: styles.headerStyle,
        headerLeft: () => <CustomHeaderLeftIcon navigation={navigation} />,
        headerTitleAlign: "center",
        headerTitle: (props) => <CustomHeaderTitle {...props} />,
        headerBackVisible: false,
        animation: "slide_from_right",
      })}
    >
      <Stack.Group>
        <Stack.Screen
          name={SCREEN_NAMES.willScreen}
          component={WillScreen}
          options={{
            headerShown: true,
            title: "Will",
          }}
        />

        <Stack.Screen
          name={SCREEN_NAMES.willInfoScreen}
          component={WillInfoScreen}
          options={{
            headerShown: true,
            title: "My Will",
          }}
        />

        <Stack.Screen
          name={SCREEN_NAMES.willAssetsScreen}
          component={WillAssetsScreen}
          options={{
            headerShown: true,
            title: "My Assets",
          }}
        />

        <Stack.Screen
          name={SCREEN_NAMES.willAssetInfoScreen}
          component={WillAssetInfoScreen}
          options={{
            headerShown: true,
            title: "Asset Allocation",
          }}
        />

        <Stack.Screen
          name={SCREEN_NAMES.willDeclarationScreen}
          component={WillDeclarationScreen}
          options={{
            headerShown: true,
            title: "Declaration",
          }}
        />

        <Stack.Screen
          name={SCREEN_NAMES.willGenerationScreen}
          component={WillGenerationScreen}
          options={{
            headerShown: true,
            title: "E-Will Generation",
          }}
        />

        <Stack.Screen
          name={SCREEN_NAMES.willAddNomineeScreen}
          component={AddNomineeForm}
          options={({ route }) => ({
            headerShown: true,
            title: "Add a Member",
          })}
        />

        <Stack.Screen
          name={SCREEN_NAMES.willUpdateNomineeScreen}
          component={UpdateNomineeForm}
          options={({ route }) => ({
            headerShown: true,
            title: `Edit ${route.params.nominee.fullName}'s Details`,
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default WillNavigation;
