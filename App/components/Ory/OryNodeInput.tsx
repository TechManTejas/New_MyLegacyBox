import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import {
  getNodeId,
  getNodeTitle,
  isUiNodeInputAttributes,
  metaLabelModifier,
} from "../../utils/oryForm";
import CustomInputGroup from "../Form/CustomInputGroup";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useTheme } from "../../theme/ThemeProvider";
import { useRoute } from "@react-navigation/core";
import { SCREEN_NAMES } from "../../constants/screenNames";
import { getItemAsync } from "expo-secure-store";

const guessAttributeVariant = ({ attributes }) => {
  if (!isUiNodeInputAttributes(attributes)) {
    return "text";
  }

  if (attributes.name === "identifier") {
    return "username";
  }

  switch (attributes.type) {
    case "tel":
      return "phone";
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

const OryNodeInput = ({
  node,
  value,
  onChange,
  disabled,
  textInputOverride,
}) => {
  const variant = guessAttributeVariant(node);
  
  const route = useRoute();
  const [showPassword, setShowPassword] = useState(false);
  const [lastUsedEmail, setLastUsedEmail] = useState("");


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
      extraProps.placeholderSuffix = "/ email";
      break;
    case "phone":
      extraProps.keyboardType = "phone-pad";
      extraProps.textContentType = "telephoneNumber";
      extraProps.maxLength = 13;
  }

  if (textInputOverride) 
    extraProps = textInputOverride(node, extraProps);
  

  const name = getNodeId(node);
  const title = metaLabelModifier(getNodeTitle(node));

  const {
    theme: { fontFamily, fontSize, spacing, colors },
  } = useTheme();

  const styles = StyleSheet.create({
    toolTipMessage: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: spacing.lg,
      color: colors.blue500,
    },
  });

  

  useEffect(() => {
    getItemAsync("lastUsedEmail").then((email) => {
      if (email) {
        value = route.name === "LOGIN_SCREEN" && name === "identifier" ? email : value
        setLastUsedEmail(email)
      }
    });

    
  }, [])  

  console.log(name);
  

  return (
    <CustomInputGroup
      optional={name==="traits.referralCode"}
      name={name}
      placeholder={`Enter your ${title}`}
      title={title}
      onChange={onChange}
      onChangeText={onChange}
      // defaultValue={route.name === "LOGIN_SCREEN" && name === "identifier" && lastUsedEmail ? lastUsedEmail : ""}
      // value={route.name === "LOGIN_SCREEN" && name === "identifier" && lastUsedEmail ? lastUsedEmail : ""}
      value={value ? String(value) : ""}
      disabled={disabled}
      messages={node.messages}
      {...extraProps}
      info={
        title === "Password" && route.name === SCREEN_NAMES.registerScreen ? (
          <Text style={styles.toolTipMessage}>
            Password should be of 8 Characters or more & combination of Letters,
            Numbers and Special characters.
          </Text>
        ) : null
      }
    />
  );
};

export default OryNodeInput;
