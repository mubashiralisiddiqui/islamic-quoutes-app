import React, { Component } from 'react';
import TrackPlayer from 'react-native-track-player';

import RootStack from './src/navigations'

import PlayerStore from './src/store/player';
import TrackStore from './src/store/track';

import axios from 'axios';
import { api } from './src/config/index'
import SplashScreen from 'react-native-splash-screen'
export default class App extends Component {
  state = {
    // data:[]
  }
  componentDidMount() {
    SplashScreen.hide();
    this._onQueueEded = TrackPlayer.addEventListener('playback-queue-ended', async (data) => console.log(data, 33333333));
    this._onTrackChanged = TrackPlayer.addEventListener('playback-track-changed', async (data) => {
      if (data.nextTrack) {
        const track = await TrackPlayer.getTrack(data.nextTrack);
        TrackStore.id = track.id;
        TrackStore.title = track.title;
        TrackStore.artist = track.artist;
        TrackStore.artwork = track.artwork;
        TrackStore.content = track.content;
        TrackStore.url = track.url
        TrackStore.styles = track.styles;
        TrackStore.color = track.color
        TrackStore.content_source = track.content_source
      }
    })

    this._onStateChanged = TrackPlayer.addEventListener('playback-state', (data) => {
      // console.log("data", data)
      PlayerStore.playbackState = data.state;
    })
  }

  componentWillUnmount() {
    this._onTrackChanged.remove()
    this._onStateChanged.remove()
  }

  render() {
    return (
      <RootStack />
    );
  }
}