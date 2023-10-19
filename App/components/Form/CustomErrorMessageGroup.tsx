import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

interface MessageProps {
  text: string;
  id: string;
}

interface CustomErrorMessageGroup {
  name?: string;
  messages?: MessageProps[];
  extraSpaceTop?: boolean;
}

const CustomErrorMessageGroup: React.FC<CustomErrorMessageGroup> = ({
  name,
  messages = [],
  extraSpaceTop,
}) => {
  const {
    theme: { colors, spacing, fontSize, fontFamily },
  } = useTheme();

  const styles = StyleSheet.create({
    messageContainer: {
      marginTop: spacing.xs + spacing.xxs + (extraSpaceTop ? spacing.xs : 0),
    },
    message: {
      marginHorizontal: spacing.xxs,
      fontSize: fontSize.sm,
      fontFamily: fontFamily.regular,
      color: colors.red,
    },
  });

  return (
    <View style={styles.messageContainer}>
      {messages?.map(({ text, id }, index) => (
        <Text
          style={styles.message}
          key={`message-${name || ""}-${id}-${index}`}
        >
          {text}
        </Text>
      ))}
    </View>
  );
};

export default CustomErrorMessageGroup;
