import React from "react";
import { View, StyleSheet } from "react-native";
import { HOME_MINOR_MENU_DATA } from "../../data/HomeData";
import MenuCard from "../Common/MenuCard";
import { useTheme } from "../../theme/ThemeProvider";

const MinorMenu = ({ centered, menuData, title }) => {
  const {
    theme: { colors, spacing, fontFamily, fontSize },
  } = useTheme();

  const styles = StyleSheet.create({
    container: {
      borderRadius: spacing.sm,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.black200,
      marginBottom: spacing.sm,
      paddingHorizontal: spacing.sm,
      paddingTop: spacing.md,
      paddingBottom: 0,
      // backgroundColor: colors.white400,
    },
    header: {
      marginBottom: spacing.sm,
    },
    headerTitle: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      color: colors.blue,
    },
    section: {
      flexDirection: "row",
    },
    sectionCentered: {
      justifyContent: "center",
    },
  });

  return (
    <View style={styles.container}>
      <View style={[styles.section, centered && styles.sectionCentered]}>
        {menuData.map(({ id, ...menu }, index) => (
          <MenuCard
            key={`${title}-minor-menu-${id}`}
            {...menu}
            index={index}
            cardsInRow={4}
            size="sm"
            isDark
          />
        ))}
      </View>
    </View>
  );
};

export default MinorMenu;
