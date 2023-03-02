import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../../constants/screenNames";

const PostalItem = ({ hideCarret, ...postal }) => {
  const { _id, name, ifsc, branchName, poc, pocNumber, address } = postal;

  const {
    theme: { colors, fontFamily, fontSize, spacing },
  } = useTheme();

  const navigation = useNavigation();

  const pressHandler = () => {
    navigation.navigate(SCREEN_NAMES.postalScreen, {
      _id,
      postal,
    });
  };

  const styles = StyleSheet.create({
    container: {
      marginBottom: spacing.md,
      borderWidth: spacing.xxxs,
      borderColor: colors.black100,
      borderRadius: spacing.sm,
    },
    pressableContainer: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
    },
    postalContainer: {
      flex: 1,
      paddingTop: spacing.sm,
    },
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "baseline",
      paddingHorizontal: spacing.md,
      marginBottom: spacing.xs,
    },
    postalName: {
      fontFamily: fontFamily.semiBold,
      color: colors.blue400,
      fontSize: fontSize.default,
      lineHeight: fontSize.lg,
    },
    postalIfsc: {
      fontFamily: fontFamily.regular,
      marginLeft: spacing.xs,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      color: colors.black300,
    },
    postalPoc: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      lineHeight: fontSize.default,
      color: colors.black400,
    },
    postalFooter: {
      backgroundColor: colors.black700,
      width: 120,
      flexDirection: "row",
      alignSelf: "flex-start",
      justifyContent: "center",
      marginTop: spacing.md,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderTopRightRadius: spacing.sm,
      borderBottomLeftRadius: spacing.sm,
    },
    city: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.sm,
      color: colors.white100,
    },
    iconContainer: {
      paddingHorizontal: spacing.sm,
    },
    icon: {
      fontSize: fontSize.default,
      color: colors.black300,
    },
  });

  return (
    <View style={styles.container}>
      <Pressable style={styles.pressableContainer} onPress={pressHandler}>
        <View style={styles.postalContainer}>
          <View>
            <View style={styles.row}>
              <Text style={styles.postalName}>
                {name}, {branchName}
              </Text>
              {ifsc ? <Text style={styles.postalIfsc}>({ifsc})</Text> : null}
            </View>

            {/* {poc ? ( */}
            <View style={styles.row}>
              <Text style={styles.postalPoc}>
                RM : {poc ? poc : "Not added"}
              </Text>
            </View>
            {/* ) : null} */}

            {/* {pocNumber ? ( */}
            <View style={styles.row}>
              <Text style={styles.postalPoc}>
                Phone : {pocNumber ? pocNumber : "Not added"}
              </Text>
            </View>
            {/* ) : null} */}
          </View>
          {address?.city ? (
            <View style={styles.postalFooter}>
              <Text style={styles.city}>{address?.city}</Text>
            </View>
          ) : null}
        </View>
        {!hideCarret ? (
          <View style={styles.iconContainer}>
            <FontAwesome5
              name="chevron-right"
              size={styles.icon.fontSize}
              color={styles.icon.color}
            />
          </View>
        ) : null}
      </Pressable>
    </View>
  );
};

export default PostalItem;
