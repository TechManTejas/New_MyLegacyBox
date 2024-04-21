import { View } from "react-native";
import React from "react";
import WillFormContainer from "../../../../testApp/components/Will/WillFormContainer";
import WillTab from "../../../../testApp/components/Common/WillTab";
import { useTheme } from "../../../../testApp/theme/ThemeProvider";
import WillInfoCard from "../../../../testApp/components/Common/WillInfoCard";
import Coins from "../../../../testApp/assets/icons/coins.svg";
import {
  getAssetsSelector,
  getResidualDistData,
  getSecondaryDistData,
} from "../../../../testApp/redux/form/willFormSlice";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";

const WillAssetIndexScreen = () => {
  const router = useRouter();

  const assetsDistribution = useSelector((state) => getAssetsSelector(state));
  const residualDistData = useSelector((state) => getResidualDistData(state));
  const secondaryDistData = useSelector((state) => getSecondaryDistData(state));

  const totalResPercentage = residualDistData.reduce(
    (acc, curr) => acc + Number(curr?.percent ?? 0),
    0
  );

  const sumOfDistTypes = secondaryDistData.reduce(
    (acc, curr) => acc + curr.distType,
    0
  );

  const {
    theme: { colors },
  } = useTheme();

  return (
    <WillFormContainer
      Handler={() => router.back()}
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
          onPress={() => router.push("/drawer/will/willassets")}
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
          onPress={() => router.push("/drawer/will/willresidualdist")}
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
              color={sumOfDistTypes !== 0 ? colors.green500 : colors.blue500}
            />
          }
          tabTitle="Contigent Distribution"
          onPress={() => router.push("/drawer/will/willsecondarydist")}
          elevated
          dataFilled={sumOfDistTypes !== 0}
        />
      </View>
    </WillFormContainer>
  );
};

export default WillAssetIndexScreen;
