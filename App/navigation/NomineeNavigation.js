import { SCREEN_NAMES } from "../constants/screenNames";
import NomineeScreen from "../screens/NomineeScreen";
import AddNomineeForm from "../components/Nominee/AddNomineeForm";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "../theme/ThemeProvider";
import CustomHeaderLeftIcon from "../components/Common/CustomHeaderLeftIcon";
import CustomHeaderTitle from "../components/Common/CustomHeaderTitle";
import { StyleSheet } from "react-native";
import CustomHeaderRightIcon from "../components/Common/CustomHeaderRightIcon";
import AssetsWithNomineeScreen from "../screens/AssetsWithNomineeScreen";

const Stack = createStackNavigator();

const NomineeNavigation = () => {

  const { theme: { colors } } = useTheme();

  const styles = StyleSheet.create({
    headerStyle: {
      backgroundColor: colors.blue100,
    },
  });

  const message = "A nominee is a person whom the user has chosen to receive his/her database discreetly after him/her."

  return (
    <Stack.Navigator
      initialRouteName={SCREEN_NAMES.nomineeScreen}
      screenOptions={({ navigation }) => ({
        headerStyle: styles.headerStyle,
        headerLeft: () => <CustomHeaderLeftIcon navigation={navigation} />,
        headerRight: () => <CustomHeaderRightIcon message={message} />,
        headerTitleAlign: "center",
        headerTitle: (props) => <CustomHeaderTitle {...props} />,
        headerBackVisible: false,
        animation: "slide_from_right",
      })}
    >
      <Stack.Group>
        <Stack.Screen
          name={SCREEN_NAMES.nomineeScreen}
          component={NomineeScreen}
          options={{
            headerShown: true,
            title: "My Circle",
          }}
        />

        <Stack.Screen
          name={SCREEN_NAMES.addNomineeScreen}
          component={AddNomineeForm}
          options={{
            headerShown: true,
            title: "Add Nominee",
          }}
        />

        <Stack.Screen
          name={SCREEN_NAMES.assetsWithNomineeScreen}
          component={AssetsWithNomineeScreen}
          options={({ route }) => ({
            headerShown: true,
            title: `Shared With ${route.params.nominee}`,
          })}
          
        />

      </Stack.Group>
    </Stack.Navigator>
  );
};

export default NomineeNavigation;
