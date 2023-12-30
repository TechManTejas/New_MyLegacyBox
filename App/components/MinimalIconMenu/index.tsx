import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import MinimalIconCard from "./MinimalIconCard";
import { SvgProps } from "react-native-svg";

interface MinimalIconCardProps {
  id?: number;
  title?: string;
  path?: string;
  viewBox?: string;
  navigateToScreen?: string;
  navigationParams?: object;
  SvgIcon?: React.FC<SvgProps>;
}

interface MinimalIconMenuProps {
  data?: MinimalIconCardProps[];
}

const MinimalIconMenu: React.FC<MinimalIconMenuProps> = ({ data }) => {
  const {
    theme: { spacing },
  } = useTheme();

  const styles = StyleSheet.create({
    container: {
      marginBottom: spacing.sm,
      paddingTop: spacing.xxs,
      paddingBottom: spacing.md,
      flexDirection: "row",
    },
  });

  return (
    <View style={styles.container}>
      {data &&
        data.map(({ id, ...menu }, index) => (
          <MinimalIconCard
            key={`minimal-icon-menu-${id}`}
            {...menu}
            index={index}
            cardsInRow={4}
          />
        ))}
    </View>
  );
};

export default MinimalIconMenu;
