import { useSelector } from "react-redux"
import { getAssetsSelector } from "../../services/willForm/willFormSlice"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { useTheme } from "../../theme/ThemeProvider"

const WillAssetDistributionCard = ({ beneficiariesMap }) => {

    const { theme: { spacing, colors, fontSize, fontFamily } } = useTheme()

    const styles = StyleSheet.create({
        personpercentage: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },
        allocperson: {
            fontFamily: fontFamily.semiBold,
            color: colors.black400,
        },
        allocpercent: {
            fontFamily: fontFamily.semiBold,
            color: colors.black400,
        },
        card: {
            padding: spacing.sm,
            paddingHorizontal: spacing.md,
            borderRadius: 10,
            borderColor: colors.black200,
            borderWidth: 0.5,
            marginTop: spacing.sm,
        },
        cardtitle: {
            color: colors.blue600,
            fontSize: fontSize.lg,
            fontFamily: fontFamily.semiBold,
            lineHeight: spacing.xl
        },
    })

    const assetsDistribution = useSelector((state) => getAssetsSelector(state))

    return assetsDistribution.map((item, index) => {
        return (
            <Pressable key={index} disabled style={styles.card}>
                <Text style={styles.cardtitle}>{item.itemTitle}</Text>
                {
                    Object.entries(item.allocations).map(([key, val], idx) => {
                        return (
                            <View style={styles.personpercentage} key={idx}>
                                <Text style={styles.allocperson}>{beneficiariesMap[key].fullName}</Text>
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
