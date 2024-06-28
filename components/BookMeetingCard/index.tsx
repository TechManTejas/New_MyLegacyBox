import { View, Text, StyleSheet, ToastAndroid, Pressable } from "react-native";
import React from "react";
import { useTheme } from "../../testApp/theme/ThemeProvider";
import { useBookMeetingMutation } from "../../testApp/redux/api/book-meet/book-meet";
import CustomActivityIndicator from "../../testApp/components/Common/CustomActivityIndicator";

import PhoneIcon from "../../testApp/assets/icons/phone-outlined.svg";
import Check from "../../testApp/assets/icons/circle-check.svg";
import { Link } from "expo-router";

const BookMeetingCard = () => {
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
    bookCard: {
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.black400,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: spacing.sm,
      marginBottom: spacing.lg,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
    },
    bookTitle: {
      textAlign: "center",
      fontSize: fontSize.lg,
      lineHeight: fontSize.xl,
      fontFamily: fontFamily.semiBold,
      paddingBottom: spacing.sm
    },
    bookText: {
      textAlign: "center",
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.lg
    },
    bookButton: {
      width: "100%",
      height: 40,
      backgroundColor: colors.blue,
      borderRadius: spacing.sm,
      marginTop: spacing.lg,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    bookButtonText: {
      color: colors.white100,
      paddingLeft: spacing.sm,
    },
  });

  return (
    <View style={styles.bookCard}>
      <Text style={styles.bookTitle}>Got questions ??</Text>
      <Text style={styles.bookText}>
        User friendly{" "}
        <Link
          style={{ fontFamily: fontFamily.semiBold, color: colors.blue500 }}
          replace
          href={"/home/faq"}
        >
          FAQs guide
        </Link>
      </Text>
      <Text style={styles.bookText}>
        Book an exploration call with our team
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
          <Text style={styles.bookButtonText}>Book Now</Text>
        </Pressable>
      )}
    </View>
  );
};

export default BookMeetingCard;
