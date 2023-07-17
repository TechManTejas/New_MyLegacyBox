import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../../constants/screenNames";
import {
  HOME_MAJOR_MENU_DATA,
  HOME_MINOR_MENU_DATA,
} from "../../data/HomeData";
import { CustomIcon } from "../../components/Common/CustomIcon";

const SharedAssetsTypeListScreen = ({ route }) => {
  const { nominatorHashedUid } = route.params;

  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const styles = StyleSheet.create({
    screen: {
      height: "100%",
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

  const typeList = [...HOME_MAJOR_MENU_DATA, ...HOME_MINOR_MENU_DATA];

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
              <CustomIcon viewBox={item.viewBox} path={item.path} size={50} />
              <Text style={styles.btntext}>{item.title}</Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default SharedAssetsTypeListScreen;
