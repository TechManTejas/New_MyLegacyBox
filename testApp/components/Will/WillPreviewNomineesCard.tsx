import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import UserGroup from "../../assets/icons/users-group.svg";
import { NOMINEE_RELATIONSHIP_TO_TITLE_MAP } from "../../constants/nominee";
import WillMinorTag from "./WillMinorTag";

interface WillPreviewNomineesCardProps {
  nomineesList?: any[];
  header?: string;
}

const WillPreviewNomineesCard: React.FC<WillPreviewNomineesCardProps> = ({
  nomineesList,
  header,
}) => {
  const {
    theme: { spacing, colors, fontFamily, fontSize, tailWindColors },
  } = useTheme();

  const styles = StyleSheet.create({
    nomineesDisplayCard: {
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: spacing.md,
      // paddingVertical: spacing.md,
      // marginHorizontal: spacing.md,
      marginTop: spacing.md,
      borderColor: colors.black300,
      paddingBottom: spacing.md
    },
    nomineesHeader: {
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.black300,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
      paddingBottom: spacing.default,
      backgroundColor: tailWindColors.lime100,
      borderTopLeftRadius: spacing.md,
      borderTopRightRadius: spacing.md,
    },
    nomineeHeaderText: {
      color: colors.blue500,
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.lg,
      lineHeight: fontSize.xl,
      paddingLeft: spacing.lg,
    },
    nomineesCard: {
      paddingHorizontal: spacing.md,
      paddingTop: spacing.md,
    },
    nomineeTitle: {
      fontFamily: fontFamily.semiBold,
    },
    nomineeEmail: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      color: colors.blue400,
    },
    nomineeRelation: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
    },
    nomineeTitleEmail: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
  });

  return (
    <View>
      {nomineesList?.length !== 0 && (
        <View style={styles.nomineesDisplayCard}>

          <View style={styles.nomineesHeader}>
            <UserGroup width={28} height={28} color={colors.blue500} />
            <Text style={styles.nomineeHeaderText}>{header}</Text>
          </View>

          <View>
            {nomineesList?.map((item, index) => {
              return (
                <View key={index} style={styles.nomineesCard}>
                  <View>
                    <View style={styles.nomineeTitleEmail}>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Text style={styles.nomineeTitle}>{item.fullName}</Text>

                        {item.age <18 && <WillMinorTag />}

                      </View>

                      <Text style={styles.nomineeRelation}>
                        {NOMINEE_RELATIONSHIP_TO_TITLE_MAP[item.relationship]}
                      </Text>
                    </View>
                    <Text style={styles.nomineeEmail}>{item.email}</Text>
                  </View>

                  {item?.guardian && (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "flex-end",
                        justifyContent: "space-between",
                        borderWidth: StyleSheet.hairlineWidth,
                        borderRadius: spacing.xs,
                        paddingHorizontal: spacing.sm,
                        paddingVertical: spacing.xs,
                        marginTop: spacing.sm,
                        borderColor: colors.black300,
                        marginBottom: spacing.sm,
                      }}
                    >
                      <View style={{}}>
                        <Text style={{ fontFamily: fontFamily.semiBold }}>
                          Guardian
                        </Text>
                        <Text style={{ fontFamily: fontFamily.regular }}>
                          {item.guardian.fullName}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontFamily: fontFamily.regular,
                          fontSize: fontSize.md,
                          color: colors.blue400,
                        }}
                      >
                        {item.guardian.email}
                      </Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
};

export default WillPreviewNomineesCard;
