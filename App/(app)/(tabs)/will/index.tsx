import { View, StyleSheet, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useTheme } from "../../../../testApp/theme/ThemeProvider";
import BlueButton from "../../../../testApp/components/Common/Button/BlueButton";
import { useDispatch } from "react-redux";
import { clearWillFormRedux } from "../../../../testApp/redux/form/willFormSlice";
import CustomCarousel from "../../../../testApp/components/Common/Carousel";
import { WillCarouselData } from "../../../../testApp/data/Carouseldata";
import WillDownloadCard from "../../../../testApp/components/Will/WillDownloadCard";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import { useAuth } from "../../../../testApp/authentication/AuthProvider";
import { setShowWillTourModal } from "../../../../testApp/redux/appTour/appTour";
import Bugsnag from "@bugsnag/expo";
import { useRouter } from "expo-router";
import BookMeetingCard from "../../../../components/BookMeetingCard";

const WillScreen = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const { session } = useAuth();

  useEffect(() => {
    getItemAsync(`willTourShown-${session?.identity.id}`)
      .then((res) => {
        if (res !== "true") {
          dispatch(setShowWillTourModal(true));
          setItemAsync(`willTourShown-${session?.identity.id}`, "true")
            .then(() => {})
            .catch((err) => {
              console.error(err);
            });
        }
      })
      .catch((err) => {
        Bugsnag.notify(err);
        deleteItemAsync(`willTourShown-${session?.identity.id}`)
          .then(() => {})
          .catch((err) => {
            console.error(err);
          });
      });
  }, []);

  const {
    theme: { spacing, colors },
  } = useTheme();

  const pressHandler = () => {
    dispatch(clearWillFormRedux());
    router.push("/will/willindex");
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
        <View style={{ marginHorizontal: spacing.md }}>
          <BookMeetingCard />
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
