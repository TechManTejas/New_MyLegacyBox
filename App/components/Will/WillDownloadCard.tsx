import { View, Text, Pressable, StyleSheet, Linking } from "react-native";
import React, { useState } from "react";
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
import { NOMINEE_RELATIONSHIP_TO_TITLE_MAP } from "../../constants/nominee";
import WillBeneficiaryPrevModeToggler from "./WillBeneficiaryPrevModeToggler";
import { PROVIDENT_FUND_TYPE_TO_TITLE_MAP } from "../../constants/financialHoldings/providentFundHolding";
import { REAL_ESTATE_OWNERSHIP_STATUS_TO_TITLE_MAP } from "../../constants/financialHoldings/realEstateHolding";
import { PRIVATE_LIMITED_COMPANY_TYPE_MAP_TO_TITLE_MAP } from "../../constants/financialHoldings/privateLimitedHolding";
import { DEMAT_TYPE_MAP_TO_TITLE_MAP } from "../../constants/financialHoldings/dematHolding";
import {
  POSTAL_ACCOUNT_OWNERSHIP_TO_TITLE_MAP,
  POSTAL_ACCOUNT_TYPES_TO_TITLE_MAP,
} from "../../constants/financialHoldings/postalHolding";
import {
  BANK_ACCOUNT_OWNERSHIP_TO_TITLE_MAP,
  BANK_ACCOUNT_TYPES_TO_TITLE_MAP,
} from "../../constants/financialHoldings/bankHolding";
import WillSecondaryDistPrevCard from "./WillSecondaryDistPrevCard";
import WillAssetBeneficiaryToggler from "./WillAssetBeneficiaryToggler";
import WillResidualDistPrevCard from "./WillResidualDistPrevCard";
import { Switch } from "react-native-paper";
import WillPreviewNomineesCard from "./WillPreviewNomineesCard";

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

    beneficiaryFullName: {
      fontFamily: fontFamily.semiBold,
      color: colors.green700,
    },
    beneficiaryEmail: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      color: colors.blue400,
    },
    beneficiaryRelationship: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      color: colors.black400,
    },
    beneficiaryNameEmail: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
    beneficiaryContainer: {
      marginBottom: spacing.md,
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: spacing.md,
      padding: spacing.md,
      borderColor: colors.black300,
    },
    assetDistContainer: {
      marginTop: spacing.xl,
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-between",
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.black200,
      paddingBottom: spacing.sm,
    },
    assetDistText: {
      fontFamily: fontFamily.semiBold,
      color: colors.blue500,
      fontSize: fontSize.default,
      lineHeight: fontSize.lg,
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

  const getContents = (singleAsset) => {
    let totalContents = [];

    switch (singleAsset.section) {
      case "BANK":
        totalContents = singleAsset.children.map((item) => {
          return [
            {
              key: "Account Type",
              value: BANK_ACCOUNT_TYPES_TO_TITLE_MAP[item.holding.accountType],
            },
            {
              key: "Account Ownership",
              value:
                BANK_ACCOUNT_OWNERSHIP_TO_TITLE_MAP[item.holding.ownership],
            },
            {
              key: "Account Number",
              value: item.holding.accountNumber,
            },
          ];
        });
        break;
      case "POSTAL":
        totalContents = singleAsset.children.map((item, index) => {
          return [
            {
              key: "Account Type",
              value:
                POSTAL_ACCOUNT_TYPES_TO_TITLE_MAP[item.holding.accountType],
            },
            {
              key: "Account Ownership",
              value:
                POSTAL_ACCOUNT_OWNERSHIP_TO_TITLE_MAP[item.holding.ownership],
            },
            {
              key: "Account Number",
              value: item.holding.accountNumber,
            },
          ];
        });
        break;
      case "INSURANCE":
        totalContents = singleAsset.children.map((item, index) => {
          return [
            {
              key: "Policy Name",
              value: item.holding.policyName,
            },
            {
              key: "Policy Type",
              value: item.holding.policyType,
            },
            {
              key: "Policy Number",
              value: item.holding.policyNumber,
            },
          ];
        });
        break;
      case "DEMAT":
        const dematContent = [
          {
            key: "Account Type",
            value:
              DEMAT_TYPE_MAP_TO_TITLE_MAP[singleAsset.asset.holding.dematType],
          },
        ];
        totalContents.push(dematContent);

        break;

      case "PROPRIETORSHIP":
        const proprietorshipContent = [
          {
            key: "Organisation Name",
            value: singleAsset.asset.holding.organisationName,
          },
          {
            key: "GST Number",
            value: singleAsset.asset.holding.gstNumber,
          },
        ];
        totalContents.push(proprietorshipContent);

        break;
      case "PARTNERSHIP":
        const partnershipContent = [
          {
            key: "Firm Name",
            value: singleAsset.asset.holding.nameOfFirm,
          },
          {
            key: "PAN Number",
            value: singleAsset.asset.holding.panNumber,
          },
        ];
        totalContents.push(partnershipContent);

        break;
      case "PRIVATE_LIMITED_COMPANY":
        const privateLimitedCompany = [
          {
            key: "Company Name",
            value: singleAsset.asset.holding.nameOfCompany,
          },
          {
            key: "CIN Number",
            value: singleAsset.asset.holding.cinNumber,
          },
          {
            key: "Nature of Investment",
            value:
              PRIVATE_LIMITED_COMPANY_TYPE_MAP_TO_TITLE_MAP[
                singleAsset.asset.holding.natureOfInvestment
              ],
          },
        ];
        totalContents.push(privateLimitedCompany);

        break;
      case "CASH":
        const cashContent = [
          {
            key: "Date of Transaction",
            value: new Date(singleAsset.asset.holding.dateOfTransaction)
              .toDateString()
              .replace(/^\w+ /, ""),
          },
        ];
        totalContents.push(cashContent);
        break;
      case "REAL_ESTATE":
        const realEstateContent = [
          {
            key: "Ownership Status",
            value:
              REAL_ESTATE_OWNERSHIP_STATUS_TO_TITLE_MAP[
                singleAsset.asset.holding.ownershipStatus
              ],
          },
          {
            key: "Ownership %",
            value: `${singleAsset.asset.holding.ownershipPercentage} %`,
          },
        ];
        totalContents.push(realEstateContent);
        break;
      case "PROVIDENT_FUND":
        const pFContent = [
          {
            key: "UAN",
            value: singleAsset.asset.holding.uan,
          },
          {
            key: "PF Type",
            value:
              PROVIDENT_FUND_TYPE_TO_TITLE_MAP[
                singleAsset.asset.holding.pfType
              ],
          },
        ];
        totalContents.push(pFContent);
        break;

      default:
        break;
    }

    return totalContents;
  };

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

  const [distributionView, setDistributionView] = useState(false);

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

        <WillPreviewNomineesCard
          nomineesList={data?.data?.beneficiaries}
          header="Beneficiaries"
        />

        <WillPreviewNomineesCard
          nomineesList={data?.data?.witnesses}
          header="Witnesses"
        />

        <WillPreviewNomineesCard
          nomineesList={data?.data?.executors}
          header="Executors"
        />

        <View style={styles.assetDistContainer}>
          <Text style={styles.assetDistText}>
            {distributionView
              ? "Distribution by Beneficiaries" 
              : "Distribution by Assets" }
          </Text>
          <Switch
            trackColor={{ false: colors.blue300, true: colors.blue300 }}
            thumbColor={colors.blue500}
            value={distributionView}
            onValueChange={() => setDistributionView((prev) => !prev)}
            style={{ marginBottom: -spacing.md }}
          />
        </View>

        {!distributionView ? (
          <View style={styles.section}>
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
        ) : (
          <View style={{ marginTop: spacing.md }}>
            {data?.data?.beneficiaries.map((beneficiary, idx) => {
              return (
                <View key={idx} style={styles.beneficiaryContainer}>
                  <View style={styles.beneficiaryNameEmail}>
                    <View>
                      <Text style={styles.beneficiaryFullName}>
                        {beneficiary.fullName}
                      </Text>
                      <Text style={styles.beneficiaryEmail}>
                        {beneficiary.email}
                      </Text>
                    </View>
                    <Text style={styles.beneficiaryRelationship}>
                      {
                        NOMINEE_RELATIONSHIP_TO_TITLE_MAP[
                          beneficiary.relationship
                        ]
                      }
                    </Text>
                  </View>

                  <View style={{ marginTop: spacing.md }}>
                    {data?.data?.assets.map((asset, idx2) => {
                      if (
                        Object.keys(asset.allocations).some(
                          (id) => id === beneficiary._id
                        )
                      ) {
                        const detailsCardContent = getContents(asset);

                        return (
                          <WillBeneficiaryPrevModeToggler
                            key={idx2}
                            contents={detailsCardContent}
                            title={asset.itemTitle}
                            percent={asset.allocations[beneficiary._id]}
                          />
                        );
                      }
                    })}
                  </View>
                </View>
              );
            })}
          </View>
        )}

        <WillResidualDistPrevCard residualData={data?.data?.residualDistData} />

        <WillSecondaryDistPrevCard
          secondaryData={data?.data?.secondaryDistData}
        />
      </View>
    );
  }
};

export default WillDownloadCard;
