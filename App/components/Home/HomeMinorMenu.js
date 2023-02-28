import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { HOME_MINOR_MENU_DATA } from "../../data/HomeData";
import MenuCard from "../Common/MenuCard";
import { useTheme } from "../../theme/ThemeProvider";

const HomeMinorMenu = () => {
  const {
    theme: { colors, spacing, fontFamily, fontSize },
  } = useTheme();

  const styles = StyleSheet.create({
    container: {
      borderRadius: spacing.sm,
      marginBottom: spacing.sm,
      paddingHorizontal: spacing.sm,
      paddingTop: spacing.md,
      paddingBottom: 0,
      backgroundColor: colors.white400,
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
  });

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.headerTitle}>Additional</Text>
      </View> */}
      <View style={styles.section}>
        {HOME_MINOR_MENU_DATA.map(({ id, ...menu }, index) => (
          <MenuCard
            key={`home-minor-menu-${id}`}
            {...menu}
            index={index}
            cardsInRow={4}
            size="sm"
            isDark
          />
        ))}
      </View>
    </View>
    // <>
    //   <View style={styles.section}>
    //     {HOME_MINOR_MENU_DATA.map(({ id, ...menu }, index) => (
    //       <MenuCard
    //         key={`home-major-menu-${id}`}
    //         {...menu}
    //         index={index}
    //         cardsInRow={4}
    //         size="sm"
    //       />
    //     ))}
    //   </View>
    //   <View style={styles.section}>
    //     {HOME_MINOR_MENU_DATA.map(({ id, ...menu }, index) => (
    //       <MenuCard
    //         key={`home-major-menu-${id}`}
    //         {...menu}
    //         index={index}
    //         cardsInRow={4}
    //         size="sm"
    //         color="green"
    //       />
    //     ))}
    //   </View>
    //   <View style={styles.section}>
    //     {HOME_MINOR_MENU_DATA.map(({ id, ...menu }, index) => (
    //       <MenuCard
    //         key={`home-major-menu-${id}`}
    //         {...menu}
    //         index={index}
    //         cardsInRow={4}
    //         size="sm"
    //         color="red"
    //       />
    //     ))}
    //   </View>
    //   <View style={styles.section}>
    //     {HOME_MINOR_MENU_DATA.map(({ id, ...menu }, index) => (
    //       <MenuCard
    //         key={`home-major-menu-${id}`}
    //         {...menu}
    //         index={index}
    //         cardsInRow={4}
    //         size="sm"
    //         color="yellow"
    //       />
    //     ))}
    //   </View>
    //   <View style={styles.section}>
    //     {HOME_MINOR_MENU_DATA.map(({ id, ...menu }, index) => (
    //       <MenuCard
    //         key={`home-major-menu-${id}`}
    //         {...menu}
    //         index={index}
    //         cardsInRow={4}
    //         size="sm"
    //         color="black"
    //       />
    //     ))}
    //   </View>

    //   <View style={styles.section}>
    //     {HOME_MINOR_MENU_DATA.map(({ id, ...menu }, index) => (
    //       <MenuCard
    //         key={`home-major-menu-${id}`}
    //         {...menu}
    //         index={index}
    //         cardsInRow={4}
    //         size="sm"
    //         isDark
    //       />
    //     ))}
    //   </View>
    //   <View style={styles.section}>
    //     {HOME_MINOR_MENU_DATA.map(({ id, ...menu }, index) => (
    //       <MenuCard
    //         key={`home-major-menu-${id}`}
    //         {...menu}
    //         index={index}
    //         cardsInRow={4}
    //         size="sm"
    //         color="green"
    //         isDark
    //       />
    //     ))}
    //   </View>
    //   <View style={styles.section}>
    //     {HOME_MINOR_MENU_DATA.map(({ id, ...menu }, index) => (
    //       <MenuCard
    //         key={`home-major-menu-${id}`}
    //         {...menu}
    //         index={index}
    //         cardsInRow={4}
    //         size="sm"
    //         color="red"
    //         isDark
    //       />
    //     ))}
    //   </View>
    //   <View style={styles.section}>
    //     {HOME_MINOR_MENU_DATA.map(({ id, ...menu }, index) => (
    //       <MenuCard
    //         key={`home-major-menu-${id}`}
    //         {...menu}
    //         index={index}
    //         cardsInRow={4}
    //         size="sm"
    //         color="yellow"
    //         isDark
    //       />
    //     ))}
    //   </View>
    //   <View style={styles.section}>
    //     {HOME_MINOR_MENU_DATA.map(({ id, ...menu }, index) => (
    //       <MenuCard
    //         key={`home-major-menu-${id}`}
    //         {...menu}
    //         index={index}
    //         cardsInRow={4}
    //         size="sm"
    //         color="black"
    //         isDark
    //       />
    //     ))}
    //   </View>
    // </>
  );
};

export default HomeMinorMenu;
