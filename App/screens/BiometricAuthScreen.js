import { BackHandler, Button, Image, StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { useTheme } from "../theme/ThemeProvider"
import { useState } from "react";

const BiometricAuthScreen = ({ bioAuthFlow, setBioAuthFlow ,handleBiometricAuth }) => {

    const {
        theme: { colors },
    } = useTheme();

    const styles = StyleSheet.create({
        main: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
        },
        logo: {
            height: 100,
            width: "100%",
            aspectRatio: 1
        },
        buttons: {
            display: (bioAuthFlow) ? "none": "flex",
            flexDirection: "row",
            margin: 20,
        },
        unlockbtn: {
            backgroundColor: colors.blue500,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: colors.blue500,
            margin: 4
        },
        unlockbtntext : {
            color: "white"
        }, 
        closebtn: {
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderWidth: 1,
            borderColor: colors.blue500,
            borderRadius: 5,
            margin: 4
        }
    })

    const reauthenticate = () => {
        setBioAuthFlow(true)
        handleBiometricAuth()
    }

    const closeApp = () => {
        BackHandler.exitApp()
    }

    return (
        <View style={styles.main}>
            <Image style={styles.logo} source={require('../../assets/icon.png')} />
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.unlockbtn} onPress={reauthenticate}> 
                    <Text style={styles.unlockbtntext}>Unlock</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeApp} style={styles.closebtn}> 
                    <Text>Close</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default BiometricAuthScreen
