import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import WillAssetDisplayCard from "./WillAssetDisplayCard";

interface WillAssetByCategoryCardProps {
  assetList: any[];
  title: string;
}

const WillAssetByCategoryCard: React.FC<WillAssetByCategoryCardProps> = ({
  assetList,
  title,
}) => {
  const {
    theme: { fontFamily, colors, spacing, fontSize },
  } = useTheme();

  const styles = StyleSheet.create({
    cardContainer: {
      paddingBottom: spacing.sm,
      // borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.black200,
      marginBottom: spacing.lg,
    },
    categoryTitleContainer: {
      // borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.black200,
      paddingBottom: spacing.sm,
    },
    categoryTitle: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.default,
      lineHeight: fontSize.lg,
    },
    allAssetContainer: {
      paddingTop: spacing.xs,
    },
  });

  return assetList.length ? (
    <View style={styles.cardContainer}>
      <View style={styles.categoryTitleContainer}>
        <Text style={styles.categoryTitle}>{title}</Text>
      </View>
      <View style={styles.allAssetContainer}>
        {assetList.map((asset, idx) => (
          <WillAssetDisplayCard key={idx} asset={asset} />
        ))}
      </View>
    </View>
  ) : null;
};

export default WillAssetByCategoryCard;
