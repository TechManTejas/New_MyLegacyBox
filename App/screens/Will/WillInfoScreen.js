import { StyleSheet, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../../constants/screenNames";
import {
  getBeneficiariesSelector,
  getPersonalInfoSelector,
  getWitnessesSelector,
  getExecutorsSelector,
  getAssetsSelector,
  getDeclarationSelector,
  clearAssets,
} from "../../services/willForm/willFormSlice";
import { useDispatch, useSelector } from "react-redux";
import BlueButton from "../../components/Common/Button/BlueButton";
import WillAssetDistributionCard from "../../components/Will/WillAssetDistributionCard";
import WillSectionCard from "../../components/Will/WillSectionCard";
import { useEffect } from "react";
import { useState } from "react";
import WillNomineeModal from "../../components/Common/WillNomineeModal";
import { ScrollView } from "react-native";

const WillInfoScreen = () => {
  const {
    theme: { spacing, colors },
  } = useTheme();

  const dispatch = useDispatch();

  const personalInfo = useSelector((state) => getPersonalInfoSelector(state));
  const witnesses = useSelector((state) => getWitnessesSelector(state));
  const beneficiaries = useSelector((state) => getBeneficiariesSelector(state));
  const executors = useSelector((state) => getExecutorsSelector(state));
  const assetsDistribution = useSelector((state) => getAssetsSelector(state));
  const declarationInfo = useSelector((state) => getDeclarationSelector(state));

  const navigator = useNavigation();

  const styles = StyleSheet.create({
    section: {
      paddingTop: spacing.lg,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.black200,
      marginHorizontal: spacing.lg,
    },
    footer: {
      paddingBottom: spacing.lg,
    },
  });

  const [nomineesType, setNomineesType] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (beneficiaries.length !== 0) dispatch(clearAssets());
  }, [beneficiaries]);

  const generateWillActivate =
    Object.keys(personalInfo).length != 0 &&
    beneficiaries.length >= 1 &&
    witnesses.length == 2 &&
    assetsDistribution.length > 0 &&
    declarationInfo.declaration != "";

  return (
    <>
      <ScrollView>
        <View style={styles.section}>
          <WillSectionCard
            sectiontitle={"My Details"}
            tickCondition={Object.keys(personalInfo).length != 0}
            title={
              Object.keys(personalInfo).length != 0
                ? personalInfo.name
                : "Add Testator Information"
            }
            subtitle={"A Testator is a person who writes a Will"}
            onPress={() =>
              navigator.navigate(SCREEN_NAMES.willPersonalInfoScreen)
            }
            showEditIcon={true}
            dataFilled={Object.keys(personalInfo).length != 0}
          />
        </View>

        <View style={styles.section}>
          <WillSectionCard
            sectiontitle={"My Beneficiaries"}
            tickCondition={beneficiaries.length >= 1}
            title={"Add Beneficiary"}
            subtitle={"A person(s) who inherits the assets under a Will"}
            // disableCondition={Object.keys(personalInfo).length == 0}
            onPress={() => {
              setNomineesType("beneficiaries");
              setModalVisible(true);
            }}
          />
        </View>

        <View style={styles.section}>
          <WillSectionCard
            sectiontitle={`My Witnesses (${witnesses.length}/2)`}
            tickCondition={witnesses.length == 2}
            title={"Add Witness"}
            subtitle={"A person who testifies to the authenticity of the Will"}
            // disableCondition={beneficiaries.length < 1 || witnesses.length == 2}
            warnCondition={witnesses.length != 2}
            warnMsg={
              "To avoid any future conflict, a witness should not be a beneficiary"
            }
            onPress={() => {
              setNomineesType("witnesses");
              setModalVisible(true);
            }}
          />
        </View>

        <View style={styles.section}>
          <WillSectionCard
            sectiontitle={"My Asset Distribution"}
            tickCondition={assetsDistribution.length > 0}
            title={"Distribute Assets"}
            subtitle={"Distribute your assets as per your wish"}
            disableCondition={witnesses.length != 2}
            onPress={() => navigator.navigate(SCREEN_NAMES.willAssetsScreen)}
            warnCondition={true}
            warnMsg={
              "Modifying beneficiary or selected assets will require re allocation"
            }
            showEditIcon={true}
            dataFilled={assetsDistribution.length > 0}
          />
          <WillAssetDistributionCard />
        </View>

        <View style={styles.section}>
          <WillSectionCard
            sectiontitle={`My Executors (${executors.length}/2)`}
            tickCondition={executors.length == 2}
            title={"Add Executors"}
            subtitle={"Executor handles wealth distribution of the Testator"}
            disableCondition={executors.length == 2}
            warnCondition={executors.length != 2}
            warnMsg={
              "To avoid any future conflict, an executor should not be a beneficiary or a witness"
            }
            optional={true}
            onPress={() => {
              setNomineesType("executors");
              setModalVisible(true);
            }}
          />
        </View>

        <View style={styles.section}>
          <WillSectionCard
            sectiontitle={"Declaration"}
            tickCondition={declarationInfo.declaration != ""}
            title={"Approve declaration"}
            subtitle={"To generate a Will, a declaration must be approved"}
            disableCondition={assetsDistribution.length < 1}
            onPress={() =>
              navigator.navigate(SCREEN_NAMES.willDeclarationScreen)
            }
          />
          <View style={{ marginTop: spacing.lg }} />

          <View style={styles.footer}>
            <BlueButton
              disabled={!generateWillActivate}
              title="Generate Will"
              onPress={() =>
                navigator.navigate(SCREEN_NAMES.willGenerationScreen)
              }
            />
          </View>
        </View>
      </ScrollView>
      <WillNomineeModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        nomineesType={nomineesType}
      />
    </>
  );
};

export default WillInfoScreen;
