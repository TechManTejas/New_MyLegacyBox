import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useTheme } from "../../../theme/ThemeProvider";
import { useGetSharedArtifactByNominatorWithUidAndTypeQuery } from "../../../redux/api/assetSharing/assetSharingApiSlice";
import CustomActivityIndicator from "../../../components/Common/CustomActivityIndicator";
import NomineeFinancialArtifactViewCard from "../../../components/Nominee/NomineeFinancialArtifactViewCard";
import { INSTITUTE_PROPS_MAP } from "../../../data/NomineeArtifactPropsData";
import Empty from "../../../components/Common/Empty";
import { useRefetchOnFocus } from "../../../hooks/useRefetchOnFocus";
import { useIsFocused } from "@react-navigation/native"

const SingleSharedArtifactTypeScreen = ({ route }) => {
  const { nominatorHashedUid, financialArtifactType } = route.params;

  const {
    theme: { spacing },
  } = useTheme();

  const styles = StyleSheet.create({
    screen: {
      height: "100%",
      backgroundColor: "white",
      padding: spacing.md,
    },
  });

  const { data, isLoading, isFetching, refetch } =
    useGetSharedArtifactByNominatorWithUidAndTypeQuery({
      nominatorHashedUid,
      financialArtifactType,
    }, { skip: !useIsFocused() });

  useRefetchOnFocus(refetch)

  if (isFetching || isLoading || data === undefined) return <CustomActivityIndicator />;

  return (
    <View style={styles.screen}>
      {data.ids.length === 0 ? (
        <Empty message="No Information" />
      ) : (
        <FlatList
          data={ data !== undefined ? data.ids.map((id) => data.entities[id]): []}
          renderItem={({ item, index }) => (
            <NomineeFinancialArtifactViewCard
              key={index}
              {...INSTITUTE_PROPS_MAP[item.financialArtifactType](item)}
            />
          )}
        />
      )}
    </View>
  );
};

export default SingleSharedArtifactTypeScreen;
