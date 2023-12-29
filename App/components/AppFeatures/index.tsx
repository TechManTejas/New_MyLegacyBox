import { View, StyleSheet } from "react-native";
import React from "react";
import FeatureCard from "./FeatureCard";
import { SvgProps } from "react-native-svg";

import FilesOffIcon from "../../assets/icons/files-off.svg";
import ShieldHalfFilledIcon from "../../assets/icons/shield-half-filled.svg";
import ServerBoltIcon from "../../assets/icons/server-bolt.svg";
import TwoFactorAuthIcon from "../../assets/icons/2fa.svg";

interface FeatureCardProps {
  FeatureIcon: React.FC<SvgProps>;
  text: string;
}

interface AppFeaturesProps {
  data?: FeatureCardProps[];
}

const AppFeatures: React.FC<AppFeaturesProps> = ({}) => {
  const data = [
    { FeatureIcon: ShieldHalfFilledIcon, text: "End to End Encryption" },
    { FeatureIcon: ServerBoltIcon, text: "Secured Servers" },
    // { FeatureIcon: TwoFactorAuthIcon, text: "DPIIT recognised" },
    // { FeatureIcon: FilesOffIcon, text: "No Paper Trail" },
  ];

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap",
    },
  });

  return (
    <View style={styles.container}>
      {data.map((props, index) => (
        <FeatureCard key={index} {...props} index={index} />
      ))}
    </View>
  );
};

export default AppFeatures;
