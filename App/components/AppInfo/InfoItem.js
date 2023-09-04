import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";

const InfoItem = ({ item }) => {
  const { width } = useWindowDimensions();
  const {
    theme: { colors, spacing, fontFamily, fontSize },
  } = useTheme();

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      paddingTop: spacing.md,
      paddingBottom: spacing.sm,

    //   borderWidth: 1,
    //   borderColor: colors.black300,
    },
    image: {
      flex: 5,
      width: width,
      resizeMode: "contain",
      marginBottom: spacing.md,

    //   borderWidth: 1,
    //   borderColor: colors.black300,
    },
    title: {
      color: colors.blue,
      fontFamily: fontFamily.semiBold,
      paddingHorizontal: spacing.md,
      marginBottom: spacing.md,
      fontSize: fontSize.xxl,
      lineHeight: fontSize.xxxl,
      width: width,
      textAlign: "center",

    //   borderWidth: 1,
    //   borderColor: colors.black300,
    },
    message: {
      color: colors.blue,
      fontSize: fontSize.default,
      lineHeight: fontSize.lg,
      paddingHorizontal: spacing.xl,
      paddingBottom: spacing.xl,
      
      width: width,
      textAlign: "center",

    //   borderWidth: 1,
    //   borderColor: colors.black300,
    },
  });

  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <View
        style={{
          justifyContent: "flex-end",
        //   borderWidth: 1,
        //   borderColor: colors.black300,
          flex: 2,
        }}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    </View>
  );
};

export default InfoItem;
