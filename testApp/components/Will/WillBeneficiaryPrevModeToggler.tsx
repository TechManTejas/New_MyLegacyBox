import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useTheme } from "../../theme/ThemeProvider";
import WillToggleCard from "./WillToggleCard";
import { FontAwesome } from "@expo/vector-icons";

const WillBeneficiaryPrevModeToggler = ({ contents, title, percent }: any) => {
  const {
    theme: { fontFamily, colors, spacing },
  } = useTheme();

  const styles = StyleSheet.create({
    button: {
      marginLeft: spacing.xxs,
      marginBottom: spacing.xxs,
      // backgroundColor: colors.black100,
      padding: spacing.xs,
      borderRadius: spacing.xs,
    },
  });

  const [isDisplayed, setIsDisplayed] = useState(false);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: spacing.md,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{ fontFamily: fontFamily.semiBold, color: colors.blue500 }}
          >
            {title}
          </Text>

          <Pressable
            onPress={() => setIsDisplayed((prev) => !prev)}
            style={styles.button}
          >
            <FontAwesome
              name={isDisplayed ? "caret-up" : "caret-down"}
              size={14}
              color={colors.black300}
            />
          </Pressable>
        </View>

        <Text style={{ fontFamily: fontFamily.regular, color: colors.blue500 }}>
          {percent} %
        </Text>
      </View>
      {isDisplayed &&
        contents.map((content: any, index: any) => (
          <WillToggleCard
            key={index + "will-toggle-card" + content[0].value}
            contents={content}
          />
        ))}
    </View>
  );
};

export default WillBeneficiaryPrevModeToggler;
