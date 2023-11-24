import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  getPersonalInfoSelector,
  getWill,
} from "../../redux/form/willFormSlice";
import { useTheme } from "../../theme/ThemeProvider";
import { useAuth } from "../../authentication/AuthProvider";
import WillPreviewNomineesCard from "../../components/Will/WillPreviewNomineesCard";
import WillFormContainer from "../../components/Will/WillFormContainer";
import WillAssetByCategoryCard from "../../components/Will/WillAssetByCategoryCard";
import { NOMINEE_RELATIONSHIP_TO_TITLE_MAP } from "../../constants/nominee";
import { useNavigation } from "@react-navigation/native";
import { AllScreenNavigationProp } from "../../navigation/types";
import {
  BANK_ACCOUNT_OWNERSHIP_TO_TITLE_MAP,
  BANK_ACCOUNT_TYPES_TO_TITLE_MAP,
} from "../../constants/financialHoldings/bankHolding";
import {
  POSTAL_ACCOUNT_OWNERSHIP_TO_TITLE_MAP,
  POSTAL_ACCOUNT_TYPES_TO_TITLE_MAP,
} from "../../constants/financialHoldings/postalHolding";
import { DEMAT_TYPE_MAP_TO_TITLE_MAP } from "../../constants/financialHoldings/dematHolding";
import { PRIVATE_LIMITED_COMPANY_TYPE_MAP_TO_TITLE_MAP } from "../../constants/financialHoldings/privateLimitedHolding";
import { REAL_ESTATE_OWNERSHIP_STATUS_TO_TITLE_MAP } from "../../constants/financialHoldings/realEstateHolding";
import { PROVIDENT_FUND_TYPE_TO_TITLE_MAP } from "../../constants/financialHoldings/providentFundHolding";
import WillBeneficiaryPrevModeToggler from "../../components/Will/WillBeneficiaryPrevModeToggler";
import WillSecondaryDistPrevCard from "../../components/Will/WillSecondaryDistPrevCard";
import WillResidualDistPrevCard from "../../components/Will/WillResidualDistPrevCard";
import WillAssetBeneficiaryToggler from "../../components/Will/WillAssetBeneficiaryToggler";
import { Switch } from "react-native-paper";

const WillPreviewScreen = () => {
  const personalInfo = useSelector((state) => getPersonalInfoSelector(state));

  const { session } = useAuth();

  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const styles = StyleSheet.create({
    userInfoCard: {
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: spacing.md,
      marginTop: spacing.md,
      borderColor: colors.black300,
      padding: spacing.md,
    },
    userPropValue: {
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
    },
    userProp: {
      color: colors.blue500,
      fontFamily: fontFamily.semiBold,
    },
    userValue: {
      fontFamily: fontFamily.regular,
    },
    assetSection: {
      marginTop: spacing.lg,
    },
    assetSectionTitle: {
      fontFamily: fontFamily.semiBold,
      color: colors.blue500,
      fontSize: fontSize.default,
      lineHeight: fontSize.lg,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: colors.black200,
      paddingBottom: spacing.xs,
      marginTop: spacing.xl,
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

    screen: { marginHorizontal: spacing.md },

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

  const rawWill = useSelector((state) => getWill(state));

  const navigation = useNavigation<AllScreenNavigationProp>();

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

  const [distributionView, setDistributionView] = useState(false);

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

  return (
    <WillFormContainer
      Handler={() => {
        navigation.navigate("WILL_SIGN_SCREEN");
      }}
      title="Generate"
    >
      <ScrollView style={styles.screen}>
        <View style={styles.userInfoCard}>
          <View style={styles.userPropValue}>
            <Text style={styles.userProp}>Name </Text>
            <Text style={styles.userValue}>{personalInfo.fullName}</Text>
          </View>

          <View style={styles.userPropValue}>
            <Text style={styles.userProp}>Email </Text>
            <Text style={styles.userValue}>
              {session?.identity?.traits.email}
            </Text>
          </View>

          <View style={styles.userPropValue}>
            <Text style={styles.userProp}>Phone No </Text>
            <Text style={styles.userValue}>
              {session?.identity?.traits.phone}
            </Text>
          </View>

          <View style={styles.userPropValue}>
            <Text style={styles.userProp}>Aadhar No </Text>
            <Text style={styles.userValue}>{personalInfo.aadharNumber}</Text>
          </View>
        </View>

        <WillPreviewNomineesCard
          nomineesList={rawWill.beneficiaries}
          header="Beneficiaries"
        />
        <WillPreviewNomineesCard
          nomineesList={rawWill.witnesses}
          header="Witnesses"
        />
        <WillPreviewNomineesCard
          nomineesList={rawWill.executors}
          header="Executors"
        />

        <View style={styles.assetDistContainer}>
          <Text style={styles.assetDistText}>
            {distributionView
              ?   "Distribution by Beneficiaries"
              :  "Distribution by Assets"}
          </Text>
          <Switch
            trackColor={{ false: colors.blue300, true: colors.blue300 }}
            thumbColor={colors.blue500}
            value={distributionView}
            onValueChange={() => setDistributionView((prev) => !prev)}
            style={{ marginBottom: -spacing.md }}
          />
        </View>

        {distributionView ? (
          <View style={{ marginTop: spacing.md }}>
            {rawWill.beneficiaries.map((beneficiary, idx) => {
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
                    {rawWill.assets.map((asset, idx2) => {
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
        ) : (
          <View style={styles.assetSection}>
            {ASSETS_TYPE.map((assetDetail, idx) => (
              <WillAssetByCategoryCard
                key={idx}
                assetList={rawWill.assets.filter(
                  (asset) => asset.section === assetDetail.type
                )}
                title={assetDetail.title}
              />
            ))}
          </View>
        )}

        <WillResidualDistPrevCard residualData={rawWill.residualDistData} />

        <WillSecondaryDistPrevCard secondaryData={rawWill.secondaryDistData} />

        <View style={{ marginBottom: 30 }}></View>
      </ScrollView>
    </WillFormContainer>
  );
};

export default WillPreviewScreen;
