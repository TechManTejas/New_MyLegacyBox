import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  useWindowDimensions,
} from "react-native";
import { useAuth } from "../testApp/authentication/AuthProvider";
import { useTheme } from "../testApp/theme/ThemeProvider";
import { kratosClient } from "../testApp/authentication/kratosSdk";
import { handleFormSubmitError } from "../testApp/utils/oryForm";
import CustomSafeView from "../testApp/components/Common/CustomSafeView";
import CustomKeyboardAvoidingScrollView from "../testApp/components/Common/CustomKeyboardAvoidingScrollView";
import CustomActivityIndicator from "../testApp/components/Common/CustomActivityIndicator";
import OrySelfServiceSignUpFlow from "../testApp/components/Ory/OrySelfServiceSignUpFlow";
import ProgressTracker from "../testApp/components/ProgressTracker";
import UserGroup from "../testApp/assets/icons/users-group.svg"
import ShieldHeart from "../testApp/assets/icons/shield-heart.svg"
import Seeding from "../testApp/assets/icons/seeding.svg"
import { useRouter } from "expo-router";

const RegisterScreen = () => {

  const { width } = useWindowDimensions();

  const router = useRouter()

  const {
    theme: { colors, spacing, fontFamily, fontSize },
  } = useTheme();

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
      .createNativeRegistrationFlow({
        refresh: false,
        aal: "aal1",
      })
      .then((response) => {
        setInProgressFlow(false);
        setFlow(response.data);
      })
      .catch((error) => {
        setInProgressFlow(false);
        console.error(error);
      });
  }, []);

  const onSubmit = (values) => {
    return flow
      ? kratosClient
          .updateRegistrationFlow({
            flow: flow.id,
            updateRegistrationFlowBody: {
              ...values,
              "traits.email": values["traits.email"].toLowerCase(),
              "traits.phone":
                values["traits.phone"].length === 10 &&
                !values["traits.phone"].startsWith("+91")
                  ? "+91" + values["traits.phone"]
                  : values["traits.phone"],
            },
          })
          .then(({ data }) => {
            setSession(data.session_token).then(() => {

              router.push("drawer")

            });
          })
          .catch(handleFormSubmitError(setFlow, initiateFlow))
      : Promise.resolve();
  };

  const [cardNo, setCardNo] = useState(0);

  const cardMessages = [
    <Text>Been there, Done that! <Text style={{ fontFamily: fontFamily.semiBold }}>What's next??</Text> </Text>,
    <Text>Just trying to do a little better everyday;</Text>,
    <Text>We start again.. <Text style={{ fontFamily: fontFamily.semiBold }}>this time for the Family!!</Text> </Text>,
  ];

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

        <View style={styles.brandingHeader}>
          <Image
            source={require("../testApp/assets/images/logoFullLight.png")}
            style={styles.logo}
          />
          <Text style={styles.headingText}>Register your Account</Text>
        </View>

        <View style={styles.formWrapper}>
          <View style={styles.formContainer}>
            <OrySelfServiceSignUpFlow
              cardNo={cardNo}
              setCardNo={setCardNo}
              flow={flow}
              onSubmit={onSubmit}
            />

            <ProgressTracker
              icons={[Seeding, UserGroup, ShieldHeart]}
              currentColor={colors.green600}
              activeColor={colors.green600}
              inActiveColor={colors.black300}
              size={fontSize.xl}
              currentIndex={cardNo}
              style={{ marginTop: spacing.xl }}
            />

            <View
              style={{
                alignItems: "center",
                marginTop: spacing.xxl,
                flexDirection: "row",
                paddingHorizontal: spacing.sm,
                paddingVertical: spacing.md,
                borderRadius: spacing.sm,
                
              }}
            >
              <Text style={{ fontSize: fontSize.xxl, marginTop: -spacing.xs }}>✨</Text>
              <Text
                style={{
                  fontFamily: fontFamily.regular,
                  fontSize: fontSize.md,
                  lineHeight: fontSize.default,
                  color: colors.blue400,
                  flexWrap:"wrap",
                  flexShrink: 1,
                  paddingLeft: spacing.md
                }}
              >
                {cardMessages[cardNo]}
              </Text>
            </View>

            <View style={styles.formFooter}>
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

export default RegisterScreen;
