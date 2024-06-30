import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useTheme } from "../../testApp/theme/ThemeProvider";
import { useDonutChart } from "./DonutChartProvider";
import { useState } from "react";

const ToggleHeader = () => {
  const { setIsAmountView, isAmountView } = useDonutChart();

  const [toggleButtonsState, setToggleButtonsState] = useState([
    {
      title: "Numbers",
      isPressed: false,
    },
    {
      title: "Value",
      isPressed: true,
    },
  ]);

  const styles = StyleSheet.create({
    toggleHeader: {
      flexDirection: "row",
    },
  });

  const onToggleButtonPress = (button: {
    isPressed: boolean;
    title: string;
  }) => {
    console.log(isAmountView);

    if (!button.isPressed) {
      setToggleButtonsState(
        toggleButtonsState.map((item) => ({
          ...item,
          isPressed: !item.isPressed,
        }))
      );
      if (button.title === "Value") setIsAmountView(true);
      else setIsAmountView(false);
    }
  };

  return (
    <View style={styles.toggleHeader}>
      {toggleButtonsState.map((button, index) => {
        return (
          <ToggleButton
            key={`${button.title}-${index}`}
            isPressed={button.isPressed}
            title={button.title}
            onToggleButtonPress={() => onToggleButtonPress(button)}
          />
        );
      })}
    </View>
  );
};

interface ToggleButtonProps {
  isPressed: boolean;
  title: string;
  onToggleButtonPress: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  isPressed,
  title,
  onToggleButtonPress,
}) => {
  const {
    theme: { colors, spacing, fontFamily, fontSize },
  } = useTheme();

  const { width } = useWindowDimensions();

  const styles = StyleSheet.create({
    toggleHeader: {
      flexDirection: "row",
      paddingBottom: 60,
    },
    toggleTab: {
      borderRadius: spacing.xs,
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.lg,
      width: width / 2 - 20,
      backgroundColor: !isPressed ? colors.white100 : colors.blue,
      elevation: 2,
    },
    toggleTabText: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.default,
      lineHeight: fontSize.lg,
      textAlign: "center",
      color: !isPressed ? colors.blue : colors.white100,
    },
  });

  return (
    <Pressable onPress={onToggleButtonPress} style={styles.toggleTab}>
      <Text style={styles.toggleTabText}>{title}</Text>
    </Pressable>
  );
};

export default ToggleHeader;
