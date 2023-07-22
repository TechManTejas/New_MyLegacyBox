import { View, StyleSheet, FlatList, ScrollView, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../theme/ThemeProvider";
import BlueButton from "../../components/Common/Button/BlueButton";
import { useDispatch } from "react-redux";
import { clearWillFormRedux } from "../../services/willForm/willFormSlice";
import { SCREEN_NAMES } from "../../constants/screenNames";
import { useGetWillQuery } from "../../services/will/willSlice";
import CustomActivityIndicator from "../../components/Common/CustomActivityIndicator";
import WillItem from "../../components/Will/WillItem";
import Empty from "../../components/Common/Empty";
import CustomCarousel from "../../components/Common/Carousel";
import { WillCarouselData } from "../../data/Carouseldata";

const WillScreen = () => {
  const navigation = useNavigation();
  const { data, isLoading, isFetching, isError, error } = useGetWillQuery();

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
    carouselContainer: {
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.lg,
    },
  });

  console.log("data---------------");
  console.log(JSON.stringify(data, null, 1));
  console.log("data---------------");

  console.log("error---------------");
  console.log(error);
  console.log("error---------------");

  if (isLoading || isFetching) return <CustomActivityIndicator />;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.listContainer}>
        <View style={styles.carouselContainer}>
          <CustomCarousel carouselData={WillCarouselData} />
        </View>

        <View>
          <Text>{data && data.data ? data.data?._id : "no data found"}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <BlueButton outline title="Create My Will" onPress={pressHandler} />
      </View>
    </View>
  );
};

export default WillScreen;
