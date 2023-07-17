import { SCREEN_NAMES } from "../constants/screenNames";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "../theme/ThemeProvider";
import CustomHeaderLeftIcon from "../components/Common/CustomHeaderLeftIcon";
import CustomHeaderTitle from "../components/Common/CustomHeaderTitle";
import { StyleSheet } from "react-native";
import NominatorsListScreen from "../screens/SharedArtifacts/NominatorsListScreen";
import SharedAssetsTypeListScreen from "../screens/SharedArtifacts/SharedAssetsTypeListScreen";
import SingleSharedArtifactTypeScreen from "../screens/SharedArtifacts/SingleSharedArtifactTypeScreen";

const Stack = createStackNavigator();

const SharedArtifactsNavigation = () => {
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
      initialRouteName={SCREEN_NAMES.nominatorsListScreen}
      screenOptions={({ navigation }) => ({
        headerStyle: styles.headerStyle,
        headerLeft: () => <CustomHeaderLeftIcon navigation={navigation} />,
        headerTitleAlign: "center",
        headerTitle: (props) => <CustomHeaderTitle {...props} />,
      })}
    >
      <Stack.Group>
        <Stack.Screen
          name={SCREEN_NAMES.nominatorsListScreen}
          component={NominatorsListScreen}
          options={{
            headerShown: true,
            title: "Nominators",
          }}
        />

        <Stack.Screen
          name={SCREEN_NAMES.sharedAssetsTypeListScreen}
          component={SharedAssetsTypeListScreen}
          options={{
            headerShown: true,
            title: "Shared Artifacts Types",
          }}
        />

        <Stack.Screen
          name={SCREEN_NAMES.singleSharedArtifactTypeScreen}
          component={SingleSharedArtifactTypeScreen}
          options={{
            headerShown: true,
            title: "Artifacts",
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default SharedArtifactsNavigation;
