import { ScrollView, StyleSheet, View } from "react-native";
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
    getDeclarationSelector,
    clearAssets
} from "../../services/willForm/willFormSlice";
import { useDispatch, useSelector } from "react-redux";
import BlueButton from "../../components/Common/Button/BlueButton";
import WillAssetDistributionCard from "../../components/Will/WillAssetDistributionCard";
import WillSectionCard from "../../components/Will/WillSectionCard";
import { useEffect } from "react";

const WillInfoScreen = () => {

    const { theme: { spacing, colors } } = useTheme()

    const dispatch = useDispatch();

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
        section: {
            paddingVertical: spacing.lg,
            borderBottomWidth: 1,
            borderBottomColor: colors.black200,
            marginHorizontal: spacing.lg
        }
    })

    useEffect(() => {
        if ( beneficiaries.length != 0 ) dispatch(clearAssets())
    }, [beneficiaries])

    return (
        <ScrollView>
            
            <View style={styles.section}>
                <WillSectionCard
                    sectiontitle={"Testator Information"}
                    tickCondition={Object.keys(personalInfo).length != 0}
                    title={Object.keys(personalInfo).length != 0 ? personalInfo.name :"Add Testator Information"}
                    subtitle={"Testator information is mandatory"}
                    screenName={SCREEN_NAMES.willPersonalInfoScreen}
                    showEditIcon={true}
                    dataFilled={Object.keys(personalInfo).length != 0 ? true : false}
                />
            </View>

            <View style={styles.section}>
                <WillSectionCard
                    sectiontitle={"Beneficiaries"}
                    tickCondition={beneficiaries.length >= 1}
                    title={"Add Beneficiary"}
                    subtitle={"It is mandatory to add at least one beneficiary"}
                    disableCondition={Object.keys(personalInfo).length == 0}
                    screenName={SCREEN_NAMES.willBeneficiaryInfoScreen}
                    initialValues={{}}
                    index={undefined}
                    array={beneficiaries}
                />
            </View>

            <View style={styles.section}>
                <WillSectionCard
                    sectiontitle={`Witnesses (${witnesses.length}/2)`}
                    tickCondition={witnesses.length == 2}
                    title={"Add Witness"}
                    subtitle={"It is mandatory to add two witnesses"}
                    disableCondition={beneficiaries.length < 1 || witnesses.length == 2}
                    screenName={SCREEN_NAMES.willWitnessInfoScreen}
                    initialValues={witnessValues}
                    index={undefined}
                    warnCondition={witnesses.length != 2}
                    warnMsg={"Advisory: To avoid any future conflict, a witness should not be a beneficiary”"}
                    array={witnesses}
                />
            </View>
{/* 
            <View style={styles.section}>
                <WillSectionCard
                    sectiontitle={"Assets"}
                    tickCondition={assets.length >= 1}
                    title={`Select Assets (${assets.length})`}
                    subtitle={"It is mandatory to Select at least one asset"}
                    disableCondition={witnesses.length != 2}
                    screenName={SCREEN_NAMES.willAssetsScreen}
                />
            </View> */}

            <View style={styles.section}>
                <WillSectionCard
                    sectiontitle={"My Asset Distribution"}
                    tickCondition={assetsDistribution.length > 0}
                    title={"Allocate Assets"}
                    subtitle={"Distribute your assets as per your wish"}
                    disableCondition={witnesses.length != 2}
                    screenName={SCREEN_NAMES.willAssetsScreen}
                    warnCondition={true}
                    warnMsg={"Warning: Modifying beneficiary or selected assets will require re allocation"}
                    showEditIcon={true}
                    dataFilled={assetsDistribution.length > 0}
                />
                <WillAssetDistributionCard />
            </View>

            <View style={styles.section}>
                <WillSectionCard
                    sectiontitle={`Executor (${executors.length}/2) (optional)`}
                    tickCondition={executors.length == 2}
                    title={"Add Executors"}
                    subtitle={"It is mandatory to add two witnesses"}
                    disableCondition={executors.length == 2}
                    screenName={SCREEN_NAMES.willExecutorInfoScreen}
                    initialValues={executorValues}
                    index={undefined}
                    warnCondition={executors.length != 2}
                    warnMsg={"Advisory: To avoid any future conflict, an executor should not be a beneficiary or a witness"}
                    array={executors}
                />
            </View>

            <View style={styles.section}>
                <WillSectionCard
                    sectiontitle={"Declaration"}
                    tickCondition={declarationInfo.declaration != ''}
                    title={"Approve declaration"}
                    subtitle={"Without declaration will wont be created"}
                    disableCondition={assetsDistribution.length < 1}
                    screenName={SCREEN_NAMES.willDeclarationScreen}
                />
                <View style={{ marginTop: spacing.lg }} />
                <BlueButton
                    disabled={declarationInfo.declaration != '' ? false : true}
                    title="Generate Will"
                    onPress={() => navigator.navigate(SCREEN_NAMES.willGenerationScreen)}
                />
            </View>
        </ScrollView>
    )
}

export default WillInfoScreen
