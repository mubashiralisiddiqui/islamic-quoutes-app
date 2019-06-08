import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableHighlight,
    ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
class AboutUS extends Component {
    static navigationOptions = ({navigation}) => 
            { 
                return { 
                    title: 'ABOUT US ',
                    headerStyle: {
                        backgroundColor: '#153c0b',
                        textAlign: 'center',
                        display: 'flex',
                        flex: 1,
                        alignItems: 'center'
                    },
                    titleStyle: {
                        textAlign: 'center',
                        alignSelf: 'center',
                        fontSize: 30
                    },
                    headerTintColor: '#153c0b',
                    headerTitleStyle: {
                        fontWeight: '700',
                        fontSize: 16,
                        textAlign: 'center',
                        flex: 1,
                    },
                    headerTransparent: false,
                     headerStyle: { borderBottomWidth: 0, },
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
                     headerTransparent: false,
                     headerStyle: { borderBottomWidth: 0, },
                     

                     
                     } 
            }
    render(){
        return(
            <View>
                 <ImageBackground source={require('../../assets/Backgrounds/Background_8.jpg')} style={{width: '100%', height: '100%',justifyContent:'center',alignItems:'center'}}>
                    <View style={{alignItems:'center',height:'100%',width:'75%',backgroundColor:'rgba(0,0,0,0.3)',flex:1}}>
                     <ScrollView>
                    <View>
                       <Text> </Text>
                        <Text style={{color:'#ffffff',fontSize:14,fontStyle:'italic'}}>“… And whoever holds firmly to Allah has [indeed] been guided to a straight path.” </Text>
                        <Text style={{color:'#ffffff',fontSize:18,textAlign: 'center'}}>- Quran 3:101</Text>
                    </View>
                       <View>
                        <Text> </Text>
                        <Text> </Text>

                        <Text style={{color:'#ffffff',fontSize:14}}>
                        We are a small team working with objective to motivate and inspire you through Quran to bring out the best within you. 
                        Although entire Quran is guidance, some verses have powerful message t;at move us. Through this App, 
                        we would like to share the meaning of some of those best verses with audio. You can watch and listen; 
                        just watch; or just listen as audio player.
                        </Text>
                     </View>
                       <View>

                       <Text> </Text>
                       <Text> </Text>
                        <Text style={{color:'#ffffff',fontSize:14}}>
                        We hope this will serve its purpose. We would love to improve the App and hear from you. 
                        If you have any suggestions or feedback please contact us at <Text style={{fontSize:15,textDecorationLine: 'underline'}}> AdamSalaamUS@gmail.com</Text>. 
                        Please don’t forget to like and rate the App. 
                        </Text>
                    </View>
                       <View>
                        <Text> </Text>
                        <Text style={{color:'#ffffff',fontSize:14}}>
                        Also, please invite your family and friends for this good cause.
                        </Text>
                        <Text></Text>
                        <Text style={{color:'#ffffff',fontSize:14,fontWeight:'600'}}>
                        :: Credits ::
                        </Text>
                        <Text style={{color:'#ffffff',fontSize:14}}>
                        English translation used in this App by <Text style={{fontSize:15,textDecorationLine: 'underline'}}>Dr. Muhammad Muhsin Khan</Text> and  <Text style={{fontSize:15,textDecorationLine: 'underline'}}>Br. Muhammad Taqi-ud-Din al-Hilali</Text>, and audio by <Text style={{fontSize:15,textDecorationLine: 'underline'}}>Br. Saabir and Br. Sa'ad Said Al-Ghamdi</Text>. May Allah reward them!
                        </Text>
                    </View>
                    </ScrollView>
                   </View>
                </ImageBackground>
            </View>
        )
    }    
}

const styles = StyleSheet.create({
  
    opacityView:{
        // display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        // marginVertical: 120,
        width:'76%',
        backgroundColor:'rgba(0,0,0, 0.2)',
        minHeight:'100%'
    },
    Text:{
        color:'black',
        fontSize:30,
        justifyContent:'center',
        alignItems:'center',
        paddingTop:90
    }
})

export default AboutUS
