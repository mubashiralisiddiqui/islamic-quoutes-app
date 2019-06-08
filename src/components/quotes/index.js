import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, PixelRatio } from 'react-native';


export default class Quotes extends Component {
    render() {
        const { quotes, customStyle ,content_source} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.quotes}>
                    <Text style={styles.qomas}></Text>
                    {quotes}
                    <Text style={styles.qomas}></Text>
                </Text>
                <Text style={styles.source}></Text>
                <Text style={styles.source}></Text>
                <Text style={styles.source}></Text>

                <Text style={styles.source}>{content_source}</Text>
            </View>
        )
    }
}
let fontSize = 18;

if (PixelRatio.get() <= 2) {
    fontSize = 16;
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // marginVertical: 120,
        width:'89%',
        backgroundColor:'rgba(0,0,0, 0.4)',
        minHeight:'50%'
    },
    quotes: {
        color: 'white',
        fontFamily: 'Arial',
        textAlign: 'justify',
        width: '80%',
        fontStyle: 'normal',
        fontSize: fontSize,

    },
    qomas: {
        fontSize: 20,
        fontWeight: "bold"
    },
    source:{
        color: 'white',
        fontFamily: 'Arial',
        textAlign: 'center',
        width: '90%',
        fontStyle: 'normal',
        fontSize: fontSize,
    }
})