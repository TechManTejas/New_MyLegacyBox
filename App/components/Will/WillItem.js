import { View, Text, StyleSheet, Pressable, Linking } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useGenerateWordHashByWillIdMutation } from "../../services/will/willSlice";
import CustomActivityIndicator from "../Common/CustomActivityIndicator";
import { generateWordFileWillByHashUrl } from "../../services/api/willApiSlice";

const WillItem = ({ will }) => {
  const [generateWordHashByWillId, { isLoading, isError, error }] = useGenerateWordHashByWillIdMutation();
  const { theme: { spacing, colors, fontFamily, fontSize } } = useTheme();

  const styles = StyleSheet.create({
    actionContainer: {
      elevation: 2,
      flexDirection: "row",
      padding: spacing.lg,
      borderRadius: spacing.md,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: spacing.sm,
      backgroundColor: "white"
    },
    action: {
      flexGrow: 1,
    },
    actionName: {
      fontFamily: fontFamily.semiBold,
      color: colors.blue,
      fontSize: fontSize.default,
      lineHeight: fontSize.lg,
    },
    marginBottomXs: {
      marginBottom: spacing.xs,
    },
    errorText: {
      color: colors.red,
    },
    iconContainer: {
      padding: spacing.sm,
    },
    icon: {
      fontSize: fontSize.xl,
      color: colors.blue,
    },
  });

  const pressHandler = async () => {
    try {
      const result = await generateWordHashByWillId(will._id).unwrap();

      if (result.data && result.status === 201) {
        Linking.openURL(
          generateWordFileWillByHashUrl.replace(":hashedWillId", result.data)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.marginBottomXs}>
      <View style={styles.actionContainer}>
        <View style={styles.action}>
          <Text style={styles.actionName}>
            Will on : {new Date(will.willDate).toDateString()}
          </Text>
        </View>
        <Pressable style={styles.iconContainer} onPress={pressHandler}>
          {isLoading ? (
            <CustomActivityIndicator />
          ) : (
            <FontAwesome
              name="download"
              size={styles.icon.fontSize}
              color={styles.icon.color}
            />
          )}
        </Pressable>
      </View>
      {isError ? (
        <View>
          <Text style={styles.errorText}>{error.message ? error.message : error.error}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default WillItem;
