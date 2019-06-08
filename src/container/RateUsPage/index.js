
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-navigation';
class RateUs extends Component {
    static navigationOptions = ({navigation}) => 
    { 
        return { 
            headerLeft:<Icon
            style={{paddingLeft:20}}
            raised
            name='align-justify'
            type='font-awesome'
            size={25}
            color='grey'
            onPress={()=>navigation.openDrawer()}
            />,
            // headerLeft: <Icon
            // raised
            // size={28}
            // name='heartbeat'
            // type='font-awesome'
            // color='#f50'
            // iconStyle={{marginLef:20}}
            // containerStyle={{marginLeft:20}}
            // onPress={() => console.log('hello')} />,
             headerTransparent: true,
             headerStyle: { borderBottomWidth: 0, },
             

             
             } 
    }
    render(){
        return(
            <View style={styles.container} forceInset={{ bottom: 'never' }}>
            <ImageBackground source={require('../../assets/3.jpg')} style={{width: '100%', height: '100%',opacity:0.9}}>
                <Text style={styles.Text}>RateUs Screen</Text>
           </ImageBackground>
             </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor:'#F5FCFF',
        width: '100%',
    },
    Text:{
        color:'white',
        fontSize:30,
        justifyContent:'center',
        alignItems:'center',
        paddingTop:90
    }
})

export default RateUs