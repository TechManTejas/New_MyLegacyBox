import { View, Text, StyleSheet, ToastAndroid, Pressable } from "react-native";
import React from "react";
import { useTheme } from "../../testApp/theme/ThemeProvider";
import { useBookMeetingMutation } from "../../testApp/redux/api/book-meet/book-meet";
import CustomActivityIndicator from "../../testApp/components/Common/CustomActivityIndicator";

import PhoneIcon from "../../testApp/assets/icons/phone-outlined.svg";
import Check from "../../testApp/assets/icons/circle-check.svg";

const BookMeetingCard = () => {
  const [bookMeet, { isLoading, isError, isSuccess }] =
    useBookMeetingMutation();

  console.log({ isError, isSuccess });

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
    bookCard: {
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.black200,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: spacing.sm,
      marginBottom: spacing.xxl,
      paddingVertical: spacing.md + spacing.sm,
      paddingHorizontal: spacing.md,
    },
    bookTitle: {
      textAlign: "center",
      fontSize: fontSize.lg,
      lineHeight: fontSize.xl,
      fontFamily: fontFamily.semiBold,
    },
    bookText: {
      textAlign: "center",
      fontFamily: fontFamily.regular,
    },
    bookButton: {
      width: "100%",
      height: 50,
      backgroundColor: colors.blue,
      padding: spacing.md,
      paddingHorizontal: spacing.xxl,
      borderRadius: spacing.sm,
      marginTop: spacing.lg,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    bookButtonText: {
      color: colors.white100,
      // fontFamily: fontFamily.semiBold,
      // lineHeight: fontSize.xl,
      paddingLeft: spacing.sm,
    },
  });

  return (
    <View style={styles.bookCard}>
      <Text style={styles.bookTitle}>Answer to your common questions</Text>
      <Text style={styles.bookText}>
        Unlock insights with our concise and user-friendly FAQ guide
      </Text>

      {isLoading ? (
        <Pressable disabled style={styles.bookButton}>
          <View style={{ width: 30 }}>
            <CustomActivityIndicator
              backgroundColor={colors.blue}
              color={colors.white100}
            />
          </View>
          <Text style={styles.bookButtonText}>Please Wait </Text>
        </Pressable>
      ) : isSuccess ? (
        <Pressable
          disabled
          style={[styles.bookButton, { backgroundColor: colors.green500 }]}
        >
          <Check fill={colors.white100} color={colors.green400} />
          <Text style={styles.bookButtonText}>We have notified the team</Text>
        </Pressable>
      ) : (
        <Pressable onPress={bookMeeting} style={styles.bookButton}>
          <PhoneIcon fill={colors.white100} />
          <Text style={styles.bookButtonText}>Book a Meeting</Text>
        </Pressable>
      )}
    </View>
  );
};

export default BookMeetingCard;
