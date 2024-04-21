import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import SolidIconCard from "./SolidIconCard";
import { SvgProps } from "react-native-svg";

interface SolidIconCardProps {
  id?: number;
  title?: string;
  path?: string;
  viewBox?: string;
  navigateToScreen?: string;
  navigationParams?: object;
  SvgIcon?: React.FC<SvgProps>;
}

interface SolidIconMenuProps {
  data?: SolidIconCardProps[];
  isDark?: boolean;
  isLarge?: boolean;
}

const SolidIconMenu: React.FC<SolidIconMenuProps> = ({
  data,
  isDark,
  isLarge,
}) => {
  const {
    theme: { colors, spacing },
  } = useTheme();

  const styles = StyleSheet.create({
    container: {
      borderRadius: spacing.sm,
      borderWidth: isLarge ? 0 : StyleSheet.hairlineWidth,
      borderColor: colors.black200,

      marginBottom: isLarge ? spacing.lg : spacing.sm,
      paddingHorizontal: isLarge ? 0 : spacing.sm,
      paddingTop: isLarge ? 0 : spacing.md,
      flexDirection: "row",
      
      flexWrap: isLarge ? "wrap" : "nowrap",

    },
  });

  return (
    <View style={styles.container}>
      {data &&
        data.map(({ id, ...menu }, index) => (
          <SolidIconCard
            key={`solid-icon-menu-${id}`}
            {...menu}
            index={index}
            cardsInRow={isLarge ? 2 : 4}
            isDark={isDark}
            isLarge={isLarge}
          />
        ))}
    </View>
  );
};

export default SolidIconMenu;
