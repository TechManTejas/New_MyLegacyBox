import React from "react";
import Svg, { Path } from "react-native-svg";

export const CustomIcon = ({ viewBox, path, color = "#1a2c7c", size }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ fill: color }}
      height={size}
      width={size}
      viewBox={viewBox}
    >
      <Path d={path} />
    </Svg>
  );
};
