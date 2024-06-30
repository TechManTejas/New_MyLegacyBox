import { View, Text, SectionList, StyleSheet } from "react-native";
import React from "react";
import { useGetAssetsLiabilitiesQuery } from "../../../../../testApp/redux/api/vault/assetLiability/asset-liability";
import CustomActivityIndicator from "../../../../../testApp/components/Common/CustomActivityIndicator";
import { useTheme } from "../../../../../testApp/theme/ThemeProvider";
import KeyValueCard from "../../../../../components/KeyValueCard/inddex";
import { artifactsData } from "../../../../../testApp/data/assetLiabilitiesData";

const Liabilities = () => {
  const {
    theme: { colors, fontSize, spacing, fontFamily },
  } = useTheme();

  const { data, isLoading, isFetching } =
    useGetAssetsLiabilitiesQuery(undefined);

  if (isLoading || isFetching) return <CustomActivityIndicator />;

  const liabilitiesData = data.data.liabilities.list;

  const sectionData = Object.keys(liabilitiesData).map((key) => ({
    title: key,
    data: liabilitiesData[key],
  }));

  const styles = StyleSheet.create({
    screen: {
      padding: spacing.md,
      flex: 1,
      backgroundColor: colors.white100
    },
    titleContainer: {},
    titleText: {
      fontSize: fontSize.lg,
      lineHeight: fontSize.xl,
      fontFamily: fontFamily.semiBold,
      color: colors.blue500,
      paddingVertical: spacing.sm,
    },
  });

  return (
    <View style={styles.screen}>
      <SectionList
        sections={sectionData}
        renderItem={({ item, section: { title } }) => {
          return <KeyValueCard keyValueList={artifactsData[title](item)} />;
        }}
        renderSectionHeader={({ section: { title } }) => {
          return (
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{ASSET_TO_TITLE_MAP[title]}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const ASSET_TO_TITLE_MAP = {
  bank: "Bank",
  insurance: "Insurance",
  providentfund: "Provident Fund",
  postal: "Postal",
  demat: "Shares & Securities",
  realestate: "Real Estate",
  cash: "Cash",
};

export default Liabilities;
