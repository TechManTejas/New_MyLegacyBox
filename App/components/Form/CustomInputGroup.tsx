import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import CustomErrorMessageGroup from "./CustomErrorMessageGroup";
import CustomToolTip from "../Common/CustomToolTip";
import { Ionicons } from "@expo/vector-icons";
import CustomActivityIndicator from "../Common/CustomActivityIndicator";

const CustomInputGroup = ({
  name,
  title,
  subTitle,
  onPressIn,
  onChange,
  onFocus,
  onChangeText,
  onBlur,
  onTouchStart,
  pointerEvents,
  value,
  placeholder,
  disabled,
  messages = [],
  IconLeftComponent,
  IconRightComponent,
  placeholderSuffix,
  multiline,
  numberOfLines,
  optional,
  textContentType,
  textTransformNormal,
  info,
  loader,
  ...extraProps
}) => {
  const [hasError, setHasError] = useState(false);
  const {
    theme: { colors, spacing, fontSize, fontFamily },
  } = useTheme();

  useEffect(() => {
    if (messages.length) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [messages]);

  const styles = StyleSheet.create({
    container: {
      marginBottom: spacing.lg,
    },
    labelContainer: {
      flexDirection: "row",
      alignItems: "baseline",
    },
    label: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      textTransform: textTransformNormal ? "none" : "capitalize",
      color: colors.black400,
      marginBottom: spacing.sm,
    },
    labelOptional: {
      color: colors.black300,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.sm,
      paddingLeft: spacing.sm,
    },
    inputContainer: {
      flexDirection: "row",
      elevation: 1,
      shadowColor: colors.black200,
      borderWidth: StyleSheet.hairlineWidth,
      backgroundColor: colors.white400,
      borderColor: colors.white500,
      borderRadius: spacing.md,
      paddingVertical: spacing.xs,
    },
    multilineInputContainer: {
      paddingTop: spacing.md,
    },
    inputIcon: {
      width: spacing.xxl,
      justifyContent: "center",
      alignItems: "center",
    },
    inputIconAttributes: {
      color: colors.black300,
      fontSize: fontSize.default,
    },
    input: {
      flexGrow: 1,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      color: colors.black500,
      lineHeight: fontSize.default,
      // paddingHorizontal: spacing.sm,
      paddingHorizontal: spacing.lg,
      height: 40,

      // borderRadius: 20
    },
    multilineInput: {
      textAlignVertical: "top",
      height: 70
    },
    inputDisabled: {
      backgroundColor: colors.black100,
    },
    placeholder: {
      color: colors.black300,
    },
    messageContainer: {
      marginTop: spacing.xs + spacing.xxs,
    },
    message: {
      marginHorizontal: spacing.xxs,
      fontSize: fontSize.sm,
      fontFamily: fontFamily.regular,
      color: colors.red,
    },
    subTitleContainer: {
      marginBottom: spacing.sm,
      marginTop: -spacing.xs,
    },
    subTitle: {
      color: colors.black300,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.sm,
      lineHeight: fontSize.md,
    },
    iconContainer: {
      paddingLeft: spacing.sm,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{title}</Text>
        {info && (
          <CustomToolTip
            icon={
              <Ionicons
                name="information-circle-outline"
                size={fontSize.default}
                color={colors.blue500}
              />
            }
            message={info}
            position={"top"}
            style={styles.iconContainer}
          />
        )}
        {optional ? <Text style={styles.labelOptional}>optional</Text> : null}
        {loader && <ActivityIndicator style={{ marginLeft: spacing.sm }} size={10} color={colors.blue500} />}
      </View>
      {subTitle ? (
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
      ) : null}
      <View
        style={[
          styles.inputContainer,
          disabled && styles.inputDisabled,
          multiline && styles.multilineInputContainer,
        ]}
      >
        {IconLeftComponent ? (
          <IconLeftComponent
            style={[styles.inputIcon]}
            color={styles.inputIconAttributes.color}
            size={styles.inputIconAttributes.fontSize}
          />
        ) : null}
        <TextInput
          onPressIn={onPressIn}
          style={[styles.input, multiline && styles.multilineInput]}
          onFocus={onFocus}
          numberOfLines={multiline ? numberOfLines : 1}
          onChange={onChange}
          onChangeText={onChangeText ? onChangeText : onChange}
          onBlur={onBlur}
          onTouchStart={onTouchStart}
          value={value || value === 0 ? String(value) : ""}
          pointerEvents={pointerEvents}
          placeholder={`${placeholder} ${placeholderSuffix || ""}`}
          editable={!disabled}
          textContentType={textContentType}
          placeholderTextColor={styles.placeholder.color}
          multiline={multiline}
          {...extraProps}
        />
        {IconRightComponent ? (
          <IconRightComponent
            style={[styles.inputIcon]}
            color={styles.inputIconAttributes.color}
            size={styles.inputIconAttributes.fontSize}
          />
        ) : null}
      </View>

      <CustomErrorMessageGroup messages={messages} />
    </View>
  );
};

export default CustomInputGroup;
