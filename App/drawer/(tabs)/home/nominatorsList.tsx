import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../../../testApp/theme/ThemeProvider";
import { useGetAllNominatorsQuery } from "../../../../testApp/redux/api/assetSharing/assetSharingApiSlice";
import CustomActivityIndicator from "../../../../testApp/components/Common/CustomActivityIndicator";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Empty from "../../../../testApp/components/Common/Empty";
import { useRefetchOnFocus } from "../../../../testApp/hooks/useRefetchOnFocus";
import { HOLDINGS_NAME_MAP } from "../../../../testApp/data/AllHoldingsPropsData";
import { useRouter } from "expo-router";

const AssetPill = ({ assetName, count }) => {
  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      borderRadius: spacing.sm,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      marginTop: spacing.xs,
      backgroundColor: colors.blue100,
      alignItems: "center",
      marginRight: spacing.xs,
    },
    assetName: {
      color: colors.blue500,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.sm,
    },
    shareNum: {
      fontSize: fontSize.sm,
      lineHeight: fontSize.md,
      color: colors.blue500,
      fontFamily: fontFamily.regular,
      marginLeft: spacing.sm,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.assetName}>{HOLDINGS_NAME_MAP[assetName]}</Text>
      <Text style={styles.shareNum}>{count > 9 ? "+9" : count}</Text>
    </View>
  );
};

const AssetSharerCard = ({
  name,
  nominatorHashedUid,
  sharedArtifactsCountByType,
}) => {

    const router = useRouter()

  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const styles = StyleSheet.create({
    container: {
      borderWidth: StyleSheet.hairlineWidth,
      padding: spacing.md,
      borderRadius: spacing.xs,
      flexShrink: 1,
      borderColor: colors.black200,
      marginBottom: spacing.md,
    },
    header: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
    button: {
      backgroundColor: colors.blue500,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: spacing.xs,
    },
    buttonText: {
      color: "white",
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.md,
      lineHeight: fontSize.lg,
    },
    nameText: {
      fontFamily: fontFamily.semiBold,
      color: colors.blue500,
      fontSize: fontSize.xl,
      lineHeight: fontSize.xxl,
      marginBottom: spacing.xxs,
    },
    shareText: {
      fontFamily: fontFamily.regular,
      color: colors.black400,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
    },
    pillsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      flexShrink: 1,
    },
    footer: {
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-between",
      paddingTop: spacing.lg,
    },
    extraAssetsText: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
    },
  });

  const viewAllAssets = () => {

    router.push({ pathname: "/drawer/home/sharedArtifacts", params: {
        nominatorHashedUid,
        sharedArtifactsCountByType,
    } })

  };

  let totalAssets = 0;
  Object.entries(sharedArtifactsCountByType).forEach(([_, count]) => {
    totalAssets += count;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.shareText}>Shared 4 assets with you</Text>
        </View>

        <Pressable style={styles.button} onPress={viewAllAssets}>
          <Text style={styles.buttonText}>View all</Text>
        </Pressable>
      </View>
      <View style={styles.footer}>
        <View style={styles.pillsContainer}>
          {Object.entries(sharedArtifactsCountByType)
            .slice(0, 3)
            .map((prop) => {
              return <AssetPill assetName={prop[0]} count={prop[1]} />;
            })}
        </View>
        {totalAssets > 3 ? (
          <Text style={styles.extraAssetsText}>
            +{totalAssets - 3} assets shared
          </Text>
        ) : (
          <Text></Text>
        )}
      </View>
    </View>
  );
};

const NominatorsListScreen = () => {
  const {
    theme: { spacing, fontFamily, colors, fontSize },
  } = useTheme();

  const styles = StyleSheet.create({
    screen: {
      backgroundColor: "white",
      flex: 1,
    },
    nominatorContainer: {},
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
    flatlistStyle: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
    },
  });

  const { data, isLoading, isFetching, refetch } = useGetAllNominatorsQuery(
    undefined,
    { skip: !useIsFocused }
  );

  useRefetchOnFocus(refetch);

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
            style={styles.flatlistStyle}
            renderItem={({ item, index }) => {
              if (item?.hasOwnProperty("sharedArtifactsCountByType"))
                return (
                  <AssetSharerCard
                    key={index}
                    name={item?.nominator?.aliasName}
                    nominatorHashedUid={item?.nominatorHashedUid}
                    sharedArtifactsCountByType={
                      item?.sharedArtifactsCountByType
                    }
                  />
                );
            }}
          />
        </View>
      )}
    </View>
  );
};

export default NominatorsListScreen;
