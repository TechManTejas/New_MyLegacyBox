import {
  View,
  Text,
  Modal,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { useState, useRef } from "react";
import { useTheme } from "../../theme/ThemeProvider";
import { HOME_TOUR_DATA } from "../../data/HomeTourData";
import HomeTourItems from "./HomeTourItem";
import { useDispatch, useSelector } from "react-redux";
import { setShowHomeTourModal } from "../../services/appTours/appTours";
import Animated, {
  FadeInDown,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";

const HomeTourModal = () => {
  const dispatch = useDispatch();

  const showModal = useSelector((state) => state.appTours.showHomeTourModal);

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
      marginBottom: spacing.u100,
      paddingBottom: spacing.u100,
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

  const onViewCallBackRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setVisibleItemIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const flatListRef = useRef(null);

  const hideModal = () => {
    dispatch(setShowHomeTourModal(false));
  };

  return (
    <Modal transparent visible={showModal} animationType="none">
      <Animated.View
        entering={SlideInDown.duration(350)}
        exiting={SlideOutDown.duration(350)}
        style={styles.modal}
      >
        <FlatList
          data={HOME_TOUR_DATA}
          onViewableItemsChanged={onViewCallBackRef.current}
          viewabilityConfig={viewConfigRef.current}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          renderItem={({ item }) => <HomeTourItems item={item} />}
          keyExtractor={(item) => item.id}
          ref={flatListRef}
        />

        <View style={styles.indicatorContainer}>
          {HOME_TOUR_DATA.map((_, index) => (
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
      </Animated.View>
    </Modal>
  );
};

export default HomeTourModal;
