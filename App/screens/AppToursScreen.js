import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useTheme } from "../theme/ThemeProvider";
import { useDispatch } from "react-redux";
import {
  setShowHomeTourModal,
  setShowWillTourModal,
} from "../services/appTours/appTours";

const AppToursScreen = () => {
  const dispatch = useDispatch();

  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const tours = [
    {
      title: "Home Tour",
      onPress: () => {
        dispatch(setShowHomeTourModal(true));
      },
    },
    {
      title: "Will Tour",
      onPress: () => {
        dispatch(setShowWillTourModal(true));
      },
    },
  ];

  const styles = StyleSheet.create({
    screen: {
      paddingVertical: spacing.md,
      backgroundColor: colors.white100,
      flex: 1,
    },
    cardContainer: {
      borderWidth: StyleSheet.hairlineWidth,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xl,
      marginHorizontal: spacing.lg,
      marginVertical: spacing.sm,
      borderColor: colors.black300,
      borderRadius: spacing.md,
      backgroundColor: colors.white300,
    },
    cardText: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.lg,
      color: colors.blue500,
    },
  });

  return (
    <View style={styles.screen}>
      <FlatList
        data={tours}
        renderItem={({ item, index }) => {
          return (
            <Pressable onPress={item.onPress} style={styles.cardContainer} key={index}>
              <Text style={styles.cardText}>{item.title}</Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default AppToursScreen;
