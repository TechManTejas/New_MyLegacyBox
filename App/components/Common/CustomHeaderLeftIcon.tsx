import React, { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useTheme } from "../../theme/ThemeProvider";
import { NavigationProp, useRoute } from "@react-navigation/native";
import PopUpModal from "../PopUpModal";

interface CustomHeaderLeftIconProps {
  navigation: NavigationProp<ReactNavigation.RootParamList>;
}

const CustomHeaderLeftIcon: React.FC<CustomHeaderLeftIconProps> = ({
  navigation,
}) => {
  const route = useRoute();

  const [isPopUpVisible, setIsPopUpVisible] = useState(false);

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
    if (navigation.canGoBack()) navigation.goBack();
  };

  const secondButtonCallBack = () => {
    setIsPopUpVisible(false);
  };

  const backPress = () => {
    if (route.name === "WILL_INDEX_SCREEN") {
      setIsPopUpVisible(true);
    } else if (navigation.canGoBack()) navigation.goBack();
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
