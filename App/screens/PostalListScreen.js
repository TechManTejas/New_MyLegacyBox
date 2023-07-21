import { StyleSheet, View, StatusBar, FlatList } from "react-native";
import CustomActivityIndicator from "../components/Common/CustomActivityIndicator";
import { useTheme } from "../theme/ThemeProvider";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import BlueButton from "../components/Common/Button/BlueButton";
import Empty from "../components/Common/Empty";
import { SCREEN_NAMES } from "../constants/screenNames";
import { useGetPostalsQuery } from "../services/postal/postalSlice";
import FinancialInstitutionItemCard from "../components/Common/FinancialInstitutionItemCard";

const PostalListScreen = () => {

  const navigation = useNavigation();
  const { theme: { colors, spacing } } = useTheme();
  const isFoucused = useIsFocused();
  const { data, isFetching, isLoading } = useGetPostalsQuery();

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
      {isFoucused && <StatusBar barStyle="dark-content" backgroundColor={colors.white100} />}
      <FlatList
        contentContainerStyle={styles.listContentContainer}
        data={ data !== undefined ? data.ids.map((id) => data.entities[id]): []}
        renderItem={({ item }) => (
          <FinancialInstitutionItemCard 
            {...item}  
            onPress={() => navigation.navigate(SCREEN_NAMES.postalScreen, { _id: item._id, postal: { ...item } })} 
          />
          )}
        keyExtractor={({ _id }) => _id}
        ListEmptyComponent={() => <Empty message="No postals available" />}
      />
      <View style={styles.footer}>
        <BlueButton
          outline
          Icon={FontAwesome5}
          iconName="plus"
          title="Add Post Office"
          onPress={() => navigation.navigate(SCREEN_NAMES.addPostalScreen)}
        />
      </View>
    </View>
  );
};

export default PostalListScreen;
