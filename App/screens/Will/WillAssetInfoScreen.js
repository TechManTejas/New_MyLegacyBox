import { StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useTheme } from "../../theme/ThemeProvider";
import { useSelector } from "react-redux";
import {
  getAssetsSelector,
  getBeneficiariesSelector,
  getSelectedAssetsEntitiesSelector,
} from "../../services/willForm/willFormSlice";
import WillAssetInfoForm from "../../components/Will/WillAssetInfoForm";
import CustomActivityIndicator from "../../components/Common/CustomActivityIndicator";

const WillAssetInfoScreen = () => {
  const [initialValues, setInitialValues] = useState(undefined);
  const [sectionTitles, setSectionTitles] = useState(undefined);

  const selectedAssetsEntities = useSelector((state) =>
    getSelectedAssetsEntitiesSelector(state)
  );

  const beneficiaries = useSelector((state) => getBeneficiariesSelector(state));

  const assetsDistribution = useSelector((state) => getAssetsSelector(state));

  const {
    theme: { colors },
  } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white100,
    },
  });

  useEffect(() => {
    const valuesMap = assetsDistribution.reduce((acc, { _id, allocations }) => {
      acc[_id] = allocations;
      return acc;
    }, {});

    const initialValuesMap = Object.keys(selectedAssetsEntities).reduce(
      (acc, v) => {
        acc[v] = beneficiaries.reduce((internalAcc, { _id }) => {
          if (v in valuesMap) internalAcc[_id] = valuesMap[v][_id];
          else internalAcc[_id] = undefined;
          return internalAcc;
        }, {});
        return acc;
      },
      {}
    );

    const sectionTitleMap = Object.keys(selectedAssetsEntities).reduce(
      (acc, v) => {
        if (acc[selectedAssetsEntities[v].rawSection]) {
          acc[selectedAssetsEntities[v].rawSection].push({
            id: v,
            title: selectedAssetsEntities[v].itemTitle,
          });
        } else {
          acc[selectedAssetsEntities[v].rawSection] = [
            {
              id: v,
              title: selectedAssetsEntities[v].itemTitle,
            },
          ];
        }
        return acc;
      },
      {}
    );

    setInitialValues(initialValuesMap);
    setSectionTitles(sectionTitleMap);
  }, [selectedAssetsEntities, beneficiaries]);

  return (
    <View style={styles.container}>
      {!(initialValues && sectionTitles) ? (
        <CustomActivityIndicator />
      ) : (
        <WillAssetInfoForm
          beneficiariesMap={beneficiaries.reduce((acc, beneficiary) => {
            acc[beneficiary._id] = beneficiary;
            return acc;
          }, {})}
          initialValues={initialValues}
          sectionTitles={sectionTitles}
        />
      )}
    </View>
  );
};

export default WillAssetInfoScreen;
