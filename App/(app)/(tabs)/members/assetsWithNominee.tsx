import { FlatList, StyleSheet, Text, View } from "react-native";
import {
  useGetAllAssetSharedToANomineeQuery,
  useRevokeAssetAccessFromNomineeMutation,
} from "../../../../testApp/redux/api/assetSharing/assetSharingApiSlice";
import { useTheme } from "../../../../testApp/theme/ThemeProvider";
import CustomActivityIndicator from "../../../../testApp/components/Common/CustomActivityIndicator";
import NomineeFinancialArtifactViewCard from "../../../../testApp/components/Nominee/NomineeFinancialArtifactViewCard";
import {
  INSTITUTES_NAME_MAP,
  INSTITUTE_PROPS_MAP,
  institutes,
} from "../../../../testApp/data/NomineeArtifactPropsData";
import Empty from "../../../../testApp/components/Common/Empty";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const AssetsWithNomineeScreen = () => {
  const { nomineeEmail } = useLocalSearchParams();

  const {
    theme: { spacing, fontFamily, fontSize, colors },
  } = useTheme();

  const styles = StyleSheet.create({
    screen: {
      backgroundColor: "white",
      paddingHorizontal: spacing.md,
      paddingBottom: spacing.lg,
      height: "100%",
    },
    btn: {
      backgroundColor: colors.blue500,
      borderRadius: spacing.xs,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.sm,
    },
    btntext: {
      color: colors.white,
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
    },
    assetcard: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.black300,
      margin: spacing.md,
      padding: spacing.sm,
    },
    assetCountText: {
      textAlign: "center",
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.lg,
      lineHeight: fontSize.xl,
      padding: 15,
      color: colors.blue500,
    },
    assetCountDiv: {
      backgroundColor: "white",
      elevation: 3,
      borderRadius: spacing.sm,
      marginBottom: spacing.md,
    },
    sectiontitle: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.lg,
      lineHeight: fontSize.xl,
    },
    section: {
      paddingVertical: spacing.md,
    },
  });

  const [revokeAssetAccessFromNominee] =
    useRevokeAssetAccessFromNomineeMutation();

  const revokeAssetAccess = (financialArtifactId) => {
    const assetAndNomineeDetails = {
      nomineeEmail,
      financialArtifactId,
    };
    revokeAssetAccessFromNominee(assetAndNomineeDetails);
  };

  const { data, isLoading, isFetching } =
    useGetAllAssetSharedToANomineeQuery(nomineeEmail);

  if (isLoading || isFetching) return <CustomActivityIndicator />;

  const filterArtifact = (institute) =>
    Object.values(data.entities).filter(
      (item) => item.financialArtifactType === institute
    );

  const allArtifactsData = institutes.map((institute) => ({
    artifactsData: filterArtifact(institute),
    cardProps: INSTITUTE_PROPS_MAP[institute],
    institute,
  }));

  return (
    <View style={styles.screen}>
      {data.ids.length === 0 || data === undefined ? (
        <Empty message="No data to show" />
      ) : (
        <View>
          <FlatList
            data={allArtifactsData}
            renderItem={(m) => {
              if (m.item.artifactsData.length !== 0) {
                return (
                  <View>
                    <View style={styles.section}>
                      <Text style={styles.sectiontitle}>
                        {INSTITUTES_NAME_MAP[m.item.institute]}
                      </Text>
                    </View>
                    <FlatList
                      key={m.index}
                      data={m.item.artifactsData}
                      renderItem={({ item, index }) => (
                        <NomineeFinancialArtifactViewCard
                          key={index}
                          {...m.item.cardProps(item)}
                          revokeButtonCallBack={() =>
                            revokeAssetAccess(item.financialArtifact._id)
                          }
                        />
                      )}
                    />
                  </View>
                );
              }
            }}
          />
        </View>
      )}
    </View>
  );
};

export default AssetsWithNomineeScreen;
