import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native-web';

export default class DailyPicScreen extends Component {

    constructor() {
        super()
        this.state = {
            apod: ''
        }
    }

    getAPOD = () => {
        axios
            .get('https://api.nasa.gov/planetary/apod?api_key=pt5IUnSjrbvEtcPofi096LRBcaMnIaRxEMDx8JdC')
            .then(response => {
                this.setState({ apod: response.data})
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />
                <ImageBackground
                    source={require('../assets/star-background.jpg')} style={styles.backgroundImage}>
                    <Text style={styles.routeText}>Astronomy Picture of the Day</Text>
                    <Text style={styles.titleText}>{this.state.apod.title}</Text>
                    <TouchableOpacity style={styles.listContainer}
                    onPress = {() => Linking.openURL(this.state.apod.url).catch(err => console.error("Couldn't load page", err))}
                    >
                        <View style={styles.iconContainer}>
                            <Image source={require('../assets.play-video.png')} style={{width: 50, height: 50}}></Image>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.explanationText}>{this.state.apod.explanation}</Text>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    routeText: {
        fontSize: 35,
        fontWeight: "bold",
        color: "white",
        textAlign: 'center',
    },
    titleText: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#ec63ff",
    },
    explanationText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white",
        marginTop: 10
        // margin: 10,
        // textAlign: 'center'
    },
    listContainer: {
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        flex: 0.8,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        borderRadius: 10,
        backgroundColor: 'rgba(52, 52, 52, 0.5)'
    },
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",

    }
});