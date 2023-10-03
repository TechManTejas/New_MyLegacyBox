import { View, Text, Pressable, StyleSheet, Linking } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  useGenerateWordFileHashMutation,
  useGetWillQuery,
} from "../../redux/api/will/willApiSlice";
import CustomActivityIndicator from "../Common/CustomActivityIndicator";
import { generateWordFileWillByHashUrl } from "../../redux/api/will/willApiSlice";
import Empty from "../Common/Empty";
import WillAssetByCategoryCard from "./WillAssetByCategoryCard";

const WillDownloadCard = () => {
  const [generateWordFileHash] = useGenerateWordFileHashMutation();

  const { data, isLoading, isFetching } = useGetWillQuery();

  const {
    theme: { spacing, fontFamily, fontSize, colors },
  } = useTheme();

  const styles = StyleSheet.create({
    card: {
      padding: spacing.lg,
      height: "100%",
    },
    willHeader: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      flexWrap: "wrap",
    },
    buttom: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.blue500,
      borderRadius: 5,
      paddingVertical: 2,
      paddingHorizontal: spacing.sm,
    },
    buttomText: {
      color: colors.white,
      paddingRight: 10,
      paddingTop: 2,
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.md,
    },
    section: {
      marginTop: spacing.lg,
    },
    sectionTitle: {
      fontFamily: fontFamily.semiBold,
      color: colors.blue500,
      fontSize: fontSize.default,
      lineHeight: fontSize.lg,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: colors.black200,
      marginBottom: spacing.sm,
      paddingBottom: spacing.xs,
    },
    nomineeInfo: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    nomineeName: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.default,
      lineHeight: fontSize.lg,
      color: colors.black400,
    },
    nomineeEmail: {
      fontFamily: fontFamily.regular,
      color: colors.black300,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
    },
    distribution: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    percent: {
      fontFamily: fontFamily.regular,
      color: colors.black300,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
    },
    itemTitle: {
      fontFamily: fontFamily.semiBold,
      color: colors.green700,
    },
    assetContainer: {
      marginBottom: spacing.md,
    },
    testatorName: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.xxl,
      lineHeight: fontSize.xxl + fontSize.xxs,
      marginBottom: -spacing.xs,
      color: colors.blue500,
    },
    date: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.sm,
      lineHeight: fontSize.md,
      marginTop: spacing.xs,
      color: colors.black300,
    },
    assetHolders: {
      color: colors.black400,
      fontFamily: fontFamily.regular,
    },
    willSubHeader: {
      width: "70%",
    },
  });

  const ASSETS_TYPE = [
    { type: "BANK", title: "Bank" },
    { type: "POSTAL", title: "Postal" },
    { type: "INSURANCE", title: "Insurane" },
    { type: "DEMAT", title: "Demat" },
    { type: "PROPRIETORSHIP", title: "Proprietorship" },
    { type: "PARTNERSHIP", title: "Partnership" },
    { type: "PRIVATE_LIMITED_COMPANY", title: "Private Limited Company" },
    { type: "CASH", title: "Cash" },
    { type: "REAL_ESTATE", title: "Real Estate" },
    { type: "PROVIDENT_FUND", title: "Provident Fund" },
  ];

  const generateDownloadLink = async () => {
    try {
      const result = await generateWordFileHash().unwrap();

      if (result.data && result.status === 200) {
        Linking.openURL(
          generateWordFileWillByHashUrl.replace(":hashedWillId", result.data)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading || isFetching || data === undefined)
    return <CustomActivityIndicator />;

  if (data?.data === null) return <Empty message="No Will Created Yet" />;

  if (data?.data && typeof data.data === "object") {
    return (
      <View style={styles.card}>
        <View style={styles.willHeader}>
          <View style={styles.willSubHeader}>
            <Text style={styles.testatorName}>
              {data.data.personalInfo.fullName}
            </Text>
            <Text style={styles.date}>
              created on{" "}
              {new Date(data.data.willDate).toDateString().replace(/^\w+ /, "")}
            </Text>
          </View>
          <Pressable
            style={styles.buttom}
            onPress={() => generateDownloadLink()}
          >
            <Text style={styles.buttomText}>Download</Text>
            <FontAwesome5 name="download" size={10} color="white" />
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Beneficiaries</Text>
          <View>
            {data.data.beneficiaries.map((beneficiary, idx) => {
              return (
                <View key={idx} style={styles.nomineeInfo}>
                  <Text style={styles.nomineeName}>{beneficiary.fullName}</Text>
                  <Text style={styles.nomineeEmail}>{beneficiary.email}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Witnesses</Text>
          <View>
            {data.data.witnesses.map((witness, idx) => {
              return (
                <View key={idx} style={styles.nomineeInfo}>
                  <Text style={styles.nomineeName}>{witness.fullName}</Text>
                  <Text style={styles.nomineeEmail}>{witness.email}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {data.data.executors !== [] && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Executors</Text>
            <View>
              {data.data.executors.map((executor, idx) => {
                return (
                  <View key={idx} style={styles.nomineeInfo}>
                    <Text style={styles.nomineeName}>{executor.fullName}</Text>
                    <Text style={styles.nomineeEmail}>{executor.email}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Asset Distribution</Text>

          {ASSETS_TYPE.map((assetDetail, idx) => (
            <WillAssetByCategoryCard
              key={idx}
              assetList={data.data.assets.filter(
                (asset) => asset.section === assetDetail.type
              )}
              title={assetDetail.title}
            />
          ))}
        </View>
      </View>
    );
  }
};

export default WillDownloadCard;
