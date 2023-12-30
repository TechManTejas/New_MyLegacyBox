import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useRef } from "react";
import { BackHandler, Pressable, StyleSheet, Text, View } from "react-native";
import { useGetNomineesQuery } from "../../redux/api/nominee/nomineeSlice";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../theme/ThemeProvider";
import CustomActivityIndicator from "./CustomActivityIndicator";
import Empty from "./Empty";
import { useDispatch, useSelector } from "react-redux";
import {
  addBeneficiaryRedux,
  addExecutorRedux,
  addWitnessRedux,
  getBeneficiariesSelector,
  getWitnessesSelector,
  getExecutorsSelector,
  removeBeneficiaryRedux,
  removeExecutorRedux,
  removeWitnessRedux,
  editBeneficiaryRedux,
  getWillRolesTrackerData,
  setWillRolesTracker,
} from "../../redux/form/willFormSlice";
import WillNomeineeModalCard from "./WillNomineeModalCard";
import WillNomineeModalGuardianCard from "./WillNomineeModalGuardianCard";

interface WillNomineeModalProps {
  modalState: {
    nomineesType: string;
    modalVisible: boolean;
  };
  closeModal: () => void;
  openModal: () => void;
}

const WillNomineeModal: React.FC<WillNomineeModalProps> = ({
  modalState,
  closeModal,
  openModal,
}) => {
  const snapPoints = ["70%"];
  const sheetRef = useRef<BottomSheet | null>(null);

  modalState.modalVisible && sheetRef.current?.snapToIndex(0);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onBottomSheetClose = () => {};

  useEffect(() => {
    const backAction = () => {
      if (modalState.modalVisible) {
        sheetRef.current?.close();
        closeModal();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [modalState.modalVisible]);

  const {
    theme: { colors, fontSize, spacing, fontFamily },
  } = useTheme();

  const styles = StyleSheet.create({
    modalheader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: colors.black300,
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.lg,
    },
    modalheadertext: {
      color: colors.blue500,
      fontSize: fontSize.xl,
      lineHeight: fontSize.xxl,
      fontFamily: fontFamily.semiBold,
    },
    modalbtn: {
      backgroundColor: colors.blue500,
      borderRadius: 5,
      paddingVertical: 2,
      paddingHorizontal: spacing.sm,
    },
    modalbtntext: {
      color: colors.white,
      paddingRight: 2,
      paddingTop: 2,
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.md,
    },
    modalContent: {
      flex: 1,
      paddingBottom: spacing.xl,
    },
    flatList: {
      paddingHorizontal: spacing.xs,
    },
  });

  const nomineeList = useGetNomineesQuery();

  const typeFunctionMap = {
    beneficiaries: {
      get: useSelector((state) => getBeneficiariesSelector(state)) || [],
      add: addBeneficiaryRedux,
      remove: removeBeneficiaryRedux,
      shareMessage: "Add Beneficiary",
    },
    witnesses: {
      get: useSelector((state) => getWitnessesSelector(state)) || [],
      add: addWitnessRedux,
      remove: removeWitnessRedux,
      shareMessage: "Add Witness",
    },
    executors: {
      get: useSelector((state) => getExecutorsSelector(state)) || [],
      add: addExecutorRedux,
      remove: removeExecutorRedux,
      shareMessage: "Add Executor",
    },
    guardian: {
      get: useSelector((state) => getBeneficiariesSelector(state)) || [],
      update: editBeneficiaryRedux,
      shareMessage: "Add Guardian",
    },
  };

  const usedRoles = useSelector((state) => getWillRolesTrackerData(state));

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior={"close"}
        onPress={() => {
          closeModal();
        }}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      // enablePanDownToClose={true}
      onClose={onBottomSheetClose}
      index={-1}
      backdropComponent={renderBackdrop}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.modalheader}>
          <Text style={styles.modalheadertext}>
            {modalState.nomineesType &&
              typeFunctionMap[modalState.nomineesType].shareMessage}
          </Text>
          <Pressable
            style={styles.modalbtn}
            onPress={() => {
              navigation.navigate("ADD_NOMINEE_SCREEN");
            }}
          >
            <Text style={styles.modalbtntext}>+ My Circle</Text>
          </Pressable>
        </View>

        <View style={styles.modalContent}>
          {nomineeList.isLoading ||
          nomineeList.isFetching ||
          nomineeList.data === undefined ? (
            <View style={{ paddingTop: spacing.xl }}>
              <CustomActivityIndicator />
            </View>
          ) : nomineeList.data.entities === null ? (
            <View style={{ paddingTop: spacing.xl }}>
              <Empty message="No Nominees Available" />
            </View>
          ) : modalState.nomineesType ? (
            modalState.nomineesType !== "guardian" ? (
              <BottomSheetFlatList
                style={styles.flatList}
                data={Object.values(nomineeList.data?.entities)}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {
                  return typeFunctionMap[modalState.nomineesType].get.some(
                    (c) => c._id === item._id
                  ) ? (
                    <WillNomeineeModalCard
                      nomineesType={modalState.nomineesType}
                      isApproved
                      item={item}
                      callBack={() => {
                        dispatch(
                          typeFunctionMap[modalState.nomineesType].remove(
                            item._id
                          )
                        );
                        dispatch(
                          setWillRolesTracker(
                            usedRoles.filter(
                              (nominee) => nominee._id !== item._id
                            )
                          )
                        );
                      }}
                    />
                  ) : (
                    <WillNomeineeModalCard
                      nomineesType={modalState.nomineesType}
                      usedNominees={usedRoles}
                      item={item}
                      disableCallback={
                        modalState.nomineesType !== "beneficiaries" &&
                        typeFunctionMap[modalState.nomineesType].get.length ===
                          2
                      }
                      callBack={() => {
                        dispatch(
                          typeFunctionMap[modalState.nomineesType].add(item)
                        );
                        dispatch(
                          setWillRolesTracker([
                            ...usedRoles,
                            { _id: item._id, type: modalState.nomineesType },
                          ])
                        );
                      }}
                    />
                  );
                }}
              />
            ) : (
              <BottomSheetFlatList
                style={styles.flatList}
                data={typeFunctionMap[modalState.nomineesType].get}
                keyExtractor={(item) => item._id}
                renderItem={({ item, index }) => {
                  return item.age < 18 ? (
                    <WillNomineeModalGuardianCard
                      isApproved={item.guardian !== undefined}
                      item={item}
                      nominees={Object.values(nomineeList.data?.entities)}
                      callBack={(_id) => {
                        dispatch(
                          typeFunctionMap[modalState.nomineesType].update({
                            index,
                            beneficiary: {
                              ...item,
                              guardian: nomineeList.data?.entities[_id],
                            },
                          })
                        );
                      }}
                    />
                  ) : null;
                }}
              />
            )
          ) : (
            <CustomActivityIndicator />
          )}
        </View>
      </View>
    </BottomSheet>
  );
};

export default WillNomineeModal;
