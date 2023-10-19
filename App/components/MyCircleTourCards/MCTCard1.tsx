import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";

const MCTCard1 = () => {
  const { width } = Dimensions.get("window");

  const {
    theme: { spacing, colors, fontFamily, fontSize },
  } = useTheme();

  const styles = StyleSheet.create({
    page: {
      width,
      padding: spacing.xl,
      paddingTop: spacing.xxxl,
    },
    text: {
      fontFamily: fontFamily.regular,
      color: colors.black500,
      fontSize: fontSize.default,
      lineHeight: fontSize.lg + spacing.xxs,
      flexShrink: 1,
    },
    titleText: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.xxl,
      lineHeight: fontSize.xxxl,
      marginTop: spacing.xl,
      marginBottom: spacing.lg,
      color: colors.blue,
    },
  });

  return (
    <View style={styles.page}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          style={{ width: 300, height: 220, marginBottom: spacing.xxl }}
          alt=""
          source={require("../../assets/images/test4.jpg")}
        />
        <Text style={styles.titleText}>My 'inner' Circle</Text>
      </View>

      <View>
        <Text
          style={[
            styles.text,
            { textAlign: "justify", marginBottom: spacing.u90 },
          ]}
        >
          Add your loved and trusted ones to “My Circle” whom you would like to
          assign various roles in your succession plan
        </Text>

        <Text
          style={[
            styles.text,
            {
              textAlign: "justify",
              marginBottom: spacing.u100,
              color: colors.blue600,
            },
          ]}
        >
          Swipe right to know details &gt;&gt;
        </Text>
      </View>
    </View>
  );
};

export default MCTCard1;
