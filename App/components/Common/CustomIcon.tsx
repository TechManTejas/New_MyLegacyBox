import React from "react";
import Svg, { NumberProp, Path } from "react-native-svg";

interface CustomIconProps {
  viewBox?: string;
  path?: string;
  color?: string;
  size?: NumberProp;
}

export const CustomIcon: React.FC<CustomIconProps> = ({
  viewBox,
  path,
  color = "#1a2c7c",
  size,
}) => {
  return (
    <Svg height={size} fill={color} width={size} viewBox={viewBox}>
      <Path d={path} />
    </Svg>
  );
};
