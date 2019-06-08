
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import TrackPlayer, { ProgressComponent } from 'react-native-track-player';
import { Image, StyleSheet, Text, TouchableOpacity, View, ImageBackground, Share, Dimensions, AsyncStorage, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Quotes from '../quotes'
import TrackStore from '../../store/track';
import PlayerStore from '../../store/player';
// import { ScrollView } from 'react-native-gesture-handler';

class ProgressBar extends ProgressComponent {
    
    render() {
        return (
            <View style={styles.progress}>
                <View style={{ flex: this.getProgress(), backgroundColor: 'red' }} />
                <View style={{ flex: 1 - this.getProgress(), backgroundColor: 'grey' }} />
            </View>
        );
    }
}

function ControlButton({ title, onPress }) {
    return (
        <TouchableOpacity style={styles.controlButtonContainer} onPress={onPress}>
            <Text style={styles.controlButtonText}>{title}</Text>
        </TouchableOpacity>
    );
}
@observer
export default class Player extends Component {
    state = {
        favQuotes: [],
        favColor: 'white',
        volumeSet: true,
        iconChange: 'volume-up',
        disableTV:'eye',
        showTv:true

    }

    _setVolumne() {
        this.setState((state) => (
            {
                volumeSet: !state.volumeSet,
                iconChange: state.volumeSet ? 'volume-up' : 'volume-off'
            }
        ),
        )
        const { volumeSet } = this.state;
        let volume = volumeSet ? 1 : 0
        TrackPlayer.setVolume(volume)
    }

    _favourite = async (favObj, color) => {
        let quotes = await AsyncStorage.getItem('favQuotes')
        quotes = JSON.parse(quotes) || [];
        if(color === 'red') {            
            quotes = quotes.filter(quote => favObj.id != quote.id)            
        } else {
            let obj = {
                "favID" : favObj.id,
                "id":parseInt(favObj.id),
                "content" : favObj.content,
                "artwork":favObj.artwork,
                "artist":favObj.artist,
                "url":favObj.url,
                "styles":favObj.styles,
            }
            try {
                quotes = [...quotes, obj];
                alert('Liked')
            }
            catch (err) {
                console.log(err.message)
            }
        }
        this.setState({ favQuotes: quotes })
        AsyncStorage.setItem('favQuotes', JSON.stringify(quotes))
    }

    _toggleDisplay = (art) => {
        const{showTv}= this.state;
        this.setState({
            showTv:!this.state.showTv
        })
        // if(this.state.disableTV === 'eye'){
        //     TrackStore.artwork = showTv? 'https://media.idownloadblog.com/wp-content/uploads/2016/09/black-gradation-blur-34-iphone-7-plus-wallpaper.jpg':TrackStore.artwork;
        // }
    }
    
    _onShare = () => {
        Share.share({
            message: TrackStore.content,
            title: 'Quotes'
        }, {
                // Android only:
                dialogTitle: 'Share Quote',
                // iOS only:
                excludedActivityTypes: [
                    'com.apple.UIKit.activity.PostToTwitter'
                ]
            })
    };

    _onAppShare = () => {
        Share.share({
            message: TrackStore.content,
            title: 'Quotes'
        }, {
                // Android only:
                dialogTitle: 'Share Quote',
                // iOS only:
                excludedActivityTypes: [
                    'com.apple.UIKit.activity.PostToTwitter'
                ]
            })
    };

    _isFavorite = (color, callback) => {
        this.setState({favColor : color})
        console.log(color, this.state.favColor);
        callback();
    }
    render() {
        const {  onNext, onPrevious, onTogglePlayback, getStateName } = this.props;
        const { favColor, iconChange,disableTV,showTv } = this.state
        const { favColor1 } = this.props

        var middleButtonText = (<Icon
            style={{ paddingLeft: 20 }}
            raised
            name='play'
            type='font-awesome'
            size={25}
            color='white'
        />)
        if (PlayerStore.playbackState === TrackPlayer.STATE_PLAYING
            || PlayerStore.playbackState === TrackPlayer.STATE_BUFFERING) {
            middleButtonText = (<Icon
                style={{ paddingLeft: 20 }}
                raised
                name='pause'
                type='font-awesome'
                size={25}
                color='white'
            />)
        }

        return (
            // <ScrollView>
            <ImageBackground style={styles.cover} source={{ uri: showTv? TrackStore.artwork:'https://media.idownloadblog.com/wp-content/uploads/2016/09/black-gradation-blur-34-iphone-7-plus-wallpaper.jpg' }}>
                {/* <Text style={styles.title}>{TrackStore.title}</Text>
                    <Text style={styles.artist}>{TrackStore.artist}</Text>
                    */}
                {/* <Text style={styles.artist}>{TrackStore.quotes}</Text> */}

                <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'center' }} >
                    <Quotes
                        quotes={TrackStore.content}
                        content_source= {TrackStore.content_source}
                        // customStyle={TrackStore.styles}
                    />
                </View>
                <View style={styles.playercontainer}>

                    {/*Quotes Test */}

                    {/* <View style={styles.state}>{getStateName(PlayerStore.playbackState)}</View>*/}

                    {/* Control Buttons */}
                    <View style={styles.controls}>
                        <ControlButton title={<Icon
                            style={{ paddingLeft: 20 }}
                            raised
                            name='backward'
                            type='font-awesome'
                            size={25}
                            color='white'
                        />} onPress={() => this._isFavorite(TrackStore.color, onPrevious)} />

                        <ControlButton title={middleButtonText} onPress={onTogglePlayback} />
                        <ControlButton title={<Icon
                            style={{ paddingLeft: 20 }}
                            raised
                            name='forward'
                            type='font-awesome'
                            size={25}
                            color='white'
                        />} onPress={() => this._isFavorite(TrackStore.color, onNext)} />

                        {/* <ControlButton title={<Icon
                                style={{ paddingLeft: 20 }}
                                raised
                                name={iconChange}
                                type='font-awesome'
                                size={25}
                                color='white'
                            />} onPress={() => this._setVolumne()} /> */}
                    </View>
                    <View style={styles.controls}>
                        <ControlButton title={<Icon
                            style={{ paddingLeft: 20 }}
                            raised
                            name='share-alt'
                            type='font-awesome'
                            size={25}
                            color='white'
                        />} onPress={this._onShare} />
                        <ControlButton title={<Icon
                            style={{ paddingLeft: 20 }}
                            raised
                            name={disableTV}
                            type='font-awesome'
                            size={25}
                            color='white'
                        />} onPress={() => this._toggleDisplay(TrackStore.artwork)} />


                        <ControlButton title={<Icon
                            style={{ paddingLeft: 20 }}
                            raised
                            name='heart'
                            type='font-awesome'
                            size={25}
                            color={TrackStore.color}
                        />} onPress={() => this._favourite(TrackStore, TrackStore.color)} />
                        <ControlButton title={<Icon
                            style={{ paddingLeft: 20 }}
                            raised
                            name={iconChange}
                            type='font-awesome'
                            size={25}
                            color='white'
                        />} onPress={() => this._setVolumne()} />

                    </View>
                </View>
            </ImageBackground>
            // </ScrollView>
        );
    }
}
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    playercontainer: {
        // backgroundColor: 'black',
        width: '100%',
        // height: '20%',
        flex: 0.3,
        // opacity: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
   
    cover: {
        width: '100%',
        // height: 100,
        flex: 1,
        // justifyContent: 'flex-end',
        // alignItems: 'center'
        // marginTop: 20,
        // backgroundColor: 'grey',
    },
    progress: {
        height: 1,
        width: '90%',
        marginTop: 10,
        flexDirection: 'row',
    },
    title: {
        marginTop: 10,
    },
    artist: {
        fontWeight: 'bold',
    },
    controls: {
        marginVertical: 20,
        flexDirection: 'row',
    },
    buttonsGroup: {
        flexDirection: 'row',
        marginVertical: 30
    },
    controlButtonContainer: {
        flex: 1,
    },
    controlButtonText: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white'
    },
    state: {
        marginTop: 20,
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center'

    },
});