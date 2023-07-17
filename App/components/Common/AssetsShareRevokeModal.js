import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { useGetNomineesQuery } from "../../services/nominee/nomineeSlice";
import { useTheme } from "../../theme/ThemeProvider";
import CustomActivityIndicator from "./CustomActivityIndicator";
import {
  useGetNomineesForAnArtifactQuery,
  useRevokeAssetAccessFromNomineeMutation,
  useShareAssetToNomineeMutation,
} from "../../services/assetSharing/assetSharingApiSlice";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../../constants/screenNames";
import Empty from "./Empty";
import ShareNomineeModalCard from "../Nominee/ShareNomineeModalCard"

const AssetsShareRevokeModal = ({
  modalVisible,
  setModalVisible,
  artifactDetails,
}) => {
  const { height } = Dimensions.get("window");

  const {
    theme: { spacing, colors, fontFamily, fontSize },
  } = useTheme();

  const styles = StyleSheet.create({
    modal: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      height: height,
      paddingTop: height / 2,
    },
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
    modalbtngrp: {
      flexDirection: "row",
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
    closebtn: {
      marginLeft: spacing.xs,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 5,
      paddingVertical: 2,
      paddingHorizontal: spacing.sm,
    },
    modalcard: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.black200,
      borderRadius: spacing.sm,
      padding: spacing.md,
      marginTop: spacing.sm,
      marginHorizontal: spacing.sm,
    },
    nomineeContainer: {
      paddingHorizontal: spacing.sm,
    },
    nomineename: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.xl,
      lineHeight: spacing.xl,
      color: colors.black400,
    },
    nomineerelationship: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.regular,
      color: colors.black300,
    },
    modalContainer: {
      backgroundColor: "white",
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.black300,
      borderTopLeftRadius: spacing.lg,
      borderTopRightRadius: spacing.lg,
      height: "100%",
    },
    approvednominee: {
      borderColor: colors.green500,
    },
    icon: {
      fontSize: fontSize.xl,
      color: colors.green600,
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

  return (
    <Modal visible={modalVisible} transparent={true} animationType="slide">
      <View style={styles.modal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalheader}>
            <Text style={styles.modalheadertext}>Share With</Text>
            <View style={styles.modalbtngrp}>
              <Pressable
                style={styles.modalbtn}
                onPress={() => {
                  setModalVisible(false)
                  navigation.navigate(SCREEN_NAMES.homeAddNomineeScreen);
                }}
              >
                <Text style={styles.modalbtntext}>+ Nominee</Text>
              </Pressable>
              <Pressable
                style={styles.closebtn}
                onPress={() => setModalVisible(false)}
              >
                <FontAwesome
                  name="close"
                  size={fontSize.lg}
                  color={colors.black200}
                />
              </Pressable>
            </View>
          </View>
          {nomineeList.isLoading ||
          nomineeList.isFetching ||
          isLoading ||
          isFetching ||
          data === undefined ? (
            <CustomActivityIndicator />
          ) : nomineeList.data.entities === null ? (
            <Empty message="No Nominees Available" />
          ) : (
            <View style={styles.nomineeContainer}>
              {Object.values(
                nomineeList.data !== undefined ? nomineeList.data.entities : {}
              ).map((item) => {
                return Object.values(
                  data.data !== null ? data.data.nominees : {}
                ).some((c) => c.email === item.email) ? (
                  <ShareNomineeModalCard
                    isApproved
                    key={item._id}
                    item={item}
                    callBack={() => revoke(item)}
                    disableCallback={
                      revokeAssetAccessFromNomineeLoading ||
                      shareAssetToNomineeLoading
                    }
                  />
                ) : (
                  <ShareNomineeModalCard
                    key={item._id}
                    item={item}
                    callBack={() => share(item)}
                    disableCallback={
                      revokeAssetAccessFromNomineeLoading ||
                      shareAssetToNomineeLoading
                    }
                  />
                );
              })}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default AssetsShareRevokeModal;
