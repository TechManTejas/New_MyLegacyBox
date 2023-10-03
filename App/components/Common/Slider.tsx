import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../../theme/ThemeProvider";
import SliderItem from "./SliderItem";
import { homeCarouselData } from "../../data/Carouseldata";

const Slider = () => {
  const {
    theme: { colors, spacing },
  } = useTheme();

  const styles = StyleSheet.create({
    indicatorContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginVertical: spacing.xs,
    },
    indicator: {
      height: 4,
      width: 4,
      backgroundColor: colors.black300,
      marginHorizontal: spacing.xxs,
      borderRadius: spacing.xl,
    },
    indicatorActive: {
      backgroundColor: colors.blue,
    },
  });

  const [visibleItemIndex, setVisibleItemIndex] = useState(0);
  const flatListRef = useRef<FlatList | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const onViewCallBackRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) setVisibleItemIndex(viewableItems[0].index);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((carouselIndex + 1) % homeCarouselData.length);
      flatListRef.current?.scrollToIndex({
        index: carouselIndex,
        animated: true,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselIndex]);

  return (
    <>
      <FlatList
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        onViewableItemsChanged={onViewCallBackRef.current}
        viewabilityConfig={viewConfigRef.current}
        horizontal
        data={homeCarouselData}
        renderItem={({ item }) => <SliderItem item={item} />}
        pagingEnabled
      />
      <View style={styles.indicatorContainer}>
        {homeCarouselData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              visibleItemIndex === index && styles.indicatorActive,
            ]}
          />
        ))}
      </View>
    </>
  );
};

export default Slider;
