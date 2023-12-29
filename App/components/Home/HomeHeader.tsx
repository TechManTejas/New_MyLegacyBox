import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../authentication/AuthProvider";
import { useTheme } from "../../theme/ThemeProvider";
import { FontAwesome } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";

import CircleUser from "../../assets/icons/circleUser.svg"

const HomeHeader = () => {
  const { theme: { colors, spacing, fontFamily, fontSize } } = useTheme();
  const { session } = useAuth();
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      paddingTop: spacing.xxl,
      paddingBottom: spacing.lg,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    greeting: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.xxl,
      lineHeight: fontSize.xxxl,
      color: colors.black500,
    },
    username: {
      color: colors.blue500,
      textTransform: "capitalize",
    },
    caption: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.default,
      color: colors.black400,
    },
    iconContainer: {
      paddingHorizontal: spacing.xs,
      paddingTop: spacing.xs,
      paddingBottom: spacing.sm,
      backgroundColor: colors.white100,
    },
  });

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>
          Namaste,{" "}
          <Text style={styles.username}>
            {session?.identity?.traits?.name?.first || "user"}
          </Text>
        </Text>
        <Text style={styles.caption}>Welcome to Oiconomos!</Text>
      </View>
      <Pressable
        style={styles.iconContainer}
        onPress={() => {
          navigation.toggleDrawer();
        }}
      >
        <View>
          {/* <FontAwesome name="user-circle" size={fontSize.xxxl} color={colors.blue400} /> */}
          <CircleUser width={fontSize.xxxl} height={fontSize.xxxl} fill={colors.blue400} />
        </View>
      </Pressable>
    </View>
  );
};

export default HomeHeader;
