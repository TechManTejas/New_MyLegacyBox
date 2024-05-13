import { View, ScrollView } from "react-native";
import { useTheme } from "../../../../testApp/theme/ThemeProvider";
import {
  getBeneficiariesSelector,
  getWitnessesSelector,
  getExecutorsSelector,
  clearAssets,
} from "../../../../testApp/redux/form/willFormSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import WillNomineeModal from "../../../../testApp/components/Common/WillNomineeModal";
import WillFormContainer from "../../../../testApp/components/Will/WillFormContainer";
import WillTab from "../../../../testApp/components/Common/WillTab";
import WillInfoCard from "../../../../testApp/components/Common/WillInfoCard";
import UsersGroup from "../../../../testApp/assets/icons/users-group.svg";
import WillMemberRelationCard from "../../../../testApp/components/Will/WillMemberRelationCard";
import { useRouter } from "expo-router";

const WillRoleAssigncreen = () => {
  const {
    theme: { spacing, colors },
  } = useTheme();

  const witnesses = useSelector((state) => getWitnessesSelector(state));
  const beneficiaries = useSelector((state) => getBeneficiariesSelector(state));
  const executors = useSelector((state) => getExecutorsSelector(state));

  const router = useRouter()

  const [modalState, setModalState] = useState({
    nomineesType: "",
    modalVisible: false,
  });

  const [showNominee, setShowNominees] = useState({
    beneficiaries: false,
    witnesses: false,
    guardians: false,
    executors: false,
  });

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
        Handler={() => router.back()}
        nextDisabled={witnesses.length !== 2 || beneficiaries.length === 0}
        title="Done"
      >
        <ScrollView>
          <WillInfoCard content="Allocate different roles to the members you've included in your 'My Circle' for your Will. It's important to note that a member cannot be assigned roles that create conflicts of interest, as such conflicts may lead to potential legal complications and disputes in the Will in future." />
          <View style={{ marginBottom: spacing.xxxl }}>
            <WillTab
              areNomineesDisplayed={showNominee.beneficiaries}
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
                setModalState({
                  nomineesType: "beneficiaries",
                  modalVisible: true,
                });
              }}
              nominees={beneficiaries}
              showNomineesOnPress={() =>
                setShowNominees((prev) => ({
                  ...prev,
                  beneficiaries: !prev.beneficiaries,
                }))
              }
              elevated
              dataFilled={beneficiaries.length !== 0}
              showPlusIcon
            />
            {showNominee.beneficiaries && beneficiaries.length !== 0 && (
              <WillMemberRelationCard membersList={beneficiaries} />
            )}

            {!beneficiaries.every((beneficiary) => beneficiary.age >= 18) && (
              <WillTab
                showPlusIcon
                areNomineesDisplayed={showNominee.guardians}
                tabSubTitle={
                  beneficiaries
                    .filter((beneficiary) => beneficiary.age < 18)
                    .every((beneficiary) =>
                      beneficiary.hasOwnProperty("guardian")
                    )
                    ? undefined
                    : "Guardian not assigned for some minors"
                }
                icon={
                  <UsersGroup
                    height={24}
                    width={24}
                    color={
                      beneficiaries.some((beneficiary) => beneficiary.guardian)
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
                  setModalState({
                    nomineesType: "guardian",
                    modalVisible: true,
                  });
                }}
                elevated
                nominees={beneficiaries}
                showNomineesOnPress={() =>
                  setShowNominees((prev) => ({
                    ...prev,
                    guardians: !prev.guardians,
                  }))
                }
                disabled={beneficiaries.every(
                  (beneficiary) => beneficiary.age >= 18
                )}
                dataFilled={beneficiaries
                  // .filter((beneficiary) => beneficiary.age < 18)
                  .some((beneficiary) => beneficiary.guardian)}
              />
            )}
            {showNominee.guardians &&
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
              areNomineesDisplayed={showNominee.witnesses}
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
                setModalState({
                  nomineesType: "witnesses",
                  modalVisible: true,
                });
              }}
              nominees={witnesses}
              showNomineesOnPress={() =>
                setShowNominees((prev) => ({
                  ...prev,
                  witnesses: !prev.witnesses,
                }))
              }
              elevated
              dataFilled={witnesses.length === 2}
            />
            {showNominee.witnesses && witnesses.length !== 0 && (
              <WillMemberRelationCard membersList={witnesses} />
            )}

            <WillTab
              showPlusIcon
              areNomineesDisplayed={showNominee.executors}
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
                setModalState({
                  nomineesType: "executors",
                  modalVisible: true,
                });
              }}
              nominees={executors}
              showNomineesOnPress={() =>
                setShowNominees((prev) => ({
                  ...prev,
                  executors: !prev.executors,
                }))
              }
              elevated
              dataFilled={executors.length !== 0}
            />
            {showNominee.executors && executors.length !== 0 && (
              <WillMemberRelationCard membersList={executors} />
            )}
          </View>
        </ScrollView>
      </WillFormContainer>

      <WillNomineeModal
        closeModal={() => {
          setModalState({ modalVisible: false, nomineesType: "" });
        }}
        openModal={() => {}}
        modalState={modalState}
      />
    </>
  );
};

export default WillRoleAssigncreen;
