import { Pressable, StyleSheet, Text, View } from "react-native"
import { useTheme } from "../../theme/ThemeProvider"
import { useNavigation } from "@react-navigation/native"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import FontAwesome5 from "@expo/vector-icons/FontAwesome5"

const WillSectionCard = ({
    sectiontitle,
    tickCondition,
    title,
    subtitle,
    disableCondition,
    screenName,
    initialValues,
    paramindex,
    warnCondition,
    warnMsg,
    array
}) => {

    const { theme: { spacing, colors, fontSize, fontFamily } } = useTheme()

    const navigator = useNavigation()

    const styles = StyleSheet.create({
        sectiontitle: {
            marginHorizontal: spacing.md,
            fontFamily: fontFamily.semiBold,
            fontSize: fontSize.xl
        },
        warning: {
            color: colors.red700,
            fontSize: fontSize.sm,
            paddingTop: 5,
            fontFamily: fontFamily.regular
        },
        icon: {
            fontSize: fontSize.xl,
            color: colors.green600,
        },
        enabledbutton: {
            padding: spacing.sm,
            paddingHorizontal: spacing.md,
            borderRadius: 10,
            borderColor: colors.blue400,
            borderWidth: 0.5,
            marginTop: spacing.sm,
            backgroundColor: colors.blue100
        },
        enabledtext: {
            color: colors.blue600,
            fontSize: fontSize.lg,
            fontFamily: fontFamily.semiBold,
            lineHeight: spacing.xl
        },
        enabledsubtext: {
            color: colors.blue500,
            fontSize: fontSize.md,
            fontFamily: fontFamily.regular
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
        disabledsubtext: {
            color: colors.black400,
            fontSize: fontSize.md,
            fontFamily: fontFamily.regular,
        },
        noncard: {
            backgroundColor: colors.black200
        },
        penicon: {
            fontSize: fontSize.default,
            color: colors.blue400
        },
        displaycards: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderColor: colors.black200,
        }
    })

    const CheckIcon = <FontAwesome name="check-circle" size={styles.icon.fontSize} color={styles.icon.color} />
    const PenIcon = <FontAwesome5 name="pen" size={styles.penicon.fontSize} color={styles.penicon.color} />

    return (
        <>
            <Text style={styles.sectiontitle}>
                <Text>{sectiontitle}</Text> {tickCondition && CheckIcon}
            </Text>
            <Pressable
                disabled={disableCondition ? true : false}
                style={disableCondition ? [styles.disabledbutton, styles.noncard] : styles.enabledbutton}
                onPress={() => navigator.navigate(screenName, { initialValues, paramindex })}
            >
                <Text style={disableCondition ? styles.disabledtext : styles.enabledtext}>{title}</Text>
                <Text style={disableCondition ? styles.disabledsubtext : styles.enabledsubtext}>{subtitle}</Text>
                {warnCondition && <Text style={styles.warning}>{warnMsg}</Text>}
            </Pressable>
            {
                array && array.map((item, index) => {
                    return <Pressable key={index} disabled style={[styles.disabledbutton, styles.displaycards]}>
                        <View>
                            <Text style={styles.disabledtext}>{item.name}</Text>
                            <Text style={styles.disabledsubtext}>{item.relationshipWithTestator}</Text>
                        </View>
                        <Pressable onPress={() => navigator.navigate(screenName, { initialValues: item, index })}>
                            {PenIcon}
                        </Pressable>
                    </Pressable>
                })
            }
        </>
    )
}

export default WillSectionCard
