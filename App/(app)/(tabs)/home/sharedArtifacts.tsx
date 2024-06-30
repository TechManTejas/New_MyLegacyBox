import { View, FlatList, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { useGetSharedArtifactByNominatorWithUidAndTypeQuery } from "../../../../testApp/redux/api/assetSharing/assetSharingApiSlice";
import CustomActivityIndicator from "../../../../testApp/components/Common/CustomActivityIndicator";
import {
  HOLDINGS_NAME_MAP,
  HOLDINGS_PROPS_MAP,
} from "../../../../testApp/data/AllHoldingsPropsData";
import FinancialInstitutionHoldingCard from "../../../../testApp/components/Common/FinancialInstitutionHoldingCard";
import { useTheme } from "../../../../testApp/theme/ThemeProvider";

import CaretUpFilled from "../../../../testApp/assets/icons/caret-up-filled.svg";
import CaretDownFilled from "../../../../testApp/assets/icons/caret-down-filled.svg";
import { useLocalSearchParams } from "expo-router";

interface TypeWiseAssetsProps {
  type: string;
  nominatorHashedUid: string;
}

const TypeWiseAssets: React.FC<TypeWiseAssetsProps> = ({
  type,
  nominatorHashedUid,
}) => {
  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const styles = StyleSheet.create({
    title: {
      color: colors.blue500,
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.lg,
      lineHeight: fontSize.xl,
      paddingBottom: spacing.sm,
      paddingTop: spacing.md,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.black300,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      marginBottom: spacing.sm,
      borderRadius: spacing.xs,
    },
    flatlistStyle: {
      marginBottom: spacing.sm,
    },
  });

  const [showAssets, setShowAssets] = useState(false);

  const { isFetching, isLoading, data } =
    useGetSharedArtifactByNominatorWithUidAndTypeQuery({
      nominatorHashedUid,
      financialArtifactType: type,
    });

  const toggleAssets = () => {
    setShowAssets((prev) => !prev);
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>{HOLDINGS_NAME_MAP[type]}</Text>
        {isFetching || isLoading || data === undefined ? (
          <CustomActivityIndicator extraStyle={{ flex: 0 }} />
        ) : !showAssets ? (
          <CaretDownFilled onPress={toggleAssets} color={colors.black} />
        ) : (
          <CaretUpFilled onPress={toggleAssets} color={colors.black} />
        )}
      </View>

      {showAssets && (
        <FlatList
          style={styles.flatlistStyle}
          data={
            data !== undefined ? data.ids.map((id) => data.entities[id]) : []
          }
          renderItem={({ item, index }) => {
            return (
              <FinancialInstitutionHoldingCard
                key={`TypeWiseAssets-${index}`}
                {...HOLDINGS_PROPS_MAP[type](item.financialArtifact)}
              />
            );
          }}
        />
      )}
    </View>
  );
};

const SharedArtifactsScreen = () => {
  const {
    theme: { spacing, colors },
  } = useTheme();

  const styles = StyleSheet.create({
    screen: {
      backgroundColor: colors.white100,
      flex: 1,
      paddingVertical: spacing.md,
    },
    listContentContainer: {
      flexGrow: 1,
      paddingHorizontal: spacing.lg,
    },
  });

  const { nominatorHashedUid, sharedArtifactsCountByType } =
    useLocalSearchParams();

  return (
    <View style={styles.screen}>
      <FlatList
        contentContainerStyle={styles.listContentContainer}
        data={sharedArtifactsCountByType?.split(",") || []}
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
