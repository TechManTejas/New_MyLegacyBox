import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { useGetAssetsLiabilitiesQuery } from "../../testApp/redux/api/vault/assetLiability/asset-liability";
import CustomActivityIndicator from "../../testApp/components/Common/CustomActivityIndicator";
import { StyleSheet, View, useWindowDimensions } from "react-native";

interface DonutChartContextType {
  donutChartData: {
    assets: {
      totalAssetAmount: number;
      totalAssetCount: number;
      list: object;
    };
    liabilities: {
      totalLiabilityAmount: number;
      totalLiabilityCount: number;
      list: object;
    };
  };
  isAmountView: boolean;
  setIsAmountView: Dispatch<SetStateAction<boolean>>;
}

const DonutChartContext = createContext<DonutChartContextType>({
  donutChartData: {
    assets: {
      totalAssetAmount: 0,
      totalAssetCount: 0,
      list: {},
    },
    liabilities: {
      totalLiabilityAmount: 0,
      totalLiabilityCount: 0,
      list: {},
    },
  },
  isAmountView: true,
  setIsAmountView: () => {},
});

interface DonutChartProviderProps {
  children: React.ReactNode;
}

const DonutChartProvider: React.FC<DonutChartProviderProps> = ({
  children,
}) => {
  const [isAmountView, setIsAmountView] = useState(true);

  const { data, isLoading, isFetching } =
    useGetAssetsLiabilitiesQuery(undefined);

  if (isLoading || isFetching || data?.data === undefined)
    return (
      <View style={{ alignItems: "center", justifyContent: "center", }}>
        <CustomActivityIndicator />
      </View>
    );

  return (
    <DonutChartContext.Provider
      value={{
        isAmountView,
        setIsAmountView,
        donutChartData: data?.data,
      }}
    >
      {children}
    </DonutChartContext.Provider>
  );
};

export const useDonutChart = () => useContext(DonutChartContext);

export default DonutChartProvider;
