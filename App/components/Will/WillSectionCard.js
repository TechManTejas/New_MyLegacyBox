import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Feather } from "@expo/vector-icons";
import CustomActivityIndicator from "../Common/CustomActivityIndicator";
import { NOMINEE_RELATIONSHIP_TO_TITLE_MAP } from "../../constants/nominee";

const WillSectionCard = ({
  sectiontitle,
  tickCondition,
  title,
  subtitle,
  disableCondition,
  onPress,
  warnCondition,
  warnMsg,
  showEditIcon,
  someDataFilled,
  optional,
  isLoading,
  array
}) => {
  const {
    theme: { spacing, colors, fontSize, fontFamily },
  } = useTheme();

  const styles = StyleSheet.create({
    sectiontitle: {
      marginHorizontal: spacing.md,
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.xl,
      lineHeight: spacing.xl,
    },
    warning: {
      color: colors.red700,
      fontSize: fontSize.sm,
      fontFamily: fontFamily.regular,
      paddingLeft: spacing.sm,
    },
    warningContainer: {
      display: "flex",
      alignItems: "flex-start",
      flexDirection: "row",
      justifyContent: "center",
    },
    icon: {
      fontSize: fontSize.xl,
      color: colors.green600,
    },
    warningIconContainer: {
      paddingTop: 2,
    },
    enabledbutton: {
      padding: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: 10,
      borderColor: colors.blue400,
      borderWidth: 0.5,
      marginTop: spacing.sm,
      backgroundColor: colors.blue100,
      marginBottom: spacing.md,
    },
    enabledtext: {
      color: colors.blue600,
      fontSize: fontSize.lg,
      fontFamily: fontFamily.semiBold,
      lineHeight: spacing.xl,
    },
    enabledsubtext: {
      color: colors.blue500,
      fontSize: fontSize.md,
      fontFamily: fontFamily.regular,
    },
    disabledbutton: {
      padding: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: 10,
      borderColor: colors.black200,
      borderWidth: 0.5,
      marginTop: spacing.sm,
      marginBottom: spacing.md,
    },
    disabledtext: {
      color: colors.black400,
      fontSize: fontSize.lg,
      fontFamily: fontFamily.semiBold,
      lineHeight: spacing.xl,
    },
    disabledsubtext: {
      color: colors.black400,
      fontSize: fontSize.md,
      fontFamily: fontFamily.regular,
    },
    noncard: {
      backgroundColor: colors.black200,
    },
    penicon: {
      fontSize: fontSize.default,
      color: colors.blue400,
    },
    displaycards: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderColor: colors.black200,
    },
    sectionSubTitle: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.sm,
      color: colors.black300,
    },
    leftPadded: {
      paddingLeft: spacing.sm,
    },
  });

  const CheckIcon = (
    <FontAwesome
      name="check-circle"
      size={styles.icon.fontSize}
      color={styles.icon.color}
    />
  );
  const PenIcon = (
    <FontAwesome5
      name="pen"
      size={styles.penicon.fontSize}
      color={styles.penicon.color}
    />
  );

  return (
    <View>
      <Text style={styles.sectiontitle}>
        <Text>{sectiontitle}</Text> {tickCondition && CheckIcon}
        <Text style={[styles.sectionSubTitle, styles.leftPadded]}>
          {optional && "optional"}
        </Text>
      </Text>
      <Pressable
        disabled={disableCondition ? true : false}
        style={
          disableCondition
            ? [styles.disabledbutton, styles.noncard]
            : styles.enabledbutton
        }
        onPress={onPress}
      >
        {isLoading ? (
          <CustomActivityIndicator backgroundColor={colors.blue100} />
        ) : (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={
                  disableCondition ? styles.disabledtext : styles.enabledtext
                }
              >
                {title}
              </Text>
              <Text
                style={
                  disableCondition
                    ? styles.disabledsubtext
                    : styles.enabledsubtext
                }
              >
                {subtitle}
              </Text>
            </View>
            {showEditIcon && someDataFilled && PenIcon}
          </View>
        )}

        {warnCondition && !disableCondition && (
          <View style={styles.warningContainer}>
            <View style={styles.warningIconContainer}>
              <Feather name="info" size={10} color={colors.red700} />
            </View>
            <Text style={styles.warning}>{warnMsg}</Text>
          </View>
        )}
      </Pressable>
      {array &&
        array.map((item, index) => {
          return (
            <Pressable
              key={index}
              disabled
              style={[styles.disabledbutton, styles.displaycards]}
            >
              <View>
                <Text style={styles.disabledtext}>{item.fullName}</Text>
                <Text style={styles.disabledsubtext}>
                  {NOMINEE_RELATIONSHIP_TO_TITLE_MAP[item.relationship]}
                </Text>
              </View>
            </Pressable>
          );
        })}
    </View>
  );
};

export default WillSectionCard;
