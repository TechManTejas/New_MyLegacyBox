import {
  LoginFlow,
  RegistrationFlow,
  SettingsFlow,
  UiNode,
  UiText,
  UpdateLoginFlowBody,
  UpdateRegistrationFlowBody,
  UpdateSettingsFlowBody,
  UpdateVerificationFlowBody,
  VerificationFlow,
} from "@ory/kratos-client";
import React, { useEffect, useState } from "react";
import {
  getNodeId,
  isUiNodeInputAttributes,
} from "../../testApp/utils/oryForm";
//   import Messages from "./Messages"
import OryNode from "../../testApp/components/Ory/OryNode";
import { Text, View } from "react-native";

interface Props<T> {
  flow?: LoginFlow | RegistrationFlow | SettingsFlow | VerificationFlow;
  onSubmit: (payload: T) => Promise<void>;
  only?: "password" | "profile" | "totp" | "lookup_secret";
  // textInputOverride?: TextInputOverride
}

interface MessageProps {
    messages?: Array<UiText>
    testID?: string
  }

const Messages =  ({ messages = [], testID }: MessageProps) => (
    <View testID={testID}>
      {messages.map(({ text, id }: any, k: any) => (
        <Text testID={`ui/message/${id}`} key={`${id}${k}`}>
          {text}
        </Text>
      ))}
    </View>
  )

const AccountRecoveryFlow = <
  T extends
    | UpdateSettingsFlowBody
    | UpdateLoginFlowBody
    | UpdateRegistrationFlowBody
    | UpdateVerificationFlowBody
>({
  flow,
  only,
  onSubmit,
//   textInputOverride,
}: Props<T>) => {
  const [inProgress, setInProgress] = useState(false);
  const [values, setValues] = useState<T>({} as T);
  const [nodes, setNodes] = useState<Array<UiNode>>([]);

  useEffect(() => {
    if (!flow) {
      return;
    }

    const nodes = flow.ui.nodes.filter(({ group }) => {
      if (only) {
        return group === only || group === "default";
      }
      return true;
    });

    const values: Partial<T> = {};
    nodes.forEach((node: UiNode) => {
      const name = getNodeId(node);

      const key = name as keyof T;
      if (isUiNodeInputAttributes(node.attributes)) {
        if (
          node.attributes.type === "button" ||
          node.attributes.type === "submit"
        ) {
          return;
        }
        values[key] = node.attributes.value;
      }
    });

    setValues(values as T);
    setNodes(nodes);
  }, [flow]);

  if (!flow) {
    return null;
  }

  const onChange = (name: string) => (value: any) => {
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const getValue = (name: string) => values[name as keyof T];
  const onPress = (key: string, value: any) => {
    setInProgress(true);
    onSubmit({ ...values, [key]: value }).then(() => {
      setInProgress(false);
    });
  };

  return (
    <>
      <Messages testID="form-messages" messages={flow.ui.messages} />
      {nodes.map((node: UiNode, k) => {
        const name = getNodeId(node);
        return (
          <OryNode
            key={`form-field-${flow.ui.action || ""}-${name}-${k}`}
            // textInputOverride={textInputOverride}
            disabled={inProgress}
            value={getValue(name)}
            onChange={onChange(name)}
            node={node}
            isSubmitting={inProgress}
            onSubmitPress={onPress}
          />
        );
      })}
    </>
  );
};

export default AccountRecoveryFlow