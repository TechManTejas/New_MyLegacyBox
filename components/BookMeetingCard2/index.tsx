import { View, Text, StyleSheet, Pressable, ToastAndroid } from "react-native";
import React from "react";
import { useTheme } from "../../testApp/theme/ThemeProvider";
import PhoneIcon from "../../testApp/assets/icons/phone-outlined.svg";
import { useBookMeetingMutation } from "../../testApp/redux/api/book-meet/book-meet";
import CustomActivityIndicator from "../../testApp/components/Common/CustomActivityIndicator";
import Check from "../../testApp/assets/icons/circle-check.svg";

const PensionBoxBanner = () => {

  const [bookMeet, { isLoading, isError, isSuccess }] =
    useBookMeetingMutation();

  const bookMeeting = async () => {
    try {
      const res = await bookMeet(undefined).unwrap();
      console.log(res);
      if (res.data) {
        ToastAndroid.show("Request sent successfully!", ToastAndroid.SHORT);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const styles = StyleSheet.create({
    container: {
      borderRadius: spacing.sm,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.white600,
      backgroundColor: colors.white500,
      marginBottom: spacing.lg,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    iconContainer: {
      backgroundColor: colors.white100,
      padding: spacing.sm,
      borderRadius: spacing.u100,
      justifyContent: "center",
    },
    content: {
      paddingLeft: spacing.md,
      paddingRight: spacing.sm,
      flexShrink: 1,
      justifyContent: "center",
    },
    contentTitle: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.default,
      lineHeight: fontSize.lg,
      marginBottom: spacing.xxs,
      color: colors.black500,
    },
    contentCaption: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.sm,
      lineHeight: fontSize.md,
      color: colors.black500,
    },
    ctaContainer: {
      backgroundColor: colors.blue500,
      borderRadius: spacing.xs,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.sm,
      marginRight: spacing.sm,
      flexDirection: "row",
      alignItems:"center"
    },
    cta: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.sm,
      lineHeight: fontSize.md,
      color: colors.white100,
    },
  });

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.iconContainer}>
          <PhoneIcon fill={colors.blue500} />
        </View>
        <View style={styles.content}>
          <Text style={styles.contentTitle}>Call-in for Demo</Text>
        </View>
      </View>

      {isLoading ? (
        <Pressable disabled style={styles.ctaContainer}>
          {/* <View style={{ width: 30 }}>
            <CustomActivityIndicator
              backgroundColor={colors.blue}
              color={colors.white100}
            />
          </View> */}
          <Text style={styles.cta}>Please Wait </Text>
        </Pressable>
      ) : isSuccess ? (
        <Pressable
          disabled
          style={[styles.ctaContainer, { backgroundColor: colors.green500 }]}
        >
          {/* <Check width={20} fill={colors.white100} color={colors.green400} /> */}
          <Text style={styles.cta}>Team Notified</Text>
        </Pressable>
      ) : (
        <Pressable onPress={bookMeeting} style={styles.ctaContainer}>
          <Text style={styles.cta}>Book Now</Text>
        </Pressable>
      )}
    </View>
  );
};

export default PensionBoxBanner;
