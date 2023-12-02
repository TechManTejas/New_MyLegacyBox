import React, { useState, useCallback } from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";
import WillNamePercentCard from "./WillNamePercentCard";
import { useTheme } from "../../theme/ThemeProvider";
import { FontAwesome } from "@expo/vector-icons";
import WillToggleCard from "./WillToggleCard";
import {
  BANK_ACCOUNT_OWNERSHIP_TO_TITLE_MAP,
  BANK_ACCOUNT_TYPES_TO_TITLE_MAP,
} from "../../constants/financialHoldings/bankHolding";
import {
  POSTAL_ACCOUNT_OWNERSHIP_TO_TITLE_MAP,
  POSTAL_ACCOUNT_TYPES_TO_TITLE_MAP,
} from "../../constants/financialHoldings/postalHolding";
import { DEMAT_TYPE_MAP_TO_TITLE_MAP } from "../../constants/financialHoldings/dematHolding";
import { REAL_ESTATE_OWNERSHIP_STATUS_TO_TITLE_MAP } from "../../constants/financialHoldings/realEstateHolding";
import { PROVIDENT_FUND_TYPE_TO_TITLE_MAP } from "../../constants/financialHoldings/providentFundHolding";
import { PRIVATE_LIMITED_COMPANY_TYPE_MAP_TO_TITLE_MAP } from "../../constants/financialHoldings/privateLimitedHolding";

const WillAssetDisplayCard = ({ asset }) => {
  const [infoCardVisible, setInfoCardVisible] = useState(false);

  const toggleInfoButton = () => {
    setInfoCardVisible((prev) => !prev);
  };

  const {
    theme: { fontFamily, colors, spacing },
  } = useTheme();

  const styles = StyleSheet.create({
    itemTitle: {
      fontFamily: fontFamily.semiBold,
      color: colors.green700,
      flexShrink: 1,
    },
    assetContainer: {
      marginBottom: spacing.md,
    },
    button: {
      marginLeft: spacing.sm,
      backgroundColor: colors.black100,
      padding: spacing.xs,
      borderRadius: spacing.xs,
    },
    titleButtonContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
  });

  const getContents = useCallback(
    (singleAsset) => {
      let totalContents = [];

      switch (singleAsset.section) {
        case "BANK":
          totalContents = singleAsset.children.map((item) => {
            return [
              {
                key: "Account Type",
                value:
                  BANK_ACCOUNT_TYPES_TO_TITLE_MAP[item.holding.accountType],
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
                DEMAT_TYPE_MAP_TO_TITLE_MAP[
                  singleAsset.asset.holding.dematType
                ],
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
    },
    [asset]
  );

  return (
    <View
      style={[
        styles.assetContainer,
        {
          padding: spacing.md,
          borderRadius: spacing.md,
          backgroundColor: colors.white100,
        },
      ]}
    >
      <View style={styles.titleButtonContainer}>
        <Text style={styles.itemTitle}>{asset.itemTitle}</Text>
        <Pressable onPress={toggleInfoButton} style={styles.button}>
          <FontAwesome
            name={infoCardVisible ? "arrow-up" : "arrow-down"}
            size={10}
            color={colors.black300}
          />
        </Pressable>
      </View>

      {infoCardVisible ? (
        <View style={{ marginTop: spacing.xs }}>
          {getContents(asset).map((item, index) => (
            <WillToggleCard
              key={index + "will-toggle-card" + item[0].value}
              contents={item}
            />
          ))}
        </View>
      ) : null}

      <View>
        {Object.entries(asset.allocations).map(([_id, percent], idx) => {
          if (percent !== 0)
            return (
              <WillNamePercentCard key={idx} percent={percent} _id={_id} />
            );
        })}
      </View>
    </View>
  );
};

export default WillAssetDisplayCard;
