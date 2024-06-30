import React from "react";
import { useTheme } from "../../../theme/ThemeProvider";
import CustomButton from "./CustomButton";
import { StyleProp, ViewStyle, TextStyle } from "react-native";

interface BlueButtonProps {
  title?: string;
  onPress?: () => void;
  size?: "xs" | "sm";
  elevation?: number;
  color?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  backgroundColor?: string;
  backgroundColorPressed?: string;
  disabled?: boolean;
  expandHorizontal?: boolean;
  uppercase?: boolean;
  extraSpaceTop?: boolean;
  outline?: boolean;
  Icon?: any;
  iconName?: string;
  isLoading?: boolean;
}

const BlueButton: React.FC<BlueButtonProps> = ({
  title,
  onPress,
  size,
  elevation,
  buttonStyle,
  textStyle,
  disabled,
  expandHorizontal,
  uppercase,
  outline,
  extraSpaceTop,
  Icon,
  iconName,
  isLoading,
}) => {
  const {
    theme: { colors },
  } = useTheme();

  const props = {
    title,
    onPress,
    size,
    elevation: elevation || 2,
    buttonStyle,
    textStyle,
    color: colors.white,
    backgroundColor: colors.blue,
    backgroundColorPressed: colors.blue700,
    disabled,
    expandHorizontal,
    uppercase,
    outline,
    extraSpaceTop,
    Icon,
    iconName,
    isLoading,
  };

  return <CustomButton {...props} />;
};

export default BlueButton;
