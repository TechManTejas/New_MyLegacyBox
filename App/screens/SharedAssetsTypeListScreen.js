import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../constants/screenNames";
import Svg, { Path } from "react-native-svg";

const SharedAssetsTypeListScreen = ({ route }) => {
  const { nominatorHashedUid } = route.params;

  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const { height } = Dimensions.get("window");

  const styles = StyleSheet.create({
    screen: {
      height,
      backgroundColor: "white",
    },
    btngroup: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap",
      padding: spacing.md,
    },
    btn: {
      backgroundColor: "white",
      width: 150,
      height: 150,
      margin: spacing.sm,
      alignItems: "center",
      justifyContent: "center",
      padding: spacing.md,
      elevation: 3,
      borderRadius: spacing.xs,
    },
    btntext: {
      color: colors.blue500,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      paddingTop: spacing.xl,
    },
  });

  const major_size = 50;

  const IconPack = ({ viewBox, path, color = "#1a2c7c", size }) => {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ fill: color || "black", elevation: 200 }}
        height={size}
        width={size}
        viewBox={viewBox}
      >
        <Path d={path} />
      </Svg>
    );
  };

  const typeList = [
    {
      title: "Bank",
      Icon: (
        <IconPack
          size={major_size}
          viewBox={"0 0 512 512"}
          path={
            "m243.4 2.6-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160v8c0 13.3 10.7 24 24 24h400c13.3 0 24-10.7 24-24v-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8-3.4-17.2-3.4-25.2 0zM128 224H64v196.3c-.6.3-1.2.7-1.8 1.1l-48 32c-11.7 7.8-17 22.4-12.9 35.9S17.9 512 32 512h448c14.1 0 26.5-9.2 30.6-22.7s-1.1-28.1-12.9-35.9l-48-32c-.6-.4-1.2-.7-1.8-1.1V224H384v192h-40V224h-64v192h-48V224h-64v192h-40V224zM256 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
          }
        />
      ),
      financialArtifactType: "BANK",
    },
    {
      title: "Post Office",
      Icon: (
        <IconPack
          size={major_size}
          viewBox={"0 0 640 512"}
          path={
            "M112 0C85.5 0 64 21.5 64 48v48H16c-8.8 0-16 7.2-16 16s7.2 16 16 16h256c8.8 0 16 7.2 16 16s-7.2 16-16 16H48c-8.8 0-16 7.2-16 16s7.2 16 16 16h192c8.8 0 16 7.2 16 16s-7.2 16-16 16H16c-8.8 0-16 7.2-16 16s7.2 16 16 16h192c8.8 0 16 7.2 16 16s-7.2 16-16 16H64v128c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H112zm432 237.3V256H416v-96h50.7l77.3 77.3zM160 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm272 48a48 48 0 1 1 96 0 48 48 0 1 1-96 0z"
          }
        />
      ),
      financialArtifactType: "POSTAL",
    },
    {
      title: "Insurance",
      Icon: (
        <IconPack
          size={major_size}
          viewBox={"0 0 640 512"}
          path={
            "M224 256a128 128 0 1 0 0-256 128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3 0 498.7 13.3 512 29.7 512h388.6c1.8 0 3.5-.2 5.3-.5-76.3-55.1-99.8-141-103.1-200.2-16.1-4.8-33.1-7.3-50.7-7.3h-91.5zm308.8-78.3-120 48C358 277.4 352 286.2 352 296c0 63.3 25.9 168.8 134.8 214.2 5.9 2.5 12.6 2.5 18.5 0C614.1 464.8 640 359.3 640 296c0-9.8-6-18.6-15.1-22.3l-120-48c-5.7-2.3-12.1-2.3-17.8 0zM591.4 312c-3.9 50.7-27.2 116.7-95.4 149.7V273.8l95.4 38.2z"
          }
        />
      ),
      financialArtifactType: "INSURANCE",
    },
    {
      title: "Cash",
      Icon: (
        <IconPack
          size={major_size}
          viewBox={"0 0 640 512"}
          path={
            "M96 96v224c0 35.3 28.7 64 64 64h416c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H160c-35.3 0-64 28.7-64 64zm64 160c35.3 0 64 28.7 64 64h-64v-64zm64-160c0 35.3-28.7 64-64 64V96h64zm352 160v64h-64c0-35.3 28.7-64 64-64zM512 96h64v64c-35.3 0-64-28.7-64-64zM288 208a80 80 0 1 1 160 0 80 80 0 1 1-160 0zM48 120c0-13.3-10.7-24-24-24S0 106.7 0 120v240c0 66.3 53.7 120 120 120h400c13.3 0 24-10.7 24-24s-10.7-24-24-24H120c-39.8 0-72-32.2-72-72V120z"
          }
        />
      ),
      financialArtifactType: "CASH",
    },
    {
      title: "Share & Securities",
      Icon: (
        <IconPack
          size={major_size}
          viewBox={"0 0 512 512"}
          path={
            "M470.7 9.4c3 3.1 5.3 6.6 6.9 10.3s2.4 7.8 2.4 12.2V128c0 17.7-14.3 32-32 32s-32-14.3-32-32v-18.7L310.6 214.6c-11.8 11.8-30.8 12.6-43.5 1.7L176 138.1l-91.2 78.2c-13.4 11.5-33.6 9.9-45.1-3.5s-9.9-33.6 3.5-45.1l112-96c12-10.3 29.7-10.3 41.7 0l89.5 76.7L370.7 64H352c-17.7 0-32-14.3-32-32s14.3-32 32-32h96c8.8 0 16.8 3.6 22.6 9.3l.1.1zM0 304c0-26.5 21.5-48 48-48h416c26.5 0 48 21.5 48 48v160c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V304zm48 112v48h48c0-26.5-21.5-48-48-48zm48-112H48v48c26.5 0 48-21.5 48-48zm368 112c-26.5 0-48 21.5-48 48h48v-48zm-48-112c0 26.5 21.5 48 48 48v-48h-48zm-96 80a64 64 0 1 0-128 0 64 64 0 1 0 128 0z"
          }
        />
      ),
      financialArtifactType: "DEMAT",
    },
    {
      title: "Real Estate",
      Icon: (
        <IconPack
          size={major_size}
          viewBox={"0 0 640 512"}
          path={
            "M48 0C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h96v-80c0-26.5 21.5-48 48-48s48 21.5 48 48v80h89.9c-6.3-10.2-9.9-22.2-9.9-35.1 0-46.9 25.8-87.8 64-109.2V48c0-26.5-21.5-48-48-48H48zm16 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-32zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16v-32c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16v-32zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-32c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16v-32zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16v-32c0-8.8 7.2-16 16-16zm304 176a80 80 0 1 0-160 0 80 80 0 1 0 160 0zM352 477.1c0 19.3 15.6 34.9 34.9 34.9h218.2c19.3 0 34.9-15.6 34.9-34.9 0-51.4-41.7-93.1-93.1-93.1H445.1c-51.4 0-93.1 41.7-93.1 93.1z"
          }
        />
      ),
      financialArtifactType: "REALESTATE",
    },
    {
      title: "Provident Fund",
      Icon: (
        <IconPack
          size={major_size}
          viewBox={"0 0 640 512"}
          path={
            "M512 80c0 18-14.3 34.6-38.4 48-29.1 16.1-72.5 27.5-122.3 30.9-3.7-1.8-7.4-3.5-11.3-5-39.4-16.5-91.8-25.9-148-25.9-8.3 0-16.4.2-24.5.6l-1.1-.6C142.3 114.6 128 98 128 80c0-44.2 86-80 192-80s192 35.8 192 80zm-351.3 81.1c10.2-.7 20.7-1.1 31.3-1.1 62.2 0 117.4 12.3 152.5 31.4 24.8 13.5 39.5 30.3 39.5 48.6 0 4-.7 7.9-2.1 11.7-4.6 13.2-17 25.3-35 35.5-.1.1-.3.1-.4.2-.3.2-.6.3-.9.5-35 19.4-90.8 32-153.6 32-59.6 0-112.9-11.3-148.2-29.1-1.9-.9-3.7-1.9-5.5-2.9C14.3 274.6 0 258 0 240c0-34.8 53.4-64.5 128-75.4 10.5-1.5 21.4-2.7 32.7-3.5zM416 240c0-21.9-10.6-39.9-24.1-53.4 28.3-4.4 54.2-11.4 76.2-20.5 16.3-6.8 31.5-15.2 43.9-25.5V176c0 19.3-16.5 37.1-43.8 50.9-14.6 7.4-32.4 13.7-52.4 18.5.1-1.8.2-3.5.2-5.3zm-32 96c0 18-14.3 34.6-38.4 48-1.8 1-3.6 1.9-5.5 2.9C304.9 404.7 251.6 416 192 416c-62.8 0-118.6-12.6-153.6-32C14.3 370.6 0 354 0 336v-35.4c12.5 10.3 27.6 18.7 43.9 25.5C83.4 342.6 135.8 352 192 352s108.6-9.4 148.1-25.9c7.8-3.2 15.3-6.9 22.4-10.9 6.1-3.4 11.8-7.2 17.2-11.2 1.5-1.1 2.9-2.3 4.3-3.4V336zm32 0v-57.9c19-4.2 36.5-9.5 52.1-16 16.3-6.8 31.5-15.2 43.9-25.5V272c0 10.5-5 21-14.9 30.9-16.3 16.3-45 29.7-81.3 38.4.1-1.7.2-3.5.2-5.3zM192 448c56.2 0 108.6-9.4 148.1-25.9 16.3-6.8 31.5-15.2 43.9-25.5V432c0 44.2-86 80-192 80S0 476.2 0 432v-35.4c12.5 10.3 27.6 18.7 43.9 25.5C83.4 438.6 135.8 448 192 448z"
          }
        />
      ),
      financialArtifactType: "PROVIDENTFUND",
    },
    {
      title: "Custom Entry",
      Icon: (
        <IconPack
          size={major_size}
          viewBox={"0 0 512 512"}
          path={
            "m368.4 18.3-55.7 55.8 125.2 125.2 55.7-55.7c21.9-21.9 21.9-57.3 0-79.2l-46-46.1c-21.9-21.9-57.3-21.9-79.2 0zM288 94.6l-9.2 2.8-144.1 43.2c-19.9 6-35.7 21.2-42.3 41L3.8 445.8c-3.8 11.3-1 23.9 7.3 32.4l153.6-153.5c-3-6.3-4.7-13.3-4.7-20.7 0-26.5 21.5-48 48-48s48 21.5 48 48-21.5 48-48 48c-7.4 0-14.4-1.7-20.7-4.7L33.7 500.9c8.6 8.3 21.1 11.2 32.4 7.3l264.3-88.6c19.7-6.6 35-22.4 41-42.3l43.2-144.1 2.8-9.2L288 94.6z"
          }
        />
      ),
      financialArtifactType: "",
      disabled: true
    },
  ];

  const navigation = useNavigation();

  const openArtifactsOfASingleType = (financialArtifactType) => {
    navigation.navigate(SCREEN_NAMES.singleSharedArtifactTypeScreen, {
      nominatorHashedUid,
      financialArtifactType,
    });
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.btngroup}>
        {typeList.map((item, index) => {
          return (
            <Pressable
              disabled={item.disabled}
              onPress={() =>
                openArtifactsOfASingleType(item.financialArtifactType)
              }
              key={index}
              style={styles.btn}
            >
              {item.Icon}
              <Text style={styles.btntext}>{item.title}</Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default SharedAssetsTypeListScreen;
