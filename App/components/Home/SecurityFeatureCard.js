import { MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeProvider';
import { StyleSheet, Text, View } from 'react-native';

const SecurityFeatureCard = () => {

    const {
        theme: { spacing, colors, fontSize },
    } = useTheme();

    const style = StyleSheet.create({
        main: {
            padding: spacing.md,
            backgroundColor: colors.white500,
            marginVertical: spacing.md,
            borderRadius: 10
        },
        heading: {
            textAlign: "center",
            color: colors.blue500,
            fontSize: fontSize.lg,
            fontWeight: "800",
            padding: 10,
        },
        featureicontext: {
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "row",
            padding: 5,
            width: "50%"
        },
        text: {
            color: colors.blue400,
            marginLeft: spacing.md,
            fontWeight: "500",
        },
        col: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
        },
        features: {
            padding: 5
        }
    })


    return (
        <View style={style.main}>

            <Text style={style.heading}>Securing your data is our first concern</Text>

            <View style={style.features}>

                <View style={style.col}>
                    <View style={style.featureicontext}>
                        <MaterialIcons name="enhanced-encryption" size={24} color={colors.blue500} />
                        <Text style={style.text}>End to End data encryption</Text>
                    </View>
                    <View style={style.featureicontext}>
                        <MaterialCommunityIcons name="two-factor-authentication" size={24} color={colors.blue500} />
                        <Text style={style.text}>Multi factor Authentication</Text>
                    </View>
                </View>

                <View style={style.col}>
                    <View style={style.featureicontext}>
                        <FontAwesome5 name="server" size={24} color={colors.blue500} />
                        <Text style={style.text}>AWS Server</Text>
                    </View>
                    <View style={style.featureicontext}>
                        <MaterialIcons name="do-not-disturb-alt" size={24} color={colors.blue500} />
                        <Text style={style.text}>No paper trail</Text>
                    </View>
                </View>

            </View>
        </View>
    )
}

export default SecurityFeatureCard
