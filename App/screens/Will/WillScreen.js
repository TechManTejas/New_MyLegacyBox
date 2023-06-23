import { View, StyleSheet, FlatList } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../theme/ThemeProvider";
import BlueButton from "../../components/Common/Button/BlueButton";
import { useDispatch } from "react-redux";
import { clearWillFormRedux } from "../../services/willForm/willFormSlice";
import { SCREEN_NAMES } from "../../constants/screenNames";
import { useGetWillsQuery } from "../../services/will/willSlice";
import CustomActivityIndicator from "../../components/Common/CustomActivityIndicator";
import WillItem from "../../components/Will/WillItem";
import Empty from "../../components/Common/Empty";

const WillScreen = () => {
  const navigation = useNavigation();
  const { data, isLoading, isFetching, isError, error } = useGetWillsQuery();

  const dispatch = useDispatch();

  const {
    theme: { spacing, colors },
  } = useTheme();

  const pressHandler = () => {
    dispatch(clearWillFormRedux());
    navigation.navigate(SCREEN_NAMES.willInfoScreen);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white100,
    },
    listContainer: {
      flex: 1,
      paddingTop: spacing.lg,
    },
    listHeader: {
      paddingTop: spacing.lg,
    },
    listContentContainer: {
      flexGrow: 1,
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
      <View style={styles.listContainer}>
        <FlatList
          contentContainerStyle={styles.listContentContainer}
          data={data.ids.map((id) => data.entities[id])}
          renderItem={({ item }) => <WillItem will={item} />}
          keyExtractor={({ _id }) => _id}
          ListEmptyComponent={() => <Empty message="No wills available" />}
        />
      </View>
      <View style={styles.footer}>
        <BlueButton outline title="Create My Will" onPress={pressHandler} />
      </View>
    </View>
  );
};

export default WillScreen;
