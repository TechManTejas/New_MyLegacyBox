import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  Linking,
} from "react-native";
import React from "react";
// import * as FileSystem from "expo-file-system";
import { useTheme } from "../../theme/ThemeProvider";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useGenerateWordHashByWillIdMutation } from "../../services/will/willSlice";
import CustomActivityIndicator from "../Common/CustomActivityIndicator";
import { generateWordFileWillByHashUrl } from "../../services/api/willApiSlice";

const WillItem = ({ will }) => {
  const [generateWordHashByWillId, { isLoading, isError, error, isSuccess }] =
    useGenerateWordHashByWillIdMutation();
  const {
    theme: { spacing, colors, fontFamily, fontSize },
  } = useTheme();

  const styles = StyleSheet.create({
    actionContainer: {
      flexDirection: "row",
      padding: spacing.lg,
      borderWidth: spacing.xxxs,
      borderColor: colors.black200,
      borderRadius: spacing.md,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: spacing.sm,
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
    marginBottomLg: {
      marginBottom: spacing.lg,
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
    <View style={styles.marginBottomLg}>
      <View style={styles.actionContainer}>
        <View style={styles.action}>
          <Text style={styles.actionName}>
            Will on : {new Date(will.willDate).toLocaleDateString()}
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
          <Text style={styles.errorText}>
            {error.message ? error.message : error.error}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default WillItem;
