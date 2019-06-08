/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { AppRegistry } from 'react-native';
import App from './App';

import Routes from './src/navigations'
import { name as appName } from './app.json';
import { LandingPage } from './src/container'
import TrackPlayer from 'react-native-track-player';
import 'es6-symbol/implement';

TrackPlayer.setupPlayer().then(() => {
    // The player is ready to be used
});
const _XHR = GLOBAL.originalXMLHttpRequest ?  
    GLOBAL.originalXMLHttpRequest :           
    GLOBAL.XMLHttpRequest                     

XMLHttpRequest = _XHR
AppRegistry.registerComponent(appName, () => App);

TrackPlayer.registerPlaybackService(() => require('./service'));