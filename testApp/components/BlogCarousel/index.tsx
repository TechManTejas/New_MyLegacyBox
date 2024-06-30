import {
  View,
  FlatList,
  StyleSheet,
  ViewToken,
  ImageSourcePropType,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import BlogCard from "./BlogCard";
import { useTheme } from "../../theme/ThemeProvider";

interface BlogCardProps {
  image: ImageSourcePropType;
  title: string;
  text: string;
  blogUrl: string
}

interface BlogCarouselProps {
  data: BlogCardProps[];
}

const BlogCarousel: React.FC<BlogCarouselProps> = ({ data }) => {
  const {
    theme: { spacing, colors },
  } = useTheme();

  const styles = StyleSheet.create({
    carousel: {
      marginBottom: spacing.lg,
    },
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

  interface ViewableItemsProps {
    viewableItems: ViewToken[];
  }

  const onViewCallBackRef = useRef(({ viewableItems }: ViewableItemsProps) => {
    if (viewableItems.length > 0)
      setVisibleItemIndex(viewableItems[0].index as number);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((carouselIndex + 1) % data.length);
      flatListRef.current?.scrollToIndex({
        index: carouselIndex,
        animated: true,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselIndex]);

  return (
    <View style={styles.carousel}>
      <FlatList
        // onViewableItemsChanged={onViewCallBackRef.current}
        // viewabilityConfig={viewConfigRef.current}
        // ref={flatListRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        // pagingEnabled
        data={data}
        renderItem={({ item, index }) => {
          return <BlogCard key={index} {...item} />;
        }}
      />
      {/* <View style={styles.indicatorContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              visibleItemIndex === index && styles.indicatorActive,
            ]}
          />
        ))}
      </View> */}
    </View>
  );
};

export default BlogCarousel;
