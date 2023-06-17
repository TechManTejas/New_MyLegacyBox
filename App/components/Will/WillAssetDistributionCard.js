import { useSelector } from "react-redux"
import { getAssetsSelector } from "../../services/willForm/willFormSlice"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { useTheme } from "../../theme/ThemeProvider"

const WillAssetDistributionCard = () => {

    const { theme: { spacing, colors, fontSize, fontFamily } } = useTheme()

    const styles = StyleSheet.create({
        personpercentage: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },
        allocperson: {
            fontFamily: fontFamily.semiBold
        },
        allocpercent: {
            fontFamily: fontFamily.semiBold
        },
        disabledbutton: {
            padding: spacing.sm,
            paddingHorizontal: spacing.md,
            borderRadius: 10,
            borderColor: colors.black200,
            borderWidth: 0.5,
            marginTop: spacing.sm,
        },
        disabledtext: {
            color: colors.black400,
            fontSize: fontSize.lg,
            fontFamily: fontFamily.semiBold,
            lineHeight: spacing.xl
        },
    })

    const assetsDistribution = useSelector((state) => getAssetsSelector(state))

    return assetsDistribution.map((item, index) => {
        return (
            <Pressable key={index} disabled style={styles.disabledbutton}>
                <Text style={styles.disabledtext}>{item.itemTitle}</Text>
                {
                    Object.entries(item.allocations).map(([key, val], idx) => {
                        return (
                            <View style={styles.personpercentage} key={idx}>
                                <Text style={styles.allocperson}>{key}</Text>
                                <Text style={styles.allocpercent}>{val} %</Text>
                            </View>
                        )
                    })
                }
            </Pressable>
        )
    })
}

export default WillAssetDistributionCard
