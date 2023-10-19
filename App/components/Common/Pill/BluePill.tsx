import React from "react";
import { useTheme } from "../../../theme/ThemeProvider";
import CustomPill from "./CustomPill";

interface BluePillProps {
  label: string;
  labelBold: boolean;
  size: "sm";
  backgroundColor: string;
  color: string;
  containerStyle: {};
}

const BluePill: React.FC<BluePillProps> = ({ ...props }) => {
  const {
    theme: { colors },
  } = useTheme();

  return (
    <CustomPill
      {...props}
      color={colors.white}
      backgroundColor={colors.blue600}
    />
  );
};

export default BluePill;
