import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import CustomActivityIndicator from "./CustomActivityIndicator";
import { BackHandler } from "react-native";
import {
  useGetNotesByArtifactIdQuery,
  useUpdateNotesByArtifactIdMutation,
} from "../../services/notes/notesSlice";
import { FontAwesome5 } from "@expo/vector-icons";

const NotesModal = ({
  modalVisible,
  setModalVisible,
  artifactDetails,
  setArtifactDetails,
  params,
}) => {
  const snapPoints = ["80%"];

  const sheetRef = useRef(null);
  modalVisible && sheetRef.current?.snapToIndex(0);

  const [notes, setNotes] = useState("");
  const notesRef = useRef(null);

  const { data, isLoading, isFetching, error } = useGetNotesByArtifactIdQuery(
    artifactDetails.financialArtifactId
  );

  console.log(artifactDetails.financialArtifactId);

  useEffect(() => {
    setNotes(data?.data?.note || "");
  }, [data]);

  const [updateNotesByArtifactId] = useUpdateNotesByArtifactIdMutation();

  useEffect(() => {
    if (!modalVisible) {
      setArtifactDetails({
        financialArtifactId: "",
        financialArtifactType: "",
      });
    }

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (modalVisible) {
          setModalVisible(false);
          sheetRef.current?.close();
          return true;
        }
        return false;
      }
    );

    return () => backHandler.remove();
  }, [modalVisible]);

  const {
    theme: { colors, fontSize, spacing, fontFamily },
  } = useTheme();

  const styles = StyleSheet.create({
    modalheader: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: colors.black300,
      paddingTop: spacing.lg,
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.default,
    },
    modalheadertext: {
      color: colors.blue500,
      fontSize: fontSize.xl,
      lineHeight: fontSize.xxl,
      fontFamily: fontFamily.semiBold,
      marginBottom: spacing.xs,
    },
    modalbtnactive: {
      borderRadius: 5,
      paddingVertical: 2,
      paddingHorizontal: spacing.sm,
    },
    modalbtntext: {
      color: colors.white,
      paddingRight: 2,
      paddingTop: 2,
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.md,
    },
    modalContent: {
      paddingBottom: spacing.xl,
    },
    flatList: {
      paddingHorizontal: spacing.xs,
    },
    noteinfo: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
      marginHorizontal: spacing.xxl,
      marginTop: spacing.md,
      backgroundColor: colors.green100,
      borderRadius: spacing.xxs,
      paddingVertical: spacing.xxxs,
    },
    notesinfotext: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      color: colors.green900,
      paddingLeft: spacing.xs,
    },
    paramContainer: {
      flexDirection: "row",
      marginBottom: spacing.xxs,
    },
    paramText: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      color: colors.black400,
    },
    dateContainer: { paddingLeft: spacing.sm, paddingTop: spacing.md },
    dateText: {
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      color: colors.black300,
    },
    placeholderNotesText: {
      padding: spacing.sm,
      paddingTop: spacing.xs,
    },
    noteInput: {
      padding: spacing.sm,
      paddingTop: 0,
    },
    iconContainer: { marginTop: -spacing.xxs },
  });

  const [textEnable, setTextEnable] = useState(false);

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={() => {
        setModalVisible(false);
      }}
      index={-1}
      backdropComponent={useCallback(
        (props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
          />
        ),
        []
      )}
    >
      <View>
        <View style={styles.modalheader}>
          <View>
            <Text style={styles.modalheadertext}>Private Notes</Text>
            <View>
              {params &&
                params.map((val, idx) => {
                  return (
                    <View key={idx} style={styles.paramContainer}>
                      <Text style={styles.paramText}>{val.key}</Text>
                      <Text style={styles.paramText}>{val.value}</Text>
                    </View>
                  );
                })}
            </View>
          </View>
          {!textEnable ? (
            <Pressable
              style={[
                styles.modalbtnactive,
                { backgroundColor: colors.blue500 },
              ]}
              onPress={() => {
                setTextEnable(true);
                notesRef.current?.focus();
              }}
            >
              <Text style={styles.modalbtntext}>Edit</Text>
            </Pressable>
          ) : (
            <Pressable
              style={[
                styles.modalbtnactive,
                { backgroundColor: colors.green600 },
              ]}
              onPress={() => {
                setTextEnable(false);
                updateNotesByArtifactId({
                  note: notes,
                  artifactId: artifactDetails.financialArtifactId,
                });
              }}
            >
              <Text style={styles.modalbtntext}>Save</Text>
            </Pressable>
          )}
        </View>
        <View>
          <View style={styles.noteinfo}>
            <View style={styles.iconContainer}>
              <FontAwesome5 name="lock" size={10} color={colors.green800} />
            </View>
            <Text style={styles.notesinfotext}>
              Notes are non sharable and only visible to you
            </Text>
          </View>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>
            Last updated:{" "}
            {new Date(data?.data?.updatedAt)
              .toDateString()
              .replace(/^\w+ /, "")}
          </Text>
        </View>
        {isLoading || isFetching ? (
          <CustomActivityIndicator />
        ) : (
          <View style={styles.modalContent}>
            {!params ? null : textEnable ? (
              <TextInput
                autoFocus
                ref={notesRef}
                onChangeText={(text) => setNotes(text)}
                value={notes}
                multiline
                placeholder="// Add Notes here"
                style={styles.noteInput}
              />
            ) : (
              <Text style={styles.placeholderNotesText}>{notes}</Text>
            )}
          </View>
        )}
      </View>
    </BottomSheet>
  );
};

export default NotesModal;
