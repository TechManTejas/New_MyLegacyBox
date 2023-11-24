import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import { CustomIcon } from "./CustomIcon";
import CarretDownFilled from "../../assets/icons/caret-down-filled.svg";
import CarretUpFilled from "../../assets/icons/caret-up-filled.svg";
import PlusIcon from "../../assets/icons/plus.svg";
import SquarePlusIcon from "../../assets/icons/square-rounded-plus-filled.svg";

interface WillTabProps {
  icon?: React.ReactNode;
  onPress?: () => void;
  tabTitle?: string;
  tabSubTitle?: string;
  dataFilled?: boolean;
  disabled?: boolean;
  nominees?: Array<any>;
  showNomineesOnPress?: () => void;
  elevated?: boolean;
  areNomineesDisplayed?: boolean;
  showPlusIcon?: boolean;
}

const WillTab: React.FC<WillTabProps> = ({
  icon,
  onPress,
  tabTitle,
  tabSubTitle,
  dataFilled,
  disabled,
  nominees,
  showNomineesOnPress,
  areNomineesDisplayed,
  elevated,
  showPlusIcon,
}) => {
  const {
    theme: { colors, fontFamily, spacing, fontSize },
  } = useTheme();

  const styles = StyleSheet.create({
    sectionContainer: {
      padding: spacing.lg,
      marginHorizontal: spacing.lg,
      marginTop: spacing.md,
      borderTopRightRadius: spacing.md,
      borderTopLeftRadius: spacing.md,
      backgroundColor: colors.white100,
      elevation: elevated ? 3 : 0,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: elevated ? 0 : StyleSheet.hairlineWidth,
      borderColor: elevated ? "" : colors.black200,
      borderBottomLeftRadius:
        showNomineesOnPress !== undefined && !disabled ? 0 : spacing.md,
      borderBottomRightRadius:
        showNomineesOnPress !== undefined && !disabled ? 0 : spacing.md,
    },
    sectionTitle: {
      marginLeft: spacing.md,
      color: colors.blue500,
      fontFamily: fontFamily.regular,
    },
    sectionSubTitle: {
      marginLeft: spacing.md,
      color: colors.blue500,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.sm,
      lineHeight: fontSize.default,
    },
    iconTitle: {
      flexDirection: "row",
      alignItems: "center",
    },
    iconStyle: {
      width: 24,
      height: 24,
    },
    imageContainer: {
      borderRadius: spacing.sm,
      padding: spacing.sm,
    },
    dataFilledTabStyle: {
      backgroundColor: colors.green100,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.green400,
    },
    dataFilledTitleStyle: {
      color: colors.green700,
    },
    disabledTabStyle: {
      backgroundColor: colors.black100,
      elevation: 0,
    },
    disabledTitleStyle: {
      color: colors.black300,
    },
    memberViewButton: {
      marginHorizontal: spacing.lg,
      borderBottomLeftRadius: spacing.md,
      borderBottomRightRadius: spacing.md,
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
      elevation: 3,
      backgroundColor: colors.white400,
      marginTop: spacing.xxxs,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    memberViewText: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.sm,
      lineHeight: fontSize.md,
      paddingLeft: spacing.sm,
      color: colors.black400,
    },
  });

  return (
    <View>
      <Pressable
        style={[
          styles.sectionContainer,
          dataFilled && styles.dataFilledTabStyle,
          disabled && styles.disabledTabStyle,
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        <View style={styles.iconTitle}>
          {icon && <View style={styles.imageContainer}>{icon}</View>}
          <View>
            <Text
              style={[
                styles.sectionTitle,
                dataFilled && styles.dataFilledTitleStyle,
                disabled && styles.disabledTitleStyle,
              ]}
            >
              {tabTitle}
            </Text>
            {tabSubTitle && (
              <Text style={styles.sectionSubTitle}>{tabSubTitle}</Text>
            )}
          </View>
        </View>
        {dataFilled ? (
          <CustomIcon
            viewBox="0 0 512 512"
            color={colors.green500}
            size={24}
            path="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
          />
        ) : showPlusIcon ? (
          <SquarePlusIcon width={26} height={26} color={colors.white700} />
        ) : null}
      </Pressable>
      {nominees !== undefined && !disabled && (
        <Pressable
          disabled={nominees.length===0}
          onPress={showNomineesOnPress}
          style={styles.memberViewButton}
        >
          <Text style={styles.memberViewText}>View Your Members</Text>

          {areNomineesDisplayed ? (
            <CarretUpFilled width={16} height={16} color={colors.black300} />
          ) : (
            <CarretDownFilled width={16} height={16} color={colors.black300} />
          )}
        </Pressable>
      )}
    </View>
  );
};

export default WillTab;
