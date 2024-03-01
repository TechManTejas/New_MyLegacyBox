import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
  PermissionsAndroid,
} from "react-native";
import CustomSafeView from "../components/Common/CustomSafeView";
import HomeHeader from "../components/Home/HomeHeader";
import { useTheme } from "../theme/ThemeProvider";
import {
  HOME_SMARTBOX_LARGE_MENU_DATA,
  HOME_HEADER_MENU_DATA,
  HOME_SMARTBOX_SMALL_MENU_DATA,
} from "../data/MenuPropsData";
import { Ionicons } from "@expo/vector-icons";
import CustomToolTip from "../components/Common/CustomToolTip";
import { useAuth } from "../authentication/AuthProvider";
import { useDispatch } from "react-redux";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import { setShowHomeTourModal } from "../redux/appTour/appTour";

import messaging from "@react-native-firebase/messaging";
import BlogCarousel from "../components/BlogCarousel";
import { homeBlogCarouselData } from "../data/HomeBlogCarouselData";
import MinimalIconMenu from "../components/MinimalIconMenu";
import SolidIconMenu from "../components/SolidIconMenu";
import Bugsnag from "@bugsnag/expo";

const HomeScreen: React.FC<{}> = () => {
  const {
    theme: { spacing, colors, fontFamily, fontSize },
  } = useTheme();

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.u56 + spacing.sm,
    },
    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    headertext: {
      color: colors.blue500,
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.lg,
    },
    iconContainer: {
      paddingLeft: spacing.xxs,
      padding: spacing.xs,
    },
    toolTipMessage: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: spacing.lg,
      color: colors.blue500,
    },

    modal: {
      backgroundColor: colors.white100,
      height: "100%",
    },

    flatListContainer: {
      flex: 1,
    },
    indicatorContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: spacing.x4l,
    },
    indicator: {
      height: 10,
      width: 10,
      backgroundColor: colors.black300,
      marginHorizontal: spacing.xxs,
      borderRadius: 50,
    },
    indicatorActive: {
      backgroundColor: colors.blue,
    },

    buttonContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
    },
    nextPrevButton: {
      fontFamily: fontFamily.semiBold,
      color: colors.blue500,
    },
  });

  const TooltipMessage = (
    <View>
      <Text style={styles.toolTipMessage}>
        A secured platform to gather and store financial information in a single
        place for you to easily access and retrieve the information on the go.
      </Text>
    </View>
  );

  const { session } = useAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setTimeout(() => {
      getItemAsync(`homeTourShown-${session?.identity.id}`)
        .then((res) => {
          if (res !== "true") {
            dispatch(setShowHomeTourModal(true));
            setItemAsync(`homeTourShown-${session?.identity.id}`, "true")
              .then(() => {})
              .catch((err) => {
                console.error(err);
              });
          }
        })
        .catch((err) => {
          Bugsnag.notify(err);
          deleteItemAsync(`homeTourShown-${session?.identity.id}`)
            .then(() => {})
            .catch((err) => {
              console.error(err);
            });
        });
    }, 200);
    return () => {
      clearTimeout(interval);
    };
  }, []);

  useEffect(() => {
    setItemAsync("lastUsedEmail", session?.identity?.traits?.email)
      .then(() => {
        console.log("email cached");
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    getItemAsync("permissionStatus")
      .then((status) => {
        if (status !== "granted") {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
          ).then((permissionStatus) => {
            if (permissionStatus === "granted") {
              messaging()
                .getToken()
                .then(() => {
                  setItemAsync("permissionStatus", permissionStatus)
                    .then(() => {})
                    .catch((err) => {
                      console.error(err);
                    });
                });
            }
          });
        }
      })
      .then(() => {})
      .catch((err) => {
        console.error(err);
        deleteItemAsync("permissionStatus")
          .then(() => {})
          .catch((err) => {
            console.error(err);
          });
      });
  }, []);

  return (
    <CustomSafeView>
      <ScrollView>
        <View style={styles.container}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={colors.white100}
          />

          <HomeHeader />

          <MinimalIconMenu data={HOME_HEADER_MENU_DATA} />

          <View style={styles.header}>
            <Text style={styles.headertext}>My Smartbox </Text>

            <CustomToolTip
              icon={
                <Ionicons
                  name="information-circle-outline"
                  size={fontSize.default}
                  color={colors.blue500}
                />
              }
              message={TooltipMessage}
              position={"bottom"}
              style={styles.iconContainer}
            />
          </View>

          <SolidIconMenu data={HOME_SMARTBOX_LARGE_MENU_DATA} isLarge />
          <SolidIconMenu data={HOME_SMARTBOX_SMALL_MENU_DATA} isDark />

          <BlogCarousel data={homeBlogCarouselData} />
        </View>
      </ScrollView>
    </CustomSafeView>
  );
};

export default HomeScreen;
