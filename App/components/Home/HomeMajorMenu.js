import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HOME_MAJOR_MENU_DATA } from "../../data/HomeData";
import { useTheme } from "../../theme/ThemeProvider";
import MenuCard from "../Common/MenuCard";

const HomeMajorMenu = () => {
  const {
    theme: { spacing },
  } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: spacing.lg,
    },
  });

  return (
    <View style={styles.container}>
      {HOME_MAJOR_MENU_DATA.map(({ id, ...menu }, index) => (
        <MenuCard
          key={`home-major-menu-${id}`}
          {...menu}
          index={index}
          cardsInRow={2}
        />
      ))}
    </View>
  );
};

export default HomeMajorMenu;
