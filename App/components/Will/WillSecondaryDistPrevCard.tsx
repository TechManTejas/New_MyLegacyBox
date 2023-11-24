import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import { NOMINEE_RELATIONSHIP_TO_TITLE_MAP } from "../../constants/nominee";

interface WillSecondaryDistPrevCardProps {
  secondaryData: any[];
}

const WillSecondaryDistPrevCard: React.FC<WillSecondaryDistPrevCardProps> = ({
  secondaryData,
}) => {
  const {
    theme: { spacing, colors, fontFamily, fontSize },
  } = useTheme();

  const styles = StyleSheet.create({
    titleContainer: {
      // marginTop: spacing.lg,
      marginBottom: spacing.sm,
      // borderBottomWidth: StyleSheet.hairlineWidth,
      // borderBottomColor: colors.black200,
      // paddingBottom: spacing.sm,
    },
    titleText: {
      fontFamily: fontFamily.semiBold,
      color: colors.blue500,
    },

    secondaryCard: {
      padding: spacing.md,
      // borderWidth: StyleSheet.hairlineWidth,
      // borderColor: colors.black300,
      borderRadius: spacing.md,
      marginBottom: spacing.md,
      backgroundColor: colors.white100
    },
    secondarySection: {},
    secondaryName: {
      fontFamily: fontFamily.regular,
    },
    secondaryEmail: {
      fontFamily: fontFamily.regular,
      color: colors.blue400,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
    },
    secondaryRelationship: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      color: colors.black300,
    },
    secondaryMemberInfo: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },

    dist1Container: { marginTop: spacing.md },
    dist1Text: { fontFamily: fontFamily.regular },

    dist2Container: { marginTop: spacing.md },
    dist2Text: { fontFamily: fontFamily.regular },

    fullNameText: { fontFamily: fontFamily.regular },
    emailText: {
      color: colors.blue400,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
    },
    percentText: {
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      color: colors.black300,
      fontFamily: fontFamily.regular,
    },

    distCard: {
      marginTop: spacing.md,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
  });

  return (
    secondaryData.length !== 0 && (
      <View style={{  borderRadius: spacing.md, padding: spacing.md, marginTop: spacing.lg, backgroundColor: colors.white400 }}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Contigent Distribution</Text>
        </View>

        <View>
          {secondaryData.map((item, index) => {
            if (item.distType !== 0) {
              return (
                <View key={index} style={styles.secondaryCard}>
                  <View style={styles.secondaryMemberInfo}>
                    <View>
                      <Text style={styles.secondaryName}>
                        {item.beneficiary.fullName}
                      </Text>
                      <Text style={styles.secondaryEmail}>
                        {item.beneficiary.email}
                      </Text>
                    </View>
                    <Text style={styles.secondaryRelationship}>
                      {
                        NOMINEE_RELATIONSHIP_TO_TITLE_MAP[
                          item.beneficiary.relationship
                        ]
                      }
                    </Text>
                  </View>

                  {item.distType === 1 && (
                    <View style={styles.dist1Container}>
                      <Text style={styles.dist1Text}>
                        Lineal Descendant Chosen
                      </Text>
                    </View>
                  )}

                  {item.distType === 2 && (
                    <View style={styles.dist2Container}>
                      <Text style={styles.dist2Text}>
                        Distributed among other beneficiaries as follows
                      </Text>
                    </View>
                  )}

                  {item.distType === 2 && (
                    <View>
                      {item.distribution.map((item2, index2) => {
                        if (item2.percent !== "0")
                          return (
                            <View key={index2} style={styles.distCard}>
                              <View>
                                <Text style={styles.fullNameText}>
                                  {item2.beneficiary.fullName}
                                </Text>
                                <Text style={styles.emailText}>
                                  {item2.beneficiary.email}
                                </Text>
                              </View>
                              <Text style={styles.percentText}>
                                {item2.percent} %
                              </Text>
                            </View>
                          );
                      })}
                    </View>
                  )}
                </View>
              );
            }
          })}
        </View>
      </View>
    )
  );
};

export default WillSecondaryDistPrevCard;
