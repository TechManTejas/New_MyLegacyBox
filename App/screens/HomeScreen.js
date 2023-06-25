import { View, StyleSheet, ScrollView, StatusBar, Text } from "react-native";
// import { useAuth } from "../authentication/AuthProvider";
import CustomSafeView from "../components/Common/CustomSafeView";
import HomeHeader from "../components/Home/HomeHeader";
import { useTheme } from "../theme/ThemeProvider";
import { HOME_MAJOR_MENU_DATA, HOME_MINOR_MENU_DATA } from "../data/HomeData";
import MajorMenu from "../components/Common/MajorMenu";
import MinorMenu from "../components/Common/MinorMenu";
import { Ionicons } from '@expo/vector-icons';
import CustomToolTip from "../components/Common/CustomToolTip"
import { homeCarouselData } from "../data/Carouseldata";
import Carousel from "../components/Common/Carousel";

const HomeScreen = () => {

  // const { sessionToken } = useAuth();
  const { theme: { spacing, colors, fontFamily, fontSize } } = useTheme();

  // console.log("Session Token : ", sessionToken);

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.u56 + spacing.sm
    },
    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
    },
    headertext: {
      color: colors.blue500,
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.lg,
    },
    iconContainer: {
      paddingLeft: spacing.xxs,
      padding: spacing.xs
    },
    toolTipMessage: {
      fontFamily: fontFamily.regular, 
      fontSize: fontSize.md, 
      lineHeight: spacing.lg, 
      color: colors.blue500
    }
  });

  const TooltipMessage = <View>
                            <Text style={styles.toolTipMessage}>
                                A secured platform to gather and store financial information in a single 
                                place for you to easily access and retrieve the information on the go.
                            </Text>
                         </View>

  return (
    <CustomSafeView>

      <ScrollView>
        <View style={styles.container}>

          <StatusBar barStyle="dark-content" backgroundColor={colors.white100}/>

          <HomeHeader />

          <View style={styles.header}>

            <Text style={styles.headertext}>My Smartbox </Text>

            <CustomToolTip 
              icon={<Ionicons name="information-circle-outline" size={fontSize.default} color={colors.blue500} />}
              message={TooltipMessage}
              position={"bottom"}
              style={styles.iconContainer}
            />

          </View>

          <MajorMenu title="home" menuData={HOME_MAJOR_MENU_DATA} />
          <MinorMenu title="home" centered menuData={HOME_MINOR_MENU_DATA} />

          <Carousel carouselData={homeCarouselData} />

        </View>
      </ScrollView>
    </CustomSafeView>
  );
};

export default HomeScreen;
