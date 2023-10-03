import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";

const WillToggleCard = ({ contents }) => {
  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const styles = StyleSheet.create({
    contentDivider: {
      borderBottomWidth: 1,
      borderStyle: "dashed",
      borderColor: colors.black100,
      marginBottom: spacing.md,
      marginHorizontal: spacing.md
    },
    info: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
    //   color: colors.blue500,
      paddingHorizontal: spacing.sm,
      marginBottom: spacing.xs,
    },
    widthkey: {
      width: "50%",
      color: colors.blue700,
    },
    widthvalue: {
      width: "50%",
      color: colors.blue500,
    },
    textAlignRight: {
      textAlign: "right",
    },
    semiBold: {
      fontFamily: fontFamily.semiBold,
    },
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
    marginBottomXs: {
      marginBottom: spacing.xs,
    },
    cardContainer: {
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.blue500,
      backgroundColor: colors.white300,
      borderRadius: spacing.xs,
      paddingTop: spacing.md,
      marginBottom: spacing.md,
    },
  });

  return (
    <View style={styles.cardContainer}>
      {contents.map((item, index) =>
        item.type == "divider" ? (
          <View key={index} style={styles.contentDivider} />
        ) : (
          <View key={index} style={[styles.row, styles.marginBottomXs]}>
            <Text style={[styles.info, styles.widthkey]}>
              {item?.key ?? "Not available"}
            </Text>
            <Text
              style={[styles.info, styles.widthvalue, styles.textAlignRight]}
            >
              {item?.value ?? "Not available"}
            </Text>
          </View>
        )
      )}
    </View>
  );
};

export default WillToggleCard;
