import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const WillAssetCard = ({
  title,
  subTitle,
  pressHandler,
  selected,
  containerStyle,
}: {
  title: any;
  subTitle: any;
  pressHandler: any;
  selected: any;
  containerStyle: any;
}) => {
  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const styles = StyleSheet.create({
    container: {
      marginBottom: spacing.md,
      borderWidth: spacing.xxxs,
      borderColor: colors.black100,
      borderRadius: spacing.sm,
      padding: spacing.md,
    },
    containerHighlighted: {
      backgroundColor: colors.white400,
      borderColor: colors.blue500,
      borderWidth: spacing.xxxs,
    },
    pressableContainer: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
    },
    content: {
      flex: 1,
    },
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "baseline",
      paddingHorizontal: spacing.md,
      marginBottom: spacing.xs,
    },
    title: {
      fontFamily: fontFamily.semiBold,
      color: colors.blue500,
      fontSize: fontSize.lg,
      lineHeight: fontSize.xl,
      marginBottom: spacing.xs,
    },
    subTitle: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      color: colors.blue500,
    },

    iconContainer: {
      paddingHorizontal: spacing.sm,
    },
    icon: {
      fontSize: fontSize.default,
      color: colors.blue400,
    },
  });

  return (
    <View
      style={[
        styles.container,
        selected && styles.containerHighlighted,
        containerStyle && containerStyle,
      ]}
    >
      <Pressable
        style={styles.pressableContainer}
        onPress={() => pressHandler(title)}
      >
        <View style={styles.content}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subTitle}>{subTitle}</Text>
          </View>
        </View>
        {selected ? (
          <View style={styles.iconContainer}>
            <FontAwesome5
              name="check"
              size={styles.icon.fontSize}
              color={styles.icon.color}
            />
          </View>
        ) : (
          <View style={styles.iconContainer}>
            <FontAwesome5
              name="circle"
              size={styles.icon.fontSize}
              color={styles.icon.color}
            />
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default WillAssetCard;
