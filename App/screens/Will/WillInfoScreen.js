import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

const WillInfoScreen = () => {

    const { theme: { spacing, colors, fontSize } } = useTheme()

    const personalInfo = useSelector((state) => getPersonalInfoSelector(state))
    const witnesses = useSelector((state) => getWitnessesSelector(state))
    const beneficiaries = useSelector((state) => getBeneficiariesSelector(state))
    const assets = useSelector((state) => getSelectedAssetsSelector(state))
    const executors = useSelector((state) => getExecutorsSelector(state))
    const assetsDistribution = useSelector((state) => getAssetsSelector(state))
    const declarationInfo = useSelector((state) => getDeclarationSelector(state))

    const navigator = useNavigation()

    const styles = StyleSheet.create({

        enabledbutton: {
            padding: spacing.lg,
            margin: spacing.sm,
            borderRadius: 10,
            borderColor: colors.blue600,
            borderWidth: 0.5
        },
        enabledtext: {
            color: colors.blue600,
            fontSize: fontSize.lg,
            fontWeight: "700"
        },
        enabledsubtext: {
            color: colors.blue600,
            fontSize: fontSize.sm,
            paddingTop: 5
        },

        disabledbutton: {
            padding: spacing.lg,
            margin: spacing.sm,
            borderRadius: 10,
            borderColor: colors.black300,
            borderWidth: 0.5
        },
        disabledtext: {
            color: colors.black300,
            fontSize: fontSize.lg,
            fontWeight: "700"
        },
        disabledsubtext: {
            color: colors.black300,
            fontSize: fontSize.sm,
            paddingTop: 5
        },

        generatebtntext: {
            fontWeight: "700",
            textAlign : "center"
        },

        section: {
            paddingVertical: spacing.lg,
            borderWidth: 1,
            borderColor: colors.black200
        },
        sectiontitle: {
            marginHorizontal: spacing.md,
            fontWeight: "700",
            fontSize: fontSize.xl          
        },

        personpercentage: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },
        allocperson: {
            fontWeight: "500"
        },
        allocpercent: {
            fontWeight: "500"
        },

        warning: {
            color: colors.red700,
            fontSize: fontSize.sm,
            paddingTop: 5
        }

    })
    
    return (
        <ScrollView>

            {/* Testator Information Section */}
            <View style={styles.section}>
                <Text style={styles.sectiontitle}>
                    Testator Information 
                    {Object.keys(personalInfo).length != 0 ? ' ✔️' : '' }
                </Text>
                <TouchableOpacity style={styles.enabledbutton} onPress={() => navigator.navigate(SCREEN_NAMES.willPersonalInfoScreen)}>
                    <Text style={styles.enabledtext}>Add Testator Information</Text> 
                    <Text style={styles.enabledsubtext}>Testator information is mandatory</Text>
                </TouchableOpacity>
           </View>

            {/* Beneficiaries Section */}
            <View style={styles.section}>
                <Text style={styles.sectiontitle}>
                    Beneficiaries
                    { beneficiaries.length >= 1  ? ' ✔️' : '' }
                </Text>
                <TouchableOpacity 
                    disabled={Object.keys(personalInfo).length == 0 ? true : false }
                    style={Object.keys(personalInfo).length == 0 ? styles.disabledbutton : styles.enabledbutton }
                    onPress={() => navigator.navigate(SCREEN_NAMES.willBeneficiariesScreen)}
                >
                    <Text style={Object.keys(personalInfo).length == 0 ? styles.disabledtext : styles.enabledtext }>
                        Add Beneficiary
                    </Text> 
                    <Text style={Object.keys(personalInfo).length == 0 ? styles.disabledsubtext : styles.enabledsubtext }>
                        It is mandatory to add at least one beneficiary
                    </Text>
                </TouchableOpacity>
                {
                    beneficiaries.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} disabled style={styles.disabledbutton}>
                                <Text style={styles.disabledtext}>{item.name}</Text> 
                                <Text style={styles.disabledsubtext}>{item.relationshipWithTestator}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>

            {/* Witnesses Section */}
            <View style={styles.section}>
                <Text style={styles.sectiontitle}>
                    Witnesses ({witnesses.length}/2)
                    { witnesses.length == 2  ? ' ✔️' : '' }
                </Text>
                <TouchableOpacity 
                    disabled={beneficiaries.length < 1 ? true : false }
                    style={beneficiaries.length < 1 ? styles.disabledbutton : styles.enabledbutton} 
                    onPress={() => navigator.navigate(SCREEN_NAMES.willWitnessesScreen)}
                >
                    <Text style={beneficiaries.length < 1 ? styles.disabledtext : styles.enabledtext}>
                        Add Witness
                    </Text> 
                    <Text style={beneficiaries.length < 1 ? styles.disabledsubtext : styles.enabledsubtext}>
                        It is mandatory to add two witnesses
                    </Text>
                    <Text style={styles.warning}>
                        Warning: Beneficiaries and Witnesses should be different individuals
                    </Text>
                </TouchableOpacity>
                {
                    witnesses.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} disabled style={styles.disabledbutton}>
                                <Text style={styles.disabledtext}>{item.name}</Text> 
                                <Text style={styles.disabledsubtext}>{item.relationshipWithTestator}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>

            {/* Assets Section */}
            <View style={styles.section}>
                <Text style={styles.sectiontitle}>
                    Assets
                    { assets.length >= 1  ? ' ✔️' : '' }
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
                    Asset Allocation
                    {assetsDistribution.length > 0 ? " ✔️" : ""}
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
                                <Text style={styles.disabledtext}>{item.section}</Text> 
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
                    Executor ({executors.length}/2) (optional)
                    { executors.length == 2  ? ' ✔️' : '' }
                </Text>
                <TouchableOpacity style={styles.enabledbutton} onPress={() => navigator.navigate(SCREEN_NAMES.willExecutorScreen)}>
                    <Text style={styles.enabledtext}>Add Witness</Text> 
                    <Text style={styles.enabledsubtext}>It is mandatory to add two witnesses</Text>
                </TouchableOpacity>
                {
                    executors.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} disabled style={styles.disabledbutton}>
                                <Text style={styles.disabledtext}>{item.name}</Text> 
                                <Text style={styles.disabledsubtext}>{item.relationshipWithTestator}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>

            {/* Declaration Section */}
            <View style={styles.section}>
                <Text style={styles.sectiontitle}>
                    Declaration
                    { declarationInfo.declaration != '' ? ' ✔️' : '' }
                </Text>
                <TouchableOpacity 
                    disabled={assetsDistribution.length < 1 ? true : false}
                    style={assetsDistribution.length < 1 ? styles.disabledbutton : styles.enabledbutton}
                    onPress={() => navigator.navigate(SCREEN_NAMES.willDeclarationScreen)}
                >
                    <Text style={assetsDistribution.length < 1 ? styles.disabledtext : styles.enabledtext}>
                        Approve declaration
                    </Text> 
                    <Text style={assetsDistribution.length < 1 ? styles.disabledsubtext : styles.enabledsubtext}>
                        Without declaration will wont be created
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigator.navigate(SCREEN_NAMES.willGenerationScreen)}
                    disabled={ declarationInfo.declaration != '' ? false : true }
                    style={ declarationInfo.declaration != '' ? styles.enabledbutton : styles.disabledbutton }
                >
                    <Text style={[declarationInfo.declaration != '' ? styles.enabledtext : styles.disabledtext, styles.generatebtntext ]}>
                        GENERATE WILL
                    </Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}

export default WillInfoScreen
