import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import { NOMINEE_RELATIONSHIP_TO_TITLE_MAP } from "../../constants/nominee";

interface WillMemberRelationCardProps {
  membersList: any[];
  guardianCard?: boolean;
}

const WillMemberRelationCard: React.FC<WillMemberRelationCardProps> = ({
  membersList,
  guardianCard,
}) => {
  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const styles = StyleSheet.create({
    container: {
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.black200,
      marginHorizontal: spacing.lg,
      marginBottom: spacing.lg,
      paddingBottom: spacing.md,
      marginTop: spacing.sm,
    },
    leftVal: {
      fontFamily: fontFamily.regular,
      color: colors.blue500,
    },
    rightVal: {
      fontFamily: fontFamily.regular,
      color: colors.blue500,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
    },
    leftRightVal: {
      flexDirection: "row",
      alignItems: "baseline",
      justifyContent: "space-between",
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
    },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: spacing.md,
      paddingTop: spacing.md,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.black200,
    },
    headerText: {
      fontFamily: fontFamily.semiBold,
      color: colors.black300,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          {guardianCard ? " Minor" : "Name"}
        </Text>
        <Text style={styles.headerText}>
          {guardianCard ? "Guardian" : "Relationship"}
        </Text>
      </View>
      {membersList.map((item, index) => {
        return (
          <View key={index} style={styles.leftRightVal}>
            <Text style={styles.leftVal}>
              {guardianCard ? item.fullName : item.fullName}
            </Text>
            <Text style={styles.rightVal}>
              {guardianCard
                ? item.guardian.fullName
                : NOMINEE_RELATIONSHIP_TO_TITLE_MAP[item.relationship]}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default WillMemberRelationCard;
