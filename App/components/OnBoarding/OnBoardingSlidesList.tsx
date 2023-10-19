import React, { useRef, useState } from "react";
import { FlatList, StyleSheet, View, ViewToken } from "react-native";
import { ON_BOARDING_SLIDES_DATA } from "../../data/onBoardingData";
import { useTheme } from "../../theme/ThemeProvider";
import OnboardSlide from "./OnBoardingSlide";
import { useEffect } from "react";

const OnBoardingSlidesList = () => {
  const {
    theme: { colors, spacing },
  } = useTheme();

  const styles = StyleSheet.create({
    flatListContainer: {
      flex: 1,
    },
    indicatorContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: spacing.x4l,
    },
    indicator: {
      height: 2.5,
      width: 10,
      backgroundColor: colors.black300,
      marginHorizontal: spacing.xxs,
      borderRadius: spacing.xxs,
    },
    indicatorActive: {
      backgroundColor: colors.blue,
      width: 25,
    },
  });

  interface OnViewCallBackRefProps {
    viewableItems: ViewToken[];
  }

  const [visibleItemIndex, setVisibleItemIndex] = useState(0);
  const onViewCallBackRef = useRef(
    ({ viewableItems }: OnViewCallBackRefProps) => {
      if (viewableItems.length > 0) {
        setVisibleItemIndex(viewableItems[0].index as number);
      }
    }
  );

  const viewConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const flatListRef = useRef<FlatList | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((carouselIndex + 1) % ON_BOARDING_SLIDES_DATA.length);
      flatListRef.current?.scrollToIndex({
        index: carouselIndex,
        animated: true,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselIndex]);

  return (
    <View style={styles.flatListContainer}>
      <FlatList
        data={ON_BOARDING_SLIDES_DATA}
        onViewableItemsChanged={onViewCallBackRef.current}
        viewabilityConfig={viewConfigRef.current}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        renderItem={({ item }) => <OnboardSlide item={item} />}
        keyExtractor={(item) => item.id}
        ref={flatListRef}
      />
      <View style={styles.indicatorContainer}>
        {ON_BOARDING_SLIDES_DATA.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              visibleItemIndex === index && styles.indicatorActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default OnBoardingSlidesList;
