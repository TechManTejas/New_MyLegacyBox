import { useNavigation } from "@react-navigation/native";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { CustomIcon } from "../Common/CustomIcon";
import React from "react";
import { SvgProps } from "react-native-svg";

interface MinimalIconCardProps {
  cardsInRow: number;
  index: number;
  title?: string;
  navigateToScreen?: string;
  disabled?: boolean;
  path?: string;
  viewBox?: string;
  SvgIcon?: React.FC<SvgProps>;
}

const MinimalIconCard: React.FC<MinimalIconCardProps> = ({
  cardsInRow,
  title,
  index,
  navigateToScreen,
  disabled,
  path,
  viewBox,
  SvgIcon,
}) => {
  const {
    theme: { fontFamily, colors, spacing, fontSize },
  } = useTheme();
  const navigation = useNavigation<{ navigate: any }>();

  const pressHandler = () => {
    navigation.navigate(navigateToScreen);
  };

  const styles = StyleSheet.create({
    wrapper: {
      width: `${100 / cardsInRow}%`,
    },
    container: {
      borderRadius: 10,
      borderStyle: "dashed",
      marginRight: (index + 1) % cardsInRow !== 0 ? spacing.sm : 0,
      marginBottom: spacing.sm,
      padding: spacing.xs,
      paddingBottom: spacing.xxs,
    },
    iconContainer: {
      alignItems: "center",
    },
    label: {
      textAlign: "center",
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.lg,
      color: colors.blue500,
      paddingRight: spacing.xs,
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
              width={spacing.xl + spacing.xs}
              height={spacing.xl + spacing.xs}
              fill={colors.blue}
            />
          ) : (
            <CustomIcon
              path={path}
              viewBox={viewBox}
              size={spacing.xl + spacing.xs}
              color={colors.blue500}
            />
          )}
        </View>
      </Pressable>
      <Text style={styles.label}>{title}</Text>
    </View>
  );
};

export default MinimalIconCard;
