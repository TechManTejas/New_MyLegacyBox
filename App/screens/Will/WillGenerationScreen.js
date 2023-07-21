import { View, Text, StyleSheet, Linking } from "react-native";
import React, { useEffect } from "react";
import CustomActivityIndicator from "../../components/Common/CustomActivityIndicator";
import { useSelector } from "react-redux";
import { getWill } from "../../services/willForm/willFormSlice";
import {
  useAddWillMutation,
  useGenerateWordHashByWillIdMutation,
} from "../../services/will/willSlice";
import BlueButton from "../../components/Common/Button/BlueButton";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../theme/ThemeProvider";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import CustomKeyboardAvoidingScrollView from "../../components/Common/CustomKeyboardAvoidingScrollView";
import { generateWordFileWillByHashUrl } from "../../services/api/willApiSlice";

const WillGenerationScreen = () => {
  const will = useSelector((state) => getWill(state));
  const [addWill, addWillOptions] = useAddWillMutation();
  const [generateWordHashByWillId, generateWordHashByWillIdOptions] =
    useGenerateWordHashByWillIdMutation();
  const {
    isLoading: addWillLoading,
    isError: addWillIsError,
    error: addWillError,
    isSuccess: addWillIsSuccess,
  } = addWillOptions;

  const {
    isLoading: generateWordHashByWillIdLoading,
    isError: generateWordHashByWillIdIsError,
    error: generateWordHashByWillIdError,
    isSuccess: generateWordHashByWillIdIsSuccess,
  } = generateWordHashByWillIdOptions;

  const navigation = useNavigation();

  const {
    theme: { spacing, colors, fontFamily, fontSize },
  } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white100,
    },
    content: {
      flex: 1,
      paddingTop: spacing.lg,
      paddingHorizontal: spacing.lg,
    },
    actionContainer: {
      flexDirection: "row",
      padding: spacing.lg,
      borderWidth: spacing.xxxs,
      borderColor: colors.black200,
      borderRadius: spacing.md,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: spacing.lg,
    },
    actionContainerSuccess: {
      backgroundColor: colors.green100,
      borderColor: colors.green600,
    },
    actionContainerError: {
      backgroundColor: colors.red100,
      borderColor: colors.red600,
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
    actionNameSuccess: {
      color: colors.green600,
    },
    actionNameError: {
      color: colors.red600,
    },
    actionError: {
      borderWidth: spacing.xxxs,
      borderRadius: spacing.md,
      borderColor: colors.red600,
      padding: spacing.lg,
      marginBottom: spacing.lg,
    },
    footer: {
      paddingVertical: spacing.md,
      paddingBottom: spacing.xl,
      paddingHorizontal: spacing.lg,
    },
    icon: {
      fontSize: fontSize.xl,
      color: colors.green600,
    },
    iconError: {
      fontSize: fontSize.xl,
      color: colors.red600,
    },
  });

  const pressHandler = () => {
    navigation.canGoBack() ? navigation.popToTop() : null;
  };

  useEffect(() => {
    const generateDownloadLink = async (willId) => {
      try {
        const result = await generateWordHashByWillId(willId).unwrap();

        if (result.data && result.status === 200) {
          Linking.openURL(
            generateWordFileWillByHashUrl.replace(":hashedWillId", result.data)
          ).finally(pressHandler);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const addWillToDbAndGenerateWord = async (will) => {
      try {
        const data = await addWill({
          ...will,
          selectedAssets: undefined,
        }).unwrap();
        console.log("Will", will);
        await generateDownloadLink(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    addWillToDbAndGenerateWord(will);
  }, [will]);

  return (
    <View style={styles.container}>
      <CustomKeyboardAvoidingScrollView>
        <View style={styles.content}>
          <View
            style={[
              styles.actionContainer,
              addWillIsError && styles.actionContainerError,
              addWillIsSuccess && styles.actionContainerSuccess,
            ]}
          >
            <View style={styles.action}>
              <Text
                style={[
                  styles.actionName,
                  addWillIsError && styles.actionNameError,
                  addWillIsSuccess && styles.actionNameSuccess,
                ]}
              >
                Saving will
              </Text>
            </View>
            <View>
              {addWillLoading ? (
                <CustomActivityIndicator />
              ) : addWillIsError ? (
                <FontAwesome
                  name="close"
                  size={styles.iconError.fontSize}
                  color={styles.iconError.color}
                />
              ) : addWillIsSuccess ? (
                <FontAwesome
                  name="check-circle"
                  size={styles.icon.fontSize}
                  color={styles.icon.color}
                />
              ) : null}
            </View>
          </View>

          <View
            style={[
              styles.actionContainer,
              generateWordHashByWillIdIsError && styles.actionContainerError,
              generateWordHashByWillIdIsSuccess &&
                styles.actionContainerSuccess,
            ]}
          >
            <View style={styles.action}>
              <Text
                style={[
                  styles.actionName,
                  generateWordHashByWillIdIsError && styles.actionNameError,
                  generateWordHashByWillIdIsSuccess && styles.actionNameSuccess,
                ]}
              >
                Generating will document
              </Text>
            </View>
            <View>
              {generateWordHashByWillIdLoading ? (
                <CustomActivityIndicator />
              ) : generateWordHashByWillIdIsError ? (
                <FontAwesome
                  name="close"
                  size={styles.iconError.fontSize}
                  color={styles.iconError.color}
                />
              ) : generateWordHashByWillIdIsSuccess ? (
                <FontAwesome
                  name="check-circle"
                  size={styles.icon.fontSize}
                  color={styles.icon.color}
                />
              ) : null}
            </View>
          </View>

          {addWillIsError ? (
            <View style={styles.actionError}>
              <Text style={styles.actionNameError}>
                Saving will error : {addWillError.data.error?.message}
              </Text>
            </View>
          ) : null}

          {generateWordHashByWillIdError ? (
            <View style={styles.actionError}>
              <Text style={styles.actionNameError}>
                Generating will document error :
                {generateWordHashByWillIdError.data.error?.message}
              </Text>
            </View>
          ) : null}
        </View>
      </CustomKeyboardAvoidingScrollView>

      <View style={styles.footer}>
        <BlueButton outline title="Go to Wills" onPress={pressHandler} />
      </View>
    </View>
  );
};

export default WillGenerationScreen;
