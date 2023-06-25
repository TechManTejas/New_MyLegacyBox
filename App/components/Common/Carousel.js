import { FlatList, View, Dimensions, ImageBackground, StyleSheet, Text } from 'react-native';
import { useRef } from 'react';
import { useTheme } from "../../theme/ThemeProvider";
import { useEffect } from 'react';
import { useState } from 'react';

const Carousel = ({ carouselData }) => {

    const { theme: { colors, fontFamily, fontSize, spacing } } = useTheme()

    const { width } = Dimensions.get("window")

    const styles = StyleSheet.create({

        container: {
            borderWidth: StyleSheet.hairlineWidth,
            borderRadius: 15,
            borderColor: colors.blue400,
            margin: 1
        },
        img: {
            width: width - 35,
        },

        cardtext: {
            display: "flex",
            justifyContent: "center",
            height: 100,
            paddingHorizontal: spacing.xl,
        },
        cardtitle: {
            color: colors.blue500,
            fontSize: fontSize.md,
            fontFamily: fontFamily.semiBold,
            lineHeight: fontSize.lg
        },
        cardsubtitle: {
            color: colors.blue500,
            fontSize: fontSize.sm,
        },

        leftcard: {
            marginRight: 120,
            alignItems: "flex-start"
        },
        rightcard: {
            marginLeft: 120,
            alignItems: "flex-end"
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

    })

    const flatListRef = useRef(null)

    const [index, setIndex] = useState(0)

    const [visibleItemIndex, setVisibleItemIndex] = useState(0);
    const onViewCallBackRef = useRef(({ viewableItems }) => {
        setVisibleItemIndex(viewableItems[0].index);
      }, []);

    // useEffect(() => {

    //     const interval = setInterval(() => {
    //         flatListRef.current.scrollToIndex({ index, animated: true })
    //         setIndex((index + 1) % carouselData.length)
    //     }, 5000)

    //     return () => clearInterval(interval)

    // }, [index])

    return (
        <View>
            <FlatList
                ref={flatListRef}
                onViewableItemsChanged={onViewCallBackRef.current}
                horizontal
                pagingEnabled
                data={carouselData}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <View style={styles.container}>
                            <ImageBackground
                                imageStyle={{ borderRadius: 15 }}
                                resizeMode="stretch"
                                style={styles.img}
                                key={index}
                                source={item.img}
                            >
                                <View style={[styles.cardtext, item.align === "left" ? styles.leftcard : styles.rightcard]}>
                                    <Text style={styles.cardtitle}>
                                        {item.title}
                                    </Text>
                                    <Text style={[styles.cardsubtitle, item.align !== "left" && { textAlign: "right" }]}>
                                        {item.subtitle}
                                    </Text>
                                </View>
                            </ImageBackground>
                        </View>
                    )
                }}
            />
                  {/* <View style={styles.indicatorContainer}>
        {carouselData.map((_, index) => (
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
    )
}

export default Carousel
