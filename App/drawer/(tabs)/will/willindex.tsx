import React, { useEffect, useState } from "react";
import WillFormContainer from "../../../../testApp/components/Will/WillFormContainer";
import WillTab from "../../../../testApp/components/Common/WillTab";
import { useGetPersonalInfoQuery } from "../../../../testApp/redux/api/personalInfo/personalInfoApiSlice";
import { useTheme } from "../../../../testApp/theme/ThemeProvider";
import { View, Text, BackHandler } from "react-native";
import WillInfoCard from "../../../../testApp/components/Common/WillInfoCard";
import UserHexagon from "../../../../testApp/assets/icons/user-hexagon.svg";
import Users from "../../../../testApp/assets/icons/users.svg";
import HomeDollar from "../../../../testApp/assets/icons/home-dollar.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  getAssetsSelector,
  getBeneficiariesSelector,
  getWitnessesSelector,
  setPersonalInfoRedux,
} from "../../../../testApp/redux/form/willFormSlice";
import PopUpModal from "../../../../testApp/components/PopUpModal";
import CustomActivityIndicator from "../../../../testApp/components/Common/CustomActivityIndicator";
import { usePathname, useRouter } from "expo-router";

const WillIndexScreen = () => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);

  const router = useRouter()
  const path=usePathname()

    useEffect(() => {

      const handleBackPress = () => {
        if (path === "/drawer/will/willindex") {
          setIsPopUpVisible(true);
          return true;
        }
        return false;
      };

      BackHandler.addEventListener("hardwareBackPress", handleBackPress);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
      };

    }, [])

  

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

  const firstButtonCallBack = () => {
    setIsPopUpVisible(false);
    if ( router.canGoBack()) router.back();
  };

  const secondButtonCallBack = () => {
    setIsPopUpVisible(false);
  };

  if (isLoading || isFetching) return <CustomActivityIndicator />;

  return (
    <>
      <PopUpModal
        isVisible={isPopUpVisible}
        setIsVisible={setIsPopUpVisible}
        title="Are you sure you want to go back ?"
        message="Your progress will be lost"
        firstButton={{ callBack: firstButtonCallBack, text: "Go Back" }}
        secondButton={{ callBack: secondButtonCallBack, text: "Cancel" }}
      />
      <WillFormContainer
        Handler={() => router.push("/drawer/will/willpreview")}
        nextDisabled={assetsDistribution.length === 0}
        title="Preview Will"
      >
        <WillInfoCard
          customContent={
            <View>
              <Text
                style={{
                  marginBottom: spacing.md,
                  color: colors.black400,
                  fontFamily: fontFamily.regular,
                  fontSize: fontSize.md,
                  lineHeight: fontSize.default,
                }}
              >
                Writing a Will goes through 4 stages
              </Text>
              <Text
                style={{
                  color: colors.black400,
                  fontFamily: fontFamily.regular,
                  fontSize: fontSize.md,
                  lineHeight: fontSize.default,
                }}
              >
                • Listing of assets{" "}
              </Text>
              <Text
                style={{
                  color: colors.black400,
                  fontFamily: fontFamily.regular,
                  fontSize: fontSize.md,
                  lineHeight: fontSize.default,
                }}
              >
                • Identification of Beneficiaries{" "}
              </Text>
              <Text
                style={{
                  color: colors.black400,
                  fontFamily: fontFamily.regular,
                  fontSize: fontSize.md,
                  lineHeight: fontSize.default,
                }}
              >
                • Division of Assets{" "}
              </Text>
              <Text
                style={{
                  color: colors.black400,
                  fontFamily: fontFamily.regular,
                  fontSize: fontSize.md,
                  lineHeight: fontSize.default,
                }}
              >
                • Signing, Witness and registration
              </Text>
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
            onPress={() => router.push("/drawer/personalInfo")}
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
            onPress={() => router.push("/drawer/will/willroleassign")}
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
            onPress={() => router.push("/drawer/will/willassetindex")}
            disabled={witnesses.length === 0 || beneficiaries.length === 0}
            elevated
            dataFilled={assetsDistribution.length !== 0}
          />
        </View>
      </WillFormContainer>
    </>
  );
};

export default WillIndexScreen;
