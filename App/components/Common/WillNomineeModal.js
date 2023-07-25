import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef } from "react";
import { BackHandler, Pressable, StyleSheet, Text, View } from "react-native";
import { useGetNomineesQuery } from "../../services/nominee/nomineeSlice";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../theme/ThemeProvider";
import CustomActivityIndicator from "./CustomActivityIndicator";
import Empty from "./Empty";
import { SCREEN_NAMES } from "../../constants/screenNames";
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
} from "../../services/willForm/willFormSlice";
import WillNomeineeModalCard from "./WillNomineeModalCard";
import { useState } from "react";

const WillNomineeModal = ({
  modalVisible,
  setModalVisible,
  nomineesType,
  setNomineesType,
}) => {

  const snapPoints = ["70%"];
  const sheetRef = useRef(null);
  modalVisible && sheetRef.current?.snapToIndex(0);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {

    const backAction = () => {

      if (modalVisible) {
        setModalVisible(false);
        setNomineesType("");
        sheetRef.current?.close()
        return true;
      }
      return false

    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [modalVisible]);

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
  };

  const [usedNominees, setUsedNominees] = useState([]);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={() => {
        setModalVisible(false);
        setNomineesType("");
      }}
      index={-1}
      backdropComponent={renderBackdrop}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.modalheader}>
          <Text style={styles.modalheadertext}>
            {nomineesType && typeFunctionMap[nomineesType].shareMessage}
          </Text>
          <Pressable
            style={styles.modalbtn}
            onPress={() => {
              navigation.navigate(SCREEN_NAMES.willAddNomineeScreen);
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
          ) : nomineesType ? (
            <BottomSheetFlatList
              style={styles.flatList}
              data={Object.values(nomineeList.data?.entities)}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => {
                return typeFunctionMap[nomineesType].get.some(
                  (c) => c._id === item._id
                ) ? (
                  <WillNomeineeModalCard
                    nomineesType={nomineesType}
                    isApproved
                    item={item}
                    callBack={() => {
                      dispatch(typeFunctionMap[nomineesType].remove(item._id));
                      setUsedNominees(
                        usedNominees.filter(
                          (nominee) => nominee._id !== item._id
                        )
                      );
                    }}
                  />
                ) : (
                  <WillNomeineeModalCard
                    nomineesType={nomineesType}
                    usedNominees={usedNominees}
                    item={item}
                    disableCallback={
                      nomineesType !== "beneficiaries" &&
                      typeFunctionMap[nomineesType].get.length === 2
                    }
                    callBack={() => {
                      dispatch(typeFunctionMap[nomineesType].add(item));
                      setUsedNominees([
                        ...usedNominees,
                        { _id: item._id, type: nomineesType },
                      ]);
                    }}
                  />
                );
              }}
            />
          ) : (
            <CustomActivityIndicator />
          )}
        </View>
      </View>
    </BottomSheet>
  );
};

export default WillNomineeModal;
