import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  useWindowDimensions,
  StatusBar,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useAuth } from "../../authentication/AuthProvider";
import { useTheme } from "../../theme/ThemeProvider";
import { kratosClient } from "../../authentication/kratosSdk";
import OrySelfServiceFlow from "../../components/Ory/OrySelfServiceFlow";
import { SCREEN_NAMES } from "../../constants/screenNames";
import { handleFormSubmitError } from "../../utils/oryForm";
import CustomSafeView from "../../components/Common/CustomSafeView";
import CustomKeyboardAvoidingScrollView from "../../components/Common/CustomKeyboardAvoidingScrollView";
import CustomActivityIndicator from "../../components/Common/CustomActivityIndicator";
import AppFeatures from "../../components/AppFeatures";

const LoginScreen = () => {
  const isFoucused = useIsFocused();
  const { width } = useWindowDimensions();
  const {
    theme: { colors, spacing, fontFamily, fontSize },
  } = useTheme();
  const navigation = useNavigation();
  const { setSession } = useAuth();

  const [flow, setFlow] = useState(undefined);
  const [inProgressFlow, setInProgressFlow] = useState(true);

  useEffect(() => {
    initiateFlow();

    return () => setFlow(undefined);
  }, []);

  const initiateFlow = useCallback(() => {
    setInProgressFlow(true);
    kratosClient
      .createNativeLoginFlow({
        refresh: false,
        aal: "aal1",
      })
      .then((response) => {
        setInProgressFlow(false);
        setFlow(response.data);
      })
      .catch((error) => {
        setInProgressFlow(false);
        console.log(error);
      });
  }, []);

  const onSubmit = (values) =>
    flow
      ? kratosClient
          .updateLoginFlow({
            flow: flow.id,
            updateLoginFlowBody: values,
          })
          .then(({ data }) => {
            setSession(data.session_token).then(() => {
              navigation.navigate(SCREEN_NAMES.homeScreen);
            });
          })
          .catch(handleFormSubmitError(setFlow, initiateFlow))
      : Promise.resolve();

  const styles = StyleSheet.create({
    safeView: {
      backgroundColor: colors.white,
    },
    brandingHeader: {
      width: "100%",
      alignItems: "center",
      paddingVertical: "15%",
      backgroundColor: colors.blue700,
      borderBottomLeftRadius: width * 0.1,
      borderBottomRightRadius: width * 0.1,
      marginBottom: spacing.xxl,
    },
    logo: {
      width: "50%",
      resizeMode: "contain",
      marginBottom: spacing.sm,
    },
    headingText: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.md,
      color: colors.white200,
    },
    formWrapper: {
      flex: 1,
      alignItems: "center",
    },
    formContainer: {
      flexGrow: 1,
      width: "90%",
      marginHorizontal: "auto",
      padding: spacing.lg,
      borderBottomColor: "black",
    },
    formFooter: {
      flex: 1,
      height: "100%",
      justifyContent: "flex-end",
      paddingTop: spacing.xxl,
    },
    caption: {
      textAlign: "center",
      color: colors.black400,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.sm,
    },
    captionBold: {
      fontFamily: fontFamily.semiBold,
    },
  });

  return inProgressFlow ? (
    <CustomActivityIndicator />
  ) : (
    <CustomSafeView safeViewStyle={styles.safeView}>
      <CustomKeyboardAvoidingScrollView>
        {isFoucused ? (
          <StatusBar
            barStyle="light-content"
            backgroundColor={colors.blue700}
          />
        ) : null}
        <View style={styles.brandingHeader}>
          <Image
            source={require("../../assets/images/logoFullLight.png")}
            style={styles.logo}
          />
          <Text style={styles.headingText}>Login to your Account</Text>
        </View>

        <View style={styles.formWrapper}>
          <View style={styles.formContainer}>
            <OrySelfServiceFlow flow={flow} onSubmit={onSubmit} />

            <View style={styles.formFooter}>
              <View style={{ paddingBottom: spacing.lg }}>
                <AppFeatures />
              </View>
              <Text style={styles.caption}>
                By signing in you agree to our{" "}
                <Text style={styles.captionBold}>Terms & Conditions</Text> and{" "}
                <Text style={styles.captionBold}>Privacy Policy</Text>
              </Text>
            </View>
          </View>
        </View>
      </CustomKeyboardAvoidingScrollView>
    </CustomSafeView>
  );
};

export default LoginScreen;
