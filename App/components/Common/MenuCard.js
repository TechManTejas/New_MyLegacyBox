import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import {
  getMenuVariantColor,
  getMenuVariantFontSizes,
  getMenuVariantSpacing,
} from "../../utils/menu";

const MenuCard = ({
  isDark,
  size,
  color,
  cardsInRow,
  index,
  title,
  iconName,
  IconComponent,
  iconSizeMultiplier,
  navigateToScreen,
  navigationParams,
  disabled,
}) => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const { fontFamily } = theme;

  const pressHandler = () => {
    navigation.navigate(
      navigateToScreen,
      navigationParams ? navigationParams : undefined
    );
  };

  const menuColors = getMenuVariantColor(color, isDark, theme);
  const menuFontSize = getMenuVariantFontSizes(size, theme);
  const menuSpacing = getMenuVariantSpacing(size, theme);

  const styles = StyleSheet.create({
    wrapper: {
      width: `${100 / cardsInRow}%`,
    },
    container: {
      height: menuSpacing.container.height,
      elevation: 4,
      borderRadius: menuSpacing.container.borderRadius,
      backgroundColor: menuColors.container.backgroundColor,
      borderStyle: "dashed",
      marginRight:
        (index + 1) % cardsInRow !== 0 ? menuSpacing.container.marginRight : 0,
      marginBottom: menuSpacing.container.marginBottom,
      padding: menuSpacing.container.padding,
    },
    iconContainer: {
      flex: menuSpacing.iconContainer.flex,
      justifyContent: "center",
      alignItems: "center",
      fontSize: (iconSizeMultiplier || 1) * menuFontSize.iconContainer.fontSize,
      color: menuColors.iconContainer.color,
    },
    label: {
      flex: menuSpacing.label.flex,
      textAlign: "center",
      fontFamily: fontFamily.regular,
      fontSize: menuFontSize.label.fontSize,
      lineHeight: menuFontSize.label.lineHeight,
      color: menuColors.label.color,
    },
  });

  return (
    <View style={styles.wrapper}>
      <Pressable
        style={styles.container}
        onPress={!disabled ? pressHandler : () => {}}
      >
        <View style={styles.iconContainer}>
          <IconComponent
            name={iconName}
            color={styles.iconContainer.color}
            size={styles.iconContainer.fontSize}
          />
        </View>
        <Text style={styles.label}>{title}</Text>
      </Pressable>
    </View>
  );
};

export default MenuCard;
