import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { FontAwesome5 } from '@expo/vector-icons'; 
import CustomToolTip from "./CustomToolTip";

const CustomHeaderRightIcon = () => {

    const { theme: { colors, spacing, fontSize, fontFamily } } = useTheme();

    const styles = StyleSheet.create({
        headerRightIcon: {
            paddingHorizontal: spacing.md,
            paddingRight: spacing.lg,
            fontSize: fontSize.default,
            color: colors.blue400,
        },
        toolTipMessage: {
            fontFamily: fontFamily.regular,
            fontSize: fontSize.md,
            lineHeight: spacing.lg,
            color: colors.blue500
        }
    });

    const TooltipMessage = <View>
        <Text style={styles.toolTipMessage}>
            A nominee is a person whom the user has chosen to receive his/her database discreetly after him/her.
        </Text>
    </View>

    return <CustomToolTip 
        icon={<FontAwesome5 name="info" size={styles.headerRightIcon.fontSize} color={styles.headerRightIcon.color} />}
        message={TooltipMessage}
        position={"left"}
        style={styles.headerRightIcon}
    />
    
};

export default CustomHeaderRightIcon;
