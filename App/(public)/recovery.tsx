import React, { useCallback, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { kratosClient } from "../../testApp/authentication/kratosSdk";
import { useTheme } from "../../testApp/theme/ThemeProvider";
import {
  ContinueWith,
  RecoveryFlow,
  UpdateRecoveryFlowBody,
} from "@ory/client";
import { useFocusEffect, useRouter } from "expo-router";
import {
  AuthProvider,
  useAuth,
} from "../../testApp/authentication/AuthProvider";
import OrySelfServiceFlow from "../../testApp/components/Ory/OrySelfServiceFlow";
import { handleFormSubmitError } from "../../testApp/utils/oryForm";
import axios from "axios";

const AccountRecovery = () => {
  const {
    theme: { colors, fontFamily, spacing },
  } = useTheme();

  const styles = StyleSheet.create({
    screen: {
      padding: spacing.sm,
      flex: 1,
      backgroundColor: colors.white100,
    },
    input: {
      backgroundColor: colors.white100,
      borderWidth: StyleSheet.hairlineWidth,
      padding: spacing.sm,
      borderRadius: spacing.xs,
      borderColor: colors.black200,
      marginTop: spacing.sm,
    },
    recoveryButton: {
      backgroundColor: colors.blue,
      fontFamily: fontFamily.regular,
      padding: spacing.md,
      borderRadius: spacing.sm,
      marginTop: spacing.md,
    },
    recoveryBtnText: {
      color: colors.white100,
      textAlign: "center",
    },
  });

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [flow, setFlow] = useState<RecoveryFlow | undefined>(undefined);
  const { syncSession, setSession } = useAuth();

  console.log(JSON.stringify(flow, null, 1));
  

  function collectRecoveryActions(items?: ContinueWith[]) {
    return items?.reduce(
      (acc, curr) => {
        switch (curr.action) {
          case "show_settings_ui":
            return { ...acc, settingsFlowId: curr.flow.id };

          case "set_ory_session_token": {
            return { ...acc, sessionToken: curr.ory_session_token };
          }

          case "show_recovery_ui": {
            return { ...acc, recoveryFlowId: curr.flow.id };
          }
        }
        return acc;
      },
      { settingsFlowId: "", sessionToken: "", recoveryFlowId: "" }
    );
  }

  async function initializeFlow(): Promise<void> {
    await kratosClient
      .createNativeRecoveryFlow()
      .then(({ data: flow }) => flow)
      .then(setFlow)
      .catch((err) => {
        console.log(err);
      });
  }

  useFocusEffect(
    useCallback(() => {
      initializeFlow();

      return () => {
        setFlow(undefined);
      };
    }, [kratosClient])
  );

  const handleContinueWith = async (c: ContinueWith[]): Promise<void> => {
    const actions = collectRecoveryActions(c);

    if (actions?.recoveryFlowId) {
      const { data: flow } = await kratosClient.getRecoveryFlow({
        id: actions.recoveryFlowId,
      });
      setFlow(flow);
    }
  };

  const onSubmit = async (body: UpdateRecoveryFlowBody) => {

    if (!flow) {
      console.error("No flow!");
      return;
    }

    try {

      const { data: updatedFlow } = await kratosClient.updateRecoveryFlow({
        flow: flow?.id,
        updateRecoveryFlowBody: {
          method: "code",
          email: body.email,
          code: "",
          transient_payload: {}
        },
      });

      if (updatedFlow.state === "passed_challenge") {
        const actions = collectRecoveryActions(updatedFlow.continue_with);

        if (actions?.sessionToken) {
          const { data: session } = await kratosClient.toSession({
            xSessionToken: actions.sessionToken,
          });
          setSession({ session, session_token: actions.sessionToken });
          await syncSession();

          router.push({
            pathname: "settings",
            params: {
              flowId: actions.settingsFlowId,
            },
          });
        }
      } else {
        setFlow(updatedFlow);
      }
    } catch (err) {
      console.log(JSON.stringify(err, null, 1));
      
      if (axios.isAxiosError(err)) {
        handleFormSubmitError(
          flow,
          setFlow,
          initializeFlow,
          () => {},
          async () => {},
          () => {},
          handleContinueWith
        )(err);
      }
    }
  };

  // const handleRecovery = async () => {
  //   try {
  //     const { data: flow } = await kratosClient.createNativeRecoveryFlow();

  //     const csrf_token = flow.ui.nodes.find(
  //       (node) => node.attributes?.name === "csrf_token"
  //     )?.attributes?.value;

  //     console.log(JSON.stringify(flow, null, 1));

  //     const res = await kratosClient.updateRecoveryFlow({
  //       flow: flow.id,
  //       updateRecoveryFlowBody: {
  //         method: "code",
  //         email,
  //         csrf_token,
  //       },
  //     });

  //     console.log(JSON.stringify(res.data, null, 1));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <View style={styles.screen}>
      {/* <Text>Enter your email to recover your account:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
      />
      <Pressable onPress={handleRecovery} style={styles.recoveryButton}>
        <Text style={styles.recoveryBtnText}>Recover Account</Text>
      </Pressable> */}
      <OrySelfServiceFlow flow={flow} onSubmit={onSubmit} />
    </View>
  );
};

export default AccountRecovery;
