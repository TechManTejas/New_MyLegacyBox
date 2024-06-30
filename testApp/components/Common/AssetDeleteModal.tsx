import { View, Text, Modal, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import WillInfoCard from "./WillInfoCard";
import { Entypo } from "@expo/vector-icons";

interface AssetDeleteModalProps {
  assetDeleteModalVisible: boolean;
  crossButtonCLick: () => void;
  archiveButtonCallback: () => void;
  deleteButtonCallback: () => void;
  permanentlyDeleteButtonCallback: () => void;
  onRequestClose?: () => void;
  infoTitle: string;
  infoMessage: string;
  cancelButtonCallBack: () => void;
}

const AssetDeleteModal: React.FC<AssetDeleteModalProps> = ({
  assetDeleteModalVisible,
  crossButtonCLick,
  onRequestClose,
  archiveButtonCallback,
  deleteButtonCallback,
  permanentlyDeleteButtonCallback,
  cancelButtonCallBack,
  infoTitle,
  infoMessage,
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
  });

  return (
    <Modal
      transparent
      visible={assetDeleteModalVisible}
      onRequestClose={onRequestClose}
      animationType="fade"
    >
      <Pressable style={styles.modalContainer} onPress={onRequestClose}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              {infoTitle ? infoTitle : "Are you sure you want to delete it ?"}
            </Text>
            <Pressable onPress={crossButtonCLick}>
              <Entypo name="cross" size={24} color={colors.black200} />
            </Pressable>
          </View>

          <View>
            <View>
              <WillInfoCard
                content={
                  infoMessage
                    ? infoMessage
                    : "you can archive data for future reference"
                }
                backgroundColor={colors.white500}
              />
            </View>
            <View style={styles.buttonContainer}>
              {archiveButtonCallback && (
                <Pressable
                  style={styles.button}
                  onPress={archiveButtonCallback}
                >
                  <Text style={styles.buttonText}>Archive</Text>
                </Pressable>
              )}
              {deleteButtonCallback && (
                <Pressable
                  style={[styles.button, styles.secondaryBtn]}
                  onPress={deleteButtonCallback}
                >
                  <Text style={[styles.buttonText, styles.secondaryText]}>
                    Delete
                  </Text>
                </Pressable>
              )}
              {permanentlyDeleteButtonCallback && (
                <Pressable
                  style={styles.button}
                  onPress={permanentlyDeleteButtonCallback}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </Pressable>
              )}
              {cancelButtonCallBack && (
                <Pressable
                  style={[styles.button, styles.secondaryBtn]}
                  onPress={cancelButtonCallBack}
                >
                  <Text style={[styles.buttonText, styles.secondaryText]}>
                    Cancel
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default AssetDeleteModal;
