import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { useAuth } from "../../testApp/authentication/AuthProvider";
import { useTheme } from "../../testApp/theme/ThemeProvider";
import { kratosClient } from "../../testApp/authentication/kratosSdk";
import OrySelfServiceFlow from "../../testApp/components/Ory/OrySelfServiceFlow";
import { handleFormSubmitError } from "../../testApp/utils/oryForm";
import CustomSafeView from "../../testApp/components/Common/CustomSafeView";
import CustomKeyboardAvoidingScrollView from "../../testApp/components/Common/CustomKeyboardAvoidingScrollView";
import CustomActivityIndicator from "../../testApp/components/Common/CustomActivityIndicator";
import AppFeatures from "../../testApp/components/AppFeatures";
import { deleteItemAsync, getItemAsync } from "expo-secure-store";
import Bugsnag from "@bugsnag/expo";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const router = useRouter();

  const { width } = useWindowDimensions();
  const {
    theme: { colors, spacing, fontFamily, fontSize },
  } = useTheme();
  const { setSession } = useAuth();

  const [flow, setFlow] = useState(undefined);
  const [inProgressFlow, setInProgressFlow] = useState(true);

  const [lastUsedEmail, setLastUsedEmail] = useState("");

  useEffect(() => {
    initiateFlow();
    return () => setFlow(undefined);
  }, []);

  useEffect(
    useCallback(() => {
      getItemAsync("lastUsedEmail")
        .then((email) => {
          if (email) {
            setLastUsedEmail(email);
          }
        })
        .catch((err) => {
          Bugsnag.notify(err);
          deleteItemAsync("lastUsedEmail")
            .then(() => {})
            .catch((err) => {
              console.log(err);
            });
        });
    }, [])
  );

  const initiateFlow = useCallback(() => {
    setInProgressFlow(true);
    kratosClient
      .createNativeLoginFlow({
        refresh: false,
        aal: "aal1",
      })
      .then((response) => {
        // console.log("LOGIN FLOW ", JSON.stringify(response.data, null, 1));
        
        setInProgressFlow(false);
        setFlow(response.data);
      })
      .catch((error) => {
        setInProgressFlow(false);
        console.error(error);
        console.log(JSON.stringify(error, null, 1))
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
            // console.log("UPDATE LOGIN FLOW ", JSON.stringify(data, null, 1));
            setSession(data.session_token).then(() => {
              router.replace("/home");
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

    accountRecoveryCard: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: spacing.lg,
    },
    forgotPassword: { fontFamily: fontFamily.regular },
    recoveryButton: { marginLeft: spacing.sm },
    recoveryButtonText: { color: colors.blue, fontFamily: fontFamily.semiBold },
  });

  return inProgressFlow ? (
    <CustomActivityIndicator />
  ) : (
    <CustomSafeView safeViewStyle={styles.safeView}>
      <CustomKeyboardAvoidingScrollView>
        <View style={styles.brandingHeader}>
          <Image
            source={require("../../testApp/assets/images/logoFullLight.png")}
            style={styles.logo}
          />
          <Text style={styles.headingText}>Login to your Account</Text>
        </View>

        <View style={styles.formWrapper}>
          <View style={styles.formContainer}>
            <OrySelfServiceFlow
              flow={flow}
              onSubmit={onSubmit}
              identifierValue={lastUsedEmail}
            />

            <View style={styles.accountRecoveryCard}>
              <Text style={styles.forgotPassword}>Forgot Password ?</Text>
              <Pressable
                style={styles.recoveryButton}
                onPress={() => router.push("/recovery")}
              >
                <Text style={styles.recoveryButtonText}>Account Recovery</Text>
              </Pressable>
            </View>

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
