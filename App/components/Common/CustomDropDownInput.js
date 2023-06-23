import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useTheme } from "../../theme/ThemeProvider";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import CustomErrorMessageGroup from "../Form/CustomErrorMessageGroup";

const CustomDropDownInput = ({
  title,
  data,
  placeholder,
  value,
  onChange,
  onBlur,
  labelField,
  valueField,
  messages,
  optional,
  textTransformNormal,
  showSelectedIcon,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const {
    theme: { colors, spacing, fontSize, fontFamily },
  } = useTheme();
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
    placeholderStyle: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      color: colors.black300,
      lineHeight: fontSize.default,
      paddingHorizontal: spacing.sm,
    },
    dropdownContainer: {
      elevation: 1,
      shadowColor: colors.black100,
      backgroundColor: colors.white100,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.black100,
      borderRadius: spacing.md,
      height: 47,
      paddingHorizontal: spacing.sm,
    },
    selectedTextStyle: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      color: colors.black500,
      lineHeight: fontSize.default,
      paddingHorizontal: spacing.sm,
    },
    itemContainerStyle: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.black200,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.sm,
    },
    itemWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    itemTextStyle: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      color: colors.black500,
      lineHeight: fontSize.default,
    },
    activeItem: {
      backgroundColor: colors.blue100,
    },
    activeItemIcon: {
      color: colors.blue,
      fontSize: fontSize.md,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{title}</Text>
        {optional ? <Text style={styles.labelOptional}>optional</Text> : null}
      </View>
      <Dropdown
        data={data}
        activeColor={styles.activeItem.backgroundColor}
        style={styles.dropdownContainer}
        itemContainerStyle={styles.itemContainerStyle}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        labelField={labelField ? labelField : "label"}
        valueField={valueField ? valueField : "value"}
        placeholder={placeholder}
        value={value}
        renderItem={(item, selected) => (
          <View style={styles.itemWrapper}>
            <Text style={styles.itemTextStyle}>
              {item[labelField ? labelField : "label"]}
            </Text>
            {selected && showSelectedIcon ? (
              <FontAwesome5
                name="check"
                color={styles.activeItemIcon.color}
                size={styles.activeItemIcon.fontSize}
              />
            ) : null}
          </View>
        )}
        onFocus={() => setIsFocus(true)}
        onBlur={() => {
          setIsFocus(false);
          onBlur ? onBlur() : null;
        }}
        onChange={(item) => {
          onChange(item.value);
        }}
      />
      <CustomErrorMessageGroup messages={messages} />
    </View>
  );
};

export default CustomDropDownInput;
