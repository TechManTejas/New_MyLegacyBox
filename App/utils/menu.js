import { StyleSheet } from "react-native";

export const getMenuVariantColor = (colorVariant, isDark, theme) => {
  const { colors } = theme;

  let variantColors;

  switch (colorVariant) {
    case "green":
      variantColors = StyleSheet.create({
        container: {
          backgroundColor: isDark ? colors.green600 : colors.green100,
        },
        iconContainer: {
          color: isDark ? colors.white100 : colors.green600,
        },
        label: {
          color: isDark ? colors.white100 : colors.green700,
        },
      });
      break;
    case "red":
      variantColors = StyleSheet.create({
        container: {
          backgroundColor: isDark ? colors.red600 : colors.red100,
        },
        iconContainer: {
          color: isDark ? colors.white100 : colors.red600,
        },
        label: {
          color: isDark ? colors.white100 : colors.red700,
        },
      });
      break;
    case "yellow":
      variantColors = StyleSheet.create({
        container: {
          backgroundColor: isDark ? colors.yellow500 : colors.yellow100,
        },
        iconContainer: {
          color: isDark ? colors.yellow900 : colors.yellow600,
        },
        label: {
          color: isDark ? colors.yellow900 : colors.yellow700,
        },
      });
      break;
    case "black":
      variantColors = StyleSheet.create({
        container: {
          backgroundColor: isDark ? colors.black600 : colors.black100,
        },
        iconContainer: {
          color: isDark ? colors.white100 : colors.black500,
        },
        label: {
          color: isDark ? colors.white100 : colors.black600,
        },
      });
      break;
    default:
      variantColors = StyleSheet.create({
        container: {
          backgroundColor: isDark ? colors.blue : colors.white100,
        },
        iconContainer: {
          color: isDark ? colors.white100 : colors.blue500,
        },
        label: {
          color: isDark ? colors.white100 : colors.blue500,
        },
      });
      break;
  }

  return variantColors;
};

export const getMenuVariantFontSizes = (sizeVariant, theme) => {
  const { fontSize } = theme;

  let variantFontSize;

  switch (sizeVariant) {
    case "sm":
      variantFontSize = StyleSheet.create({
        iconContainer: {
          fontSize: fontSize.lg,
        },
        label: {
          fontSize: fontSize.sm,
          lineHeight: fontSize.md,
        },
      });
      break;
    default:
      variantFontSize = StyleSheet.create({
        iconContainer: {
          fontSize: fontSize.x4l + fontSize.xs,
        },
        label: {
          fontSize: fontSize.md,
          lineHeight: fontSize.lg,
        },
      });
      break;
  }

  return variantFontSize;
};

export const getMenuVariantSpacing = (sizeVariant, theme) => {
  const { spacing } = theme;

  let variantSpacing;

  switch (sizeVariant) {
    case "sm":
      variantSpacing = StyleSheet.create({
        container: {
          height: 80,
          borderRadius: spacing.sm,
          marginRight: spacing.sm,
          marginBottom: spacing.sm,
          padding: spacing.xs,
        },
        iconContainer: {
          flex: 3,
        },
        label: {
          flex: 2,
        },
      });
      break;
    default:
      variantSpacing = StyleSheet.create({
        container: {
          height: 150,
          borderRadius: spacing.sm,
          marginRight: spacing.sm,
          marginBottom: spacing.sm,
          padding: spacing.sm,
        },
        iconContainer: {
          flex: 5,
        },
        label: {
          flex: 1,
        },
      });
      break;
  }

  return variantSpacing;
};
