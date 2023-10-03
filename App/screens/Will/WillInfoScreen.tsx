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
  setPersonalInfoRedux,
} from "../../redux/form/willFormSlice";
import { useDispatch, useSelector } from "react-redux";
import BlueButton from "../../components/Common/Button/BlueButton";
import WillAssetDistributionCard from "../../components/Will/WillAssetDistributionCard";
import WillSectionCard from "../../components/Will/WillSectionCard";
import React, { useEffect, useState } from "react";
import WillNomineeModal from "../../components/Common/WillNomineeModal";
import { ScrollView } from "react-native";
import { useGetPersonalInfoQuery } from "../../redux/api/personalInfo/personalInfoApiSlice";

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
    dispatch(clearAssets());
  }, [beneficiaries]);

  const generateWillActivate =
    Object.keys(personalInfo).length != 0 &&
    beneficiaries.length >= 1 &&
    beneficiaries
      .filter((beneficiary) => beneficiary.age < 18)
      .every((beneficiary) => beneficiary.guardian) &&
    witnesses.length == 2 &&
    assetsDistribution.length > 0 &&
    declarationInfo.declaration != "";

  const { data, isLoading, isFetching } = useGetPersonalInfoQuery();
  const [allFilledTestatorInfo, setAllFilledTestatorInfo] = useState(false);
  const [someFilledTestatorInfo, setSomeFilledTestatorInfo] = useState(true);

  useEffect(() => {
    let allFilled, someFilled;

    if (
      !(isFetching || isLoading) &&
      data?.data &&
      typeof data.data === "object"
    ) {
      allFilled =
        data?.data.hasOwnProperty("gender") &&
        data?.data.hasOwnProperty("age") &&
        data?.data.hasOwnProperty("fathersName") &&
        data?.data.hasOwnProperty("aadharNumber") &&
        data?.data.hasOwnProperty("address") &&
        data?.data.hasOwnProperty("dateOfBirth");

      setAllFilledTestatorInfo(allFilled);

      someFilled =
        data?.data.hasOwnProperty("gender") ||
        data?.data.hasOwnProperty("age") ||
        data?.data.hasOwnProperty("fathersName") ||
        data?.data.hasOwnProperty("aadharNumber") ||
        data?.data.hasOwnProperty("address") ||
        data?.data.hasOwnProperty("dateOfBirth");

      setSomeFilledTestatorInfo(someFilled);

      if (allFilled) dispatch(setPersonalInfoRedux(data.data));
    }
  }, [data, isFetching, isLoading]);

  return (
    <>
      <ScrollView>
        <View style={styles.section}>
          <WillSectionCard
            sectiontitle={"My Details"}
            tickCondition={allFilledTestatorInfo}
            title={
              allFilledTestatorInfo
                ? "Testator Information Added"
                : "Edit Testator Information"
            }
            subtitle={"A Testator is a person who writes a Will"}
            isLoading={isLoading || isFetching}
            showEditIcon={!allFilledTestatorInfo}
            someDataFilled={someFilledTestatorInfo}
            onPress={() => {
              navigator.navigate(SCREEN_NAMES.peronsalInfoScreen);
            }}
          />
        </View>

        <View style={styles.section}>
          <WillSectionCard
            sectiontitle={"My Beneficiaries"}
            tickCondition={beneficiaries.length >= 1}
            title={"Add Beneficiary"}
            subtitle={"A person(s) who inherits the assets under a Will"}
            disableCondition={Object.keys(personalInfo).length == 0}
            onPress={() => {
              setNomineesType("beneficiaries");
              setModalVisible(true);
            }}
            array={beneficiaries}
          />
        </View>

        <View style={styles.section}>
          <WillSectionCard
            sectiontitle={`Guardian (${
              beneficiaries.filter(
                (beneficiary) => beneficiary.age < 18 && beneficiary.guardian
              ).length
            }/${
              beneficiaries.filter((beneficiary) => beneficiary.age < 18).length
            })`}
            tickCondition={
              beneficiaries.filter((beneficiary) => beneficiary.age < 18).length > 0 &&
              beneficiaries
                .filter((beneficiary) => beneficiary.age < 18)
                .every((beneficiary) => beneficiary.guardian)
            }
            title={"Add Guardian for minor(s)"}
            subtitle={"A person who is the guardian for a minor beneficiary"}
            disableCondition={
              Object.keys(personalInfo).length == 0 ||
              beneficiaries.every((beneficiary) => beneficiary.age >= 18)
            }
            onPress={() => {
              setNomineesType("guardian");
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
            disableCondition={beneficiaries.length < 1}
            warnCondition={witnesses.length != 2}
            warnMsg={
              "To avoid any future conflict, a witness should not be a beneficiary"
            }
            onPress={() => {
              setNomineesType("witnesses");
              setModalVisible(true);
            }}
            array={witnesses}
          />
        </View>

        <View style={styles.section}>
          <WillSectionCard
            sectiontitle={"My Asset Distribution"}
            tickCondition={assetsDistribution.length > 0}
            title={"Distribute Assets"}
            subtitle={"Distribute your assets as per your wish"}
            disableCondition={
              witnesses.length != 2 ||
              beneficiaries.length < 1 ||
              beneficiaries.some(
                (beneficiary) => beneficiary.age < 18 && !beneficiary.guardian
              )
            }
            onPress={() => navigator.navigate(SCREEN_NAMES.willAssetsScreen)}
            warnCondition={true}
            warnMsg={
              "Modifying beneficiary or selected assets will require re allocation"
            }
            showEditIcon={true}
            dataFilled={assetsDistribution.length > 0}
          />
          <WillAssetDistributionCard
            beneficiariesMap={beneficiaries.reduce((acc, beneficiary) => {
              acc[beneficiary._id] = beneficiary;
              return acc;
            }, {})}
          />
        </View>

        <View style={styles.section}>
          <WillSectionCard
            sectiontitle={`My Executors (${executors.length}/2)`}
            tickCondition={executors.length == 2}
            title={"Add Executors"}
            subtitle={"Executor handles wealth distribution of the Testator"}
            optional={true}
            onPress={() => {
              setNomineesType("executors");
              setModalVisible(true);
            }}
            array={executors}
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
        setNomineesType={setNomineesType}
      />
    </>
  );
};

export default WillInfoScreen;
