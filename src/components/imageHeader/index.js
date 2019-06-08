/**
 * import modules
 */
import React, { Component } from 'react';
import { ImageBackground, View, Image, Dimensions, Text } from 'react-native';

/**
 * start of ImageHeader component
 */
export default class ImageHeader extends Component {

    render() {
        const { icon, title } = this.props;
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={require('../../assets/INSM.png')}
                    style={styles.bgImage}
                >
                   
                   
                </ImageBackground>
            </View>
        )
    }
}

/**
 * styles
 */
let ScreenHeight = Dimensions.get("window").height / 2.8
let Screenwidth = Dimensions.get('window').width/2.6
const styles = {
    container: {
        display: 'flex',
        height: ScreenHeight,
        // width:Screenwidth,
        justifyContent: 'center',

    },
    bgImage: {
        // display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // width:Screenwidth,
        justifyContent: 'center',
        height: ScreenHeight,
    }
}