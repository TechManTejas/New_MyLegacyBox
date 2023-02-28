import React, { useEffect, useState } from "react";
import { Text, Pressable } from "react-native";
import {
  getNodeId,
  getNodeTitle,
  isUiNodeInputAttributes,
  metaLabelModifier,
} from "../../utils/oryForm";
import CustomInputGroup from "../Form/CustomInputGroup";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const guessAttributeVariant = ({ attributes }) => {
  if (!isUiNodeInputAttributes(attributes)) {
    return "text";
  }

  if (attributes.name === "identifier") {
    return "username";
  }

  switch (attributes.type) {
    case "hidden":
      return null;
    case "email":
      return "email";
    case "submit":
      return "button";
    case "password":
      return "password";
    default:
      return "text";
  }
};

const typeToState = ({ type, disabled }) => {
  if (disabled) {
    return "disabled";
  }
  switch (type) {
    case "error":
      return "error";
  }
  return undefined;
};

const OryNodeInput = ({
  node,
  value,
  onChange,
  disabled,
  textInputOverride,
}) => {
  const variant = guessAttributeVariant(node);
  const [showPassword, setShowPassword] = useState(false);

  if (!variant) return null;

  let extraProps = {};

  switch (variant) {
    case "email":
      extraProps.autoCompleteType = "email";
      extraProps.keyboardType = "email-address";
      extraProps.textContentType = "emailAddress";
      extraProps.autoCapitalize = "none";
      extraProps.autoCorrect = false;
      break;
    case "password":
      extraProps.autoCompleteType = "password";
      extraProps.textContentType = "password";
      extraProps.autoCapitalize = "none";
      extraProps.secureTextEntry = !showPassword;
      extraProps.autoCorrect = false;
      // custom prop for our input element (for toggle functionality)
      extraProps.IconRightComponent = ({ style, color, size }) => (
        <Pressable
          style={style}
          onPress={() => setShowPassword((showPassword) => !showPassword)}
        >
          {showPassword ? (
            <FontAwesome5 name="eye-slash" color={color} size={size} />
          ) : (
            <FontAwesome5 name="eye" color={color} size={size} />
          )}
        </Pressable>
      );
      break;
    case "username":
      extraProps.autoCompleteType = "username";
      extraProps.textContentType = "username";
      extraProps.autoCapitalize = "none";
      extraProps.autoCorrect = false;
      // extra props for displaying custom placeholder
      extraProps.placeholderSuffix = "/ email";
      break;
  }

  if (textInputOverride) {
    extraProps = textInputOverride(node, extraProps);
  }

  const name = getNodeId(node);
  const title = metaLabelModifier(getNodeTitle(node));

  return (
    <CustomInputGroup
      name={name}
      placeholder={`Enter your ${title}`}
      title={title}
      onChange={onChange}
      onChangeText={onChange}
      value={value ? String(value) : ""}
      disabled={disabled}
      messages={node.messages}
      {...extraProps}
    />
    // <View>
    //   <Text>{title}</Text>
    //   <TextInput
    //     onChange={onChange}
    //     onChangeText={onChange}
    //     value={value ? String(value) : ""}
    //     editable={!disabled}
    //     {...extraProps}
    //   />

    //   <>
    //     {node.messages?.map(({ text, id }, index) => (
    //       <Text key={`message-${name}-${id}-${index}`}>{text}</Text>
    //     ))}
    //   </>
    // </View>
  );
};

export default OryNodeInput;
