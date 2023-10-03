import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../../theme/ThemeProvider";
import { useGetAllNominatorsQuery } from "../../../redux/api/assetSharing/assetSharingApiSlice";
import CustomActivityIndicator from "../../../components/Common/CustomActivityIndicator";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { SCREEN_NAMES } from "../../../constants/screenNames";
import { FontAwesome5 } from "@expo/vector-icons";
import Empty from "../../../components/Common/Empty";
import { useRefetchOnFocus } from "../../../hooks/useRefetchOnFocus";

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

  const { data, isLoading, isFetching, refetch } = useGetAllNominatorsQuery(
    undefined,
    { skip: !useIsFocused }
  );
  useRefetchOnFocus(refetch);

  const openSharedArtifacts = (item) => {
    navigation.navigate(SCREEN_NAMES.sharedAssetsTypeListScreen, {
      nominatorHashedUid: item.nominatorHashedUid,
    });
  };

  if (isLoading || isFetching) return <CustomActivityIndicator />;

  return (
    <View style={styles.screen}>
      {data?.ids.length === 0 ? (
        <Empty message="No nominators" />
      ) : (
        <View style={styles.nominatorContainer}>
          <FlatList
            data={
              data !== undefined ? data.ids.map((id) => data.entities[id]) : []
            }
            numColumns={2}
            renderItem={({ item, index }) => {
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
            }}
          />
        </View>
      )}
    </View>
  );
};

export default NominatorsListScreen;
