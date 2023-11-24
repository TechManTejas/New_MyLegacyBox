import { View, ScrollView } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import {
  getBeneficiariesSelector,
  getWitnessesSelector,
  getExecutorsSelector,
  clearAssets,
} from "../../redux/form/willFormSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import WillNomineeModal from "../../components/Common/WillNomineeModal";
import WillFormContainer from "../../components/Will/WillFormContainer";
import WillTab from "../../components/Common/WillTab";
import WillInfoCard from "../../components/Common/WillInfoCard";
import UsersGroup from "../../assets/icons/users-group.svg";
import WillMemberRelationCard from "../../components/Will/WillMemberRelationCard";

const WillRoleAssigncreen = () => {
  const {
    theme: { spacing, colors },
  } = useTheme();

  const witnesses = useSelector((state) => getWitnessesSelector(state));
  const beneficiaries = useSelector((state) => getBeneficiariesSelector(state));
  const executors = useSelector((state) => getExecutorsSelector(state));

  const navigation = useNavigation();

  const [nomineesType, setNomineesType] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [showBeneficiaries, setShowBeneficiaries] = useState(false);
  const [showGuardians, setShowGuardians] = useState(false);
  const [showWitnesses, setShowWitnesses] = useState(false);
  const [showExecutors, setShowExecutors] = useState(false);

  const dispatch = useDispatch();

  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current === true) {
      isInitialRender.current = false;
    } else {
      dispatch(clearAssets());

    }
  }, [beneficiaries]);

  return (
    <>
      <WillFormContainer
        Handler={() => navigation.goBack()}
        nextDisabled={witnesses.length !== 2 || beneficiaries.length === 0}
        title="Done"
      >
        <ScrollView>
          <WillInfoCard content="Allocate different roles to the members you've included in your 'My Circle' for your Will. It's important to note that a member cannot be assigned roles that create conflicts of interest, as such conflicts may lead to potential legal complications and disputes in the Will in future." />
          <View style={{ marginBottom: spacing.xxxl }}>
            <WillTab
              areNomineesDisplayed={showBeneficiaries}
              icon={
                <UsersGroup
                  height={24}
                  width={24}
                  color={
                    beneficiaries.length !== 0
                      ? colors.green500
                      : colors.blue500
                  }
                />
              }
              tabTitle="Add Beneficiaries"
              onPress={() => {
                setNomineesType("beneficiaries");
                setModalVisible(true);
              }}
              nominees={beneficiaries}
              showNomineesOnPress={() => setShowBeneficiaries((prev) => !prev)}
              elevated
              dataFilled={beneficiaries.length !== 0}
              showPlusIcon
            />
            {showBeneficiaries && beneficiaries.length !== 0 && (
              <WillMemberRelationCard membersList={beneficiaries} />
            )}

            {!beneficiaries.every(
                (beneficiary) => beneficiary.age >= 18
              ) && <WillTab
              showPlusIcon
              areNomineesDisplayed={showGuardians}
              icon={
                <UsersGroup
                  height={24}
                  width={24}
                  color={
                    beneficiaries.filter((beneficiary) => beneficiary.age < 18)
                      .length > 0 &&
                    beneficiaries
                      .filter((beneficiary) => beneficiary.age < 18)
                      .every((beneficiary) => beneficiary.guardian)
                      ? colors.green500
                      : beneficiaries.every(
                          (beneficiary) => beneficiary.age >= 18
                        )
                      ? colors.black300
                      : colors.blue500
                  }
                />
              }
              tabTitle="Add Guardian for minor(s)"
              onPress={() => {
                setNomineesType("guardian");
                setModalVisible(true);
              }}
              elevated
              nominees={beneficiaries}
              showNomineesOnPress={() => setShowGuardians((prev) => !prev)}
              disabled={beneficiaries.every(
                (beneficiary) => beneficiary.age >= 18
              )}
              dataFilled={
                beneficiaries.filter((beneficiary) => beneficiary.age < 18)
                  .length > 0 &&
                beneficiaries
                  .filter((beneficiary) => beneficiary.age < 18)
                  .every((beneficiary) => beneficiary.guardian)
              }
            />}
            {showGuardians &&
              beneficiaries.length !== 0 &&
              beneficiaries.filter(
                (beneficiary) => beneficiary.age < 18 && beneficiary.guardian
              ).length !== 0 && (
                <WillMemberRelationCard
                  guardianCard
                  membersList={beneficiaries.filter(
                    (beneficiary) =>
                      beneficiary.age < 18 && beneficiary.guardian
                  )}
                />
              )}

            <WillTab
            showPlusIcon
              areNomineesDisplayed={showWitnesses}
              icon={
                <UsersGroup
                  height={24}
                  width={24}
                  color={
                    witnesses.length === 2 ? colors.green500 : colors.blue500
                  }
                />
              }
              tabTitle="Add Witnesses"
              onPress={() => {
                setNomineesType("witnesses");
                setModalVisible(true);
              }}
              nominees={witnesses}
              showNomineesOnPress={() => setShowWitnesses((prev) => !prev)}
              elevated
              dataFilled={witnesses.length === 2}
            />
            {showWitnesses && witnesses.length !== 0 && (
              <WillMemberRelationCard membersList={witnesses} />
            )}

            <WillTab
            showPlusIcon
              areNomineesDisplayed={showExecutors}
              icon={
                <UsersGroup
                  height={24}
                  width={24}
                  color={
                    executors.length !== 0 ? colors.green500 : colors.blue500
                  }
                />
              }
              tabTitle="Add Executors"
              onPress={() => {
                setNomineesType("executors");
                setModalVisible(true);
              }}
              nominees={executors}
              showNomineesOnPress={() => setShowExecutors((prev) => !prev)}
              elevated
              dataFilled={executors.length !== 0}
            />
            {showExecutors && executors.length !== 0 && (
              <WillMemberRelationCard membersList={executors} />
            )}
          </View>
        </ScrollView>
      </WillFormContainer>

      <WillNomineeModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        nomineesType={nomineesType}
        setNomineesType={setNomineesType}
      />
    </>
  );
};

export default WillRoleAssigncreen;
