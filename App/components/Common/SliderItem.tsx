import { View, Text, Dimensions, StyleSheet, Image } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";

interface SliderItemProps {
    item: string
}

const SliderItem: React.FC<SliderItemProps> = ({ item }) => {
  const { width } = Dimensions.get("window");

  const {
    theme: { colors, spacing, fontSize, fontFamily },
  } = useTheme();

  const styles = StyleSheet.create({
    card: {
      width: width - 35,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      backgroundColor: colors.white400,
      margin: 2,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.white700,
    },
    title: {
      color: colors.blue,
      fontFamily: fontFamily.semiBold,
    },
    content: {
      fontSize: fontSize.md,
      lineHeight: fontSize.lg,
      fontFamily: fontFamily.regular,
      color: colors.blue,
      width: 250,
    },
    image: {
      width: 60,
      height: 60,
    },
  });

  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.content}>
          {item.subtitle}
        </Text>
      </View>
      <Image
        style={styles.image}
        resizeMode="center"
        source={item.img}
      />
    </View>
  );
};

export default SliderItem;
