import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../../constants/screenNames";
import {
    getBeneficiariesSelector,
    getPersonalInfoSelector,
    getWitnessesSelector,
    getExecutorsSelector,
    getSelectedAssetsSelector,
    getAssetsSelector,
    getDeclarationSelector
} from "../../services/willForm/willFormSlice";
import { useSelector } from "react-redux";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import BlueButton from "../../components/Common/Button/BlueButton";

const WillInfoScreen = () => {

    const { theme: { spacing, colors, fontSize, fontFamily } } = useTheme()

    const personalInfo = useSelector((state) => getPersonalInfoSelector(state))
    const witnesses = useSelector((state) => getWitnessesSelector(state))
    const beneficiaries = useSelector((state) => getBeneficiariesSelector(state))
    const assets = useSelector((state) => getSelectedAssetsSelector(state))
    const executors = useSelector((state) => getExecutorsSelector(state))
    const assetsDistribution = useSelector((state) => getAssetsSelector(state))
    const declarationInfo = useSelector((state) => getDeclarationSelector(state))

    const witnessValues = witnesses[witnesses.length] ? witnesses[witnesses.length] : {}
    const executorValues = executors[executors.length] ? executors[executors.length] : {}

    const navigator = useNavigation()

    const styles = StyleSheet.create({

        enabledbutton: {
            padding: spacing.sm,
            paddingHorizontal: spacing.md,
            borderRadius: 10,
            borderColor: colors.black200,
            borderWidth: 0.5,
            marginTop: spacing.sm
        },
        enabledtext: {
            color: colors.blue600,
            fontSize: fontSize.lg,
            fontFamily: fontFamily.semiBold,
            lineHeight: spacing.xl
        },
        enabledsubtext: {
            color: colors.black400,
            fontSize: fontSize.md,
            fontFamily: fontFamily.regular
        },

        disabledbutton: {
            padding: spacing.sm,
            paddingHorizontal: spacing.md,
            borderRadius: 10,
            borderColor: colors.black400,
            borderWidth: 0.5,
            marginTop: spacing.sm
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

        generatebtntext: {
            textAlign: "center",
            fontFamily: fontFamily.semiBold,
        },

        section: {
            paddingVertical: spacing.lg,
            borderBottomWidth: 1,
            borderBottomColor: colors.black200,
            marginHorizontal: spacing.lg
        },
        sectiontitle: {
            marginHorizontal: spacing.md,
            fontFamily: fontFamily.semiBold,
            fontSize: fontSize.xl
        },

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
        iconspace: {
            marginRight: spacing.xl
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
            borderColor: colors.blue300,
            backgroundColor: colors.blue100
        },
        displaycardtext: {
            color: colors.blue600,
            
        }

    })

    const TickIcon = <FontAwesome name="check-circle" size={styles.icon.fontSize} color={styles.icon.color} />
    const PenIcon = <FontAwesome5 name="pen" size={styles.penicon.fontSize} color={styles.penicon.color}/>

    const getPressHandler = (screenName, initialValues, index) => {
        navigator.navigate(screenName, { initialValues, index })
    }

    return (
        <ScrollView>

            {/* Testator Information Section */}
            <View style={styles.section}>
                <Text style={styles.sectiontitle}>
                    <Text>Testator Information </Text> {(Object.keys(personalInfo).length != 0) && TickIcon}
                </Text>
                <TouchableOpacity style={styles.enabledbutton} onPress={() => navigator.navigate(SCREEN_NAMES.willPersonalInfoScreen)}>
                    <Text style={styles.enabledtext}>Add Testator Information</Text>
                    <Text style={styles.enabledsubtext}>Testator information is mandatory</Text>
                </TouchableOpacity>
            </View>

            {/* Beneficiaries Section */}
            <View style={styles.section}>
                <Text style={styles.sectiontitle}>
                    <Text>Beneficiaries</Text> {(beneficiaries.length >= 1) && TickIcon}
                </Text>
                <TouchableOpacity
                    disabled={Object.keys(personalInfo).length == 0 ? true : false}
                    style={Object.keys(personalInfo).length == 0 ? styles.disabledbutton : styles.enabledbutton}
                    onPress={() => getPressHandler(SCREEN_NAMES.willBeneficiaryInfoScreen, {}, undefined)}
                >
                    <Text style={Object.keys(personalInfo).length == 0 ? styles.disabledtext : styles.enabledtext}>
                        Add Beneficiary
                    </Text>
                    <Text style={Object.keys(personalInfo).length == 0 ? styles.disabledsubtext : styles.enabledsubtext}>
                        It is mandatory to add at least one beneficiary
                    </Text>
                </TouchableOpacity>
                {
                    beneficiaries.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} disabled style={[ styles.disabledbutton, styles.displaycards ]}>
                                <View>
                                    <Text style={[styles.disabledtext, styles.displaycardtext]}>{item.name}</Text>
                                    <Text style={[styles.disabledsubtext, styles.displaycardtext]}>{item.relationshipWithTestator}</Text>
                                </View>
                                <Pressable onPress={() => getPressHandler(SCREEN_NAMES.willBeneficiaryInfoScreen, item, index)}>
                                    { PenIcon }
                                </Pressable>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>

            {/* Witnesses Section */}
            <View style={styles.section}>
                <Text style={styles.sectiontitle}>
                    <Text>Witnesses ({witnesses.length}/2)</Text> {(witnesses.length == 2) && TickIcon}
                </Text>
                <TouchableOpacity
                    disabled={beneficiaries.length < 1 || witnesses.length == 2 ? true : false}
                    style={beneficiaries.length < 1 || witnesses.length == 2 ? styles.disabledbutton : styles.enabledbutton}
                    onPress={() => getPressHandler(SCREEN_NAMES.willWitnessInfoScreen, witnessValues, undefined)}
                >
                    <Text style={beneficiaries.length < 1 || witnesses.length == 2 ? styles.disabledtext : styles.enabledtext}>
                        Add Witness
                    </Text>
                    <Text style={beneficiaries.length < 1 || witnesses.length == 2 ? styles.disabledsubtext : styles.enabledsubtext}>
                        It is mandatory to add two witnesses
                    </Text>
                    {
                        witnesses.length != 2 &&
                        <Text style={styles.warning}>
                            Warning: Beneficiaries and Witnesses should be different individuals
                        </Text>
                    }
                </TouchableOpacity>
                {
                    witnesses.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} disabled style={[ styles.disabledbutton, styles.displaycards ]}>
                                <View>
                                    <Text style={[styles.disabledtext, styles.displaycardtext]}>{item.name}</Text>
                                    <Text style={[styles.disabledsubtext, styles.displaycardtext]}>{item.relationshipWithTestator}</Text>
                                </View>
                                <Pressable onPress={() => getPressHandler(SCREEN_NAMES.willWitnessInfoScreen, witnesses[index], index)}>
                                    { PenIcon }
                                </Pressable>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>

            {/* Assets Section */}
            <View style={styles.section}>
                <Text style={styles.sectiontitle}>
                    <Text>Assets</Text> {(assets.length >= 1) && TickIcon}
                </Text>
                <TouchableOpacity
                    disabled={witnesses.length != 2 ? true : false}
                    style={witnesses.length != 2 ? styles.disabledbutton : styles.enabledbutton}
                    onPress={() => navigator.navigate(SCREEN_NAMES.willAssetsScreen)}
                >
                    <Text style={witnesses.length != 2 ? styles.disabledtext : styles.enabledtext}>
                        Select Assets ({assets.length})
                    </Text>
                    <Text style={witnesses.length != 2 ? styles.disabledsubtext : styles.enabledsubtext}>
                        It is mandatory to Select at least one asset
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Asset Allocation Section */}
            <View style={styles.section}>
                <Text style={styles.sectiontitle}>
                    <Text>Asset Allocation</Text> {(assetsDistribution.length > 0) && TickIcon}
                </Text>
                <TouchableOpacity
                    disabled={assets.length < 1 ? true : false}
                    style={assets.length < 1 ? styles.disabledbutton : styles.enabledbutton}
                    onPress={() => navigator.navigate(SCREEN_NAMES.willAssetInfoScreen)}
                >
                    <Text style={assets.length < 1 ? styles.disabledtext : styles.enabledtext}>
                        Allocate Assets
                    </Text>
                    <Text style={assets.length < 1 ? styles.disabledsubtext : styles.enabledsubtext}>
                        It is mandatory to allocate assets
                    </Text>
                </TouchableOpacity>
                {
                    assetsDistribution.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} disabled style={styles.disabledbutton}>
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
                            </TouchableOpacity>
                        )
                    })
                }
            </View>

            {/* Executor Optional Section */}
            <View style={styles.section}>
                <Text style={styles.sectiontitle}>
                    <Text>Executor ({executors.length}/2) (optional)</Text> {(executors.length == 2) && TickIcon}
                </Text>
                <TouchableOpacity
                    disabled={executors.length == 2 ? true : false}
                    style={executors.length == 2 ? styles.disabledbutton : styles.enabledbutton}
                    onPress={() => getPressHandler(SCREEN_NAMES.willExecutorInfoScreen, executorValues, undefined)}
                >
                    <Text style={executors.length == 2 ? styles.disabledtext : styles.enabledtext} >
                        Add Witness
                    </Text>
                    <Text style={executors.length == 2 ? styles.disabledsubtext : styles.enabledsubtext}>
                        It is mandatory to add two witnesses
                    </Text>
                    {
                        (executors.length != 2) &&
                        <Text style={styles.warning}>
                            Warning: Beneficiaries, Witnesses and Executors should be different individuals.
                        </Text>
                    }
                </TouchableOpacity>
                {
                    executors.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} disabled style={[ styles.disabledbutton, styles.displaycards ]}>
                                <View>
                                    <Text style={[styles.disabledtext, styles.displaycardtext]}>{item.name}</Text>
                                    <Text style={[styles.disabledsubtext, styles.displaycardtext]}>{item.relationshipWithTestator}</Text>
                                </View>
                                <Pressable onPress={() => getPressHandler(SCREEN_NAMES.willExecutorInfoScreen, executors[index], index)}>
                                    { PenIcon }
                                </Pressable>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>

            {/* Declaration Section */}
            <View style={styles.section}>
                <Text style={styles.sectiontitle}>
                    <Text>Declaration</Text> {(declarationInfo.declaration != '') && TickIcon}
                </Text>
                <TouchableOpacity
                    disabled={assetsDistribution.length < 1 ? true : false}
                    style={[assetsDistribution.length < 1 ? styles.disabledbutton : styles.enabledbutton, { marginBottom: spacing.lg }]}
                    onPress={() => navigator.navigate(SCREEN_NAMES.willDeclarationScreen)}
                >
                    <Text style={assetsDistribution.length < 1 ? styles.disabledtext : styles.enabledtext}>
                        Approve declaration
                    </Text>
                    <Text style={assetsDistribution.length < 1 ? styles.disabledsubtext : styles.enabledsubtext}>
                        Without declaration will wont be created
                    </Text>
                </TouchableOpacity>
                <BlueButton
                    disabled={declarationInfo.declaration != '' ? false : true}
                    title="GENERATE WILL"
                    onPress={() => navigator.navigate(SCREEN_NAMES.willGenerationScreen)}
                />
            </View>

        </ScrollView>
    )
}

export default WillInfoScreen
