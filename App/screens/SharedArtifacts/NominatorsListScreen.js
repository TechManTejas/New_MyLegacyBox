import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { useGetAllNominatorsQuery } from "../../services/assetSharing/assetSharingApiSlice";
import CustomActivityIndicator from "../../components/Common/CustomActivityIndicator";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../../constants/screenNames";
import { FontAwesome5 } from "@expo/vector-icons";
import Empty from "../../components/Common/Empty";

const NominatorsListScreen = () => {
  const navigation = useNavigation();

  const {
    theme: { spacing, fontFamily, colors, fontSize },
  } = useTheme();

  const styles = StyleSheet.create({
    screen: {
      backgroundColor: "white",
      flex: 1,
    },
    nominatorContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      flexWrap: "wrap",
    },
    nominatorWrapper: {
      height: 150,
      width: "50%",
    },
    noMarginRight: {
      marginRight: 0,
    },
    nominatorbtn: {
      elevation: 3,
      alignItems: "center",
      justifyContent: "center",
      padding: spacing.md,
      margin: spacing.lg,
      backgroundColor: "white",
      borderRadius: spacing.xs,
    },
    nomineeName: {
      color: colors.blue500,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.default,
      lineHeight: fontSize.lg,
      paddingTop: spacing.lg,
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
    <ScrollView style={styles.screen}>
      {data.data.length === 0 ? (
        <Empty message="No nominators" />
      ) : (
        <View style={styles.nominatorContainer}>
          {data.data.map((item, index) => {
            return (
              <View style={styles.nominatorWrapper} key={index}>
                <Pressable
                  style={[
                    styles.nominatorbtn,
                    index % 2 === 0 && styles.noMarginRight,
                  ]}
                  onPress={() => openSharedArtifacts(item)}
                >
                  <FontAwesome5
                    name="user-tie"
                    size={fontSize.x4l}
                    color={colors.blue}
                  />
                  <Text style={styles.nomineeName}>
                    {item.nominator.aliasName}
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
};

export default NominatorsListScreen;
