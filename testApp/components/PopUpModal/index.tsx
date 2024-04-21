import { View, Text, Modal, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";

interface ButtonProps {
  text: string;
  callBack: () => void;
}

interface PopUpModalProps {
  isVisible?: boolean;
  setIsVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  message?: string;
  firstButton?: ButtonProps;
  secondButton?: ButtonProps;
}

const PopUpModal: React.FC<PopUpModalProps> = ({
  setIsVisible,
  isVisible,
  title,
  message,
  firstButton,
  secondButton,
}) => {
  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const styles = StyleSheet.create({
    modalContainer: {
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    card: {
      backgroundColor: "white",
      borderRadius: spacing.sm,
      width: 320,
    },
    header: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: colors.black300,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.sm,
    },
    headerText: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.default,
      lineHeight: fontSize.lg,
      color: colors.blue500,
    },
    buttonContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      paddingVertical: spacing.sm,
      marginHorizontal: spacing.sm,
    },
    button: {
      flex: 1,
      backgroundColor: colors.red500,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      borderRadius: spacing.sm,
    },
    buttonText: {
      textAlign: "center",
      color: "white",
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
    },
    secondaryBtn: {
      backgroundColor: colors.red200,
      marginLeft: spacing.sm,
    },
    secondaryText: {
      color: colors.red500,
    },
    messageContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: spacing.sm,
      marginTop: spacing.sm,
      backgroundColor: colors.black100,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.sm,
      borderRadius: spacing.xs,
    },
    messageText: {
      paddingLeft: spacing.sm,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
    },
  });

  const closeModal = () => {
    if (setIsVisible) setIsVisible(false);
  };

  return (
    <Modal
      transparent
      visible={isVisible || false}
      onRequestClose={() => {}}
      animationType="fade"
    >
      <View style={styles.modalContainer}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              {title ? title : "Modal Title"}
            </Text>
            <Pressable onPress={closeModal}>
              <Entypo name="cross" size={24} color={colors.black200} />
            </Pressable>
          </View>

          <View>
            <View style={styles.messageContainer}>
              <FontAwesome5
                name="info-circle"
                size={14}
                color={colors.black500}
              />
              <Text style={styles.messageText}>
                {message ? message : "Your message"}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              {firstButton && (
                <Pressable style={styles.button} onPress={firstButton.callBack}>
                  <Text style={styles.buttonText}>{firstButton.text}</Text>
                </Pressable>
              )}
              {secondButton && (
                <Pressable
                  style={[styles.button, styles.secondaryBtn]}
                  onPress={secondButton.callBack}
                >
                  <Text style={[styles.buttonText, styles.secondaryText]}>
                    {secondButton.text}
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PopUpModal;
