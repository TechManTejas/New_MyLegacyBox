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
            width: 351,
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
            marginVertical: spacing.xs
        },
        indicator: {
            height: 10,
            width: 10,
            backgroundColor: colors.black300,
            marginHorizontal: spacing.xxs,
            borderRadius: spacing.xl,
        },
        indicatorActive: {
            backgroundColor: colors.blue
        },

    })

    const flatListRef = useRef(null)

    const [carouselIndex, setCarouselIndex] = useState(0)

    const [visibleItemIndex, setVisibleItemIndex] = useState(0)

    const onViewCallBackRef = useRef(({ viewableItems }) => {
        // console.log(viewableItems);
        setVisibleItemIndex(viewableItems[0].index)
    }, [])

    // useEffect(() => {

    //     const interval = setInterval(() => {
    //         setCarouselIndex((carouselIndex + 1) % carouselData.length)
    //         flatListRef.current.scrollToIndex({ index: carouselIndex, animated: true })
    //     }, 5000)

    //     return () => clearInterval(interval)

    // }, [carouselIndex])

    return (
        <View>
            <View style={styles.indicatorContainer}>
                {carouselData.map((_, index) => {
                    // console.log(index);
                    return <View
                        key={index}
                        style={[styles.indicator, visibleItemIndex === index && styles.indicatorActive]}
                    />
                    })}
            </View>
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
        </View>
    )
}

export default Carousel
