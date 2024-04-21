import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";

const PensionBoxHeader = () => {
  const {
    theme: { colors, spacing, fontFamily, fontSize },
  } = useTheme();

  const navigation = useNavigation();

  const handler = () => {
    navigation.goBack();
  };

  const styles = StyleSheet.create({
    content: {
      position: "absolute",
      top: 0,
      backgroundColor: colors.blue500,
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
    },
    label: {
      right: 0,
      borderTopLeftRadius: spacing.u100,
      borderBottomLeftRadius: spacing.u100,
    },
    button: {
      left: 0,
      backgroundColor: colors.blue100,
      borderTopRightRadius: spacing.u100,
      borderBottomRightRadius: spacing.u100,
      flexDirection: "row",
    },
    text: {
      fontFamily: fontFamily.semiBold,
      color: colors.blue100,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
    },
    buttonText: {
      color: colors.blue500,
      paddingLeft: spacing.sm,
    },
    icon: {
      color: colors.blue500,
      paddingTop: spacing.xxxs,
      fontSize: fontSize.sm,
    },
  });

  return (
    <View>
      <View style={[styles.content, styles.label]}>
        <Text style={styles.text}>via Oiconomos</Text>
      </View>
      <Pressable onPress={handler} style={[styles.content, styles.button]}>
        <FontAwesome5 name="chevron-left" style={styles.icon} />
        <Text style={[styles.text, styles.buttonText]}>Go Back</Text>
      </Pressable>
    </View>
  );
};

export default PensionBoxHeader;
