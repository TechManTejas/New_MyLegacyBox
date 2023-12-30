import { View } from "react-native";
import React from "react";
import WillFormContainer from "../../components/Will/WillFormContainer";
import { useNavigation } from "@react-navigation/native";
import { AllScreenNavigationProp } from "../../navigation/types";
import WillTab from "../../components/Common/WillTab";
import { useTheme } from "../../theme/ThemeProvider";
import WillInfoCard from "../../components/Common/WillInfoCard";
import Coins from "../../assets/icons/coins.svg";
import {
  getAssetsSelector,
  getResidualDistData,
  getSecondaryDistData,
} from "../../redux/form/willFormSlice";
import { useSelector } from "react-redux";

const WillAssetIndexScreen = () => {
  const navigation = useNavigation<AllScreenNavigationProp>();

  const assetsDistribution = useSelector((state) => getAssetsSelector(state));
  const residualDistData = useSelector((state) => getResidualDistData(state));
  const secondaryDistData = useSelector((state) => getSecondaryDistData(state));

  const totalResPercentage = residualDistData.reduce(
    (acc, curr) => acc + Number(curr?.percent ?? 0),
    0
  );

  const sumOfDistTypes = secondaryDistData.reduce((acc, curr) => acc + curr.distType, 0)
  
  const {
    theme: { colors },
  } = useTheme();

  return (
    <WillFormContainer
      Handler={() => navigation.goBack()}
      nextDisabled={assetsDistribution.length === 0}
      title="Done"
    >
      <WillInfoCard content="Asset distribution/disposition/bequest is a financial/legal term describing the act of passing on self acquired and legally owned assets and properties to family members, friends and charities etc. through a Will. A Will can be created as many times as a Testator likes but the last one executed before the testator’s death becomes enforceable" />
      <View>
        <WillTab
          icon={
            <Coins
              width={24}
              height={24}
              color={
                assetsDistribution.length !== 0
                  ? colors.green500
                  : colors.blue500
              }
            />
          }
          tabTitle="Primary Distribution"
          onPress={() => navigation.navigate("WILL_ASSETS_SCREEN")}
          elevated
          dataFilled={assetsDistribution.length !== 0}
        />
        <WillTab
          icon={
            <Coins
              width={24}
              height={24}
              color={
                totalResPercentage === 100 || totalResPercentage === 99.99
                  ? colors.green500
                  : colors.blue500
              }
            />
          }
          tabTitle="Residuary Distribution"
          onPress={() =>
            navigation.navigate("WILL_RESIDUAL_DISTRIBUTION_SCREEN")
          }
          elevated
          dataFilled={
            totalResPercentage === 100 || totalResPercentage === 99.99
          }
        />
        <WillTab
          icon={
            <Coins
              width={24}
              height={24}
              color={
                sumOfDistTypes!==0
                  ? colors.green500
                  : colors.blue500
              }
            />
          }
          tabTitle="Contigent Distribution"
          onPress={() =>
            navigation.navigate("WILL_SECONDARY_DISTRIBUTION_SCREEN")
          }
          elevated
          dataFilled={sumOfDistTypes!==0}
        />
      </View>
    </WillFormContainer>
  );
};

export default WillAssetIndexScreen;
