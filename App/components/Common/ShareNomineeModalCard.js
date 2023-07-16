import { View, Text, StyleSheet, Pressable } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { FontAwesome } from "@expo/vector-icons";
import { NOMINEE_RELATIONSHIP_TO_TITLE_MAP } from "../../constants/nominee";

const ShareNomineeModalCard = ({
  callBack,
  item,
  isApproved,
  disableCallback,
}) => {
  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const styles = StyleSheet.create({
    icon: {
      fontSize: fontSize.xl,
      color: colors.green600,
    },
    modalcard: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.black200,
      borderRadius: spacing.sm,
      padding: spacing.md,
      marginTop: spacing.sm,
      marginHorizontal: spacing.sm,
    },
    nomineename: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.lg,
      lineHeight: spacing.xl,
      color: colors.black400,
    },
    nomineerelationship: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.regular,
      color: colors.black300,
    },
    approvednominee: {
      borderColor: colors.green600,
      backgroundColor: colors.green100,
    },
    approvedtextcolor: {
      color: colors.green700,
    },
  });

  return (
    <Pressable
      disabled={disableCallback}
      onPress={callBack}
      style={[styles.modalcard, isApproved && styles.approvednominee]}
    >
      <View>
        <Text
          style={[styles.nomineename, isApproved && styles.approvedtextcolor]}
        >
          {item.fullName}
        </Text>
        <Text
          style={[
            styles.nomineerelationship,
            isApproved && styles.approvedtextcolor,
          ]}
        >
          {NOMINEE_RELATIONSHIP_TO_TITLE_MAP[item.relationship]}
        </Text>
      </View>
      <FontAwesome
        name={isApproved ? "check-circle" : "circle-o"}
        size={styles.icon.fontSize}
        color={isApproved ? styles.icon.color : colors.black300}
      />
    </Pressable>
  );
};

export default ShareNomineeModalCard;
