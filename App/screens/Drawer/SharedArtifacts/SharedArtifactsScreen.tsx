import { View, FlatList, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { useGetSharedArtifactByNominatorWithUidAndTypeQuery } from "../../../redux/api/assetSharing/assetSharingApiSlice";
import CustomActivityIndicator from "../../../components/Common/CustomActivityIndicator";
import { HOLDINGS_NAME_MAP, HOLDINGS_PROPS_MAP } from "../../../data/AllHoldingsPropsData";
import FinancialInstitutionHoldingCard from "../../../components/Common/FinancialInstitutionHoldingCard";
import { useTheme } from "../../../theme/ThemeProvider";

const TypeWiseAssets = ({ type, nominatorHashedUid }: { type: string, nominatorHashedUid: string }) => {

  const { theme: { colors, fontFamily, fontSize, spacing } } = useTheme()

  const styles = StyleSheet.create({
    title: {
      color: colors.blue500,
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.lg,
      lineHeight: fontSize.xl,
      paddingBottom: spacing.sm,
      paddingTop: spacing.md
    }
  })

  const { isFetching, isLoading, data } =
    useGetSharedArtifactByNominatorWithUidAndTypeQuery({
      nominatorHashedUid,
      financialArtifactType: type,
    });


  if (isFetching || isLoading || data === undefined)
    return <CustomActivityIndicator />;

  return (
    <View>
      <Text style={styles.title}>{HOLDINGS_NAME_MAP[type]}</Text>
    <FlatList
      data={data !== undefined ? data.ids.map((id) => data.entities[id]) : []}
      renderItem={({ item }) => {
        return (
          <FinancialInstitutionHoldingCard
            {...HOLDINGS_PROPS_MAP[type](item.financialArtifact)}
          />
        );
      }}
    />
    </View>
  );
};

const SharedArtifactsScreen = ({ route }) => {
  const {
    theme: { spacing, colors },
  } = useTheme();

  const styles = StyleSheet.create({
    screen: {
      backgroundColor: colors.white100,
      flex: 1
    },
    listContentContainer: {
      flexGrow: 1,
      paddingHorizontal: spacing.lg,
      // paddingVertical: spacing.lg
    },
  });

  const { nominatorHashedUid, sharedArtifactsCountByType } = route.params;

  return (
    <View style={styles.screen}>
      <FlatList
        contentContainerStyle={styles.listContentContainer}
        data={Object.keys(sharedArtifactsCountByType || [])}
        renderItem={({ item }) => {
          return (
            <TypeWiseAssets
              type={item}
              nominatorHashedUid={nominatorHashedUid}
            />
          );
        }}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

export default SharedArtifactsScreen;
