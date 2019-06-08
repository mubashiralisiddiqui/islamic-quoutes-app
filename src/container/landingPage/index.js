import React, { Component, Fragment } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    AsyncStorage,
    ActivityIndicator,
    ImageBackground,
    TouchableOpacity
    
} from 'react-native';
import ImageSlider from 'react-native-image-slider';
import Icon from 'react-native-vector-icons/FontAwesome';
import { observer } from 'mobx-react';
import axios from 'axios';
import TrackPlayer, { ProgressComponent } from 'react-native-track-player';
import { api } from '../../config/index'
// import { data } from '../../store/playlist.json';
import TrackStore from '../../store/track';


import PlayerStore from '../../store/player';

import { Player } from '../../components/index'

@observer
class Landing extends Component {
    state = {
        quotes: "",
        data: [],
        fetchedQuotes:[],
        localQoutes:[],
        favColor1: 'white',
        isLoading: true,
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: <Icon
                style={{ paddingLeft: 20 }}
                raised
                name='align-justify'
                type='font-awesome'
                size={25}
                color='white'
                onPress={() => navigation.openDrawer()}
            />,
            headerTransparent: true,
            headerStyle: { borderBottomWidth: 0, },
            headerRight:  <TouchableOpacity
            onPress={()=>navigation.push('LandingPage', { fav: 'favorites',key: Math.random () * 10000 })} style={styles.section}>
            <Text style={styles.drawerItem} >
            Favourites
            </Text>
            </TouchableOpacity>,
            headerTransparent: true,
            headerStyle: { borderBottomWidth: 0, }
        }
    }
   
    
    componentWillMount() {
        // AsyncStorage.clear();
        AsyncStorage.getItem('favQuotes')
        .then(fav =>{
            this.setState({localQoutes:JSON.parse(fav)})
        // console.log(this.state.localQoutes)

        })

        TrackPlayer.setupPlayer();
        TrackPlayer.updateOptions({
            stopWithApp: true,
            capabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE,
                TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
                TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
                TrackPlayer.CAPABILITY_STOP
            ],
            compactCapabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE
            ]
        });


        const { navigation } = this.props;
        const catID = (navigation.getParam('cat_id'));
        const fav = (navigation.getParam('fav'));

        // console.log(catID)

        if(fav ==='favorites'){
            AsyncStorage.getItem('favQuotes')
            .then(res => {
                console.log(res)
                debugger
                JSON.parse(res).map((i) => {
                    TrackPlayer.reset();
                    let obj =
                    {
                        "id": i.id ,
                        "url": i.url=== null ? "http://138.68.241.158/storage/media/24/SampleAudio_0.4mb.mp3" : i.url,
                        "title": i.audio ? i.audio.name : 'Unknown',
                        "artist": i.audio ? i.audio.name : 'Unknown',
                        "artwork": i.artwork === null ? 'https://picsum.photos/200' : i.artwork,
                        "content": i.content ? i.content : 'sadfasdfsdfdsfasfasdf',
                        "color": 'red',
                        "styles": {
                            "color": "white",
                            "fontFamily": "Blokletters-Potlood",
                            "textAlign": "justify",
                            "width": "70%",
                            "fontStyle": "italic", "fontWeight": "700"
                        }
                    }
                    this.setState({
                        data: [...this.state.data, obj]
                    })
                })
                    TrackPlayer.setupPlayer().then(async () => {
                      await TrackPlayer.add(
                        this.state.data
                      );
                    });
                    TrackPlayer.play()
                    console.log('this is working')
                  
            })
            .catch((err) => {
                console.log('error', err)
            })
        return
        }

        if (catID === 'all') {
            axios.get(api.all_quotes)
                .then(async res => {
                    TrackPlayer.reset();
                    let favorites = await AsyncStorage.getItem('favQuotes');
                    favorites = JSON.parse(favorites) || [];                 
                    res.data.data.map((i) => {
                        let obj =
                        {
                            "id": i.id ,
                            "url": i.audio ? i.audio.path === null ? "http://138.68.241.158/storage/media/24/SampleAudio_0.4mb.mp3" : i.audio.path : "http://138.68.241.158/storage/media/24/SampleAudio_0.4mb.mp3",
                            "title": i.audio ? i.audio.name : 'Unknown',
                            "artist": i.audio ? i.audio.name : 'Unknown',
                            "artwork": i.background_image ? i.background_image.path === null ? 'https://picsum.photos/200' : i.background_image.path : 'https://picsum.photos/200',
                            "content": i.content ? i.content : 'sadfasdfsdfdsfasfasdf',
                            "content_source":i.content_source?i.content_source:'Unknown ',
                            "styles": {
                                "color": "white",
                                "fontFamily": "Blokletters-Potlood",
                                "textAlign": "justify",
                                "width": "70%",
                                "fontStyle": "italic", "fontWeight": "700"
                            }
                        }
                        let isFiltered = favorites.filter(a => {
                                // console.log(a, obj, 'in filter', a.id === obj.id)
                                return a.id === obj.id
                            })
                        obj.color = isFiltered.length == 1 ? 'red' : 'white'; 

                        this.setState({
                            data: [...this.state.data, obj],
                            isLoading: false
                        })

                    })
                        TrackPlayer.setupPlayer().then(
                            async () =>
                              await TrackPlayer.add(
                                  this.state.data
                              ).then(() =>{
                                TrackPlayer.updateOptions({
                                  capabilities: [
                                    TrackPlayer.CAPABILITY_PLAY,
                                    TrackPlayer.CAPABILITY_PAUSE,
                                    TrackPlayer.CAPABILITY_STOP
                                  ],
                                  compactCapabilities: [
                                    TrackPlayer.CAPABILITY_PLAY,
                                    TrackPlayer.CAPABILITY_PAUSE,
                                    TrackPlayer.CAPABILITY_STOP
                                  ]
                                });
                                // this._GetTrackDuration()
                              }
                              )
                          )
                })
                .catch((err) => {
                    console.log('error', err)
                })
            return
        }
        // get quotes by Item
        axios.get(api.getQuotes_by_category(parseInt(catID)))
            .then(async res => {
                TrackPlayer.reset();
                let favorites = await AsyncStorage.getItem('favQuotes');
                favorites = JSON.parse(favorites) || [];
                res.data.data.map((i) => {
                    let obj =
                    {
                        "id": i.id ,
                        "url": i.audio ? i.audio.path === null ? "http://138.68.241.158/storage/media/9/Background_2_a.jpg" : i.audio.path : 'https://drive.google.com/uc?export=download&id=1AjPwylDJgR8DOnmJWeRgZzjsohi-7ekj',
                        "title": i.audio ? i.audio.name : 'Unknown',
                        "artist": i.audio ? i.audio.name : 'Unknown',
                        "artwork": i.background_image ? i.background_image.path === null ? 'https://picsum.photos/200' : i.background_image.path : 'https://picsum.photos/200',
                        "content": i.content ? i.content : 'sadfasdfsdfdsfasfasdf',
                        "styles": {
                            "color": "white",
                            "fontFamily": "Blokletters-Potlood",
                            "textAlign": "justify",
                            "width": "70%",
                            "fontStyle": "italic", "fontWeight": "700"
                        }
                    }
                    let isFiltered = favorites.filter(a => {
                        return a.id === obj.id
                    })
                    obj.color = isFiltered.length == 1 ? 'red' : 'white'; 
    
                    this.setState({
                        data: [...this.state.data, obj]
                    })
                        TrackPlayer.setupPlayer().then(
                            async () =>
                              await TrackPlayer.add(
                                  this.state.data
                              ).then(() =>{
                                TrackPlayer.updateOptions({
                                  capabilities: [
                                    TrackPlayer.CAPABILITY_PLAY,
                                    TrackPlayer.CAPABILITY_PAUSE,
                                    TrackPlayer.CAPABILITY_STOP
                                  ],
                                  compactCapabilities: [
                                    TrackPlayer.CAPABILITY_PLAY,
                                    TrackPlayer.CAPABILITY_PAUSE,
                                    TrackPlayer.CAPABILITY_STOP
                                  ]
                                });
                              }
                              )
                          )
                })
            })
    }

    test = () => {
        this.setState({
            quotes: "dream comes true"
        })
        let stat = this.getStateName(PlayerStore.playbackState)
        console.log(stat)
        if (stat === "Stopped") {
            this.togglePlayback()
            return
        }
        this.skipToNext()
    }


    togglePlayback = async () => {
        const currentTrack = await TrackPlayer.getCurrentTrack();
        // console.log(currentTrack)
        // console.log(this.state.data, 3223222)
        // console.log("trackplayer", currentTrack)
        // TrackPlayer.add(
        //     this.state.data
        // );
        // // TrackPlayer.play();
        // TrackPlayer.reset();
        // if (PlayerStore.playbackState === TrackPlayer.STATE_PAUSED) {
        //     TrackPlayer.play();
        // } else {
        //     TrackPlayer.pause();
        // }
        if (currentTrack == null) {
            TrackPlayer.reset();
            TrackPlayer.add(
                this.state.data
            );
                TrackPlayer.play();
        } else {
            if (PlayerStore.playbackState === TrackPlayer.STATE_PAUSED) {
                TrackPlayer.play();
            } else {
                TrackPlayer.pause();
            }
        }
    }

    skipToNext = async () => {
        try {
            await TrackPlayer.skipToNext()
        } catch (_) { }
    }

    skipToPrevious = async () => {
        try {
            await TrackPlayer.skipToPrevious()
        } catch (_) { }
    }

    getStateName(state) {
        switch (state) {
            // case TrackPlayer.STATE_NONE: return 'None'
            // case TrackPlayer.STATE_PLAYING: return 'Playing'
            // case TrackPlayer.STATE_PAUSED: return 'Paused'
            // case TrackPlayer.STATE_STOPPED: return 'Stopped'
            case TrackPlayer.STATE_BUFFERING: return ( <ActivityIndicator size="small" color="#0000ff" style={{flex: 1}} />)
        }
    }

    render() {
        console.log( this.state.data.length)
        const {data, isLoading} = this.state;
        return (
            <View style={styles.container}>
            <ImageBackground source={require('../../assets/INSQ/background_2.png')} style={{  width: '100%', height: '100%' }}  > 
            {
                this.state.data.length <1 ? 
                <ActivityIndicator size="large" color="#040404" style={{flex: 1}} />
                :
                <Player
                onNext={() => this.skipToNext()}
                onPrevious={() => this.skipToPrevious()}
                onTogglePlayback={() => this.togglePlayback()}
                getStateName={this.getStateName}
                favColor1 = {this.state.favColor1}
            />
            }
               </ImageBackground>                
            </View>
        )
    }
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b0d25f',
        // width: width
    },
    drawerItem: {
        fontSize: 18,
        color: 'white',
        padding: 1,
        alignItems: 'center',
        paddingRight: 20
    },
    player: {
        // marginTop: 20,
        // marginLeft: 10
        // backgroundColor: 'red'
    },

});

export default Landing;