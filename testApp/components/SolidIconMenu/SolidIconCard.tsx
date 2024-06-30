import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { CustomIcon } from "../Common/CustomIcon";
import React from "react";
import { SvgProps } from "react-native-svg";
import { useRouter } from "expo-router";

interface SolidIconCardProps {
  cardsInRow: number;
  index: number;
  title?: string;
  navigateToScreen?: string;
  disabled?: string;
  path?: string;
  viewBox?: string;
  isDark?: boolean;
  isLarge?: boolean;
  navigationParams?: object;
  SvgIcon?: React.FC<SvgProps>;
}

const SolidIconCard: React.FC<SolidIconCardProps> = ({
  cardsInRow,
  index,
  title,
  navigateToScreen,
  disabled,
  path,
  viewBox,
  isDark,
  isLarge,
  navigationParams,
  SvgIcon,
}) => {
  const {
    theme: { fontFamily, colors, spacing, fontSize },
  } = useTheme();

  const router = useRouter();

  const pressHandler = () => {
    router.push({ pathname: navigateToScreen, params: navigationParams });
  };

  const styles = StyleSheet.create({
    wrapper: {
      width: `${100 / cardsInRow}%`,
    },
    container: {
      height: isLarge ? 150 : 80,
      elevation: 3,
      borderRadius: spacing.sm,
      backgroundColor: isDark ? colors.blue : colors.white100,
      borderStyle: "dashed",
      marginRight: (index + 1) % cardsInRow !== 0 ? spacing.sm : 0,
      marginBottom: spacing.sm,
      padding: isLarge ? spacing.sm : spacing.xs,
      paddingBottom: 0,
    },
    iconContainer: {
      flex: isLarge ? 5 : 3,
      justifyContent: "center",
      alignItems: "center",
    },
    label: {
      flex: isLarge ? 1 : 2,
      textAlign: "center",
      fontFamily: fontFamily.regular,
      fontSize: isLarge ? fontSize.md : fontSize.sm,
      lineHeight: isLarge ? fontSize.lg : fontSize.md,
      color: isDark ? colors.white100 : colors.blue,
    },
  });

  return (
    <View style={styles.wrapper}>
      <Pressable
        style={styles.container}
        onPress={!disabled ? pressHandler : () => {}}
      >
        <View style={styles.iconContainer}>
          {SvgIcon ? (
            <SvgIcon
              width={isLarge ? 50 : 20}
              height={isLarge ? 50 : 20}
              fill={isDark ? colors.white100 : colors.blue}
            />
          ) : (
            <CustomIcon
              path={path}
              viewBox={viewBox}
              size={isLarge ? 50 : 20}
              color={isDark ? colors.white100 : colors.blue}
            />
          )}
        </View>
        <Text style={styles.label}>{title}</Text>
      </Pressable>
    </View>
  );
};

export default SolidIconCard;
