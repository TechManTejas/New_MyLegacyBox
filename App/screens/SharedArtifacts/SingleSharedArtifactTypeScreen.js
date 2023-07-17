import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { useGetSharedArtifactByNominatorWithUidAndTypeQuery } from "../../services/assetSharing/assetSharingApiSlice";
import CustomActivityIndicator from "../../components/Common/CustomActivityIndicator";
import NomineeFinancialArtifactViewCard from "../../components/Nominee/NomineeFinancialArtifactViewCard";
import { INSTITUTE_PROPS_MAP } from "../../data/NomineeArtifactPropsData";
import Empty from "../../components/Common/Empty";

const SingleSharedArtifactTypeScreen = ({ route }) => {
  const { nominatorHashedUid, financialArtifactType } = route.params;

  const {
    theme: { spacing, colors, fontFamily, fontSize },
  } = useTheme();

  const styles = StyleSheet.create({
    screen: {
      height: "100%",
      backgroundColor: "white",
      padding: spacing.md,
    },
  });

  const { data, isLoading, isFetching } =
    useGetSharedArtifactByNominatorWithUidAndTypeQuery({
      nominatorHashedUid,
      financialArtifactType,
    });

  if (isFetching || isLoading) return <CustomActivityIndicator />;

  return (
    <View style={styles.screen}>
      {data.data.length === 0 ? (
        <Empty message="No Information" />
      ) : (
        <FlatList
          data={data.data}
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
