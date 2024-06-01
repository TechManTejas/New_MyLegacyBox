// This file renders the settings screen.

import {
  FrontendApi,
  SettingsFlow,
  SettingsFlowState,
  UpdateSettingsFlowBody,
} from "@ory/kratos-client"
import React, { useContext, useEffect, useState } from "react"
import { handleFormSubmitError } from "../../testApp/utils/oryForm"
import { useAuth } from "../../testApp/authentication/AuthProvider"
import { kratosClient } from "../../testApp/authentication/kratosSdk"
import OrySelfServiceFlow from "../../testApp/components/Ory/OrySelfServiceFlow"
import { Text, View } from "react-native"

async function initializeFlow(sdk: FrontendApi, sessionToken: string) {
  const { data: flow } = await sdk.createNativeSettingsFlow({
    xSessionToken: sessionToken,
  })
  return flow
}

async function fetchFlow(
  sdk: FrontendApi,
  sessionToken: string,
  flowId: string,
) {
  const { data: flow } = await sdk.getSettingsFlow({
    id: flowId,
    xSessionToken: sessionToken,
  })
  return flow
}

const Settings = ({ navigation, route }: Props) => {
  // const { sdk } = useContext(ProjectContext)
  const { isAuthenticated, sessionToken, setSession, syncSession } =
    useAuth()
  const [flow, setFlow] = useState<SettingsFlow | undefined>(undefined)

  useEffect(() => {
    if (!sessionToken || !isAuthenticated) {
      navigation.navigate("Login", {})
      return
    }
    if (route?.params?.flowId) {
      fetchFlow(kratosClient, sessionToken, route.params.flowId)
        .then(setFlow)
        .catch((err) => {
          console.log(err);
          
        })
    } else {
      initializeFlow(kratosClient, sessionToken).then(setFlow).catch((err) => {
        console.log(err);
      })
    }
  }, [kratosClient, sessionToken])

  if (!flow || !sessionToken) {
    return null
  }

  const onSuccess = (result: SettingsFlow) => {
    if (result.continue_with) {
      for (const c of result.continue_with) {
        switch (c.action) {
          case "show_verification_ui": {
            console.log("got a verification flow, navigating to it", c)
            navigation.navigate("Verification", {
              flowId: c.flow.id,
            })
            break
          }
        }
      }
    }
    if (result.state === SettingsFlowState.Success) {
      syncSession().then(() => {
        // showMessage({
        //   message: "Your changes have been saved",
        //   type: "success",
        // })
      })
    }
    setFlow(result)
  }

  const onSubmit = (payload: UpdateSettingsFlowBody) =>
    kratosClient
      .updateSettingsFlow({
        flow: flow.id,
        xSessionToken: sessionToken,
        updateSettingsFlowBody: payload,
      })
      .then(({ data }) => {
        onSuccess(data)
      })
      .catch(
        handleFormSubmitError(
          undefined,
          setFlow,
          () => initializeFlow(kratosClient, sessionToken).then,
          () => setSession(null),
          async () => {},
        ),
      )

  return (
    <View>
      <View testID={"settings-password"}>
        <View>
          <Text>Change password</Text>
        </View>
        <OrySelfServiceFlow flow={flow} only="password" onSubmit={onSubmit} />
      </View>

      <View testID={"settings-profile"}>
        <View>
          <Text>Profile settings</Text>
        </View>
        <OrySelfServiceFlow flow={flow} only="profile" onSubmit={onSubmit} />
      </View>

      {flow?.ui.nodes.find(({ group }) => group === "totp") ? (
        <View testID={"settings-totp"}>
          <View>
            <Text>2FA authenticator</Text>
          </View>
          <OrySelfServiceFlow flow={flow} only="totp" onSubmit={onSubmit} />
        </View>
      ) : null}

      {flow?.ui.nodes.find(({ group }) => group === "lookup_secret") ? (
        <View testID={"settings-lookup"}>
          <View>
            <Text>Backup recovery codes</Text>
          </View>
          <OrySelfServiceFlow
            flow={flow}
            only="lookup_secret"
            onSubmit={onSubmit}
          />
        </View>
      ) : null}
    </View>
  )
}

export default Settings