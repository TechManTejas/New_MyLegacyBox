import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import FinancialHoldingItemWrapper from "../FinancialHolding/FinancialHoldingItemWrapper";
import CustomPill from "./Pill/CustomPill";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import React from "react";

interface ContentProps {
  type?: string;
  key: string;
  value: string;
}

interface FinancialInstitutionHoldingCardProps {
  holdingClass: string;
  updatedAt: string;
  content: ContentProps[];
  title: string;
  tagLabel: string;
  editButtonCallBack: () => void;
  shareButtonCallBack: () => void;
  notesButtonCallBack: () => void;
  deleteButtonCallBack: () => void;
  widthKey: number;
}

const FinancialInstitutionHoldingCard: React.FC<
  FinancialInstitutionHoldingCardProps
> = ({
  holdingClass,
  updatedAt,
  content,
  title,
  tagLabel,
  editButtonCallBack,
  shareButtonCallBack,
  notesButtonCallBack,
  deleteButtonCallBack,
  widthKey,
}) => {
  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const styles = StyleSheet.create({
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
    marginBottomXs: {
      marginBottom: spacing.xs,
    },
    marginTopXxs: {
      marginTop: spacing.xxs,
    },
    marginLeftSm: {
      marginLeft: spacing.sm,
    },
    paddingVerticalXxs: {
      paddingTop: 10,
      paddingHorizontal: spacing.md,
      paddingBottom: spacing.sm,
    },
    semiBold: {
      fontFamily: fontFamily.semiBold,
    },
    devider: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: colors.black100,
      marginBottom: spacing.md,
      marginTop: spacing.xs,
      marginHorizontal: spacing.md,
    },
    contentDivider: {
      borderBottomWidth: 1,
      borderStyle: "dashed",
      borderColor: colors.black100,
      marginBottom: spacing.md,
      marginHorizontal: spacing.md,
    },
    name: {
      fontFamily: fontFamily.semiBold,
      color: colors.blue500,
      fontSize: fontSize.xl,
      lineHeight: fontSize.xxl,
      width: "55%",
    },
    type: {
      fontFamily: fontFamily.regular,
      color: colors.blue400,
      fontSize: fontSize.default,
      lineHeight: fontSize.lg,
      marginBottom: spacing.xs,
    },
    infoHeaderContainer: {
      paddingHorizontal: spacing.md,
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      flexWrap: "wrap",
    },
    info: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      color: colors.black400,
      paddingHorizontal: spacing.md,
      marginBottom: spacing.xs,
    },
    amount: {
      paddingHorizontal: spacing.md,
      fontFamily: fontFamily.regular,
    },
    accountNumber: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      color: colors.black400,
      paddingHorizontal: spacing.md,
      marginBottom: spacing.xs,
    },
    financialHoldingLastUpdated: {
      paddingHorizontal: spacing.md,
      marginBottom: spacing.sm,
      color: colors.black300,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
    },
    buttom: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.blue500,
      borderRadius: 5,
      padding: spacing.sm,
    },
    buttomText: {
      color: colors.white,
      paddingRight: 8,
      // paddingTop: 2,
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.sm,
      lineHeight: fontSize.md,
    },
    halfWidth: {
      width: "50%",
    },
    textAlignRight: {
      textAlign: "right",
    },
    widthkey: {
      width: `${widthKey ? widthKey : 50}%`,
    },
    widthvalue: {
      width: `${widthKey ? 100 - widthKey : 50}%`,
    },
    btngroup: {
      flexDirection: "row",
      alignItems: "center",
    },
    sharebtn: {
      marginLeft: spacing.xs,
    },
    notesbtn: {
      marginRight: spacing.xs,
      backgroundColor: colors.white400,
    },
    notesbtntext: {
      color: colors.blue500,
    },
  });

  return (
    <FinancialHoldingItemWrapper
      shareBtnCallBack={shareButtonCallBack}
      holdingClass={holdingClass}
    >
      <View style={styles.infoHeaderContainer}>
        <Text style={styles.name}>{title || "Policy"}</Text>
        <View style={styles.btngroup}>
          {notesButtonCallBack && (
            <Pressable
              onPress={notesButtonCallBack}
              style={[styles.buttom, styles.notesbtn]}
            >
              <Text style={[styles.buttomText, styles.notesbtntext]}>
                Notes
              </Text>
              <FontAwesome
                name="sticky-note"
                size={14}
                color={colors.blue500}
              />
            </Pressable>
          )}
          {editButtonCallBack && (
            <Pressable onPress={editButtonCallBack} style={styles.buttom}>
              {/* <Text style={styles.buttomText}>Edit</Text> */}
              <FontAwesome5 name="pen" size={10} color="white" />
            </Pressable>
          )}
          {deleteButtonCallBack && (
            <Pressable
              onPress={deleteButtonCallBack}
              style={[styles.buttom, styles.sharebtn]}
            >
              {/* <Text style={styles.buttomText}>Share</Text> */}
              <FontAwesome5 name="trash" size={10} color={"white"} />
            </Pressable>
          )}
        </View>
      </View>

      {updatedAt && (
        <Text style={styles.financialHoldingLastUpdated}>
          Last updated on{" "}
          {new Date(updatedAt).toDateString().replace(/^\w+ /, "")}
        </Text>
      )}

      {tagLabel && (
        <View
          style={[
            styles.marginLeftSm,
            styles.marginBottomXs,
            { alignItems: "flex-start" },
          ]}
        >
          <CustomPill
            label={tagLabel}
            color={colors.blue500}
            backgroundColor={colors.white500}
            containerStyle={styles.paddingVerticalXxs}
            size="sm"
            labelBold
          />
        </View>
      )}

      <View style={styles.devider} />

      <FlatList
        data={content}
        renderItem={({ item, index }) =>
          item.type === "divider" ? (
            <View style={styles.contentDivider} />
          ) : (
            <View key={index} style={[styles.row, styles.marginBottomXs]}>
              <Text style={[styles.info, styles.semiBold, styles.widthkey]}>
                {item.key}
              </Text>
              <Text
                style={[styles.info, styles.widthvalue, styles.textAlignRight]}
              >
                {item.value}
              </Text>
            </View>
          )
        }
      />
    </FinancialHoldingItemWrapper>
  );
};

export default FinancialInstitutionHoldingCard;
