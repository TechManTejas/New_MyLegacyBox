import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const Empty = ({ message, style }) => {

  const { theme: { colors, spacing, fontSize, fontFamily } } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    iconContainer: {
      marginBottom: spacing.xs,
    },
    icon: {
      fontSize: fontSize.x4l,
      color: colors.blue200,
    },
    caption: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.default,
      color: colors.blue200,
    },
  });
  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <FontAwesome5 name="box-open" size={styles.icon.fontSize} color={styles.icon.color}/>
        </View>
        <Text style={styles.caption}>{message}</Text>
      </View>
    </View>
  );
};

export default Empty;
