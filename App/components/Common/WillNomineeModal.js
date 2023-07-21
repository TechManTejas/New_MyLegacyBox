import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { useCallback, useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
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

const WillNomineeModal = ({ modalVisible, setModalVisible, nomineesType="beneficiaries" }) => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

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

  const snapPoints = ["70%"];
  const sheetRef = useRef(null);
  modalVisible && sheetRef.current?.snapToIndex(0);

  const nomineeList = useGetNomineesQuery();

  const typeFunctionMap = {
    beneficiaries: {
      get: useSelector((state) => getBeneficiariesSelector(state)) || [],
      add: addBeneficiaryRedux,
      remove: removeBeneficiaryRedux,
    },
    witnesses: {
      get: useSelector((state) => getWitnessesSelector(state)) || [],
      add: addWitnessRedux,
      remove: removeWitnessRedux,
    },
    executors: {
      get: useSelector((state) => getExecutorsSelector(state)) || [],
      add: addExecutorRedux,
      remove: removeExecutorRedux,
    },
  };


  const addNomineeCallBack = (item) => {
    // dispatch(typeFunctionMap[nomineesType].add(item));
    switch (nomineesType) {
      case "beneficiaries":
        dispatch(
          typeFunctionMap[nomineesType].add({
            age: item.age,
            name: item.fullName,
            relationshipWithTestator: item.relationship,
          })
        );
        break;
      case "witnesses":
        dispatch(
          typeFunctionMap[nomineesType].add({
            gender: item.gender,
            name: item.fullName,
            relationshipWithTestator: item.relationship,
            fathersName: item.fathersName,
            address: item.address,
          })
        );
        break;
      case "executors":
        dispatch(
          typeFunctionMap[nomineesType].add({
            gender: item.gender,
            name: item.fullName,
            relationshipWithTestator: item.relationship,
            fathersName: item.fathersName,
            address: item.address,
            aadharNumber: item.aadharNumber,
          })
        );
        break;
      default:
        break;
    }
  };

  const disableCallback = (item) => {
    return nomineesType !== "beneficiaries" &&
      typeFunctionMap[nomineesType].get.length === 2;
  };

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
      onClose={() => setModalVisible(false)}
      index={-1}
      backdropComponent={renderBackdrop}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.modalheader}>
          <Text style={styles.modalheadertext}>Share with</Text>
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
          {nomineeList.isLoading || nomineeList.isFetching ? (
            <View style={{ paddingTop: spacing.xl }}>
              <CustomActivityIndicator />
            </View>
          ) : nomineeList.data.entities === null ? (
            <View style={{ paddingTop: spacing.xl }}>
              <Empty message="No Nominees Available" />
            </View>
          ) : (
            nomineesType && (
              <BottomSheetFlatList
                style={styles.flatList}
                data={Object.values(
                  nomineeList?.data ? nomineeList.data.entities : {}
                )}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {
                  console.log({
                    beneficiaries: typeFunctionMap.beneficiaries.get.find(n => n.name === item.fullName)?.name,
                    witnesses: typeFunctionMap.witnesses.get.find(n => n.name === item.fullName)?.name
                  });
                  return typeFunctionMap[nomineesType].get.some(
                    (c) => c.name === item.fullName
                  ) ? (
                    <WillNomeineeModalCard
                      nomineesType={nomineesType}
                      isApproved
                      item={item}
                      callBack={() => {
                        dispatch(
                          typeFunctionMap[nomineesType].remove(item.fullName)
                        );
                      }}
                    />
                  ) : (
                    <WillNomeineeModalCard
                      nomineesType={nomineesType}
                      item={item}
                      disableCallback={() => disableCallback(item)}
                      callBack={() => addNomineeCallBack(item)}
                    />
                  );
                }}
              />
            )
          )}
        </View>
      </View>
    </BottomSheet>
  );
};

export default WillNomineeModal;
