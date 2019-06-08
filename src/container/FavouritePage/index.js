import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableHighlight,ScrollView,AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-navigation';
class Favourite extends Component { 

    componentWillMount(){
        AsyncStorage.removeItem('favQuotes').then((data)=>{
            console.log(data)
        })
    }
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
            <View style={styles.container} >
                <ImageBackground source={require('../../assets/4.jpg')} style={{width: '100%', height: '100%',opacity:0.9}}>
                    <Text style={styles.Text}>Favourite Screen</Text>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex:1,
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

export default Favourite;