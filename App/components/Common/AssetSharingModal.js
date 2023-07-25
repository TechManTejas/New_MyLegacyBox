import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  useGetNomineesForAnArtifactQuery,
  useRevokeAssetAccessFromNomineeMutation,
  useShareAssetToNomineeMutation,
} from "../../services/assetSharing/assetSharingApiSlice";
import { useGetNomineesQuery } from "../../services/nominee/nomineeSlice";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../theme/ThemeProvider";
import CustomActivityIndicator from "./CustomActivityIndicator";
import Empty from "./Empty";
import ShareNomineeModalCard from "../Nominee/ShareNomineeModalCard";
import { SCREEN_NAMES } from "../../constants/screenNames";
import { BackHandler } from "react-native";

const AssetSharingModal = ({
  modalVisible,
  setModalVisible,
  artifactDetails,
  setArtifactDetails,
}) => {
  const snapPoints = ["70%"];
  const sheetRef = useRef(null);
  modalVisible && sheetRef.current?.snapToIndex(0);

  useEffect(() => {

    if (!modalVisible) {
      setArtifactDetails({
        financialArtifactId: "",
        financialArtifactType: "",
      })
    }

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (modalVisible) {
          setModalVisible(false);
          sheetRef.current?.close();
          return true;
        }
        return false;
      }
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

  const { data, isLoading, isFetching } = useGetNomineesForAnArtifactQuery(
    artifactDetails.financialArtifactId
  );

  const [
    revokeAssetAccessFromNominee,
    { isLoading: revokeAssetAccessFromNomineeLoading },
  ] = useRevokeAssetAccessFromNomineeMutation();

  const [shareAssetToNominee, { isLoading: shareAssetToNomineeLoading }] =
    useShareAssetToNomineeMutation();
  const navigation = useNavigation();

  const share = (item) => {
    shareAssetToNominee({
      nomineeId: item._id,
      nomineeEmail: item.email,
      financialArtifactId: artifactDetails.financialArtifactId,
      financialArtifactType: artifactDetails.financialArtifactType,
      isFinancialArtifactOfTypeInstitution: false,
    });
  };

  const revoke = (item) =>
    revokeAssetAccessFromNominee({
      nomineeEmail: item.email,
      financialArtifactId: artifactDetails.financialArtifactId,
    });

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
      }}
      index={-1}
      backdropComponent={renderBackdrop}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.modalheader}>
          <Text style={styles.modalheadertext}>Share with</Text>
          <Pressable
            style={styles.modalbtn}
            onPress={() => {
              navigation.navigate(SCREEN_NAMES.homeAddNomineeScreen);
            }}
          >
            <Text style={styles.modalbtntext}>+ My Circle</Text>
          </Pressable>
        </View>
        <View style={styles.modalContent}>
          {nomineeList.isLoading ||
          nomineeList.isFetching ||
          isLoading ||
          isFetching ||
          data === undefined ? (
            <View style={{ paddingTop: spacing.xl }}>
              <CustomActivityIndicator />
            </View>
          ) : nomineeList.data.entities === null ? (
            <View style={{ paddingTop: spacing.xl }}>
              <Empty message="No Nominees Available" />
            </View>
          ) : (
            artifactDetails.financialArtifactId && <BottomSheetFlatList
              style={styles.flatList}
              data={Object.values(
                nomineeList.data ? nomineeList.data.entities : {}
              )}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => {
                return Object.values(
                  data?.data && typeof data.data === "object"
                    ? data.data.nominees
                    : {}
                ).some((c) => c.email === item.email) ? (
                  <ShareNomineeModalCard
                    isApproved
                    item={item}
                    callBack={() => revoke(item)}
                    disableCallback={
                      revokeAssetAccessFromNomineeLoading ||
                      shareAssetToNomineeLoading
                    }
                  />
                ) : (
                  <ShareNomineeModalCard
                    item={item}
                    callBack={() => share(item)}
                    disableCallback={
                      revokeAssetAccessFromNomineeLoading ||
                      shareAssetToNomineeLoading
                    }
                  />
                );
              }}
            />
          )}
        </View>
      </View>
    </BottomSheet>
  );
};

export default AssetSharingModal;
