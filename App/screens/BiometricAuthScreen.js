import { Image, StyleSheet, View } from "react-native"

const BiometricAuthScreen = () => {

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
    })

    return (
        <View style={styles.main}>
            <Image style={styles.logo} source={require('../../assets/icon.png')} />
        </View>
    )
}

export default BiometricAuthScreen
