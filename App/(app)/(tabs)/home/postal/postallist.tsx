import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import CustomActivityIndicator from "../../../../../testApp/components/Common/CustomActivityIndicator";
import { useTheme } from "../../../../../testApp/theme/ThemeProvider";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import BlueButton from "../../../../../testApp/components/Common/Button/BlueButton";
import Empty from "../../../../../testApp/components/Common/Empty";
import { useGetPostalsQuery } from "../../../../../testApp/redux/api/vault/financialArtifact/postal/postalApiSlice";
import FinancialInstitutionItemCard from "../../../../../testApp/components/Common/FinancialInstitutionItemCard";
import { useRouter } from "expo-router";

const PostalListScreen = () => {
  const {
    theme: { colors, spacing },
  } = useTheme();
  const { data, isFetching, isLoading } = useGetPostalsQuery();
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white100,
    },
    listContentContainer: {
      flexGrow: 1,
      paddingTop: spacing.lg,
      paddingHorizontal: spacing.lg,
    },
    footer: {
      paddingVertical: spacing.md,
      paddingBottom: spacing.lg,
      paddingHorizontal: spacing.lg,
    },
  });

  if (isLoading || isFetching) return <CustomActivityIndicator />;

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listContentContainer}
        data={data !== undefined ? data.ids.map((id) => data.entities[id]) : []}
        renderItem={({ item }) => {
          return <FinancialInstitutionItemCard
            {...item}
            onPress={() => {
              router.push({
                pathname: "/home/postal/postals",
                params: { _id: item._id, title: item.branchName },
              });
            }}
          />
        }}
        keyExtractor={({ _id }) => _id}
        ListEmptyComponent={() => <Empty message="No postals available" />}
      />
      <View style={styles.footer}>
        <BlueButton
          outline
          Icon={FontAwesome5}
          iconName="plus"
          title="Add Post Office"
          onPress={() => router.push("/home/postal/addpostal")}
        />
      </View>
    </View>
  );
};

export default PostalListScreen;
