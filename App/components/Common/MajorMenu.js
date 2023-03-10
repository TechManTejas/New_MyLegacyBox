import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import MenuCard from "./MenuCard";

const MajorMenu = ({ centeredContent, menuData, title }) => {
  const {
    theme: { spacing },
  } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: spacing.lg,
    },
    containerCentered: {
      justifyContent: "center",
    },
  });

  return (
    <View
      style={[styles.container, centeredContent && styles.containerCentered]}
    >
      {menuData.map(({ id, ...menu }, index) => (
        <MenuCard
          key={`${title}-major-menu-${id}`}
          {...menu}
          index={index}
          cardsInRow={2}
        />
      ))}
    </View>
  );
};

export default MajorMenu;
