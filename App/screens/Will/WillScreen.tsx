import { View, StyleSheet, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../theme/ThemeProvider";
import BlueButton from "../../components/Common/Button/BlueButton";
import { useDispatch } from "react-redux";
import { clearWillFormRedux } from "../../redux/form/willFormSlice";
import { SCREEN_NAMES } from "../../constants/screenNames";
import CustomCarousel from "../../components/Common/Carousel";
import { WillCarouselData } from "../../data/Carouseldata";
import WillDownloadCard from "../../components/Will/WillDownloadCard";
import { getItemAsync, setItemAsync } from "expo-secure-store";
import { useAuth } from "../../authentication/AuthProvider";
import { setShowWillTourModal } from "../../redux/appTour/appTour";

const WillScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const { session } = useAuth()

  useEffect(() => {

    getItemAsync(`willTourShown-${session?.identity.id}`).then((res) => {
      if (res !== "true") {
        dispatch(setShowWillTourModal(true));
        setItemAsync(`willTourShown-${session?.identity.id}`, "true");
      }
    });

  }, []);



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

  return (
    <View style={styles.container}>
      <ScrollView style={styles.listContainer}>
        <View style={styles.carouselContainer}>
          <CustomCarousel carouselData={WillCarouselData} />
        </View>
        <WillDownloadCard />
      </ScrollView>

      <View style={styles.footer}>
        <BlueButton outline title="Create My Will" onPress={pressHandler} />
      </View>
    </View>
  );
};

export default WillScreen;
