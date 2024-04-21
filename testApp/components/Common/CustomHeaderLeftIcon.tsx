import React, { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useTheme } from "../../theme/ThemeProvider";
import PopUpModal from "../PopUpModal";
import { useRouter, usePathname } from "expo-router";

const CustomHeaderLeftIcon = ({}) => {

  const [isPopUpVisible, setIsPopUpVisible] = useState(false);

  const router = useRouter()
  const path = usePathname()

  const {
    theme: { colors, spacing, fontSize },
  } = useTheme();

  const styles = StyleSheet.create({
    headerLeftIcon: {
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.md,
      paddingRight: spacing.lg,
      marginRight: 0,
      fontSize: fontSize.default,
      color: colors.blue400,
    },
  });

  const firstButtonCallBack = () => {
    setIsPopUpVisible(false);
    if ( router.canGoBack() ) router.back()
  };

  const secondButtonCallBack = () => {
    setIsPopUpVisible(false);
  };

  const backPress = () => {
    if ( path === "WILL_INDEX_SCREEN") {
      setIsPopUpVisible(true);
    } else if (router.canGoBack()) router.back();
  };

  return (
    <>
      <Pressable style={styles.headerLeftIcon} onPress={backPress}>
        <FontAwesome5
          name="chevron-left"
          color={styles.headerLeftIcon.color}
          size={styles.headerLeftIcon.fontSize}
        />
      </Pressable>
      <PopUpModal
        isVisible={isPopUpVisible}
        setIsVisible={setIsPopUpVisible}
        title="Are you sure you want to go back ?"
        message="Your progress will be lost"
        firstButton={{ callBack: firstButtonCallBack, text: "Go Back" }}
        secondButton={{ callBack: secondButtonCallBack, text: "Cancel" }}
      />
    </>
  );
};

export default CustomHeaderLeftIcon;
