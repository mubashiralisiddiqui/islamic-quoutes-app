
/**
 *  import modules
 */
import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, AsyncStorage, Dimensions, ImageBackground, SafeAreaView,Linking,Share } from 'react-native'

const { width, height } = Dimensions.get('window')
import { ImageHeader } from '../components'
import { LandingPage, LikeUs,  AboutUS, Favourites, RateUs } from '../container/index'
import Icon from 'react-native-vector-icons/FontAwesome';
import Rate, { AndroidMarket } from 'react-native-rate';

/**
 *  start of DrawerContent
 */
class DrawerContainer extends Component {

    state = {
        rated: false
    }
    // logout = async () => {
    //     const { navigate } = this.props.navigation
    //     AsyncStorage.clear().then(() => {
    //         this.props.logout()
    //         console.log(this.props.logout)
    //         this.props.navigation.navigate('Login')
    //     })
    //     OneSignal.deleteTag('email');
    //     this.props.logout()
    //     this.props.navigation.navigate('Login')

    static navigationOptions = ({ navigation }) => {
        return {
            headerTransparent: true,
            headerStyle: { borderBottomWidth: 0, },
        }
    }

    _goToLikeURL =()=> {
        Linking.canOpenURL('https://www.facebook.com/thenestio/?__tn__=kC-R&eid=ARAI7W5_jCFd417qbEc5SJyeUXm49cC2CVtaj1wpMxzg6v9nOKn7I8JuVr_nu3PYXkV7FYwdMEEVvX-j&hc_ref=ARQViNfF-FNXCKBhmS0TTk322-8hU9io3JDbP7Xjk9UxAuSxV_0UpyCPaQ8kkPJkDso').then(supported => {
          if (supported) {
            Linking.openURL('https://www.facebook.com/thenestio/?__tn__=kC-R&eid=ARAI7W5_jCFd417qbEc5SJyeUXm49cC2CVtaj1wpMxzg6v9nOKn7I8JuVr_nu3PYXkV7FYwdMEEVvX-j&hc_ref=ARQViNfF-FNXCKBhmS0TTk322-8hU9io3JDbP7Xjk9UxAuSxV_0UpyCPaQ8kkPJkDso');
          } else {
            console.log('Don\'t know how to open URI: ' + this.props.url);
          }
        });
      }

      _onAppShare = () => {
        Share.share({
            message: 'http://bit.ly/LifeQuotes-IOS',
            title: 'Life Quotes'
        }, {
                // Android only:
                dialogTitle: 'Share Quote App',
                // iOS only:
                excludedActivityTypes: [
                    'http://bit.ly/LifeQuotes-IOS'
                ]
            })
    };
   
    render() {
        const { navigate , push} = this.props.navigation;
        return (
            <View style={styles.container} >
                <ImageBackground source={require('../assets/Backgrounds/Background_44.jpg')} style={{ width: '100%', height: '100%', opacity: 0.9 }}>
                  <View style={{ paddingTop: 50 }}>
                    <Image source={require('../assets/AppIcon.png')} style={{width: '100%', height:200}} />
                   
                        <TouchableOpacity style={styles.section} onPress={() => navigate('MenuCategoriesPage')}>
                            <Icon style={styles.icon} name="home" size={30} color="white" />
                            <Text style={styles.drawerItem}>
                                App
                            </Text>
                        </TouchableOpacity>
                       {/*  <TouchableOpacity
                            onPress={() => navigate('LandingPage', { cat_id: "all" })} style={styles.section}>
                            <Icon style={styles.icon} name="rocket" size={30} color="white" />
                            <Text style={styles.drawerItem} >
                                Quotes
                    </Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity onPress={()=> navigate('LandingPage', { fav: 'favorites',key: Math.random () * 10000 })}  style={styles.section}>
                                            <Icon style={styles.icon} name="heart" size={30} color="white" />
                                            <Text style={styles.drawerItem}>
                                                Favourites
                                        </Text>
                            </TouchableOpacity>
                        */}

                        <TouchableOpacity style={styles.section} onPress={this._onAppShare}>
                            <Icon style={styles.icon} name="share-alt" size={30} color="white" />
                            <Text style={styles.drawerItem}>
                                Share App
                    </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.section} onPress={() => navigate('AboutUS')}>
                            <Icon style={styles.icon} name="weixin" size={30} color="white" />
                            <Text style={styles.drawerItem}>
                                About Us
                    </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.section} onPress={()=>{
                            let options = {
                                AppleAppID:"2193813192",
                                GooglePackageName:"com.mywebsite.myapp",
                                AmazonPackageName:"com.mywebsite.myapp",
                                OtherAndroidURL:"http://www.randomappstore.com/app/47172391",
                                preferredAndroidMarket: AndroidMarket.Google,
                                preferInApp:false,
                                openAppStoreIfInAppFails:true,
                                fallbackPlatformURL:"http://www.mywebsite.com/myapp.html",
                            }
                            Rate.rate(options, success=>{
                                if (success) {
                                    // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
                                    this.setState({rated:true})
                                }
                            })
                        }} >
                            <Icon name="star" size={30} color="white" style={styles.icon} />
                            <Text style={styles.drawerItem}>
                                Rate App
                </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.section}  onPress={this._goToLikeURL}>
                            <Icon style={styles.icon} name="thumbs-up" size={30} color="white" />
                            <Text style={styles.drawerItem}>
                                Like Us
                </Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

            </View>
        )
    }
}
/**
 *  creating style
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    drawerItem: {
        fontSize: 18,
        color: 'white',
        // padding: 1,
        alignItems: 'center',
        marginLeft: 10

    },
    section: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 15,
        borderBottomColor: '#a9b1bc',
        borderBottomWidth: 0.5,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10
    },
    logoutSection: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 10,
        marginVertical: 10,
        justifyContent: 'flex-start'
    },
    icon: {
        width: 40,
        // height: 50,
    },
    versionContainer: {
        //padding: 20,
        position: 'absolute',
        top: Dimensions.get('window').height - 100,
        paddingHorizontal: 20,
        marginTop: 50,
        height: 50,
        //backgroundColor: 'red',
    },
    version: {
        color: 'white'
    }
})


export default DrawerContainer
