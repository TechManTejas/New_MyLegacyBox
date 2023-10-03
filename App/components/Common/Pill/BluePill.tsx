import React from "react";
import { useTheme } from "../../../theme/ThemeProvider";
import CustomPill from "./CustomPill";

const BluePill = ({ variant, ...props }) => {
  const {
    theme: { colors },
  } = useTheme();

  return (
    <CustomPill
      color={colors.white}
      backgroundColor={colors.blue600}
      {...props}
    />
  );
};

export default BluePill;
