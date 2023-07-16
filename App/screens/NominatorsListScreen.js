import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { useGetAllNominatorsQuery } from "../services/assetSharing/assetSharingApiSlice";
import CustomActivityIndicator from "../components/Common/CustomActivityIndicator";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../constants/screenNames";
import { FontAwesome5 } from "@expo/vector-icons";
import Empty from "../components/Common/Empty";

const NominatorsListScreen = () => {
  const navigation = useNavigation();

  const {
    theme: { spacing, fontFamily, colors, fontSize },
  } = useTheme();

  const styles = StyleSheet.create({
    screen: {
      backgroundColor: "white",
      flex: 1
    },
    nominatorContainer: {
      flexDirection: "row",
      padding: spacing.md,
      alignItems: "center",
      justifyContent: "center",
    },
    nominatorbtn: {
      elevation: 3,
      alignItems: "center",
      justifyContent: "center",
      padding: spacing.md,
      margin: spacing.sm,
      backgroundColor: "white",
      borderRadius: spacing.xs,
      width: 150,
      height: 150,
    },
    nomineeName: {
      color: colors.blue500,
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.default,
      lineHeight: fontSize.lg,
      paddingTop: spacing.md,
      textAlign: "center",
    },
  });

  const { data, isLoading, isFetching } = useGetAllNominatorsQuery();

  const openSharedArtifacts = (item) => {
    navigation.navigate(SCREEN_NAMES.sharedAssetsTypeListScreen, {
      nominatorHashedUid: item.nominatorHashedUid,
    });
  };

  if (isLoading || isFetching) return <CustomActivityIndicator />;

  return (
    <View style={styles.screen}>
      {data.data.length === 0 ? (
        <Empty message="No nominators" />
      ) : (
        <View style={styles.nominatorContainer}>
          {data.data.map((item, index) => {
            return (
              <Pressable
                style={styles.nominatorbtn}
                key={index}
                onPress={() => openSharedArtifacts(item)}
              >
                <FontAwesome5
                  name="user-tie"
                  size={spacing.xxl}
                  color="black"
                />
                <Text style={styles.nomineeName}>
                  {item.nominator.aliasName}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default NominatorsListScreen;
