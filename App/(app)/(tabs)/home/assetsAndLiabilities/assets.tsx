import { View, Text, SectionList, StyleSheet } from "react-native";
import React from "react";
import { useGetAssetsLiabilitiesQuery } from "../../../../../testApp/redux/api/vault/assetLiability/asset-liability";
import CustomActivityIndicator from "../../../../../testApp/components/Common/CustomActivityIndicator";
import { useTheme } from "../../../../../testApp/theme/ThemeProvider";
import KeyValueCard from "../../../../../components/KeyValueCard/inddex";
import { artifactsData } from "../../../../../testApp/data/assetLiabilitiesData";

const Assets = () => {
  const {
    theme: { colors, fontSize, spacing, fontFamily },
  } = useTheme();

  const { data, isLoading, isFetching } =
    useGetAssetsLiabilitiesQuery(undefined);

  if (isLoading || isFetching) return <CustomActivityIndicator />;

  const assetsData = data.data.assets.list;
  console.log(JSON.stringify(assetsData, null, 1));
  

  const sectionData = Object.keys(data.data.assets.list).map((key) => ({
    title: key,
    data: assetsData[key],
  }));

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.white100,
    },
    titleContainer: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md
    },
    titleText: {
      fontSize: fontSize.lg,
      lineHeight: fontSize.xl,
      fontFamily: fontFamily.semiBold,
      color: colors.blue500,
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
        SectionSeparatorComponent={() => (
          <View style={{ borderWidth: 0, padding: 10 }} />
        )}
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
  proprietorship: "Proprietorship",
  partnership: "Partnership",
  privatelimitedcompany: "Private Limited Company"
};

export default Assets;
