import {
  View,
  Text,
  Modal,
  FlatList,
  Pressable,
  StyleSheet,
  ViewToken,
} from "react-native";
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowWillTourModal } from "../../../redux/appTour/appTour";
import { useTheme } from "../../../theme/ThemeProvider";
import { RootStoreType } from "../../../redux/store";

import MyWillTourModalScreen1 from "./MyWillTourModalScreen1";
import MyWillTourModalScreen2 from "./MyWillTourModalScreen2";
import MyWillTourModalScreen3 from "./MyWillTourModalScreen3";

const MyWillTour = () => {
  const dispatch = useDispatch();

  const showModal = useSelector(
    (state: RootStoreType) => state.appTours.showWillTourModal
  );

  const {
    theme: { colors, fontFamily, spacing },
  } = useTheme();

  const styles = StyleSheet.create({
    modal: {
      backgroundColor: colors.white100,
      flex: 1,
    },
    indicatorContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: spacing.xl,
    },
    indicator: {
      height: 8,
      width: 8,
      backgroundColor: colors.black100,
      marginHorizontal: spacing.xs,
      borderRadius: 50,
    },
    indicatorActive: {
      backgroundColor: colors.blue,
    },
    buttonContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingBottom: spacing.lg,
      paddingHorizontal: spacing.xl,
    },
    skipButtonContainer: {
      borderRadius: spacing.xl,
      backgroundColor: colors.blue100,
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.sm,
    },
    skipButton: {
      fontFamily: fontFamily.semiBold,
      color: colors.blue300,
    },
  });

  const [visibleItemIndex, setVisibleItemIndex] = useState(0);

  interface ViewableItemsProps {
    viewableItems: ViewToken[];
  }

  const onViewCallBackRef = useRef(({ viewableItems }: ViewableItemsProps) => {
    if (viewableItems.length > 0) {
      setVisibleItemIndex(viewableItems[0].index as number);
    }
  });

  const viewConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const flatListRef = useRef(null);

  const hideModal = () => {
    dispatch(setShowWillTourModal(false));
  };

  const MY_WILL_TOUR_MODAL_SCREENS = [
    <MyWillTourModalScreen1 />,
    <MyWillTourModalScreen2 />,
    <MyWillTourModalScreen3 />,
  ];

  return (
    <Modal transparent visible={showModal} animationType="slide">
      <View style={styles.modal}>
        <FlatList
          data={MY_WILL_TOUR_MODAL_SCREENS}
          onViewableItemsChanged={onViewCallBackRef.current}
          viewabilityConfig={viewConfigRef.current}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          renderItem={({ item }) => item}
          ref={flatListRef}
        />

        <View style={styles.indicatorContainer}>
          {MY_WILL_TOUR_MODAL_SCREENS.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                visibleItemIndex === index && styles.indicatorActive,
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <Text></Text>
          <Pressable onPress={hideModal} style={styles.skipButtonContainer}>
            <Text style={styles.skipButton}>SKIP</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default MyWillTour;
