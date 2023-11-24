import React from "react";
import WillFormContainer from "../../components/Will/WillFormContainer";
import { useNavigation } from "@react-navigation/native";
import { AllScreenNavigationProp } from "../../navigation/types";
import WillTab from "../../components/Common/WillTab";
import { useGetPersonalInfoQuery } from "../../redux/api/personalInfo/personalInfoApiSlice";
import { useTheme } from "../../theme/ThemeProvider";
import { View, Text } from "react-native";
import WillInfoCard from "../../components/Common/WillInfoCard";
import UserHexagon from "../../assets/icons/user-hexagon.svg";
import Users from "../../assets/icons/users.svg";
import HomeDollar from "../../assets/icons/home-dollar.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  getAssetsSelector,
  getBeneficiariesSelector,
  getWitnessesSelector,
  setPersonalInfoRedux,
} from "../../redux/form/willFormSlice";

const WillIndexScreen = () => {
  const navigation = useNavigation<AllScreenNavigationProp>();

  const assetsDistribution = useSelector((state) => getAssetsSelector(state));

  const dispatch = useDispatch();

  const {
    theme: { colors, spacing, fontFamily, fontSize },
  } = useTheme();

  const { data, isLoading, isFetching } = useGetPersonalInfoQuery(undefined);

  let allFilled;

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


    dispatch(setPersonalInfoRedux(data?.data));
  }

  const witnesses = useSelector((state) => getWitnessesSelector(state));
  const beneficiaries = useSelector((state) => getBeneficiariesSelector(state));

  return (
    <WillFormContainer
      Handler={() => navigation.navigate("WILL_PREVIEW_SCREEN")}
      nextDisabled={assetsDistribution.length === 0}
      title="Preview Will"
    >
      <WillInfoCard
        customContent={
          <View>
            <Text style={{ marginBottom: spacing.md, color: colors.blue500, fontFamily: fontFamily.regular, fontSize: fontSize.md, lineHeight: fontSize.default }}>Writing a Will goes through 4 stages</Text>
            <Text style={{ color: colors.blue500, fontFamily: fontFamily.regular, fontSize: fontSize.md, lineHeight: fontSize.default }}>1. Listing of assets </Text>
            <Text style={{ color: colors.blue500, fontFamily: fontFamily.regular,  fontSize: fontSize.md, lineHeight: fontSize.default }}>2. Identification of Beneficiaries </Text>
            <Text style={{ color: colors.blue500, fontFamily: fontFamily.regular,  fontSize: fontSize.md, lineHeight: fontSize.default }}>3. Division of Assets </Text>
            <Text style={{ color: colors.blue500, fontFamily: fontFamily.regular,  fontSize: fontSize.md, lineHeight: fontSize.default }}>4. Signing, Witness and registration</Text>
          </View>
        }
      />
      <View>
        <WillTab
          icon={
            <UserHexagon
              width={24}
              height={24}
              color={allFilled ? colors.green500 : colors.blue500}
            />
          }
          tabTitle="Personal Information"
          onPress={() => navigation.navigate("PERSONAL_INFO_SCREEN")}
          dataFilled={allFilled}
          elevated
        />
        <WillTab
          icon={
            <Users
              width={24}
              height={24}
              color={
                !allFilled
                  ? colors.black300
                  : witnesses.length === 2 && beneficiaries.length > 0
                  ? colors.green500
                  : colors.blue500
              }
            />
          }
          tabTitle="Assign Roles"
          onPress={() => navigation.navigate("WILL_ROLE_ASSIGN_SCREEN")}
          disabled={!allFilled}
          dataFilled={witnesses.length === 2 && beneficiaries.length > 0}
          elevated
        />
        <WillTab
          icon={
            <HomeDollar
              width={24}
              height={24}
              color={
                witnesses.length === 0
                  ? colors.black300
                  : assetsDistribution.length !== 0
                  ? colors.green500
                  : colors.blue500
              }
            />
          }
          tabTitle="Asset Distribution"
          onPress={() => navigation.navigate("WILL_ASSET_INDEX_SCREEN")}
          disabled={witnesses.length === 0 || beneficiaries.length === 0 }
          elevated
          dataFilled={assetsDistribution.length !== 0}
        />
      </View>
    </WillFormContainer>
  );
};

export default WillIndexScreen;
